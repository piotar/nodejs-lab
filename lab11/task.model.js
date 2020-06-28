const mongoose = require('mongoose');

module.exports = mongoose.model('tasks', {
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