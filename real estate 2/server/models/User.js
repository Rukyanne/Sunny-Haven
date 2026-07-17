import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  email: { type: String, required: true, unique: true, lowercase: true, trim: true },
  password: { type: String, required: true, select: false },
  role: { type: String, enum: ['super-admin', 'admin', 'manager', 'agent', 'user'], default: 'user' },
  avatar: { type: String },
  bio: { type: String, trim: true },
  phone: { type: String, trim: true },
  social: {
    linkedin: { type: String, trim: true },
    instagram: { type: String, trim: true },
    facebook: { type: String, trim: true },
    twitter: { type: String, trim: true }
  },
  isEmailVerified: { type: Boolean, default: false },
  passwordResetToken: { type: String },
  passwordResetExpires: { type: Date },
  passwordChangedAt: { type: Date },
  createdAt: { type: Date, default: Date.now }
});

userSchema.index({ email: 1 });

export default mongoose.model('User', userSchema);
