const mongoose = require('mongoose');

const jobApplicationSchema = new mongoose.Schema({
  companyName: {
    type: String,
    required: true,
  },
  hrName: {
    type: String,
  },
  contactDetails: {
    type: String,
  },
  location: {
    type: String,
  },
  appliedThrough: {
    type: String,
  },
  status: {
    type: String,
    required: true,
  },
  appliedDate: {
    type: Date,
  },
  followUp: {
    type: Boolean,
    default: false,
  },
  revertReceived: {
    type: Boolean,
    default: false,
  },
  revertDate: {
    type: Date,
  },
});

const JobApplication = mongoose.model('JobApplication', jobApplicationSchema);

module.exports = JobApplication;
