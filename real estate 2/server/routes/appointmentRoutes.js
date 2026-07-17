import express from 'express';
import appointmentController from '../controllers/appointmentController.js';
import authMiddleware from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/', authMiddleware, appointmentController.createAppointment);
router.get('/', authMiddleware, appointmentController.getAppointments);
router.get('/:id', authMiddleware, appointmentController.getAppointmentById);

export default router;
