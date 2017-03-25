const models = require('./../../models/index');
// const redis = require('./../../redis');
const removeMd = require('remove-markdown');
const cache = require('./../../helpers/cache');

const attributes = [
    'id', 
    'title', 
    'content', 
    'releaseDate', 
    'userId', 
    'visibility', 
    'isTemp'
];

// 단일 Post

async function getPost({userId, id}) {
    const key = `graphql:post:id:${id}`;

    const cached = await cache.get(key);
    
    if(cached) {
        return cached;
    }

    const post = await models.Post.findById(id, {
        raw: true,
        attributes
    });

    if(!post) {
        return null;
    }

    if(post.isTemp || post.visibility !== 'public') {
        // 현재 공개되선 안되는 게시물
        if(userId !== post.userId) return null;
    }

    const writer = await models.User.findById(post.userId, {
        raw: true,
        attributes: ['username']
    });

    post.username = writer.username;
    

    if(!(post.isTemp || post.visibility !== 'public')) {
        // 공개 됐을 경우에만 캐싱
        cache.set(key, post);
    }

    return post;
}

const getTags = async (id) => {
    const tags = await models.Tag.findByPostId(id, true);
    
    const mapped = tags.map(tag=>tag.tag);
    return mapped;
}


const getCategories = cache.inject(async (id) => {
    const postCategories = await models.PostCategory.findAll({
        where: {
            postId: id
        }, 
        include: [
            models.Category
        ],
        raw: true
    });

    return postCategories.map(
        postCategory => ({
            id: postCategory['categoryId'],
            name: postCategory['Category.name'],
            parentId: postCategory['Category.parentId']
        })
    );
}, 'graphql:post:category:id');

const getUser = cache.inject(async (userId) => {
    const attributes = ['id', 'username', 'displayName', 'thumbnail'];
    const user = await models.User.findById(userId, {
        attributes,
        raw: true
    });
    return user;
}, 'graphql:user:id');

const getPostsByTag = async ({tag, cursor}) => {
    const posts = await models.Tag.findAll({
        where: {
            tag,
            '$Post.id$': cursor ? {
                lt: cursor
            } : { ne: null },
            '$Post.is_temp$': false,
            '$Post.visibility$': 'public'
        },
        include: [
            models.Post
        ],
        order: [[models.Post, 'id', 'DESC']],
        limit: 5,
        raw: true
    });

    if(posts.length === 0) {
        return {
            data: null,
            next: null
        }
    }

    const lastId = posts[posts.length - 1]['Post.id'];

    const nextCount = await models.Tag.count({
        where: {
            tag,
            '$Post.id$': lastId ? {
                lt: lastId
            } : { ne: null },
            '$Post.is_temp$': false,
            '$Post.visibility$': 'public'
        },
        include: [
            models.Post
        ],
        order: [[models.Post, 'id', 'DESC']],
        limit: 5,
        raw: true
    });

    return {
        data: posts,
        nextExists: nextCount > 0
    };
}


const getPostsByCategory = async ({category, cursor}) => {
    const descendants = await models.Category.findAllDescendant(category);

    const posts = await models.PostCategory.findAll({
        where: {
            categoryId: [...descendants, category],
            '$Post.id$': cursor ? {
                lt: cursor
            } : { ne: null },
            '$Post.is_temp$': false,
            '$Post.visibility$': 'public'
        },
        attributes: [[models.sequelize.fn('DISTINCT', models.sequelize.col('post_id')), 'postId']],
        include: [
            models.Post
        ],
        order: [[models.Post, 'id', 'DESC']],
        limit: 5,
        raw: true
    });

    if(posts.length === 0) {
        return {
            data: null,
            next: null
        }
    }

    const lastId = posts[posts.length - 1]['Post.id'];

    const nextCount = await models.PostCategory.count({
        where: {
            categoryId: category,
            '$Post.id$': lastId ? {
                lt: lastId
            } : { ne: null },
            '$Post.is_temp$': false,
            '$Post.visibility$': 'public'
        },
        include: [
            models.Post
        ],
        order: [[models.Post, 'id', 'DESC']],
        limit: 5,
        raw: true
    });

    return {
        data: posts,
        nextExists: nextCount > 0
    };
}

