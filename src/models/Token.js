const mongoose = require('mongoose');

const TokenSchema = new mongoose.Schema({

    lote: Number,
    num: Number,
    dataFab: Date,
    token: String
    

});


module.exports = mongoose.model('Token',TokenSchema);
