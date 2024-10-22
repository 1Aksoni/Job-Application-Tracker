const JobApplication = require('../models/JobApplication');

// Get all job applications
const getJobApplications = async (req, res) => {
  try {
    const applications = await JobApplication.find();
    res.json(applications);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

// Get job application by ID
const getJobApplicationById = async (req, res) => {
  try {
    const application = await JobApplication.findById(req.params.id);
    if (!application) {
      return res.status(404).json({ message: 'Job application not found' });
    }
    res.json(application);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

// Add new job application
const addJobApplication = async (req, res) => {
  const {
    companyName,
    hrName,
    contactDetails,
    location,
    appliedThrough,
    status,
    appliedDate,
    followUp,
    revertReceived,
    revertDate,
  } = req.body;

  try {
    const newApplication = new JobApplication({
      companyName,
      hrName,
      contactDetails,
      location,
      appliedThrough,
      status,
      appliedDate,
      followUp,
      revertReceived,
      revertDate,
    });

    const savedApplication = await newApplication.save();
    res.json(savedApplication);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

// Update job application
const updateJobApplication = async (req, res) => {
  try {
    const updatedApplication = await JobApplication.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.json(updatedApplication);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

// Delete job application
const deleteJobApplication = async (req, res) => {
  try {
    await JobApplication.findByIdAndDelete(req.params.id);
    res.json({ message: 'Job application removed' });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};
// Update job application status
const updateJobApplicationStatus = async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  try {
    const application = await JobApplication.findById(id);
    if (!application) {
      return res.status(404).json({ message: 'Application not found' });
    }

    application.status = status; // Update the status
    await application.save(); // Save the updated application

    res.json({ message: 'Status updated successfully', application });
  } catch (error) {
    console.error('Error updating status:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Export the controller functions
module.exports = {
  getJobApplications,
  getJobApplicationById,
  addJobApplication,
  updateJobApplication,
  deleteJobApplication,
  updateJobApplicationStatus, // Export the new function
};
