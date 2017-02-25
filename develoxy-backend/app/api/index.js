const Router = require('koa-router');
const auth = require('./auth');
const user = require('./user');
const common = require('./common');

const api = new Router();

api.use('/auth', auth.routes(), auth.allowedMethods());
api.use('/user', user.routes());
api.use('/common', common.routes(), common.allowedMethods());

module.exports = api;