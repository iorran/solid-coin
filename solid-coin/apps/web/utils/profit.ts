export const profit = (currentValue: number, comparableValue: number) => { 
    return ((currentValue/comparableValue) - 1) * 100;
}