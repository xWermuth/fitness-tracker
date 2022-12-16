import { setAuthenticated, riseError } from './global.actions';
import { createReducer } from '@reduxjs/toolkit';

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
      return { ...state, authenticated: payload };
    })
    .addCase(riseError, (state, { payload }) => {
      return { ...state, error: payload };
    });
});
