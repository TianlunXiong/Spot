const check = require('../methods/check')
const signup = require('../methods/signup')
const USER = require('../config').DB.COLLECTION.USER

module.exports = async function (ctx, next) {
    const body = ctx.request.body;
    const timeStamp = new Date().toLocaleString();
    ctx.response.type = "application/json"
    // 用户注册的必要信息:
    // {
    //     "e-mail" : "tainlx@gmail.com",
    //     "password" : "123456",
    //     "username" : "tainlx"
    // }
    let append = {
        // 用户注册额外信息
        signup_time: timeStamp,
        //默认用户图标
        icon: "http://element.eleme.io/static/hamburger.50e4091.png",
        articles: [
        ]
    }

    if (body["e-mail"] && body["password"] && body["username"]) {
        // console.log('开始查询')
        await Promise.all([
            check(USER, {
                "e-mail": body["e-mail"]
            }),
            check(USER, {
                "username": body["username"]
            })
        ])
            .then(r => {
                if (r.some(elem => {
                    return (elem.length !== 0) ? true : false;
                })) {
                    // console.log("已占用")
                    ctx.response.body = {
                        timeStamp,
                        state: {
                            success: false
                        }
                    }
                } else {
                    signup(USER, {
                        ...body,
                        ...append
                    })
                    ctx.response.body = {
                        timeStamp,
                        state: {
                            success: true
                        }
                    }
                }
            })
        // console.log('结束注册')
    } else {
        ctx.throw(400, "Error occurs")
    }

    await next();
}