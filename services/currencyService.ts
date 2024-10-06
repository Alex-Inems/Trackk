// services/currencyService.ts
import { setExchangeRate } from '@/store/currencySlice';
import { AppDispatch } from '@/store/store'; // Your store

// Function to fetch conversion rates and dispatch the exchange rate to Redux
export const fetchConversionRates = (baseCurrency: string, targetCurrency: string) => async (dispatch: AppDispatch) => {
  try {
    const response = await fetch(`https://api.exchangerate-api.com/v4/latest/${baseCurrency}`);
    if (!response.ok) {
      throw new Error('Failed to fetch exchange rate');
    }
    
    const data = await response.json();
    const rate = data.rates[targetCurrency];

    if (rate) {
      dispatch(setExchangeRate(rate)); // Dispatch the fetched exchange rate
    } else {
      console.error(`No rate found for ${targetCurrency}`);
    }
  } catch (error) {
    console.error('Failed to fetch exchange rate', error);
  }
};
