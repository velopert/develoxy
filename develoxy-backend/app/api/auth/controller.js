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

function verify(token) {
    return new Promise(
        (resolve, reject) => {
            jwt.verify(token, jwtSecret, (err, decoded) => {
                if(err) resolve(null);
                resolve(decoded);
            })
        }
    )
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

            // 회원가입 상태 체크
            const user = await models.User.findByOAuth(provider, profile.id);

            if(user) {
                const token = await createToken({
                    type: 'user',
                    userId: user.id,
                    username: user.username,
                    displayName: user.displayName
                });

                ctx.redirect(`${url}/callback?token=${token}&valid=true&thumbnail=${user.thumbnail}`);
            } else {
                // 만약에 회원가입 안했을 때

                // 토큰 미리 만들구
                const token = await createToken({
                    type: 'unregistered',
                    provider: provider,
                    oauth: {
                        profile
                    }
                });

                // 이메일이 존재하는지 확인한다.
                const sameEmailUser = await models.User.findByEmail(profile.email);

                // 같은 이메일로 가입한 아이디가 있다면
                if(sameEmailUser) {
                    const existingProvider = Object.keys(sameEmailUser.socialId)
                                                   .filter(key=>sameEmailUser.socialId[key]!=='')[0];

                    ctx.redirect(`${url}/callback?token=${token}&integrate=true&provider=${provider}&existingProvider=${existingProvider}&email=${profile.email}`);

                    return;
                }


                
                ctx.redirect(`${url}/callback?token=${token}&register=true`);
            }


            

        } catch (e) {
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

        const tokenPayload = ctx.request.tokenPayload;

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

        // // social_id 존재 유무 확인
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
                message: 'username exists'
            };
            return;
        }

        let result = null;

        const socialId = {
            facebook: '',
            google: '',
            github: ''
        };

        socialId[provider] = id;


        try {
            result = await models.User.create({
                username,
                displayName,
                provider,
                socialId,
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
    },
    checkUsername: async (ctx, next) => {
        const { username } = ctx.params;
        const user = await models.User.findByUsername(username);
        ctx.body = {
            exists: !!user
        };
    },
    linkAccount: async (ctx, next) => {
        
        const { token } = ctx.request.body;

        // 현재 로그인 되어있는지 확인
        if(!ctx.request.logged) {
            ctx.status = 401;
            ctx.body = {
                message: 'not logged in'
            };
            return;
        }
        
        // 현재 유저아이디 검색
        const user = await models.User.findById(ctx.request.userId);
        const decoded = await verify(token);

        // 토큰이 유효하지 않음
        if(!decoded) {
            ctx.status = 401;
            ctx.body = {
                message: 'token is invalid'
            }
            return;
        }

        // 연동용 토큰이 아님
        if(decoded.data.type !== 'unregistered') {
            ctx.status = 400;
            ctx.body = {
                message: 'wrong token'
            };
            return;
        }

        // 이메일이 다름
        if(decoded.data.oauth.profile.email !== user.email) {
            ctx.status = 401;
            ctx.body = {
                message: 'different email'
            }
            return;
        }

        const provider = decoded.data.provider;

        // 업데이트
        const a = await user.updateSocialId(provider, decoded.data.oauth.profile.id);



        ctx.body = {
            success: true
        }
    }
}