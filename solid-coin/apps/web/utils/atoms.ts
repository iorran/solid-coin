import { atom } from 'jotai';
import { subDays, format } from 'date-fns';

export interface IInvestmentForm { 
    money: string; 
    startDate: string;
}

export const investmentFormAtom = atom<IInvestmentForm>({ money: '100', startDate: format(subDays(new Date(), 30), 'yyyy-MM-dd') } as IInvestmentForm); 