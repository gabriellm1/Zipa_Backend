const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    user: String,
    avaiable: Number,
    friend: Number,
    history: [{
        quantity:Number,
        coordinate:{
            latitude: Number,
            longitude: Number
        },
        date: String,
        adress: String
    }],
}, { collection: 'users' });


module.exports = mongoose.model('User',UserSchema);


