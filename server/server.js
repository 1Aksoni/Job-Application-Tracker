const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
const applicationRoutes = require('./routes/applicationRoutes');
require('dotenv').config();

const app = express();

// Connect to the database
connectDB();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/applications', applicationRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
