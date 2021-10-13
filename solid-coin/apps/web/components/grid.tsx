
import React from 'react';
import { DataGrid, GridColDef } from '@mui/x-data-grid';

import { Candlestick } from '../services/useCandlestick'; 
 
export enum CandlestickEnum { 
  id = 'id',
  openTime = 'Open time',
  open = 'Open',
  high = 'High',
  low = 'Low',
  close = 'Close',
  volume = 'Volume',
  closeTime = 'Close time',
  quoteAssetVolume = 'Quote asset volume',
  numberOfTrades = 'Number of trades',
  takerBuyBaseAssetVolume = 'Taker buy base asset volume',
  takerBuyQuoteAssetVolume = 'Taker buy quote asset volume'
}  

const columns: GridColDef[] = [
  { field: 'closeTime', headerName: CandlestickEnum.closeTime, width: 150 },
  { field: 'close', headerName: CandlestickEnum.close, width: 150 }
]

type GridProps = { rows: Candlestick[] }
export function Grid({ rows }: GridProps) {     
  return (
    <div style={{ height: '75vh', width: '100%' }}>
      <DataGrid pagination rows={rows} columns={columns} />
    </div>
  );
} 

