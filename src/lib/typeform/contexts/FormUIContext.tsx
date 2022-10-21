/* eslint-disable no-fallthrough */
/* eslint-disable no-underscore-dangle */
/* eslint-disable max-len */
import { useFormikContext, FormikContextType } from 'formik';
import { TransitionProps } from '@mui/material/transitions';
import React, {
  FC, PropsWithChildren, createContext, useState, KeyboardEvent, useCallback,
} from 'react';
import {
  Block, FormStep, MintForm,
} from '../types/index';

/**
 * This helper will handle how all the steps will flow
 * according to actual step and values from the form
 *
 * @returns
 */
const useStepFlow = () => {
  const { values } = useFormikContext<MintForm>();

  const stepForward = useCallback((stepId: number) => {
    console.log({ stepId, values });
    if (stepId === 4 && values.accessMethod === 'A') {
      return 7;
    }

    return stepId + 1;
  }, [values]);

  const stepBackward = useCallback((stepId: number) => {
    if (stepId === 7 && values.accessMethod === 'A') {
      return 4;
    }

    return stepId - 1;
  }, [values]);

  return {
    stepForward,
    stepBackward,
  };
};

interface OnNextParams {
  forceValidation?: boolean;
}

interface FormUIContextValue {
  currentStep: FormStep<MintForm>;
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
  onComplete?: (form: FormikContextType<MintForm>) => Promise<void>;
}

/**
 * This context is responsible about the UI/UX
 * - steps
 * - current step
 * - animation direction
 */
export const FormUIProvider: FC<PropsWithChildren<FormUIContextProps>> = ({ children, steps, onComplete, onStep }) => {
  const form = useFormikContext<MintForm>();
  const { stepForward, stepBackward } = useStepFlow();
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
      onComplete?.(form);
      return;
    }

    // @todo: the state below generate a double validation triggering
    // as a workakound we just removed it (and used form.errors instead)
    // but it seems whole the form is not dispacthing over children of the context
    console.log('Exec onNext', o);
    if (!o?.forceValidation && currentStep?.id) {
      // go through wth any restriction about validation state
      _setCurrentStep(stepForward(currentStep?.id), 'up');
      return;
    }

    if (o?.forceValidation) {
      form.validateForm().then(
        (errors) => {
          if (Object.entries(errors).length > 0) {
            console.error('Validator Error', errors);
          } else if (currentStep?.id) {
            // next step will show from the bottom -> top
            _setCurrentStep(stepForward(currentStep?.id), 'up');
          }
        }
      );
      return;
    }

    if (Object.entries(form.errors).length > 0) {
      console.error('Validator Error', form.errors);
    } else if (currentStep?.id) {
      // next step will show from the bottom -> top
      _setCurrentStep(stepForward(currentStep?.id), 'up');
    }
  }, [currentStep?.id, form.values]);

  const onPrevious = () => {
    if (currentStep?.id) {
      // next step will show from the top -> bottom
      _setCurrentStep(stepBackward(currentStep?.id), 'down');
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
        onNext,
        onPrevious,
      }}
    >
      {children}
    </FormUIContext.Provider>
  );
};
