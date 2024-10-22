import axios from 'axios';

// Create an axios instance with default configurations
const api = axios.create({
  baseURL: 'http://localhost:5000', // The backend URL (change if deployed)
  headers: {
    'Content-Type': 'application/json',
  },
});

export default api;
