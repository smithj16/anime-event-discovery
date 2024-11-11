// store/slices/userSlice.js

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { signin, register } from '@/utils/auth';
import axios from 'axios';

export const loginUser = createAsyncThunk(
  'user/loginUser',
  async ({ email, password }, { rejectWithValue }) => {
    try {
      const response = await signin({ email, password });
      const { user } = response.data;
      // Handle user data if returned
      console.log(user);
      return user;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const registerUser = createAsyncThunk(
  'user/registerUser',
  async (userData, { rejectWithValue }) => {
    try {
      const response = await register(userData);
      const { data } = response;
      // Handle user data if returned
      return data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

// Thunk for logging out
export const logoutUser = createAsyncThunk('user/logoutUser', async () => {
  await axios.post('/api/auth/logout');
});

const userSlice = createSlice({
  name: 'user',
  initialState: {
    userInfo: null, 
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Login cases
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.userInfo = action.payload;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload.message || 'Login failed';
      })
      // Register cases
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.loading = false;
        state.userInfo = action.payload;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload.message || 'Registration failed';
      })
      // Logout case
      .addCase(logoutUser.fulfilled, (state) => {
        state.userInfo = null;
      });
  },
});

export default userSlice.reducer;
