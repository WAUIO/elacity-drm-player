import React from 'react';
import { useFormikContext } from 'formik';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import { CreateFormData } from './types';

export default () => {
  const { values, setFieldValue, errors } = useFormikContext<CreateFormData>();

  return (
    <Box>
      <TextField
        label="Sale Price"
        value={values.salePrice?.amount || ''}
        sx={{ my: 1, width: '20ch' }}
        onChange={(e) => {
          setFieldValue('salePrice.amount', e.target.value);
        }}
        InputProps={{
          sx: { textAlign: 'right' },
          inputProps: {
            type: 'number',
          },
          endAdornment: <InputAdornment position="start">ELA</InputAdornment>,
        }}
        error={Boolean(errors.salePrice?.amount)}
        helperText={errors.salePrice?.amount}
      />
    </Box>
  );
};
