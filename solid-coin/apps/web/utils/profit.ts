export const profit = (currentValue: number | string, comparableValue: number | string) =>
    (Number(currentValue) - Number(comparableValue)) / Number(currentValue);  

export const profitPercentual = (profitValue: number | string) => 
    Number(profitValue) * 100

export const profitCurrency = (profitValue: number | string, investment: number | string) => 
    (Number(profitValue) + 1) * Number(investment); 
