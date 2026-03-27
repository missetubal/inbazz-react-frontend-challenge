import { ThemeProvider } from './providers';
import { RouterProvider } from '@tanstack/react-router';
import { router } from './router';

export default function App() {
  return (
    <ThemeProvider>
      <RouterProvider router={router} />
    </ThemeProvider>
  );
}
