/* eslint-disable max-len */
import React from 'react';
import { Formik, Form } from 'formik';
import { RouterLink } from '@elacity-js/uikit';
import { Theme, styled } from '@mui/material/styles';
import CircularProgress from '@mui/material/CircularProgress';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import StepContent from '@mui/material/StepContent';
import MuiStepConnector, { stepConnectorClasses } from '@mui/material/StepConnector';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';
import { DistributionMethod, Label } from 'src/lib/scm';
import { ClassicUploader } from 'src/lib/uploader';
import { useConnector } from 'src/lib/web3/ConnectorContext';
import { useCreateFormStep, FormStep } from './CreateStep';
import FormStepTemplate from './FormStepTemplate';
import FormStepRoyalty from './FormStepRoyalty';
import FormStepSaleTerm from './FormStepSaleTerm';
import FormStepUpload from './FormStepUpload';
import useHandler, { HandlerStatus } from './handler';
import { CreateFormData } from './types';

const Wrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(3, 4),
}));

const StepConnector = styled(MuiStepConnector)(({ theme }) => ({
  [`&.${stepConnectorClasses.alternativeLabel}`]: {
    top: 10,
    left: 'calc(-50% + 16px)',
    right: 'calc(50% + 16px)',
  },
  [`&.${stepConnectorClasses.active}`]: {
    [`& .${stepConnectorClasses.line}`]: {
      borderColor: theme.palette.primary.light,
      borderWidth: 3,
      marginLeft: -1.5,
    },
  },
  [`&.${stepConnectorClasses.completed}`]: {
    [`& .${stepConnectorClasses.line}`]: {
      borderColor: theme.palette.primary.main,
      borderWidth: 3,
      marginLeft: -1.5,
    },
  },
}));

const steps: FormStep[] = [
  {
    label: 'Upload Media',
    description: 'Prepare and upload your video and its thumbnail.',
    Component: FormStepUpload,
  },
  {
    label: 'Select Template',
    description: 'Select which options describe you better so we load the right contract template for you',
    Component: FormStepTemplate,
  },
  {
    label: 'Parties & Royalty Distribution',
    description:
      'Please definie address and royalty (%) for each party. Make sure total match 100%',
    Component: FormStepRoyalty,
  },
  {
    label: 'Sales Terms',
    description: 'Set price and other terms for the sale',
    Component: FormStepSaleTerm,
  },
  {
    label: 'Deploy',
    description:
      'By clicking on "Complete & Deploy", you aknowledge that you have read and agree to the Terms of Service',
  },
];

const CreateForm: React.FC = () => {
  const { wrapInConnector } = useConnector();
  const { activeStep, handleBack, handleNext } = useCreateFormStep(0);
  const { handlePayload, status, outcome } = useHandler({
    uploader: new ClassicUploader(process.env.REACT_APP_BACKEND_URL),
  });

  const initialValues: CreateFormData = {
    templateRaw: '',
    distributionMethod: DistributionMethod.DIGITAL_SALE,
    label: Label.SELF,
    royalties: [],
    author: '',
    salePrice: {
      payToken: '0x0000000000000000000000000000000000000000',
    },
  };

  return (
    <Wrapper>
      <Container maxWidth="md">
        <Formik
          initialValues={initialValues}
          onSubmit={async (values: CreateFormData) => {
            console.log({ values });
            await handlePayload(values);
            handleNext();
          }}
        >
          {({ submitForm, handleSubmit, isSubmitting }) => (
            <Form onSubmit={handleSubmit}>
              <Stepper activeStep={activeStep} orientation="vertical" connector={<StepConnector />}>
                {steps.map(({ Component, ...step }, index) => (
                  <Step key={step.label}>
                    <StepLabel
                      optional={
                        index === steps.length - 1 ? (
                          <Typography variant="caption">Last step</Typography>
                        ) : null
                      }
                    >
                      {step.label}
                    </StepLabel>
                    <StepContent>
                      <Typography>{step.description}</Typography>
                      {Boolean(Component) && <Component />}
                      <Box sx={{ mb: 2 }}>
                        <div>
                          <Button
                            variant="contained"
                            onClick={index === steps.length - 1 ? wrapInConnector(submitForm) : handleNext}
                            sx={{ mt: 1, mr: 1 }}
                            disabled={isSubmitting}
                            startIcon={
                              isSubmitting ? (<CircularProgress size="1rem" />) : null
                            }
                          >
                            {index === steps.length - 1 ? 'Complete & Deploy' : 'Continue'}
                          </Button>
                          <Button
                            disabled={index === 0}
                            onClick={handleBack}
                            sx={{ mt: 1, mr: 1 }}
                          >
                            Back
                          </Button>
                        </div>
                      </Box>
                    </StepContent>
                  </Step>
                ))}
              </Stepper>
              {activeStep === steps.length && (
                <Paper
                  square
                  elevation={0}
                  sx={{
                    p: 3,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'flex-start',
                  }}
                >
                  {
                    status === HandlerStatus.SUCCEED ? (
                      <>
                        <CheckCircleIcon color="success" sx={{ fontSize: '3rem', mr: 1.5 }} />
                        <Typography component="div" sx={{ '& a': { color: (t: Theme) => t.palette.primary.main, textDecoration: 'none' } }}>
                          Your media has been successfully uploaded and deployed
                          <br />
                          <RouterLink to={`/view/ipfs:${outcome}`}>{outcome}</RouterLink>
                        </Typography>
                      </>
                    ) : (
                      <>
                        <CancelIcon color="error" sx={{ fontSize: '3rem', mr: 1.5 }} />
                        <Typography>An error occured during your upload</Typography>
                        <Button onClick={handleBack} variant="outlined">Back</Button>
                      </>
                    )
                  }
                </Paper>
              )}
            </Form>
          )}
        </Formik>
      </Container>
    </Wrapper>
  );
};

export default CreateForm;
