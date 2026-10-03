import { Router } from 'express';
import { creatorController } from '../controllers/creatorController.js';
import { digitalTwinController } from '../controllers/digitalTwinController.js';

const router = Router();

// Creator routes
router.get('/', creatorController.getAllCreators);
router.post('/', creatorController.createCreator);
router.get('/:id', creatorController.getCreatorById);

// Digital Twin route
router.get('/:id/digital-twin', digitalTwinController.getDigitalTwin);

export default router;
