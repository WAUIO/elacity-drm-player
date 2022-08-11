import { ThemeOptions } from '@mui/material/styles';
import { colors } from './common';

export default {
  palette: {
    mode: 'light',
    primary: {
      main: colors.primary,
    },
    secondary: {
      main: colors.accent,
    },
    background: {
      paper: '#FFFFFF',
      default: '#F1F3F5',
      sidebar: '#FFFFFF',
    },
  },
} as ThemeOptions;
