import { Container, Box, Typography, CircularProgress } from '@mui/material';

import BitcoinSvg from '../public/bitcoin.svg';

import { useCandlestick } from '../services/useCandlestick';
import { InvestmentForm } from '../components/investment-form';
import { Grid } from '../components/grid';
import { useCoinValue } from '../services/useCoinValue';

export function Index() {   

  const { data } = useCandlestick(); 
  const { data: btcValue } = useCoinValue('BTCEUR'); 

  if(!data) {
    return (
      <Container maxWidth="xl">
        <Box sx={{ my: 4 }}><CircularProgress color="secondary" /></Box>
      </Container>
    );
  } 
  
  return (
    <Container maxWidth="xl" >
      <Box sx={{ my: 4 }}>
        
        <InvestmentForm />
        {JSON.stringify(btcValue)} 

        <Grid rows={data} />
        
        <Typography variant="body2" gutterBottom textAlign="justify" m={2}>
          Investing in cryptocurrency involves a lot of thinking. The idea is that stressful decisions are taken out of the hands of the investor as investing in crypto involves a lot of thinking. 
        </Typography>
        <Typography variant="body2" gutterBottom textAlign="justify" m={2}>
          With recurring buys, you can put the stressful decisions into the hands of a computer that knows the market. 
        </Typography>
        <Typography variant="body2" gutterBottom textAlign="justify" m={2}>
          It will likely make your investment more profitable, too. With DCA, the idea is that the overall volatility of the target asset is reduced. As the price of crypto varies each time a periodic investment is made, it’s not as likely to be as volatile. But a badly timed, a big investment is more likely to get you into trouble. 
        </Typography>
      </Box>
    </Container>
  );
}

export default Index;
