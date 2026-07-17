import Agent from '../models/Agent.js';
import { processImages } from '../utils/uploads.js';

const createAgent = async (req, res) => {
  const agentData = { ...req.body };
  if (req.file) {
    const [imageData] = await processImages([req.file]);
    agentData.photo = imageData.url;
  }
  const agent = await Agent.create(agentData);
  res.status(201).json({ success: true, agent });
};

const updateAgent = async (req, res) => {
  const updates = { ...req.body };
  if (req.file) {
    const [imageData] = await processImages([req.file]);
    updates.photo = imageData.url;
  }
  const agent = await Agent.findByIdAndUpdate(req.params.id, updates, { new: true, runValidators: true });
  if (!agent) return res.status(404).json({ success: false, message: 'Agent not found' });
  res.json({ success: true, agent });
};

const deleteAgent = async (req, res) => {
  const agent = await Agent.findByIdAndDelete(req.params.id);
  if (!agent) return res.status(404).json({ success: false, message: 'Agent not found' });
  res.json({ success: true, message: 'Agent deleted' });
};

const getAgents = async (req, res) => {
  const agents = await Agent.find().sort({ createdAt: -1 });
  res.json({ success: true, agents });
};

const getAgentById = async (req, res) => {
  const agent = await Agent.findById(req.params.id).populate('listedProperties');
  if (!agent) return res.status(404).json({ success: false, message: 'Agent not found' });
  res.json({ success: true, agent });
};

export default { createAgent, updateAgent, deleteAgent, getAgents, getAgentById };
