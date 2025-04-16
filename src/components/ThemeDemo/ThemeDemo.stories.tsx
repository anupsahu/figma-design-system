import type { Meta, StoryObj } from '@storybook/react';
import { ThemeDemo } from './ThemeDemo';

const meta = {
  title: 'Components/ThemeDemo',
  component: ThemeDemo,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    title: { control: 'text' },
  },
} satisfies Meta<typeof ThemeDemo>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    title: 'Theme Demonstration',
  },
};
