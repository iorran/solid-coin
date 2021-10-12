import { api } from './api';
import { useQuery } from 'react-query';
 
export enum CandlestickEnum { 
  'OPEN_TIME',
  'OPEN',
  'HIGH',
  'LOW',
  'CLOSE',
  'VOLUME',
  'CLOSE_TIME',
  'QUOTE_ASSET_VOLUME',
  'NUMBER_OF_TRADES',
  'TAKER_BASE',
  'TAKER_QUOTE'
}
export type CandlestickType = keyof typeof CandlestickEnum; 
const fetcher = async (symbol: Symbol, interval: Interval, limit: number): Promise<CandlestickType[]> => {
  const { data } = await api.get<CandlestickType[]>(`/api/v3/klines?symbol=${symbol}&interval=${interval}&limit=${limit}`); 
  return data;
}

type Symbol = 'BTCEUR' | 'BTCBUSD';
type Interval = '1m' | '3m' | '5m' | '15m' | '30m' | '1h' | '2h' | '4h' | '6h' | '8h' | '12h' | '1d' | '3d' | '1w' | '1M';

const useCandlestick = (symbol: Symbol = 'BTCEUR', interval: Interval = '1d', limit: number = 30) => {
  return useQuery(['candlestick', {symbol, interval}], () => fetcher(symbol, interval, limit));
}

export { useCandlestick }
