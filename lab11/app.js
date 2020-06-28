require('dotenv').config();

const mongoose = require("mongoose");
mongoose.connect(process.env.MONGODB_CONNECTION, { useNewUrlParser: true, useUnifiedTopology: true  });


const User = mongoose.model('users', {
    firstName: String,
    lastName: String,    
})

const Task = mongoose.model('tasks', {
    task: String,
    completed: Boolean,
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users'
    }
});

(async ()=>{
    // const task = new Task({
    //     task: "kupić czekoladę",
    //     completed: false,
    // });
    // await task.save();

    // const tasks = await Task.find();
    // console.log(tasks)
    // const user = new User({
    //     firstName: "Jan", 
    //     lastName: "Nowak"
    // })
    // await user.save();
    // const taskMleko = await (await Task.findById("5ef8a67a9e00895ce14496fa"));
    // taskMleko.user=user;
    // taskMleko.completed = true;
    // await taskMleko.save();
    
    console.log(await Task.find({completed: true}).populate("user"))

})()