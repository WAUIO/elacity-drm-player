import { useState, ComponentType } from 'react';

export interface FormStep {
  label: string;
  description?: string;
  Component?: ComponentType
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars-experimental
export const useCreateFormStep = (initialStep: number) => {
  const [activeStep, setActiveStep] = useState(initialStep);

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleReset = () => {
    setActiveStep(0);
  };

  return { activeStep, handleNext, handleBack, handleReset };
};
