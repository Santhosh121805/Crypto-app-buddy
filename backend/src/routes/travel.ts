import express from 'express';
import { authenticate } from '../middleware/auth';
import { TravelController } from '../controllers/travel';

const router = express.Router();

router.post('/', authenticate, async (req, res) => {
  const { data, error } = await TravelController.createPlan(
    req.user.id,
    req.body.destination,
    req.body.dates,
    req.body.budget
  );
  
  if (error) return res.status(400).json({ error });
  res.status(201).json(data);
});

router.get('/', authenticate, async (req, res) => {
  const { data, error } = await TravelController.getPlans(req.user.id);
  if (error) return res.status(500).json({ error });
  res.json(data);
});

export default router;