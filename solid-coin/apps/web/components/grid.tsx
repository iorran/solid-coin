
import React from 'react';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { Container, Box, CircularProgress } from '@mui/material';

import { useCandlestick } from '../services/useCandlestick'; 
 
export enum ColumHeader {  
  openTime = 'Day', 
  open = 'Value', 
  dailyVariation = 'Daily Variation',
  profitDay = 'Day Profit',
  compoundProfit = 'Compound Profit'
}  

const columns: GridColDef[] = [
  { field: 'openTime', headerName: ColumHeader.openTime, width: 120 },
  { field: 'open', headerName: ColumHeader.open, width: 100 },
  { field: 'dailyVariation', headerName: ColumHeader.dailyVariation, width: 120 },
  { field: 'profitDay', headerName: ColumHeader.profitDay, width: 100 },
  { field: 'compoundProfit', headerName: ColumHeader.compoundProfit, width: 150 },
]
 
export function Grid() {      

  const { data } = useCandlestick();  

  if(!data) {
    return (
      <Container maxWidth="xl">
        <Box sx={{ my: 4 }}><CircularProgress color="secondary" /></Box>
      </Container>
    );
  } 

  return (
    <div style={{ height: '75vh', width: '100%' }}>
      <DataGrid pagination rows={data} columns={columns} />
    </div>
  );
} 

