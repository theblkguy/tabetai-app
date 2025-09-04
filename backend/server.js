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

// Always serve favicon from the public directory
app.get('/favicon.ico', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'favicon.ico'));
});

//3. Register routes (loading one by one to isolate issues)
console.log('Loading searchbar routes...');
import searchbarRoutes from './routes/searchbar.js';
console.log('✅ Searchbar routes loaded successfully');

console.log('Loading recipes routes...');
import recipeRoutes from './routes/recipes.js';
console.log('✅ Recipes routes loaded successfully');

console.log('Loading spoonacular routes...');
import spoonacularRouter from './routes/spoonacular.js';
console.log('✅ Spoonacular routes loaded successfully');

console.log('Loading user routes...');
import userRoutes from './routes/users.js';
console.log('✅ User routes loaded successfully');

app.use('/api/searchbar', searchbarRoutes);
app.use('/api/recipes', recipeRoutes);
app.use('/api/spoonacular', spoonacularRouter);
app.use('/api/users', userRoutes);

//4. Just an empty endpoint here to test if the route works
app.get('/', (req, res) => {
  res.send('Hiii is this backend working??, YES!');
});

// Serve React app for any non-API routes in production
if (process.env.NODE_ENV === 'production') {
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
  });
}

//5. Start the server
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});