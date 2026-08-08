'use client';
import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  Home, BookOpen, ClipboardList, GraduationCap, Briefcase, Shield, Globe, Bell, FileText, Handshake, BarChart2, User as UserIcon, PanelLeftClose, PanelLeftOpen
} from 'lucide-react';
import AuthSheet from '@/components/auth/AuthSheet';
import { useCountry } from '@/lib/context/CountryContext';

const SECONDARY_LINKS = [
  { href: '/notices',      label: 'Notices',      Icon: Bell },
  { href: '/blog',         label: 'Blog',         Icon: FileText },
  { href: '/consultancy',  label: 'Consultancy',  Icon: Handshake },
];

interface SidebarProps {
  isOpen: boolean;
  isCollapsed?: boolean;
  onToggleCollapse?: () => void;
  onClose?: () => void;
}

export default function Sidebar({ isOpen, isCollapsed = false, onToggleCollapse, onClose }: SidebarProps) {
  const pathname = usePathname();
  const [authSheetOpen, setAuthSheetOpen] = useState(false);
  const { activeCountry, setCountryFocus } = useCountry();

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
    { key: 'exams',        label: 'Mock Tests',   href: getScopedHref('exams'),    Icon: ClipboardList },
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
        fixed top-16 left-0 bottom-0 bg-white border-r border-gray-200 z-30
        overflow-y-auto pb-20 transition-all duration-200 ease-in-out flex flex-col justify-between
        ${isCollapsed ? 'lg:w-16 w-64' : 'w-64'}
        ${isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
      `}>

        <div>
          {/* Collapse Toggle Button (Desktop Only) */}
          {onToggleCollapse && (
            <div className={`hidden lg:flex items-center ${isCollapsed ? 'justify-center py-3' : 'justify-between px-4 py-2.5'} border-b border-gray-100 bg-gray-50/50`}>
              {!isCollapsed && (
                <span className="text-[10px] font-black text-gray-400 uppercase tracking-wider">
                  Sidebar Panel
                </span>
              )}
              <button
                onClick={onToggleCollapse}
                title={isCollapsed ? 'Expand Sidebar' : 'Collapse Sidebar'}
                className="p-1.5 rounded-lg text-gray-500 hover:text-gray-900 hover:bg-gray-200/70 transition-colors cursor-pointer"
              >
                {isCollapsed ? <PanelLeftOpen className="w-4 h-4" /> : <PanelLeftClose className="w-4 h-4" />}
              </button>
            </div>
          )}

          {/* Country Focus Switcher Bar */}
          {!isCollapsed ? (
            <div className="p-3 border-b border-gray-100 bg-slate-50/50">
              <p className="text-[10px] font-black text-gray-400 uppercase tracking-wider mb-2 px-1">Active Platform Hub</p>
              <div className="grid grid-cols-3 gap-1 bg-gray-200/70 p-1 rounded-xl">
                <button
                  onClick={() => setCountryFocus('japan')}
                  className={`py-1.5 px-1 rounded-lg text-xs font-bold transition-all cursor-pointer flex items-center justify-center gap-1 ${
                    activeCountry === 'japan' ? 'bg-red-600 text-white shadow-xs' : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  🇯🇵 Japan
                </button>
                <button
                  onClick={() => setCountryFocus('korea')}
                  className={`py-1.5 px-1 rounded-lg text-xs font-bold transition-all cursor-pointer flex items-center justify-center gap-1 ${
                    activeCountry === 'korea' ? 'bg-blue-600 text-white shadow-xs' : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  🇰🇷 Korea
                </button>
                <button
                  onClick={() => setCountryFocus('all')}
                  className={`py-1.5 px-1 rounded-lg text-xs font-bold transition-all cursor-pointer flex items-center justify-center gap-1 ${
                    activeCountry === 'all' ? 'bg-slate-900 text-white shadow-xs' : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  🌏 Both
                </button>
              </div>
            </div>
          ) : (
            <div className="py-3 flex justify-center border-b border-gray-100">
              <button
                onClick={() => setCountryFocus(activeCountry === 'japan' ? 'korea' : activeCountry === 'korea' ? 'all' : 'japan')}
                title={`Active Hub: ${activeCountry.toUpperCase()} (Click to cycle)`}
                className="text-base p-1 rounded-lg hover:bg-gray-100 cursor-pointer"
              >
                {activeCountry === 'japan' ? '🇯🇵' : activeCountry === 'korea' ? '🇰🇷' : '🌏'}
              </button>
            </div>
          )}

          {/* Main Links */}
          <div className={`${isCollapsed ? 'px-2 py-3 space-y-2' : 'px-3 py-4 space-y-1'}`}>
            {!isCollapsed && (
              <p className="px-3 text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">
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
                    flex items-center gap-3 rounded-xl text-sm font-medium transition-colors
                    ${isCollapsed ? 'justify-center p-2.5' : 'px-3 py-2'}
                    ${active 
                      ? activeCountry === 'japan' ? 'bg-red-50 text-red-700 font-bold' : activeCountry === 'korea' ? 'bg-blue-50 text-blue-700 font-bold' : 'bg-gray-100 text-gray-900'
                      : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                    }
                  `}
                >
                  <link.Icon className={`w-4 h-4 shrink-0 ${
                    active 
                      ? activeCountry === 'japan' ? 'text-red-600' : activeCountry === 'korea' ? 'text-blue-600' : 'text-gray-900'
                      : 'text-gray-400'
                  }`} />
                  {!isCollapsed && <span>{link.label}</span>}
                </Link>
              );
            })}
          </div>
          
          {/* Secondary Links */}
          {!isCollapsed && (
            <div className="px-3 py-4 space-y-1 mt-2 border-t border-gray-100">
              <p className="px-3 text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">Resources</p>
              {SECONDARY_LINKS.map((link) => {
                const active = isActive(link.href);
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => { if(window.innerWidth < 1024) onClose?.(); }}
                    className={`
                      flex items-center gap-3 px-3 py-2 rounded-xl text-sm font-medium transition-colors
                      ${active 
                        ? 'bg-gray-100 text-gray-900' 
                        : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                      }
                    `}
                  >
                    <link.Icon className={`w-4 h-4 ${active ? 'text-gray-900' : 'text-gray-400'}`} />
                    {link.label}
                  </Link>
                );
              })}
            </div>
          )}
        </div>

        {/* Free Account Card (Hidden when collapsed) */}
        {!isCollapsed && (
          <div className="px-3 py-4 mt-auto">
            <div className="p-4 bg-gradient-to-br from-indigo-50 to-purple-50 rounded-2xl border border-indigo-100/50">
              <p className="font-bold text-sm text-indigo-950 mb-1">100% Free Account</p>
              <p className="text-xs text-indigo-800/80 mb-3 leading-relaxed">
                Create a free account to track your study streak, save cards, and unlock full mock tests.
              </p>
              <button
                onClick={() => setAuthSheetOpen(true)}
                className="w-full py-2 bg-gray-900 hover:bg-gray-800 text-white text-xs font-semibold rounded-xl shadow-sm transition-colors cursor-pointer"
              >
                Create Free Account
              </button>
            </div>
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
