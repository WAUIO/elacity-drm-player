import { Theme, Components } from '@mui/material/styles';

export default (theme: Theme): Components => ({
  MuiIconButton: {
    variants: [
      {
        props: { color: 'default' },
        style: {
          '&:hover': { backgroundColor: theme.palette.action.hover },
        },
      },
      {
        props: { color: 'inherit' },
        style: {
          '&:hover': { backgroundColor: theme.palette.action.hover },
        },
      },
    ],

    styleOverrides: {
      root: {},
    },
  },
});
