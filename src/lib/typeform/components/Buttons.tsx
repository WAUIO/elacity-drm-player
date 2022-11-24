import React from 'react';
import ButtonGroup from '@mui/material/ButtonGroup';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { styled } from '@mui/material/styles';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { Theme, useMediaQuery } from '@mui/material';
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
  opacity: 0.6,
  '&:hover': {
    opacity: 1,
  },
}));

/**
 * Bottom button up | down controller
 */
export const BtnController = () => {
  const { currentStep, onNext, onPrevious } = useFormUI();

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
          onClick={
            () => {
              // no need validation, go through
              onNext?.({ forceValidation: false });
            }
          }
        >
          <KeyboardArrowDownIcon fontSize="small" />
        </Button>
      </ButtonGroup>
    </BottomBox>
  );
};

interface BtnNextProps extends ButtonForm {}

export const BtnNext = ({ text, withIndicator, props: _props }: BtnNextProps) => {
  const { sx, ...props } = _props || {};
  const { onNext } = useFormUI();
  const isMobile = useMediaQuery((theme: Theme) => theme.breakpoints.down('sm'));

  // Override the onClick action
  // Fire the action then move to current step
  const handleClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    if (typeof props?.onClick === 'function') {
      props.onClick(e);
    }
    onNext?.({ forceValidation: true });
  };

  return (
    <Box display="flex" mt={3} alignItems="center">
      <Button sx={{ boxShadow: 0, ...(sx || {}) }} variant="contained" size="large" onClick={handleClick} {...props}>
        {text}
      </Button>
      {withIndicator && !isMobile && (
        <Typography
          variant="caption"
          component="div"
          sx={{
            p: 1,
            '& > *': {
              fontWeight: 'bolder',
            },
          }}
          dangerouslySetInnerHTML={{
            __html: typeof withIndicator === 'string' ? withIndicator : 'press <span>Enter ↵</span>',
          }}
        />
      )}
    </Box>
  );
};
