const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    fname: {
        type: String,
    },
    lname: {
        type: String,
    },
    username: {
        type: String,
        unique: true,
    },
    email: {
        type: String,
        unique: true,
    },
    password: {
        type: String,
    },
    RID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'role',
    },
});

const User = mongoose.model('user', userSchema);

module.exports = User;