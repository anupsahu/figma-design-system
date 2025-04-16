import React from 'react';
import { ThemeProvider as MUIProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { useThemeContext } from './ThemeContext';
import { lightTheme, darkTheme } from './index';

interface MUIThemeProviderProps {
  children: React.ReactNode;
}

export const MUIThemeProvider: React.FC<MUIThemeProviderProps> = ({ children }) => {
  const { themeMode } = useThemeContext();
  
  // Select the appropriate theme based on the current theme mode
  const theme = themeMode === 'light' ? lightTheme : darkTheme;
  
  return (
    <MUIProvider theme={theme}>
      <CssBaseline />
      {children}
    </MUIProvider>
  );
};

export default MUIThemeProvider;
