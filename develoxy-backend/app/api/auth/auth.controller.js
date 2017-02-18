const jwt = require('jsonwebtoken');

const google = require('../../helpers/oauth/google');
const facebook = require('../../helpers/oauth/facebook');
const github = require('./../../helpers/oauth/github');
const jwtSecret = require('./../../../config/extra').jwtSecret;

const environment = require('./../../../config/environment');

const url = environment[process.env.NODE_ENV].proxied_url;

const models = require('./../../models/index');

const oauthURL = {
    google: google.url,
    facebook: facebook.url,
    github: github.url
}

const providers = {
    google, facebook, github
}

function createToken(payload) {
    return new Promise((resolve, reject) => {
        jwt.sign(
            { data: payload },
            jwtSecret,
            {
                expiresIn: '7d',
                issuer: 'develoxy.com',
                subject: 'user'
            },
            (err, token) => {
                if(err) reject(err);
                resolve(token);
            }
        );
    });
}

module.exports = {
    login: (ctx, next) => {
        const { provider } = ctx.params;
        ctx.redirect(oauthURL[provider]);
    },
    callback: async (ctx, next) => {
        const { provider } = ctx.params;
        
        const { code } = ctx.request.query;

        try {

            const oauthToken = await providers[provider].getToken(code);
            const profile = await providers[provider].getProfile(oauthToken);
            const token = await createToken({
                type: 'unregistered',
                provider: provider,
                oauth: {
                    profile
                }
            });

            // 만약에 회원가입 안했을 때
            ctx.redirect(`${url}/callback?token=${token}&register=true`);

        } catch (e) {
            console.log(e);
            ctx.status = 400;
            ctx.body = { 
                message: 'oauth failure'
            }
            return;
        }
    },
    register: async (ctx, next) => {
        const { username } = ctx.request.body;

        // TODO: username 검증

        const tokenPayload = ctx.tokenPayload;

        // 토큰이 존재하지 않음
        if(!tokenPayload) {
            ctx.status = 401;
            ctx.body = {
                message: 'token is invalid'
            };
            return;
        }

        // 이미 가입함
        if(tokenPayload.data.type !== 'unregistered') {
            ctx.status = 403;
            ctx.body = {
                message: 'already registered'
            };
            return;
        }

        // 필요한 값들 추출
        const {
            data: {
                provider,
                oauth: {
                    profile: {
                        id, displayName, email
                    }
                }
            }
        } = tokenPayload;

        // social_id 존재 유무 확인
        const socialIdExists = await models.User.findByOAuth(provider, id);

        if(socialIdExists) {
            ctx.status = 409;
            ctx.body = {
                message: 'already registered'
            };
            return;
        }

        // username 존재 유무 확인
        const usernameExists = await models.User.findByUsername(username);


        if(usernameExists) {
            ctx.status = 409;
            ctx.body = {
                message: 'already registered'
            };
            return;
        }

        let result = null;

        try {
            result = await models.User.create({
                username,
                displayName,
                provider,
                socialId: id,
                email,
            });
        } catch (e) {
            console.log(e);
            ctx.status = 400;
            ctx.body = {
                message: 'error occurred'
            };
            return;
        }

        const token = await createToken({
            type: 'user',
            userId: result.dataValues.id,
            username: username,
            displayName: displayName
        });
        
        ctx.body = {
            success: true,
            token: token
        };
    }
}