import { paths } from './../../config/routes';
import { setAuthenticated } from './../../store/features/global/global.actions';
import { AxiosInstance } from 'axios';
import { ReduxStore } from '../../store/store';
import { routes } from '../../config';
import { push } from 'connected-next-router';

export function interceptRefreshToken(axios: AxiosInstance, store: ReduxStore) {
  axios.interceptors.response.use(
    (res) => {
      return res;
    },
    async (err) => {
      const originalConfig = err.config;
      if (originalConfig.url !== '/auth/signin' && err.response) {
        // Access Token was expired
        if (err.response.status === 401 && !originalConfig._retry) {
          originalConfig._retry = true;
          try {
            const res = await axios.post('/auth/refresh', {});

            // Redirect the user to signin as the refresh token has expired or is invalidated
            if (res.status === 401) {
              store.dispatch(setAuthenticated(false));
              const pathname = store.getState().router.location.pathname;

              if (pathname !== undefined && routes[pathname]?.public) {
                store.dispatch(push(paths.LOGIN));
              }

              return Promise.reject(err);
            }

            return axios(originalConfig);
          } catch (_error) {
            return Promise.reject(_error);
          }
        }
      }
      return Promise.reject(err);
    },
  );
}
