import { BookOpen } from 'lucide-react';
import { useTranslation } from 'react-i18next';

export const Footer = () => {
  const { t } = useTranslation('landing');
  return (
    <footer className='border-t border-border/40 py-8 px-5'>
      <div className='max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4'>
        <div className='flex items-center gap-2 text-muted-foreground'>
          <BookOpen className='w-4 h-4 text-primary' />
          <span className='text-sm font-medium'>{t('footer.name')}</span>
        </div>
        <p className='text-xs text-muted-foreground'>
          {t('footer.data')}
          <a
            href='https://developers.google.com/books'
            target='_blank'
            rel='noopener noreferrer'
            className='text-primary hover:underline'
          >
            {t('footer.api')}
          </a>
        </p>
      </div>
    </footer>
  );
};
