const models = require('./../../models/index');
const cache = require ('./../../helpers/cache');


module.exports = {
    Query: {
        categories: async (obj, {username}, ctx) => {
            // Username 으로 카테고리 목록 조회
            const categories = await models.Category.findAll({
                where: {
                    '$User.username$': username
                },
                include: [
                    {
                        model: models.User,
                        attributes: ['username']
                    }
                ],
                order: [
                        ['parentId', 'ASC'],
                        ['index', 'ASC']
                ],
                raw: true
            });

            return categories;
        }
    },
    Category: {
        parent: async (obj, params, ctx) => {
            const category = await models.Category.findById(obj.parentId, {
                raw: true
            });
            return category;
        }
    }
}