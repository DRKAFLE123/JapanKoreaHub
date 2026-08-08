'use client';
import React, { createContext, useContext, useState, useEffect } from 'react';
import { en, TranslationKeys } from './en';
import { ne } from './ne';

type Language = 'en' | 'ne';

interface LanguageContextType {
  lang: Language;
  setLang: (lang: Language) => void;
  toggleLang: () => void;
  t: (key: TranslationKeys) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLangState] = useState<Language>('en');

  useEffect(() => {
    const saved = localStorage.getItem('jkh_lang') as Language | null;
    if (saved === 'en' || saved === 'ne') {
      setLangState(saved);
    }
  }, []);

  const setLang = (newLang: Language) => {
    setLangState(newLang);
    localStorage.setItem('jkh_lang', newLang);
  };

  const toggleLang = () => {
    setLang(lang === 'en' ? 'ne' : 'en');
  };

  const t = (key: TranslationKeys): string => {
    const dict = lang === 'ne' ? ne : en;
    return dict[key] || en[key] || key;
  };

  return (
    <LanguageContext.Provider value={{ lang, setLang, toggleLang, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useTranslation() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useTranslation must be used within a LanguageProvider');
  }
  return context;
}
