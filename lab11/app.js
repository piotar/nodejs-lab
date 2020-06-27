require('dotenv').config();
const mongoose = require('mongoose');
// const MongoClient = require('mongodb').MongoClient;

const User = mongoose.model('users', {
    firstName: { default: "Jan", type: String },
    lastName: String,
});

mongoose.connect(process.env.MONGODB_CONNECTION, { useNewUrlParser: true, useUnifiedTopology: true });

const Task = mongoose.model('tasks', {
    task: String,
    completed: Boolean,
    user: {
        ref: 'users',
        type: mongoose.Schema.Types.ObjectId,
        //ObjectId,
    },
});

(async () => {
    // const tasks = await Task.find();
    // console.log(tasks);

    // const task = new Task({
    //     task: "zjeść obiad",
    //     completed: false,
    // });
    // await task.save();
    // console.log(await Task.find());

    // task.completed = true;
    // await task.save();
    const user = new User({
        lastName: "Nowak"
    });
    await user.save();

    const tasks = await Task.find().populate('user');
    console.log(tasks);

    tasks[0].user = user;
    tasks[0].save();
    // console.log(user);
    // console.log(await Task.find());
})();

// function createTask(task, completed) {
//     return { task, completed };
// };

// async function create(collection, task, completed) {
//     try {
//         const taskItem = createTask(task, completed);
//         await collection.insertOne(taskItem);
//     } catch (err) {
//         console.log(err)
//     }
// };

// async function getToDos(collection) {
//     const result = await collection.find().toArray();
//     console.log(result);
//     return result;
// };

// async function updateCompleted(collection, id, completed) {

// }

// const uri = process.env.MONGODB_CONNECTION;
// const client = new MongoClient(uri, { useNewUrlParser: true });
// client.connect(async err => {
//     const collection = client.db("Lab-27-06-2020").collection("Lab-27-06-2020");
//     await create(collection, "kupić wędlinę", false);
//     await getToDos(collection);

//     await collection.updateOne({ task: "kupić wędlinę" }, { $set: { completed: true } })

//     const deleteResult = await collection.deleteOne({ task: "kupić wędlinę" });
//     await getToDos(collection);
//     client.close();
// });
