const models = require('./../../../models/index');
const Joi = require('joi');

module.exports = {
    create: async (ctx, next) => {

        // 스키마 검사
        const schema = {
            name: Joi.string().required()
        };

        const validate = Joi.validate(ctx.request.body, schema);
        if(validate.error) {
            ctx.status = 400;
            ctx.body = {
                message: 'validation failure'
            }
            return;
        }

        const { name } = ctx.request.body;
        const userId = ctx.request.userId;

        try {
            const count = await models.Category.countBaseLeaves(userId);

            await models.Category.create({
                name,
                userId,
                index: count,
            });
        } catch (e) {
            console.log(e);
            ctx.status = 400;
            ctx.body = {
                message: 'error occurred'
            };
        }
    },
    move: async (ctx, next) => {

        // 스키마 검사
        
        const schema = {
            id: Joi.number(),
            parent: Joi.number(),
            index: Joi.number()
        };

        const validate = Joi.validate(ctx.request.body, schema);
        
        if(validate.error) {
            ctx.status = 400;
            ctx.body = {
                message: 'validation failure'
            }
            return;
        }

        // 이전 정보 불러오기

        // CASE 1 parent가 바뀌었을때
        
        /*
            기존 parent 로 검색을해서, 그 하단에 있는 카테고리들 moveUp
        */

        /*
            새로운 parent로 검색을 해서, 그 위치 + 하단에 있는 카테고리들 moveDown
        */

        // CASE 2 index 만 바뀌었을때

        /*
            기존 위치 ~ 새로운 위치-1 까지의 아이템들을 moveUp
            새로운 위치 + 하단에있는 애들은 moveDown
        */

        // 아이템, 업데이트.
    }
}