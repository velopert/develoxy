const jwt = require('jsonwebtoken');
const extra = require('./../../config/extra');
const jwtSecret = extra.jwtSecret;

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

module.exports = async (ctx, next) => {
    const token = ctx.header['x-access-token'];
    if(!token) {
        ctx.request.logged = false;
        return await next();
    } else {
        try {
            const tokenPayload = await verify(token);
            ctx.request.tokenPayload = tokenPayload;
            if(tokenPayload.data.type === 'user') {
                ctx.request.logged = true;
                ctx.request.userId = tokenPayload.data.userId
            }
            return await next();
        } catch (e) {
            ctx.status = 401;
            ctx.body = {
                message: 'invalid token'
            }
            console.log(e);
            // return await next();
        }
    }
    
}