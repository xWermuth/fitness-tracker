import { AppState } from '../../store';

export const getAuthState = (state: AppState) => state.globalReducer.authenticated;
