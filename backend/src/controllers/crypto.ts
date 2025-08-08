import { supabase } from '../config/supabase';
import { CoinGeckoService } from '../services/coin-gecko';
import { Request, Response } from 'express';
import { PortfolioAsset } from '../types/supabase.types';

export const CryptoController = {
  /**
   * Get market data for all cryptocurrencies
   */
  getMarketData: async (req: Request, res: Response) => {
    try {
      const { vs_currency = 'usd' } = req.query;
      
      // Fetch from CoinGecko API
      const data = await CoinGeckoService.getMarketData(vs_currency as string);
      
      // Cache in Supabase (optional)
      await supabase
        .from('market_data_cache')
        .upsert({
          vs_currency,
          data,
          last_updated: new Date()
        });

      res.json(data);
    } catch (error) {
      console.error('Market data error:', error);
      res.status(500).json({ error: 'Failed to fetch market data' });
    }
  },

  /**
   * Get user's crypto portfolio
   */
  getPortfolio: async (req: Request, res: Response) => {
    try {
      const { data, error } = await supabase
        .from('portfolio_assets')
        .select('*, coins(*)')
        .eq('user_id', req.user.id)
        .order('last_updated', { ascending: false });

      if (error) throw error;

      // Calculate portfolio value
      const assetsWithValue = await Promise.all(
        data.map(async (asset: PortfolioAsset) => {
          const coinData = await CoinGeckoService.getCoinData(asset.coin_id);
          return {
            ...asset,
            current_price: coinData.market_data.current_price.usd,
            value: asset.amount * coinData.market_data.current_price.usd
          };
        })
      );

      const totalValue = assetsWithValue.reduce(
        (sum, asset) => sum + (asset.value || 0), 0
      );

      res.json({
        assets: assetsWithValue,
        total_value: totalValue
      });
    } catch (error) {
      console.error('Portfolio error:', error);
      res.status(500).json({ error: 'Failed to fetch portfolio' });
    }
  },

  /**
   * Add transaction to portfolio
   */
  addTransaction: async (req: Request, res: Response) => {
    try {
      const { coin_id, amount, transaction_type } = req.body;

      // Validate input
      if (!coin_id || !amount || !['buy', 'sell'].includes(transaction_type)) {
        return res.status(400).json({ error: 'Invalid transaction data' });
      }

      // Get current holdings
      const { data: existing } = await supabase
        .from('portfolio_assets')
        .select('amount')
        .eq('user_id', req.user.id)
        .eq('coin_id', coin_id)
        .single();

      const newAmount = transaction_type === 'buy' 
        ? (existing?.amount || 0) + parseFloat(amount)
        : (existing?.amount || 0) - parseFloat(amount);

      if (newAmount < 0) {
        return res.status(400).json({ error: 'Insufficient balance' });
      }

      // Update portfolio
      const { data, error } = await supabase
        .from('portfolio_assets')
        .upsert({
          user_id: req.user.id,
          coin_id,
          amount: newAmount,
          last_updated: new Date()
        })
        .select('*, coins(*)')
        .single();

      if (error) throw error;

      res.status(201).json(data);
    } catch (error) {
      console.error('Transaction error:', error);
      res.status(500).json({ error: 'Transaction failed' });
    }
  },

  /**
   * Get coin details
   */
  getCoinDetails: async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const data = await CoinGeckoService.getCoinData(id);
      
      res.json({
        id: data.id,
        name: data.name,
        symbol: data.symbol,
        image: data.image.large,
        current_price: data.market_data.current_price.usd,
        price_change_24h: data.market_data.price_change_24h,
        market_cap: data.market_data.market_cap.usd
      });
    } catch (error) {
      console.error('Coin details error:', error);
      res.status(500).json({ error: 'Failed to fetch coin details' });
    }
  }
};