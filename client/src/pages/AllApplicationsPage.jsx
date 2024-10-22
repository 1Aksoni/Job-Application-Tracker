import React, { useState, useEffect } from "react";
import axios from "../api"; // Axios instance
import { AiOutlineDelete } from "react-icons/ai"; // Importing Delete icon
import { BiEdit } from "react-icons/bi"; // Importing Edit icon
import { useTheme } from "../App"; // Import the useTheme hook

const AllApplicationsPage = () => {
  const { darkMode } = useTheme(); // Get dark mode state
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch applications on component mount
  useEffect(() => {
    const fetchApplications = async () => {
      try {
        const response = await axios.get("/applications");
        setApplications(response.data);
      } catch (error) {
        console.error("Error fetching applications:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchApplications();
  }, []);

  // Change application status
  const handleStatusChange = async (id, newStatus) => {
    if (window.confirm("Are you sure you want to change the status?")) {
      try {
        await axios.put(`/applications/${id}/status`, { status: newStatus });
        setApplications((prevApplications) =>
          prevApplications.map((application) =>
            application._id === id
              ? { ...application, status: newStatus }
              : application
          )
        );
        alert("Status updated successfully");
      } catch (error) {
        console.error("Error updating status:", error);
        alert("Error updating status");
      }
    }
  };

  // Delete application
  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this application?")) {
      try {
        await axios.delete(`/applications/${id}`);
        setApplications((prevApplications) =>
          prevApplications.filter((application) => application._id !== id)
        );
        alert("Application deleted successfully");
      } catch (error) {
        console.error("Error deleting application:", error);
        alert("Error deleting application");
      }
    }
  };

  // Loading state
  if (loading) {
    return (
      <div
        className={`flex justify-center items-center h-screen ${
          darkMode ? "bg-gray-800" : "bg-white"
        }`}
      >
        <div className="loader">Loading...</div>
      </div>
    );
  }

  return (
    <div
      className={`min-h-screen ${
        darkMode ? "bg-gray-800 text-white" : "bg-white text-gray-800"
      }`}
    >
      <div className="container mx-auto p-4">
        <h2 className="text-4xl font-bold text-center mb-6 text-indigo-600">
          All Job Applications
        </h2>

        {/* Applications Table */}
        {applications.length > 0 ? (
          <div className="overflow-x-auto">
            <table
              className={`min-w-full border border-gray-300 shadow-lg rounded-lg ${
                darkMode ? "bg-gray-900" : "bg-white"
              }`}
            >
              <thead
                className={`${
                  darkMode ? "bg-gray-900" : "bg-gray-200"
                } text-gray-100`} // Updated colors for better visibility
              >
                <tr>
                  <th className="border px-2 py-2 text-sm md:px-4 md:py-2">#</th>
                  <th className="border px-2 py-2 text-sm md:px-4 md:py-2">
                    Company Name
                  </th>
                  <th className="border px-2 py-2 text-sm md:px-4 md:py-2">
                    HR Name
                  </th>
                  <th className="border px-2 py-2 text-sm md:px-4 md:py-2">
                    Contact Details
                  </th>
                  <th className="border px-2 py-2 text-sm md:px-4 md:py-2">
                    Status
                  </th>
                  <th className="border px-2 py-2 text-sm md:px-4 md:py-2">
                    Location
                  </th>
                  <th className="border px-2 py-2 text-sm md:px-4 md:py-2">
                    Applied Date
                  </th>
                  <th className="border px-2 py-2 text-sm md:px-4 md:py-2 text-center">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {applications.map((application, index) => (
                  <tr
                    key={application._id}
                    className={`transition duration-200 ${
                      darkMode ? "hover:bg-gray-700" : "hover:bg-gray-100"
                    }`}
                  >
                    <td className="border px-2 py-2 text-sm md:px-4 md:py-2">
                      {index + 1}
                    </td>
                    <td className="border px-2 py-2 text-sm md:px-4 md:py-2">
                      {application.companyName}
                    </td>
                    <td className="border px-2 py-2 text-sm md:px-4 md:py-2">
                      {application.hrName || "N/A"}
                    </td>
                    <td className="border px-2 py-2 text-sm md:px-4 md:py-2">
                      {application.contactDetails || "N/A"}
                    </td>
                    <td className="border px-2 py-2 text-sm md:px-4 md:py-2">
                      <select
                        value={application.status}
                        onChange={(e) =>
                          handleStatusChange(application._id, e.target.value)
                        }
                        className={`border p-1 md:p-2 rounded focus:outline-none focus:ring focus:ring-indigo-300 ${
                          darkMode
                            ? "bg-gray-700 text-white"
                            : "bg-white text-black"
                        }`}
                      >
                        <option value="Applied">Applied</option>
                        <option value="Interview Scheduled">
                          Interview Scheduled
                        </option>
                        <option value="Offered">Offered</option>
                        <option value="Rejected">Rejected</option>
                      </select>
                    </td>
                    <td className="border px-2 py-2 text-sm md:px-4 md:py-2">
                      {application.location || "N/A"}
                    </td>
                    <td className="border px-2 py-2 text-sm md:px-4 md:py-2">
                      {new Date(application.appliedDate).toLocaleDateString()}
                    </td>
                    <td className="border px-2 py-2 text-sm md:px-4 md:py-2 text-center">
                      <button
                        onClick={() => handleDelete(application._id)}
                        className="text-red-500 hover:text-red-700"
                      >
                        <AiOutlineDelete />
                      </button>
                      <button className="ml-2 text-blue-500 hover:text-blue-700">
                        <BiEdit />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="text-center py-4">
            <p
              className={`text-lg ${darkMode ? "text-white" : "text-gray-800"}`}
            >
              No applications found.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default AllApplicationsPage;
