const router = require('express').Router();
const Student = require('../models/student');
const lodash = require('lodash');


//set route to get students 
router.get('/', (req,res,next) => {
    let cohortQuery = req.query.cohort;
    //if cohort query is specified return all students ordered by cohort
    if (!cohortQuery) {
        Student
            .find()
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
            .find({cohort: cohortQuery})
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

router.post("/", (req, res) => {
  
  //const name = req.body.name
  const { name, packages, jobSeekingStatus, employmentLocationPreference, typeOfWorkDesired, industriesPreferred, picture, bio, address, email, linkedIn, phone, resume, cohort, graduationDate, updated_at, created_at  } = req.body
  //using Product schema to create a new document in MONGODB
  let student = new Student()
  student.name = {
    title: name.title || '',
    first: name.first || '',
    last: name.last || ''
  };
  student.packages = [];
  student.jobSeekingStatus = jobSeekingStatus;
  student.employmentLocationPreference = employmentLocationPreference;
  student.typeOfWorkDesired = typeOfWorkDesired;
  student.industriesPreferred = industriesPreferred;
  student.picture = {
    large: large,
    medium: medium,
    thumbnail: thumbnail
  };
  student.bio = bio;
  student.address = address;
  student.email = email;
  student.linkedIn = linkedIn;
  student.phone = phone;
  student.resume = resume; //this is going to change with fs 
  student.cohort = cohort;
  student.graduationDate = graduationDate;
  student.updated_at = updated_at;
  student.created_at = created_at

  student.save((err) => {
    if (err) throw err
    return res.send(student);
  });

});

module.exports = router;
