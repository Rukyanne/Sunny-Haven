import mongoose from 'mongoose';

const newsletterSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true, lowercase: true, trim: true },
  subscribedAt: { type: Date, default: Date.now }
});

newsletterSchema.index({ email: 1 });

export default mongoose.model('Newsletter', newsletterSchema);
