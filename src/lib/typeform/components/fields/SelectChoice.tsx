import React from 'react';
import classnames from 'classnames';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import CheckIcon from '@mui/icons-material/Check';
import { styled } from '@mui/material/styles';
import { darken, alpha } from '@mui/material';
import Chip from '@mui/material/Chip';
import { keyframes } from '@mui/system';
import { SelectChoiceBlock, SelectOptions } from '../../types';
import useSelectFn from '../../hooks/useSelectFn';

const blink = keyframes`
  from { opacity: 1.0; }
  to { opacity: 0.0; }
`;

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
    background: alpha(theme.palette.primary.main, 0.3),
    animation: `${blink} 0.2s linear`,
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
  const { ref, onSelect, isSelected } = useSelectFn(input);
  return (
    <Box ref={ref} mt={2}>
      {input.placeholder && <Typography color="primary.dark" variant="body2">{input.placeholder}</Typography>}
      <Box display="inline-flex" mt={1} flexWrap="nowrap" flexDirection="column">
        {input.options
          .map((opt) => (
            <Option
              {...opt}
              key={opt.KeyPressId}
              isSelected={isSelected(opt.KeyPressId)}
              onSelect={onSelect}
            />
          ))}
      </Box>
    </Box>
  );
};

export default SelectChoice;
