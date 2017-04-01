const models = require('./../../models/index');

module.exports = {
    Query: {
        tags: async (obj, {username}, ctx) => {
            // 먼저 userId 를 가져옴
            const user = await models.User.findByUsername(username);
            if(!user) throw new Error('user not found');

            // userId로 태그를 찾음
            const tags = await models.Tag.findAll({
                where: {
                    userId: user.id
                },
                raw: true
            });

            return tags;
        }
    }
}