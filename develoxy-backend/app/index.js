/* 모듈 불러오기 */
const Koa = require('koa');
const Router = require('koa-router');
const bodyParser = require('koa-bodyparser');

const api = require('./api');


const app = new Koa();

// body-parser 적용
app.use(bodyParser());


// 라우터 설정
const router = new Router();
router.use('/api', api.routes());
app.use(router.routes());

// 서버 실행
app.listen(3000);
