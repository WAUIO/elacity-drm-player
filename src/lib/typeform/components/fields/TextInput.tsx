import * as React from 'react';
import Box from '@mui/material/Box';
import Input from '@mui/material/Input';
import useAutofocus from 'src/lib/typeform/hooks/useAutofocus';
import { TextInputBlock } from '../../types';

export default ({ input: { helpText, fieldName, ...input } }: TextInputBlock) => {
  const inputRef = useAutofocus();
  return (
    <Box
      component="div"
      sx={{
        '& > :not(style)': { m: 1 },
      }}
    >
      <Input {...input} inputRef={inputRef} />
    </Box>
  );
};
