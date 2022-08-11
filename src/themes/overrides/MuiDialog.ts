import type { CSSProperties } from 'react';
import { Theme } from '@mui/material/styles';

export default function IconButton(theme: Theme) {
  let paperStyles: CSSProperties = {};
  let containerStyles: CSSProperties = {};
  // eslint-disable-next-line default-case
  switch (theme.palette.mode) {
  case 'light':
    paperStyles = theme.glassy(theme.palette.background.paper, 0.7, 1);
    containerStyles = theme.glassy(theme.palette.grey[50], 0.5, 3);
    break;
  case 'dark':
    paperStyles = theme.glassy(theme.palette.background.paper, 0.7, 1);
    containerStyles = theme.glassy(theme.palette.grey[50], 0.6, 3);
    break;
  }

  return {
    MuiDialog: {
      styleOverrides: {
        paper: {
          backgroundImage: 'none',
          ...paperStyles,
          backdropFilter: 'blur(4px) opacity(0.9)',
          WebkitBackdropFilter: 'blur(4px) opacity(0.9)',
        },
        container: {
          ...containerStyles,
        },
      },
    },
  };
}
