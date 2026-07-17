import mongoose from 'mongoose';

const reviewSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  property: { type: mongoose.Schema.Types.ObjectId, ref: 'Property', required: true },
  agent: { type: mongoose.Schema.Types.ObjectId, ref: 'Agent' },
  rating: { type: Number, required: true, min: 1, max: 5 },
  comment: { type: String, trim: true },
  createdAt: { type: Date, default: Date.now }
});

reviewSchema.index({ property: 1 });
reviewSchema.index({ agent: 1 });

export default mongoose.model('Review', reviewSchema);
