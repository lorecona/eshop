const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
    name: {
        type: String,
    },
    address: {
        type: String,
    },
    phone: {
        type: Number,
    },
    items: [
        { type: mongoose.Schema.Types.Object, ref: 'item' }
    ],
    isCompleted: {
        type: Boolean,
    },
    totalPrice: {
        type: Number,
    },
    UID: {
        type: mongoose.Schema.Types.Object, ref: 'user',
    },
});

const Order = mongoose.model('order', orderSchema);

module.exports = Order;