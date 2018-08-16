const fs = require('fs')
const crypto = require('crypto')
const check = require('../methods/check')
const USER = require('../config').DB.COLLECTION.USER

module.exports = async function (ctx, next) {
    ctx.response.type = "application/json"
    
    if (ctx.state.user._hasSession) {
        let isLogin = false
        await check(USER, {
            "session_code": ctx.state.user._session
        }).then(r => {
            if (r.length === 1) {
                isLogin = true
            }
        })

        if (isLogin) {
            const type = ctx.request.headers['content-type']
            let chucks = []
            let size = 0
            let path = ''
            await new Promise((resolve, reject) => {
                ctx.req.on('data', chuck => {
                    chucks.push(chuck)
                    size += chuck.length
                })
        
                ctx.req.on('end', () => {
                    let buffer = Buffer.concat(chucks, size)
                    path = `images/${crypto.createHash('md5').update(buffer).digest('hex')}.${type.split('/')[1]}`
                    if(!fs.existsSync('./static/images')){
                        fs.mkdirSync('./static/images')
                    }
                    fs.access(`./static/${path}`, fs.constants.F_OK, e => {
                        if (e) {
                            fs.createWriteStream(`./static/${path}`).write(buffer, e => {
                                // console.log("完成")
                                ctx.response.body = {
                                    success: true,
                                    state: {
                                        path
                                    }
                                }
                                resolve(true)
                            })
                        } else {
                            // console.log("已存在")
                            ctx.response.body = {
                                success: true,
                                state: {
                                    path
                                }
                            }
                            resolve(true)
                        }
                    })
                })
            })
        } else {
            ctx.response.body = {
                success: false,
                state: {
                    reason: "invalid"
                }
            }
        }
    } else {
        ctx.response.body = {
            success: false,
            state: {
                reason: "noLogin"
            }
        } 
    }


    await next();
}