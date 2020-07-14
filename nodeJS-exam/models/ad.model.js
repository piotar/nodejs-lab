const mongoose = require('mongoose');


module.exports = mongoose.model('ads', {
    ad:{
        type: String,
        required: true
    },
    category:{
        type: Array,
        default: 'domyślna'
    },
    price:{
        type: Number,
        required: true,
        default: 0
    },
    date:{ 
        type: Date,
        default: new Date()
    },
    // referencja do kolekcji 'users'
    user: {
        ref: 'users',
        type: mongoose.Schema.Types.ObjectId,
    },
});