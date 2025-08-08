// src/routes/crypto.ts
import express from 'express';
import { authenticate } from '../middleware/auth';
import { PortfolioService } from '../services/supabase';

const router = express.Router();

router.get('/portfolio', authenticate, async (req, res) => {
  const { data, error } = await PortfolioService.getAssets(req.user.id);
  if (error) return res.status(500).json({ error });
  res.json(data);
});

export default router;