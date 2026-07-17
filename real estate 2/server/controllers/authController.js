import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import crypto from 'crypto';
import User from '../models/User.js';
import { validationResult } from 'express-validator';

const createToken = (user, secret, expiresIn) => jwt.sign({ userId: user._id, role: user.role }, secret, { expiresIn });

const register = async (req, res) => {
  const { name, email, password } = req.body;
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ success: false, errors: errors.array() });
  }

  const existingUser = await User.findOne({ email });
  if (existingUser) {
    return res.status(409).json({ success: false, message: 'Email already registered' });
  }

  const hashedPassword = await bcrypt.hash(password, 12);
  const user = await User.create({ name, email, password: hashedPassword });

  const token = createToken(user, process.env.JWT_SECRET, '15m');
  const refreshToken = createToken(user, process.env.JWT_REFRESH_SECRET, '7d');

  res.cookie('refreshToken', refreshToken, { httpOnly: true, secure: process.env.NODE_ENV === 'production', sameSite: 'strict', maxAge: 7 * 24 * 60 * 60 * 1000 });
  res.status(201).json({ success: true, user: { id: user._id, name: user.name, email: user.email, role: user.role }, token });
};

const login = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email }).select('+password');
  if (!user || !(await bcrypt.compare(password, user.password))) {
    return res.status(401).json({ success: false, message: 'Invalid credentials' });
  }

  const token = createToken(user, process.env.JWT_SECRET, '15m');
  const refreshToken = createToken(user, process.env.JWT_REFRESH_SECRET, '7d');

  res.cookie('refreshToken', refreshToken, { httpOnly: true, secure: process.env.NODE_ENV === 'production', sameSite: 'strict', maxAge: 7 * 24 * 60 * 60 * 1000 });
  res.json({ success: true, user: { id: user._id, name: user.name, email: user.email, role: user.role }, token });
};

const logout = (req, res) => {
  res.clearCookie('refreshToken', { httpOnly: true, secure: process.env.NODE_ENV === 'production', sameSite: 'strict' });
  res.json({ success: true, message: 'Logged out successfully' });
};

const refreshToken = async (req, res) => {
  const refreshToken = req.cookies.refreshToken;
  if (!refreshToken) {
    return res.status(401).json({ success: false, message: 'Refresh token missing' });
  }

  try {
    const payload = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET);
    const user = await User.findById(payload.userId);
    if (!user) throw new Error('Invalid refresh token');
    const token = createToken(user, process.env.JWT_SECRET, '15m');
    res.json({ success: true, token });
  } catch (error) {
    res.status(401).json({ success: false, message: 'Invalid refresh token' });
  }
};

const forgotPassword = async (req, res) => {
  const { email } = req.body;
  const user = await User.findOne({ email });
  if (!user) return res.status(200).json({ success: true, message: 'If your email exists, a reset link has been sent.' });

  const resetToken = crypto.randomBytes(32).toString('hex');
  user.passwordResetToken = crypto.createHash('sha256').update(resetToken).digest('hex');
  user.passwordResetExpires = Date.now() + 60 * 60 * 1000;
  await user.save({ validateBeforeSave: false });

  res.json({ success: true, message: 'Password reset token generated', resetToken });
};

const resetPassword = async (req, res) => {
  const { token, password } = req.body;
  const hashedToken = crypto.createHash('sha256').update(token).digest('hex');
  const user = await User.findOne({ passwordResetToken: hashedToken, passwordResetExpires: { $gt: Date.now() } });
  if (!user) return res.status(400).json({ success: false, message: 'Invalid or expired token' });

  user.password = await bcrypt.hash(password, 12);
  user.passwordResetToken = undefined;
  user.passwordResetExpires = undefined;
  user.passwordChangedAt = Date.now();
  await user.save();

  res.json({ success: true, message: 'Password reset successfully' });
};

const verifyEmail = async (req, res) => {
  const { email } = req.body;
  const user = await User.findOne({ email });
  if (!user) return res.status(404).json({ success: false, message: 'User not found' });
  user.isEmailVerified = true;
  await user.save();
  res.json({ success: true, message: 'Email verified' });
};

const changePassword = async (req, res) => {
  const user = await User.findById(req.user.userId).select('+password');
  const { currentPassword, newPassword } = req.body;
  if (!user || !(await bcrypt.compare(currentPassword, user.password))) {
    return res.status(401).json({ success: false, message: 'Current password invalid' });
  }
  user.password = await bcrypt.hash(newPassword, 12);
  user.passwordChangedAt = Date.now();
  await user.save();
  res.json({ success: true, message: 'Password changed successfully' });
};

export default { register, login, logout, refreshToken, forgotPassword, resetPassword, verifyEmail, changePassword };
