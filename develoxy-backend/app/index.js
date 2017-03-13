// 환경변수 설정
require('dotenv').config();

/* 모듈 불러오기 */

// koa 관련
const Koa = require('koa');
const Router = require('koa-router');
const bodyParser = require('koa-bodyparser');
const jwtMiddleware =require('./middlewares/jwt');

// GraphQL 관련
const mount = require('koa-mount');
const convert = require('koa-convert');
const graphqlHTTP = require('koa-graphql');
const Schema = require('./graphql');

// Redis
const redis = require('./redis');

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
// router.post('/graph', graphql);

app.use(router.routes());



// // GraphQL 설정
app.use(mount('/graphql', convert(graphqlHTTP({
    schema: Schema,
    graphiql: true
}))));


// 서버 실행
app.listen(4000);