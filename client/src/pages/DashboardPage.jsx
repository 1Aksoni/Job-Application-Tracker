import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from '../api'; // Axios instance
import { AiOutlineTrophy, AiOutlineFileDone, AiOutlineSchedule } from 'react-icons/ai'; // Icons
import { useTheme } from '../App'; // Import the useTheme hook

const DashboardPage = () => {
  const { darkMode } = useTheme(); // Get dark mode state
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null); // To handle errors

  // Fetch job applications when component mounts
  useEffect(() => {
    const fetchApplications = async () => {
      try {
        const response = await axios.get('/applications');
        setApplications(response.data);
      } catch (error) {
        console.error('Error fetching applications', error);
        setError('Failed to load applications. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchApplications();
  }, []);

  if (loading) {
    return <div className="text-center p-4"><p>Loading dashboard...</p></div>;
  }

  if (error) {
    return <div className="text-center p-4 text-red-500">{error}</div>;
  }

  // Check if applications is an array before processing
  const totalApplications = Array.isArray(applications) ? applications.length : 0;
  const appliedCount = applications.filter(app => app.status === 'Applied').length;
  const interviewCount = applications.filter(app => app.status === 'Interview Scheduled').length;
  const offeredCount = applications.filter(app => app.status === 'Offered').length;

  return (
    <div className={`min-h-screen py-6 flex flex-col ${darkMode ? 'bg-gray-800' : 'bg-gray-100'}`}>
      <div className={`container mx-auto p-6 rounded-lg shadow-lg ${darkMode ? 'bg-gray-900' : 'bg-white'}`}>
        <h2 className={`text-3xl font-bold mb-6 text-center ${darkMode ? 'text-indigo-300' : 'text-indigo-600'}`}>Dashboard</h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Total Applications Card */}
          <div className={`flex items-center justify-between p-4 rounded-lg shadow-md transition-transform duration-300 ${darkMode ? 'bg-gray-700' : 'bg-gradient-to-r from-indigo-400 to-blue-400'}`}>
            <div className="flex items-center">
              <AiOutlineFileDone className="text-4xl text-white mr-4" />
              <div>
                <h3 className="text-lg font-semibold text-white">Total Applications</h3>
                <p className="text-2xl font-bold text-white">{totalApplications}</p>
              </div>
            </div>
          </div>

          {/* Applied Card */}
          <div className={`flex items-center justify-between p-4 rounded-lg shadow-md transition-transform duration-300 ${darkMode ? 'bg-gray-700' : 'bg-gradient-to-r from-green-400 to-teal-400'}`}>
            <div className="flex items-center">
              <AiOutlineTrophy className="text-4xl text-white mr-4" />
              <div>
                <h3 className="text-lg font-semibold text-white">Applied</h3>
                <p className="text-2xl font-bold text-white">{appliedCount}</p>
              </div>
            </div>
          </div>

          {/* Interviews Scheduled Card */}
          <div className={`flex items-center justify-between p-4 rounded-lg shadow-md transition-transform duration-300 ${darkMode ? 'bg-gray-700' : 'bg-gradient-to-r from-yellow-400 to-orange-400'}`}>
            <div className="flex items-center">
              <AiOutlineSchedule className="text-4xl text-white mr-4" />
              <div>
                <h3 className="text-lg font-semibold text-white">Interviews Scheduled</h3>
                <p className="text-2xl font-bold text-white">{interviewCount}</p>
              </div>
            </div>
          </div>

          {/* Offers Received Card */}
          <div className={`flex items-center justify-between p-4 rounded-lg shadow-md transition-transform duration-300 ${darkMode ? 'bg-gray-700' : 'bg-gradient-to-r from-purple-400 to-pink-400'}`}>
            <div className="flex items-center">
              <AiOutlineTrophy className="text-4xl text-white mr-4" />
              <div>
                <h3 className="text-lg font-semibold text-white">Offers Received</h3>
                <p className="text-2xl font-bold text-white">{offeredCount}</p>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-8 flex justify-center space-x-4">
          <Link
            to="/add-job"
            className={`bg-green-500 text-white py-2 px-4 rounded-lg shadow-lg hover:bg-green-600 transition duration-200 ${darkMode ? 'bg-green-700' : ''}`}
          >
            Add New Job Application
          </Link>

          <Link
            to="/applications"
            className={`bg-blue-500 text-white py-2 px-4 rounded-lg shadow-lg hover:bg-blue-600 transition duration-200 ${darkMode ? 'bg-blue-700' : ''}`}
          >
            View All Applications
          </Link>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
