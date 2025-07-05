//1. load env variables from .env
require('dotenv').config();

//2. Connect to MongoDB
require('./db');

const express = require('express');
const app = express();

//3. Middleware to Parse JSON
app.use(express.json());

//add recipe route to server
const recipeRoutes = require('./routes/recipes');
app.use('/api/recipes', recipeRoutes);

//add user route to the server
const userRoutes = require('./routes/users');
app.use('/api/users', userRoutes);

//4. Just an empty endpoint here to test if the route works
app.get('/', (req, res) => {
  res.send('Hiii is this backend working??, YES!');
});

//5. Start the server 
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});