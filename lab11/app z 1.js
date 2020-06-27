require('dotenv').config();
const MongoClient = require('mongodb').MongoClient;
const uri = process.env.MONGODB_CONNECTION;
const client = new MongoClient(uri, { useNewUrlParser: true });
client.connect(async err => {
    const collection = client.db("maciejKasperowicz").collection("tasks");
    // perform actions on the collection object
    const result = await collection.find().toArray();
    console.log(result);
    client.close();
});
