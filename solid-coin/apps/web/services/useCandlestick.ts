import { useQuery } from 'react-query'; 
import { useAtom } from 'jotai';
import { differenceInDays, parseISO } from 'date-fns';

import { api } from './api';
import { useCoinValue } from './useCoinValue';
import { profit, profitPercentual, profitCurrency } from '../utils/profit';
import { Investment } from '../models/investment';
 
import { investmentFormAtom } from '../utils/atoms';
 
type _symbol = 'BTCEUR' | 'BTCBUSD';
type interval = '1m' | '3m' | '5m' | '15m' | '30m' | '1h' | '2h' | '4h' | '6h' | '8h' | '12h' | '1d' | '3d' | '1w' | '1M';

type Candlestick = [string, string, string, string, string, string, string, string, string, string, string];
type CandlestickResponse = Candlestick[];

const fetcher = async (symbol: _symbol, interval: interval, limit: number): Promise<CandlestickResponse> => {
  const { data } = await api.get<CandlestickResponse>(`/api/v3/klines?symbol=${symbol}&interval=${interval}&limit=${limit}`);    
  return data; 
}

const transform = (candlestickData: CandlestickResponse, currentPrice: string, dailyInvestment: string): Investment[] => { 
  return candlestickData.map((candlestick, index) => {
    const [openTime, open, high, low, close, volume, closeTime, quoteAssetVolume, numberOfTrades, takerBuyBaseAssetVolume, takerBuyQuoteAssetVolume] = candlestick;
  
    const profitValue = profit(currentPrice, close);
    
    return {
      id: index,
      openTime,
      open,
      high,
      low,
      close,
      volume,
      closeTime,
      quoteAssetVolume,
      numberOfTrades,
      takerBuyBaseAssetVolume,
      takerBuyQuoteAssetVolume,
      profit: profitPercentual(profitValue),
      profitCurrency: profitCurrency(profitValue, dailyInvestment)
    }
  }); 
};
 
export const useCandlestick = (symbol: _symbol = 'BTCEUR', interval: interval = '1d') => {
  const { data: coinValue } = useCoinValue(symbol); 
  const [investment, ] = useAtom(investmentFormAtom); 
  
  const limit = differenceInDays(new Date(), parseISO(investment.startDate));  

  return useQuery(['candlestick', {symbol, interval, limit}], () => fetcher(symbol, interval, limit), { select: (data: CandlestickResponse) => transform(data, coinValue.price, investment.money) });
} 
 