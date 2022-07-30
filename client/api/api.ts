import _axios from 'axios';
import { axiosInterceptor } from './interceptors';
import getConfig from 'next/config';
const { publicRuntimeConfig } = getConfig();

export const API_KEYS = {
  baseURL: publicRuntimeConfig.baseUrl,
};

export const api = (function () {
  const instance = _axios.create({
    baseURL: API_KEYS.baseURL,
  });
  axiosInterceptor(instance);
  return instance;
})();
