import { Theme, Components } from '@mui/material/styles';

export default (theme: Theme): Components => ({
  MuiCssBaseline: {
    styleOverrides: {
      '@global': {
        'a[href]': {
          color: theme.palette.primary.main,
          '&:hover, &:active': {
            color: theme.palette.secondary.main,
          },
        },
      },
    },
  },
});
