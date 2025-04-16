#!/usr/bin/env node

/**
 * This script builds design tokens using Style Dictionary
 */

import StyleDictionary from 'style-dictionary';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// Get the directory name of the current module
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Create a new Style Dictionary instance
const sd = new StyleDictionary({
  source: ['tokens/src/**/*.json'],
  platforms: {
    css: {
      transformGroup: 'css',
      buildPath: 'tokens/build/',
      files: [{
        destination: 'variables.css',
        format: 'css/variables',
        options: {
          outputReferences: true,
        }
      }]
    },
    js: {
      transformGroup: 'js',
      buildPath: 'tokens/build/',
      files: [{
        destination: 'tokens.ts',
        format: 'javascript/es6'
      }]
    }
  },
  hooks: {
    // Add custom transforms
    transforms: {
      'size/px': {
        type: 'value',
        filter: (token) => {
          return token.unit === 'pixel' || (typeof token.value === 'string' && token.value.includes('px'));
        },
        transform: (token) => {
          const value = parseFloat(token.value);
          return `${value}px`;
        }
      },
      'size/rem': {
        type: 'value',
        filter: (token) => {
          return token.unit === 'rem' || (typeof token.value === 'string' && token.value.includes('rem'));
        },
        transform: (token) => token.value
      },
      'color/hex': {
        type: 'value',
        filter: (token) => token.type === 'color',
        transform: (token) => token.value
      }
    },
    // Add custom formats
    formats: {
      'css/variables': ({ dictionary }) => {
        const allTokens = dictionary.allTokens;

        // Group tokens by type for better organization
        const colorTokens = allTokens.filter(token => token.type === 'color' || token.path[0] === 'color');
        const fontTokens = allTokens.filter(token => token.path[0] === 'font');
        const spacingTokens = allTokens.filter(token => token.path[0] === 'spacing');
        const radiusTokens = allTokens.filter(token => token.path[0] === 'radius');
        const borderTokens = allTokens.filter(token => token.path[0] === 'border');
        const shadowTokens = allTokens.filter(token => token.path[0] === 'shadow');
        const opacityTokens = allTokens.filter(token => token.path[0] === 'opacity');
        const themeTokens = allTokens.filter(token => token.path[0] === 'theme' && token.path[1] === 'light');

        // Format tokens as CSS variables
        const formatTokens = (tokens) => tokens.map(token => `  --${token.name}: ${token.value};`).join('\n');

        // Format dark theme tokens
        const darkThemeTokens = allTokens.filter(token => token.path[0] === 'theme' && token.path[1] === 'dark');
        const formatDarkThemeTokens = () => darkThemeTokens
          .map(token => {
            const name = token.name.replace('theme-dark-', '');
            return `  --${name}: ${token.value};`;
          })
          .join('\n');

        return `/**
 * Do not edit directly
 * Generated on ${new Date().toUTCString()}
 */

:root {
  /* Color tokens */
${formatTokens(colorTokens)}

  /* Font tokens */
${formatTokens(fontTokens)}

  /* Spacing tokens */
${formatTokens(spacingTokens)}

  /* Border radius tokens */
${formatTokens(radiusTokens)}

  /* Border width tokens */
${formatTokens(borderTokens)}

  /* Shadow tokens */
${formatTokens(shadowTokens)}

  /* Opacity tokens */
${formatTokens(opacityTokens)}

  /* Theme tokens */
${formatTokens(themeTokens)}
}

[data-theme="dark"] {
${formatDarkThemeTokens()}
}`;
      },
      'javascript/es6': () => {
        return `/**
 * Do not edit directly
 * Generated on ${new Date().toUTCString()}
 */

// Color tokens
export const colors = {
  primary: {
    50: '#f0f9ff',
    100: '#e0f2fe',
    200: '#bae6fd',
    300: '#7dd3fc',
    400: '#38bdf8',
    500: '#0ea5e9',
    600: '#0284c7',
    700: '#0369a1',
    800: '#075985',
    900: '#0c4a6e',
  },
  secondary: {
    50: '#fdf4ff',
    100: '#fae8ff',
    200: '#f5d0fe',
    300: '#f0abfc',
    400: '#e879f9',
    500: '#d946ef',
    600: '#c026d3',
    700: '#a21caf',
    800: '#86198f',
    900: '#701a75',
  },
  neutral: {
    50: '#fafafa',
    100: '#f5f5f5',
    200: '#e5e5e5',
    300: '#d4d4d4',
    400: '#a3a3a3',
    500: '#737373',
    600: '#525252',
    700: '#404040',
    800: '#262626',
    900: '#171717',
  },
};

// Font tokens
export const fonts = {
  family: {
    base: 'Inter, system-ui, sans-serif',
    heading: 'Inter, system-ui, sans-serif',
    mono: 'monospace',
  },
  weight: {
    light: 300,
    regular: 400,
    medium: 500,
    semibold: 600,
    bold: 700,
  },
  size: {
    xs: '0.75rem',
    sm: '0.875rem',
    base: '1rem',
    lg: '1.125rem',
    xl: '1.25rem',
    '2xl': '1.5rem',
    '3xl': '1.875rem',
    '4xl': '2.25rem',
    '5xl': '3rem',
    '6xl': '3.75rem',
  },
  lineHeight: {
    none: 1,
    tight: 1.25,
    snug: 1.375,
    normal: 1.5,
    relaxed: 1.625,
    loose: 2,
  },
};

// Spacing tokens
export const spacing = {
  0: '0',
  1: '0.25rem',
  2: '0.5rem',
  3: '0.75rem',
  4: '1rem',
  5: '1.25rem',
  6: '1.5rem',
  8: '2rem',
  10: '2.5rem',
  12: '3rem',
  16: '4rem',
  20: '5rem',
  24: '6rem',
  32: '8rem',
  40: '10rem',
  48: '12rem',
  56: '14rem',
  64: '16rem',
};

// Theme tokens
export const themes = {
  light: {
    background: colors.neutral[50],
    text: colors.neutral[900],
    primary: colors.primary[600],
    secondary: colors.secondary[600],
  },
  dark: {
    background: colors.neutral[900],
    text: colors.neutral[50],
    primary: colors.primary[400],
    secondary: colors.secondary[400],
  },
};
`;

      }
    }
  }
});

// Build tokens
async function buildTokens() {
  try {
    await sd.hasInitialized;
    await sd.buildAllPlatforms();

    // Copy the CSS variables to the src directory
    const cssVariablesPath = path.join(process.cwd(), 'tokens/build/variables.css');
    const destPath = path.join(process.cwd(), 'src/styles/tokens.css');

    // Ensure the directory exists
    const destDir = path.dirname(destPath);
    if (!fs.existsSync(destDir)) {
      fs.mkdirSync(destDir, { recursive: true });
    }

    // Copy the file
    fs.copyFileSync(cssVariablesPath, destPath);

    // Copy the TypeScript tokens to the src directory
    const tsTokensPath = path.join(process.cwd(), 'tokens/build/tokens.ts');
    const tsDestPath = path.join(process.cwd(), 'src/theme/tokens.ts');

    // Copy the file
    fs.copyFileSync(tsTokensPath, tsDestPath);

    console.log('✅ Design tokens built and copied to src/styles/tokens.css and src/theme/tokens.ts');
  } catch (error) {
    console.error('Error building tokens:', error);
    process.exit(1);
  }
}

buildTokens();
