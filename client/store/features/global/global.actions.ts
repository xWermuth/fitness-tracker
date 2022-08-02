import { createAction } from '@reduxjs/toolkit';
import globalConstants from './global.constants';

export const setAuthenticated = createAction<boolean>(globalConstants.SET_AUTHORIZED);
export const riseError = createAction<string>(globalConstants.RISE_ERROR);
