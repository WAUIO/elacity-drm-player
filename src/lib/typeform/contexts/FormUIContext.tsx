/* eslint-disable no-underscore-dangle */
/* eslint-disable max-len */
import { TransitionProps } from '@mui/material/transitions';
import React, {
  FC, PropsWithChildren, createContext, useState, KeyboardEvent,
} from 'react';
import { Block, FormStep } from '../types/index';

interface FormUIContextValue {
  currentStep: FormStep;
  // setCurrentStep: (stepId: number, animationDirection?: string) => void;
  onNext: () => void;
  onPrevious: () => void;
}

export const FormUIContext = createContext<FormUIContextValue>({
  currentStep: null,
  // setCurrentStep: () => {},
  onNext: () => {},
  onPrevious: () => {},
});

interface FormUIContextProps {
  steps: FormStep[],
}

/**
 * This context is responsible about the UI/UX
 * - steps
 * - current step
 * - animation direction
 */
export const FormUIProvider: FC<PropsWithChildren<FormUIContextProps>> = ({ children, steps }) => {
  const [currentStep, setCurrentStep] = useState<FormStep>(steps[0]);

  // Override step transaction direction on click on the bottom controller up or down
  const setDirection = (blocks: Block[], animationDirection?: string) => blocks.map((b) => ({ ...b, animation: b.animation ? { ...b.animation, props: { direction: animationDirection || 'up' } as TransitionProps } : null }));

  // Set what should be the current step with direction if specified
  const _setCurrentStep = (stepId: number, animationDirection?: string) => {
    // Find target index by id if exist
    const index = (steps || []).findIndex(({ id }) => id === stepId);
    if (index !== -1) {
      const step = steps[index];
      if (step) {
        const { blocks } = step;
        // update current step
        setCurrentStep({ ...step, blocks: setDirection(blocks, animationDirection) });
      }
    }
  };

  const onNext = () => {
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
