// src/controllers/auth.ts
import { supabase } from '../config/supabase';

export const signUp = async (email: string, password: string) => {
  return await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        username: email.split('@')[0]
      }
    }
  });
};

export const getSession = async (jwt: string) => {
  return await supabase.auth.getUser(jwt);
};