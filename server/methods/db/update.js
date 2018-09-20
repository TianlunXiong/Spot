const db = require('../../db')

module.exports = function update(collection,filter){
    return new Promise((res,rej)=>{
        db.update(collection,filter,r=>{
            res(r);
        })
    });
}