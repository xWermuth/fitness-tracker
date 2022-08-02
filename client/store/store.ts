import { userReducer, UserState } from './features/user/user.reducer';
import { AnyAction, combineReducers, configureStore } from '@reduxjs/toolkit';
import { createRouterMiddleware, routerReducer, RouterState } from 'connected-next-router';
import { createWrapper, HYDRATE } from 'next-redux-wrapper';
import { isDev } from '../utils';
import { globalReducer, GlobalState } from './features/global/global.reducer';

export interface AppState {
  globalReducer: GlobalState;
  router: RouterState;
  user: UserState;
}

const combinedReducer = combineReducers<AppState>({
  globalReducer,
  router: routerReducer,
  user: userReducer,
});

const routerMiddleware = createRouterMiddleware();

const reducer = (state: ReturnType<typeof combinedReducer> | undefined, action: AnyAction) => {
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

export const { makeStore, store } = (function () {
  const store = configureStore({
    reducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(routerMiddleware),
  });

  return { store, makeStore: () => store };
})();

export type ReduxStore = typeof store;

export const wrapper = createWrapper(makeStore, { debug: isDev });
