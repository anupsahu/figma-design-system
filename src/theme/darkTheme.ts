import { createTheme } from '@mui/material/styles';
import { colors, fonts, spacing, themes } from './tokens';

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: themes.dark.primary,
      light: colors.primary[300],
      dark: colors.primary[600],
    },
    secondary: {
      main: themes.dark.secondary,
      light: colors.secondary[300],
      dark: colors.secondary[600],
    },
    background: {
      default: themes.dark.background,
      paper: colors.neutral[800],
    },
    text: {
      primary: themes.dark.text,
      secondary: colors.neutral[400],
    },
  },
  typography: {
    fontFamily: fonts.family.base,
    h1: {
      fontSize: fonts.size['6xl'],
      fontWeight: fonts.weight.bold,
      lineHeight: fonts.lineHeight.tight,
    },
    h2: {
      fontSize: fonts.size['5xl'],
      fontWeight: fonts.weight.bold,
      lineHeight: fonts.lineHeight.tight,
    },
    h3: {
      fontSize: fonts.size['4xl'],
      fontWeight: fonts.weight.semibold,
      lineHeight: fonts.lineHeight.tight,
    },
    h4: {
      fontSize: fonts.size['3xl'],
      fontWeight: fonts.weight.semibold,
      lineHeight: fonts.lineHeight.tight,
    },
    h5: {
      fontSize: fonts.size['2xl'],
      fontWeight: fonts.weight.medium,
      lineHeight: fonts.lineHeight.tight,
    },
    h6: {
      fontSize: fonts.size.xl,
      fontWeight: fonts.weight.medium,
      lineHeight: fonts.lineHeight.normal,
    },
    body1: {
      fontSize: fonts.size.base,
      lineHeight: fonts.lineHeight.normal,
    },
    body2: {
      fontSize: fonts.size.sm,
      lineHeight: fonts.lineHeight.normal,
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: spacing[1],
          textTransform: 'none',
          fontWeight: fonts.weight.medium,
        },
      },
    },
  },
});

export default darkTheme;
