import { FadeInSection } from '@/components/custom';
import { FEATURES } from '../contants';
import { useTranslation } from 'react-i18next';

export const Features = () => {
  const { t } = useTranslation('landing');
  return (
    <section className='py-24 px-5'>
      <div className='max-w-6xl mx-auto'>
        <FadeInSection className='text-center mb-16'>
          <h2 className='text-3xl sm:text-4xl font-serif font-bold tracking-tight'>
            {t('features.title')}
          </h2>
          <p className='text-muted-foreground mt-3 max-w-md mx-auto'>
            {t('features.subtitle')}
          </p>
        </FadeInSection>

        <div className='grid sm:grid-cols-2 lg:grid-cols-3 gap-6'>
          {FEATURES.map((feature, index) => (
            <FadeInSection key={feature.title} delay={index * 0.1}>
              <div className='group p-6 rounded-2xl border border-border/50 bg-card hover:border-primary/30 hover:shadow-lg hover:shadow-primary/5 transition-all duration-300 h-full'>
                <div
                  className={`w-11 h-11 rounded-xl flex items-center justify-center mb-4 ${feature.color}`}
                >
                  <feature.icon className='w-5 h-5' />
                </div>
                <h3 className='font-semibold text-sm mb-2'>
                  {t(feature.title)}
                </h3>
                <p className='text-muted-foreground text-sm leading-relaxed'>
                  {t(feature.description)}
                </p>
              </div>
            </FadeInSection>
          ))}
        </div>
      </div>
    </section>
  );
};
