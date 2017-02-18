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
        return await next();
    } else {
        const tokenPayload = await verify(token);
        ctx.tokenPayload = tokenPayload;
        await next();
    }
    
}