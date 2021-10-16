import { useForm } from "react-hook-form";
import { Box, TextField, Button } from '@mui/material';

import { useAtom } from 'jotai';
import { investmentFormAtom, IInvestmentForm } from '../utils/atoms'; 
 
export const InvestmentForm = () => { 
    const [investment, compute] = useAtom(investmentFormAtom);   
    const { register, handleSubmit } = useForm<IInvestmentForm>({ mode: 'onChange', defaultValues: investment });

    const onSubmit = (data: IInvestmentForm) => {  
        compute(data);
    };

    const recalculate = () => {
        handleSubmit(onSubmit)(); 
    }

    return (
        <Box
          component="form"
          sx={{
            '& .MuiTextField-root': { m: 1 },
          }}
          noValidate
          autoComplete="off"
          display="flex"
          justifyContent="start"
          alignItems="center"
          onSubmit={() => onSubmit({} as IInvestmentForm)}
        >   
            <TextField 
                {...register("startDate", { required: true })}  
                label="Since"
                type="date"
                InputLabelProps={{ shrink: true }}
            />    
            <TextField 
                {...register("money", { required: true })}  
                label="Investment"
                InputLabelProps={{ shrink: true }}
            />   
            <Button variant="contained" onClick={recalculate}>Check</Button>
        </Box>
    );
}