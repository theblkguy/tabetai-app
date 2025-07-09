import express from 'express';
import User from '../models/User.js';

const router = express.Router();

// GET /api/users/test - Simple route check
router.get('/test', (req, res) => {
  res.send('User route is working!');
});

// POST /api/users/register - Register a new user
router.post('/register', async (req, res) => {
  try {
    const { username, password } = req.body;
    // Check if user exists
    const existingUser = await User.findOne({ username });
    if (existingUser) return res.status(400).json({ message: 'Username already exists' });

    const user = new User({ username, password });
    await user.save();
    res.status(201).json({ message: 'User registered successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

// POST /api/users/login - Login a user
router.post('/login', async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username });
    if (!user) return res.status(400).json({ message: 'Invalid credentials' });

    const isMatch = await user.comparePassword(password);
    if (!isMatch) return res.status(400).json({ message: 'Invalid credentials' });

    // You can generate a JWT here if you want session/auth tokens
    res.json({ message: 'Login successful', user: { username: user.username } });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});
