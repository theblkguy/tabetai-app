//1. load env variables from .env
import dotenv from 'dotenv';
dotenv.config();
console.log('MONGODB_URI:', process.env.MONGODB_URI); // Debug: check if .env is loaded

//2. Connect to MongoDB
import './db/index.js';

import express from 'express';
const app = express();
app.use(express.json());

//3. Register routes
import searchbarRoutes from './routes/searchbar.js';
import recipeRoutes from './routes/recipes.js';
import userRoutes from './routes/users.js';

app.use('/api/spoonacular', searchbarRoutes);
app.use('/api/recipes', recipeRoutes);
app.use('/api/users', userRoutes);

//4. Just an empty endpoint here to test if the route works
app.get('/', (req, res) => {
  res.send('Hiii is this backend working??, YES!');
});

//5. Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

