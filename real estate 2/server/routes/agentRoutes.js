import express from 'express';
import agentController from '../controllers/agentController.js';
import authMiddleware from '../middleware/authMiddleware.js';
import { uploadAgentPhoto } from '../utils/uploads.js';

const router = express.Router();

router.post('/', authMiddleware, uploadAgentPhoto, agentController.createAgent);
router.put('/:id', authMiddleware, uploadAgentPhoto, agentController.updateAgent);
router.delete('/:id', authMiddleware, agentController.deleteAgent);
router.get('/', agentController.getAgents);
router.get('/:id', agentController.getAgentById);

export default router;
