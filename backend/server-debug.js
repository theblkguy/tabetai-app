// DEBUG SERVER - Find exact import that's failing
console.log('🚀 Starting DEBUG server...');

import express from 'express';

const app = express();
const PORT = process.env.PORT || 8080;

app.use(express.json());

// Add basic health check
app.get('/health', (req, res) => {
  res.json({ status: 'DEBUG_SERVER_HEALTHY' });
});

console.log('✅ Basic server setup complete, testing route imports...');

// Test imports individually with detailed error reporting
console.log('🔍 Testing searchbar route import...');
try {
  const searchbarRoutes = await import('./routes/searchbar.js');
  console.log('✅ Searchbar routes imported successfully');
  app.use('/api/searchbar', searchbarRoutes.default);
  console.log('✅ Searchbar routes registered');
} catch (error) {
  console.error('💥 SEARCHBAR ERROR:', error.name);
  console.error('💥 SEARCHBAR MESSAGE:', error.message);
  console.error('💥 SEARCHBAR STACK:', error.stack);
}

console.log('🔍 Testing spoonacular route import...');
try {
  const spoonacularRouter = await import('./routes/spoonacular.js');
  console.log('✅ Spoonacular routes imported successfully');
  app.use('/api/spoonacular', spoonacularRouter.default);
  console.log('✅ Spoonacular routes registered');
} catch (error) {
  console.error('💥 SPOONACULAR ERROR:', error.name);
  console.error('💥 SPOONACULAR MESSAGE:', error.message);
  console.error('💥 SPOONACULAR STACK:', error.stack);
}

console.log('🔍 Testing recipe route import...');
try {
  const recipeRoutes = await import('./routes/recipes.js');
  console.log('✅ Recipe routes imported successfully');
  app.use('/api/recipes', recipeRoutes.default);
  console.log('✅ Recipe routes registered');
} catch (error) {
  console.error('💥 RECIPE ERROR:', error.name);
  console.error('💥 RECIPE MESSAGE:', error.message);
  console.error('💥 RECIPE STACK:', error.stack);
}

console.log('🔍 Testing user route import...');
try {
  const userRoutes = await import('./routes/users.js');
  console.log('✅ User routes imported successfully');
  app.use('/api/users', userRoutes.default);
  console.log('✅ User routes registered');
} catch (error) {
  console.error('💥 USER ERROR:', error.name);
  console.error('💥 USER MESSAGE:', error.message);
  console.error('💥 USER STACK:', error.stack);
}

app.get('/', (req, res) => {
  res.send('Debug server completed route testing!');
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`✅ Debug server running on port ${PORT}`);
  console.log(`🌐 Access: http://3.129.135.94:${PORT}/health`);
});
