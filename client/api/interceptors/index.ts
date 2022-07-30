import { AxiosInstance } from 'axios';
import { interceptRefreshToken } from './refreshToken.interceptors';

export function axiosInterceptor(axios: AxiosInstance) {
  interceptRefreshToken(axios);
}
