const google = require('../../helpers/oauth/google');

module.exports = {
    googleLogin: (ctx, next) => {
        ctx.redirect(google.url);
    },
    googleCallback: async (ctx, next) => {
        const { code } = ctx.request.query;
        const tokens = await google.getToken(code);
        const profile = await google.getProfile(tokens.access_token);
        
        // 계정 존재 유무 확인 

        // 없으면 데이터베이스에 저장
        ctx.body = profile // 임시
    }
}