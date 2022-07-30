import { AnyAction, combineReducers, configureStore, Reducer, ReducersMapObject } from '@reduxjs/toolkit';
import { createWrapper, HYDRATE } from 'next-redux-wrapper';
import { globalReducer, GlobalState } from './features/global/global.reducer';

export interface AppState {
  globalReducer: GlobalState;
}

const combinedReducer = combineReducers<AppState>({
  globalReducer,
});

const reducer: Reducer | ReducersMapObject = (state: ReturnType<typeof combinedReducer>, action: AnyAction) => {
  if (action.type === HYDRATE) {
    return {
      ...state, // use previous state
      ...action.payload, // apply delta from hydration
    };
  } else {
    return combinedReducer(state, action);
  }
};

export const makeStore = () =>
  configureStore({
    reducer,
  });

export const wrapper = createWrapper(makeStore, { debug: true });
