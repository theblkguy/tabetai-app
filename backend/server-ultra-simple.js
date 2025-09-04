import express from 'express';

const app = express();
const PORT = process.env.PORT || 80;

app.get('/', (req, res) => {
  res.send('ULTRA SIMPLE SERVER IS WORKING ON PORT 80!');
});

app.get('/health', (req, res) => {
  res.json({ 
    status: 'ok', 
    timestamp: new Date().toISOString(),
    port: PORT,
    env: process.env.NODE_ENV 
  });
});

app.listen(PORT, () => {
  console.log(`Ultra simple server running on port ${PORT}`);
}).on('error', (err) => {
  console.error('Server failed to start:', err);
});
