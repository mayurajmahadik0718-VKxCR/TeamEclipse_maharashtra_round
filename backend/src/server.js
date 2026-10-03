import app from './app.js';
import { config } from './config/env.js';

const PORT = config.port;

const server = app.listen(PORT, () => {
  console.log(`===============================================`);
  console.log(`  🚀 CreatorAI Backend Server is running!`);
  console.log(`  📡 Local URL:    http://localhost:${PORT}`);
  console.log(`  🏥 Health Check: http://localhost:${PORT}/api/health`);
  console.log(`  🕒 Started At:   ${new Date().toLocaleString()}`);
  console.log(`===============================================`);
});

// Graceful shutdown handling
process.on('SIGTERM', () => {
  console.log('SIGTERM signal received. Closing HTTP server gracefully.');
  server.close(() => {
    console.log('HTTP server closed.');
  });
});

process.on('SIGINT', () => {
  console.log('SIGINT signal received. Closing HTTP server gracefully.');
  server.close(() => {
    console.log('HTTP server closed.');
  });
});
