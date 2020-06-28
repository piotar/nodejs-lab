require('dotenv').config();

const mongoose = require('mongoose');
mongoose.connect(process.env.MONGODB_CONNECTION, { useNewUrlParser: true, useUnifiedTopology: true });


const User = mongoose.model('users', {
    firstName: String,
    lastName: String,
})

const Task = mongoose.model('tasks', {
    task: String,
    completed: {
        type: Boolean,
        default: false,
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users'
    }
});




(async () => {


    // const task = new Task({
    //     task: 'kupić czekolade',
    //     // completed: false,
    // });

    // task.completed = true;

    // await task.save();

    // const tasks = await Task.find();
    // console.log(tasks)

    const user = new User({
        firstName: 'Jan',
        lastName: 'Nowak'
    });
    

    const taskMleko = await Task.findById('5ef8a87611a455b9501b75e6')

    taskMleko.user = user;

    await taskMleko.save();
    await user.save();


    console.log(await Task.find({ completed: true, task: /kupić/i }).populate('user'))


})();