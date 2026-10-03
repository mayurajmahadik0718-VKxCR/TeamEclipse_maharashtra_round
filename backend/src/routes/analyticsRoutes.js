import { Router } from 'express';
import { analyticsController } from '../controllers/analyticsController.js';

const router = Router();

router.get('/:creatorId', analyticsController.getAnalyticsByCreatorId);

export default router;
