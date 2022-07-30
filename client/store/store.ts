import { AnyAction, combineReducers, configureStore, Reducer, ReducersMapObject } from '@reduxjs/toolkit';
import { createRouterMiddleware, routerReducer, RouterState } from 'connected-next-router';
import { createWrapper, HYDRATE } from 'next-redux-wrapper';
import { isDev } from '../utils';
import { globalReducer, GlobalState } from './features/global/global.reducer';

export interface AppState {
  globalReducer: GlobalState;
  router: RouterState;
}

const combinedReducer = combineReducers<AppState>({
  globalReducer,
  router: routerReducer,
});

const routerMiddleware = createRouterMiddleware();

const reducer: Reducer | ReducersMapObject = (state: ReturnType<typeof combinedReducer>, action: AnyAction) => {
  if (action.type === HYDRATE) {
    const nextState = {
      ...state, // use previous state
      ...action.payload, // apply delta from hydration
    };
    if (typeof window !== 'undefined' && state?.router) {
      // preserve router value on client side navigation
      nextState.router = state.router;
    }
    return nextState;
  } else {
    return combinedReducer(state, action);
  }
};

export const makeStore = () => {
  return configureStore({
    reducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(routerMiddleware),
  });
};

export const wrapper = createWrapper(makeStore, { debug: isDev });
