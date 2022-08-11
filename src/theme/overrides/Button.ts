import {
  Theme, darken, Components,
} from '@mui/material/styles';

export default (theme: Theme): Components => ({
  MuiButton: {
    styleOverrides: {
      root: {
        '&:hover': {
          boxShadow: 'none',
        },
      },
      sizeLarge: {
        height: 48,
      },
      containedInherit: {
        color: theme.palette.grey[800],
        boxShadow: theme.shadows[0],
        '&:hover': {
          backgroundColor: theme.palette.grey[400],
        },
      },
      containedPrimary: {
        boxShadow: theme.shadows[0],
        '&:hover': {
          backgroundColor: darken(theme.palette.primary.main, 0.1),
        },
      },
      containedSecondary: {
        boxShadow: theme.shadows[0],
      },
      outlinedInherit: {
        border: `1px solid ${theme.palette.grey[500]}`,
        '&:hover': {
          backgroundColor: theme.palette.action.hover,
        },
      },
      textInherit: {
        '&:hover': {
          backgroundColor: theme.palette.action.hover,
        },
      },
    },
  },
});
