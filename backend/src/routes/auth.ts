import express from 'express';
import { supabase } from '../config/supabase';

const router = express.Router();

router.post('/signup', async (req, res) => {
  const { email, password } = req.body;
  const { data, error } = await supabase.auth.signUp({
    email,
    password
  });

  if (error) return res.status(400).json({ error: error.message });
  res.status(201).json(data);
});

router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password
  });

  if (error) return res.status(401).json({ error: error.message });
  res.json(data);
});

export default router;