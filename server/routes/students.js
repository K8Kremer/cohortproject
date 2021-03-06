const router = require('express').Router();
const Student = require('../models/student');
const lodash = require('lodash');


//set route to get students 
router.get('/', (req,res,next) => {
  let cohortQuery = req.query.cohort; 
  let fullNameQuery = req.query.fullName || '';
    //if no cohort query is specified return all students ordered by cohort and lastname
    if (!cohortQuery) {
        Student
            .find({ fullName: { $regex: new RegExp(fullNameQuery, 'i')}})
            .sort({'cohort': 1, 'name.last': 1})
            .exec((err, students) => {
                if (err) {
                    res.status(400).send('Unable to retrieve students');
                }
                res.send(students);
            })
    //if there is a cohort query get students sorted by lastname
    } else if (cohortQuery) {
        Student
            .find({cohort: cohortQuery, fullName: { $regex: new RegExp(fullNameQuery, 'i')}})
            .sort({'name.last': 1})
            .exec((err, students) => {
              if (err) {
                  res.status(400).send('Make sure cohort query represents a valid cohort');                    
              }
              
              res.send(students);
            })
    }
})


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
      if (err) return next(err);
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
  
  //Mongoose function to find and updated specific document
  Student.findByIdAndUpdate( req.student._id, 
    //we'll pass in our updates, Mongo is smart enough to overwrite what is present and leave the rest
    req.body,
    //this parameter tells Mongo to return the updated object to us
    { new: true }, 
    //return an error or return our shiny updated Student
    function (err, result) {
      if (err) return next(err);
      res.send(result);
  });
});

//POST route for /students (adds students to DB)
router.post('/', (req, res, next) => {
  //checks below here for request body data validation
  //we creating newStudent by referencing Student Schema
  //which is passing in the request body.
  //We are assuming that the front end will handle data validation. 
  const newStudent = new Student(req.body)
  const concattedFullName = req.body.firstName + req.body.lastName;
  newStudent.fullName = concattedFullName;
  newStudent.save((err, result) => {
    if (err) return next(err);
    // saved!
    res.send(result);

  });
});

module.exports = router;
