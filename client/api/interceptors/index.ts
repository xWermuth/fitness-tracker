import { AxiosInstance } from 'axios';
import { ReduxStore } from '../../store/store';
import { interceptRefreshToken } from './refreshToken.interceptors';

export function axiosInterceptor(axios: AxiosInstance, store: ReduxStore) {
  interceptRefreshToken(axios, store);
}
