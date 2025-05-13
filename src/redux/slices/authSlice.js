// src/redux/slices/authSlice.js
import { createSlice } from "@reduxjs/toolkit";

// Initialize auth state from localStorage if available
const getInitialState = () => {
  const user = localStorage.getItem("user")
    ? JSON.parse(localStorage.getItem("user"))
    : null;
  return {
    isAuthenticated: !!user,
    user,
    error: null,
    loading: false,
  };
};

const authSlice = createSlice({
  name: "auth",
  initialState: getInitialState(),
  reducers: {
    authRequest: (state) => {
      state.loading = true;
      state.error = null;
    },
    loginSuccess: (state, action) => {
      state.isAuthenticated = true;
      state.user = action.payload;
      state.loading = false;
      state.error = null;
    },
    authFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    logout: (state) => {
      state.isAuthenticated = false;
      state.user = null;
      // Clear localStorage on logout
      localStorage.removeItem("access_token");
      localStorage.removeItem("refresh_token");
      localStorage.removeItem("user");
    },
  },
});

export const { authRequest, loginSuccess, authFailure, logout } =
  authSlice.actions;
export default authSlice.reducer;
