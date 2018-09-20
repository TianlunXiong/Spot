const check = require('../../methods/db/check')
const update = require('../../methods/db/update')
const USER = require('../../config').DB.COLLECTION.USER
const LIST = require('./list')

module.exports = async function (ctx, next) {
    ctx.response.type = "application/json"
    const body = ctx.request.body
    const timeStamp = new Date().toLocaleString()
    let state = {}
    if (ctx.state.user._hasSession) {
        var temp = false
        await check(USER, {
            "session_code": ctx.state.user._session
        }).then(r => {
            if (r.length === 1) {
                temp = true
            }
        })

        if (temp) {
            const has = LIST[body.type] || false
            let $pull = {}
            Object.keys(body[has]).forEach(key => {
                $pull[key] = body[has][key]
            })
            if(has) {
                await update(USER, [{
                    "username": body["username"]
                },
                {
                    $pull : {[has] : $pull}
                }
                ]).then(r => {
                    state.success = true
                    state.message = "删除成功"
                })
            } else {
                state.success = false
            }

        } else {
            state.success = false
        }
    } else {
        state.success = false
    }

    ctx.response.body = {
        timeStamp,
        state
    }

    await next()
}