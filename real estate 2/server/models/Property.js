import mongoose from 'mongoose';

const propertySchema = new mongoose.Schema({
  title: { type: String, required: true, trim: true },
  description: { type: String, trim: true },
  price: { type: Number, required: true },
  bedrooms: { type: Number, default: 0 },
  bathrooms: { type: Number, default: 0 },
  garage: { type: Number, default: 0 },
  size: { type: Number, default: 0 },
  address: { type: String, trim: true },
  city: { type: String, trim: true },
  state: { type: String, trim: true },
  country: { type: String, trim: true },
  status: { type: String, enum: ['for sale', 'for rent', 'sold', 'pending'], default: 'for sale' },
  category: { type: String, trim: true },
  propertyType: { type: String, trim: true },
  amenities: [{ type: String, trim: true }],
  agent: { type: mongoose.Schema.Types.ObjectId, ref: 'Agent' },
  images: [{ url: String, publicId: String, thumbnailUrl: String }],
  isFeatured: { type: Boolean, default: false },
  isPremium: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now }
});

propertySchema.index({ title: 'text', description: 'text', city: 1, state: 1, country: 1, status: 1, category: 1 });
propertySchema.index({ price: 1, bedrooms: 1, bathrooms: 1, city: 1, state: 1, country: 1 });

export default mongoose.model('Property', propertySchema);
