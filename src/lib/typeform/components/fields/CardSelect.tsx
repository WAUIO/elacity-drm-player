import React from 'react';
import classnames from 'classnames';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import CheckIcon from '@mui/icons-material/Check';
import { styled } from '@mui/material/styles';
import { darken, alpha } from '@mui/material';
import Chip from '@mui/material/Chip';
import { keyframes } from '@mui/system';
import { SelectCardBlock, SelectOptions } from '../../types';
import useSelectFn from '../../hooks/useSelectFn';

const blink = keyframes`
  from { opacity: 1.0; }
  to { opacity: 0.0; }
`;

const CardStyled = styled(Card)(({ theme }) => ({
  width: 174,
  minHeight: 200,
  marginRight: theme.spacing(1),
  marginBottom: theme.spacing(1),
  background: alpha(theme.palette.primary.main, 0.1),
  cursor: 'pointer',
  '&:hover': {
    background: alpha(theme.palette.primary.main, 0.2),
  },
  '&.active': {
    borderColor: darken(theme.palette.primary.main, 0.2),
    animation: `${blink} 0.2s linear`,
  },
}));

const CardContentStyled = styled(CardContent)(() => ({
  width: '100%',
  padding: 0,
  justifyContent: 'center',
  display: 'flex',
}));

const CardChecked = styled('div')(({ theme }) => ({
  position: 'relative',
  background: darken(theme.palette.primary.main, 0.2),
  color: theme.palette.common.white,
  float: 'right',
  transform: 'rotate(45deg)',
  top: -14,
  right: -25,
  width: 60,
  height: 40,
}));

const CheckedIconStyled = styled(CheckIcon)(() => ({
  transform: 'rotate(-45deg)',
  top: 19,
  position: 'fixed',
  right: 24,
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

const HideBox = styled(Box)(() => ({
  height: 40,
}));

interface CustomCardProps extends SelectOptions {
  isSelected?: boolean;
  onSelect: (key: string) => void;
}

export const CustomCard = ({ icon: Icon, KeyPressId, value, isSelected, onSelect }: CustomCardProps) => (
  <CardStyled
    variant="outlined"
    key={KeyPressId}
    className={classnames({ active: isSelected })}
    onClick={() => onSelect(KeyPressId)}
  >
    {isSelected ? <CardChecked><CheckedIconStyled fontSize="small" /></CardChecked> : <HideBox /> }
    {Icon && (
      <CardContentStyled>
        <Icon sx={{ fontSize: 125 }} />
      </CardContentStyled>
    )}
    <CardActions>
      <Box display="flex">
        <ChipStyled
          variant="outlined"
          color="primary"
          label={KeyPressId}
          className={classnames({ active: isSelected })}
        />
        <Typography sx={{ maxWidth: 125 }}>{value}</Typography>
      </Box>
    </CardActions>
  </CardStyled>
);

interface CardSelectProps extends SelectCardBlock {}

const CardSelect = ({ input }: CardSelectProps) => {
  const { onSelect, ref, onKeyPress, isSelected } = useSelectFn(input);

  return (
    <Box>
      <input
        style={{ opacity: 0 }} ref={ref}
        onKeyUp={(e: React.KeyboardEvent<HTMLInputElement>) => onKeyPress(e.key)}
      />
      <Box display="flex" mt={1} flexWrap="wrap">
        {input.options
          .map((opt) => (
            <CustomCard
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

export default CardSelect;
