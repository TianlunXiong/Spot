const check = require('../../methods/db/check')
const update = require('../../methods/db/update')
const USER = require('../../config').DB.COLLECTION.USER


module.exports = async function (ctx, next) {
    ctx.response.type = "application/json";
    const body = ctx.request.body;
    const timeStamp = new Date().toLocaleString();
    let state = {};

    if (ctx.state.user._hasSession) {
        var temp = false;
        await check(USER, {
            "session_code": ctx.state.user._session
        }).then(r => {
            if (r.length === 1) {
                temp = true;
            }
        })

        if (temp) {
            await update(USER, [{
                    "username": body["username"]
                },
                {
                    $unset: {
                        "session_code": ""
                    }
                }
            ]).then(r => {
                ctx.cookies.set("ous"); //清除 session
                state.success = true;
                state.message = "注销成功"
            })
        } else {
            state.success = false;
        }
    } else {
        state.success = false;
    }

    ctx.response.body = {
        timeStamp,
        state
    }

    await next();
}