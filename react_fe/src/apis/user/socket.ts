import {
  jwtHelper,
  STORAGE,
  getLocalStorage,
  setLocalStorage,
  removeLocalStorage,
} from '@utils/helpers';
import { Modal } from 'antd';
import axios, { AxiosResponse } from 'axios';

const API_BASE_URL = process.env.REACT_APP_URL_SOCKET;
const apiSocket = axios.create({
  baseURL: API_BASE_URL,
});

apiSocket.interceptors.request.use(
  (config) => {
    const stringifiedToken = getLocalStorage(STORAGE.USER_TOKEN) || '';
    const bearerToken = jwtHelper.getBearerToken(stringifiedToken);

    if (config.headers) {
      config.headers['Authorization'] = bearerToken;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const refreshAccessToken = async (): Promise<any> => {
  const refresh_token = getLocalStorage(STORAGE.USER_REFRESH);
  const data = {
    refresh_token: refresh_token,
  };
  return await axios.post('/auth/refresh', data);
};

apiSocket.interceptors.response.use(
  (response: AxiosResponse) => {
    return response;
  },
  async (error) => {
    const originalRequest = error.config;
    if (error?.response?.status === 401) {
      originalRequest._retry = true;
      try {
        const token = await refreshAccessToken();
        setLocalStorage(STORAGE.USER_TOKEN, token?.access_token);
        setLocalStorage(STORAGE.USER_REFRESH, token?.refresh_token);
        return apiSocket(originalRequest);
      } catch (error) {
        console.log(error);
        removeLocalStorage(STORAGE.USER_TOKEN);
        removeLocalStorage(STORAGE.USER_REFRESH);
        removeLocalStorage(STORAGE.USER_DATA);
        Modal.error({
          title: 'Your token was expired',
          onOk: () => {
            localStorage.clear();
            window.location.href = '/home';
          },
        });
      }
    }
    // error common
    if (error?.response?.status === 403) {
      Modal.error({
        title: 'This activity not in your permission',
        onOk: () => {
          localStorage.clear();
          window.location.href = '/home';
        },
      });
    }
    return Promise.reject(error);
  },
);

export default apiSocket;
