import { ThemeProvider } from './providers';
import { RouterProvider } from '@tanstack/react-router';
import { router } from './router';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useAuthStore } from '@/features';
import { useShelfStore } from '@/features/shelf/models/shelf-store';
import { useEffect } from 'react';
import { Toaster } from 'sonner';

export default function App() {
  const queryClient = new QueryClient();
  const { user, isAuthenticated } = useAuthStore();
  const initializeAuth = useAuthStore((state) => state.initializeAuth);
  const setShelfUserId = useShelfStore((state) => state.setUserId);

  useEffect(() => {
    initializeAuth();
  }, [initializeAuth]);

  useEffect(() => {
    if (isAuthenticated && user?.id) {
      setShelfUserId(user.id);
    } else {
      setShelfUserId(null);
    }
  }, [isAuthenticated, user?.id, setShelfUserId]);

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <Toaster position='top-right' richColors />
        <RouterProvider router={router} />
      </ThemeProvider>
    </QueryClientProvider>
  );
}
