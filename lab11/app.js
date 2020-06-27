require('dotenv').config();

const MongoClient = require('mongodb').MongoClient;


const uri = process.env.MONGODB_CONNECTION;

const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
client.connect(async err => {
    const collection = client.db("todos").collection("tasks");

    const result = await collection.find().toArray();
    console.log(result);

    // perform actions on the collection object
    client.close();
});
