module.exports = async function (ctx, next) {

    ctx.cookies.set('acd', new Date().toLocaleDateString(), {
        "Max-Age": 60 * 60
    })


    await next();

}