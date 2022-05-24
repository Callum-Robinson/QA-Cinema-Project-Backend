// taken from MrWalshyType2 with some changed values

const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcryptjs');

const userSchema = new Schema({
    username: {
        type: String,
        default: null,
        required: [true, 'Please enter your username, usernames must be at least 6 characters in length and no more than 30'],
        minlength: 6,
        maxlength: 30,
        trim: true, // removes any whitespace from either side of a string 
        unique: true
    },

    password: {
        type: String,
        required: true,
        minlength: 8,
        select: false // prevents password from being returned with every request from db
    },

    email: {
        type: String,
        minlength: 8,
        maxlength: 50,
        trim: true,
        required: [true, 'Please enter your email address, must be at least 8 characters and no more than 50'],
        unique: true,
        match: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    },

    createdAt: {
        type: Date,
        default: Date.now()
    },

    role: {
        type: String,
        enum: ['ADMIN', 'MEMBER'],
        default: 'MEMBER'
    }
});

// document middleware, hooking into the middleware for save operations on documents
userSchema.pre('save', async function(next) {
    // hash+salt the currently set password if it is new or has been modified
    if (this.password && this.isModified('password')) {
        this.password = await bcrypt.hash(this.password, 8);
    }

    // must be called to advance Mongooses middleware chain
    next();
});

const User = mongoose.model('User', userSchema);

module.exports = User;
