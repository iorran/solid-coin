import { Container, Box, Typography } from '@mui/material';
 
import { InvestmentForm } from '../components/investment-form';
import { CoinCurrentPrice } from '../components/coin-current-price';
import { Grid } from '../components/grid';

export function Index() {   
  
  return (
    <Container maxWidth="xl" >
      <Box sx={{ my: 4 }}>
        <Box display="flex" flexDirection="row" alignItems="center" justifyContent="space-between">
          <InvestmentForm />  
          <CoinCurrentPrice />
        </Box>

        <Grid />
        
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
