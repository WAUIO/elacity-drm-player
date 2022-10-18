import React, { PropsWithChildren } from 'react';
import { Box, Typography } from '@mui/material';
import ArrowRightAltIcon from '@mui/icons-material/ArrowRightAlt';

interface TitleProps {
  indicator?: number;
}

export const Title = ({ indicator, children }: PropsWithChildren<TitleProps>) => (
  <Box display="flex">
    {indicator && (
      <Box display="flex" p={0.5}>
        <Typography color="primary">{indicator}</Typography>
        <ArrowRightAltIcon color="primary" fontSize="small" sx={{ pt: 0.5 }} />
      </Box>
    )}
    <Typography variant="h5">{children}</Typography>
  </Box>
);

export default Title;
