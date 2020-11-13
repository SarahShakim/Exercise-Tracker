const router =  require('express').Router();//needs express router bc we're creating a router
const { get } = require('mongoose');
let User = require('../models/user.model');

//first endpoint that handles get requests
router.route('/').get((req, res) => {
    User.find()//mongoose method that gets a list a list of users from db and returns a promise 
    .then(users => res.json(users))//get users and returns users in json format
    .catch(err => res.status(400).json('Error: ' + err));//returns error 
});

//endpoint that handles POST requests
router.route('/add').post((req,res) => {
    const username = req.body.username;

    const newUser = new User({username});//creating a new instance of user

    newUser.save()//saving new user to db
    .then( () => res.json('User Added!'))//returns the user added in json
    .catch(err => res.status(400).json('Error: ' + err));
});
//ADD UPDATE AND DELETE ROUTES!!!!!

module.exports = router;//exporting the router file to use it 