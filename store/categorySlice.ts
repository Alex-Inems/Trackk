import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface CategoryState {
  categories: string[];
}

const initialState: CategoryState = {
  categories: ['Groceries', 'Rent', 'Utilities', 'Entertainment'],
};

const categorySlice = createSlice({
  name: 'categories',
  initialState,
  reducers: {
    addCategory: (state, action: PayloadAction<string>) => {
      if (!state.categories.includes(action.payload)) {
        state.categories.push(action.payload);
      }
    },
    removeCategory: (state, action: PayloadAction<string>) => {
      state.categories = state.categories.filter(category => category !== action.payload);
    },
    setCategories: (state, action: PayloadAction<string[]>) => {
      state.categories = action.payload;
    },
  },
});

export const { addCategory, removeCategory, setCategories } = categorySlice.actions;
export default categorySlice.reducer;
