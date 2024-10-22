import React, { useState, createContext, useContext, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import DashboardPage from './pages/DashboardPage';
import AddJobPage from './pages/AddJobPage';
import AllApplicationsPage from './pages/AllApplicationsPage'; // Import the new page

// Import other necessary components

// Create a Context for dark mode
const ThemeContext = createContext();

export const useTheme = () => {
  return useContext(ThemeContext);
};

const App = () => {
  const [darkMode, setDarkMode] = useState(() => {
    // Get the initial state from local storage
    const savedTheme = localStorage.getItem('darkMode');
    return savedTheme ? JSON.parse(savedTheme) : false;
  });

  useEffect(() => {
    // Save the theme preference to local storage whenever it changes
    localStorage.setItem('darkMode', darkMode);
  }, [darkMode]);

  const toggleDarkMode = () => {
    setDarkMode(prevMode => !prevMode);
  };

  return (
    <ThemeContext.Provider value={{ darkMode, toggleDarkMode }}>
      <Router>
        <div className={`transition-colors duration-300 ${darkMode ? 'bg-gray-900 text-white' : 'bg-gray-100 text-black'}`}>
          <button 
            onClick={toggleDarkMode} 
            aria-pressed={darkMode} 
            className="fixed top-4 right-4 p-2 bg-indigo-600 rounded-full text-white"
          >
            Toggle Dark Mode
          </button>
          <Routes>
            <Route path="/" element={<DashboardPage />} />
            <Route path="/applications" element={<AllApplicationsPage />} /> {/* Add the route */}
            <Route path="/add-job" element={<AddJobPage />} />
            {/* Add other routes here */}
          </Routes>
        </div>
      </Router>
    </ThemeContext.Provider>
  );
};

export default App;


