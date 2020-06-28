require('dotenv').config();

const mongoose = require('mongoose');
mongoose.connect(process.env.MONGODB_CONNECTION, { useNewUrlParser: true, useUnifiedTopology: true });

const User = require('./user.model');
const Task = require('./task.model');

const express = require('express');
const app = express();


app.use(express.json());

app.get('/tasks', async (req, res) => {

    const tasks = await Task.find(req.query);
    res.send(tasks);
});

app.post('/tasks', async (req, res) => {
    const task = new Task(req.body);
    await task.save();
    res.status(201).send(task);
});



app.listen(4000, () => console.log('server started!'));



// (async () => {


//     // const task = new Task({
//     //     task: 'kupić czekolade',
//     //     // completed: false,
//     // });

//     // task.completed = true;

//     // await task.save();

//     // const tasks = await Task.find();
//     // console.log(tasks)

//     const user = new User({
//         firstName: 'Jan',
//         lastName: 'Nowak'
//     });
    

//     const taskMleko = await Task.findById('5ef8a87611a455b9501b75e6')

//     taskMleko.user = user;

//     await taskMleko.save();
//     await user.save();


//     console.log(await Task.find({ completed: true, task: /kupić/i }).populate('user'))


// })();