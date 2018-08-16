module.exports = async function (ctx, next) {
    var session = ctx.cookies.get('acd');
    
    if(session){
        ctx.cookies.set('acd', new Date().toLocaleDateString(), {
            "Max-Age": Date.now() * Math.random()
        })
    }

    await next();

}