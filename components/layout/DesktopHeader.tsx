'use client';
import React, { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { Search, Globe, ChevronDown, User, LogIn, Menu, BookOpen, Clock, GraduationCap, Briefcase, Shield, Moon, Sun, Bell, ArrowRight } from 'lucide-react';
import AuthSheet from '@/components/auth/AuthSheet';

import { useCountry } from '@/lib/context/CountryContext';
import { useTheme } from '@/lib/context/ThemeContext';
import NotificationBell from '@/components/notifications/NotificationBell';
import LanguageDropdown from '@/components/layout/LanguageDropdown';

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
  const { isDark, toggleTheme } = useTheme();

  const [openDropdown, setOpenDropdown] = useState<'japan' | 'korea' | null>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);
  const profileDropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setOpenDropdown(null);
      }
      if (profileDropdownRef.current && !profileDropdownRef.current.contains(e.target as Node)) {
        setProfileDropdownOpen(false);
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
      <header className="hidden md:flex fixed top-0 left-0 right-0 h-16 bg-white/95 backdrop-blur-md border-b border-slate-200 z-40 items-center justify-between px-6 lg:px-8 text-slate-900 shadow-xs">
        <div className="flex items-center gap-6 flex-1">
          {onMenuToggle && (
            <button onClick={onMenuToggle} className="lg:hidden p-2 -ml-2 text-slate-500 hover:text-slate-900 rounded-lg hover:bg-slate-100">
              <Menu className="w-5 h-5" />
            </button>
          )}
          
          {/* Brand */}
          <Link href="/" className="flex items-center gap-2">
            <img src="/logo.png" alt="JapanKoreaHub" className="w-8 h-8 rounded-lg object-contain" />
            <span className="font-bold text-lg text-slate-900 tracking-tight">JapanKoreaHub</span>
          </Link>
          
          {/* Global Search Bar */}
          <button
            onClick={onSearchOpen}
            className="flex items-center gap-3 px-4 py-2 w-full max-w-sm bg-slate-100 hover:bg-slate-200/80 text-slate-500 text-sm rounded-full transition-colors border border-slate-200 focus:border-slate-400 focus:outline-none cursor-pointer"
          >
            <Search className="w-4 h-4 text-slate-400" />
            <span className="flex-1 text-left">Search lessons, visas, jobs...</span>
            <span className="hidden lg:inline-block px-2 py-0.5 text-xs font-semibold bg-white border border-slate-200 rounded text-slate-400">⌘K</span>
          </button>
        </div>

        <div className="flex items-center gap-4" ref={dropdownRef}>
          <nav 
            className="hidden lg:flex items-center gap-1 text-sm font-medium text-slate-600"
            onMouseLeave={() => setOpenDropdown(null)}
          >
            <div className="relative">
              <button
                onClick={() => setOpenDropdown(openDropdown === 'japan' ? null : 'japan')}
                onMouseEnter={() => setOpenDropdown('japan')}
                className={`flex items-center gap-1 px-3 py-2 rounded-xl transition-colors cursor-pointer ${
                  openDropdown === 'japan' ? 'bg-red-50 text-red-700 font-bold' : 'hover:text-slate-900 hover:bg-slate-100'
                }`}
              >
                <span>🇯🇵 Japan</span>
                <ChevronDown className={`w-4 h-4 transition-transform ${openDropdown === 'japan' ? 'rotate-180 text-red-600' : 'text-slate-400'}`} />
              </button>

              {openDropdown === 'japan' && (
                <div
                  onMouseLeave={() => setOpenDropdown(null)}
                  className="absolute top-full left-0 mt-1 w-64 bg-white border border-slate-200 rounded-2xl shadow-xl p-2 z-50 animate-fade-in"
                >
                  <div className="px-3 py-2 border-b border-slate-100 mb-1">
                    <p className="text-[10px] font-black text-red-600 uppercase tracking-wider">Japan Ecosystem</p>
                  </div>
                  {JAPAN_DROPDOWN.map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={() => setOpenDropdown(null)}
                      className="flex items-center gap-3 px-3 py-2 rounded-xl hover:bg-red-50/60 transition-colors group"
                    >
                      <item.icon className="w-4 h-4 text-slate-400 group-hover:text-red-600 flex-shrink-0" />
                      <div>
                        <p className="text-xs font-bold text-slate-900 group-hover:text-red-700">{item.label}</p>
                        <p className="text-[10px] text-slate-400">{item.desc}</p>
                      </div>
                    </Link>
                  ))}
                </div>
              )}
            </div>

            <div className="relative">
              <button
                onClick={() => setOpenDropdown(openDropdown === 'korea' ? null : 'korea')}
                onMouseEnter={() => setOpenDropdown('korea')}
                className={`flex items-center gap-1 px-3 py-2 rounded-xl transition-colors cursor-pointer ${
                  openDropdown === 'korea' ? 'bg-blue-50 text-blue-700 font-bold' : 'hover:text-slate-900 hover:bg-slate-100'
                }`}
              >
                <span>🇰🇷 Korea</span>
                <ChevronDown className={`w-4 h-4 transition-transform ${openDropdown === 'korea' ? 'rotate-180 text-blue-600' : 'text-slate-400'}`} />
              </button>

              {openDropdown === 'korea' && (
                <div
                  onMouseLeave={() => setOpenDropdown(null)}
                  className="absolute top-full left-0 mt-1 w-64 bg-white border border-slate-200 rounded-2xl shadow-xl p-2 z-50 animate-fade-in"
                >
                  <div className="px-3 py-2 border-b border-slate-100 mb-1">
                    <p className="text-[10px] font-black text-blue-600 uppercase tracking-wider">Korea Ecosystem</p>
                  </div>
                  {KOREA_DROPDOWN.map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={() => setOpenDropdown(null)}
                      className="flex items-center gap-3 px-3 py-2 rounded-xl hover:bg-blue-50/60 transition-colors group"
                    >
                      <item.icon className="w-4 h-4 text-slate-400 group-hover:text-blue-600 flex-shrink-0" />
                      <div>
                        <p className="text-xs font-bold text-slate-900 group-hover:text-blue-700">{item.label}</p>
                        <p className="text-[10px] text-slate-400">{item.desc}</p>
                      </div>
                    </Link>
                  ))}
                </div>
              )}
            </div>

            {/* Consult Now CTA with Hover Tooltip */}
            <div 
              className="relative group/consult"
              onMouseEnter={() => setOpenDropdown(null)}
            >
              <Link
                href="/consultancy"
                className="flex items-center gap-2 px-4 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-600 active:bg-emerald-700 text-white text-xs font-black transition-all duration-200 shadow-md shadow-emerald-500/20 hover:shadow-lg hover:shadow-emerald-500/30 hover:-translate-y-0.5 border border-emerald-400/30 cursor-pointer"
              >
                <span>Consult Now</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover/consult:translate-x-1 transition-transform duration-200" />
              </Link>

              {/* Hover card */}
              <div className="absolute top-full right-0 mt-2 w-56 pointer-events-none
                opacity-0 translate-y-1 group-hover/consult:opacity-100 group-hover/consult:translate-y-0
                transition-all duration-200 ease-out z-50">
                <div className="bg-white border border-indigo-100 rounded-2xl shadow-xl p-3.5">
                  <div className="flex items-center gap-1.5 mb-2">
                    <span className="px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-700 text-[10px] font-black uppercase tracking-wider">Free</span>
                    <span className="px-2 py-0.5 rounded-full bg-indigo-100 text-indigo-700 text-[10px] font-black uppercase tracking-wider">15 min</span>
                  </div>
                  <p className="text-xs font-black text-slate-900 mb-1 leading-snug">
                    Free 15-minutes consultation from expert
                  </p>
                  <div className="flex items-center gap-1.5 text-[11px] text-slate-500 font-medium">
                    <span className="w-1.5 h-1.5 rounded-full bg-indigo-500 shrink-0"/>
                    Japan &amp; Korea visa experts
                  </div>
                  <div className="flex items-center gap-1.5 text-[11px] text-slate-500 font-medium mt-0.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-indigo-500 shrink-0"/>
                    No credit card needed
                  </div>
                  <div className="mt-2.5 pt-2 border-t border-slate-100 text-[10px] text-indigo-600 font-bold flex items-center gap-1">
                    Book a free slot <ArrowRight className="w-3 h-3" />
                  </div>
                </div>
              </div>
            </div>
          </nav>

          {/* 3-Way Language Dropdown Selector */}
          <LanguageDropdown />

          {/* Interactive Notification Bell with Unread Popover */}
          <NotificationBell />

          <div className="w-px h-6 bg-slate-200 mx-1"></div>

          {user ? (
            <Link
              href="/profile"
              className="flex items-center gap-2 px-2.5 py-1.5 rounded-full hover:bg-slate-100 transition-all cursor-pointer group"
              title="View My Profile"
            >
              <div className="w-8 h-8 rounded-full bg-indigo-600 text-white font-black text-xs flex items-center justify-center shadow-xs group-hover:scale-105 transition-transform">
                {user.name.charAt(0).toUpperCase()}
              </div>
              <span className="text-xs font-extrabold text-slate-700 hidden xl:inline-block group-hover:text-indigo-600 transition-colors">
                {user.name}
              </span>
            </Link>
          ) : (
            <div className="flex items-center gap-2">
              <button
                onClick={() => openAuth('signin')}
                className="px-4 py-2 text-sm font-medium text-slate-700 hover:text-slate-900 hover:bg-slate-100 rounded-full transition-colors cursor-pointer"
              >
                Log in
              </button>
              <button
                onClick={() => openAuth('register')}
                className="px-4 py-2 text-sm font-medium text-white bg-red-600 hover:bg-red-500 rounded-full transition-colors cursor-pointer shadow-xs"
              >
                Sign up
              </button>
            </div>
          )}
        </div>
      </header>

      {authSheetOpen && (
        <AuthSheet
          initialMode={authMode}
          onClose={() => setAuthSheetOpen(false)}
        />
      )}
    </>
  );
}
