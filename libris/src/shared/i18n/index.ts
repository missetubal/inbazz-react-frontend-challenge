import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

import ptCommon from './locales/pt-BR/common.json';
import enCommon from './locales/en-US/common.json';
import enAuth from './locales/en-US/auth.json';
import ptAuth from './locales/pt-BR/auth.json';

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    fallbackLng: 'pt-BR',
    supportedLngs: ['pt-BR', 'en-US'],
    resources: {
      'pt-BR': { common: ptCommon, auth: ptAuth },
      'en-US': { common: enCommon, auth: enAuth },
    },
    defaultNS: 'common',
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;
