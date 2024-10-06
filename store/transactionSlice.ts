import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Transaction {
  id: number;
  description: string;
  amount: number;
  date: string;
  category?: string; // Adding a category field
}

interface TransactionState {
  transactions: Transaction[];
}

// Function to load transactions from local storage
const loadTransactions = (): Transaction[] => {
  if (typeof window !== 'undefined') {
    const storedTransactions = localStorage.getItem('transactions');
    return storedTransactions ? JSON.parse(storedTransactions) : [];
  }
  return []; // Default to empty array during SSR
};

// Initial state with transactions loaded from local storage
const initialState: TransactionState = {
  transactions: loadTransactions(),
};

const transactionSlice = createSlice({
  name: 'transactions',
  initialState,
  reducers: {
    addTransaction: (state, action: PayloadAction<Transaction>) => {
      state.transactions.push(action.payload);
      // Save updated transactions to local storage
      if (typeof window !== 'undefined') {
        localStorage.setItem('transactions', JSON.stringify(state.transactions));
      }
    },
    updateTransaction: (state, action: PayloadAction<Transaction>) => {
      const index = state.transactions.findIndex((t) => t.id === action.payload.id);
      if (index !== -1) {
        state.transactions[index] = action.payload;
        if (typeof window !== 'undefined') {
          localStorage.setItem('transactions', JSON.stringify(state.transactions));
        }
      }
    },
    deleteTransaction: (state, action: PayloadAction<number>) => {
      state.transactions = state.transactions.filter(transaction => transaction.id !== action.payload);
      if (typeof window !== 'undefined') {
        localStorage.setItem('transactions', JSON.stringify(state.transactions));
      }
    },
    loadTransactionsFromLocalStorage: (state) => {
      state.transactions = loadTransactions();
    }
  },
});

export const { addTransaction, updateTransaction, deleteTransaction, loadTransactionsFromLocalStorage } = transactionSlice.actions;
export default transactionSlice.reducer;
