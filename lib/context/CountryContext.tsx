'use client';
import React, { createContext, useContext, useState, useEffect } from 'react';
import { usePathname, useRouter } from 'next/navigation';

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
  const router = useRouter();

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
    if (saved && (saved === 'japan' || saved === 'korea')) {
      setActiveCountry(saved);
    }
  }, [pathname]);

  const setCountryFocus = (c: CountryFocus) => {
    const target = c === 'all' ? 'japan' : c;
    setActiveCountry(target);
    localStorage.setItem('jkh_country', target);
    localStorage.setItem('jkh_user_selected_country', target);

    // Auto-navigate between country-scoped URLs
    if (target === 'japan') {
      if (pathname.startsWith('/korea')) {
        router.push(pathname.replace('/korea', '/japan'));
      } else if (
        pathname === '/' ||
        pathname === '/learn' ||
        pathname === '/exams' ||
        pathname === '/study' ||
        pathname === '/work' ||
        pathname === '/visa' ||
        pathname === '/life' ||
        pathname === '/skills' ||
        pathname === '/exams/skills'
      ) {
        const dest = pathname === '/' ? '/japan' : pathname === '/skills' || pathname === '/exams/skills' ? '/japan/exams/skills' : `/japan${pathname}`;
        router.push(dest);
      }
    } else if (target === 'korea') {
      if (pathname.startsWith('/japan')) {
        router.push(pathname.replace('/japan', '/korea'));
      } else if (
        pathname === '/' ||
        pathname === '/learn' ||
        pathname === '/exams' ||
        pathname === '/study' ||
        pathname === '/work' ||
        pathname === '/visa' ||
        pathname === '/life' ||
        pathname === '/skills' ||
        pathname === '/exams/skills'
      ) {
        const dest = pathname === '/' ? '/korea' : pathname === '/skills' || pathname === '/exams/skills' ? '/korea/exams/skills' : `/korea${pathname}`;
        router.push(dest);
      }
    }
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
