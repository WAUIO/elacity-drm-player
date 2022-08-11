import React, { CSSProperties } from 'react';
import type { FC, PropsWithChildren } from 'react';
import { isAppleMobile } from '@elacity-js/lib';
import { deepmerge } from '@mui/utils';
import {
  createTheme,
  ThemeOptions,
  Theme,
  alpha,
  responsiveFontSizes,
  ThemeProvider as MuiProvider,
  PaletteColor,
} from '@mui/material/styles';
import { CssBaseline } from '@mui/material';
import { ThemeValue, IUserPreferences } from '../types/user';
import useAppSettings from '../hooks/useAppSettings';
import componentsOverrides from './overrides';
import { commonOptions, colors as bcolors } from './common';
import darkTheme from './dark';
import lightTheme from './light';

interface GlassyProperties {
  backgroundColor?: string;
  backdropFilter?: string;
  WebkitBackdropFilter?: string;
}

declare type GradientColorOption = string | [string, number];

declare module '@mui/material/styles' {
  interface Palette {
    vivid: PaletteColor;
    vivid2: PaletteColor;
    badge1: PaletteColor;
  }

  interface PaletteOptions {
    vivid?: PaletteOptions['primary'];
    vivid2?: PaletteOptions['secondary'];
    badge1?: PaletteOptions['primary'];
  }

  interface TypeBackground {
    sidebar?: string;
  }

  interface Theme {
    // @todo: see https://www.youtube.com/watch?v=hv0rNxr1XXk
    glassy: (background: string, value: number, blur: number) => GlassyProperties;
    gardientBackground: (tilt: number, ...colors: GradientColorOption[]) => CSSProperties;
    gardientText: (tilt: number, ...colors: GradientColorOption[]) => CSSProperties;
    radialRadientBackground: (...colors: GradientColorOption[]) => CSSProperties;
  }
}

const themes: Record<ThemeValue, ThemeOptions> = {
  light: lightTheme,
  dark: darkTheme,
};

/**
 * Create gradient value
 *
 * @param tilt
 * @param colors
 * @returns
 */
const createGradient = (tilt: number | null, ...colors: GradientColorOption[]): string[] => {
  const values = [];
  if (typeof tilt === 'number') {
    values.push(`${tilt}deg`);
  }
  colors.forEach((c: GradientColorOption, i: number) => {
    if (typeof c === 'string') {
      // eslint-disable-next-line no-param-reassign
      c = [c as string, Math.ceil(100 * (colors.length - 1 - i))];
    }

    values.push(`${c[0]} ${c[1]}%`);
  });

  return values;
};

const createThemeWith = (config: IUserPreferences = {}): Theme => {
  const userOptions = themes[config.theme || 'light'];

  const theme = createTheme(deepmerge(deepmerge({ direction: config.direction || 'ltr' }, commonOptions), userOptions));

  // implement glassy spec
  // for further details about what it is, see
  // https://uxdesign.cc/glassmorphism-in-user-interfaces-1f39bb1308c9
  theme.glassy = (background: string, value = 1, blur = 0) => ({
    backdropFilter: `blur(${2 * blur}px)`,
    WebkitBackdropFilter: `blur(${2 * blur}px)`, // Fix on Mobile
    background: alpha(background, value),
  });

  // setup gradient helper
  theme.gardientBackground = (tilt: number, ...colors: GradientColorOption[]) => ({
    background: `linear-gradient(${createGradient(tilt, ...colors).join(', ')})`,
  });
  theme.gardientText = (tilt: number, ...colors: GradientColorOption[]) => ({
    ...(isAppleMobile()
      ? {
        color: theme.palette.primary.main,
      }
      : {
        background: `-webkit-linear-gradient(${createGradient(tilt, ...colors).join(', ')})`,
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
        WebkitBoxDecorationBreak: 'clone',
      }),
  });
  theme.radialRadientBackground = (...colors: GradientColorOption[]) => ({
    background: `radial-gradient(circle at center, ${createGradient(null, ...colors).join(', ')})`,
  });

  theme.palette.error = theme.palette.augmentColor({ color: { main: bcolors.error }, name: 'error' });
  theme.palette.success = theme.palette.augmentColor({ color: { main: bcolors.success }, name: 'success' });
  theme.palette.vivid = theme.palette.augmentColor({ color: { main: bcolors.vivid }, name: 'vivid' });
  theme.palette.vivid2 = theme.palette.augmentColor({ color: { main: bcolors.vivid2 }, name: 'vivid2' });
  theme.palette.badge1 = theme.palette.augmentColor({ color: { main: bcolors.badge1 }, name: 'badge1' });

  theme.components = componentsOverrides(theme);

  return responsiveFontSizes(theme);
};

interface ThemeProviderProps {}

export const ThemeProvider: FC<PropsWithChildren<ThemeProviderProps>> = ({
  children,
}: PropsWithChildren<ThemeProviderProps>) => {
  const { values } = useAppSettings();
  const theme: Theme = React.useMemo(() => createThemeWith(values), [values.theme]);

  return (
    <MuiProvider theme={theme}>
      <CssBaseline />
      {children}
    </MuiProvider>
  );
};

export default createThemeWith;
