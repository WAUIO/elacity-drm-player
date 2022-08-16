import { useContext } from 'react';
import Context from './context';
import type { DIDContextValue as Type } from './context';

export const useDID = (): Type => useContext(Context);
