import React, { useEffect } from 'react';
import classnames from 'classnames';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import CheckIcon from '@mui/icons-material/Check';
import { styled } from '@mui/material/styles';
import { darken, alpha } from '@mui/material';
import Chip from '@mui/material/Chip';
import { SelectChoiceBlock, SelectOptions } from '../../types';
import useSelectFn from '../../hooks/useSelectFn';

const CardStyled = styled(Box)(({ theme }) => ({
  // display: 'inline-flex',
  minWidth: 190,
  marginRight: theme.spacing(1),
  marginBottom: theme.spacing(1),
  padding: theme.spacing(1),
  border: `1px solid ${theme.palette.primary.main}`,
  borderRadius: 4,
  background: alpha(theme.palette.primary.main, 0.1),
  cursor: 'pointer',
  '&:hover': {
    background: alpha(theme.palette.primary.main, 0.2),
  },
  '&.active': {
    borderColor: darken(theme.palette.primary.main, 0.2),
  },
}));

const ChipStyled = styled(Chip)(({ theme }) => ({
  borderRadius: 0,
  marginRight: 8,
  fontWeight: 'bold',
  background: theme.palette.common.white,
  '&.active': {
    color: theme.palette.common.white,
    background: darken(theme.palette.primary.main, 0.2),
  },
}));

interface OptionProps extends SelectOptions {
  isSelected?: boolean;
  onSelect: (key: string) => void;
}

export const Option = ({ KeyPressId, value, isSelected, onSelect }: OptionProps) => (
  <CardStyled
    key={KeyPressId}
    className={classnames({ active: isSelected })}
    onClick={() => onSelect(KeyPressId)}
  >
    <Box display="flex" justifyContent="flex-start" alignItems="center">
      <ChipStyled
        variant="outlined"
        color="primary" label={KeyPressId} className={classnames({ active: isSelected })}
      />
      <Typography
        sx={{
          maxWidth: 125,
          fontSize: '1.3rem',
          color: 'primary.dark',
        }}
      >
        {value}
      </Typography>
      {isSelected && (
        <>
          <span style={{ flex: 1 }} />
          <CheckIcon fontSize="small" sx={{ color: 'primary.dark', float: 'right' }} />
        </>
      )}
    </Box>
  </CardStyled>
);

interface SelectProps extends SelectChoiceBlock {}

const SelectChoice = ({ input }: SelectProps) => {
  const { selected, onSelect, ref, onKeyPress } = useSelectFn();

  useEffect(() => {
    if (typeof input?.onChange === 'function') {
      input.onChange({ target: { value: selected } } as React.ChangeEvent<HTMLInputElement>);
    }
  }, [selected]);

  return (
    <Box>
      <Box display="inline-flex" mt={1} flexWrap="nowrap" flexDirection="column">
        {input.options
          .map((opt) => (
            <Option
              {...opt}
              key={opt.KeyPressId}
              isSelected={opt.KeyPressId === selected}
              onSelect={onSelect}
            />
          ))}
      </Box>
      <input
        type="hidden"
        ref={ref}
        onKeyUp={(e: React.KeyboardEvent<HTMLInputElement>) => onKeyPress(e.key)}
      />
    </Box>
  );
};

export default SelectChoice;