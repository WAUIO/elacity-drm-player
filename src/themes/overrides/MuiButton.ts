import { Theme, darken } from '@mui/material/styles';

export default function Button(theme: Theme) {
  return {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'capitalize',
          '&:hover': {
            // boxShadow: theme.shadows[6],
          },
        },
        sizeLarge: {
          height: 48,
        },
        containedInherit: {
          color: theme.palette.grey[800],
          boxShadow: theme.shadows[6],
          '&:hover': {
            backgroundColor: theme.palette.grey[400],
          },
        },
        containedPrimary: {
          boxShadow: theme.shadows[6],
          '&:hover': {
            backgroundColor: darken(theme.palette.primary.main, 0.1),
          },
        },
        containedSecondary: {
          boxShadow: theme.shadows[6],
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
  };
}
