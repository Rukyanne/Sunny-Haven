import express from 'express';
import favoriteController from '../controllers/favoriteController.js';
import authMiddleware from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/:propertyId', authMiddleware, favoriteController.addFavorite);
router.delete('/:propertyId', authMiddleware, favoriteController.removeFavorite);
router.get('/', authMiddleware, favoriteController.getFavorites);

export default router;
