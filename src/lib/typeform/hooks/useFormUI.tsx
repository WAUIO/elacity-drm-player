import { useContext } from 'react';
import { FormUIContext } from '../contexts/FormUIContext';

const useFormUI = () => useContext(FormUIContext);

export default useFormUI;
