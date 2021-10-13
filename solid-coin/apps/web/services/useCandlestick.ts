import { api } from './api';
import { useQuery } from 'react-query';
import { format } from 'date-fns';
 
type Symbol = 'BTCEUR' | 'BTCBUSD';
type Interval = '1m' | '3m' | '5m' | '15m' | '30m' | '1h' | '2h' | '4h' | '6h' | '8h' | '12h' | '1d' | '3d' | '1w' | '1M';

export type Candlestick = { 
  id: number,
  openTime: string,
  open: string,
  high: string,
  low: string,
  close: string,
  volume: string,
  closeTime: string,
  quoteAssetVolume: string,
  numberOfTrades: string,
  takerBuyBaseAssetVolume: string,
  takerBuyQuoteAssetVolume: string,
}

type CandlestickResponse = Array<[string, string, string, string, string, string, string, string, string, string, string]> 

const fetcher = async (symbol: Symbol, interval: Interval, limit: number): Promise<CandlestickResponse> => {
  const { data } = await api.get<CandlestickResponse>(`/api/v3/klines?symbol=${symbol}&interval=${interval}&limit=${limit}`);    
  return data; 
}

const select = (data: CandlestickResponse): Candlestick[] => { 
  return data.map((row, index) => {  
    const [openTime, open, high, low, close, volume, closeTime, quoteAssetVolume, numberOfTrades, takerBuyBaseAssetVolume, takerBuyQuoteAssetVolume] = row;  
    return {
      id: index, openTime: format(new Date(openTime), 'dd/MM/yyyy'), open, high, low, close, volume, closeTime: format(new Date(closeTime), 'dd/MM/yyyy'), quoteAssetVolume, numberOfTrades, takerBuyBaseAssetVolume, takerBuyQuoteAssetVolume
    }
  }); 
};
 
const useCandlestick = (symbol: Symbol = 'BTCEUR', interval: Interval = '1d', limit: number = 30) => {
  return useQuery(['candlestick', {symbol, interval}], () => fetcher(symbol, interval, limit), { select });
}

export { useCandlestick }
