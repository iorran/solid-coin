import { differenceInDays, parseISO } from 'date-fns';

export const variation = (currentValue: number | string, comparableValue: number | string) =>
    (Number(currentValue) - Number(comparableValue)) / Number(currentValue);   

export const profit = (profitValue: number | string, investment: number | string) => 
    (Number(profitValue) + 1) * Number(investment); 

export const daysGone = (startDate: string) => differenceInDays(new Date(), parseISO(startDate)); 

export const avg = (high: number | string, low: number | string) => (Number(high) + Number(low)) / 2;