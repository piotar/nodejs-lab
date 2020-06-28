require('dotenv').config();

const { ObjectId } = require('mongodb');
const MongoClient = require('mongodb').MongoClient;
const uri = process.env.MONGODB_CONNECTION;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
client.connect(async err => {
    const collection = client.db("todo").collection("tasks");
    // const usersCollection = client.db("todo").collection("users");

    // console.log(await collection.find().toArray());

    // await collection.insertOne({
    //     task: "kupić lody",
    //     completed: false,
    //     createDate: '28.06.2020'
    // });

    // console.log(await collection.find({ task: 'kupić mleko' }).toArray());


    // await collection.updateMany({}, { $set : { createDate: '28.06.2020' }})


    // await collection.updateOne({ _id: ObjectId("5ef8b39a4691151dc8df51ce") }, { $set: { completed: true }})

    const result = await collection.deleteMany({ _id: ObjectId("5ef8b33e777c627044938e0c") })

    console.log(result);

    console.log(await collection.find().toArray());

    client.close();
});
