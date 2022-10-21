import React, { PropsWithChildren } from 'react';
import { Box, Typography } from '@mui/material';
import { TypographyProps } from '@mui/material/Typography';
import { styled } from '@mui/material/styles';
import ArrowRightAltIcon from '@mui/icons-material/ArrowRightAlt';

interface TitleProps {
  indicator?: number;
  required?: boolean;
}

const TypoTitle = styled(Typography)<TypographyProps & {component?: string}>(({ theme }) => ({
  ...theme.typography.h5,
  '& .flag-required': {
    color: theme.palette.error.main,
    fontWeight: 500,
    marginLeft: theme.spacing(0),
  },
}));

export const Title = ({ indicator, required, children }: PropsWithChildren<TitleProps>) => (
  <Box display="flex">
    {indicator && (
      <Box display="flex" p={0.5}>
        <Typography color="primary">{indicator}</Typography>
        <ArrowRightAltIcon color="primary" fontSize="small" sx={{ pt: 0.5 }} />
      </Box>
    )}
    <TypoTitle variant="h5" component="div">
      {children}
      {' '}
      {required && <span className="flag-required">*</span> }
    </TypoTitle>
  </Box>
);

export default Title;
