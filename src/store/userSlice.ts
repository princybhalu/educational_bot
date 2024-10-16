import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// TODO: Define the types for your user object
interface User {
  id: string;
  name: string;
  email: string;
  hasCompletedProfiling: boolean;
  // Add more fields if needed
}

// Define the types for your auth state
interface AuthState {
  isLoggedIn: boolean;
  user: User | null; // user can be null or a User object
  error: string | null; // error can be null or a string
}

// Define the initial state with the correct types
const initialState: AuthState = {
  isLoggedIn: false,
  user: null,
  error: null,
};

// Create the auth slice
const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    // Action to handle login success
    loginSuccess: (state, action: PayloadAction<User>) => {
      state.isLoggedIn = true;
      state.user = action.payload; // Payload will be the User object
      state.error = null; // Clear any existing errors
    },

    // Action to handle logout
    logout: (state) => {
      state.isLoggedIn = false;
      state.user = null; // Clear user data, correctly setting to null
      state.error = null; // Clear any errors
    },

    // Action to handle login failure
    loginFailure: (state, action: PayloadAction<string>) => {
      state.isLoggedIn = false;
      state.error = action.payload; // Set error message from payload
    },
  },
});

// Export the actions to use in components
export const { loginSuccess, logout, loginFailure } = authSlice.actions;

// Export the reducer to configure the store
export default authSlice.reducer;

// use logout this way
// Dispatch the logout action
// dispatch(logout())