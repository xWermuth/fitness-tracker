import { setAuthenticated, riseError } from './global.actions';
import { createReducer } from '@reduxjs/toolkit';
import { isOnServer } from '../../../utils';

export interface GlobalState {
  authenticated: boolean;
  error: string;
}

const initialState: GlobalState = {
  authenticated: false,
  error: '',
};

export const globalReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(setAuthenticated, (state, { payload }) => {
      console.log('globalReducer: ', isOnServer());
      return { ...state, authenticated: payload };
    })
    .addCase(riseError, (state, { payload }) => {
      return { ...state, error: payload };
    });
});
