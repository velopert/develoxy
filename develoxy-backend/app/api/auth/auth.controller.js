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

        const token = await providers[provider].getToken(code);
        const profile = await providers[provider].getProfile(token);

        ctx.body = profile;
    },
    googleCallback: async (ctx, next) => {
        const { code } = ctx.request.query;
        const token = await google.getToken(code);
        const profile = await google.getProfile(token);
        ctx.body = profile;
    },
    facebookCallback: async (ctx, next) => {
        const { code } = ctx.request.query;
        const token = await facebook.getToken(code);
        const profile = await facebook.getProfile(token);
        ctx.body = profile;
    },
    githubCallback: async (ctx, next) => {
        const { code } = ctx.request.query;
        const token = await github.getToken(code);
        const profile = await github.getProfile(token);
        ctx.body = profile;
    }
}