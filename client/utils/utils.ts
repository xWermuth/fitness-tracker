export const isDev = process.env.NODE_ENV === 'development';
export const AUTH_COOKIE_KEY = 'auth-cookie';
export const isOnServer = () => typeof window === 'undefined';
