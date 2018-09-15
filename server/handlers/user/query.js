const check = require('../../methods/check')
const USER = require('../../config').DB.COLLECTION.USER

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
    
    await next();
}