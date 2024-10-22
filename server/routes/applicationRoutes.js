const express = require('express');
const {
  getJobApplications,
  getJobApplicationById,
  addJobApplication,
  updateJobApplication,
  deleteJobApplication,
  updateJobApplicationStatus, // Import the new controller function
} = require('../controllers/applicationController');

const router = express.Router();

// GET all job applications
router.get('/', getJobApplications);

// GET job application by ID
router.get('/:id', getJobApplicationById);

// POST new job application
router.post('/', addJobApplication);

// PUT update job application
router.put('/:id', updateJobApplication);

// PUT update job application status
router.put('/:id/status', updateJobApplicationStatus); // New route for status update

// DELETE job application
router.delete('/:id', deleteJobApplication);


module.exports = router;
