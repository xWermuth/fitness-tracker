import { setAuthenticated } from './global.actions';
import { createReducer } from '@reduxjs/toolkit';

export interface GlobalState {
  authenticated: boolean;
}

const initialState: GlobalState = {
  authenticated: false,
};

export const globalReducer = createReducer(initialState, (builder) => {
  builder.addCase(setAuthenticated, (state, { payload }) => {
    return { ...state, authenticated: payload };
  });
});
