import * as React from 'react';
import Box from '@mui/material/Box';
import Input from '@mui/material/Input';
import useAutofocus from 'src/lib/typeform/hooks/useAutofocus';
import { TextInputBlock } from '../../types';

export default ({ input: { helpText, fieldName, ...input } }: TextInputBlock) => {
  const inputRef = useAutofocus();

  React.useEffect(() => {
    const preventLineBreakWithEnterKey = (e: React.KeyboardEvent) => {
      if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault();
      }
    };

    if (inputRef.current) {
      // @ts-ignore
      inputRef.current.addEventListener('keypress', preventLineBreakWithEnterKey);
    }

    return () => {
      if (inputRef.current) {
        // @ts-ignore
        inputRef.current.removeEventListener('keypress', preventLineBreakWithEnterKey);
      }
    };
  }, []);

  return (
    <Box
      component="span"
      sx={{
        '& > :not(style)': { m: 1 },
      }}
    >
      <Input {...input} inputRef={inputRef} />
    </Box>
  );
};
