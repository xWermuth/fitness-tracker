import { AppState } from './../../store';

export const getUserInfo = (state: AppState) => state.user.info;

export const getUserName = (state: AppState) => state.user.info?.name;
