import Image from 'next/image'; 

import { useForm } from "react-hook-form";
import { Box, TextField, Button } from '@mui/material';

import { useAtom } from 'jotai';
import { investmentFormAtom, IInvestmentForm } from '../utils/atoms';

import { BasicDatePicker } from '../components/date-picker'; 
 
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
            '& .MuiTextField-root': { m: 1, width: '25ch' },
          }}
          noValidate
          autoComplete="off"
          display="flex"
          justifyContent="start"
          alignItems="center"
          onSubmit={() => onSubmit({} as IInvestmentForm)}
        >  
            {/* <BasicDatePicker label="Start Date" {...register("startDate", { required: true })}  /> */}
            <input type="date" {...register("startDate", { required: true })}  />
            <TextField 
                {...register("money", { required: true })}  
                label="Investment"
            />   
            <Button variant="contained" onClick={recalculate}>What I have lose?</Button>
        </Box>
    );
}