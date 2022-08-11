import { combineReducers } from '@reduxjs/toolkit';
import { api } from '../api/foundation';
import counterReducer from '../slices/counter';

const rootReducer = combineReducers({
  [api.reducerPath]: api.reducer,
  counter: counterReducer,
});

export default rootReducer;
