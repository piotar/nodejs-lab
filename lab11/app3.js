  
const { ObjectId } = require('mongodb');                                // trzeba wydobyc ObjectId z mongodb, aby wykorzystywac wyszukiwanie/zmiany po Id kluczu
require('dotenv').config();

// wykorzystanie mongoose
const mongoose = require('mongoose');
mongoose.connect(process.env.MONGODB_CONNECTION, {useNewUrlParser: true, useUnifiedTopology: true});

const Task = mongoose.model('tasks', {                                   // zasada, ze "modele" zaczyna się z wielkiej litery Task
    task: String,                                                        // trzeba z duzej litery String bo to obiekt    
    completed: Boolean
});                                

(async () => {
    const tasks = await Task.find();
    console.log(tasks);


    // const task = new Task({                                                // tworzymy nowy task
    //     task: 'zrobić pranie',
    //     completed: false,
    // })

    // await task.save();                                                        // zapisuje jawnie powyzszy nowy task 

    // console.log(await Task.find());
    console.log(await Task.find({ completed: true }));                            // wyswietla tylko wartosci spelniajace warunek completed : true

    // task.completed = true;                                                      // pozwala nadpisac wartosc pola w prosty sposob
    // await task.save();                                                          // trzeba po zmianie pola pozniej zapisac ponownie 
    // console.log(await Task.find());
})();