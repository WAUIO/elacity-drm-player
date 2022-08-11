import { useContext } from 'react';
import Context from '../contexts/AppSettingsContext';
import type { AppSettingsContextValue as Type } from '../contexts/AppSettingsContext';

const useAppSettings = (): Type => useContext(Context);
export default useAppSettings;
