require('dotenv').config();

const mongoose = require('mongoose');
mongoose.connect(process.env.MONGODB_CONNECTION, { useNewUrlParser: true, useUnifiedTopology: true });



const Task = mongoose.model('tasks', {
    task: String,
    completed: {
        type: Boolean,
        default: false,
    },
});




(async () => {


    const task = new Task({
        task: 'kupić czekolade',
        // completed: false,
    });

    task.completed = true;

    await task.save();

    const tasks = await Task.find();
    console.log(tasks)

    const taskMleko = await Task.findById('5ef8a87611a455b9501b75e6')
    taskMleko.completed = true;

    await taskMleko.save();

    console.log(await Task.find())


})();