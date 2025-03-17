const express = require('express');
const router = express.Router();
const multer = require('multer');
const TravelLog = require('../models/TravelLog');

// Use multer to handle incoming files
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

// Add a log with media
router.post('/', upload.array('media'), async (req, res) => {
  const { title, experience } = req.body;

  const media = req.files?.map(file => ({
    data: file.buffer,
    contentType: file.mimetype,
  })) || [];

  try {
    const log = new TravelLog({ title, experience, media });
    await log.save();
    res.status(201).json(log);
  } catch (err) {
    res.status(400).json({ error: 'Failed to create log' });
  }
});

// Get all logs with media
router.get('/', async (req, res) => {
  try {
    const logs = await TravelLog.find().sort({ date: -1 });
    const formattedLogs = logs.map(log => ({
      _id: log._id,
      title: log.title,
      experience: log.experience,
      date: log.date,
      media: log.media.map(m => ({
        contentType: m.contentType,
        base64: m.data.toString('base64'),
      }))
    }));
    res.json(formattedLogs);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch logs' });
  }
});
