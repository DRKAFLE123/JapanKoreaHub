'use client';
import React, { createContext, useContext, useState, useEffect } from 'react';
import { en, TranslationKeys } from './en';
import { ne } from './ne';

export type Language = 'en' | 'ne';
export type LanguageMode = 'en' | 'ne' | 'both';

interface LanguageContextType {
  lang: Language;
  langMode: LanguageMode;
  setLang: (lang: Language) => void;
  setLangMode: (mode: LanguageMode) => void;
  toggleLang: () => void;
  t: (key: TranslationKeys) => string;
  formatMeaning: (meaningEn: string, meaningNe?: string) => { primary: string; secondary?: string; fullText: string };
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLangState] = useState<Language>('en');
  const [langMode, setLangModeState] = useState<LanguageMode>('both');

  useEffect(() => {
    const savedLang = localStorage.getItem('jkh_lang') as Language | null;
    if (savedLang === 'en' || savedLang === 'ne') {
      setLangState(savedLang);
    }
    const savedMode = localStorage.getItem('jkh_lang_mode') as LanguageMode | null;
    if (savedMode === 'en' || savedMode === 'ne' || savedMode === 'both') {
      setLangModeState(savedMode);
    }
  }, []);

  const setLang = (newLang: Language) => {
    setLangState(newLang);
    localStorage.setItem('jkh_lang', newLang);
  };

  const setLangMode = (newMode: LanguageMode) => {
    setLangModeState(newMode);
    localStorage.setItem('jkh_lang_mode', newMode);
    // Also keep lang in sync for UI labels
    if (newMode === 'ne') {
      setLangState('ne');
      localStorage.setItem('jkh_lang', 'ne');
    } else if (newMode === 'en') {
      setLangState('en');
      localStorage.setItem('jkh_lang', 'en');
    }
  };

  const toggleLang = () => {
    const nextMode: LanguageMode = langMode === 'en' ? 'ne' : langMode === 'ne' ? 'both' : 'en';
    setLangMode(nextMode);
  };

  const t = (key: TranslationKeys): string => {
    const dict = lang === 'ne' || langMode === 'ne' ? ne : en;
    return dict[key] || en[key] || key;
  };

  const formatMeaning = (meaningEn: string, meaningNe?: string) => {
    if (langMode === 'en') {
      return { primary: meaningEn || meaningNe || '', fullText: meaningEn || meaningNe || '' };
    }
    if (langMode === 'ne') {
      const main = meaningNe || meaningEn || '';
      return { primary: main, fullText: main };
    }
    // 'both' mode
    if (meaningNe && meaningNe !== meaningEn) {
      return { primary: meaningEn, secondary: meaningNe, fullText: `${meaningEn} • ${meaningNe}` };
    }
    return { primary: meaningEn, fullText: meaningEn };
  };

  return (
    <LanguageContext.Provider value={{ lang, langMode, setLang, setLangMode, toggleLang, t, formatMeaning }}>
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

