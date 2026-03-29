import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import i18n from '../i18n';
import { LANGUAGES_MAP, type LanguageState } from '../enums';

export const useLanguageStore = create<LanguageState>()(
  persist(
    (set) => ({
      language: LANGUAGES_MAP['pt-BR'].id,
      setLanguage: (language) => {
        i18n.changeLanguage(language);
        set({ language });
      },
    }),
    { name: 'language' },
  ),
);
