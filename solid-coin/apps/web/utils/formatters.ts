import { format } from 'date-fns';

export const formatCurrency = (value: string | number) => 
    new Intl.NumberFormat('de-DE', { style: 'currency', currency: 'EUR' }).format(Number(value));

export const formatPercentage = (value: string | number, locale = "de-DE") => Intl.NumberFormat(locale, {
    style: "percent",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
}).format(Number(value)); 

export const formatDate = (date: string) => format(Number(date), 'dd/MM/yyyy'); 