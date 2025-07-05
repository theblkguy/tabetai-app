import express from 'express';
import User from '../models/User.js';

const router = express.Router();

// GET /api/users/test - Simple route check
router.get('/test', (req, res) => {
  res.send('User route is working!');
});

// POST /api/users - Create or login a user
router.post('/', async (req, res) => {
  try {
    const { googleId, name, email } = req.body;

    if (!googleId || !name || !email) {
      return res.status(400).json({ error: 'googleId, name, and email are required' });
    }

    let existingUser = await User.findOne({ googleId });

    if (!existingUser) {
      existingUser = await User.create({ googleId, name, email });
    }

    res.status(200).json(existingUser);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

export default router;
