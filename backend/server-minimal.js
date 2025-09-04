import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';

const app = express();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Basic middleware
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// Simple routes that cannot fail
app.get('/', (req, res) => {
  res.send(`
    <!DOCTYPE html>
    <html>
    <head>
      <title>Tabetai App</title>
      <link rel="icon" type="image/x-icon" href="/favicon.ico">
    </head>
    <body>
      <h1>🍜 Tabetai App is LIVE!</h1>
      <p>Your recipe discovery platform is working!</p>
      <p>Server time: ${new Date().toISOString()}</p>
      <p>Environment: ${process.env.NODE_ENV || 'development'}</p>
      <p>Port: ${process.env.PORT || 80}</p>
    </body>
    </html>
  `);
});

app.get('/health', (req, res) => {
  res.json({ 
    status: 'OK', 
    timestamp: new Date().toISOString(),
    message: 'Tabetai server is running successfully!'
  });
});

// Fallback for React routes
app.get('*', (req, res) => {
  res.send(`
    <!DOCTYPE html>
    <html>
    <head>
      <title>Tabetai App</title>
      <link rel="icon" type="image/x-icon" href="/favicon.ico">
    </head>
    <body>
      <h1>🍜 Tabetai App</h1>
      <p>React app will be loaded here soon!</p>
      <p>Requested: ${req.path}</p>
    </body>
    </html>
  `);
});

const PORT = process.env.PORT || 8080;

app.listen(PORT, '0.0.0.0', () => {
  console.log(`✅ Tabetai server successfully started on port ${PORT}`);
  console.log(`🌍 Server accessible at http://localhost:${PORT}`);
}).on('error', (err) => {
  console.error('❌ Server failed to start:', err);
  process.exit(1);
});
