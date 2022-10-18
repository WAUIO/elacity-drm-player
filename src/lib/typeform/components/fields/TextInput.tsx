import * as React from 'react';
import Box from '@mui/material/Box';
import Input from '@mui/material/Input';
import { TextInputBlock } from '../../types';

export default ({ input }: TextInputBlock) => (
  <Box
    component="div"
    sx={{
      '& > :not(style)': { m: 1 },
    }}
  >
    <Input {...input} />
  </Box>
);
