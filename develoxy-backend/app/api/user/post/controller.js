const models = require('./../../../models/index');
const Joi = require('joi');
const _ = require('lodash');

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
        } = ctx.request.body;


        // 태그 중복 처리
        const tags = [...(new Set(ctx.request.body.tags))];


        const userId = ctx.request.userId;

        try {

            if(!isTemp) {
                // 공개 할 시에, 카테고리들이 모두 본인의 것인지 확인한다.
                const categoryPromises = categories.map(
                    categoryId => {
                        return models.Category.findById(categoryId)
                    }
                );

                // 다 기다린다음에
                const results = await Promise.all(categoryPromises);


                for(let result of results) {
                    // userId 가 다르면 끝낸다, 혹은 없어도 끝낸다
                    if(!result || result.userId !== userId) {
                        ctx.status = 401;
                        ctx.body = {
                            message: "no permission to category"
                        }
                        return;
                    }
                }
            }


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
    },

    update: async (ctx, next) => {
        /*
            Update 종류:
                1. 임시저장인걸 임시저장
                2. 임시저장인걸 공개
                3. 공개한걸 수정
                4. 공개한걸 임시저장 [나중에 구현]

            NOTE:
                id 로 찾아서, 현재 isTemp 값 불러온다음에 이번요청의 isTemp 랑 비교해서 
                    - prev.isTemp === isTemp 
                        - 1) isTemp
                        - 2) !isTemp
                    - prev.isTemp && !isTemp
        */


        // 스키마 검사

        const { postId } = ctx.params;

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
            ctx.status = 400;개
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

        // id 로 post를 찾기

        const prev = await models.Post.findById(postId)

        // 포스트가 존재하지 않는다면 끝낸다.
        if(!prev) {
            ctx.status = 403;
            ctx.body = {
                message: 'post not found'
            };
            return;
        }

        // 만약에, 포스트의 userId 와 , 현재의 userId 가 다르다면, 끝낸다
        if(prev.userId !== userId) {
            ctx.status = 401;
            ctx.body = {
                message: 'no permission to post'
            }
            return;
        }

        prev.title = title;
        prev.content = content;
        prev.visibility =  visibility;

        try {
            // 임시 -> 공개 
            if(prev.isTemp && !isTemp) {

                // 공개 할 시에, 카테고리들이 모두 본인의 것인지 확인한다.
                const checkCategoryOwner = categories.map(
                    categoryId => {
                        return models.Category.findById(categoryId)
                    }
                );

                // 다 기다린다음에
                const results = await Promise.all(checkCategoryOwner);


                for(let result of results) {
                    // userId 가 다르면 끝낸다, 혹은 없어도 끝낸다
                    if(!result || result.userId !== userId) {
                        ctx.status = 401;
                        ctx.body = {
                            message: "no permission to category"
                        }
                        return;
                    }
                }

                // 카테고리 관련 작업.
                const createPostCategory = categories.map(
                    categoryId => {
                        return models.PostCategory.create({
                            postId,
                            categoryId
                        });
                    }
                )

                // 태그 관련 작업
                const createTag = tags.map(
                    tag => {
                        return models.Tag.create({
                            postId,
                            tag
                        })
                    }
                );

                /// Promise 를 기다린다
                await Promise.all(createPostCategory);
                await Promise.all(createTag);

            }

            // 공개 -> 공개
            if(!prev.isTemp && !isTemp) {


                // 우선 이전 카테고리와 태그를 찾음

                const prevCategory = (await models.PostCategory.findByPostId(postId))
                                    .map(postCategory => postCategory.categoryId);
                
                const prevTag = (await models.Tag.findByPostId(postId))
                                .map(tag => tag.tag);

                // 추가된 카테고리 / 태그를 구분함 (반대로 구분해야됨)
                
                const addedCategory = _.difference(categories, prevCategory);
                const addedTag = _.difference(tags, prevTag);

                // 위에것들을 추가
                const createCategory = addedCategory.map(
                    categoryId => {
                        return models.PostCategory.create({
                            postId,
                            categoryId
                        });
                    }
                )

                const createTag = addedTag.map(
                    tag => {
                        return models.Tag.create({
                            postId,
                            tag
                        })
                    }
                );




                // 삭제된 카테고리/태그
                
                const deletedCategory = _.difference(prevCategory, categories);
                const deletedTag = _.difference(prevTag, tags);

                const deleteCategory = deletedCategory.map(categoryId => models.PostCategory
                                                                            .destroyByPostCategory({postId, categoryId}));
                const deleteTag = deletedTag.map(tag => models.Tag
                                                                .destroyByPostTag({postId, tag}));

                
                // 기다린다
                await Promise.all(createCategory);
                await Promise.all(createTag);
                await Promise.all(deleteCategory);
                await Promise.all(deleteTag);

            }

            ctx.body = {
                success: true
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