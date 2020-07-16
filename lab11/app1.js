require("dotenv").config();

const MongoClient = require("mongodb").MongoClient;
const uri = process.env.MONGODB_CONNECTION;
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
client.connect(async (err) => {
  const collection = client.db("todo").collection("tasks");

  console.log(await collection.find().toArray());

  await collection.insertOne({
    task: "kupić lody",
    completed: false,
  });

  console.log(await collection.find().toArray());

  client.close();
});
