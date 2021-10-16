import { useQuery } from 'react-query'; 
import { useAtom } from 'jotai';  

import { api } from './api';
import { useCoinValue } from './useCoinValue';
import { variation, profit, daysGone, avg } from '../utils/investment-grid';
import { formatCurrency, formatDate, formatPercentage } from '../utils/formatters';
import { Investment } from '../types/investment';
 
import { investmentFormAtom, profitAtom } from '../utils/atoms';
import { _symbol, _interval } from '../types/binance';

type Candlestick = [string, string, string, string, string, string, string, string, string, string, string];
type CandlestickResponse = Candlestick[];

const fetcher = async (symbol: _symbol, interval: _interval, limit: number): Promise<CandlestickResponse> => {
  const { data } = await api.get<CandlestickResponse>(`/api/v3/klines?symbol=${symbol}&interval=${interval}&limit=${limit}`);    
  return data; 
}

const transform = (candlestickData: CandlestickResponse, currentPrice: string, dailyInvestment: string): Investment[] => { 
  let compoundProfit = 0;
  return candlestickData
    .sort((a, b) => Number(a[0]) - Number(b[0]))
    .map((candlestick, index) => {
      const [openTime, open, high, low, close, volume, closeTime, quoteAssetVolume, numberOfTrades, takerBuyBaseAssetVolume, takerBuyQuoteAssetVolume] = candlestick;

      const avgPrice = avg(high, low);
      const dailyVariation = variation(currentPrice, open);  
      const profitDay = profit(dailyVariation, dailyInvestment); 
      compoundProfit += profitDay; 

      return {
        id: index,
        openTime: formatDate(openTime),
        open: formatCurrency(open),
        high: formatCurrency(high),
        low: formatCurrency(low),
        close: formatCurrency(close),
        volume: formatCurrency(volume),
        closeTime: formatDate(closeTime),
        quoteAssetVolume: formatCurrency(quoteAssetVolume),
        numberOfTrades: formatCurrency(numberOfTrades),
        takerBuyBaseAssetVolume: formatCurrency(takerBuyBaseAssetVolume),
        takerBuyQuoteAssetVolume: formatCurrency(takerBuyQuoteAssetVolume),
        avgPrice: formatCurrency(avgPrice),
        dailyVariation: formatPercentage(dailyVariation),
        profitDay: formatCurrency(profitDay),
        compoundProfit: formatCurrency(compoundProfit),
      }
    }); 
};
 
export const useCandlestick = (symbol: _symbol = 'BTCEUR', interval: _interval = '1d') => {
  const { data: coinValue } = useCoinValue(symbol); 
  const [investment, ] = useAtom(investmentFormAtom); 
  const [, setProfit] = useAtom(profitAtom); 
  
  const limit = daysGone(investment.startDate);  

  return useQuery(
    ['candlestick', 
    {symbol, interval, limit}], 
    () => fetcher(symbol, interval, limit), 
    { 
      select: (data: CandlestickResponse) => transform(data, coinValue.price, investment.money),
      onSuccess: (data) => { 
        if(data.length === 0) return;
        const compoundProfit = data[data.length-1].compoundProfit.replace(/[^0-9,-]+/g, '').replace(',', '.');   
        setProfit(Number(compoundProfit) - (Number(investment.money) * data.length))
      }
    });
} 
 