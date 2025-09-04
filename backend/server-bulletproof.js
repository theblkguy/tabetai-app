// BULLETPROOF SERVER - Zero dependencies, maximum logging
console.log('🚀 Starting Tabetai server...');
console.log('📅 Timestamp:', new Date().toISOString());
console.log('🌍 Environment:', {
  NODE_ENV: process.env.NODE_ENV,
  PORT: process.env.PORT,
  PWD: process.cwd()
});

import express from 'express';

console.log('✅ Express imported successfully');

const app = express();
const PORT = process.env.PORT || 8080;

console.log(`🔧 Configuring server for port ${PORT}`);

// Ultra-simple middleware
app.use(express.json());
console.log('✅ JSON middleware added');

// Simple health check that always works
app.get('/health', (req, res) => {
  console.log('💚 Health check requested');
  res.json({ 
    status: 'ALIVE',
    timestamp: new Date().toISOString(),
    port: PORT,
    message: 'Tabetai server is running!'
  });
});

// Root route
app.get('/', (req, res) => {
  console.log('🏠 Root route requested');
  res.send(`
    <html>
    <head><title>Tabetai - LIVE!</title></head>
    <body>
      <h1>🍜 Tabetai App is LIVE on Port ${PORT}!</h1>
      <p>Timestamp: ${new Date().toISOString()}</p>
      <p><a href="/health">Health Check</a></p>
    </body>
    </html>
  `);
});

// Catch all other routes
app.get('*', (req, res) => {
  console.log(`🔄 Fallback route for: ${req.path}`);
  res.send(`
    <html>
    <head><title>Tabetai</title></head>
    <body>
      <h1>🍜 Tabetai App</h1>
      <p>Path: ${req.path}</p>
      <p><a href="/">Home</a> | <a href="/health">Health</a></p>
    </body>
    </html>
  `);
});

console.log('✅ All routes configured');

// Start server with maximum error handling
app.listen(PORT, '0.0.0.0', () => {
  console.log('🎉 SUCCESS! Server started successfully');
  console.log(`🌐 Server running on: http://0.0.0.0:${PORT}`);
  console.log(`🌐 Local access: http://localhost:${PORT}`);
  console.log(`📡 External access: http://3.129.135.94:${PORT}`);
  console.log('✅ Ready to receive requests!');
}).on('error', (err) => {
  console.error('💥 FATAL: Server failed to start!');
  console.error('Error details:', err);
  console.error('Error code:', err.code);
  console.error('Error message:', err.message);
  process.exit(1);
});

console.log('⏳ Server startup initiated...');
