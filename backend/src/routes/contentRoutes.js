import { Router } from 'express';
import { contentController } from '../controllers/contentController.js';

const router = Router();

router.post('/generate', contentController.generateContent);
router.get('/:id', contentController.getContentById);

export default router;
