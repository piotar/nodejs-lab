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
        default: true,
        type: Boolean
    },
    user: {
        ref: 'users',
        type: mongoose.Schema.Types.ObjectId
    }
});

(async () => {
    // const tasks = await Task.find();
    // console.log(tasks);


    // const task = new Task({
    //     task: 'zrobic pranie',
    //     completed: false,
    // });

    // await task.save();

    // console.log(await Task.find( { completed: true }));

    // task.completed = true;

    // await task.save();

    // console.log(await Task.find());



    // const user = new User({
    //     firstName: 'Jan',
    //     lastName: 'Nowak',
    // });
    // await user.save()

    const task = await Task.findOne().populate('user');
    console.log(task);

    // task.user = user

    // await task.save();

    // console.log(await Task.find());

})();