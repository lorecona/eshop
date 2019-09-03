const mongoose = require('mongoose');

const ratingSchema = new mongoose.Schema({
    SID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'item',
        unique:false
    },
    from: {
        type: String,
        unique: false,
    },
    message: {
        type: String,
        unique: false,
    },
    value: {
        type: Number,
        unique: false,
    }
});

const Rating = mongoose.model('rating', ratingSchema);

module.exports = Rating;