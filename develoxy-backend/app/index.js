// 환경변수 설정
require('dotenv').config();

/* 모듈 불러오기 */

// koa 관련
const Koa = require('koa');
const Router = require('koa-router');
const bodyParser = require('koa-bodyparser');
const jwtMiddleware =require('./middlewares/jwt');

// GraphQL 관련
const graphqlKoa = require('graphql-server-koa').graphqlKoa;
const graphiqlKoa = require('graphql-server-koa').graphiqlKoa;
const Schema = require('./graphql');

// Redis
const cache = require('./helpers/cache');
cache.connect();

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

// GraphQL 적용 (아폴로)
const graphqlHandler = graphqlKoa(ctx => ({ schema: Schema, context: ctx }))
router.post('/graphql', graphqlHandler);
router.get('/graphql', graphqlHandler);
router.get('/graphiql', graphiqlKoa({ endpointURL: '/graphql' }));


app.use(router.routes());
app.use(router.allowedMethods());


// 서버 실행
app.listen(4000);