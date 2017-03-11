const models = require('./../../models/index');
const redis = require('./../../redis');

module.exports = {
    Query: {
        user: async (obj, {id, username}) => {
            // id 로 조회
            if(id) {
                const key = `graphql:user:id:${id}`;
                const attributes = ['id', 'username', 'displayName', 'thumbnail'];
                
                try {
                    // 캐시 체크
                    const cache = await redis.getAsync(key);
                    if(cache) {
                        return JSON.parse(cache);
                    }
                    // DB 조회
                    const user = await models.User.findById(id, {
                        attributes,
                        raw: true
                    });
                    // 캐시 저장
                    redis.set(key, JSON.stringify(user));
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
                    const cache = await redis.getAsync(key);
                    if(cache) {
                        return JSON.parse(cache);
                    }
                    // DB 조회
                    const user = await models.User.findOne({ where: { username }, attributes, raw: true});
                    // 캐시 저장
                    redis.set(key, JSON.stringify(user));
                    return user;
                } catch(e) {
                    throw new Error('DB ERROR');
                }
            }
        }
    }
}