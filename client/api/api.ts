import axios, { AxiosError } from 'axios';
import getConfig from 'next/config';
import { AuthTokens } from '../interfaces/tokens.interface';
import Router from 'next/router';
import { paths } from '../config';
const { publicRuntimeConfig } = getConfig();

export const API_KEYS = {
  baseURL: publicRuntimeConfig.baseUrl,
};

const api = axios.create({
  baseURL: API_KEYS.baseURL,
  withCredentials: true,
});

api.interceptors.request.use(async (config) => {
  // config.headers = { ...config.headers, Authorization: `Bearer ${Cookies.get(AUTH_COOKIE)}` };
  // config.headers.fingerprint = await fingerprint;
  return config;
});

type Subscriber = (token: string) => any;
let subscribers: Subscriber[] = [];
let isRefreshing = false;

function addSubscriber(subscriber: Subscriber) {
  subscribers.push(subscriber);
}

function resetSubscribers() {
  subscribers = [];
}

api.interceptors.response.use(
  (res) => res,
  async (error: AxiosError) => {
    const originalRequest = error.config;

    if (error.response?.status == 401 && error.config && !(error.config as any)._isRetry) {
      (originalRequest as any)._isRetry = true;
      try {
        const retryOrgReq = new Promise((resolve) => {
          addSubscriber((accessToken: string) => {
            error.config.headers = { ...error.config.headers, Authorization: `Bearer ${accessToken}` };
            // We have to use axios. Otherwise this middleware will be called again resulting in multiple unwanted requests
            resolve(axios(error.config));
          });
        });

        if (isRefreshing) {
          return;
        }

        isRefreshing = true;
        const response = (
          await axios.get<AuthTokens>(`${API_KEYS.baseURL}/auth/refresh`, {
            withCredentials: true,
            // headers: {
            //   fingerprint: await fingerprint,
            // },
          })
        ).data;
        // Cookies.remove(AT_COOKIE_KEY);
        // Cookies.set(AT_COOKIE_KEY, response.access_token);
        subscribers.forEach((cb) => cb(response.access_token));
        resetSubscribers();

        return retryOrgReq;
      } catch (e: any) {
        console.warn(e.message);
        // Cookies.remove(AT_COOKIE_KEY);

        if (!Router.asPath.includes(paths.LOGIN)) {
          Router.push(paths.LOGIN);
        }
      } finally {
        isRefreshing = false;
      }
    }

    return Promise.reject(error);
  },
);

export default api;
