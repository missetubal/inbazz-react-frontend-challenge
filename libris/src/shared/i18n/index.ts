import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

import ptCommon from './locales/pt-BR/common.json';
import enCommon from './locales/en-US/common.json';
import enAuth from './locales/en-US/auth.json';
import ptAuth from './locales/pt-BR/auth.json';
import ptLanding from './locales/pt-BR/landing.json';
import enLanding from './locales/en-US/landing.json';
import ptShelf from './locales/pt-BR/shelf.json';
import enShelf from './locales/pt-BR/shelf.json';
import ptDiscover from './locales/pt-BR/discover.json';
import enDiscover from './/locales/en-US/discover.json';

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    fallbackLng: 'pt-BR',
    supportedLngs: ['pt-BR', 'en-US'],
    resources: {
      'pt-BR': {
        common: ptCommon,
        auth: ptAuth,
        landing: ptLanding,
        shelf: ptShelf,
        discover: ptDiscover,
      },
      'en-US': {
        common: enCommon,
        auth: enAuth,
        landing: enLanding,
        shelf: enShelf,
        discover: enDiscover,
      },
    },
    defaultNS: 'common',
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;
