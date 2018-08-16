
module.exports = async function (ctx, next) {
    console.log("options coming")
    ctx.response.set("Access-Control-Allow-Methods", "POST")
    ctx.response.set("Access-Control-Allow-Headers", "content-type")
    ctx.response.set("Access-Control-Allow-Max-Age", 3600)
    ctx.response.status = 204
    await next();
}