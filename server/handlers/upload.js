const fs = require('fs')
const crypto = require('crypto')

module.exports = async function (ctx, next) {
    const type = ctx.request.headers['content-type']
    ctx.response.type = "application/json";
    let path = ''
    await new Promise((resolve, reject) => {
        ctx.req.on('data', chuck => {
            // console.log("搞的不丑", type.split('/')[1])
            path = `images/${crypto.createHash('md5').update(chuck).digest('hex')}.${type.split('/')[1]}`
            console.log(path);
            fs.access(`./static/${path}`,fs.constants.F_OK, e => {
                console.log(`${e? "不存在" : "存在"}`)
                if(e){
                    fs.createWriteStream(`./static/${path}`).write(chuck, e => {
                        
                    });
                    ctx.response.body = {
                        success: true,
                        state: {
                            path
                        }
                    }
                }
                resolve(true)
            })

        })
    })

    await next();
}