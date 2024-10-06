// src/store/userSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface UserState {
  name: string;
  email: string;
  photoUrl: string;
  balance: number; // User's balance
}

const initialState: UserState = {
  name: '',
  email: '',
  photoUrl: '',
  balance: 0,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser(state, action: PayloadAction<UserState>) {
      // Update user details
      state.name = action.payload.name;
      state.email = action.payload.email;
      state.photoUrl = action.payload.photoUrl;
      state.balance = action.payload.balance; // Make sure to update balance too
    },
    clearUser(state) {
      // Clear user details
      state.name = '';
      state.email = '';
      state.photoUrl = '';
      state.balance = 0; // Optional: reset balance
    },
    setBalance(state, action: PayloadAction<number>) {
      state.balance = action.payload; // Update balance
    },
  },
});

// Export actions for dispatch
export const { setUser, clearUser, setBalance } = userSlice.actions; 
export default userSlice.reducer;
