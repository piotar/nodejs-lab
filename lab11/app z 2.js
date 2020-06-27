const { ObjectId } = require('mongodb');

require('dotenv').config();

const MongoClient = require('mongodb').MongoClient;




function createTask(task, completed) {
    return { task, completed }
}

async function create(collection, task, completed) {
    try {
        const taskItem = createTask(task, completed);
        await collection.insertOne(taskItem);
    } catch (error) {
        console.log(error)
    }
}

async function getTodos(collection) {
    const result = await collection.find().toArray();
    console.log(result);
    return result;
}

// async function updateCompleted(collection, id, completed){}



const uri = process.env.MONGODB_CONNECTION;
const client = new MongoClient(uri, { useNewUrlParser: true });
client.connect(async err => {
    const collection = client.db("maciejKasperowicz").collection("tasks");

    // await getTodos(collection);

    // await collection.updateOne({ task: 'kupić mleko' }, { $set: { completed: true } })
    await collection.updateOne({ _id: ObjectId("5ef74f5bd3821729d8cb15e7") }, { $set: { completed: true } })

    const deleteResult = await collection.deleteOne({ _id: ObjectId("5ef74f5bd3821729d8cb15e7") })
    console.log(deleteResult);

    // await create(collection, 'kupić jajka', false);

    await getTodos(collection);
    client.close();
});
