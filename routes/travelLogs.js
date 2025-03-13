const express = require('express');
const router = express.Router();
const TravelLog = require('../models/TravelLog');
const authMiddleware = require('../middleware/auth');

// GET all travel logs for logged-in user
router.get('/', authMiddleware, async (req, res) => {
  try {
    const logs = await TravelLog.find({ user: req.user.id }).sort({ date: -1 });
    res.json(logs);
  } catch (err) {
    res.status(500).send('Server Error');
  }
});

// POST create new travel log
router.post('/', authMiddleware, async (req, res) => {
  try {
    const { title, description, image } = req.body;
    const newLog = new TravelLog({
      title,
      description,
      image,
      user: req.user.id
    });
    const saved = await newLog.save();
    res.json(saved);
  } catch (err) {
    res.status(500).send('Server Error');
  }
});

// PUT update log
router.put('/:id', authMiddleware, async (req, res) => {
  const { title, description, image } = req.body;
  try {
    let log = await TravelLog.findById(req.params.id);
    if (!log || log.user.toString() !== req.user.id)
      return res.status(401).send('Unauthorized');
    log.title = title;
    log.description = description;
    log.image = image;
    const updated = await log.save();
    res.json(updated);
  } catch (err) {
    res.status(500).send('Server Error');
  }
});

// DELETE log
router.delete('/:id', authMiddleware, async (req, res) => {
  try {
    let log = await TravelLog.findById(req.params.id);
    if (!log || log.user.toString() !== req.user.id)
      return res.status(401).send('Unauthorized');
    await log.deleteOne();
    res.json({ msg: 'Deleted successfully' });
  } catch (err) {
    res.status(500).send('Server Error');
  }
});

module.exports = router;
