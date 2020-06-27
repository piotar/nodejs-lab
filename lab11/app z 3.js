

require('dotenv').config();

const mongoose = require('mongoose');
mongoose.connect(process.env.MONGODB_CONNECTION, { useNewUrlParser: true, useUnifiedTopology: true });

const Task = mongoose.model('task', {
    task: String,
    completed: Boolean,
});

(async () => {

    // const tasks = await Task.find();
    // console.log(tasks);

    // const task = new Task({
    //     task: 'zrobic pranie',
    //     completed: false,
    // });

    // await task.save();

    // console.log(await Task.find());

    // task.completed = true;
    // await task.save();
    // console.log(await Task.find());

    console.log(await Task.find({ completed: true }));
})();