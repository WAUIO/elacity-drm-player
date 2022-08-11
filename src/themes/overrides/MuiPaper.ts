import {
  alpha, darken, Theme,
} from '@mui/material/styles';

export default function Paper(theme: Theme) {
  return {
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundColor: theme.palette.mode === 'light'
            ? alpha(theme.palette.background.paper, 0.4)
            : alpha(darken(theme.palette.background.paper, 0.2), 0.4),
        },
      },
    },
  };
}
