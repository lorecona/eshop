const mongoose = require('mongoose');

const promotionSchema = new mongoose.Schema({
    type: {
        type: String,
        unique: false,
    },
    value: {
        type: Number,
        unique: false,
    },
});

const Promotion = mongoose.model('promotion', promotionSchema);

module.exports = Promotion;