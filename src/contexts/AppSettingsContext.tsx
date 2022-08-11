/* eslint-disable @typescript-eslint/no-empty-function */
import React from 'react';
import { IUserPreferences } from '../types';
import { IStorage } from '../lib/storage';

export interface AppSettingsContextValue {
  values: IUserPreferences;
  setValues: (v: Partial<IUserPreferences>) => void;
  load: () => void;
}

const defaultValues: IUserPreferences = {
  theme: 'light',
  lang: (navigator.language || 'en').substr(0, 2),
};

interface AppSettingsProviderProps {
  store: IStorage<IUserPreferences, void>;
}

const AppSettingsContext = React.createContext<AppSettingsContextValue>({
  values: defaultValues,
  setValues: () => {},
  load: () => {},
});

type LoadAction = {
  type: 'LOAD';
};

type SetAction = {
  type: 'SET';
  payload: Partial<IUserPreferences>;
};

type Action = LoadAction | SetAction;

const reducer = (
  store: IStorage<IUserPreferences, void>
) => (
  state: IUserPreferences,
  action: Action
): IUserPreferences => {
  console.log('[AppSetingsContext.reducer]', action);
  switch (action.type) {
  case 'LOAD':
    store.load();
    return store.values();

  case 'SET':
    // eslint-disable-next-line no-case-declarations
    const newState = {
      ...state,
      ...action.payload,
    };
    store.setValues(newState);
    return newState;
  default:
    // nothing here for now
    break;
  }

  return state;
};

export const AppSettingsProvider: React.FC<React.PropsWithChildren<AppSettingsProviderProps>> = ({
  children,
  store,
}: React.PropsWithChildren<AppSettingsProviderProps>) => {
  const [values, dispatch] = React.useReducer(reducer(store), store.values());

  const load = (): void => dispatch({
    type: 'LOAD',
  });

  const setValues = (payload: Partial<IUserPreferences>): void => dispatch({
    type: 'SET',
    payload,
  });

  React.useEffect(() => {
    load();
    setValues(values);
  }, []);

  return (
    <AppSettingsContext.Provider
      value={{
        values,
        setValues,
        load,
      }}
    >
      {children}
    </AppSettingsContext.Provider>
  );
};

export default AppSettingsContext;
