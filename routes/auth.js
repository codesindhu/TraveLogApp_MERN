const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const router = express.Router();

// Register
router.post('/register', async (req, res) => {
  const { username, password } = req.body;
  try {
    const existing = await User.findOne({ username });
    if (existing) return res.status(400).send('User exists');

    const hashed = await bcrypt.hash(password, 10);
    const user = await User.create({ username, password: hashed });

    const token = jwt.sign({ user: { id: user._id } }, process.env.JWT_SECRET);
    res.cookie('token', token).redirect('/');
  } catch (err) {
    res.status(500).send('Server error');
  }
});

// Login
router.post('/login', async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = await User.findOne({ username });
    if (!user) return res.status(400).send('Invalid credentials');

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).send('Invalid credentials');

    const token = jwt.sign({ user: { id: user._id } }, process.env.JWT_SECRET);
    res.cookie('token', token).redirect('/');
  } catch (err) {
    res.status(500).send('Server error');
  }
});

// Logout
router.get('/logout', (req, res) => {
  res.clearCookie('token').redirect('/');
});

module.exports = router;
