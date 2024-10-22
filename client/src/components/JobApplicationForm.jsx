import React, { useState } from 'react';
import axios from '../api'; // Import your Axios instance
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useHistory } from 'react-router-dom';

const JobApplicationForm = () => {
  const history = useHistory(); // Use history to redirect after form submission

  // Define form state
  const [formData, setFormData] = useState({
    companyName: '',
    hrName: '',
    hrContact: '',
    location: '',
    status: 'Applied', // Default status
    appliedThrough: 'LinkedIn', // Default option
    appliedDate: new Date(),
    revertDate: null,
    followUp: false,
    comments: '',
  });

  // Handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Make POST request to the backend API
      const response = await axios.post('/applications', formData);
      if (response.status === 200) {
        toast.success('Job Application added successfully!');
        history.push('/'); // Redirect to the dashboard after success
      }
    } catch (error) {
      console.error('Error adding job application', error);
      toast.error('Failed to add job application.');
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Add New Job Application</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        
        <div>
          <label className="block mb-2">Company Name:</label>
          <input
            type="text"
            name="companyName"
            value={formData.companyName}
            onChange={handleChange}
            required
            className="border border-gray-300 rounded w-full p-2"
            placeholder="Enter company name"
          />
        </div>

        <div>
          <label className="block mb-2">HR Name:</label>
          <input
            type="text"
            name="hrName"
            value={formData.hrName}
            onChange={handleChange}
            className="border border-gray-300 rounded w-full p-2"
            placeholder="Enter HR name"
          />
        </div>

        <div>
          <label className="block mb-2">HR Contact:</label>
          <input
            type="text"
            name="hrContact"
            value={formData.hrContact}
            onChange={handleChange}
            className="border border-gray-300 rounded w-full p-2"
            placeholder="Enter HR contact details"
          />
        </div>

        <div>
          <label className="block mb-2">Location:</label>
          <input
            type="text"
            name="location"
            value={formData.location}
            onChange={handleChange}
            className="border border-gray-300 rounded w-full p-2"
            placeholder="Enter job location"
          />
        </div>

        <div>
          <label className="block mb-2">Applied Through:</label>
          <select
            name="appliedThrough"
            value={formData.appliedThrough}
            onChange={handleChange}
            className="border border-gray-300 rounded w-full p-2"
          >
            <option value="LinkedIn">LinkedIn</option>
            <option value="Career Portal">Career Portal</option>
            <option value="Email">Email</option>
          </select>
        </div>

        <div>
          <label className="block mb-2">Status:</label>
          <select
            name="status"
            value={formData.status}
            onChange={handleChange}
            className="border border-gray-300 rounded w-full p-2"
          >
            <option value="Applied">Applied</option>
            <option value="Reverted">Reverted</option>
            <option value="Rejected">Rejected</option>
            <option value="Waiting">Waiting</option>
          </select>
        </div>

        <div>
          <label className="block mb-2">Follow-Up:</label>
          <input
            type="checkbox"
            name="followUp"
            checked={formData.followUp}
            onChange={() =>
              setFormData({ ...formData, followUp: !formData.followUp })
            }
          />
          <span className="ml-2">Did you follow up?</span>
        </div>

        <div>
          <label className="block mb-2">Comments:</label>
          <textarea
            name="comments"
            value={formData.comments}
            onChange={handleChange}
            className="border border-gray-300 rounded w-full p-2"
            placeholder="Add any additional comments or notes"
          />
        </div>

        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Submit Application
        </button>
      </form>
    </div>
  );
};

export default JobApplicationForm;
