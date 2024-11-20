const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
const loanRoutes = require('./routes/loanRoutes');
const userRoutes = require('./routes/userRoutes'); // Assuming you have user routes for registration, login, etc.

dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());  // Parse JSON bodies

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB Connected'))
  .catch((err) => console.log('MongoDB connection error:', err));

// Use routes
app.use('/api', loanRoutes);  // Mount loan routes under /api
app.use('/api', userRoutes);  // Assuming user routes are separate

// Set the port from .env file or default to 5000
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
