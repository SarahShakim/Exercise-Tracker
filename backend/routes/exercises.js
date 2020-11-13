const router =  require('express').Router();//needs express router bc we're creating a router
const { get } = require('mongoose');
const Exercise = require('../models/exercise.model');
//Using CRUD: create, read, update, delete

router.route('/').get((req,res) => {
    Exercise.find()
    .then(exercises => res.json(exercises))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/add').post((req,res) => {
    // get the body for all the fields we created in the models file for exercises
    const username = req.body.username;
    const description = req.body.description;
    const duration = Number(req.body.duration);
    const date = Date.parse(req.body.date);

    const newExercise = new Exercise({
        username, 
        description,
        duration,
        date
    });

    newExercise.save()
    .then( () => res.json('Exercise Added!'))
    .catch(err => res.status(400).json('Error: ' + err));
});
//:id acts as a variable
router.route('/:id').get((req, res) => {
    Exercise.findById(req.params.id)//getting id from the url
      .then(exercise => res.json(exercise))//when we get the id we'll return it as json
      .catch(err => res.status(400).json('Error: ' + err));
  });

//finds the id and deletes it from the database
router.route('/:id').delete((req, res) => {
    Exercise.findByIdAndDelete(req.params.id)
      .then(() => res.json('Exercise deleted.'))
      .catch(err => res.status(400).json('Error: ' + err));
  });
  
  router.route('/update/:id').post((req, res) => {
    Exercise.findById(req.params.id)//find the current exercise by finding the id
      .then(exercise => {
        exercise.username = req.body.username;//set the username to the json object that we put in
        exercise.description = req.body.description;//set the description to the json object that we put in
        exercise.duration = Number(req.body.duration);//set the duration to the json object that we put in
        exercise.date = Date.parse(req.body.date);//set the date to the json object that we put in

        exercise.save()
        .then(() => res.json('Exercise updated!'))
        .catch(err => res.status(400).json('Error: ' + err));
    })
    .catch(err => res.status(400).json('Error: ' + err));
})

module.exports = router;