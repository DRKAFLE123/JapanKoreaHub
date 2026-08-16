'use client';
import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  Home, BookOpen, ClipboardList, GraduationCap, Briefcase, Shield, Globe, Bell, FileText, Handshake, BarChart2, User as UserIcon, PanelLeftClose, PanelLeftOpen, ArrowRight
} from 'lucide-react';
import AuthSheet from '@/components/auth/AuthSheet';
import { useCountry } from '@/lib/context/CountryContext';

const SECONDARY_LINKS = [
  { href: '/notices',      label: 'Notices',      Icon: Bell },
  { href: '/blog',         label: 'Blog',         Icon: FileText },
];

interface SidebarProps {
  isOpen: boolean;
  isCollapsed?: boolean;
  onToggleCollapse?: () => void;
  onClose?: () => void;
  user?: { name: string; email: string; role?: string } | null;
}

export default function Sidebar({ isOpen, isCollapsed = false, onToggleCollapse, onClose, user }: SidebarProps) {
  const pathname = usePathname();
  const [authSheetOpen, setAuthSheetOpen] = useState(false);
  const { activeCountry, setCountryFocus } = useCountry();
  const [currentUser, setCurrentUser] = useState<{ name: string; email: string; role?: string } | null>(user || null);

  React.useEffect(() => {
    if (user) {
      setCurrentUser(user);
      return;
    }
    const saved = localStorage.getItem('jkh_user');
    if (saved) {
      try {
        setCurrentUser(JSON.parse(saved));
      } catch (_) {}
    }
    fetch('/api/auth/me')
      .then(r => r.ok ? r.json() : null)
      .then(d => {
        if (d?.authenticated && d.user) {
          setCurrentUser(d.user);
        }
      })
      .catch(() => {});
  }, [user]);

  const isActive = (href: string) => {
    if (href === '/') return pathname === '/';
    return pathname === href || pathname.startsWith(href + '/');
  };

  const getScopedHref = (key: string) => {
    if (key === 'home') return activeCountry === 'japan' ? '/japan' : activeCountry === 'korea' ? '/korea' : '/';
    if (activeCountry === 'japan') return `/japan/${key}`;
    if (activeCountry === 'korea') return `/korea/${key}`;
    return `/${key}`;
  };

  const mainLinks = [
    { key: 'home',         label: 'Home',         href: getScopedHref('home'),     Icon: Home },
    { key: 'learn',        label: 'Learn',        href: getScopedHref('learn'),    Icon: BookOpen },
    { key: 'exams',        label: 'Mock Test',    href: getScopedHref('exams'),    Icon: ClipboardList },
    { key: 'study',        label: 'Study',        href: getScopedHref('study'),    Icon: GraduationCap },
    { key: 'work',         label: 'Work',         href: getScopedHref('work'),     Icon: Briefcase },
    { key: 'visa',         label: 'Visa',         href: getScopedHref('visa'),     Icon: Shield },
    { key: 'life',         label: 'Life',         href: getScopedHref('life'),     Icon: Globe },
    { key: 'dashboard',    label: 'Progress',     href: '/dashboard',             Icon: BarChart2 },
    { key: 'profile',      label: 'Profile',      href: '/profile',               Icon: UserIcon },
  ];

  return (
    <>
      {/* Mobile overlay for when sidebar is open on smaller screens */}
      {isOpen && onClose && (
        <div className="fixed inset-0 bg-black/40 z-30 lg:hidden animate-fade-in" onClick={onClose} />
      )}
      
      <aside className={`
        fixed top-16 left-0 bottom-0 bg-white border-r border-slate-200 z-30
        overflow-y-auto pb-20 transition-all duration-200 ease-in-out flex flex-col justify-between text-slate-800
        ${isCollapsed ? 'lg:w-16 w-64' : 'w-64'}
        ${isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
      `}>

        <div>
          {/* Country Focus Switcher Bar (with inline collapse toggle) */}
          {!isCollapsed ? (
            <div className="px-3 pt-2 pb-3 border-b border-slate-100 bg-slate-50/50">
              <div className="flex items-center justify-between mb-2 px-1">
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-wider">Active Platform Hub</p>
                {onToggleCollapse && (
                  <button
                    onClick={onToggleCollapse}
                    title="Collapse Sidebar"
                    className="hidden lg:flex p-1 rounded-md text-slate-400 hover:text-slate-700 hover:bg-slate-200/70 transition-colors cursor-pointer"
                  >
                    <PanelLeftClose className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>
              <div className="grid grid-cols-3 gap-1 bg-slate-200/70 p-1 rounded-xl">
                <button
                  onClick={() => setCountryFocus('japan')}
                  className={`py-1.5 px-1 rounded-lg text-xs font-bold transition-all cursor-pointer flex items-center justify-center gap-1 ${
                    activeCountry === 'japan' ? 'bg-red-600 text-white shadow-xs' : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  🇯🇵 Japan
                </button>
                <button
                  onClick={() => setCountryFocus('korea')}
                  className={`py-1.5 px-1 rounded-lg text-xs font-bold transition-all cursor-pointer flex items-center justify-center gap-1 ${
                    activeCountry === 'korea' ? 'bg-blue-600 text-white shadow-xs' : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  🇰🇷 Korea
                </button>
                <button
                  onClick={() => setCountryFocus('all')}
                  className={`py-1.5 px-1 rounded-lg text-xs font-bold transition-all cursor-pointer flex items-center justify-center gap-1 ${
                    activeCountry === 'all' ? 'bg-slate-900 text-white shadow-xs' : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  🌏 Both
                </button>
              </div>
            </div>
          ) : (
            <div className="py-2 flex flex-col items-center gap-1 border-b border-slate-100">
              {onToggleCollapse && (
                <button
                  onClick={onToggleCollapse}
                  title="Expand Sidebar"
                  className="hidden lg:flex p-1 rounded-md text-slate-400 hover:text-slate-700 hover:bg-slate-200/70 transition-colors cursor-pointer"
                >
                  <PanelLeftOpen className="w-3.5 h-3.5" />
                </button>
              )}
              <button
                onClick={() => setCountryFocus(activeCountry === 'japan' ? 'korea' : activeCountry === 'korea' ? 'all' : 'japan')}
                title={`Active Hub: ${activeCountry.toUpperCase()} (Click to cycle)`}
                className="text-base p-1 rounded-lg hover:bg-slate-100 cursor-pointer"
              >
                {activeCountry === 'japan' ? '🇯🇵' : activeCountry === 'korea' ? '🇰🇷' : '🌏'}
              </button>
            </div>
          )}

          {/* Main Links */}
          <div className={`${isCollapsed ? 'px-2 py-3 space-y-2' : 'px-3 py-4 space-y-1'}`}>
            {!isCollapsed && (
              <p className="px-3 text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">
                {activeCountry === 'japan' ? '🇯🇵 Japan Platform' : activeCountry === 'korea' ? '🇰🇷 Korea Platform' : 'Global Platform'}
              </p>
            )}

            {mainLinks.map((link) => {
              const active = isActive(link.href);
              return (
                <Link
                  key={link.key}
                  href={link.href}
                  title={isCollapsed ? link.label : undefined}
                  onClick={() => { if(window.innerWidth < 1024) onClose?.(); }}
                  className={`
                    flex items-center gap-3 rounded-xl text-sm transition-all duration-150
                    ${isCollapsed ? 'justify-center p-2.5' : 'px-3.5 py-2.5'}
                    ${active 
                      ? activeCountry === 'japan' 
                        ? 'bg-red-50 text-red-700 font-extrabold border-l-4 border-red-600 rounded-r-xl' 
                        : activeCountry === 'korea' 
                          ? 'bg-blue-50 text-blue-700 font-extrabold border-l-4 border-blue-600 rounded-r-xl' 
                          : 'bg-indigo-50 text-indigo-700 font-extrabold border-l-4 border-indigo-600 rounded-r-xl'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50 font-medium'
                    }
                  `}
                >
                  <link.Icon className={`w-4 h-4 shrink-0 transition-colors ${
                    active 
                      ? activeCountry === 'japan' ? 'text-red-600' : activeCountry === 'korea' ? 'text-blue-600' : 'text-indigo-600'
                      : 'text-slate-400'
                  }`} />
                  {!isCollapsed && <span>{link.label}</span>}
                </Link>
              );
            })}
          </div>
          
          {/* Secondary Links */}
          {!isCollapsed && (
            <div className="px-3 py-4 space-y-1 mt-2 border-t border-slate-100">
              <p className="px-3 text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">Resources</p>
              {SECONDARY_LINKS.map((link) => {
                const active = isActive(link.href);
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => { if(window.innerWidth < 1024) onClose?.(); }}
                    className={`
                      flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm transition-all duration-150
                      ${active 
                        ? 'bg-indigo-50 text-indigo-700 font-extrabold border-l-4 border-indigo-600 rounded-r-xl' 
                        : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50 font-medium'
                      }
                    `}
                  >
                    <link.Icon className={`w-4 h-4 ${active ? 'text-indigo-600' : 'text-slate-400'}`} />
                    {link.label}
                  </Link>
                );
              })}
            </div>
          )}
        </div>

        {/* Consult Now CTA (Hidden when collapsed) */}
          {!isCollapsed && (
            <div className="px-3 pb-3">
              <div className="relative group/consult">
                <Link
                  href="/consultancy"
                  onClick={() => { if(window.innerWidth < 1024) onClose?.(); }}
                  className="flex items-center justify-between gap-2 w-full px-4 py-3 rounded-2xl bg-emerald-500 hover:bg-emerald-600 active:bg-emerald-700 text-white text-xs font-black transition-all duration-200 shadow-md shadow-emerald-500/20 hover:shadow-lg hover:shadow-emerald-500/30 hover:-translate-y-0.5 border border-emerald-400/30 cursor-pointer"
                >
                  <div className="flex items-center gap-2.5">
                    <Handshake className="w-4.5 h-4.5 shrink-0 group-hover/consult:rotate-12 transition-transform duration-200" />
                    <span className="tracking-wide">Consult Now</span>
                  </div>
                  <ArrowRight className="w-4 h-4 group-hover/consult:translate-x-1.5 transition-transform duration-200" />
                </Link>

                {/* Hover card */}
                <div className="absolute bottom-full left-0 right-0 mb-2 pointer-events-none
                  opacity-0 translate-y-1 group-hover/consult:opacity-100 group-hover/consult:translate-y-0
                  transition-all duration-200 ease-out z-50">
                  <div className="bg-white border border-indigo-100 rounded-2xl shadow-xl p-3">
                    <div className="flex items-center gap-1.5 mb-1.5">
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
                  </div>
                </div>
              </div>
            </div>
          )}

        {/* Account Card / Promo Card (Hidden when collapsed) */}
        {!isCollapsed && (
          <div className="px-3 py-4 mt-auto">
            {currentUser ? (
              <div className="p-3.5 bg-gradient-to-br from-indigo-50 via-purple-50 to-indigo-50 rounded-2xl border border-indigo-100 shadow-xs space-y-2.5">
                <div className="flex items-center justify-between">
                  <span className="px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[10px] font-black uppercase tracking-wider">
                    {currentUser.role === 'ADMIN' ? '👑 Admin' : currentUser.role === 'INSTRUCTOR' ? '🎓 Instructor' : '✨ Free Member'}
                  </span>
                  <span className="text-[10px] font-extrabold text-amber-600 flex items-center gap-1">
                    🔥 28d Streak
                  </span>
                </div>

                <div className="flex items-center gap-2.5 pt-0.5">
                  <div className="w-8 h-8 rounded-full bg-indigo-600 text-white font-black text-xs flex items-center justify-center shadow-xs shrink-0">
                    {currentUser.name?.[0]?.toUpperCase() || 'U'}
                  </div>
                  <div className="truncate text-xs">
                    <div className="font-black text-slate-900 truncate">{currentUser.name}</div>
                    <div className="text-[10px] text-slate-500 truncate">{currentUser.email}</div>
                  </div>
                </div>

                <Link
                  href="/profile"
                  onClick={() => { if (window.innerWidth < 1024) onClose?.(); }}
                  className="w-full py-2 bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-black rounded-xl shadow-xs transition-all text-center block cursor-pointer"
                >
                  View My Profile →
                </Link>
              </div>
            ) : (
              <div className="p-4 bg-gradient-to-br from-indigo-50 to-purple-50 rounded-2xl border border-indigo-100/50">
                <p className="font-bold text-sm text-indigo-950 mb-1">100% Free Account</p>
                <p className="text-xs text-indigo-800/80 mb-3 leading-relaxed">
                  Create a free account to track your study streak, save cards, and unlock full mock tests.
                </p>
                <button
                  onClick={() => setAuthSheetOpen(true)}
                  className="w-full py-2 bg-red-600 hover:bg-red-500 text-white text-xs font-bold rounded-xl shadow-sm transition-colors cursor-pointer"
                >
                  Create Free Account
                </button>
              </div>
            )}
          </div>
        )}
      </aside>

      {authSheetOpen && (
        <AuthSheet
          initialMode="register"
          onClose={() => setAuthSheetOpen(false)}
        />
      )}
    </>
  );
}
