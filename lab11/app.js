require('dotenv').config();

const mongoose = require("mongoose");
mongoose.connect(process.env.MONGODB_CONNECTION, { useNewUrlParser: true, useUnifiedTopology: true  });
const User = require('./user.model');
const Task = require('./task.model');
const express = require('express');
const app = express();

app.use(express.json());

app.get("/tasks", async (req, res)=>{
    const tasks = await Task.find(req.query);
    res.send(tasks);
})
app.post("/tasks", async (req, res)=>{

    const task = new Task(req.body);
    await task.save();
    res.status(201).send(task);
})


app.listen(4000, ()=>{
    console.log("server started");
})

// (async ()=>{
//     // const task = new Task({
//     //     task: "kupić czekoladę",
//     //     completed: false,
//     // });
//     // await task.save();

//     // const tasks = await Task.find();
//     // console.log(tasks)
//     // const user = new User({
//     //     firstName: "Jan", 
//     //     lastName: "Nowak"
//     // })
//     // await user.save();
//     // const taskMleko = await (await Task.findById("5ef8a67a9e00895ce14496fa"));
//     // taskMleko.user=user;
//     // taskMleko.completed = true;
//     // await taskMleko.save();
    
//     console.log(await Task.find({completed: true}).populate("user"))

// })()