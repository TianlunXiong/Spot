const MongoClient = require('mongodb').MongoClient
const assert = require('assert');
let url = '';
console.log(process.env.NODE_ENV)
if (process.env.NODE_ENV === 'production'||process.env.NODE_ENV === 'development') {
    url = 'mongodb://localhost:27017';
}
if (process.env.NODE_ENV === 'docker') {
    url = 'mongodb://mongodb';
}

const dbName = 'myproject';


module.exports = {
    create,
    read,
    update,
    Delete
}

function create(collection, data, callback) {
    connect().then(({ client, db }) => {
        db.collection(collection).insertMany(data).then(result => {
            client.close();
            callback(result);
        });
    })
}

function read(collection, query, callback) {
    connect().then(({ client, db }) => {
        db.collection(collection).find(query).toArray((err, docs) => {
            client.close();
            callback(docs);
        })
    })
}

function update(collection, updateData, callback) {
    connect().then(({ client, db }) => {
        db.collection(collection).update(...updateData).then(result => {
            client.close();
            callback(result);
        });
    })
}

function Delete(collection, filter, callback) {
    connect().then(({ client, db }) => {
        db.collection(collection).deleteOne(filter).then(result => {
            client.close();
            callback(result);
        });
    })
}

function connect() {
    return new Promise((res, rej) => {
        MongoClient.connect(url, (err, client) => {
            assert.equal(null, err);
            console.log('Connected successfully to mongodb');
            const db = client.db(dbName);

            res({ client, db });
        })
    })
}