import React from 'react';
import { ThemeProvider } from './theme';
import Form from './components/Form';
import { FormUIProvider } from './contexts/FormUIContext';
import questionSteps from './questions';

const Typeform = () => (
  <ThemeProvider>
    <FormUIProvider steps={questionSteps}>
      <Form />
    </FormUIProvider>
  </ThemeProvider>
);

export default Typeform;
