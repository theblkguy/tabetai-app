//1. load env variables from .env
import dotenv from 'dotenv';
dotenv.config();
console.log('MONGODB_URI:', process.env.MONGODB_URI);
console.log('SPOONACULAR_API_KEY:', process.env.SPOONACULAR_API_KEY);

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

//3. Register routes ONE BY ONE to identify the problematic one
console.log('Loading routes...');

try {
  console.log('Loading users routes...');
  const userRoutes = await import('./routes/users.js');
  app.use('/api/users', userRoutes.default);
  console.log('✅ Users routes loaded successfully');
} catch (err) {
  console.error('❌ Error loading users routes:', err.message);
}

try {
  console.log('Loading searchbar routes...');
  const searchbarRoutes = await import('./routes/searchbar.js');
  app.use('/api/searchbar', searchbarRoutes.default);
  console.log('✅ Searchbar routes loaded successfully');
} catch (err) {
  console.error('❌ Error loading searchbar routes:', err.message);
}

try {
  console.log('Loading recipes routes...');
  const recipeRoutes = await import('./routes/recipes.js');
  app.use('/api/recipes', recipeRoutes.default);
  console.log('✅ Recipes routes loaded successfully');
} catch (err) {
  console.error('❌ Error loading recipes routes:', err.message);
}

try {
  console.log('Loading spoonacular routes...');
  const spoonacularRouter = await import('./routes/spoonacular.js');
  app.use('/api/spoonacular', spoonacularRouter.default);
  console.log('✅ Spoonacular routes loaded successfully');
} catch (err) {
  console.error('❌ Error loading spoonacular routes:', err.message);
}

//4. Basic endpoints
app.get('/', (req, res) => {
  res.send('Gradual server - identifying route issues');
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
const PORT = process.env.PORT || 80;
app.listen(PORT, () => {
  console.log(`Gradual server running on port ${PORT}`);
}).on('error', (err) => {
  console.error('Server failed to start:', err);
});
