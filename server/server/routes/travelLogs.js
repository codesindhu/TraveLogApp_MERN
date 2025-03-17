// routes/travelLogs.js
const express = require('express');
const router = express.Router();
const TravelLog = require('../models/TravelLog');

// Get all logs
router.get('/', async (req, res) => {
  const logs = await TravelLog.find().sort({ date: -1 });
  res.json(logs);
});

// Get a single log by ID 👇
router.get('/:id', async (req, res) => {
  try {
    const log = await TravelLog.findById(req.params.id);
    if (!log) return res.status(404).json({ error: 'Log not found' });
    res.json(log);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch log' });
  }
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
// Update a log
router.put('/:id', async (req, res) => {
  const { title, experience } = req.body;
  try {
    const log = await TravelLog.findByIdAndUpdate(
      req.params.id,
      { title, experience },
      { new: true }
    );
    res.json(log);
  } catch (err) {
    res.status(400).json({ error: 'Failed to update log' });
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
