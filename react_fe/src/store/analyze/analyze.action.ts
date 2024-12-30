import { createAsyncThunk } from '@reduxjs/toolkit';

import apiUser from '@apis/user';
// import { AxiosError, AxiosResponse } from 'axios';
import { ANALYZE_API_URL } from '@apis/endpoint';
import { Modal } from 'antd';

export const getUserAnalyze = createAsyncThunk(
  'auth/getUserAnalyze',
  async (_, { rejectWithValue }) => {
    try {
      const response = await apiUser.get<Array<Types.IAnalyzeData>>(ANALYZE_API_URL.USER);

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

export const getCrawlAnalyze = createAsyncThunk(
  'auth/getCrawlAnalyze',
  async (_, { rejectWithValue }) => {
    try {
      const response = await apiUser.get<Array<Types.IAnalyzeData>>(ANALYZE_API_URL.CRAWL);

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
