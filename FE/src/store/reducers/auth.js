import { createSlice } from '@reduxjs/toolkit';

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    userData: null,
    loading: false,
    error: null,
  },
  reducers: {
    signUpUser: (state) => {
      state.loading = true;
      state.error = null;
    },
    signUpUserSuccess: (state, action) => {
      state.loading = false;
      state.userData = action.payload;
    },
    signUpUserFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const { signUpUser, signUpUserSuccess, signUpUserFailure } =
  authSlice.actions;
export default authSlice.reducer;
