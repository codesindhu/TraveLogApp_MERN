const mongoose = require('mongoose');

const mediaSchema = new mongoose.Schema({
  data: Buffer,
  contentType: String,
});

const TravelLogSchema = new mongoose.Schema({
  title: { type: String, required: true },
  experience: { type: String, required: true },
  date: { type: Date, default: Date.now },
  media: [mediaSchema], // Add this for photos/videos
});
module.exports = mongoose.model('TravelLog', TravelLogSchema);
