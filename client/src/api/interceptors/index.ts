import { interceptRefreshToken } from './refreshToken.interceptors';

export function axiosInterceptor() {
  interceptRefreshToken();
}
