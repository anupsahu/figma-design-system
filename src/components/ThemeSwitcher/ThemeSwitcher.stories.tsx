import type { Meta, StoryObj } from '@storybook/react';
import { ThemeSwitcher } from './ThemeSwitcher';
import { Box, Typography, Paper } from '@mui/material';

const meta = {
  title: 'Components/ThemeSwitcher',
  component: ThemeSwitcher,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: { type: 'select' },
      options: ['contained', 'outlined', 'text'],
    },
    color: {
      control: { type: 'select' },
      options: ['primary', 'secondary', 'error', 'info', 'success', 'warning'],
    },
    lightLabel: { control: 'text' },
    darkLabel: { control: 'text' },
  },
} satisfies Meta<typeof ThemeSwitcher>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    lightLabel: 'Light Theme',
    darkLabel: 'Dark Theme',
  },
};

export const WithThemeDemo: Story = {
  render: (args) => (
    <Paper elevation={3} sx={{ p: 4, maxWidth: 500 }}>
      <Typography variant="h4" gutterBottom>
        Theme Demonstration
      </Typography>
      
      <Box sx={{ mb: 4 }}>
        <Typography variant="body1" paragraph>
          This component demonstrates the current theme and allows switching between light and dark modes.
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
      </Box>
      
      <ThemeSwitcher {...args} />
    </Paper>
  ),
  args: {
    variant: 'contained',
    color: 'primary',
  },
};
