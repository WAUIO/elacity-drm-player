import { ThemeOptions } from '@mui/material/styles';
import { colors } from './common';

export default {
  palette: {
    mode: 'dark',
    primary: {
      main: colors.primary,
    },
    secondary: {
      main: colors.accent,
    },
    background: {
      paper: '#131A22',
      default: '#080B0F',
      sidebar: '#131A22',
    },
  },
} as ThemeOptions;
