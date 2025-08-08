import express from 'express';
import cors from 'cors';
import authRoutes from './routes/auth';
import cryptoRoutes from './routes/crypto';
import travelRoutes from './routes/travel';
import { errorHandler } from './middleware/error';

const app = express();

// Middleware
app.use(cors({
  origin: ['http://localhost:3000'], // Update with your frontend URL
  credentials: true
}));
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/crypto', cryptoRoutes);
app.use('/api/travel', travelRoutes);

// Error handling
app.use(errorHandler);

export default app;