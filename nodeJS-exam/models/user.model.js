const mongoose = require('mongoose');

module.exports = mongoose.model('users', {
    firstName:{ type: String, required: true},
    lastName: String,
    username: { type: String, required: true, select: false, unique: true },
    password: { type: String, required: true, select: false },
});