import { createSlice } from '@reduxjs/toolkit';

// import { Table } from 'utils/helpers/table';

import { login, signUp } from './auth.action';
const initialState: Types.IAuthState = {
  actionType: '',
  loading: false,
  loginInProgress: false,
  signupProcess: false,
  accessTokenVerify: '',
  isVerified: false,
  email: '',
  role: undefined,
  userName: '',
};

const LoginSlice = createSlice({
  name: 'app/auth',
  initialState,
  reducers: {
    // resetWorkStandardStore: () => initialState,
  },
  extraReducers: (builder) => {
    // auth login
    builder.addCase(login.pending, (state, action) => {
      state.loading = true;
      state.actionType = action.type;
      state.loginInProgress = true;
    });
    builder.addCase(login.fulfilled, (state, action) => {
      state.loading = false;
      state.actionType = action.type;
      state.loginInProgress = false;
    });
    builder.addCase(login.rejected, (state, action) => {
      state.loading = false;
      state.actionType = action.type;
      state.loginInProgress = false;
    });

    // auth signup
    builder.addCase(signUp.pending, (state, action) => {
      state.loading = true;
      state.actionType = action.type;
      state.signupProcess = true;
    });
    builder.addCase(signUp.fulfilled, (state, action) => {
      state.loading = false;
      state.actionType = action.type;
      state.signupProcess = false;
    });
    builder.addCase(signUp.rejected, (state, action) => {
      state.loading = false;
      state.actionType = action.type;
      state.signupProcess = false;
    });
  },
});
// export const { resetWorkStandardStore } = LoginSlice.actions;
export default LoginSlice.reducer;
