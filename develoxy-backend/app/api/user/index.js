const Router = require('koa-router');
const category = require('./category');
const authenticated = require('./../../middlewares/authenticated');


const user = new Router();

user.use(authenticated);
user.use('/category', category.routes(), category.allowedMethods());

module.exports = user;