import { SignupBody } from './../utils/auth.utils';
import axios from 'axios';
import { LoginBody } from '../utils/auth.utils';

export type SigninResponse = boolean;
export type SignupResponse = boolean;

export async function signup(body: LoginBody) {
  return (await axios.post<SignupResponse>('/auth/signup', body)).data;
}

export async function signin(body: SignupBody) {
  return (await axios.post<SigninResponse>('/auth/signin', body)).data;
}
