import React from 'react';
import { ThemeProvider } from './theme';
import Form from './components/Form';
import { FormUIProvider } from './contexts/FormUIContext';
import { FormStep } from './types';

interface TypeformProps {
    steps: FormStep[];
}

const Typeform = ({ steps }: TypeformProps) => (
  <ThemeProvider>
    <FormUIProvider steps={steps}>
      <Form />
    </FormUIProvider>
  </ThemeProvider>
);

export default Typeform;
