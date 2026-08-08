'use client';
import React, { createContext, useContext, useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';

export type CountryFocus = 'japan' | 'korea' | 'all';

interface CountryContextType {
  activeCountry: CountryFocus;
  setCountryFocus: (c: CountryFocus) => void;
  getScopedUrl: (path: 'learn' | 'exams' | 'study' | 'work' | 'visa' | 'life') => string;
}

const CountryContext = createContext<CountryContextType>({
  activeCountry: 'japan',
  setCountryFocus: () => {},
  getScopedUrl: (path) => `/${path}`,
});

export function CountryProvider({ children }: { children: React.ReactNode }) {
  const [activeCountry, setActiveCountry] = useState<CountryFocus>('japan');
  const pathname = usePathname();

  useEffect(() => {
    // 1. Check URL path first
    if (pathname.startsWith('/japan')) {
      setActiveCountry('japan');
      localStorage.setItem('jkh_country', 'japan');
      return;
    }
    if (pathname.startsWith('/korea')) {
      setActiveCountry('korea');
      localStorage.setItem('jkh_country', 'korea');
      return;
    }

    // 2. Otherwise load saved preference
    const saved = localStorage.getItem('jkh_country') as CountryFocus | null;
    if (saved && (saved === 'japan' || saved === 'korea' || saved === 'all')) {
      setActiveCountry(saved);
    }
  }, [pathname]);

  const setCountryFocus = (c: CountryFocus) => {
    setActiveCountry(c);
    localStorage.setItem('jkh_country', c);
  };

  const getScopedUrl = (path: 'learn' | 'exams' | 'study' | 'work' | 'visa' | 'life') => {
    if (activeCountry === 'japan') return `/japan/${path}`;
    if (activeCountry === 'korea') return `/korea/${path}`;
    return `/${path}`;
  };

  return (
    <CountryContext.Provider value={{ activeCountry, setCountryFocus, getScopedUrl }}>
      {children}
    </CountryContext.Provider>
  );
}

export function useCountry() {
  return useContext(CountryContext);
}
