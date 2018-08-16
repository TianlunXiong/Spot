const check = require('../methods/check')
const update = require('../methods/update')
const USER = require('../config').DB.COLLECTION.USER
const crypto = require('crypto')

module.exports = async function (ctx, next) {
    ctx.response.type = "application/json";
    
    // 用户登陆的必要信息:
    // {
    //     "e-mail" : "tainlx@gmail.com",
    //     "password" : "123456"
    // }
    const body = ctx.request.body;
    const timeStamp = new Date().toLocaleString();
    let correct = false;
    let state = {};

    if (!ctx.state.user._hasSession) {
        console.log("validating")
        await check(USER, {
            "e-mail":   body["e-mail"],
            "password": body["password"]
        }).then(r => {
            //登陆信息一致
            if (r.length === 1) {
                correct = true
                state.user = {
                    "e-mail" : body["e-mail"],
                    "name" : r[0]["username"],
                    "icon" : r[0]["icon"] 
                }
            }
        })

        if (correct) {
            var secret = new Date().getTime() + Math.random().toString();
            var session_code = crypto.createHmac('sha256', secret).digest('hex');
            await update(USER, [{
                    "e-mail": body["e-mail"]
                },
                {
                    $set: {
                        "session_code": session_code,
                        "last_loginTime": timeStamp
                    }
                }
            ]).then(r => {
                //ordinary user state
                ctx.cookies.set('ous', session_code, {
                    overwrite: true
                })
            })
            state.success= true;
            

        } else {
            state.success= false;
        }
    } else {
        await check(USER,{
            "session_code" : ctx.state.user._session
        }).then(r=>{
            if(r.length === 1){
                // console.log("by session")
                state.success  = true;
                state.reason = "session";
                state.user = {
                    "e-mail" : body["e-mail"],
                    "name" : r[0]["username"],
                    "icon" : r[0]["icon"] 
                }
            }else{
                state.reason = 'else';
                ctx.cookies.set("ous");
                state.success = false;
            }
        })
    }

    ctx.response.body = {
        timeStamp,
        state,
    }

    await next()

}