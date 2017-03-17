const models = require('./../../models/index');
const cache = require ('./../../helpers/cache');



module.exports = {
    Category: {
        parent: async (obj, params, ctx) => {
            const category = await models.Category.findById(obj.parentId, {
                raw: true
            });
            return category;
        }
    }
}