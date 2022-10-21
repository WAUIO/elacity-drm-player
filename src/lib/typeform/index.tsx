import React from 'react';
import { sumBy } from 'lodash';
import { Formik, FormikErrors } from 'formik';
import { ThemeProvider } from './theme';
import Form from './components/Form';
import { FormUIProvider } from './contexts/FormUIContext';
import questionSteps from './questions';
import { MintForm } from './types';

interface Props {
  handle?: (values: MintForm) => Promise<{path: string}[]>
}

const Typeform = ({ handle }: Props) => {
  const [activeStepIndex, setStepIndex] = React.useState<number>(0);
  const onSubmit = async (values: MintForm) => {
    console.log('submitting', { values });
    await handle(values);
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
          errors.pricePerSale = 'The price is required unless you set the asset as a free content';
        }
      },
      () => {
        if (values.accessMethod !== 'A') {
          let royaltiesHasErr = false;
          values.royalties.forEach((rset) => {
            if (rset.address === '') {
              royaltiesHasErr = true;
            }
          });
          if (royaltiesHasErr) {
            errors.royalties = 'Please fill in all beneficiaries address';
          } else {
            const totalPercentage = sumBy(values.royalties, ((r) => Number(r.royalty)));
            if (totalPercentage > 100) {
              errors.royalties = `Total royalties percentag exceeds 100%, actual value is ${totalPercentage}%`;
            }
          }
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
        initialValues={{
          parties: [],
          royalties: [],
        }}
        onSubmit={onSubmit}
        validate={formValidator}
      >
        <FormUIProvider
          steps={questionSteps}
          onStep={(stepIndex: number) => {
            setStepIndex(stepIndex);
          }}
          onComplete={async (form) => {
            console.log('form state', [form.isSubmitting, form.isValid]);
            await form.submitForm();
            setTimeout(form.setSubmitting, 700, false);
            form.resetForm();
          }}
        >
          <Form stepIndex={activeStepIndex} />
        </FormUIProvider>
      </Formik>
    </ThemeProvider>
  );
};

export default Typeform;
