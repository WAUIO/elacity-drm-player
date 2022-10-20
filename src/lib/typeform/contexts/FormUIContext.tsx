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

interface OnNextParams {
  forceValidation?: boolean;
}

interface FormUIContextValue {
  currentStep: FormStep;
  onNext: (p?: OnNextParams) => void;
  onPrevious: () => void;
}

export const FormUIContext = createContext<FormUIContextValue>({
  currentStep: null,
  onNext: (p?: OnNextParams) => p,
  onPrevious: () => {},
});

interface FormUIContextProps {
  steps: FormStep[],
  onStep?: (s: number) => void;
  onFinal?: () => Promise<void>;
}

/**
 * This context is responsible about the UI/UX
 * - steps
 * - current step
 * - animation direction
 */
export const FormUIProvider: FC<PropsWithChildren<FormUIContextProps>> = ({ children, steps, onFinal, onStep }) => {
  const form = useFormikContext<MintForm>();
  const [currentStep, setCurrentStep] = useState<FormStep>(steps[0]);

  // Override step transaction direction on click on the bottom controller up or down
  const setDirection = (blocks: Block[], animationDirection?: string) => blocks.map((b) => ({ ...b, animation: b.animation ? { ...b.animation, props: { direction: animationDirection || 'up' } as TransitionProps } : null }));

  // Set what should be the current step with direction if specified
  const _setCurrentStep = (stepId: number, animationDirection?: string) => {
    // Find target index by id if exist
    const index = (steps || []).findIndex(({ id }) => id === stepId);
    onStep?.(index);
    if (index !== -1) {
      const step = steps[index];
      if (step) {
        // update current step
        setCurrentStep({ ...step, blocks: setDirection(step.blocks, animationDirection) });
      }
    }
  };

  const onNext = React.useCallback((o?: OnNextParams) => {
    if (currentStep?.isLastStep) {
      onFinal?.();
      return;
    }

    // @todo: the state below generate a double validation triggering
    // as a workakound we just removed it (and used form.errors instead)
    // but it seems whole the form is not dispacthing over children of the context
    console.log('Exec onNext', o);
    if (!o?.forceValidation && currentStep?.id) {
      // go through wth any restriction about validation state
      _setCurrentStep(currentStep?.id + 1, 'up');
      return;
    }

    if (o?.forceValidation) {
      form.validateForm().then(
        (errors) => {
          if (Object.entries(errors).length > 0) {
            console.error('Validator Error', errors);
          } else if (currentStep?.id) {
            // next step will show from the bottom -> top
            _setCurrentStep(currentStep?.id + 1, 'up');
          }
        }
      );
      return;
    }

    if (Object.entries(form.errors).length > 0) {
      console.error('Validator Error', form.errors);
    } else if (currentStep?.id) {
      // next step will show from the bottom -> top
      _setCurrentStep(currentStep?.id + 1, 'up');
    }
  }, [currentStep?.id, form.values]);

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
          onNext({ forceValidation: true });
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
