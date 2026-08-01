import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { translations, Language, getNestedTranslation, replacePlaceholders } from './translations';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string, params?: Record<string, any>) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

const STORAGE_KEY = 'app-language';

const getInitialLanguage = (): Language => {
  if (typeof window === 'undefined') return 'it';
  const stored = localStorage.getItem(STORAGE_KEY);
  return stored === 'en' || stored === 'it' ? stored : 'it';
};

export const LanguageProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [language, setLanguageState] = useState<Language>(getInitialLanguage);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    localStorage.setItem(STORAGE_KEY, lang);
    document.documentElement.lang = lang;
  };

  const t = (key: string, params?: Record<string, any>): string => {
    const translation = getNestedTranslation(translations[language], key);
    
    if (!translation) {
      console.error(`[i18n] Missing translation key: ${key} for language: ${language}`);
      // In development, show the key as placeholder
      if (process.env.NODE_ENV === 'development') {
        return `[${key}]`;
      }
      // In production, try to fallback to the other language
      const fallbackLang: Language = language === 'it' ? 'en' : 'it';
      const fallbackTranslation = getNestedTranslation(translations[fallbackLang], key);
      if (fallbackTranslation) {
        console.warn(`[i18n] Using fallback translation for key: ${key}`);
        return replacePlaceholders(fallbackTranslation, params);
      }
      // If no translation found at all, return the key
      return `[${key}]`;
    }
    
    return replacePlaceholders(translation, params);
  };

  useEffect(() => {
    // Set initial document language
    document.documentElement.lang = language;
  }, []);

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useI18n = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useI18n must be used within a LanguageProvider');
  }
  return context;
};

// Re-export Language type for convenience
export type { Language };