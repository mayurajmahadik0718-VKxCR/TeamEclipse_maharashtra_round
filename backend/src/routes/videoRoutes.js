import { Router } from 'express';
import { videoController } from '../controllers/videoController.js';

const router = Router();

router.post('/generate', videoController.generateVideo);
router.get('/:id', videoController.getVideoById);

export default router;
