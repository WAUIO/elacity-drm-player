/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import {
  TypedUseSelectorHook, useDispatch as useReduxDispatch, useSelector as useReduxSelector,
} from 'react-redux';
import type { RootState, AppDispatch } from './store';

export const useDispatch = () => useReduxDispatch<AppDispatch>();
export const useSelector: TypedUseSelectorHook<RootState> = useReduxSelector;
