import { AUTH_COOKIE_KEY } from './../utils/utils';
import { SignupBody } from './../utils/auth.utils';
import { LoginBody } from '../utils/auth.utils';
import api from './api';
import Cookies from 'js-cookie';

export type SigninResponse = { access_token: string; refresh_token: string };
export type SignupResponse = boolean;

export async function signup(body: SignupBody) {
  return (await api.post<SignupResponse>('/auth/signup', body)).data;
}

export async function signin(body: LoginBody) {
  const data = (await api.post<SigninResponse>('/auth/signin', body)).data;
  console.log('singin cookie: ', Cookies.get(AUTH_COOKIE_KEY));
  return data;
}
