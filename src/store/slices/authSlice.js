import { createSlice } from '@reduxjs/toolkit';

// Initialize state from localStorage
const getInitialAuthState = () => {
  try {
    const token = localStorage.getItem('token');
    console.log('getInitialAuthState - token:', token ? 'exists' : 'not found');
    
    if (token) {
      // Basic token validation - check if it's not expired
      const payload = JSON.parse(atob(token.split('.')[1]));
      const isExpired = payload.exp * 1000 < Date.now();
      
      console.log('getInitialAuthState - payload:', payload);
      console.log('getInitialAuthState - isExpired:', isExpired);
      
      if (!isExpired) {
        const initialState = {
          user: payload,
          userRole: payload.role,
          token: token,
          isAuthenticated: true,
          isLoading: false,
          error: null,
        };
        console.log('getInitialAuthState - returning authenticated state:', initialState);
        return initialState;
      } else {
        console.log('getInitialAuthState - token expired, removing');
        localStorage.removeItem('token');
      }
    }
  } catch (error) {
    console.error('Error parsing token:', error);
    localStorage.removeItem('token');
  }
  
  const unauthenticatedState = {
    user: null,
    userRole: null,
    token: null,
    isAuthenticated: false,
    isLoading: false,
    error: null,
  };
  console.log('getInitialAuthState - returning unauthenticated state:', unauthenticatedState);
  return unauthenticatedState;
};

const initialState = getInitialAuthState();

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    loginStart: (state) => {
      state.isLoading = true;
      state.error = null;
    },
    loginSuccess: (state, action) => {
      state.isLoading = false;
      state.isAuthenticated = true;
      state.user = action.payload;
      state.userRole = action.payload.role;
      state.token = localStorage.getItem('token');
      state.error = null;
    },
    loginFailure: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
    logout: (state) => {
      state.user = null;
      state.userRole = null;
      state.token = null;
      state.isAuthenticated = false;
      state.error = null;
      localStorage.removeItem('token');
    },
    clearTokens: (state) => {
      console.log('Clearing all tokens due to signature mismatch');
      state.user = null;
      state.userRole = null;
      state.token = null;
      state.isAuthenticated = false;
      state.error = null;
      localStorage.removeItem('token');
    },
    clearError: (state) => {
      state.error = null;
    },
  },
});

export const { loginStart, loginSuccess, loginFailure, logout, clearError, clearTokens } = authSlice.actions;
export default authSlice.reducer;
