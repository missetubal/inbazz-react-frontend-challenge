import { useTranslation } from 'react-i18next';
import { useLanguageStore } from '../model';
import { Button } from '@/components/ui';

export const LanguageToggle = () => {
  const language = useLanguageStore((s) => s.language);
  const setLanguage = useLanguageStore((s) => s.setLanguage);
  const { t } = useTranslation('common');

  const toggle = () => {
    setLanguage(language === 'pt-BR' ? 'en-US' : 'pt-BR');
  };

  return (
    <Button variant='ghost' size='sm' onClick={toggle}>
      {t('toggleLanguage')}
    </Button>
  );
};
