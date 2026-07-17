import express from 'express';
import propertyController from '../controllers/propertyController.js';
import authMiddleware from '../middleware/authMiddleware.js';
import { uploadPropertyImages } from '../utils/uploads.js';

const router = express.Router();

router.post('/', authMiddleware, uploadPropertyImages, propertyController.createProperty);
router.put('/:id', authMiddleware, uploadPropertyImages, propertyController.updateProperty);
router.delete('/:id', authMiddleware, propertyController.deleteProperty);
router.get('/featured', propertyController.getFeaturedProperties);
router.get('/latest', propertyController.getLatestProperties);
router.get('/search', propertyController.searchProperties);
router.get('/:id', propertyController.getPropertyById);

export default router;
