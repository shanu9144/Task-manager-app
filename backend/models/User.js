const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true
    },
    password: {
        type: String,
        required: true,
        select: false // Hide password by default
    }
}, {
    timestamps: true,
    versionKey: false
});

// Remove the pre-save middleware since we're handling password hashing in the controller

const User = mongoose.model('User', userSchema);

module.exports = User;
