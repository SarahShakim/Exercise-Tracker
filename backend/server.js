const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');//what will allow us to connect to mongoDB

require('dotenv').config();//can have env variables

//creating express server
const app = express();
const port = process.env.PORT || 5000;

//allows us to parse json:
app.use(cors());
app.use(express.json());

const uri = process.env.ATLAS_URI;//uri is where out db is stored
mongoose.connect(uri, { useNewUrlParser: true, useCreateIndex: true });
//useNewUrlParser: used bc mongo rewrote the tool so they put it behind a flag
//useCreateIndex: used to deal with mongo deprocating index function (deals with updates)
const connection = mongoose.connection;
//once(): once the connection is open, it will log that string
connection.once('open', () => {
    console.log("MongoDB database connection established successfully");
})


//requiring the files:
const exercisesRouter = require('./routes/exercises');
const usersRouter = require('./routes/users');
//tells the server to use the routes that were created:
app.use('/exercises', exercisesRouter);
app.use('/users', usersRouter);

//tells the server to listen on a certain port
app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
});