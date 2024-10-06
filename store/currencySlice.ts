import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface CurrencyState {
  selectedCurrency: string; // Define the selected currency here
  exchangeRate: number; // Add exchange rate here
}

const initialState: CurrencyState = {
  selectedCurrency: 'NGN', // Default currency
  exchangeRate: 1, // Default exchange rate
};

const currencySlice = createSlice({
  name: 'currency',
  initialState,
  reducers: {
    setCurrency: (state, action: PayloadAction<string>) => {
      state.selectedCurrency = action.payload; // Update selectedCurrency when a new one is selected
    },
    setExchangeRate: (state, action: PayloadAction<number>) => {
      state.exchangeRate = action.payload; // Update exchange rate
    },
  },
});

export const { setCurrency, setExchangeRate } = currencySlice.actions;
export default currencySlice.reducer;
