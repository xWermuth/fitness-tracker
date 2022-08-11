export const paths = {
  HOME: '/',
  LOGIN: '/auth/Login',
  SIGNUP: '/auth/Signup',
  PROFILE: '/user/',
};

type Routes = typeof paths[keyof typeof paths];

export const routes: Record<Routes, { path: string; public?: boolean; disablePadding?: boolean }> = {
  [paths.HOME]: {
    path: paths.HOME,
    public: true,
    disablePadding: true,
  },
  [paths.LOGIN]: {
    path: paths.LOGIN,
    public: true,
  },
  [paths.SIGNUP]: {
    path: paths.SIGNUP,
    public: true,
  },
  [paths.PROFILE]: {
    path: paths.PROFILE,
    public: false,
  },
};
