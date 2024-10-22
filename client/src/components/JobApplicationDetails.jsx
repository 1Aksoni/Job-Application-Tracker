import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from '../api'; // Axios instance
import { toast } from 'react-toastify';

const JobApplicationDetails = () => {
  const { id } = useParams(); // Get application ID from the URL
  const navigate = useNavigate(); // Use navigate for redirecting
  const [application, setApplication] = useState(null); // State to store job application details
  const [loading, setLoading] = useState(true); // Loading state

  // Fetch job application details when the component mounts
  useEffect(() => {
    const fetchApplicationDetails = async () => {
      try {
        const response = await axios.get(`/applications/${id}`); // Fetch application by ID
        setApplication(response.data); // Set the fetched application data
        setLoading(false); // Stop loading
      } catch (error) {
        console.error('Error fetching application details', error);
        toast.error('Failed to load application details.');
        setLoading(false);
      }
    };

    fetchApplicationDetails();
  }, [id]);

  if (loading) {
    return <p>Loading application details...</p>;
  }

  if (!application) {
    return <p>Application not found.</p>;
  }

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Job Application Details</h2>

      <div className="bg-white shadow-md p-6 rounded-lg">
        <h3 className="text-xl font-semibold mb-2">
          {application.companyName}
        </h3>
        <p>
          <strong>HR Name:</strong> {application.hrName}
        </p>
        <p>
          <strong>Contact Details:</strong> {application.contactDetails}
        </p>
        <p>
          <strong>Location:</strong> {application.location}
        </p>
        <p>
          <strong>Status:</strong> {application.status}
        </p>
        <p>
          <strong>Applied Through:</strong> {application.appliedThrough}
        </p>
        <p>
          <strong>Date Applied:</strong>{' '}
          {new Date(application.appliedDate).toLocaleDateString()}
        </p>
        <p>
          <strong>Follow-up:</strong> {application.followUp ? 'Yes' : 'No'}
        </p>
        <p>
          <strong>Revert Received:</strong> {application.revertReceived ? 'Yes' : 'No'}
        </p>
        <p>
          <strong>Revert Date:</strong>{' '}
          {application.revertDate
            ? new Date(application.revertDate).toLocaleDateString()
            : 'N/A'}
        </p>

        <button
          className="mt-4 bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600"
          onClick={() => navigate('/applications')}
        >
          Back to Applications
        </button>
      </div>
    </div>
  );
};

export default JobApplicationDetails;
