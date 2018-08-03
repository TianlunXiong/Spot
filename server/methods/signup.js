const db = require('../db')

module.exports = function signup(collection,user) {
    return new Promise((res,rej)=>{
        db.create(collection,[{
            ...user
        }],r=>{
            res(r);
        })
    })
}