import { setAuthenticated } from './global.actions';
import { createReducer } from '@reduxjs/toolkit';
import { isOnServer } from '../../../utils';

export interface GlobalState {
  authenticated: boolean;
}

const initialState: GlobalState = {
  authenticated: false,
};

export const globalReducer = createReducer(initialState, (builder) => {
  builder.addCase(setAuthenticated, (state, { payload }) => {
    console.log('globalReducer: ', isOnServer());
    return { ...state, authenticated: payload };
  });
});
