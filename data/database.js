const mongodb = require('mongodb')
const MongoClient = mongodb.MongoClient
let database

async function connectDb(){
    let client = await MongoClient.connect('mongodb://127.0.0.1:27017')
    database = client.db('check')
}

function getDb(){
    if(!database){
        throw Error('Oops something went wrong')
    }
    return database
}


module.exports = {
    connectDb: connectDb,
    getDb: getDb
}