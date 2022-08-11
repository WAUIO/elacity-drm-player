import React from 'react';
import { Box, Typography } from '@mui/material';

interface ErrorProps {
  message?: string;
  code?: string | number;
}

const ErrorView: React.FC<ErrorProps> = ({ code, message }: ErrorProps) => (
  <Box
    sx={{
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      width: '100%',
      height: '100%',
      textAlign: 'center',
      position: 'fixed',
    }}
  >
    <Typography variant="h4">
      Error
      {code}
    </Typography>
    {message && <p style={{ display: 'block' }}>{message}</p>}
  </Box>
);

export default ErrorView;
