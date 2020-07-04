require("dotenv").config();

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

  await getTodos(collection);

  await creat(collection, "Pomalować płot", false);

  await getTodos(collection);

  client.close();
});
