const jwt = require('jsonwebtoken');

const google = require('../../helpers/oauth/google');
const facebook = require('../../helpers/oauth/facebook');
const github = require('./../../helpers/oauth/github');
const jwtSecret = require('./../../../config/extra').jwtSecret;

const environment = require('./../../../config/environment');

const url = environment[process.env.NODE_ENV].proxied_url;


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
            payload,
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
                    profile,
                    token: oauthToken
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
    }
}