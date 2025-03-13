const mongoose = require('mongoose');

const TravelLogSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  title: String,
  description: String,
  location: String,
  date: { type: Date, default: Date.now },
});

module.exports = mongoose.model('TravelLog', TravelLogSchema);
