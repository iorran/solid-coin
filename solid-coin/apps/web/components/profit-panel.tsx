
import { Box, Typography } from '@mui/material';

import { useAtom } from 'jotai';
import { profitAtom } from '../utils/atoms'; 
import { formatCurrency  } from '../utils/formatters';
 
export const ProfitPanel = () => { 
    const [profit, ] = useAtom(profitAtom);     

    if(!profit) return null;

    return (
        <Box>   
            <Typography variant="h6">You just lose: {formatCurrency(profit)}</Typography>
            <Typography variant="caption">Perhaps you won, who knows ?</Typography>
        </Box>
    );
}