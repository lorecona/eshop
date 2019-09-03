const mongoose = require('mongoose');

const itemSchema = new mongoose.Schema({
    name: {
        type: String,
        unique: true,
    },
    description: {
        type: String,
        unique: false,
    },
    CID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'category',
        unique: false,
    },
    distributor: {
        type: String,
        unique: false,
    },
    image: [
        {
            type: String,
            unique: false,
        }
    ],
    price: {
        type: Number,
        unique: false,
    },
    quantity: {
        type: Number,
        unique: false,

    },
    topItem: {
        type:Boolean,
        unique:false,
    },
    PID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'promotion',
        unique: false,
    }
});

const Item = mongoose.model('item', itemSchema);

module.exports = Item;