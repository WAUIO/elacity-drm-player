import { Theme } from '@mui/material/styles';

// eslint-disable-next-line @typescript-eslint/no-unused-vars-experimental
export default function Typography(theme: Theme) {
  return {
    MuiTypography: {
      styleOverrides: {
        h3: {
          display: 'initial',
          // ...theme.gardientText(-120, [theme.palette.primary.main, 0], [theme.palette.vivid.main, 100]),
        },
        h4: {
          // display: 'initial',
          fontWeight: 400,
          // ...theme.gardientText(-120, [theme.palette.primary.main, 0], [theme.palette.vivid.main, 100]),
          display: 'block',
        },
      },
    },
  };
}
