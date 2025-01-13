import { createAsyncThunk } from '@reduxjs/toolkit';

import apiUser from '@apis/user';
// import { AxiosError, AxiosResponse } from 'axios';
import { BASE_API_URL } from '@apis/endpoint';
import { setLocalStorage, STORAGE } from '@utils/helpers/storage';
import { Modal } from 'antd';

// import { objectToQueryString } from 'utils/request';

export const login = createAsyncThunk(
  'auth/login',
  async (payload: Types.ILoginRequest, { rejectWithValue }) => {
    try {
      const response = await apiUser.post<Types.ILoginResponse>(BASE_API_URL.LOGIN, payload);
      setLocalStorage(STORAGE.USER_TOKEN, response.data.data.access_token);
      setLocalStorage(STORAGE.USER_REFRESH, response.data.data.refresh_token);
      setLocalStorage(STORAGE.USER_DATA, JSON.stringify(response.data.data.user));

      return {
        data: response.data,
      };
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      Modal.error({
        title: err?.response?.data?.message,
        className: 'modal-type-2',
        onOk: () => {
          return;
        },
      });
      return rejectWithValue(err);
    }
  },
);
export const signUp = createAsyncThunk(
  'auth/signup',
  async (payload: Types.ISignUpRequest, { rejectWithValue }) => {
    try {
      const response = await apiUser.post<Types.ISignupResponse>(BASE_API_URL.SIGNUP, payload);
      return {
        data: response.data,
      };
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      Modal.error({
        title: err?.response?.data?.message,
        className: 'modal-type-2',
        onOk: () => {
          return;
        },
      });
      return rejectWithValue(err);
    }
  },
);
