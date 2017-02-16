const Router = require('koa-router');
const auth = require('./auth');

const api = new Router();

api.use('/auth', auth.routes(), auth.allowedMethods());

module.exports = api;