import React from 'react';
import { Formik, FormikErrors } from 'formik';
import { ThemeProvider } from './theme';
import Form from './components/Form';
import { FormUIProvider } from './contexts/FormUIContext';
import questionSteps from './questions';
import { MintForm } from './types';

const Typeform = () => {
  const [activeStepIndex, setStepIndex] = React.useState<number>(0);
  const onSubmit = (values: MintForm) => {
    console.log({ values });
  };

  const formValidator = React.useCallback((values: MintForm) => {
    const errors: FormikErrors<MintForm> = {};

    console.log('validation...', activeStepIndex, { values });

    // validators here are arranged by step index
    // on step index 0, there is no form, will be null
    const stepValidators = [
      null,
      () => {
        if (!values.operator) {
          errors.operator = 'Please choose one of the options above';
        }
      },
      () => {
        if (!values.contentType) {
          errors.contentType = 'Please choose one the content type you want to publish';
        }
      },
      () => {
        if (!values.accessMethod) {
          errors.accessMethod = 'Please choose one of the options above';
        }
      },
      () => {
        if (!values.pricePerSale && values.accessMethod !== 'A') {
          errors.pricePerSale = 'The price is required unless you set it as free content';
        }
      },
      () => {
        if (!values.parties?.length && values.accessMethod !== 'A') {
          errors.parties = 'Please choose at least one of the options above';
        }
      },
      () => {
        if (!values.assetFile) {
          errors.assetFile = 'Please upload the asset you want to publish';
        }
      },
      () => {
        if (!values.assetThumbnail) {
          errors.assetThumbnail = 'Please select a thumbnail';
        }
      },
      () => {
        if (!values.title) {
          errors.title = 'Title is required';
        }
      },
      () => {
        if (!values.description) {
          errors.description = 'Description is required';
        }
      },
      () => {
        if (!values.copiesNumber) {
          errors.copiesNumber = 'Number of copies is required, please set at least 1';
        }
      },
    ];

    stepValidators.filter(
      (_, num: number) => num <= activeStepIndex
    ).forEach(
      (execValidation: () => void | null) => {
        execValidation?.();
      }
    );

    return errors;
  }, [activeStepIndex]);

  return (
    <ThemeProvider>
      <Formik
        initialValues={{}}
        onSubmit={onSubmit}
        validate={formValidator}
      >
        {
          (form) => (
            <FormUIProvider
              steps={questionSteps(form)}
              onStep={(stepIndex: number) => {
                setStepIndex(stepIndex);
              }}
              onFinal={async () => {
                form.setSubmitting(true);
                await form.submitForm();
                setTimeout(form.setSubmitting, 2000, false);
              }}
            >
              <Form stepIndex={activeStepIndex} />
            </FormUIProvider>
          )
        }
      </Formik>
    </ThemeProvider>
  );
};

export default Typeform;
