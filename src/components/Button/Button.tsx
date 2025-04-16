import React from 'react';
import { Button as MUIButton, ButtonProps as MUIButtonProps } from '@mui/material';

export interface ButtonProps extends MUIButtonProps {
  /**
   * The variant of the button.
   */
  variant?: 'contained' | 'outlined' | 'text';
  
  /**
   * The size of the button.
   */
  size?: 'small' | 'medium' | 'large';
  
  /**
   * The color of the button.
   */
  color?: 'primary' | 'secondary' | 'error' | 'info' | 'success' | 'warning';
  
  /**
   * The content of the button.
   */
  children: React.ReactNode;
}

/**
 * Primary UI component for user interaction
 */
export const Button: React.FC<ButtonProps> = ({
  variant = 'contained',
  size = 'medium',
  color = 'primary',
  children,
  className,
  ...props
}) => {
  return (
    <MUIButton
      variant={variant}
      size={size}
      color={color}
      className={`rounded ${className || ''}`}
      {...props}
    >
      {children}
    </MUIButton>
  );
};

export default Button;
