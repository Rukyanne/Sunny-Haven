import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
import morgan from 'morgan';
import helmet from 'helmet';
import cors from 'cors';
import compression from 'compression';
import cookieParser from 'cookie-parser';
import rateLimit from 'express-rate-limit';
import 'express-async-errors';
import { connectDatabase } from './database/connect.js';
import notFoundHandler from './middleware/notFound.js';
import errorHandler from './middleware/errorHandler.js';
import authRoutes from './routes/authRoutes.js';
import userRoutes from './routes/userRoutes.js';
import propertyRoutes from './routes/propertyRoutes.js';
import agentRoutes from './routes/agentRoutes.js';
import contactRoutes from './routes/contactRoutes.js';
import newsletterRoutes from './routes/newsletterRoutes.js';
import reviewRoutes from './routes/reviewRoutes.js';
import appointmentRoutes from './routes/appointmentRoutes.js';
import favoriteRoutes from './routes/favoriteRoutes.js';
import { logger } from './utils/logger.js';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const port = process.env.PORT || 5000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(helmet());
app.use(cors({ origin: true, credentials: true }));
app.use(compression());
app.use(morgan('combined', { stream: logger.stream }));

const limiter = rateLimit({ windowMs: 15 * 60 * 1000, max: 120, standardHeaders: true, legacyHeaders: false });
app.use(limiter);

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.use('/public', express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, '../client')));

app.get('/', (req, res) => res.sendFile(path.join(__dirname, '../client/index.html')));

app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/users', userRoutes);
app.use('/api/v1/properties', propertyRoutes);
app.use('/api/v1/agents', agentRoutes);
app.use('/api/v1/contacts', contactRoutes);
app.use('/api/v1/newsletter', newsletterRoutes);
app.use('/api/v1/reviews', reviewRoutes);
app.use('/api/v1/appointments', appointmentRoutes);
app.use('/api/v1/favorites', favoriteRoutes);

app.use(notFoundHandler);
app.use(errorHandler);

const start = async () => {
  await connectDatabase(process.env.MONGODB_URI);
  app.listen(port, () => {
    logger.info(`Server running on port ${port}`);
  });
};

start();
