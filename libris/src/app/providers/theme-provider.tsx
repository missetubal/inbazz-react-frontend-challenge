import { useThemeStore } from '@/features/theme/model';
import { useEffect, type ReactNode } from 'react';

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
  const theme = useThemeStore((s) => s.theme);

  useEffect(() => {
    const root = document.documentElement;
    root.classList.remove('light', 'dark');
    root.classList.add(theme);
  }, [theme]);

  return <>{children}</>;
};
