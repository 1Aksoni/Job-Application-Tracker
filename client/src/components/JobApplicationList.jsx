import React, { useEffect, useState } from 'react';
import axios from '../api'; // Import Axios instance
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';

const JobApplicationList = () => {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch job applications when component mounts
  useEffect(() => {
    const fetchApplications = async () => {
      try {
        const response = await axios.get('/applications');
        setApplications(response.data); // Set applications from API response
        setLoading(false); // Stop loading
      } catch (error) {
        console.error('Error fetching job applications', error);
        toast.error('Failed to load job applications.');
        setLoading(false);
      }
    };

    fetchApplications();
  }, []);

  if (loading) {
    return <p>Loading job applications...</p>;
  }

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Job Applications</h2>

      {applications.length > 0 ? (
        <table className="min-w-full bg-white border border-gray-200">
          <thead>
            <tr className="bg-gray-100">
              <th className="py-2 px-4 border-b">Company Name</th>
              <th className="py-2 px-4 border-b">HR Name</th>
              <th className="py-2 px-4 border-b">Status</th>
              <th className="py-2 px-4 border-b">Applied Through</th>
              <th className="py-2 px-4 border-b">Applied Date</th>
              <th className="py-2 px-4 border-b">Actions</th>
            </tr>
          </thead>
          <tbody>
            {applications.map((application) => (
              <tr key={application._id}>
                <td className="py-2 px-4 border-b">{application.companyName}</td>
                <td className="py-2 px-4 border-b">{application.hrName}</td>
                <td className={`py-2 px-4 border-b ${getStatusClass(application.status)}`}>
                  {application.status}
                </td>
                <td className="py-2 px-4 border-b">{application.appliedThrough}</td>
                <td className="py-2 px-4 border-b">{new Date(application.appliedDate).toLocaleDateString()}</td>
                <td className="py-2 px-4 border-b">
                  <Link
                    to={`/job/${application._id}`}
                    className="text-blue-500 hover:underline"
                  >
                    View Details
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No job applications found.</p>
      )}
    </div>
  );
};

// Utility function to apply different classes based on the application status
const getStatusClass = (status) => {
  switch (status) {
    case 'Applied':
      return 'text-yellow-500';
    case 'Reverted':
      return 'text-green-500';
    case 'Rejected':
      return 'text-red-500';
    case 'Waiting':
      return 'text-gray-500';
    default:
      return '';
  }
};

export default JobApplicationList;
