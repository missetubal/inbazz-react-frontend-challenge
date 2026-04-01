import { LanguageToggle, ThemeToggle } from '@/components/custom';
import { Button } from '@/components/ui';
import { Link } from '@tanstack/react-router';
import { ArrowRight, BookOpen } from 'lucide-react';
import { useTranslation } from 'react-i18next';

export const Navbar = () => {
  const { t } = useTranslation('landing');
  return (
    <header className='fixed top-0 inset-x-0 z-50 border-b border-border/30 bg-background/70 backdrop-blur-xl'>
      <div className='max-w-6xl mx-auto px-5 h-16 flex items-center justify-between'>
        <div className='flex items-center gap-3'>
          <div className='w-8 h-8 rounded-xl bg-primary/15 flex items-center justify-center'>
            <BookOpen className='w-4 h-4 text-primary' />
          </div>
          <span className='font-serif font-bold text-base'>
            {t('navbar.name')}
          </span>
        </div>
        <div className='flex items-center gap-2'>
          <LanguageToggle />
          <ThemeToggle />
          <Link to='/login'>
            <Button variant='ghost' size='sm'>
              {t('navbar.login')}
            </Button>
          </Link>
          <Link to='/register'>
            <Button size='sm' className='gap-1.5 rounded-xl'>
              {t('navbar.start')} <ArrowRight className='w-3.5 h-3.5' />
            </Button>
          </Link>
        </div>
      </div>
    </header>
  );
};
