import {
  alpha, darken, Theme,
} from '@mui/material/styles';

export default function Card(theme: Theme) {
  return {
    MuiCard: {
      styleOverrides: {
        root: {
          backgroundColor: theme.palette.mode === 'light'
            ? alpha(theme.palette.background.paper, 0.5)
            : alpha(darken(theme.palette.background.paper, 0.2), 0.4),

          borderRadius: 4,
        },
      },
    },
  };
}
