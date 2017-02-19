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

exports.say = function() {
    console.log('hello');
}

module.exports = async (ctx, next) => {
    const token = ctx.header['x-access-token'];
    if(!token) {
        ctx.request.logged = false;
        return await next();
    } else {
        const tokenPayload = await verify(token);
        ctx.request.tokenPayload = tokenPayload;
        if(tokenPayload.data.type === 'user') {
            ctx.request.logged = true;
            ctx.request.userId = tokenPayload.data.userId
        }
        await next();
    }
    
}