import { paths } from './../../config/routes';
import axios, { AxiosError, AxiosInstance } from 'axios';
import { ReduxStore } from '../../store/store';
import Router from 'next/router';

export function interceptRefreshToken(axios: AxiosInstance, store: ReduxStore) {
  axios.interceptors.response.use(
    (res) => {
      console.log('res: ', res?.headers);
      return res;
    },
    async (error) => {
      // check conditions to refresh token
      if (
        error.response?.status === 401 &&
        !error.response?.config?.url?.includes('auth/refresh') &&
        !error.response?.config?.url?.includes('signin')
      ) {
        return refreshToken(error, store, axios);
      }
      return Promise.reject(error);

      // if (originalConfig.url !== '/auth/signin' && err.response && !err.response?.config?.url?.includes('auth/refresh')) {
      //   // Access Token was expired
      //   if (err.response.status === 401 && !originalConfig._retry) {
      //     originalConfig._retry = true;
      //     try {
      //       const res = await axios.post('/auth/refresh');

      //       // Redirect the user to signin as the refresh token has expired or is invalidated
      //       if (res.status === 401) {
      //         store.dispatch(setAuthenticated(false));
      //         const pathname = store.getState().router.location.pathname;

      //         if (pathname !== undefined && routes[pathname]?.public) {
      //           store.dispatch(push(paths.LOGIN));
      //         }

      //         return Promise.reject(err);
      //       }

      //       return axios(originalConfig);
      //     } catch (_error) {
      //       return Promise.reject(_error);
      //     }
      //   }
      // }
      // return Promise.reject(err);
    },
  );
}

let fetchingToken = false;
let subscribers: (() => any)[] = [];

const onAccessTokenFetched = () => {
  subscribers.forEach((callback) => callback());
  subscribers = [];
};

const addSubscriber = (callback: () => any) => {
  subscribers.push(callback);
};

async function refreshToken(error: AxiosError, store: ReduxStore, api: AxiosInstance) {
  try {
    const { response } = error;

    // create new Promise to retry original request
    const retryOriginalRequest = new Promise((resolve) => {
      addSubscriber(() => {
        resolve(axios(response!.config));
      });
    });

    if (!fetchingToken) {
      fetchingToken = true;

      // refresh token
      const { data } = await api.post<boolean>('/auth/refresh');
      console.log('RES: from auth: ', data);
      // check if this is server or not. We don't wanna save response token on server.

      // when new token arrives, retry old requests
      onAccessTokenFetched();
    }
    return retryOriginalRequest;
  } catch (err) {
    if (!Router.asPath.includes('/login')) {
      Router.push(paths.LOGIN);
    }
  } finally {
    fetchingToken = false;
  }
}
