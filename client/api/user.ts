import api from './api';

export enum Roles {
  ADMIN = 'admin',
  USER = 'user',
}

export interface UserRes {
  id: number;
  name: string;
  email: string;
  role: Roles;
}

export async function getUserDetails() {
  return (await api.get<UserRes>('/user/'))?.data;
}
