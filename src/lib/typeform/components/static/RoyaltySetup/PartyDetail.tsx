import * as React from 'react';
import { Box, OutlinedInput } from '@mui/material';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import FormControl from '@mui/material/FormControl';
import { RoyaltySet } from 'src/lib/typeform/types';
import useAutofocus from 'src/lib/typeform/hooks/useAutofocus';

// declare type State = Omit<RoyaltySet, 'indentifier'>;
declare type State = RoyaltySet;

interface PartyDetailProps {
  partyKey: string;
  values: Record<string, State>;
  onChange?: (partyKey: string, prop: keyof State) => (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export default ({ partyKey, values, onChange }: PartyDetailProps) => {
  const inputRef = useAutofocus();

  return (
    <Box sx={{ display: 'flex', flexWrap: 'wrap', '& .MuiFormControl-root': { ml: 0 } }}>
      <FormControl fullWidth sx={{ m: 1 }}>
        <InputLabel>Address</InputLabel>
        <OutlinedInput
          inputRef={inputRef}
          label="Address"
          value={values[partyKey]?.address}
          onChange={onChange?.(partyKey, 'address')}
        />
      </FormControl>
      <FormControl sx={{ m: 1, width: '10ch' }}>
        <InputLabel>Value</InputLabel>
        <OutlinedInput
          type="number"
          label="Value"
          value={values[partyKey]?.royalty}
          onChange={onChange?.(partyKey, 'royalty')}
          endAdornment={<InputAdornment position="end">%</InputAdornment>}
          inputProps={{
            'aria-label': 'weight',
            max: 100,
          }}
        />
      </FormControl>
    </Box>
  );
};
