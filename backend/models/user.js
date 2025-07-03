const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    uid: {
        type: String,
        required: true,
    },
    username: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    signinMethod: {
        type: String,
        enum: ['email', 'google'],
        required: true
    },
    profilePicture: {
        type: String,
        required: false,
        default: null
    }
});

module.exports = mongoose.model('User', userSchema);