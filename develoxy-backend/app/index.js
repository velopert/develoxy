// 환경변수 설정
require('dotenv').config();

/* 모듈 불러오기 */

// koa 관련
const Koa = require('koa');
const Router = require('koa-router');
const bodyParser = require('koa-bodyparser');
const jwtMiddleware =require('./middlewares/jwt');

// 라우터
const api = require('./api');

// Koa 인스턴스 생성
const app = new Koa();

// 데이터베이스 연결
const models = require('./models');

// body-parser 적용
app.use(bodyParser());
app.use(jwtMiddleware);

// 라우터 설정
const router = new Router();

router.use('/api', api.routes());
app.use(router.routes());


// 서버 실행
app.listen(4000);