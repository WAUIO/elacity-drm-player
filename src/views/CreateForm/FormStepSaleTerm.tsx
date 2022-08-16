import React from 'react';
import { useFormikContext } from 'formik';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import { CreateFormData } from './types';

export default () => {
  const { values, setFieldValue } = useFormikContext<CreateFormData>();

  return (
    <Box>
      <TextField
        label="Sale Price"
        value={values.salePrice || ''}
        sx={{ my: 1, width: '20ch' }}
        onChange={(e) => {
          setFieldValue('salePrice', e.target.value);
        }}
        InputProps={{
          sx: { textAlign: 'right' },
          inputProps: {
            type: 'number',
          },
          endAdornment: <InputAdornment position="start">ELA</InputAdornment>,
        }}
      />
    </Box>
  );
};
