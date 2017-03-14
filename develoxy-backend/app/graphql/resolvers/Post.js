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
        // 포스트가 존재하지 않는경우 널!
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

const getTags = cache.injector(async (id) => {
    const tags = await models.Tag.findByPostId(id, true);
    
    const mapped = tags.map(tag=>tag.tag);
    return mapped;
}, 'graphql:post:tag:id');


module.exports = {
    Query: {
        post: async (obj, {id}, ctx) => {

            const userId = ctx.request.userId;

            const post = await getPost({
                userId,
                id
            });

            return post;
        }
    },

    Post: {
        preview: (obj, params, ctx) => {
            return removeMd(obj.content).substring(0,150);
        },
        tags: async (obj, params, ctx) => {
            const tags = await getTags(obj.id);

            return tags;
        }
    }
}