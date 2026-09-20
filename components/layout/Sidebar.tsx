'use client';
import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  Home,
  BookOpen,
  ClipboardList,
  GraduationCap,
  Briefcase,
  Shield,
  Globe,
  Bell,
  FileText,
  Handshake,
  BarChart2,
  ChevronDown,
  Languages,
  Sparkles,
  MessageSquare,
  PanelLeftClose,
  PanelLeftOpen,
  ArrowRight,
  PlaneTakeoff,
  Home as HomeIcon,
  Building
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

  const isExamsRoute = pathname.includes('/exams') || pathname.includes('/exam');
  const isLearnRoute = (pathname.includes('/learn') || (pathname.includes('/work') && !pathname.includes('/exam'))) && !isExamsRoute;
  const isVisaRoute = pathname.includes('/visa');

  const [learnOpen, setLearnOpen] = useState(true);
  const [visaOpen, setVisaOpen] = useState(true);

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
    if (href === '/' || href === '/japan' || href === '/korea') {
      return pathname === href;
    }
    return pathname === href || pathname.startsWith(href + '/');
  };

  const getScopedHref = (key: string) => {
    if (key === 'home') return activeCountry === 'japan' ? '/japan' : activeCountry === 'korea' ? '/korea' : '/';
    if (activeCountry === 'japan') return `/japan/${key}`;
    if (activeCountry === 'korea') return `/korea/${key}`;
    return `/${key}`;
  };

  // Exact Master Sequence: Home → Learn → Mock Test → Visa → Rooms → Jobs → Life
  const primaryNavLinks = [
    { key: 'home',      label: 'Home',       href: getScopedHref('home'),   Icon: Home },
    { key: 'learn',     label: 'Learn',      href: getScopedHref('learn'),  Icon: BookOpen, hasDropdown: true },
    { key: 'exams',     label: 'Mock Test',  href: getScopedHref('exams'),  Icon: ClipboardList },
    { key: 'visa',      label: 'Visa & Interview', href: getScopedHref('visa'),   Icon: Shield, hasDropdown: true },
    { key: 'rooms',     label: 'Rooms',      href: getScopedHref('rooms'),  Icon: Building, badge: 'Housing' },
    { key: 'jobs',      label: 'Jobs',       href: getScopedHref('jobs'),   Icon: Briefcase, badge: 'Careers' },
    { key: 'life',      label: 'Life & Culture', href: getScopedHref('life'),   Icon: Globe },
  ];


  const learnSubItems = [
    {
      key: 'language',
      label: 'Language',
      href: getScopedHref('learn'),
      Icon: Languages,
      badge: activeCountry === 'korea' ? 'Korean' : 'Japanese',
      isActive: pathname.includes('/learn') && !pathname.includes('/work') && !isExamsRoute
    },
    {
      key: 'skill',
      label: activeCountry === 'korea' ? 'EPS Skills' : 'SSW Skills',
      href: getScopedHref('work'),
      Icon: Sparkles,
      badge: activeCountry === 'korea' ? 'EPS Track' : 'SSW-1 Track',
      isActive: pathname.includes('/work') && !pathname.includes('/exam')
    }
  ];

  const visaSubItems = [
    {
      key: 'student',
      label: 'Student Visa',
      href: `/${activeCountry === 'korea' ? 'korea' : 'japan'}/visa/student`,
      Icon: GraduationCap,
      isActive: pathname.includes('/visa/student')
    },
    {
      key: 'work',
      label: 'Working Visa',
      href: activeCountry === 'korea' ? '/korea/visa/e9' : '/japan/visa/ssw',
      Icon: Briefcase,
      badge: activeCountry === 'korea' ? 'E-9' : 'SSW-1',
      isActive: pathname.includes('/visa/ssw') || pathname.includes('/visa/e9') || pathname.includes('/visa/work')
    },
    {
      key: 'dependent',
      label: 'Dependent Visa',
      href: `/${activeCountry === 'korea' ? 'korea' : 'japan'}/visa/dependent`,
      Icon: Shield,
      isActive: pathname.includes('/visa/dependent')
    },
    {
      key: 'interview',
      label: 'Interview Prep',
      href: `/${activeCountry === 'korea' ? 'korea' : 'japan'}/visa/interview`,
      Icon: MessageSquare,
      badge: 'All Visas',
      isActive: pathname.includes('/visa/interview')
    }
  ];

  const renderNavLink = (link: { key: string; label: string; href: string; Icon: any; hasDropdown?: boolean; badge?: string }) => {
    const active = 
      (link.key === 'learn' && isLearnRoute) || 
      (link.key === 'exams' && isExamsRoute) ||
      (link.key === 'visa' && isVisaRoute) ||
      isActive(link.href);

    // Learn Dropdown
    if (link.key === 'learn') {
      if (isCollapsed) {
        return (
          <Link
            key={link.key}
            href={link.href}
            title="Learn"
            className={`
              flex items-center justify-center p-2.5 rounded-xl text-sm transition-all duration-150
              ${active 
                ? activeCountry === 'japan' ? 'bg-red-50 text-red-700 font-extrabold' : activeCountry === 'korea' ? 'bg-blue-50 text-blue-700 font-extrabold' : 'bg-indigo-50 text-indigo-700 font-extrabold'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
              }
            `}
          >
            <link.Icon className={`w-4 h-4 shrink-0 ${active ? (activeCountry === 'japan' ? 'text-red-600' : 'text-blue-600') : 'text-slate-400'}`} />
          </Link>
        );
      }

      return (
        <div key={link.key} className="space-y-1">
          <button
            type="button"
            onClick={() => setLearnOpen(prev => !prev)}
            className={`
              w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-sm transition-all duration-150 cursor-pointer
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
            <div className="flex items-center gap-3">
              <link.Icon className={`w-4 h-4 shrink-0 ${
                active 
                  ? activeCountry === 'japan' ? 'text-red-600' : activeCountry === 'korea' ? 'text-blue-600' : 'text-indigo-600'
                  : 'text-slate-400'
              }`} />
              <span>{link.label}</span>
            </div>
            <ChevronDown className={`w-3.5 h-3.5 text-slate-400 transition-transform duration-200 ${learnOpen ? 'rotate-180 text-slate-600' : ''}`} />
          </button>

          {learnOpen && (
            <div className="ml-5 pl-2.5 my-1 border-l-2 border-slate-200 space-y-1">
              {learnSubItems.map((sub) => (
                <Link
                  key={sub.key}
                  href={sub.href}
                  onClick={() => { if(window.innerWidth < 1024) onClose?.(); }}
                  className={`
                    flex items-center justify-between px-3 py-2 rounded-xl text-xs font-bold transition-all
                    ${sub.isActive
                      ? activeCountry === 'japan'
                        ? 'bg-red-600 text-white shadow-xs'
                        : 'bg-blue-600 text-white shadow-xs'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                    }
                  `}
                >
                  <div className="flex items-center gap-2">
                    <sub.Icon className={`w-3.5 h-3.5 ${sub.isActive ? 'text-white' : 'text-indigo-500'}`} />
                    <span>{sub.label}</span>
                  </div>
                  {sub.badge && (
                    <span className={`px-1.5 py-0.5 rounded text-[9px] font-black ${
                      sub.isActive 
                        ? 'bg-white/20 text-white' 
                        : 'bg-slate-100 text-slate-600'
                    }`}>
                      {sub.badge}
                    </span>
                  )}
                </Link>
              ))}
            </div>
          )}
        </div>
      );
    }

    // Visa Dropdown
    if (link.key === 'visa') {
      if (isCollapsed) {
        return (
          <Link
            key={link.key}
            href={link.href}
            title="Visa & Interview"
            className={`
              flex items-center justify-center p-2.5 rounded-xl text-sm transition-all duration-150
              ${active 
                ? activeCountry === 'japan' ? 'bg-red-50 text-red-700 font-extrabold' : activeCountry === 'korea' ? 'bg-blue-50 text-blue-700 font-extrabold' : 'bg-indigo-50 text-indigo-700 font-extrabold'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
              }
            `}
          >
            <link.Icon className={`w-4 h-4 shrink-0 ${active ? (activeCountry === 'japan' ? 'text-red-600' : 'text-blue-600') : 'text-slate-400'}`} />
          </Link>
        );
      }

      return (
        <div key={link.key} className="space-y-1">
          <button
            type="button"
            onClick={() => setVisaOpen(prev => !prev)}
            className={`
              w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-sm transition-all duration-150 cursor-pointer
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
            <div className="flex items-center gap-3">
              <link.Icon className={`w-4 h-4 shrink-0 ${
                active 
                  ? activeCountry === 'japan' ? 'text-red-600' : activeCountry === 'korea' ? 'text-blue-600' : 'text-indigo-600'
                  : 'text-slate-400'
              }`} />
              <span>{link.label}</span>
            </div>
            <ChevronDown className={`w-3.5 h-3.5 text-slate-400 transition-transform duration-200 ${visaOpen ? 'rotate-180 text-slate-600' : ''}`} />
          </button>

          {visaOpen && (
            <div className="ml-5 pl-2.5 my-1 border-l-2 border-slate-200 space-y-1">
              {visaSubItems.map((sub) => (
                <Link
                  key={sub.key}
                  href={sub.href}
                  onClick={() => { if(window.innerWidth < 1024) onClose?.(); }}
                  className={`
                    flex items-center justify-between px-3 py-2 rounded-xl text-xs font-bold transition-all
                    ${sub.isActive
                      ? activeCountry === 'japan'
                        ? 'bg-red-600 text-white shadow-xs'
                        : 'bg-blue-600 text-white shadow-xs'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                    }
                  `}
                >
                  <div className="flex items-center gap-2">
                    <sub.Icon className={`w-3.5 h-3.5 ${sub.isActive ? 'text-white' : 'text-slate-500'}`} />
                    <span>{sub.label}</span>
                  </div>
                  {sub.badge && (
                    <span className={`px-1.5 py-0.5 rounded text-[9px] font-black ${
                      sub.isActive 
                        ? 'bg-white/20 text-white' 
                        : 'bg-slate-100 text-slate-600'
                    }`}>
                      {sub.badge}
                    </span>
                  )}
                </Link>
              ))}
            </div>
          )}
        </div>
      );
    }

    // Standard Link
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
        {!isCollapsed && (
          <div className="flex items-center justify-between flex-1">
            <span>{link.label}</span>
            {link.badge && (
              <span className="px-1.5 py-0.5 rounded text-[9px] font-black bg-purple-100 text-purple-800">
                {link.badge}
              </span>
            )}
          </div>
        )}
      </Link>
    );
  };

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
              <div className="grid grid-cols-2 gap-1 bg-slate-200/80 p-1 rounded-xl">
                <button
                  onClick={() => setCountryFocus('japan')}
                  className={`py-1.5 px-2 rounded-lg text-xs font-black transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
                    activeCountry === 'japan' ? 'bg-red-600 text-white shadow-xs' : 'text-slate-700 hover:text-slate-900 hover:bg-white/60'
                  }`}
                >
                  🇯🇵 Japan Hub
                </button>
                <button
                  onClick={() => setCountryFocus('korea')}
                  className={`py-1.5 px-2 rounded-lg text-xs font-black transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
                    activeCountry === 'korea' ? 'bg-blue-600 text-white shadow-xs' : 'text-slate-700 hover:text-slate-900 hover:bg-white/60'
                  }`}
                >
                  🇰🇷 Korea Hub
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
                onClick={() => setCountryFocus(activeCountry === 'japan' ? 'korea' : 'japan')}
                title={`Active Hub: ${activeCountry.toUpperCase()} (Click to switch)`}
                className="text-base p-1 rounded-lg hover:bg-slate-100 cursor-pointer"
              >
                {activeCountry === 'japan' ? '🇯🇵' : '🇰🇷'}
              </button>
            </div>
          )}

          {/* Navigation Links in Exact Master Sequence */}
          <div className={`${isCollapsed ? 'px-2 py-3 space-y-2' : 'px-3 py-3 space-y-1'}`}>
            {primaryNavLinks.map(renderNavLink)}
          </div>

          
          {/* Secondary Links */}
          {!isCollapsed && (
            <div className="px-3 py-3 space-y-1 border-t border-slate-100">
              <p className="px-3 text-[10px] font-black text-slate-400 uppercase tracking-wider mb-1">Updates &amp; Articles</p>
              {SECONDARY_LINKS.map((link) => {
                const active = isActive(link.href);
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => { if(window.innerWidth < 1024) onClose?.(); }}
                    className={`
                      flex items-center gap-3 px-3.5 py-2 rounded-xl text-xs transition-all duration-150
                      ${active 
                        ? 'bg-indigo-50 text-indigo-700 font-extrabold border-l-4 border-indigo-600 rounded-r-xl' 
                        : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50 font-medium'
                      }
                    `}
                  >
                    <link.Icon className={`w-3.5 h-3.5 ${active ? 'text-indigo-600' : 'text-slate-400'}`} />
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
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1.5 transition-transform duration-200" />
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

        {/* Account Card (Hidden when collapsed) */}
        {!isCollapsed && (
          <div className="px-3 py-3 mt-auto">
            {currentUser ? (
              <div className="p-3 bg-gradient-to-br from-indigo-50 via-purple-50 to-indigo-50 rounded-2xl border border-indigo-100 shadow-xs space-y-2">
                <div className="flex items-center justify-between">
                  <span className="px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[10px] font-black uppercase tracking-wider">
                    {currentUser.role === 'ADMIN' ? '👑 Admin' : currentUser.role === 'INSTRUCTOR' ? '🎓 Instructor' : '✨ Member'}
                  </span>
                  <span className="text-[10px] font-extrabold text-amber-600 flex items-center gap-1">
                    🔥 Active
                  </span>
                </div>

                <div className="flex items-center gap-2.5 pt-0.5">
                  <div className="w-7 h-7 rounded-full bg-indigo-600 text-white font-black text-xs flex items-center justify-center shadow-xs shrink-0">
                    {currentUser.name?.[0]?.toUpperCase() || 'U'}
                  </div>
                  <div className="truncate text-xs">
                    <div className="font-black text-slate-900 truncate">{currentUser.name}</div>
                    <div className="text-[10px] text-slate-500 truncate">{currentUser.email}</div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="p-3 bg-slate-50 rounded-2xl border border-slate-200/70">
                <p className="font-bold text-xs text-slate-900 mb-0.5">Free Access</p>
                <p className="text-[11px] text-slate-500 mb-2 leading-relaxed">
                  Track your streak and unlock full exams.
                </p>
                <button
                  onClick={() => setAuthSheetOpen(true)}
                  className="w-full py-1.5 bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold rounded-xl shadow-xs transition-colors cursor-pointer"
                >
                  Sign In / Register
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
