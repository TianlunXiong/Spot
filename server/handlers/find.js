const check = require('../methods/check')
const USER = require('../config').DB.COLLECTION.USER


module.exports = async function (ctx, next) {
    ctx.response.type = "application/json";
    const timeStamp = new Date().toLocaleString();
    let state = {};
    // console.log(ctx.state.user._hasSession)
    if (ctx.state.user._hasSession) {
        await check(USER, {
            "session_code": ctx.state.user._session
        }).then(r => {
            if (r.length === 1) {
                state.articles = r[0].articles;
                state.success = true;
            }
        })

    } else {
        state.success = false;
    }

    ctx.response.body = {
        timeStamp,
        state
    }

    await next();
}