const models = require('./../../../models/index');
const Joi = require('joi');

module.exports = {
    create: async (ctx, next) => {

        // 스키마 검사
        const schema = {
            title: Joi.string().required(),
            content: Joi.string().required(),
            visibility: Joi.string().regex(/^(public|private)$/).required(),
            isTemp: Joi.boolean().required(),
            categories: Joi.array().items(Joi.number().required()).required(),
            tags: Joi.array().items(Joi.string().required()).required()
        };

        const validate = Joi.validate(ctx.request.body, schema);
        
        if(validate.error) {
            ctx.status = 400;
            ctx.body = {
                message: 'validation failure'
            }
            return;
        }
        
        const { 
            title,
            content,
            visibility,
            isTemp,
            categories,
            tags
        } = this.request.body;


        const userId = ctx.request.userId;

        try {
            
            // 만약에 isTemp 가 아니라면,
            // 카테고리 id 배열.. 사용해서 
            // PostCategory 에 데이터들을 추가

            // 태그도 마찬가지로, PostTag에 데이터 추가

            // 그 다음에, Post 에 데이터 추가            
        } catch (e) {
            console.log(e);
            ctx.status = 400;
            ctx.body = {
                message: 'error occurred'
            };
        }
    }
}