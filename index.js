const Koa = require('koa');
const serve = require('koa-static');
const Router = require('koa-router');
const koaBody = require('koa-body');
const config = require('./config');
const app = new Koa();
const router = new Router();

const cookies_handler = require('./handlers/cookies')
const session_handler = require('./handlers/session')
const login_handler = require('./handlers/login')
const logout_handler = require('./handlers/logout')
const register_handler = require('./handlers/register')
const query_handler = require('./handlers/query')
const find_handler = require('./handlers/find')
const update_handler = require('./handlers/update')
const delete_handler = require('./handlers/delete')
const post_handler = require('./handlers/post')
const cors_handler = require('./handlers/cors');
const api_handler = require('./handlers/api');

app.use(serve('./develop/dist', {
        maxage: 3600*60
    }))
    .use(koaBody({multipart:true}))
    .use(cors_handler)
    .use(cookies_handler)
    .use(session_handler)

router.post('/post',post_handler);
router.post('/update',update_handler);
router.post('/login',login_handler);
router.post('/logout',logout_handler);
router.post('/register', register_handler);
router.post('/delete',delete_handler);
router.get('/find',find_handler);
router.get('/query',query_handler);
router.get('/api/hotnews', api_handler.hotNews);
router.get('/api/search', api_handler.search);
router.get('/api/answer',api_handler.answer);
router.get('/api/comment',api_handler.comment);
router.get('/api/agent',api_handler.agent);

app.use(router.routes())

console.log(process.env.NODE_ENV);
app.listen(config.PORT, () => {
    console.log("\033[45;32m Server has been initiated ... \033[0m","at",config.PORT)
});