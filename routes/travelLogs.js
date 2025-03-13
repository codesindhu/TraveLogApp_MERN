const express = require('express');
const router = express.Router();
const TravelLog = require('../models/TravelLog');

// Get all logs
router.get('/', async (req, res) => {
  const logs = await TravelLog.find().sort({ date: -1 });
  res.json(logs);
});

// Add a log
router.post('/', async (req, res) => {
  const { title, experience } = req.body;
  try {
    const log = new TravelLog({ title, experience });
    await log.save();
    res.status(201).json(log);
  } catch (err) {
    res.status(400).json({ error: 'Failed to create log' });
  }
});

// Delete a log
router.delete('/:id', async (req, res) => {
  try {
    await TravelLog.findByIdAndDelete(req.params.id);
    res.json({ message: 'Log deleted' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to delete' });
  }
});

module.exports = router;
