const models = require('./../../models/index');
const cache = require('./../../helpers/cache');

/*
    type User {
        id: Int!
        username: String
        displayName: String
        thumbnail: String
        categories: [Category]
    }
*/

module.exports = {
    User: {
        categories: async ({id}, params, ctx) => {
            // 유저의 카테고리를 불러온다
            const categories = await models.Category.findByUserId(id);
            return categories;
        }
    },
    Query: {
        user: async (obj, {id, username}, ctx) => {
            // id 로 조회
            if(id) {
                const key = `graphql:user:id:${id}`;
                const attributes = ['id', 'username', 'displayName', 'thumbnail'];
                
                try {
                    // 캐시 체크
                    const cached = await cache.get(key);

                    if(cached) {
                        return cached;
                    }
                    
                    // DB 조회
                    const user = await models.User.findById(id, {
                        attributes,
                        raw: true
                    });
                    // 캐시 저장
                    cache.set(key, user);
                    return user;

                } catch(e) {
                    throw new Error('DB ERROR');
                }
            }

            // username으로 조회
            if(username) {
                const key = `graphql:user:username:${username}`;
                const attributes = ['id', 'username', 'displayName', 'thumbnail'];

                try {
                    // 캐시 체크
                    const cached = await cache.get(key);

                    if(cached) {
                        return cached;
                    }
                    // DB 조회
                    const user = await models.User.findOne({ where: { username }, attributes, raw: true});
                    // 캐시 저장
                    cache.set(key, user);
                    return user;
                } catch(e) {
                    throw new Error('DB ERROR');
                }
            }
        }
    }
}