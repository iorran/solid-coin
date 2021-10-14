import { api } from './api';
import { useQuery } from 'react-query'; 
 
type _symbol = 'BTCEUR' | 'BTCBUSD'; 

export type CoinValue = {
  symbol: _symbol,
  price: string
} 

const fetcher = async (symbol: _symbol): Promise<CoinValue> => { 
  //const { data } = await api.get<CoinValue>(`/api/v3/avgPrice?symbol=${symbol}`);    
  const { data } = await api.get<CoinValue>(`/api/v3/avgPrice?symbol=${symbol}`);    
  return data; 
}

const select = (data: CoinValue) => data;
 
const useCoinValue = (symbol: _symbol) => {
  return useQuery(['coin', {symbol}], () => fetcher(symbol), { select });
}

export { useCoinValue }
