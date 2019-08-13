const router = require('express').Router();
const Package = require('../models/package');
const lodash = require('lodash');

//placing a helper function here for routes with the ID parameter
router.param('id', function (req, res, next) {
  let { id } = req.params;
  //check here for incorrect id format
  if (id.length !== 24) {
    res.status(404).send('Incorrect Package ID, please update and try again.');
  }
  //alternatively, we could try to use Mongoose's built-in validator if we coerce into ObjectId
  // if (id.isValid()) {
  //   res.status(404).send('Incorrect Package ID, please update and try again.');
  // }

  else {
    Package.findById(id).exec((err, result) => {
      if (err) throw err;
      if (result === undefined) {
        res.status(404).send('Package not found, please check Package ID.');
      } else {
        req.package = result;
        next();
      }
    })
  }
});

// GET route for all packages 
// should be able to filter by status (seenByEmployer - boolean) and 
// search by employer's name (employerName - string) 
router.get('/', (req, res, next) => {
  // check if seenByEmployer is specified (true/false: convert string to boolean if so)
  let seenByEmployerQuery = (req.query.seenByEmployer === 'true') ? true : (req.query.seenByEmployer === 'false') ? false : req.query.seenByEmployer;

  // if status query is specified, return all matching packages ordered by date updated (recent first)
  if (typeof(seenByEmployerQuery) === 'boolean') {
    Package
      .find({ seenByEmployer: seenByEmployerQuery })
      .sort({ 'updated_at': -1 })
      .exec((err, packages) => {
        if (err) {
          res.status(400).send('Make sure status query is valid');
        }
        // check if no packages fit the criteria, and send a custom message 
        if (packages.length === 0) {
          return res.send('There are no packages with that status');
        }
        res.send(packages);
      })
    // if there is no seenByEmployer (status) query, return all packages ordered by date updated (recent first)
  } else {
    Package
      .find()
      .sort({ 'updated_at': -1 })
      .exec((err, packages) => {
        if (err) {
          res.status(400).send('Unable to retrieve packages');
        }
        res.send(packages);
      })
  }
}); 

//GET route here for Package by ID
router.get('/:id', (req, res, next) => {
  //this takes advantage of our "middleware" helper function above
  req.package ? res.status(200).send(req.package) : res.status(404).send('Package not found.');
});

//POST route here for Package by ID - to update individual info
router.post('/:id', (req, res, next) => {
  //checks below here for request body data validation
  let { packageUpdates } = req.body;
  //Mongoose function to find and updated specific document
  Package.findByIdAndUpdate( req.package._id, 
    //we'll pass in our updates, Mongo is smart enough to overwrite what is present and leave the rest
    packageUpdates,
    //this parameter tells Mongo to return the updated object to us
    { new: true }, 
    //throw an error or return our shiny updated Package
    function (err, result) {
      if (err) throw err;
      res.send(result);
  });
});

//POST route for /packages (adds packages to DB)
router.post('/', (req, res, next) => {
  //checks below here for request body data validation
 
  //we creating newPackage by referencing Package Schema
  //which is passing in the request body.
  //We are assuming that the front end will handle data validation. 
  const newPackage = new Package(req.body)
  newPackage.save((err, result) => {
    if (err) return handleError(err);
    // saved!
    res.send(result);
  });
});

module.exports = router;