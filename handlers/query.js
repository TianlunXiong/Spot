const check = require('../methods/check')
const USER = require('../config').DB.COLLECTION.USER

module.exports = async function (ctx, next) {
    ctx.response.type = "application/json";
    const timeStamp = new Date().toLocaleString();
    let state = {
        "email" : {
            
        },
        "username":{
            
        }
    };
    console.log(ctx.query);

    if (ctx.query.email) {
        await check(USER, {
            "e-mail": ctx.query.email
        }).then(r=>{
            if(r.length === 0){
                state.email.occupied = false
            }else{
                state.email.occupied = true
            }
        })
    }

    if (ctx.query.username) {
        await check(USER, {
            "username": ctx.query.username
        }).then(r=>{
            if(r.length === 0){
                state.username.occupied = false
            }else{
                state.username.occupied = true
            }
        })
    }

    ctx.response.body = {
        timeStamp,
        state
    }


    // await check(USER,{

    // })

    // if (ctx.state.user._hasSession) {
    //     var temp = false;
    //     await check(USER, {
    //         "session_code": ctx.state.user._session
    //     }).then(r => {
    //         if (r.length === 1) {
    //             temp = true;
    //         }
    //     })

    //     if (temp) {
    //         await update(USER, [{
    //                 "username": body["username"]
    //             },
    //             {
    //                 $unset: {
    //                     "session_code": ""
    //                 }
    //             }
    //         ]).then(r => {
    //             ctx.cookies.set("ous");
    //             state.success = true;
    //             state.message = "注销成功"
    //         })
    //     } else {
    //         state.success = false;
    //     }
    // } else {
    //     state.success = false;
    // }



    await next();
}