import User from '../models/User.js';
import { processImages } from '../utils/uploads.js';

const getProfile = async (req, res) => {
  const user = await User.findById(req.user.userId).select('-password');
  if (!user) return res.status(404).json({ success: false, message: 'User not found' });
  res.json({ success: true, user });
};

const updateProfile = async (req, res) => {
  const updates = { ...req.body };
  delete updates.role;
  const user = await User.findByIdAndUpdate(req.user.userId, updates, { new: true, runValidators: true }).select('-password');
  res.json({ success: true, user });
};

const uploadAvatar = async (req, res) => {
  if (!req.file) return res.status(400).json({ success: false, message: 'Avatar file required' });
  const [imageData] = await processImages([req.file]);
  const user = await User.findByIdAndUpdate(req.user.userId, { avatar: imageData.url }, { new: true }).select('-password');
  res.json({ success: true, user });
};

const deleteAccount = async (req, res) => {
  await User.findByIdAndDelete(req.user.userId);
  res.json({ success: true, message: 'Account deleted' });
};

export default { getProfile, updateProfile, uploadAvatar, deleteAccount };
