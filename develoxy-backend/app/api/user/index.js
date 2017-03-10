const Router = require('koa-router');
const category = require('./category');
const post = require('./post');

const authenticated = require('./../../middlewares/authenticated');

const router = new Router();

router.use(authenticated);
router.use('/category', category.routes(), category.allowedMethods());
router.use('/post', post.routes(), post.allowedMethods());

module.exports = router;