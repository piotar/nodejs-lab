const { ObjectId } = require('mongodb');

require('dotenv').config();

const MongoClient = require('mongodb').MongoClient;




function createTask(task, completed) {
    return {task, completed}
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


const uri = process.env.MONGODB_CONNECTION;

const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
client.connect(async err => {
    const collection = client.db("todos").collection("tasks");

    // await getTodos(collection)

    // await create(collection, 'kupic jajka', false);

    
    await getTodos(collection)


    await collection.updateOne({ _id: ObjectId('5ef74eee175a2c4a343c2eb1') }, { $set: { completed: true} })


    await getTodos(collection)

    const deleteResult = await collection.deleteOne({ _id: ObjectId('5ef74eee175a2c4a343c2eb1') })
    console.log(deleteResult);

    await getTodos(collection)


    // perform actions on the collection object
    client.close();
});
