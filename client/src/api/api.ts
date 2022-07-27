import axios from 'axios';
import { axiosInterceptor } from './interceptors';

export const API = {
  baseURL: import.meta.env.VITE_BASE_URL,
};

export function axiosInit() {
  axios.defaults.baseURL = API.baseURL;
  axiosInterceptor();
}
