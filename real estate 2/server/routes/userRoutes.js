import express from 'express';
import userController from '../controllers/userController.js';
import authMiddleware from '../middleware/authMiddleware.js';

const router = express.Router();

router.get('/me', authMiddleware, userController.getProfile);
router.put('/me', authMiddleware, userController.updateProfile);
router.post('/me/avatar', authMiddleware, userController.uploadAvatar);
router.delete('/me', authMiddleware, userController.deleteAccount);

export default router;
