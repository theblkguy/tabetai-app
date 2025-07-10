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
    console.log('Login request body:', req.body);
    const { username, password } = req.body;
    let user = await User.findOne({ username });
    if (!user) {
      // Auto-register new user if not found
      user = new User({ username, password });
      await user.save();
      return res.status(201).json({ message: 'User registered and logged in', user: { username: user.username } });
    }

    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      console.log('Password does not match');
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    res.json({ message: 'Login successful', user: { username: user.username } });
  } catch (err) {
    console.error('Login error:', err);
    res.status(500).json({ message: 'Server error' });
  }
});

// POST /api/users/google-login - Login or register a Google user
router.post('/google-login', async (req, res) => {
  try {
    const { token, profile } = req.body;
    if (!profile || !profile.sub) {
      return res.status(400).json({ message: 'Invalid Google profile' });
    }
    // Try to find user by Google ID
    let user = await User.findOne({ googleId: profile.sub });
    if (!user) {
      // If not found, create a new user
      user = new User({
        googleId: profile.sub,
        name: profile.name,
        email: profile.email,
        // Optionally add more fields from profile
      });
      await user.save();
    }
    res.json({ message: 'Google login successful', user: { googleId: user.googleId, name: user.name, email: user.email } });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

export default router;
