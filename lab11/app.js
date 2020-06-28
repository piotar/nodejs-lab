require('dotenv').config();

const {ObjectId} = require('mongodb');
const mongoose = require("mongoose");
const MongoClient = require('mongodb').MongoClient;
const uri = process.env.MONGODB_CONNECTION;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
client.connect( async err => {
  const collection = client.db("todo").collection("tasks");
  // perform actions on the collection object
 
  
//   await collection.insertOne({
//       task: "kupić lody",
//       completed: false,
//       createDate: "28.06.2020"
//   })
//   console.log(await collection.find({task:"kupić mleko"  }).toArray());
// await collection.updateMany({}, { $set:{createDate:"28.06.2020"}})

// 

const result = await collection.deleteMany({_id:ObjectId("5ef8b39bf0a546145008ea82")})
console.log(result)
console.log(await collection.find().toArray());
  client.close();
});