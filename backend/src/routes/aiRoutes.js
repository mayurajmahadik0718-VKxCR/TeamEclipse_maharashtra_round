import { Router } from 'express';
import { aiController } from '../controllers/aiController.js';
import {
  generateCampaignSchema,
  trainCreatorTwinSchema,
  validateAiRequest,
} from '../middleware/validateAiRequest.js';

const router = Router();

router.post('/digital-twin/train', validateAiRequest(trainCreatorTwinSchema), aiController.trainCreatorTwin);
router.post('/analyze', aiController.analyzeContent);
router.post('/opportunities/generate', aiController.generateOpportunities);
router.post('/campaign/generate', validateAiRequest(generateCampaignSchema), aiController.generateCampaign);
router.post('/critic', aiController.criticizeContent);
router.get('/learning/:creatorId', aiController.learnFromPerformance);

export default router;
