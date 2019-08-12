const router = require('express').Router();
const Student = require('../models/student');
const lodash = require('lodash');

//placing a helper function here for routes with the ID parameter
router.param('id', function (req, res, next) {
  let { id } = req.params;
  //check here for incorrect id format
  if (id.length !== 24) {
    res.status(404).send('Incorrect Student ID, please update and try again.');
  }
  //alternatively, we could try to use Mongoose's built-in validator if we coerce into ObjectId
  // if (id.isValid()) {
  //   res.status(404).send('Incorrect Student ID, please update and try again.');
  // }

  else {
    Student.findById(id).exec((err, result) => {
      if (err) throw err;
      if (result === undefined) {
        res.status(404).send('Student not found, please check Student ID.');
      } else {
        req.student = result;
        next();
      }
    })
  }
});


//GET route here for Student by ID
router.get('/:id', (req, res, next) => {
  //this takes advantage of our "middleware" helper function above
  req.student ? res.status(200).send(req.student) : res.status(404).send('Student not found.');
});

//POST route here for Student by ID - to update individual info
router.post('/:id', (req, res, next) => {
  //checks below here for request body data validation
  let { studentUpdates } = req.body;
  //Mongoose function to find and updated specific document
  Student.findByIdAndUpdate( req.student._id, 
    //we'll pass in our updates, Mongo is smart enough to overwrite what is present and leave the rest
    studentUpdates,
    //this parameter tells Mongo to return the updated object to us
    { new: true }, 
    //throw an error or return our shiny updated Student
    function (err, result) {
      if (err) throw err;
      res.send(result);
  });
});


module.exports = router;