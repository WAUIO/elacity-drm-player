// eslint-disable-next-line @typescript-eslint/no-unused-vars-experimental
import { Theme, Components } from '@mui/material/styles';

export default {
  MuiButtonBase: {
    defaultProps: {
      disableElevation: true,
    },
    styleOverrides: {
      root: {
        boxShadow: 'none',
      },
    },
  },
  MuiButton: {
    defaultProps: {
      disableElevation: true,
      elevation: 0,
      color: 'secondary',
    },
    styleOverrides: {
      root: {
        boxShadow: 'none',
      },
      sizeLarge: {
        height: 56,
        fontSize: '1.4rem',
      },
      containedPrimary: {
        boxShadow: 'none',
      },
    },
  },
} as Components;
