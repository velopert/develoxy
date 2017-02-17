const google = require('../../helpers/oauth/google');
const facebook = require('../../helpers/oauth/facebook');

const oauthURL = {
    google: google.url,
    facebook: facebook.url
}


module.exports = {
    login: (ctx, next) => {
        const { provider } = ctx.params;
        ctx.redirect(oauthURL[provider]);
    },
    googleCallback: async (ctx, next) => {
        const { code } = ctx.request.query;
        const tokens = await google.getToken(code);
        const profile = await google.getProfile(tokens.access_token);
        
        // 계정 존재 유무 확인 

        // 없으면 데이터베이스에 저장
        ctx.body = profile // 임시
    },
    facebookCallback: async (ctx, next) => {
        const { code } = ctx.request.query;
        const accessToken = await facebook.getToken(code);
        const info = await facebook.getInfo(accessToken);

        ctx.body = {info, accessToken};
    }
}