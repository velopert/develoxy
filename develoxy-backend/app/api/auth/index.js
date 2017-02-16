const Router = require('koa-router');

const router = new Router();

router.post('/login/:provider', (ctx, next) => {
  ctx.body = {
    provider: ctx.params.provider
  };
});

module.exports = router;
