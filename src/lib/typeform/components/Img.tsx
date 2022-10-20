import Box from '@mui/material/Box';
import { styled } from '@mui/material/styles';

export const CenterBox = styled(Box)(() => ({
  display: 'flex',
  justifyContent: 'space-around',
}));

export const Img = styled('img')(({ theme }) => ({
  width: '100%',
  height: 'auto',
  '&.img1': {
    width: '80%',
  },
  '&.img4': {
    width: '130%',
  },
  '&.img5': {
    width: '80%',
  },
  '&.img7': {
    width: '130%',
  },
  '&.img9': {
    width: '30%',
  },
  '&.img11': {
    width: '120%',
  },
  '&.img12': {
    width: '50%',
  },
  [theme.breakpoints.down('md')]: {
    width: '70%',
    '&.img4': {
      width: '50%',
    },
    '&.img7': {
      width: '70%',
    },
    '&.img11': {
      width: '100%',
    },
  },
}));
