import React from 'react';
import { useTheme } from '../../theme/ThemeProvider';
import { Button, ButtonProps } from '@mui/material';

export interface ThemeSwitcherProps extends Omit<ButtonProps, 'onClick'> {
  /**
   * Optional label for the light theme
   */
  lightLabel?: string;
  
  /**
   * Optional label for the dark theme
   */
  darkLabel?: string;
}

/**
 * A button component that toggles between light and dark themes
 */
export const ThemeSwitcher: React.FC<ThemeSwitcherProps> = ({
  lightLabel = 'Light',
  darkLabel = 'Dark',
  variant = 'contained',
  color = 'primary',
  ...props
}) => {
  const { themeMode, toggleTheme } = useTheme();
  
  return (
    <Button
      variant={variant}
      color={color}
      onClick={toggleTheme}
      {...props}
    >
      Switch to {themeMode === 'light' ? darkLabel : lightLabel}
    </Button>
  );
};

export default ThemeSwitcher;
