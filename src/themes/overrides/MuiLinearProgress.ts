import { alpha, Theme } from '@mui/material/styles';

export default function LinearProgress(theme: Theme) {
  return {
    MuiLinearProgress: {
      styleOverrides: {
        root: {
          background: alpha(theme.palette.vivid.main, 0.25),
        },
        barColorPrimary: {
          background: `linear-gradient(90deg, transparent 0, ${theme.palette.primary.main} 50%, transparent 100%)`,
        },
      },
    },
  };
}
