import { createAsyncThunk } from '@reduxjs/toolkit';

import apiSocket from '@apis/user/socket';
// import { AxiosError, AxiosResponse } from 'axios';
import { CRAWL_API_URL } from '@apis/endpoint';
import { Modal } from 'antd';

export const crawlVieclam24h = createAsyncThunk(
  'crawl/vieclam24h',
  async (_, { rejectWithValue }) => {
    try {
      const response = await apiSocket.post<Types.IAllPostResponse>(CRAWL_API_URL.ON_CRAWL_DATA, {
        type: 'vieclam24h',
      });
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
export const crawlFacebook = createAsyncThunk(
  'crawl/crawlFacebook',
  async (_, { rejectWithValue }) => {
    try {
      const response = await apiSocket.post<Types.IAllPostResponse>(CRAWL_API_URL.ON_CRAWL_DATA, {
        type: 'facebook',
      });
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
