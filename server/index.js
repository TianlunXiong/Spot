const Koa = require('koa')
const serve = require('koa-static')
const Router = require('koa-router')
const koaBody = require('koa-body')
const koaCompress = require('koa-compress')

const config = require('./config')
const routerMaker = require('./router')
const pre = require('./handlers/pre')

const app = new Koa()
const router = new Router()

app.use(koaCompress({
    threshold: 500
    }))
    .use(serve('./static/dist', {
        maxage: 3600 * 60 * 1000,
    }))
    .use(serve('./static/', {
        maxage: 3600 * 15 * 1000
    }))
    .use(koaBody({
        multipart: true,
        jsonLimit: "50mb",
        formLimit: "50mb",
        textLimit: "50mb"
    }))
    .use(pre.cors)
    .use(pre.cookies)
    .use(pre.session)

routerMaker(router)

app.use(router.routes())

console.log(process.env.NODE_ENV)
app.listen(config.PORT, () => {
    console.log("\033[4532m Server has been initiated ... \033[0m", "at", config.PORT)
})