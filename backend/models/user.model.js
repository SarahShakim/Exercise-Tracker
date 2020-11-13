const mongoose = require('mongoose');
const { Schema } = require("mongoose");

//creating a new mongoose schema
const userSchema = new Schema({
    //field is username 
    username: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        minlength: 3
    }
}, {
    timestamps: true,//automatically create fields when it was created or modified
});

const User = mongoose.model('User', userSchema);

module.exports = User;//exporting so we can use it in other files