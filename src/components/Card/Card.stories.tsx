import type { Meta, StoryObj } from '@storybook/react';
import { Card } from './Card';
import { Typography, Button, Box } from '@mui/material';

const meta = {
  title: 'Components/Card',
  component: Card,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    elevation: {
      control: { type: 'range', min: 0, max: 24, step: 1 },
    },
  },
} satisfies Meta<typeof Card>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Basic: Story = {
  args: {
    title: 'Card Title',
    subtitle: 'Card Subtitle',
    children: (
      <Typography variant="body1">
        This is a basic card with a title and subtitle.
      </Typography>
    ),
  },
};

export const WithActions: Story = {
  args: {
    title: 'Card with Actions',
    subtitle: 'Interactive card example',
    children: (
      <>
        <Typography variant="body1" className="mb-4">
          This card contains interactive elements that demonstrate the theme's styling.
        </Typography>
        <Box className="flex gap-2">
          <Button variant="contained" color="primary">
            Primary Action
          </Button>
          <Button variant="outlined" color="secondary">
            Secondary Action
          </Button>
        </Box>
      </>
    ),
  },
};

export const Elevated: Story = {
  args: {
    title: 'Elevated Card',
    elevation: 8,
    children: (
      <Typography variant="body1">
        This card has increased elevation to create a more prominent shadow effect.
      </Typography>
    ),
  },
};

export const NoHeader: Story = {
  args: {
    children: (
      <Typography variant="body1">
        This card has no header, only content.
      </Typography>
    ),
  },
};
