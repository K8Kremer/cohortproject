const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PackageSchema = new Schema({
  packageName: { type: String, required: true},
  companyName: { type: String, required: true},
  employerName: { type: String, required: true},// Can we change the employer name to be more unique, so ppl don't confuse employer with company? 
  employerEmail: { type: String, required: true},
  employerURL: String,
  students: [{
    student: {},
    studentNotes: String,
  }],
  packageNotes: String,
  replyEmail: { type: String, required: true},
  replyName: { type: String, required: true},
  seenByEmployer: false,
  isHidden: false,
  updated_at: Date,
  created_at: Date,
});

//updates our individual schema every time
PackageSchema.pre('save', function (next) {
  // get the current date
  const currentDate = new Date();
  // change the updated_at field to current date
  this.updated_at = currentDate;
  // if created_at doesn't exist, add to that field
  if (!this.created_at) {
    this.created_at = currentDate;
  }
  next();
});

//this will allow us to create an index for search
// PackageSchema.index({ name: 'text', 'name': 'text' });

module.exports = mongoose.model('Package', PackageSchema);