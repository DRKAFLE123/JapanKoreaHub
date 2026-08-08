'use client';
import React, { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { Search, Globe, ChevronDown, User, LogIn, Menu, BookOpen, Clock, GraduationCap, Briefcase, Shield } from 'lucide-react';
import AuthSheet from '@/components/auth/AuthSheet';

import { useCountry } from '@/lib/context/CountryContext';

interface DesktopHeaderProps {
  user?: { name: string; email: string } | null;
  onSearchOpen: () => void;
  lang: 'en' | 'ne';
  onLangToggle: () => void;
  onMenuToggle?: () => void;
}

const JAPAN_DROPDOWN = [
  { label: 'Learn Japanese', href: '/japan/learn', icon: BookOpen, desc: 'Minna no Nihongo & Kanji' },
  { label: 'JLPT N5–N2', href: '/japan/exams/jlpt-n5', icon: Clock, desc: 'Exam simulator' },
  { label: 'JFT-Basic', href: '/japan/exams/jft-basic', icon: Clock, desc: '250-mark CBT test' },
  { label: 'Study in Japan', href: '/japan/study', icon: GraduationCap, desc: 'MEXT & Language schools' },
  { label: 'Work in Japan', href: '/japan/work', icon: Briefcase, desc: 'SSW-1 Skill visas' },
  { label: 'Visa Checklist', href: '/japan/visa', icon: Shield, desc: 'COE & Student visas' },
  { label: 'Life in Japan', href: '/japan/life', icon: Globe, desc: 'Cost of living & housing' },
];

const KOREA_DROPDOWN = [
  { label: 'Learn Korean', href: '/korea/learn', icon: BookOpen, desc: 'Hangul & EPS 1–60' },
  { label: 'EPS-TOPIK', href: '/korea/exams/eps-topik', icon: Clock, desc: 'Official CBT simulator' },
  { label: 'TOPIK I & II', href: '/korea/exams/topik-1', icon: Clock, desc: 'Proficiency tests' },
  { label: 'Study in Korea', href: '/korea/study', icon: GraduationCap, desc: 'GKS & D-2 Universities' },
  { label: 'Work in Korea', href: '/korea/work', icon: Briefcase, desc: 'E-9 Worker sectors' },
  { label: 'Visa Checklist', href: '/korea/visa', icon: Shield, desc: 'E-9 & D-4 Visas' },
  { label: 'Life in Korea', href: '/korea/life', icon: Globe, desc: 'Rent & Living costs' },
];

export default function DesktopHeader({ user, onSearchOpen, lang, onLangToggle, onMenuToggle }: DesktopHeaderProps) {
  const [authSheetOpen, setAuthSheetOpen] = useState(false);
  const [authMode, setAuthMode] = useState<'signin' | 'register'>('signin');
  const { activeCountry, setCountryFocus } = useCountry();

  const [openDropdown, setOpenDropdown] = useState<'japan' | 'korea' | null>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setOpenDropdown(null);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const openAuth = (mode: 'signin' | 'register') => {
    setAuthMode(mode);
    setAuthSheetOpen(true);
  };

  return (
    <>
      <header className="hidden md:flex fixed top-0 left-0 right-0 h-16 bg-white border-b border-gray-200 z-40 items-center justify-between px-6 lg:px-8">
        <div className="flex items-center gap-6 flex-1">
          {onMenuToggle && (
            <button onClick={onMenuToggle} className="lg:hidden p-2 -ml-2 text-gray-500 hover:text-gray-900 rounded-lg hover:bg-gray-100">
              <Menu className="w-5 h-5" />
            </button>
          )}
          
          {/* Brand */}
          <Link href="/" className="flex items-center gap-2">
            <img src="/logo.png" alt="JapanKoreaHub" className="w-8 h-8 rounded-lg object-contain" />
            <span className="font-bold text-lg text-gray-900 tracking-tight">JapanKoreaHub</span>
          </Link>
          
          {/* Global Search Bar */}
          <button
            onClick={onSearchOpen}
            className="flex items-center gap-3 px-4 py-2 w-full max-w-sm bg-gray-100 hover:bg-gray-200 text-gray-500 text-sm rounded-full transition-colors border border-transparent focus:border-gray-300 focus:bg-white focus:outline-none"
          >
            <Search className="w-4 h-4" />
            <span className="flex-1 text-left">Search lessons, visas, jobs...</span>
            <span className="hidden lg:inline-block px-2 py-0.5 text-xs font-semibold bg-white border border-gray-200 rounded text-gray-400">⌘K</span>
          </button>
        </div>

        <div className="flex items-center gap-4" ref={dropdownRef}>
          {/* Single Hub Switcher Pill */}
          <div className="hidden xl:flex items-center gap-1 bg-gray-100 p-1 rounded-xl border border-gray-200 text-xs font-bold">
            <button
              onClick={() => setCountryFocus('japan')}
              className={`px-2.5 py-1 rounded-lg transition-all cursor-pointer ${
                activeCountry === 'japan' ? 'bg-red-600 text-white shadow-xs' : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              🇯🇵 Japan Hub
            </button>
            <button
              onClick={() => setCountryFocus('korea')}
              className={`px-2.5 py-1 rounded-lg transition-all cursor-pointer ${
                activeCountry === 'korea' ? 'bg-blue-600 text-white shadow-xs' : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              🇰🇷 Korea Hub
            </button>
            <button
              onClick={() => setCountryFocus('all')}
              className={`px-2.5 py-1 rounded-lg transition-all cursor-pointer ${
                activeCountry === 'all' ? 'bg-gray-900 text-white shadow-xs' : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              🌏 Both
            </button>
          </div>

          {/* Dropdown Navigation */}
          <nav className="hidden lg:flex items-center gap-1 text-sm font-medium text-gray-600">
            {/* Japan Dropdown */}
            <div className="relative">
              <button
                onClick={() => setOpenDropdown(openDropdown === 'japan' ? null : 'japan')}
                onMouseEnter={() => setOpenDropdown('japan')}
                className={`flex items-center gap-1 px-3 py-2 rounded-xl transition-colors ${
                  openDropdown === 'japan' ? 'bg-red-50 text-red-700 font-bold' : 'hover:text-gray-900 hover:bg-gray-50'
                }`}
              >
                <span>🇯🇵 Japan</span>
                <ChevronDown className={`w-4 h-4 transition-transform ${openDropdown === 'japan' ? 'rotate-180 text-red-600' : 'text-gray-400'}`} />
              </button>

              {openDropdown === 'japan' && (
                <div
                  onMouseLeave={() => setOpenDropdown(null)}
                  className="absolute top-full left-0 mt-1 w-64 bg-white border border-gray-200 rounded-2xl shadow-xl p-2 z-50 animate-fade-in"
                >
                  <div className="px-3 py-2 border-b border-gray-100 mb-1">
                    <p className="text-[10px] font-black text-red-600 uppercase tracking-wider">Japan Ecosystem</p>
                  </div>
                  {JAPAN_DROPDOWN.map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={() => setOpenDropdown(null)}
                      className="flex items-center gap-3 px-3 py-2 rounded-xl hover:bg-red-50/60 transition-colors group"
                    >
                      <item.icon className="w-4 h-4 text-gray-400 group-hover:text-red-600 flex-shrink-0" />
                      <div>
                        <p className="text-xs font-bold text-gray-900 group-hover:text-red-700">{item.label}</p>
                        <p className="text-[10px] text-gray-400">{item.desc}</p>
                      </div>
                    </Link>
                  ))}
                </div>
              )}
            </div>

            {/* Korea Dropdown */}
            <div className="relative">
              <button
                onClick={() => setOpenDropdown(openDropdown === 'korea' ? null : 'korea')}
                onMouseEnter={() => setOpenDropdown('korea')}
                className={`flex items-center gap-1 px-3 py-2 rounded-xl transition-colors ${
                  openDropdown === 'korea' ? 'bg-blue-50 text-blue-700 font-bold' : 'hover:text-gray-900 hover:bg-gray-50'
                }`}
              >
                <span>🇰🇷 Korea</span>
                <ChevronDown className={`w-4 h-4 transition-transform ${openDropdown === 'korea' ? 'rotate-180 text-blue-600' : 'text-gray-400'}`} />
              </button>

              {openDropdown === 'korea' && (
                <div
                  onMouseLeave={() => setOpenDropdown(null)}
                  className="absolute top-full left-0 mt-1 w-64 bg-white border border-gray-200 rounded-2xl shadow-xl p-2 z-50 animate-fade-in"
                >
                  <div className="px-3 py-2 border-b border-gray-100 mb-1">
                    <p className="text-[10px] font-black text-blue-600 uppercase tracking-wider">Korea Ecosystem</p>
                  </div>
                  {KOREA_DROPDOWN.map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={() => setOpenDropdown(null)}
                      className="flex items-center gap-3 px-3 py-2 rounded-xl hover:bg-blue-50/60 transition-colors group"
                    >
                      <item.icon className="w-4 h-4 text-gray-400 group-hover:text-blue-600 flex-shrink-0" />
                      <div>
                        <p className="text-xs font-bold text-gray-900 group-hover:text-blue-700">{item.label}</p>
                        <p className="text-[10px] text-gray-400">{item.desc}</p>
                      </div>
                    </Link>
                  ))}
                </div>
              )}
            </div>

            <Link href="/consultancy" className="px-3 py-2 rounded-xl hover:text-gray-900 hover:bg-gray-50 transition-colors">
              Consultancy
            </Link>
          </nav>

          {/* Lang Toggle */}
          <button onClick={onLangToggle} className="flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-gray-200 text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors">
            <Globe className="w-4 h-4 text-gray-400" />
            {lang === 'en' ? 'EN' : 'ने'}
            <ChevronDown className="w-3 h-3 text-gray-400" />
          </button>

          <div className="w-px h-6 bg-gray-200 mx-1"></div>

          {/* Auth */}
          {user ? (
            <Link href="/profile" className="flex items-center gap-2 px-2 py-1 rounded-full hover:bg-gray-50 transition-colors">
              <div className="w-8 h-8 rounded-full bg-indigo-100 text-indigo-700 font-bold text-sm flex items-center justify-center">
                {user.name.charAt(0).toUpperCase()}
              </div>
              <span className="text-sm font-medium text-gray-700 hidden xl:inline-block">{user.name}</span>
            </Link>
          ) : (
            <div className="flex items-center gap-2">
              <button
                onClick={() => openAuth('signin')}
                className="px-4 py-2 text-sm font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50 rounded-full transition-colors"
              >
                Log in
              </button>
              <button
                onClick={() => openAuth('register')}
                className="px-4 py-2 text-sm font-medium text-white bg-gray-900 hover:bg-gray-800 rounded-full transition-colors"
              >
                Sign up
              </button>
            </div>
          )}
        </div>
      </header>

      {/* Auth Modal */}
      {authSheetOpen && (
        <AuthSheet
          initialMode={authMode}
          onClose={() => setAuthSheetOpen(false)}
        />
      )}
    </>
  );
}
