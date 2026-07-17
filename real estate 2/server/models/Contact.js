import mongoose from 'mongoose';

const contactSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  email: { type: String, required: true, trim: true },
  phone: { type: String, trim: true },
  message: { type: String, required: true, trim: true },
  property: { type: mongoose.Schema.Types.ObjectId, ref: 'Property' },
  createdAt: { type: Date, default: Date.now }
});

contactSchema.index({ email: 1 });

export default mongoose.model('Contact', contactSchema);
