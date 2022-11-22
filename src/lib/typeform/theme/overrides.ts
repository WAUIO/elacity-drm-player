// eslint-disable-next-line @typescript-eslint/no-unused-vars-experimental
import { Theme, Components } from '@mui/material/styles';

// @todo: followup on https://github.com/mui/material-ui/issues/30483#issuecomment-1004792181
// seems having issue with override feature
export default {
  MuiButtonBase: {
    defaultProps: {
      elevation: 0,
    },
    styleOverrides: {
      root: {
        boxShadow: 'none',
      },
    },
  },
  MuiButton: {
    defaultProps: {
      elevation: 0,
    },
    styleOverrides: {
      root: {
        boxShadow: 'none',
      },
      sizeLarge: {
        height: 48,
        fontSize: '1.36rem',
      },
      containedPrimary: {
        boxShadow: 'none',
      },
    },
  },
  MuiButtonGroup: {
    defaultProps: {
      disableRipple: true,
      elevation: 0,
    },
  },
} as Components;
