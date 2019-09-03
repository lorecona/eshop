const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema({
    name: {
        type: String,
        unique: true,
    },
});

const Category = mongoose.model('category', categorySchema);

module.exports = Category;