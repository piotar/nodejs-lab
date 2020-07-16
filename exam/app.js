require("dotenv").config();

const MongoClient = require("mongodb").MongoClient;
const uri = process.env.MONGODB_CONNECTION;
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
client.connect(async (err) => {
  const collection = client.db("Ads_Board").collection("Ads_collection");

  console.log(await collection.find().toArray());

  client.close();
});
