module.exports = async function (ctx, next) {

    ctx.cookies.set('acd', new Date().toLocaleDateString(), {
        "Max-Age": Date.now() * Math.random()
    })


    await next();

}