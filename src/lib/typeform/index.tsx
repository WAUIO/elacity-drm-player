import React from 'react';
import { Formik, FormikErrors } from 'formik';
import { ThemeProvider } from './theme';
import Form from './components/Form';
import { FormUIProvider } from './contexts/FormUIContext';
import questionSteps from './questions';
import { MintForm } from './types';

const Typeform = () => {
  const initialValues: MintForm = {
    stepNum: 1,
  };
  const onSubmit = (values: MintForm) => {
    console.log({ values });
  };

  const formValidator = (_values: MintForm) => {
    const errors: FormikErrors<MintForm> = {};

    const { stepNum, ...values } = _values;

    console.log('validation...', stepNum, { values });
    if (stepNum >= 2) {
      if (!values.operator) {
        errors.operator = 'Please choose one of the options above';
      }
    } if (stepNum >= 3) {
      if (!values.contentType) {
        errors.contentType = 'Please choose one the content type you want to publish';
      }
    } if (stepNum >= 4) {
      if (!values.accessMethod) {
        errors.accessMethod = 'Please choose one of the options above';
      }
    } if (stepNum >= 5) {
      if (!values.pricePerSale && values.accessMethod !== 'A') {
        errors.pricePerSale = 'The price is required unless you set it as free content';
      }
    } if (stepNum >= 6) {
      if (!values.parties?.length && values.accessMethod !== 'A') {
        errors.parties = 'Please choose at least one of the options above';
      }
    } if (stepNum >= 7) {
      if (!values.assetFile) {
        errors.assetFile = 'Please upload the asset you want to publish';
      }
    } if (stepNum >= 8) {
      if (!values.assetThumbnail) {
        errors.assetThumbnail = 'Please select a thumbnail';
      }
    } if (stepNum >= 9) {
      if (!values.title) {
        errors.title = 'Title is required';
      }
    } if (stepNum >= 10) {
      if (!values.description) {
        errors.description = 'Description is required';
      }
    } if (stepNum >= 11) {
      if (!values.copiesNumber) {
        errors.copiesNumber = 'Number of copies is required, please set at least 1';
      }
    }

    return errors;
  };

  return (
    <ThemeProvider>
      <Formik
        initialValues={initialValues}
        onSubmit={onSubmit}
        validate={formValidator}
        validateOnChange
      >
        {
          (form) => (
            <FormUIProvider
              steps={questionSteps(form)}
              onFinal={async () => {
                form.setSubmitting(true);
                await form.submitForm();
                setTimeout(form.setSubmitting, 2000, false);
              }}
            >
              <Form />
            </FormUIProvider>
          )
        }
      </Formik>
    </ThemeProvider>
  );
};

export default Typeform;
