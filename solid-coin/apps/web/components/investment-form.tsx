import Image from 'next/image';
import { useState } from 'react';

import { useForm } from "react-hook-form";
import { Box, TextField, Button } from '@mui/material';

import { BasicDatePicker } from '../components/date-picker'; 

interface IInvestmentForm { 
    money: string; 
    startDate: string;
}
 
export const InvestmentForm = () => {
    const { register, handleSubmit } = useForm<IInvestmentForm>({ mode: 'onChange' });
    const [msg, setMsg] =  useState<string>();

    const onSubmit = (data: IInvestmentForm) => {
        setMsg(`Hold on, still in development, but I will show you how much you lost for invest ${data.money} per day - Since ${data.startDate}`)
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
            {msg}
            <Button variant="contained" onClick={recalculate}>What I've lose?</Button>
        </Box>
    );
}