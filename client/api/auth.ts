import { SignupBody } from './../utils/auth.utils';
import { LoginBody } from '../utils/auth.utils';
import { api } from './api';

export type SigninResponse = boolean;
export type SignupResponse = boolean;

export async function signup(body: SignupBody) {
  return (await api.post<SignupResponse>('/auth/signup', body)).data;
}

export async function signin(body: LoginBody) {
  console.log('axs: ', api.defaults.baseURL);
  return (await api.post<SigninResponse>('/auth/signin', body)).data;
}
