import { setAuthenticated } from './../global/global.actions';
import { UserRes } from './../../../api/user';
import { createAsyncThunk, createAction } from '@reduxjs/toolkit';
import { getUserDetails } from '../../../api/user';
import { riseError } from '../global/global.actions';
import userConstants from './user.constants';

export const setUserInfo = createAction<UserRes>(userConstants.SET_USER);

export const fetchUser = createAsyncThunk(userConstants.FETCH_USER, async (_: null, thunk) => {
  try {
    const user = await getUserDetails();
    thunk.dispatch(setUserInfo(user));
    thunk.dispatch(setAuthenticated(true));
  } catch (error: any) {
    thunk.dispatch(riseError(error.message));
  }
});
