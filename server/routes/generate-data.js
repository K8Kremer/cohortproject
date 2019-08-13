const router = require('express').Router();
const faker = require('faker');
const Student = require('../models/student');
const Package = require('../models/package');

//list of parameters for fake data
//for real data, we may prefer a dropdown on the Front End
const jobSeekingStatus = ['Employed', 'Searching', 'Open']
const employmentLocPref = ['Local to Triangle', 'Open to Relocation', 'Both']
const typeOfWork = ['Full-stack', 'Front End', 'Back End']
const industries = ['Artificial Intelligence', 'Machine Learning', 'Internet of Things', 'Finance', 'Insurance', 'Health Care', 'Robotics']

//new student data, fo free
router.get('/students', (req, res, next) => {
  for (let i = 0; i < 90; i++) {
    let student = new Student();
    student.firstName = faker.name.firstName()
    student.lastName = faker.name.lastName()
    student.packages = []
    student.jobSeekingStatus = jobSeekingStatus[Math.floor(Math.random() * jobSeekingStatus.length)]
    student.employmentLocationPreference = employmentLocPref[Math.floor(Math.random() * employmentLocPref.length)]
    student.typeOfWorkDesired = typeOfWork[Math.floor(Math.random() * typeOfWork.length)]
    student.industriesPreferred = [industries[Math.floor(Math.random() * industries.length)]]
    student.picture = faker.image.imageUrl(800, 800, "people")
    student.bio = faker.lorem.paragraph()
    student.address = faker.address.city() + ', ' + faker.address.state() + ', ' + faker.address.country()
    student.email = `${student.firstName}.${student.lastName}@projectshift.io`
    student.linkedIn = ''
    student.phone = faker.phone.phoneNumberFormat()
    student.resume = ''
    student.cohort = faker.random.number({ min: 0, max: 7 });
    student.graduationDate = faker.date.future(2)

    student.save((err) => {
      if (err) throw err
    })
  }
  res.status(200).end()
});

//new package data, fo free
router.get('/packages', (req, res, next) => {
  for (let i = 0; i < 10; i++) {
    let package = new Package();

    package.packageName = faker.lorem.word();
    package.packageLink = faker.commerce.productName();
    package.companyName = faker.company.companyName();
    package.employerName = faker.name.firstName() + ' ' + faker.name.lastName();
    package.employerEmail = faker.internet.email();
    package.students = [];
    package.packageNotes = faker.lorem.paragraph();
    package.replyEmail = faker.internet.email();
    package.replyName = {
      title: faker.name.title(),
      first: faker.name.firstName(),
      last: faker.name.lastName()
    };
    package.seenByEmployer = false;
    package.isHidden = false;
    
    package.save((err) => {
      if (err) throw err
    })
  }
  res.status(200).end()
});

module.exports = router;