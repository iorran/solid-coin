import { api } from './api';
import { useQuery } from 'react-query';
import { format } from 'date-fns';
import { useCoinValue } from './useCoinValue';
import { profit } from '../utils/profit';
 
type _symbol = 'BTCEUR' | 'BTCBUSD';
type interval = '1m' | '3m' | '5m' | '15m' | '30m' | '1h' | '2h' | '4h' | '6h' | '8h' | '12h' | '1d' | '3d' | '1w' | '1M';

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
  profit: string
}

type CandlestickResponse = Array<[string, string, string, string, string, string, string, string, string, string, string]> 

const fetcher = async (symbol: _symbol, interval: interval, limit: number): Promise<CandlestickResponse> => {
  const { data } = await api.get<CandlestickResponse>(`/api/v3/klines?symbol=${symbol}&interval=${interval}&limit=${limit}`);    
  return data; 
}

const transform = (data: CandlestickResponse, currentPrice: number): Candlestick[] => { 
  return data.map((row, index) => {  
    const [openTime, open, high, low, close, volume, closeTime, quoteAssetVolume, numberOfTrades, takerBuyBaseAssetVolume, takerBuyQuoteAssetVolume] = row;   
    return {
      id: index, openTime: format(new Date(openTime), 'dd/MM/yyyy'), open, high, low, close: Number(close).toFixed(2), volume, closeTime: format(new Date(closeTime), 'dd/MM/yyyy'), quoteAssetVolume, numberOfTrades, takerBuyBaseAssetVolume, takerBuyQuoteAssetVolume,
      profit: profit(currentPrice, Number(close)).toFixed(2) + ' %'
    }
  }); 
};
 
const useCandlestick = (symbol: _symbol = 'BTCEUR', interval: interval = '1d', limit: number = 30) => {
  const { data: coinValue } = useCoinValue(symbol); 
  return useQuery(['candlestick', {symbol, interval}], () => fetcher(symbol, interval, limit), { select: (data: CandlestickResponse) => transform(data, coinValue.price) });
}

export { useCandlestick }
