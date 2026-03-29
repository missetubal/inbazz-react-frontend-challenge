import { useTranslation } from 'react-i18next';
import {
  Button,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui';
import { getLanguagesDetails, LANGUAGES_MAP } from '@/shared';
import { useLanguageStore } from '@/shared/store';

export const LanguageToggle = () => {
  const { setLanguage, language } = useLanguageStore();
  const availableLanguages = getLanguagesDetails();
  const { t } = useTranslation('common');

  const currentLanguageDetails = LANGUAGES_MAP[language];

  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <Button variant='ghost' size='icon' className='hidden sm:flex'>
          <span className='text-xl'>{currentLanguageDetails.flagIcon}</span>
          <span className='sr-only'>{t('toggleLanguage')}</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align='end'>
        {availableLanguages.map((language) => (
          <DropdownMenuItem
            key={language.id}
            onClick={() => setLanguage(language.id)}
          >
            {t(language.label)}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
