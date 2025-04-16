import React from 'react';
import { Box, Typography, Paper, useTheme as useMuiTheme } from '@mui/material';
import { useTheme } from '../../theme/ThemeProvider';

export interface ThemeDemoProps {
  /**
   * Optional title for the demo
   */
  title?: string;
}

/**
 * A component that demonstrates the current theme
 */
export const ThemeDemo: React.FC<ThemeDemoProps> = ({
  title = 'Theme Demo',
}) => {
  const { themeMode, toggleTheme } = useTheme();
  const muiTheme = useMuiTheme();

  return (
    <Paper 
      elevation={3} 
      sx={{ 
        p: 4, 
        maxWidth: 600,
        borderRadius: 2,
      }}
    >
      <Typography variant="h4" component="h1" gutterBottom>
        {title}
      </Typography>
      
      <Typography variant="body1" paragraph>
        Current theme: <strong>{themeMode}</strong>
      </Typography>
      
      <Box sx={{ mb: 4 }}>
        <Typography variant="h6" gutterBottom>
          Color Palette
        </Typography>
        
        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2, mb: 3 }}>
          {['primary', 'secondary', 'error', 'warning', 'info', 'success'].map((color) => (
            <Box 
              key={color}
              sx={{
                width: 100,
                p: 2,
                bgcolor: `${color}.main`,
                color: `${color}.contrastText`,
                borderRadius: 1,
                textAlign: 'center',
              }}
            >
              {color}
            </Box>
          ))}
        </Box>
        
        <Typography variant="h6" gutterBottom>
          Text Colors
        </Typography>
        
        <Box sx={{ mb: 3 }}>
          <Typography color="text.primary">Primary Text</Typography>
          <Typography color="text.secondary">Secondary Text</Typography>
          <Typography color="text.disabled">Disabled Text</Typography>
        </Box>
        
        <Typography variant="h6" gutterBottom>
          Background Colors
        </Typography>
        
        <Box sx={{ display: 'flex', gap: 2 }}>
          <Box 
            sx={{
              width: 100,
              height: 100,
              bgcolor: 'background.default',
              border: '1px solid',
              borderColor: 'divider',
              borderRadius: 1,
              p: 1,
            }}
          >
            <Typography variant="caption">Default</Typography>
          </Box>
          <Box 
            sx={{
              width: 100,
              height: 100,
              bgcolor: 'background.paper',
              border: '1px solid',
              borderColor: 'divider',
              borderRadius: 1,
              p: 1,
            }}
          >
            <Typography variant="caption">Paper</Typography>
          </Box>
        </Box>
      </Box>
      
      <button 
        onClick={toggleTheme}
        className="px-4 py-2 bg-primary-600 text-white rounded-md hover:bg-primary-700 transition-colors"
      >
        Toggle Theme
      </button>
    </Paper>
  );
};

export default ThemeDemo;
