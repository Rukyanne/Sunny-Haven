import express from 'express';
import contactController from '../controllers/contactController.js';
import authMiddleware from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/', contactController.createContact);
router.get('/', authMiddleware, contactController.getContacts);
router.get('/:id', authMiddleware, contactController.getContactById);

export default router;
