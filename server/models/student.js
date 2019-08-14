const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const StudentSchema = new Schema({

  firstName: { type: String, required: True},
  lastName: { type: String, required: True},
  projectRepoLink: String,
  projectRepoDescription:  String,
  packages: [{type: Schema.Types.ObjectId, ref: 'Package'}],
  jobSeekingStatus: { type: String, required: True},
  employmentLocationPreference: { type: String, required: True},
  typeOfWorkDesired: { type: String, required: True},
  industriesPreferred: [],
  picture: { type: String, required: True}, 
  bio: { type: String, required: True},
  address: { type: String, required: True},
  email: { type: String, required: True},
  linkedIn: { type: String, required: True},
  phone: { type: String, required: True},
  resume: { type: String, required: True},
  cohort: { type: Number, required: True},
  graduationDate: { type: Date, required: True},
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