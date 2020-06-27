const { ObjectId } = require('mongodb');                                // trzeba wydobyc ObjectId z mongodb, aby wykorzystywac wyszukiwanie/zmiany po Id kluczu
require('dotenv').config();

// wykorzystanie mongoose
const mongoose = require('mongoose');
mongoose.connect(process.env.MONGODB_CONNECTION, {useNewUrlParser: true, useUnifiedTopology: true});

const User = mongoose.model('users', {                                   
    firstName: String,                                                         
    lastName: Boolean
});     

const Task = mongoose.model('tasks', {                                   
    task: String,                                                         
    completed: {
        default: true,                                                      // mozna wartosc defaultowa podac jezeli ktos nie poda wartosci przy updatcie
        type: Boolean
    },
    user: {
        ref: 'users',                                                      // referencja do users (musi sie odnoscic jako typ ObjectId)
        type: mongoose.Schema.Types.ObjectId                             // z samego mongoosa mozna wyniesc ObjectId
        // type: ObjectId                                                     // lub importujac z mongodb (1 linijka)
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