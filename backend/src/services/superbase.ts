// src/services/supabase.ts
import { supabase } from '../config/supabase';

export const PortfolioService = {
  getAssets: async (userId: string) => {
    return await supabase
      .from('portfolio_assets')
      .select('*, coins(*)')
      .eq('user_id', userId);
  },

  addTransaction: async (userId: string, coinId: string, amount: number) => {
    return await supabase
      .from('portfolio_assets')
      .upsert({
        user_id: userId,
        coin_id: coinId,
        amount,
        last_updated: new Date()
      });
  }
};