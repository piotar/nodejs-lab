
const mongoose = require("mongoose");
module.exports = mongoose.model('tasks', {
    task: String,
    completed: Boolean,
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users'
    }
});