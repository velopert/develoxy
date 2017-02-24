module.exports = async (ctx, next) => {
    // 현재 로그인 되어있는지 확인
    if(!ctx.request.logged) {
        ctx.status = 401;
        ctx.body = {
            message: 'not logged in'
        };
        return;
    }

    await next();
}