import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "../api"; // Axios instance
import { toast } from "react-toastify";
import { useTheme } from "../App"; // Import the useTheme hook
import { FiUser, FiPhone, FiMapPin, FiCalendar, FiSend } from "react-icons/fi"; // Example icons

const AddJobPage = () => {
  const { darkMode } = useTheme(); // Get dark mode state
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    companyName: "",
    hrName: "",
    contactDetails: "",
    location: "",
    appliedThrough: "",
    status: "",
    appliedDate: "",
    followUp: false,
    revertReceived: false,
    revertDate: "",
  });
  const [loading, setLoading] = useState(false); // Loading state

  // Handle form input change
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); // Set loading to true

    try {
      await axios.post("/applications", formData); // POST request to add job
      toast.success("Job application added successfully!");
      navigate("/applications"); // Redirect to application list
    } catch (error) {
      console.error("Error adding job application", error);
      toast.error("Failed to add job application.");
    } finally {
      setLoading(false); // Set loading to false
    }
  };

  return (
    <div
      className={`min-h-screen py-6 flex items-center justify-center ${
        darkMode ? "bg-gray-900" : "bg-gray-100"
      }`}
    >
      <div
        className={`container mx-auto p-6 shadow-lg rounded-lg ${
          darkMode ? "bg-gray-800" : "bg-white"
        }`}
      >
        <h2
          className={`text-3xl font-bold mb-6 text-center ${
            darkMode ? "text-indigo-300" : "text-indigo-600"
          }`}
        >
          Add Job Application
        </h2>
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Company Name */}
            <div>
              <label
                className={`block mb-2 ${
                  darkMode ? "text-gray-300" : "text-gray-700"
                }`}
              >
                Company Name
              </label>
              <div className="flex items-center border-b border-gray-300">
                <FiUser
                  className={`mr-2 ${
                    darkMode ? "text-gray-300" : "text-gray-700"
                  }`}
                />
                <input
                  type="text"
                  name="companyName"
                  value={formData.companyName}
                  onChange={handleChange}
                  required
                  className={`w-full border-0 focus:ring-0 ${
                    darkMode
                      ? "bg-gray-800 text-gray-300"
                      : "bg-white text-gray-700"
                  } rounded-md p-2`}
                />
              </div>
            </div>

            {/* HR Name */}
            <div>
              <label
                className={`block mb-2 ${
                  darkMode ? "text-gray-300" : "text-gray-700"
                }`}
              >
                HR Name
              </label>
              <div className="flex items-center border-b border-gray-300">
                <FiUser
                  className={`mr-2 ${
                    darkMode ? "text-gray-300" : "text-gray-700"
                  }`}
                />
                <input
                  type="text"
                  name="hrName"
                  value={formData.hrName}
                  onChange={handleChange}
                  required
                  className={`w-full border-0 focus:ring-0 ${
                    darkMode
                      ? "bg-gray-800 text-gray-300"
                      : "bg-white text-gray-700"
                  } rounded-md p-2`}
                />
              </div>
            </div>

            {/* Contact Details */}
            <div>
              <label
                className={`block mb-2 ${
                  darkMode ? "text-gray-300" : "text-gray-700"
                }`}
              >
                Contact Details
              </label>
              <div className="flex items-center border-b border-gray-300">
                <FiPhone
                  className={`mr-2 ${
                    darkMode ? "text-gray-300" : "text-gray-700"
                  }`}
                />
                <input
                  type="text"
                  name="contactDetails"
                  value={formData.contactDetails}
                  onChange={handleChange}
                  required
                  className={`w-full border-0 focus:ring-0 ${
                    darkMode
                      ? "bg-gray-800 text-gray-300"
                      : "bg-white text-gray-700"
                  } rounded-md p-2`}
                />
              </div>
            </div>

            {/* Location */}
            <div>
              <label
                className={`block mb-2 ${
                  darkMode ? "text-gray-300" : "text-gray-700"
                }`}
              >
                Location
              </label>
              <div className="flex items-center border-b border-gray-300">
                <FiMapPin
                  className={`mr-2 ${
                    darkMode ? "text-gray-300" : "text-gray-700"
                  }`}
                />
                <input
                  type="text"
                  name="location"
                  value={formData.location}
                  onChange={handleChange}
                  required
                  className={`w-full border-0 focus:ring-0 ${
                    darkMode
                      ? "bg-gray-800 text-gray-300"
                      : "bg-white text-gray-700"
                  } rounded-md p-2`}
                />
              </div>
            </div>

            {/* Applied Through */}
            <div>
              <label
                className={`block mb-2 ${
                  darkMode ? "text-gray-300" : "text-gray-700"
                }`}
              >
                Applied Through
              </label>
              <div className="flex items-center border-b border-gray-300">
                <FiUser
                  className={`mr-2 ${
                    darkMode ? "text-gray-300" : "text-gray-700"
                  }`}
                />
                <input
                  type="text"
                  name="appliedThrough"
                  value={formData.appliedThrough}
                  onChange={handleChange}
                  required
                  className={`w-full border-0 focus:ring-0 ${
                    darkMode
                      ? "bg-gray-800 text-gray-300"
                      : "bg-white text-gray-700"
                  } rounded-md p-2`}
                />
              </div>
            </div>

            {/* Status */}
            <div>
              <label
                className={`block mb-2 ${
                  darkMode ? "text-gray-300" : "text-gray-700"
                }`}
              >
                Status
              </label>
              <select
                name="status"
                value={formData.status}
                onChange={handleChange}
                required
                className={`w-full border ${
                  darkMode ? "border-gray-600" : "border-gray-300"
                } rounded-md p-2 ${
                  darkMode
                    ? "bg-gray-800 text-gray-300"
                    : "bg-white text-gray-700"
                }`}
              >
                <option value="">Select Status</option>
                <option value="Applied">Applied</option>
                <option value="Interview Scheduled">Interview Scheduled</option>
                <option value="Offered">Offered</option>
              </select>
            </div>

            {/* Applied Date */}
            <div>
              <label
                className={`block mb-2 ${
                  darkMode ? "text-gray-300" : "text-gray-700"
                }`}
              >
                Applied Date
              </label>
              <div className="flex items-center border-b border-gray-300">
                <FiCalendar
                  className={`mr-2 ${
                    darkMode ? "text-gray-300" : "text-gray-700"
                  }`}
                />
                <input
                  type="date"
                  name="appliedDate"
                  value={formData.appliedDate}
                  onChange={handleChange}
                  required
                  className={`w-full border-0 focus:ring-0 ${
                    darkMode
                      ? "bg-gray-800 text-gray-300"
                      : "bg-white text-gray-700"
                  } rounded-md p-2`}
                />
              </div>
            </div>
            {/* Revert Date */}
            <div>
              <label
                className={`block mb-2 ${
                  darkMode ? "text-gray-300" : "text-gray-700"
                }`}
              >
                Revert Date
              </label>
              <div className="flex items-center border-b border-gray-300">
                <FiCalendar
                  className={`mr-2 ${
                    darkMode ? "text-gray-300" : "text-gray-700"
                  }`}
                />
                <input
                  type="date"
                  name="revertDate"
                  value={formData.revertDate}
                  onChange={handleChange}
                  className={`w-full border-0 focus:ring-0 ${
                    darkMode
                      ? "bg-gray-800 text-gray-300"
                      : "bg-white text-gray-700"
                  } rounded-md p-2`}
                />
              </div>
            </div>
            {/* Follow Up */}
            <div className="flex items-center">
              <input
                type="checkbox"
                name="followUp"
                checked={formData.followUp}
                onChange={handleChange}
                className="mr-2"
              />
              <label
                className={`text-gray-700 ${darkMode ? "text-gray-300" : ""}`}
              >
                Follow Up
              </label>
            </div>

            {/* Revert Received */}
            <div className="flex items-center">
              <input
                type="checkbox"
                name="revertReceived"
                checked={formData.revertReceived}
                onChange={handleChange}
                className="mr-2"
              />
              <label
                className={`text-gray-700 ${darkMode ? "text-gray-300" : ""}`}
              >
                Revert Received
              </label>
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className={`mt-6 w-full py-3 rounded-md ${
              loading ? "bg-gray-500" : "bg-indigo-600 hover:bg-indigo-700"
            } text-white transition duration-200`}
          >
            {loading ? "Adding..." : "Add Job Application"}{" "}
            <FiSend className="inline ml-2" />
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddJobPage;
