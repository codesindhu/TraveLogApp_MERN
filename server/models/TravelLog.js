const mongoose = require('mongoose');

const TravelLogSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  experience: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('TravelLog', TravelLogSchema);
