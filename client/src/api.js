import axios from 'axios';

// Create an axios instance with default configurations
const api = axios.create({
  baseURL: 'https://job-application-tracker-fx36.onrender.com', // The backend URL (change if deployed)
  headers: {
    'Content-Type': 'application/json',
  },
});

export default api;
