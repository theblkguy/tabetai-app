//1. load env variables from .env
import dotenv from 'dotenv';
dotenv.config();

//2. Connect to MongoDB
import './db/index.js';

import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';

const app = express();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static files from the React app in production
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, 'public')));
} else {
  // In development, serve static files from client/dist
  app.use(express.static(path.join(__dirname, '..', 'client', 'dist')));
}

//3. Add safe API routes manually (avoiding the problematic route files)
import User from './models/User.js';

// Basic user routes (safe versions)
app.get('/api/users/test', (req, res) => {
  res.json({ message: 'User API is working!' });
});

app.post('/api/users/register', async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = new User({ username, password });
    await user.save();
    res.status(201).json({ message: 'User registered', user: { id: user._id, username: user.username } });
  } catch (err) {
    res.status(400).json({ message: 'Registration failed', error: err.message });
  }
});

app.post('/api/users/login', async (req, res) => {
  try {
    const { username, password } = req.body;
    let user = await User.findOne({ username });
    if (!user) {
      user = new User({ username, password });
      await user.save();
      return res.status(201).json({ message: 'User registered and logged in', user: { id: user._id, username: user.username } });
    }
    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }
    res.json({ message: 'Login successful', user: { id: user._id, username: user.username } });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

//4. Basic endpoints
app.get('/', (req, res) => {
  res.send('Tabetai App - Your Recipe Discovery Platform');
});

app.get('/api/test', (req, res) => {
  res.json({ 
    message: 'API is working!', 
    timestamp: new Date().toISOString(),
    features: ['User authentication', 'Basic recipe storage']
  });
});

// Serve React app for any non-API routes in production
if (process.env.NODE_ENV === 'production') {
  app.get('*', (req, res) => {
    const indexPath = path.join(__dirname, 'public', 'index.html');
    res.sendFile(indexPath);
  });
}

//5. Start the server
const PORT = process.env.PORT || 80;
app.listen(PORT, () => {
  console.log(`Tabetai server running on port ${PORT}`);
}).on('error', (err) => {
  console.error('Server failed to start:', err);
});
