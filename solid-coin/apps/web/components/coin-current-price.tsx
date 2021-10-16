import Image from 'next/image';
import { useCoinValue } from '../services/useCoinValue';
import { formatCurrency } from '../utils/formatters';

import { Box, Typography } from '@mui/material'; 

export const CoinCurrentPrice = () => {
    const { data } = useCoinValue('BTCEUR'); 

     return (
        <Box display="flex" flexDirection="row" alignItems="center">
            <Image src="/bitcoin.svg" 
                width={24}
                height={24} 
                alt=""
            /> 
            <Typography sx={{ paddingLeft: 1 }} variant="subtitle1">{formatCurrency(data?.price)}</Typography> 
        </Box>
     );
}