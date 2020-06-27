
// ================================================ MongoDB
// const { ObjectId } = require('mongodb');

// require('dotenv').config();
// const MongoClient = require('mongodb').MongoClient;

// const createTask = (task, completed) => {
//   return {task, completed};
// }
// const create = async (collection, task, completed) => {
//   try {
//     const taskItem = createTask(task, completed)
//     await collection.insertOne(taskItem);
//   } catch(error) {
//     console.log(error);
//   }
// }
// // const update = async(collection, id, complited) => {

// // }

// const getTodos = async(collection) => {
//     const result = await collection.find().toArray();
//     console.log(result);
//     return result;
// }


// const uri = process.env.MONGODB_CONNECTION;
// const client = new MongoClient(uri, { useNewUrlParser: true });
// client.connect(async err => {
//   const collection = client.db("charlies-data").collection("charlies");
//   await create(collection, 'wyprowadzić psa', false);
//   await collection.updateOne({_id: "5ef750cf77da0831e4336461"}, {$set: {completed: true}});

//   await getTodos(collection);
//   const deleteResult = await collection.deleteOne({_id: ObjectId('5ef74f182d8dde285c370b29')});
//   console.log(deleteResult);
//   await getTodos(collection);
//   client.close();
// });

// ======================================= MonGoose

// require('dotenv').config();

// const mongoose = require('mongoose');
// mongoose.connect(process.env.MONGODB_CONNECTION, { useNewUrlParser: true });

// const Task = mongoose.model('tasks', { 
//     task: String,
//     completed: Boolean
//  });

//  (async () => {
//     const tasks = await Task.find();
//     const task = new Task({ task: 'Zrobić pranie', completed: false });
//     await task.save();
//     console.log(await Task.find());
//     task.completed = true;
//     await task.save();
//     console.log(await Task.find());
//  })();

// const kitty = new Cat({ name: 'Zildjian' }); ???
// kitty.save().then(() => console.log('meow')); ???

// ================================================ Zadanie 4

require('dotenv').config();

const mongoose = require('mongoose');
const { ObjectId } = require('mongodb');
mongoose.connect(process.env.MONGODB_CONNECTION, { useNewUrlParser: true });

const User = mongoose.model('users', { 
    firstName: String,
    lastName: String
 });

const Task = mongoose.model('tasks', { 
    task: String,
    completed: {
        default: true,
        type: Boolean,
    },
    user: {
        ref: 'users',
        type: mongoose.Schema.Types.ObjectId,
        // odwołanie poprzez ObjectId() w MongoDB)
    }
});

 (async () => {
    const user = new User({
      firstName: 'Jan',
      lastName: 'Kowalski',
    });
    await user.save();
    const tasks = await Task.find().populate('user');
    console.log(tasks);
    tasks[0].user = user;
    tasks[0].save();
    // console.log(await Task.find());
    
 })();
