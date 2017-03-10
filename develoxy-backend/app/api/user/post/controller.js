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
            categories: Joi.array().items(Joi.number()).required(),
            tags: Joi.array().items(Joi.string()).required()
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
        } = ctx.request.body;


        const userId = ctx.request.userId;

        try {

            // 먼저 데이터를 생성한다.
            const post = await models.Post.create({
                title,
                content,
                visibility,
                isTemp,
                userId
            });

            const postId = post.id;

            if(!isTemp) {
                // 카테고리 관련 작업.
                const categoryPromises = categories.map(
                    categoryId => {
                        return models.PostCategory.create({
                            postId,
                            categoryId
                        });
                    }
                )

                // 태그 관련 작업
                const tagPromises = tags.map(
                    tag => {
                        return models.Tag.create({
                            postId,
                            tag
                        })
                    }
                );

                /// Promise 를 기다린다
                await Promise.all(categoryPromises);
                await Promise.all(tagPromises);
            }

            // 성공시...
            ctx.status = 201;
            ctx.body = {
                postId: postId
            }; 

        } catch (e) {
            console.log(e);
            ctx.status = 400;
            ctx.body = {
                message: 'error occurred'
            };
        }
    }
}