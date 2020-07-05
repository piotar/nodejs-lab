require("dotenv").config();

const { ObjectId } = require("mongodb");
const MongoClient = require("mongodb").MongoClient;

const createTask = (task, complited) => ({ task, complited });

async function creat(collection, task, complited) {
  try {
    const taskItem = createTask(task, complited);
    await collection.insertOne(taskItem);
  } catch (error) {
    console.log(error);
  }
}

async function getTodos(collection) {
  const result = await collection.find().toArray();
  console.log(result, "\n---------------------------");
  return result;
}

const uri = process.env.MONGODB_CONNETION;
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
client.connect(async (err) => {
  const collection = client.db("todo").collection("tasks");

  // await getTodos(collection);

  // await creat(collection, "Pomalować płot", false);

  await getTodos(collection);

  // await collection.updateMany(
  //   { _id: ObjectId("5f000d6d83254032d65f4d2c") },
  //   { $set: { complited: true } }
  // );

  const deleteResult = await collection.deleteOne({
    _id: ObjectId("5f01d20051525f15174374ab"),
  });
  console.log(deleteResult);

  await getTodos(collection);

  client.close();
});
