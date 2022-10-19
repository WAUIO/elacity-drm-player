/* eslint-disable no-underscore-dangle */
/* eslint-disable max-len */
import { useFormikContext } from 'formik';
import { TransitionProps } from '@mui/material/transitions';
import React, {
  FC, PropsWithChildren, createContext, useState, KeyboardEvent,
} from 'react';
import {
  Block, FormStep, MintForm,
} from '../types/index';

interface FormUIContextValue {
  currentStep: FormStep;
  onNext: () => Promise<void>;
  onPrevious: () => void;
}

export const FormUIContext = createContext<FormUIContextValue>({
  currentStep: null,
  onNext: () => Promise.reject(new Error('not implemented')),
  onPrevious: () => {},
});

interface FormUIContextProps {
  steps: FormStep[],
  onFinal?: () => Promise<void>;
}

/**
 * This context is responsible about the UI/UX
 * - steps
 * - current step
 * - animation direction
 */
export const FormUIProvider: FC<PropsWithChildren<FormUIContextProps>> = ({ children, steps, onFinal }) => {
  const form = useFormikContext<MintForm>();
  const [currentStep, setCurrentStep] = useState<FormStep>(steps[0]);

  React.useEffect(() => {
    form.setFieldValue('stepNum', currentStep?.id);
  }, [currentStep?.id]);

  // Override step transaction direction on click on the bottom controller up or down
  const setDirection = (blocks: Block[], animationDirection?: string) => blocks.map((b) => ({ ...b, animation: b.animation ? { ...b.animation, props: { direction: animationDirection || 'up' } as TransitionProps } : null }));

  // Set what should be the current step with direction if specified
  const _setCurrentStep = (stepId: number, animationDirection?: string) => {
    // Find target index by id if exist
    const index = (steps || []).findIndex(({ id }) => id === stepId);
    if (index !== -1) {
      const step = steps[index];
      if (step) {
        // update current step
        setCurrentStep({ ...step, blocks: setDirection(step.blocks, animationDirection) });
      }
    }
  };

  const onNext = async () => {
    if (currentStep?.isLastStep) {
      onFinal?.();
      return;
    }

    const errors = await form.validateForm(form.values);
    if (Object.entries(errors).length > 0) {
      form.setErrors(errors);
      console.log('Validator Error', errors);
      return;
    }

    if (currentStep?.id) {
      // next step will show from the bottom -> top
      _setCurrentStep(currentStep?.id + 1, 'up');
    }
  };

  const onPrevious = () => {
    if (currentStep?.id) {
      // next step will show from the top -> bottom
      _setCurrentStep(currentStep?.id - 1, 'down');
    }
  };

  // On clicked on arrow down button
  React.useEffect(() => {
    const handleEnterKeyUp = (e: KeyboardEvent) => {
      if (e.key === 'Enter' && !e.shiftKey) {
        const validateOnEnter = (currentStep.blocks || []).map(
          (b: Block) => !!b.content?.button?.withIndicator
        ).filter(
          (h: boolean) => !!h
        ).length > 0;

        if (validateOnEnter) {
          onNext();
        }
      }
    };

    // @ts-ignore
    window.addEventListener('keyup', handleEnterKeyUp);

    return () => {
      // @ts-ignore
      window.removeEventListener('keyup', handleEnterKeyUp);
    };
  }, [currentStep]);

  return (
    <FormUIContext.Provider
      value={{
        currentStep,
        // setCurrentStep: _setCurrentStep,
        onNext,
        onPrevious,
      }}
    >
      {children}
    </FormUIContext.Provider>
  );
};
