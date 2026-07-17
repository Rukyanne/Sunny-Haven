import Newsletter from '../models/Newsletter.js';

const subscribe = async (req, res) => {
  const { email } = req.body;
  const existing = await Newsletter.findOne({ email });
  if (existing) return res.status(409).json({ success: false, message: 'Email already subscribed' });
  const subscriber = await Newsletter.create({ email });
  res.status(201).json({ success: true, subscriber });
};

const listSubscribers = async (req, res) => {
  const subscribers = await Newsletter.find().sort({ subscribedAt: -1 });
  res.json({ success: true, subscribers });
};

export default { subscribe, listSubscribers };
