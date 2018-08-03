const db = require('../db')

module.exports = function check(collection, query) {
    return new Promise((res,rej)=>{
        db.read(collection,query,r=>{
            res(r);
        })
    })
}