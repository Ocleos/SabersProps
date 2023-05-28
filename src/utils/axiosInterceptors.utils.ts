import axios, { AxiosRequestHeaders } from 'axios';
import Constants from 'expo-constants';

export const initAxios = () => {
  axios.interceptors.request.use(
    async (config) => {
      const apiUrl = Constants?.expoConfig?.extra?.apiUrl;
      const apiKey = Constants?.expoConfig?.extra?.apiKey;

      config.baseURL = apiUrl;

      const headers: AxiosRequestHeaders = config.headers;

      // Set default headers
      headers.accept = 'application/json';
      headers['Content-Type'] = 'application/json';
      headers['cache-control'] = 'no-cache';
      headers['apikey'] = apiKey;
      headers['Authorization'] = `Bearer ${apiKey}`;

      config.headers = headers;

      return config;
    },
    (error) =>
      // Do something with request error
      Promise.reject(error),
  );
};
