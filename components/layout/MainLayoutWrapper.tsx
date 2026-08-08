'use client';
import React, { useState, useEffect } from 'react';
import MobileNavbar from './MobileNavbar';
import BottomTabBar from './BottomTabBar';
import DesktopHeader from './DesktopHeader';
import Sidebar from './Sidebar';
import GlobalSearch from '../search/GlobalSearch';
import { LanguageProvider } from '@/lib/i18n/LanguageContext';
import { CountryProvider } from '@/lib/context/CountryContext';

export default function MainLayoutWrapper({ children }: { children: React.ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [user, setUser] = useState<{ name: string; email: string } | null>(null);
  const [lang, setLang] = useState<'en' | 'ne'>('en');

  useEffect(() => {
    // Load language preference
    const saved = localStorage.getItem('jkh_lang') as 'en' | 'ne' | null;
    if (saved) setLang(saved);

    // Load user session
    fetch('/api/auth/me')
      .then(r => r.ok ? r.json() : null)
      .then(d => d?.user && setUser(d.user))
      .catch(() => {});
  }, []);

  const toggleLang = () => {
    const next = lang === 'en' ? 'ne' : 'en';
    setLang(next);
    localStorage.setItem('jkh_lang', next);
  };

  return (
    <LanguageProvider>
      <CountryProvider>
        <div className="min-h-screen bg-slate-50 flex flex-col">
          {/* Mobile Top Navbar (Visible on mobile screens) */}
          <MobileNavbar
            user={user}
            lang={lang}
            onLangToggle={toggleLang}
            onSearchOpen={() => setSearchOpen(true)}
          />

          {/* Desktop Top Header (Visible on md+ screens) */}
          <DesktopHeader 
            user={user} 
            onSearchOpen={() => setSearchOpen(true)} 
            lang={lang} 
            onLangToggle={toggleLang}
            onMenuToggle={() => setSidebarOpen(!sidebarOpen)}
          />
          
          <div className="flex flex-1 pt-0 md:pt-16">
            <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
            
            {/* Main Content Area */}
            <div className="flex-1 lg:ml-64 w-full">
              {children}
            </div>
          </div>

          {/* Mobile Sticky Bottom Navigation (Visible on mobile screens) */}
          <BottomTabBar />
          
          {/* Global Search Modal */}
          <GlobalSearch isOpen={searchOpen} onClose={() => setSearchOpen(false)} />
        </div>
      </CountryProvider>
    </LanguageProvider>
  );
}
