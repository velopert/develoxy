const Router = require('koa-router');

const router = new Router();

const controller = require('./auth.controller');


router.get('/login/:provider', controller.login);
router.get('/:provider/callback', controller.callback);

module.exports = router;
