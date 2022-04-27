//Require Mongoose
const mongoose = require('mongoose');

//Define a schema
const Schema = mongoose.Schema;


// define user schema
const UserSchema = new Schema({
    username: {
        type: String,
        lowercase: true,
        unique: true,
        required: [true, "Can't be blank"],
        index: true
    },
    password: {
        type: String,
        required: true,
        select: false,
        minlength:  [8, "Please use minimum of 8 characters"],
    },
    email: {
        type: String,
        lowercase: true,
        required: [true, "Can't be blank"],
        match: [/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/, 'Please use a valid address'],
        unique:true,
        index:true
    },
    profile: {
        firstName: String,
        lastName: String,
        avatar: String,
        bio: String,
        phone: String,
        gender: String,
        address: {
            street1: String,
            street2: String,
            city: String,
            state: String,
            country: String,
            zip: String,
            location: {
                type: Point,
                required: false
            }
        },
        required:false
    },
    resetPasswordToken: String,
    resetPasswordExpire: String,

    active: { type: Boolean, default: true }
});

module.exports = mongoose.model('UserModel', UserSchema );