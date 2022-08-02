import { createReducer } from '@reduxjs/toolkit';
import { UserRes } from './../../../api/user';
import { setUserInfo } from './user.actions';
export interface UserState {
  info: UserRes | undefined;
}

const initialState: UserState = {
  info: undefined,
};

export const userReducer = createReducer(initialState, (builder) => {
  builder.addCase(setUserInfo, (state, { payload }) => {
    return { ...state, info: payload };
  });
});
