import React, { createContext, useContext, useState, useEffect } from "react";

export type TalentPoolLanguage = 'it' | 'en';

interface TalentPoolLanguageContextType {
  language: TalentPoolLanguage;
  setLanguage: (lang: TalentPoolLanguage) => void;
  t: (key: string) => string;
}

const TalentPoolLanguageContext = createContext<TalentPoolLanguageContextType | undefined>(undefined);

const LANGUAGE_STORAGE_KEY = 'talentPoolLanguage';

/** Pick the initial language: a previously saved choice wins, otherwise we
 *  auto-detect from the browser (Italian visitors get IT, everyone else EN)
 *  so the landing no longer defaults the whole Italian audience to English. */
const getInitialLanguage = (): TalentPoolLanguage => {
  if (typeof window === 'undefined') return 'en';
  const saved = window.localStorage.getItem(LANGUAGE_STORAGE_KEY);
  if (saved === 'it' || saved === 'en') return saved;
  const browser = (window.navigator.language || '').toLowerCase();
  return browser.startsWith('it') ? 'it' : 'en';
};

export const TalentPoolLanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguageState] = useState<TalentPoolLanguage>(getInitialLanguage);

  const [translations, setTranslations] = useState<Record<string, any>>({});

  useEffect(() => {
    const loadTranslations = async () => {
      try {
        const module = await import(`../locales/talentpool/${language}.json`);
        setTranslations(module.default);
      } catch (error) {
        console.error('Error loading translations:', error);
      }
    };
    loadTranslations();
  }, [language]);

  // Switch language and persist the choice so it carries across pages (each
  // page mounts its own provider, so localStorage is what keeps them in sync).
  const setLanguage = (lang: TalentPoolLanguage) => {
    setLanguageState(lang);
    if (typeof window !== 'undefined') {
      window.localStorage.setItem(LANGUAGE_STORAGE_KEY, lang);
    }
  };

  const t = (key: string): string => {
    const keys = key.split('.');
    let result: any = translations;
    
    for (const k of keys) {
      if (result && typeof result === 'object' && k in result) {
        result = result[k];
      } else {
        console.warn(`Translation key not found: ${key}`);
        return key;
      }
    }
    
    return typeof result === 'string' ? result : key;
  };

  return (
    <TalentPoolLanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </TalentPoolLanguageContext.Provider>
  );
};

export const useTalentPoolLanguage = () => {
  const context = useContext(TalentPoolLanguageContext);
  if (!context) {
    throw new Error('useTalentPoolLanguage must be used within TalentPoolLanguageProvider');
  }
  return context;
};
