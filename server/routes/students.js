const router = require('express').Router();
const Student = require('../models/student');


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


module.exports = router;