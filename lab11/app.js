require('dotenv').config();

const mongoose = require("mongoose");
mongoose.connect(process.env.MONGODB_CONNECTION, { useNewUrlParser: true, useUnifiedTopology: true  });

const Task = mongoose.model('tasks', {
    task: String,
    completed: Boolean,
});

(async ()=>{
    // const task = new Task({
    //     task: "kupić czekoladę",
    //     completed: false,
    // });
    // await task.save();
    const tasks = await Task.find();
    console.log(tasks)

    const taskMleko = await Task.findById("5ef8a67a9e00895ce14496fa")
    taskMleko.completed = true;
    taskMleko.save();
    
    console.log(await Task.find())

})()