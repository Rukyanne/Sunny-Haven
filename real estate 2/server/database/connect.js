import mongoose from 'mongoose';
import { logger } from '../utils/logger.js';

export const connectDatabase = async (uri) => {
  try {
    if (!uri) {
      throw new Error('MONGODB_URI must be defined');
    }
    mongoose.set('strictQuery', true);
    await mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });
    logger.info('Connected to MongoDB');
  } catch (error) {
    logger.error('MongoDB connection failed', error);
    process.exit(1);
  }
};
