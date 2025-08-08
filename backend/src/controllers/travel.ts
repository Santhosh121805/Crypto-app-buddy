import { supabase } from '../config/supabase';

export const TravelController = {
  createPlan: async (userId: string, destination: string, dates: string, budget: number) => {
    return await supabase
      .from('travel_plans')
      .insert([
        { 
          user_id: userId,
          destination,
          start_date: dates[0],
          end_date: dates[1],
          budget
        }
      ])
      .select()
      .single();
  },

  getPlans: async (userId: string) => {
    return await supabase
      .from('travel_plans')
      .select('*')
      .eq('user_id', userId)
      .order('created_at', { ascending: false });
  }
};