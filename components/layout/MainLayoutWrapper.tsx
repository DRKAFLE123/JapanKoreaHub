'use client';
import React, { useState, useEffect, createContext, useContext } from 'react';
import MobileNavbar from './MobileNavbar';
import BottomTabBar from './BottomTabBar';
import DesktopHeader from './DesktopHeader';
import Sidebar from './Sidebar';
import GlobalSearch from '../search/GlobalSearch';
import ContentProtection from '../security/ContentProtection';
import { LanguageProvider } from '@/lib/i18n/LanguageContext';
import { CountryProvider } from '@/lib/context/CountryContext';
import { ThemeProvider } from '@/lib/context/ThemeContext';

import { usePathname } from 'next/navigation';

interface SidebarCollapseContextType {
  isCollapsed: boolean;
  toggleCollapse: () => void;
  setCollapsed: (collapsed: boolean) => void;
}

const SidebarCollapseContext = createContext<SidebarCollapseContextType>({
  isCollapsed: false,
  toggleCollapse: () => {},
  setCollapsed: () => {},
});

export const useSidebarCollapse = () => useContext(SidebarCollapseContext);

export default function MainLayoutWrapper({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [user, setUser] = useState<{ name: string; email: string } | null>(null);
  const [lang, setLang] = useState<'en' | 'ne'>('en');

  useEffect(() => {
    // Load language preference
    const saved = localStorage.getItem('jkh_lang') as 'en' | 'ne' | null;
    if (saved) setLang(saved);

    // Load sidebar collapse preference
    const savedCollapse = localStorage.getItem('jkh_sidebar_collapsed');
    if (savedCollapse === 'true') setIsCollapsed(true);

    // Load user session
    const savedUser = localStorage.getItem('jkh_user');
    if (savedUser) {
      try {
        setUser(JSON.parse(savedUser));
      } catch {}
    }

    fetch('/api/auth/me')
      .then(r => r.ok ? r.json() : null)
      .then(d => {
        if (d?.user) {
          setUser(d.user);
          localStorage.setItem('jkh_user', JSON.stringify({ name: d.user.name, email: d.user.email }));
        }
      })
      .catch(() => {});
  }, []);

  const toggleLang = () => {
    const next = lang === 'en' ? 'ne' : 'en';
    setLang(next);
    localStorage.setItem('jkh_lang', next);
  };

  const toggleCollapse = () => {
    setIsCollapsed(prev => {
      const next = !prev;
      localStorage.setItem('jkh_sidebar_collapsed', String(next));
      return next;
    });
  };

  const setCollapsed = (val: boolean) => {
    setIsCollapsed(val);
    localStorage.setItem('jkh_sidebar_collapsed', String(val));
  };

  // Standalone layout for Admin CMS
  if (pathname?.startsWith('/admin')) {
    return (
      <ThemeProvider>
        <LanguageProvider>
          <CountryProvider>
            {children}
          </CountryProvider>
        </LanguageProvider>
      </ThemeProvider>
    );
  }

  return (
    <ThemeProvider>
      <LanguageProvider>
        <CountryProvider>
          <SidebarCollapseContext.Provider value={{ isCollapsed, toggleCollapse, setCollapsed }}>
            <ContentProtection />
            <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col transition-colors">
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
            
            <div className="flex flex-1 pt-14 sm:pt-16 md:pt-16">
              <Sidebar
                user={user}
                isOpen={sidebarOpen}
                isCollapsed={isCollapsed}
                onToggleCollapse={toggleCollapse}
                onClose={() => setSidebarOpen(false)}
              />
              
              {/* Main Content Area */}
              <div className={`flex-1 w-full transition-all duration-200 ${isCollapsed ? 'lg:ml-16' : 'lg:ml-64'}`}>
                {children}
              </div>
            </div>

            {/* Mobile Sticky Bottom Navigation (Visible on mobile screens) */}
            <BottomTabBar />
            
            {/* Global Search Modal */}
            <GlobalSearch isOpen={searchOpen} onClose={() => setSearchOpen(false)} />
          </div>
        </SidebarCollapseContext.Provider>
      </CountryProvider>
    </LanguageProvider>
  </ThemeProvider>
  );
}
