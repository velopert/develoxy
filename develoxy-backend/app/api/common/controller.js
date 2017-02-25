const models = require('./../../models/index');
const Joi = require('joi');

module.exports = {
    getCategory: async (ctx, next) => {
        try {
            const { userId } = ctx.params;
            const category = await models.Category.findByUserId(userId);

            ctx.body = {
                category
            };
        } catch (e) {
            ctx.status = 400;
            console.log(e);
            ctx.status = 400;
            ctx.body = {
                message: 'error occurred'
            };
        }
    }
}