import {
  alpha, darken, Theme,
} from '@mui/material/styles';

export default function Popover(theme: Theme) {
  return {
    MuiPopover: {
      styleOverrides: {
        paper: {
          backdropFilter: 'blur(10px)',
          backgroundColor: theme.palette.mode === 'light'
            ? alpha(theme.palette.background.paper, 0.8)
            : alpha(darken(theme.palette.background.paper, 0.2), 0.7),
        },
      },
    },
  };
}
