const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const path = require('path');
const cors = require('cors'); // 👉 ADD THIS LINE
const logsRoutes = require('./routes/travelLogs');

dotenv.config();
const app = express();

app.use(cors()); // 👉 ADD THIS LINE to enable CORS for all origins
app.use(express.json());
app.use(express.static(path.join(__dirname, 'docs')));
app.use('/api/logs', logsRoutes);

mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log('✅ Connected to MongoDB');
    app.listen(5000, () => console.log('🚀 Server running on port 5000'));
  })
  .catch((err) => console.error('MongoDB connection error:', err));
