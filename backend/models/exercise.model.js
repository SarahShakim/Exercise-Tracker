const mongoose = require('mongoose');
const { Schema } = require("mongoose");

//creating a new mongoose schema
const exerciseSchema = new Schema({
    //fields: username, description, duration, date, timestamps
    //info we want to store abt the exercise
    username: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    }, 
    duration: {
        type: Number,
        required: true
    },
    date: {
        type: Date,
        required: true
    }
}, {
    timestamps: true
});
//CRUD: create, read, update, delete
const Exercise = mongoose.model('Exercise', exerciseSchema);

module.exports = Exercise;