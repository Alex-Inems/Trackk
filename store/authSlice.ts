// src/store/authSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface User {
  name: string;
  email: string;
  photoUrl: string;
  balance: number;
}

interface AuthState {
  isAuthenticated: boolean; // Track if the user is authenticated
  user: User | null; // Store user details or null if not authenticated
}

const initialState: AuthState = {
  isAuthenticated: false, // Initialize as not authenticated
  user: null, // Initial user state
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login(state) {
      state.isAuthenticated = true; // Set authentication to true
    },
    logout(state) {
      state.isAuthenticated = false; // Clear authentication on logout
      state.user = null; // Clear user on logout
    },
    setUser(state, action: PayloadAction<User>) {
      state.user = action.payload; // Set user details
    },
    clearUser(state) {
      state.user = null; // Optional: clear user details
    },
  },
});

// Export actions for dispatch
export const { login, logout, setUser, clearUser } = authSlice.actions; 
export default authSlice.reducer;
