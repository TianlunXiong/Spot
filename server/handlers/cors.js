module.exports = async function cors_handler(ctx, next) {
    const origin = ctx.request.header.origin;
    //这里可以添加限制访问域名的条件
    //比如 http://localhost:3500
    allowences = new Set()
        .add("http://localhost:8081")
    //.add("other else you want")
    ctx.response.set('Access-Control-Allow-Credentials', true);
    ctx.response.set('Access-Control-Allow-Origin',allowences.has(origin) ? origin : "")

    await next();
}