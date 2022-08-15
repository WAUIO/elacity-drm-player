import React from 'react';
import { Formik } from 'formik';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import StepContent from '@mui/material/StepContent';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import { styled } from '@mui/material/styles';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { useCreateFormStep, FormStep } from './CreateStep';

const Wrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(3, 4),
}));

const steps: FormStep[] = [
  {
    label: 'Choose contract template',
    description: `For each ad campaign that you create, you can control how much
              you're willing to spend on clicks and conversions, which networks
              and geographical locations you want your ads to show on, and more.`,
  },
  {
    label: 'Setup parties for Royalty Distribution',
    description:
      'An ad group contains one or more ads which target a shared set of keywords.',
  },
  {
    label: 'Upload Media',
    description: `Try out different ad text to see what brings in the most customers,
              and learn how to enhance your ads using features like ad extensions.
              If you run into any problems with your ads, find out how to tell if
              they're running and how to resolve approval issues.`,
  },
  {
    label: 'Setup Sales Terms',
    description: 'Try out different ad text to see what brings in the most customers',
  },
  {
    label: 'Deploy',
    description:
      'An ad group contains one or more ads which target a shared set of keywords.',
  },
];

const CreateForm: React.FC = () => {
  const { activeStep, handleBack, handleNext } = useCreateFormStep(0);

  return (
    <Wrapper>
      <Container maxWidth="md">
        <Formik
          initialValues={{}}
          onSubmit={(values) => {
            console.log({ values });
          }}
        >
          <Box sx={{ maxWidth: 400 }}>
            <Stepper activeStep={activeStep} orientation="vertical">
              {steps.map((step, index) => (
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
                    <Box sx={{ mb: 2 }}>
                      <div>
                        <Button
                          variant="contained"
                          onClick={handleNext}
                          sx={{ mt: 1, mr: 1 }}
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
                <CheckCircleIcon color="success" sx={{ fontSize: '3rem', mr: 1.5 }} />
                <Typography>Your media has been successfully uploaded and deployed</Typography>
              </Paper>
            )}
          </Box>
        </Formik>
      </Container>
    </Wrapper>
  );
};

export default CreateForm;
