import * as React from 'react';
import ButtonGroup from '@mui/material/ButtonGroup';
import Button from '@mui/material/Button';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import SubdirectoryArrowRightIcon from '@mui/icons-material/SubdirectoryArrowRight';

interface InnerStepProps {
  onPrev: () => void;
  onNext: () => void;
  onComplete: () => void;
  isFirst?: boolean;
  isLast?: boolean;
}

export default ({ onPrev, onNext, onComplete, isFirst, isLast }: InnerStepProps) => (
  <ButtonGroup
    disableElevation
    variant="contained"
    size="large"
    sx={{
      '&.MuiButtonGroup-root': {
        '& .MuiButtonBase-root': {
          mr: 0.1,
          borderRight: 'none',
          borderLeft: 'none',
        },
      },
    }}
  >
    <Button disabled={isFirst} onClick={onPrev} startIcon={<ArrowBackIcon />}>Prev</Button>
    {!isLast ? (
      <Button disabled={isLast} onClick={onNext} endIcon={<ArrowForwardIcon />}>Next</Button>
    ) : (
      <Button onClick={onComplete} endIcon={<SubdirectoryArrowRightIcon />}>Continue</Button>
    )}
  </ButtonGroup>
);
