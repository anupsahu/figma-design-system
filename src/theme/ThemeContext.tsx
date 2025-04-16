import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

// Define theme types
export type ThemeMode = 'light' | 'dark';

// Define the context type
interface ThemeContextType {
  themeMode: ThemeMode;
  toggleTheme: () => void;
  setThemeMode: (mode: ThemeMode) => void;
}

// Create the context with default values
const ThemeContext = createContext<ThemeContextType>({
  themeMode: 'light',
  toggleTheme: () => {},
  setThemeMode: () => {},
});

// Custom hook to use the theme context
export const useThemeContext = () => useContext(ThemeContext);

// Props for the ThemeProvider component
interface ThemeProviderProps {
  children: ReactNode;
  defaultTheme?: ThemeMode;
}

// ThemeProvider component
export const ThemeContextProvider: React.FC<ThemeProviderProps> = ({
  children,
  defaultTheme = 'light',
}) => {
  // Initialize theme state
  const [themeMode, setThemeMode] = useState<ThemeMode>(defaultTheme);
  
  // Update theme when defaultTheme prop changes
  useEffect(() => {
    setThemeMode(defaultTheme);
  }, [defaultTheme]);
  
  // Toggle theme function
  const toggleTheme = () => {
    setThemeMode(prevMode => (prevMode === 'light' ? 'dark' : 'light'));
  };
  
  // Apply theme to document body
  useEffect(() => {
    document.body.setAttribute('data-theme', themeMode);
    
    // Save theme to localStorage
    try {
      localStorage.setItem('themeMode', themeMode);
    } catch (e) {
      console.warn('Failed to save theme to localStorage:', e);
    }
  }, [themeMode]);
  
  // Context value
  const contextValue = {
    themeMode,
    toggleTheme,
    setThemeMode,
  };
  
  return (
    <ThemeContext.Provider value={contextValue}>
      {children}
    </ThemeContext.Provider>
  );
};

export default ThemeContextProvider;
