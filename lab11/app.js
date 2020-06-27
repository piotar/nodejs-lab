const MongoClient = require('mongodb').MongoClient;
require('dotenv').config();

const uri = process.env.MONGODB_CONNECTION;
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});
client.connect(async err => {
  const collection = client.db('todo').collection('tasks');

  const result = await collection.find().toArray();
  console.log(result);
  client.close();
})

