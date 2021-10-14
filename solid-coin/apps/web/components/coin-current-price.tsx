import { useForm } from "react-hook-form";
import Image from 'next/image';
import { useCoinValue } from '../services/useCoinValue';

import { Box, Typography } from '@mui/material'; 

export const CoinCurrentPrice = () => {
    const { data: btcValue } = useCoinValue('BTCEUR'); 
     return (
        <Box display="flex" flexDirection="row" alignItems="center">
            <Image src="/bitcoin.svg" 
                width={24}
                height={24} 
                alt=""
            /> 
            <Typography sx={{ paddingLeft: 1 }} variant="subtitle1">{new Intl.NumberFormat('de-DE', { style: 'currency', currency: 'EUR' }).format(Number(btcValue.price))}</Typography> 
        </Box>
     );
}