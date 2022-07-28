import axios from 'axios';

export function interceptRefreshToken() {
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
