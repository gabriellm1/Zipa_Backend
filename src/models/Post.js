const mongoose = require('mongoose');

const PostSchema = new mongoose.Schema({
    user: String,
    quantity: Number,
    coordinate: {
        latitude: Number,
        longitude: Number,
    },

},{timestamps: true});

PostSchema.index({createdAt: 1},{expireAfterSeconds: 604800});

module.exports = mongoose.model('Post',PostSchema);


