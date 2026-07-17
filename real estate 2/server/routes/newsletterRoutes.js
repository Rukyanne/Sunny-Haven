import express from 'express';
import newsletterController from '../controllers/newsletterController.js';

const router = express.Router();

router.post('/', newsletterController.subscribe);
router.get('/', newsletterController.listSubscribers);

export default router;
