// src/middleware/auth.ts
import { supabase } from '../config/supabase';
import { Request, Response, NextFunction } from 'express';

export const authenticate = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) return res.sendStatus(401);

  const { data: { user }, error } = await supabase.auth.getUser(token);
  if (error) return res.status(401).json({ error: 'Invalid token' });

  req.user = user;
  next();
};