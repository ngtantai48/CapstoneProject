import { createAsyncThunk } from '@reduxjs/toolkit';

import apiPredict from '@apis/user/predict';
// import { AxiosError, AxiosResponse } from 'axios';
import { PREDICT_API_URL } from '@apis/endpoint';
import { Modal } from 'antd';

export const getPredictJobOpportunity = createAsyncThunk(
  'predict/getPredictJobOpportunity',
  async (payload: Types.IJobPredictRequest, { rejectWithValue }) => {
    try {
      const response = await apiPredict.post<Types.IJobOpportunityResponse>(
        PREDICT_API_URL.JOB_OPPORTUNITY,
        payload,
      );

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

export const getHistoricalJobOpportunity = createAsyncThunk(
  'predict/getHistoricalJobOpportunity',
  async (_, { rejectWithValue }) => {
    try {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const response = await apiPredict.get<any>(PREDICT_API_URL.JOB_HISTORICAL);

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
