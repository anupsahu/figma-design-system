# Design System

A React starter template that integrates Figma tokens, MUI design, and Tailwind CSS with support for multiple themes, Storybook integration, and theme switching.

## Features

- 🎨 **Figma Tokens Integration**: Sync design tokens from Figma to your codebase
- 🎭 **Multiple Theme Support**: Built-in light and dark mode with easy theme switching
- 🧩 **Component Library**: Pre-built components using MUI and Tailwind CSS
- 📚 **Storybook Integration**: Document and test components in isolation
- 🔄 **Hot Module Replacement**: Fast development with Vite
- 🧪 **Testing Support**: Built-in testing with Vitest

## Getting Started

### Prerequisites

- Node.js (v16 or later)
- npm or yarn

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/design-system.git
   cd design-system
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

4. Open your browser and navigate to `http://localhost:5173`

## Available Scripts

- `npm run dev` - Start the development server
- `npm run build` - Build the project for production
- `npm run preview` - Preview the production build
- `npm run storybook` - Start Storybook for component development
- `npm run build-storybook` - Build Storybook for deployment
- `npm run build:tokens` - Build design tokens from Figma

## Design Tokens

This project uses Style Dictionary to manage design tokens. The tokens are stored in the `tokens/src` directory and are organized by category:

- `colors.json` - Color tokens
- `typography.json` - Typography tokens
- `spacing.json` - Spacing tokens
- `themes.json` - Theme-specific tokens

### Syncing Tokens from Figma

To sync tokens from Figma:

1. Export tokens from Figma using the [Tokens Studio for Figma](https://tokens.studio/) plugin
2. Save the exported JSON file to the `tokens/src` directory
3. Run `npm run build:tokens` to generate the CSS variables

## Theme Switching

The project includes a built-in theme switching mechanism. You can use the `ThemeProvider` component to wrap your application and the `useTheme` hook to access and change the current theme:

```jsx
import { useTheme } from './theme/ThemeProvider';

function MyComponent() {
  const { themeMode, toggleTheme } = useTheme();

  return (
    <div>
      <p>Current theme: {themeMode}</p>
      <button onClick={toggleTheme}>Toggle Theme</button>
    </div>
  );
}
```

## Storybook

This project includes Storybook for component development and documentation. To start Storybook:

```bash
npm run storybook
```

Storybook includes a theme switcher in the toolbar that allows you to preview components in different themes.

## Project Structure

```
design-system/
├── .storybook/          # Storybook configuration
├── public/              # Public assets
├── src/
│   ├── assets/          # Static assets
│   ├── components/      # UI components
│   ├── styles/          # Global styles
│   ├── theme/           # Theme configuration
│   ├── App.tsx          # Main application component
│   └── main.tsx         # Application entry point
├── tokens/
│   ├── src/             # Source token files
│   ├── build/           # Built token files
│   ├── build.js         # Token build script
│   └── config.js        # Style Dictionary configuration
├── index.html           # HTML entry point
├── package.json         # Project dependencies and scripts
├── tailwind.config.js   # Tailwind CSS configuration
└── vite.config.ts       # Vite configuration
```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- [MUI](https://mui.com/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Style Dictionary](https://amzn.github.io/style-dictionary/)
- [Storybook](https://storybook.js.org/)
- [Vite](https://vitejs.dev/)
