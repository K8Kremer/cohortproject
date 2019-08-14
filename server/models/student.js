const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const StudentSchema = new Schema({


  firstName: { type: String, required: true},
  lastName: { type: String, required: true},
  fullName: String,
  projectRepoLink: String,
  projectRepoDescription:  String,
  packages: [{type: Schema.Types.ObjectId, ref: 'Package'}],
  jobSeekingStatus: { type: String, required: true},
  employmentLocationPreference: { type: String, required: true},
  typeOfWorkDesired: { type: String, required: true},
  industriesPreferred: [],
  picture: String, 
  bio: { type: String, required: true},
  address: { type: String, required: true},
  email: { type: String, required: true},
  linkedIn: { type: String, required: true},
  phone: { type: String, required: true},
  resume: { type: String, required: true},
  cohort: { type: Number, required: true},
  graduationDate: { type: Date, required: true},

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