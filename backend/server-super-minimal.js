// SUPER MINIMAL SERVER - Testing if it's an Express issue
console.log('🚀 Starting SUPER MINIMAL server...');
console.log('📅 Timestamp:', new Date().toISOString());

try {
  console.log('📦 Importing Express...');
  const express = await import('express');
  console.log('✅ Express imported');
  
  const app = express.default();
  console.log('✅ Express app created');
  
  const PORT = process.env.PORT || 8080;
  console.log(`🔧 Using port: ${PORT}`);
  
  // ONLY basic middleware
  console.log('📝 Adding JSON middleware...');
  app.use(express.default.json());
  console.log('✅ JSON middleware added');
  
  // ONLY one simple route
  console.log('🛣️ Adding routes...');
  app.get('/test', (req, res) => {
    res.json({ status: 'WORKING', timestamp: new Date().toISOString() });
  });
  console.log('✅ Routes added');
  
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
