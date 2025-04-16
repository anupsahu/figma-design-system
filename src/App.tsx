import { useState } from 'react';
import { Box, Container, Typography, Button, Card, CardContent, AppBar, Toolbar } from '@mui/material';
import ThemeProvider from './theme/ThemeProvider';
import ThemeSwitcher from './components/ThemeSwitcher';
import ThemeDemo from './components/ThemeDemo';
import reactLogo from './assets/react.svg';
import viteLogo from '/vite.svg';
import './App.css';

function App() {
  const [count, setCount] = useState(0);

  return (
    <ThemeProvider>
      <AppBar position="static" className="mb-4">
        <Toolbar className="justify-between">
          <Typography variant="h6" component="div">
            Tekion Design System
          </Typography>
          <ThemeSwitcher />
        </Toolbar>
      </AppBar>

      <Container maxWidth="md" className="py-8">
        <Box className="flex justify-center gap-8 mb-6">
          <a href="https://vite.dev" target="_blank" rel="noreferrer">
            <img src={viteLogo} className="logo" alt="Vite logo" />
          </a>
          <a href="https://react.dev" target="_blank" rel="noreferrer">
            <img src={reactLogo} className="logo react" alt="React logo" />
          </a>
        </Box>

        <Typography variant="h3" component="h1" className="mb-6 text-center">
          React + MUI + Tailwind + Figma Tokens
        </Typography>

        <ThemeDemo title="Theme Demonstration" />

        <Card className="mb-6 mt-6">
          <CardContent>
            <Typography variant="h5" component="h2" className="mb-4">
              Interactive Demo
            </Typography>
            <Typography variant="body1" className="mb-4">
              This starter template includes support for multiple themes, Figma tokens integration, MUI components, and Tailwind CSS utility classes.
            </Typography>
            <Button
              variant="contained"
              color="primary"
              onClick={() => setCount((count) => count + 1)}
              className="mr-4"
            >
              Count is {count}
            </Button>
            <Button variant="outlined" color="secondary">
              Secondary Button
            </Button>
          </CardContent>
        </Card>

        <Typography variant="body2" className="text-center text-gray-500">
          Click the theme toggle in the app bar to switch between light and dark modes.
        </Typography>
      </Container>
    </ThemeProvider>
  );
}

export default App;
