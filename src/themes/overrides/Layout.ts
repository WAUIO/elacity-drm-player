/* eslint-disable max-len */
/* eslint-disable react/destructuring-assignment */
import { Theme } from '@mui/material/styles';

const APPBAR_MOBILE = 64;
const APPBAR_DESKTOP = 64;

export default function IconButton(theme: Theme) {
  return {
    MainLayout: {
      styleOverrides: {
        root: {
          paddingTop: APPBAR_MOBILE + 24,
          // since we have footer, we will remove bottom padding
          paddingBottom: theme.spacing(0),
          [theme.breakpoints.up('lg')]: {
            paddingTop: APPBAR_DESKTOP,
            paddingLeft: theme.spacing(2),
            paddingRight: theme.spacing(2),
          },
        },
        noPadding: {
          paddingTop: APPBAR_MOBILE,
          [theme.breakpoints.up('lg')]: {
            paddingTop: APPBAR_DESKTOP,
            paddingLeft: theme.spacing(0),
            paddingRight: theme.spacing(0),
          },
        },
        withBottomNav: {
          paddingBottom: theme.spacing(6),
        },
      },
    },
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          // enforced background to be transparent as we will set the background
          // color in MainLayout.Background component
          // background: 'transparent',
          // background: theme.palette.mode === 'light'
          //   ? `radial-gradient(circle at center, ${theme.palette.vivid.main} -450%, ${theme.palette.background.default} 50%)`
          //   : `radial-gradient(circle at center, ${theme.palette.vivid.main} -200%, ${theme.palette.background.default} 50%)`,
          [theme.breakpoints.up('md')]: {
            minHeight: 600,
          },
        },
        // pulse effect
        '@keyframes pulse': {
          '0%': {
            opacity: 0.8,
            filter: 'grayscale(0.7) blur(5px)',
          },
          '50%': {
            opacity: 0.95,
            filter: 'grayscale(0.7) blur(7px)',
          },
          '100%': {
            opacity: 0.8,
            filter: 'grayscale(0.7) blur(5px)',
          },
        },
        '@-webkit-keyframes pulse': {
          '0%': {
            opacity: 0.8,
            webkitFilter: 'grayscale(0.7) blur(5px)',
          },
          '50%': {
            opacity: 0.95,
            filter: 'grayscale(0.7) blur(7px)',
          },
          '100%': {
            opacity: 0.8,
            webkitFilter: 'grayscale(0.7) blur(5px)',
          },
        },

        // opacity animation
        '@keyframes op': {
          '0%': {
            opacity: 1,
          },
          '50%': {
            opacity: 0.7,
          },
          '100%': {
            opacity: 1,
          },
        },
        '@-webkit-keyframes op': {
          '0%': {
            opacity: 1,
          },
          '50%': {
            opacity: 0.7,
          },
          '100%': {
            opacity: 1,
          },
        },

        // animate gradient
        '@keyframes animatedgradient': {
          '0%': {
            backgroundPosition: '0% 50%',
          },
          '50%': {
            backgroundPosition: '100% 50%',
          },
          '100%': {
            backgroundPosition: '0% 50%',
          },
        },

        // loading fade
        '@-webkit-keyframes loadingFade': {
          '0%': {
            opacity: 0,
          },
          '50%': {
            opacity: 0.8,
          },
          '100%': {
            opacity: 0,
          },
        },
        '@-moz-keyframes loadingFade': {
          '0%': {
            opacity: 0,
          },
          '50%': {
            opacity: 0.8,
          },
          '100%': {
            opacity: 0,
          },
        },
        '@keyframes loadingFade': {
          '0%': {
            opacity: 0,
          },
          '50%': {
            opacity: 0.8,
          },
          '100%': {
            opacity: 0,
          },
        },
      },
    },
  };
}
