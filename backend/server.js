const http = require('http');
const fs = require('fs');
const path = require('path');

const server = http.createServer((req, res) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.url}`);
  
  if (req.url === '/favicon.ico') {
    const faviconPath = path.join(__dirname, 'public', 'favicon.ico');
    
    if (fs.existsSync(faviconPath)) {
      const favicon = fs.readFileSync(faviconPath);
      res.writeHead(200, { 'Content-Type': 'image/x-icon' });
      res.end(favicon);
    } else {
      // Serve a minimal favicon response
      res.writeHead(200, { 'Content-Type': 'image/x-icon' });
      res.end();
    }
    return;
  }
  
  if (req.url === '/' || req.url === '/index.html') {
    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.end(`
      <!DOCTYPE html>
      <html>
      <head>
        <title>Tabetai - Find Your Perfect Recipe</title>
        <link rel="icon" href="/favicon.ico" type="image/x-icon">
      </head>
      <body>
        <h1>🍜 Tabetai</h1>
        <p>Your recipe app is running!</p>
        <p>Server time: ${new Date().toISOString()}</p>
      </body>
      </html>
    `);
    return;
  }
  
  // Handle 404
  res.writeHead(404, { 'Content-Type': 'text/plain' });
  res.end('Not Found');
});

const PORT = process.env.PORT || 8080;
server.listen(PORT, '0.0.0.0', () => {
  console.log(`🚀 Tabetai server running on port ${PORT}`);
  console.log(`🌐 Server accessible at http://localhost:${PORT}`);
});

// Graceful shutdown
process.on('SIGTERM', () => {
  console.log('SIGTERM received, shutting down gracefully');
  server.close(() => {
    console.log('Server closed');
    process.exit(0);
  });
});

process.on('SIGINT', () => {
  console.log('SIGINT received, shutting down gracefully');
  server.close(() => {
    console.log('Server closed');
    process.exit(0);
  });
});