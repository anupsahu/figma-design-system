import React from 'react';
import { ThemeContextProvider } from './ThemeContext';
import { MUIThemeProvider } from './MUIThemeProvider';
import type { ThemeMode } from './ThemeContext';

interface ThemeProviderProps {
  children: React.ReactNode;
  defaultTheme?: ThemeMode;
}

export const ThemeProvider: React.FC<ThemeProviderProps> = ({
  children,
  defaultTheme = 'light',
}) => {
  return (
    <ThemeContextProvider defaultTheme={defaultTheme}>
      <MUIThemeProvider>
        {children}
      </MUIThemeProvider>
    </ThemeContextProvider>
  );
};

// Re-export the useThemeContext hook as useTheme for backward compatibility
export { useThemeContext as useTheme } from './ThemeContext';
export type { ThemeMode } from './ThemeContext';

export default ThemeProvider;
