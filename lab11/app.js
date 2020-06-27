const { ObjectId } = require('mongodb');

const MongoClient = require('mongodb').MongoClient;
require('dotenv').config();

function createTask (task, completed) {
  return { task, completed }
}

async function create(collection, task, completed) {
  try {
    const taskItem = createTask(task, completed);
    await collection.insertOne(taskItem);
  } catch (e) {
    console.log(e);
  }
}

async function getTodos(collection){
  const result = await collection.find().toArray();
  console.log(result);
  return result;
}

async function updateCompleted(collection, id, completed) {

}

const uri = process.env.MONGODB_CONNECTION;
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});
client.connect(async err => {
  const collection = client.db('todo').collection('tasks');

  await getTodos(collection);

  // await create(collection, 'kupic jajka', false);
  // await getTodos(collection);

  // await collection.updateOne({ _id: ObjectId('5ef74ef4385aa524f0dbea8b') }, {$set: {completed: true }});
  // await getTodos(collection);

  const deleteResutl = await collection.deleteOne({ _id: ObjectId('5ef74ef4385aa524f0dbea8b') } );
  // console.log(deleteResutl);
  await getTodos(collection);

  client.close();
})

