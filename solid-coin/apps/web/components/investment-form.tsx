import { useForm } from "react-hook-form";
import { Box, TextField, Button } from '@mui/material';

interface IInvestmentForm { 
    money: string; 
}
 
export const InvestmentForm = () => {
    const { register, handleSubmit } = useForm<IInvestmentForm>({ mode: 'onChange' });

    const onSubmit = (data: IInvestmentForm) => {
        console.log(data);
    };

    const recalculate = () => {
        handleSubmit(onSubmit)(); 
    }

    return (
        <Box
          component="form"
          sx={{
            '& .MuiTextField-root': { m: 1, width: '25ch' },
          }}
          noValidate
          autoComplete="off"
          display="flex"
          justifyContent="start"
          alignItems="center"
        > 
            <TextField 
                {...register("money", { required: true })}  
                label="Investment"
            />  
            <Button variant="contained" onClick={recalculate}>What I've lose?</Button>
        </Box>
    );
}