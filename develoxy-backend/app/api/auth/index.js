const Router = require('koa-router');

const router = new Router();

const controller = require('./auth.controller');


router.get('/login/:provider', controller.login);
router.get('/:provider/callback', controller.callback);
router.post('/register', controller.register);
router.get('/check-username/:username', controller.checkUsername);
router.post('/link-account', controller.linkAccount);

module.exports = router;
