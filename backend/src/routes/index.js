import { Router } from 'express';
import creatorRoutes from './creatorRoutes.js';
import contentRoutes from './contentRoutes.js';
import videoRoutes from './videoRoutes.js';
import analyticsRoutes from './analyticsRoutes.js';

const router = Router();

// Health Check route: GET /api/health
router.get('/health', (req, res) => {
  res.status(200).json({
    status: 'healthy',
    service: 'CreatorAI Backend Service',
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
  });
});

// Domain Routes
router.use('/creators', creatorRoutes);
router.use('/content', contentRoutes);
router.use('/video', videoRoutes);
router.use('/analytics', analyticsRoutes);

export default router;
