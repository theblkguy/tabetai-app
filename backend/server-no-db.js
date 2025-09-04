//1. load env variables from .env
import dotenv from 'dotenv';
dotenv.config();
console.log('✅ Environment variables loaded');

//2. Skip MongoDB connection for now - testing routes only
console.log('⚠️ Skipping MongoDB connection for debugging');

import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';

const app = express();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

console.log('✅ Express app created');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
console.log('✅ Middleware configured');

// Serve static files from the React app in production
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, 'public')));
} else {
  // In development, serve static files from client/dist
  app.use(express.static(path.join(__dirname, '..', 'client', 'dist')));
}
console.log('✅ Static file serving configured');

//3. Register routes
console.log('📥 Importing routes...');
import searchbarRoutes from './routes/searchbar.js';
console.log('✅ Searchbar routes imported');
import spoonacularRouter from './routes/spoonacular.js';
console.log('✅ Spoonacular routes imported');
import recipeRoutes from './routes/recipes.js';
console.log('✅ Recipe routes imported');
import userRoutes from './routes/users.js';
console.log('✅ User routes imported');

console.log('🔗 Registering routes...');
app.use('/api/searchbar', searchbarRoutes);
app.use('/api/spoonacular', spoonacularRouter);
app.use('/api/recipes', recipeRoutes);
app.use('/api/users', userRoutes);
console.log('✅ All routes registered');

//4. Test endpoint
app.get('/', (req, res) => {
  res.send('Tabetai backend is working! (No DB connection)');
});

app.get('/health', (req, res) => {
  res.json({ 
    status: 'HEALTHY',
    timestamp: new Date().toISOString(),
    message: 'Tabetai server running without DB'
  });
});

// Serve React app for any non-API routes in production
if (process.env.NODE_ENV === 'production') {
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
  });
}

const PORT = process.env.PORT || 8080;
console.log(`🚀 Starting server on port ${PORT}...`);

app.listen(PORT, '0.0.0.0', () => {
  console.log(`✅ Server running on http://0.0.0.0:${PORT}`);
  console.log(`🌐 External access: http://3.129.135.94:${PORT}`);
});
