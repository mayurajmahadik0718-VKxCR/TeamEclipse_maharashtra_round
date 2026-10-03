import express from 'express';
import cors from 'cors';
import routes from './routes/index.js';
import { errorHandler, notFoundHandler } from './middleware/errorHandler.js';

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Root welcome
app.get('/', (req, res) => {
  res.json({
    message: 'Welcome to CreatorAI API',
    documentation: '/docs',
    healthCheck: '/api/health',
  });
});

// API Routes mounted at /api
app.use('/api', routes);

// 404 & Error Handling
app.use(notFoundHandler);
app.use(errorHandler);

export default app;
