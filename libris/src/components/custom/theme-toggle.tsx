import { Moon, Sun } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { Button } from '@/components/ui';
import { useThemeStore } from '@/shared/store';

export const ThemeToggle = () => {
  const theme = useThemeStore((s) => s.theme);
  const toggleTheme = useThemeStore((s) => s.toggleTheme);
  const { t } = useTranslation('common');

  return (
    <Button
      variant='ghost'
      size='icon'
      aria-label={t('toggleTheme')}
      onClick={toggleTheme}
    >
      {theme === 'light' ? (
        <Moon className='h-5 w-5' />
      ) : (
        <Sun className='h-5 w-5' />
      )}
    </Button>
  );
};
