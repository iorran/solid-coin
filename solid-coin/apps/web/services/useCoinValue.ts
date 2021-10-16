import { api } from './api';
import { useQuery } from 'react-query'; 
import { _symbol } from '../types/binance';

export type CoinValue = {
  symbol: _symbol,
  price: string
} 

const fetcher = async (symbol: _symbol): Promise<CoinValue> => {  
  const { data } = await api.get<CoinValue>(`/api/v3/ticker/price?symbol=${symbol}`);    
  return data; 
}

const select = (data: CoinValue) => data;
 
const useCoinValue = (symbol: _symbol) => {
  return useQuery(['coin-price', {symbol}], () => fetcher(symbol), { select });
}

export { useCoinValue }
