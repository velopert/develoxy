const google = require('../../helpers/oauth/google');
const facebook = require('../../helpers/oauth/facebook');
const github = require('./../../helpers/oauth/github');

const oauthURL = {
    google: google.url,
    facebook: facebook.url,
    github: github.url
}

const providers = {
    google, facebook, github
}

module.exports = {
    login: (ctx, next) => {
        const { provider } = ctx.params;
        console.log(oauthURL.github);
        ctx.redirect(oauthURL[provider]);
    },
    callback: async (ctx, next) => {
        const { provider } = ctx.params;
        
        const { code } = ctx.request.query;

        try {
            const token = await providers[provider].getToken(code);
            const profile = await providers[provider].getProfile(token);
            ctx.body = profile;
        } catch (e) {
            ctx.status = 400;
            ctx.body = { 
                message: 'oauth failure'
            }
            return;
        }
    }
}