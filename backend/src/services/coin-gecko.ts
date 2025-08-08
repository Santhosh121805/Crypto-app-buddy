import axios from 'axios';

const COINGECKO_API = 'https://api.coingecko.com/api/v3';

export const CoinGeckoService = {
  getMarketData: async (vsCurrency = 'usd') => {
    const response = await axios.get(`${COINGECKO_API}/coins/markets`, {
      params: {
        vs_currency: vsCurrency,
        order: 'market_cap_desc',
        per_page: 100,
        page: 1,
        sparkline: false
      }
    });
    return response.data;
  },

  getCoinData: async (coinId: string) => {
    const response = await axios.get(`${COINGECKO_API}/coins/${coinId}`);
    return response.data;
  }
};