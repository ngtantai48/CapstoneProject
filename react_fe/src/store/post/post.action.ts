import { createAsyncThunk } from '@reduxjs/toolkit';

import apiUser from '@apis/user';
// import { AxiosError, AxiosResponse } from 'axios';
import { POST_API_URL } from '@apis/endpoint';
import { Modal } from 'antd';
import { objectToQueryString } from '@utils/helpers/request';

export const getAllPost = createAsyncThunk(
  'post/getall',
  async (searchQuery: Types.IGetAllPostRequest, { rejectWithValue }) => {
    try {
      const response = await apiUser.get<Types.IAllPostResponse>(
        POST_API_URL.POST + '?' + objectToQueryString<Types.IGetAllPostRequest>(searchQuery),
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

export const getAllCrawlPost = createAsyncThunk(
  'post/getAllCrawlPost',
  async (_, { rejectWithValue }) => {
    try {
      const response = await apiUser.get<Types.IAllPostResponse>(POST_API_URL.POST_ADMIN);
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

export const getPostById = createAsyncThunk(
  'post/getPostById',
  async (payload: Types.IGetPostByIDRequest, { rejectWithValue }) => {
    try {
      const response = await apiUser.get<Types.IGetPostByIdResponse>(
        POST_API_URL.POST + payload.id,
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

export const getAllPostSearch = createAsyncThunk(
  'post/getallSearch',
  async (searchQuery: Types.IGetAllPostRequest, { rejectWithValue }) => {
    try {
      const response = await apiUser.get<Types.IAllPostResponse>(
        POST_API_URL.POST + '?' + objectToQueryString<Types.IGetAllPostRequest>(searchQuery),
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

export const getAllPostSearchMore = createAsyncThunk(
  'post/getallSearchMore',
  async (searchQuery: Types.IGetAllPostRequest, { rejectWithValue }) => {
    try {
      const response = await apiUser.get<Types.IAllPostResponse>(
        POST_API_URL.POST + '?' + objectToQueryString<Types.IGetAllPostRequest>(searchQuery),
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

export const updatePostStatus = createAsyncThunk(
  'post/updatePostStatus',
  async (payload: Types.IUpdateStatus, { rejectWithValue }) => {
    try {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const response = await apiUser.put<any>(POST_API_URL.STATUS + payload.id, {
        status: payload.status,
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
