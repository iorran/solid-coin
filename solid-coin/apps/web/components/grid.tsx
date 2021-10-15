
import React from 'react';
import { DataGrid, GridColDef } from '@mui/x-data-grid';

import { Investment } from '../models/investment';
 
export enum ColumHeader {  
  close = 'Day', 
  closeTime = 'Value', 
  profit = 'Day Profit'
}  

const columns: GridColDef[] = [
  { field: 'closeTime', headerName: ColumHeader.closeTime, width: 150 },
  { field: 'close', headerName: ColumHeader.close, width: 150 },
  { field: 'profit', headerName: ColumHeader.profit, width: 150 },
  { field: 'profitCurrency', headerName: ColumHeader.profit, width: 150 },
]

type GridProps = { rows: Investment[] }
export function Grid({ rows }: GridProps) {      
  return (
    <div style={{ height: '75vh', width: '100%' }}>
      <DataGrid pagination rows={rows} columns={columns} />
    </div>
  );
} 

