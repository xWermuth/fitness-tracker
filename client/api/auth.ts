import { AUTH_COOKIE_KEY } from './../utils/utils';
import { SignupBody } from './../utils/auth.utils';
import { LoginBody } from '../utils/auth.utils';
import api from './api';
import { UserRes } from './user';

export type SigninResponse = UserRes;
export type SignupResponse = boolean;

export async function signup(body: SignupBody) {
  return (await api.post<SignupResponse>('/auth/signup', body)).data;
}

export async function signin(body: LoginBody) {
  return (await api.post<SigninResponse>('/auth/signin', body)).data;
}
