const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const StudentSchema = new Schema({
  
  firstName: String,
  lastName: String,
  packages: [{type: Schema.Types.ObjectId, ref: 'Package'}],
  jobSeekingStatus: String,
  employmentLocationPreference: String,
  typeOfWorkDesired: String,
  industriesPreferred: [],
  picture: String,
  bio: String,
  address: String,
  projectRepo: String,
  email: String,
  linkedIn: String, 
  phone: String,
  resume: String,
  cohort: Number,
  graduationDate: Date,
  updated_at: Date,
  created_at: Date
});

//updates our individual schema every time
StudentSchema.pre('save', function (next) {
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
// StudentSchema.index({ name: 'text', 'name': 'text' });

module.exports = mongoose.model('Student', StudentSchema);