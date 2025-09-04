// PROGRESSIVE SERVER - Import routes one by one to find the culprit
console.log('🚀 Starting PROGRESSIVE server...');
console.log('📅 Timestamp:', new Date().toISOString());

try {
  console.log('📦 Importing Express...');
  const express = await import('express');
  console.log('✅ Express imported');
  
  const app = express.default();
  console.log('✅ Express app created');
  
  const PORT = process.env.PORT || 8080;
  console.log(`🔧 Using port: ${PORT}`);
  
  // Basic middleware
  console.log('📝 Adding middleware...');
  app.use(express.default.json());
  app.use(express.default.urlencoded({ extended: true }));
  console.log('✅ Middleware added');
  
  // Test route
  app.get('/test', (req, res) => {
    res.json({ status: 'WORKING', timestamp: new Date().toISOString() });
  });
  console.log('✅ Test route added');
  
  // Now try importing routes one by one...
  console.log('🔍 Testing route imports...');
  
  try {
    console.log('📥 Importing searchbar routes...');
    const searchbarRoutes = await import('./routes/searchbar.js');
    console.log('✅ Searchbar routes imported successfully');
    app.use('/api/searchbar', searchbarRoutes.default);
    console.log('✅ Searchbar routes registered');
  } catch (error) {
    console.error('💥 ERROR importing searchbar routes:', error.message);
  }
  
  try {
    console.log('📥 Importing spoonacular routes...');
    const spoonacularRouter = await import('./routes/spoonacular.js');
    console.log('✅ Spoonacular routes imported successfully');
    app.use('/api/spoonacular', spoonacularRouter.default);
    console.log('✅ Spoonacular routes registered');
  } catch (error) {
    console.error('💥 ERROR importing spoonacular routes:', error.message);
  }
  
  try {
    console.log('📥 Importing recipe routes...');
    const recipeRoutes = await import('./routes/recipes.js');
    console.log('✅ Recipe routes imported successfully');
    app.use('/api/recipes', recipeRoutes.default);
    console.log('✅ Recipe routes registered');
  } catch (error) {
    console.error('💥 ERROR importing recipe routes:', error.message);
  }
  
  try {
    console.log('📥 Importing user routes...');
    const userRoutes = await import('./routes/users.js');
    console.log('✅ User routes imported successfully');
    app.use('/api/users', userRoutes.default);
    console.log('✅ User routes registered');
  } catch (error) {
    console.error('💥 ERROR importing user routes:', error.message);
  }
  
  // Root route
  app.get('/', (req, res) => {
    res.send('Progressive server is working - routes tested individually!');
  });
  
  // Start server
  console.log('🚀 Starting server...');
  app.listen(PORT, '0.0.0.0', () => {
    console.log(`✅ SUCCESS! Server running on port ${PORT}`);
    console.log(`🌐 Access: http://3.129.135.94:${PORT}/test`);
  });
  console.log('⏳ Server startup complete');
  
} catch (error) {
  console.error('💥 FATAL ERROR:', error);
  console.error('Stack:', error.stack);
  process.exit(1);
}
