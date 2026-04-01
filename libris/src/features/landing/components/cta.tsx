import { FadeInSection } from '@/components/custom';
import { Button } from '@/components/ui/button';
import { Link } from '@tanstack/react-router';
import { ArrowRight, BookOpen } from 'lucide-react';
import { useTranslation } from 'react-i18next';

export const Cta = () => {
  const { t } = useTranslation('landing');
  return (
    <section className='py-24 px-5'>
      <div className='max-w-6xl mx-auto'>
        <FadeInSection>
          <div className='relative rounded-3xl overflow-hidden border border-primary/20 bg-linear-to-br from-primary/5 via-background to-accent/20 p-12 sm:p-16 text-center'>
            <div className='absolute inset-0 bg-primary/3 pointer-events-none' />
            <div className='absolute -top-20 -right-20 w-64 h-64 bg-primary/10 rounded-full blur-3xl pointer-events-none' />
            <div className='relative'>
              <div className='inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-primary/15 mb-6'>
                <BookOpen className='w-8 h-8 text-primary' />
              </div>
              <h2 className='text-3xl sm:text-4xl font-serif font-bold tracking-tight mb-4'>
                {t('cta.title')}
              </h2>
              <p className='text-muted-foreground max-w-md mx-auto mb-8 leading-relaxed'>
                {t('cta.subtitle')}
              </p>
              <Link to='/register'>
                <Button
                  size='lg'
                  className='h-12 px-8 text-base font-semibold gap-2'
                >
                  {t('cta.joinNow')}
                  <ArrowRight className='w-4 h-4' />
                </Button>
              </Link>
            </div>
          </div>
        </FadeInSection>
      </div>
    </section>
  );
};
