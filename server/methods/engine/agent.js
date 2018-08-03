const request = require('superagent')

module.exports = {
    fetch
}

async function fetch(url) {
    return await new Promise((resolve,reject)=>{
        request.get(url).then(r=>{
            resolve({
                header: r.header,
                body : r.body
            })
        })
    })
}