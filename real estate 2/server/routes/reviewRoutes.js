import express from 'express';
import reviewController from '../controllers/reviewController.js';
import authMiddleware from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/', authMiddleware, reviewController.createReview);
router.get('/', reviewController.getReviews);
router.get('/:id', reviewController.getReviewById);

export default router;
