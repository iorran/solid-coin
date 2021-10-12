
import React from 'react';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { format } from 'date-fns';

import { CandlestickEnum, CandlestickType } from '../services/useCandlestick'; 
 
export const LABELS = [
  'Open time',
  'Open',
  'High',
  'Low',
  'Close',
  'Volume',
  'Close time',
  'Quote asset volume',
  'Number of trades',
  'Taker buy base asset volume',
  'Taker buy quote asset volume'
];

const columns: GridColDef[] = [
  { field: CandlestickEnum.OPEN_TIME.toString(), headerName: LABELS[CandlestickEnum.OPEN_TIME], width: 150 },
  { field: CandlestickEnum.OPEN.toString(), headerName: LABELS[CandlestickEnum.OPEN], width: 150 },
  { field: CandlestickEnum.CLOSE_TIME.toString(), headerName: LABELS[CandlestickEnum.CLOSE_TIME], width: 150 },
  { field: CandlestickEnum.CLOSE.toString(), headerName: LABELS[CandlestickEnum.CLOSE], width: 150 }
]; 

type GridProps = {
  rows: CandlestickType[]
}
export function Grid({ rows }: GridProps) {  

  const rowsMapped = React.useMemo(() => {
    return rows.map((row, index) => { 
      return {
        id: index, 
        [CandlestickEnum.OPEN_TIME]: format(new Date(row[CandlestickEnum.OPEN_TIME]), 'dd/MM/yyyy'), 
        [CandlestickEnum.OPEN]: row[CandlestickEnum.OPEN], 
        [CandlestickEnum.CLOSE_TIME]: format(new Date(row[CandlestickEnum.CLOSE_TIME]), 'dd/MM/yyyy'), 
        [CandlestickEnum.CLOSE]: row[CandlestickEnum.CLOSE], 
      }
    }); 
  }, [rows]);

  return (
    <div style={{ height: '75vh', width: '100%' }}>
      <DataGrid rows={rowsMapped} columns={columns} />
    </div>
  );
}



