import { Link, Outlet, useRouterState } from '@tanstack/react-router';
import { BookOpen, LogOut, Menu, X } from 'lucide-react';
import { Button } from '../ui';
import { getNavItems } from '@/shared';
import { useEffect, useState } from 'react';
import { LanguageToggle } from './language-toggle';
import { ThemeToggle } from './theme-toggle';
import { useAuthStore } from '@/features';
import { AnimatePresence, motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';

export const AppLayout = () => {
  const routerState = useRouterState();
  const navItems = getNavItems();
  const [mobileOpen, setMobileOpen] = useState(false);

  const isActive = (path: string) => routerState.location.pathname === path;
  const { user, logout } = useAuthStore();
  const { t } = useTranslation('common');

  useEffect(() => {
    if (mobileOpen) {
      setMobileOpen(false);
    }
  }, [routerState.location.pathname]);

  return (
    <div className='min-h-screen bg-background'>
      <header className='sticky top-0 z-50 border-b border-border/50 bg-background/80 backdrop-blur-xl'>
        <div className='max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between'>
          <Link to='/discover' className='flex items-center gap-3'>
            <div className='w-9 h-9 rounded-xl bg-primary/10 flex items-center justify-center'>
              <BookOpen className='w-5 h-5 text-primary' />
            </div>
            <span className='font-serif font-bold text-lg hidden sm:block'>
              {t('nav.name')}
            </span>
          </Link>
          <nav className='hidden md:flex items-center gap-1'>
            {navItems.map((item) => (
              <Link key={item.path} to={item.path}>
                <Button
                  variant={isActive(item.path) ? 'secondary' : 'ghost'}
                  className={`gap-2 ${isActive(item.path) ? 'bg-primary/10 text-primary hover:bg-primary/15' : ''}`}
                >
                  <item.icon className='w-4 h-4' />
                  {t(item.label)}
                </Button>
              </Link>
            ))}
          </nav>
          <div className='flex items-center gap-2'>
            <LanguageToggle />
            <ThemeToggle />
            <div className='hidden sm:flex items-center gap-2 ml-2 pl-2 border-l border-border'>
              <span className='text-sm text-muted-foreground'>
                {user?.name}
              </span>
              <Button variant='ghost' size='icon' onClick={logout}>
                <LogOut className='w-4 h-4' />
                <span className='sr-only'>{t('nav.logout')}</span>
              </Button>
            </div>
            <Button
              variant='ghost'
              size='icon'
              className='md:hidden'
              onClick={() => setMobileOpen(!mobileOpen)}
            >
              {mobileOpen ? (
                <X className='w-5 h-5' />
              ) : (
                <Menu className='w-5 h-5' />
              )}
              <span className='sr-only'>
                {mobileOpen ? t('nav.closeMenu') : t('nav.openMenu')}
              </span>
            </Button>
          </div>
        </div>

        <AnimatePresence>
          {mobileOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className='md:hidden border-t border-border overflow-hidden'
            >
              <div className='p-4 space-y-2'>
                {navItems.map((item) => (
                  <Link
                    key={item.path}
                    to={item.path}
                    onClick={() => setMobileOpen(false)}
                  >
                    <Button
                      variant={isActive(item.path) ? 'secondary' : 'ghost'}
                      className='w-full justify-start gap-2'
                    >
                      <item.icon className='w-4 h-4' />
                      {item.label}
                    </Button>
                  </Link>
                ))}
                <div className='flex flex-col gap-2 pt-2 border-t border-border'>
                  <ThemeToggle />
                  <LanguageToggle />{' '}
                  <Button
                    variant='ghost'
                    size='sm'
                    onClick={logout}
                    className='gap-2 justify-start text-destructive'
                  >
                    <LogOut className='w-4 h-4' />
                    {t('nav.logout')}
                  </Button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      <main className='max-w-7xl mx-auto px-4 sm:px-6 py-8'>
        <Outlet />
      </main>
    </div>
  );
};
