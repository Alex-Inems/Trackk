import { configureStore } from '@reduxjs/toolkit';
import transactionReducer from './transactionSlice';
import thunk from 'redux-thunk'; // Ensure this is imported
import authReducer from './authSlice';
import userReducer from './userSlice';
import categoriesReducer from './categorySlice'; // Import the categoriesReducer
import currencyReducer from './currencySlice';  // Import the currencyReducer

const store = configureStore({
  reducer: {
    transactions: transactionReducer,
    auth: authReducer,
    user: userReducer,
    categories: categoriesReducer,  // Add categories reducer
    currency: currencyReducer,      // Add currency reducer here
  },
  
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
