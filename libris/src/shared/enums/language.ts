export type Language = 'pt-BR' | 'en-US';

export interface LanguageDetails {
  id: Language;
  label: string;
  flagIcon?: string;
}

export interface LanguageState {
  language: Language;
  setLanguage: (lang: Language) => void;
}

export const LANGUAGES_MAP = {
  'pt-BR': {
    id: 'pt-BR',
    label: 'language.pt-BR',
    flagIcon: '🇧🇷',
  },
  'en-US': {
    id: 'en-US',
    label: 'language.en-US',
    flagIcon: '🇺🇸',
  },
} as const;

export type LanguageKey = keyof typeof LANGUAGES_MAP;
export type LanguageValue = (typeof LANGUAGES_MAP)[LanguageKey];

export const getLanguagesDetails = (): LanguageDetails[] => {
  return Object.values(LANGUAGES_MAP);
};
