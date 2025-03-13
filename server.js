const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const path = require('path');
const logsRoutes = require('./routes/travelLogs');

dotenv.config();
const app = express();

app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));
app.use('/api/logs', logsRoutes);

mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log('✅ Connected to MongoDB');
    app.listen(5000, () => console.log('🚀 Server running on port 5000'));
  })
  .catch((err) => console.error('MongoDB connection error:', err));
