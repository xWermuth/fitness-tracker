export const isDev = process.env.NODE_ENV === 'development';
export const AT_COOKIE_KEY = 'access-token';
export const RT_COOKIE_KEY = 'refresh-token';
export const isOnServer = () => typeof window === 'undefined';
