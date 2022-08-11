import {
  configureStore, getDefaultMiddleware, ThunkAction, Action,
} from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';
import { createLogger } from 'redux-logger';
import { api } from '../api/foundation';
// @todo: add any API section, see below about how to implement
import '../api/essay';
import rootReducer from './reducer';

const loggerMiddleware = createLogger({});

const middleware = [
  ...getDefaultMiddleware({
    serializableCheck: {
      // Ignore these action types
      ignoredActions: [],
    },
  }),
  api.middleware,
];

if (process.env.NODE_ENV === 'development') {
  middleware.push(loggerMiddleware);
}

export const store = configureStore({
  reducer: rootReducer,
  // middleware,
  devTools: process.env.REACT_APP_ENABLE_REDUX_DEV_TOOLS === 'true',
});

setupListeners(store.dispatch);

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, Action<string>>;
