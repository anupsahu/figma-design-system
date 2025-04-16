import React from 'react';
import { Card as MUICard, CardContent, CardHeader, CardProps as MUICardProps, Typography } from '@mui/material';

export interface CardProps extends Omit<MUICardProps, 'title'> {
  /**
   * Card title
   */
  title?: React.ReactNode;
  
  /**
   * Card subtitle
   */
  subtitle?: React.ReactNode;
  
  /**
   * Card content
   */
  children: React.ReactNode;
  
  /**
   * Card elevation (shadow depth)
   */
  elevation?: number;
}

/**
 * Card component for displaying content in a contained box
 */
export const Card: React.FC<CardProps> = ({
  title,
  subtitle,
  children,
  elevation = 1,
  className,
  ...props
}) => {
  return (
    <MUICard 
      elevation={elevation} 
      className={`overflow-hidden ${className || ''}`}
      {...props}
    >
      {(title || subtitle) && (
        <CardHeader
          title={title && <Typography variant="h6">{title}</Typography>}
          subheader={subtitle && <Typography variant="body2" color="text.secondary">{subtitle}</Typography>}
        />
      )}
      <CardContent>
        {children}
      </CardContent>
    </MUICard>
  );
};

export default Card;
