//1. load env variables from .env
import dotenv from 'dotenv';
dotenv.config();
console.log('MONGODB_URI:', process.env.MONGODB_URI); // Debug: check if .env is loaded
console.log('SPOONACULAR_API_KEY:', process.env.SPOONACULAR_API_KEY); // Debug: check if .env is loaded

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

//3. Basic test endpoint
app.get('/', (req, res) => {
  res.send('Hiii is this backend working??, YES!');
});

app.get('/api/test', (req, res) => {
  res.json({ message: 'API is working!', timestamp: new Date().toISOString() });
});

// Serve React app for any non-API routes in production
if (process.env.NODE_ENV === 'production') {
  app.get('*', (req, res) => {
    const indexPath = path.join(__dirname, 'public', 'index.html');
    console.log('Attempting to serve:', indexPath);
    res.sendFile(indexPath);
  });
}

//5. Start the server
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
