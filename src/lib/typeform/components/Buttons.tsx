import React from 'react';
import ButtonGroup from '@mui/material/ButtonGroup';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { styled } from '@mui/material/styles';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { ButtonForm } from '../types';
import useFormUI from '../hooks/useFormUI';

const BottomBox = styled(Box)(({ theme }) => ({
  position: 'fixed',
  bottom: theme.spacing(10),
  right: theme.spacing(2),
  [theme.breakpoints.down('sm')]: {
    bottom: theme.spacing(1),
    right: theme.spacing(1),
  },
}));

/**
 * Bottom button up | down controller
 */
export const BtnController = () => {
  const { currentStep, setCurrentStep } = useFormUI();

  // On clicked on arrow down button
  const onNext = () => {
    if (currentStep?.id) {
      // next step will show from the bottom -> top
      setCurrentStep(currentStep?.id + 1, 'up');
    }
  };

  // On clicked on arrow up button
  const onPrevious = () => {
    if (currentStep?.id) {
      // previous step will show from the top -> bottom
      setCurrentStep(currentStep?.id - 1, 'down');
    }
  };

  return (
    <BottomBox>
      <ButtonGroup sx={{ '& .MuiButtonBase-root': { boxShadow: 0, mx: 0.25 } }}>
        <Button
          variant="contained"
          disabled={currentStep?.isFirstStep}
          onClick={onPrevious}
        >
          <KeyboardArrowUpIcon fontSize="small" />
        </Button>
        <Button
          variant="contained"
          disabled={currentStep?.isLastStep}
          onClick={onNext}
        >
          <KeyboardArrowDownIcon fontSize="small" />
        </Button>
      </ButtonGroup>
    </BottomBox>
  );
};

interface BtnNextProps extends ButtonForm {}

export const BtnNext = ({ text, stepId, withIndicator, props }: BtnNextProps) => {
  const { setCurrentStep } = useFormUI();

  // Override the onClick action
  // Fire the action then move to current step
  const onNext = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    if (typeof props?.onClick === 'function') {
      props.onClick(e);
    }
    if (stepId && typeof stepId === 'number') {
      setCurrentStep(stepId + 1);
    }
  };

  return (
    <Box display="flex" mt={3} alignItems="center">
      <Button variant="contained" size="large" onClick={onNext} {...props}>
        {text}
      </Button>
      {withIndicator && (
        <Typography
          variant="caption"
          sx={{
            p: 1,
            '& > *': {
              fontWeight: 'bolder',
            },
          }}
        >
          press
          {' '}
          <span>Enter ↵</span>
        </Typography>
      )}
    </Box>
  );
};
