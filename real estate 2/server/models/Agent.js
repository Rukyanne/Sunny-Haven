import mongoose from 'mongoose';

const agentSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  photo: { type: String },
  bio: { type: String, trim: true },
  contactEmail: { type: String, trim: true },
  contactPhone: { type: String, trim: true },
  socialLinks: {
    linkedin: { type: String, trim: true },
    instagram: { type: String, trim: true },
    facebook: { type: String, trim: true },
    twitter: { type: String, trim: true }
  },
  listedProperties: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Property' }],
  averageRating: { type: Number, default: 0 },
  ratingsCount: { type: Number, default: 0 },
  createdAt: { type: Date, default: Date.now }
});

agentSchema.index({ name: 1 });

export default mongoose.model('Agent', agentSchema);