const getPostsByUsername = async ({username, cursor}) => {
    const posts = await models.Post.findAll({
        where: {
            isTemp: false,
            visibility: 'public',
            '$User.username$': username,
            id: cursor ? { lt: cursor } : { ne: null },
        },
        include: [
            models.User
        ],
        order: [['id', 'DESC']],
        limit: 5,
        raw: true
    });
    
    console.log(posts);

    if(posts.length === 0) {
        return {
            data: null,
            next: null
        }
    }

    const lastId = posts[posts.length - 1].id;

    const nextCount = await models.Post.count({
        where: {
            isTemp: false,
            visibility: 'public',
            '$User.username$': username,
            id: lastId ? { lt: lastId } : { ne: null },
        },
        include: [
            models.User
        ],
        order: [['id', 'DESC']],
        limit: 5,
        raw: true
    });


    return {
        data: posts,
        nextExists: nextCount > 0
    }
}

module.exports = {
    Query: {
        post: async (obj, {id}, ctx) => {

            const userId = ctx.request.userId;

            const post = await getPost({
                userId,
                id
            });

            return post;
        },


        posts: async (obj, {tag, category, username, cursor, me}, ctx) => {
            if(me) {
                console.log(ctx.tokenPayload.data);
            }
            const handler = {
                tag: async () => {
                    const results = await getPostsByTag({tag, cursor});

                    if(results.data === null) return { data: null, next: null };

                    const posts = results.data.map(post => ({
                                id: post['Post.id'],
                                title: post['Post.title'],
                                content: post['Post.content'],
                                releaseDate: post['Post.releaseDate'],
                                userId: post['Post.userId'],
                                visibility: post['Post.visibility'],
                                isTemp: post['Post.isTemp']
                            }));

                    return {
                        data: posts,
                        next: results.nextExists ? `/graphql?query=${encodeURI(`
                                query { 
                                    posts(tag:"${tag}", cursor: ${posts[posts.length-1].id}) {
                                        data {
                                            id
                                            title
                                            preview
                                            releaseDate
                                        }
                                        next
                                    }
                                }
                            `.replace(/  +/g, ' '))}` : null
                    };   
                },
                category: async () => {
                    const results = await getPostsByCategory({category, cursor});

                    if(results.data === null) return { data: null, next: null };

                    const posts = results.data.map(post => ({
                                id: post['Post.id'],
                                title: post['Post.title'],
                                content: post['Post.content'],
                                releaseDate: post['Post.releaseDate'],
                                userId: post['Post.userId'],
                                visibility: post['Post.visibility'],
                                isTemp: post['Post.isTemp']
                            }));

                    return {
                        data: posts,
                        next: results.nextExists ? `/graphql?query=${encodeURI(`
                                query { 
                                    posts(category:${category}, cursor: ${posts[posts.length-1].id}) {
                                        data {
                                            id
                                            title
                                            preview
                                            releaseDate
                                        }
                                        next
                                    }
                                }
                            `.replace(/  +/g, ' '))}` : null
                    };  
                },
                username: async () => {
                    const results = await getPostsByUsername({username, cursor});

                    if(results.data === null) return { data: null, next: null };

                    const posts = results.data;

                    return {
                        data: posts,
                        next: results.nextExists ? `/graphql?query=${encodeURI(`
                                query { 
                                    posts(username:"${username}", cursor: ${posts[posts.length-1].id}) {
                                        data {
                                            id
                                            title
                                            preview
                                            releaseDate
                                        }
                                        next
                                    }
                                }
                            `.replace(/  +/g, ' '))}` : null
                    };  
                }
            };

            if(tag) {
                const response = await handler.tag();
                return response;
            } 

            if(category) {
                const response = await handler.category();
                return response;
            }

            if(username) {
                const response = await handler.username();
                return response;
            }

        }
    },

    Post: {
        preview: (obj, params, ctx) => {
            return removeMd(obj.content).substring(0,150);
        },
        tags: async (obj, params, ctx) => {
            const tags = await getTags(obj.id);

            return tags;
        },
        categories: async (obj, params, ctx) => {
            const categories = await getCategories(obj.id);
            return categories;
        },
        user: async (obj, params, ctx) => {
            const user = await getUser(obj.userId);
            console.log(user);
            return user;
        }
    }
}