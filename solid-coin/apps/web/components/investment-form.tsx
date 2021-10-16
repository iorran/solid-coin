import { useForm } from "react-hook-form";
import { Box, TextField, Button } from '@mui/material';
import {isBefore, parseISO} from 'date-fns';

import { useAtom } from 'jotai';
import { investmentFormAtom, IInvestmentForm } from '../utils/atoms'; 
 
export const InvestmentForm = () => { 
    const [investment, compute] = useAtom(investmentFormAtom);   
    const { register, handleSubmit, formState:{ errors } } = useForm<IInvestmentForm>({ mode: 'onChange', defaultValues: investment });

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
                error={!!errors?.startDate?.message} 
                helperText={errors?.startDate?.message}
                {...register("startDate", { 
                    required: true,
                    validate: {
                        isBefore: v => { 
                            return isBefore(new Date(parseISO(v)), new Date()) || 'Date must be before today' 
                        }
                    }
                 })}  
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