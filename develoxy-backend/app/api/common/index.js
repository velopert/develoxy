const Router = require('koa-router');

const router = new Router();

const controller = require('./controller');

router.get('/category/:userId', controller.getCategory);

module.exports = router;
