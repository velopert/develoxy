const Router = require('koa-router');

const router = new Router();

const controller = require('./controller');

// const controller = require('./auth.controller');
// router.get('/', (ctx, next) => {
//     ctx.body = 'something'
// });

// router.get('/', controller.get);
router.post('/', controller.create);
router.patch('/:postId', controller.update);


module.exports = router;
