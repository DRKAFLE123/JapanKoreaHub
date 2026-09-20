'use client';
import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  X,
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
  User,
  LogIn,
  BarChart2,
  Building,
  ChevronDown,
  Languages,
  Sparkles,
  MessageSquare,
  ArrowRight,
  Clock
} from 'lucide-react';
import { useCountry } from '@/lib/context/CountryContext';

interface MobileDrawerProps {
  onClose: () => void;
  user?: { name: string; email: string } | null;
  onAuthOpen: (mode: 'signin' | 'register') => void;
}

const SECONDARY_LINKS = [
  { href: '/dashboard', label: 'Progress Tracker', Icon: BarChart2 },
  { href: '/notices',   label: 'Notices & Updates', Icon: Bell },
  { href: '/blog',      label: 'Blog & Articles',  Icon: FileText },
];

export default function MobileDrawer({ onClose, user, onAuthOpen }: MobileDrawerProps) {
  const pathname = usePathname();
  const { activeCountry, setCountryFocus } = useCountry();

  const isExamsRoute = pathname.includes('/exams') || pathname.includes('/exam');
  const isLearnRoute = (pathname.includes('/learn') || (pathname.includes('/work') && !pathname.includes('/exam'))) && !isExamsRoute;
  const isVisaRoute = pathname.includes('/visa');

  const [learnOpen, setLearnOpen] = useState(true);
  const [visaOpen, setVisaOpen] = useState(true);
  const [examsOpen, setExamsOpen] = useState(false);

  const getScopedHref = (key: string) => {
    if (key === 'home') return activeCountry === 'japan' ? '/japan' : activeCountry === 'korea' ? '/korea' : '/';
    if (activeCountry === 'japan') return `/japan/${key}`;
    if (activeCountry === 'korea') return `/korea/${key}`;
    return `/${key}`;
  };

  const isActive = (href: string) => {
    if (href === '/' || href === '/japan' || href === '/korea') {
      return pathname === href;
    }
    return pathname === href || pathname.startsWith(href + '/');
  };

  const learnSubItems = [
    {
      key: 'language',
      label: 'Language Learning',
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

  const examsSubItems = [
    {
      key: 'all-exams',
      label: 'All Mock Tests',
      href: getScopedHref('mock-test'),
      Icon: ClipboardList,
      badge: 'CBT Hub',
      isActive: pathname === `/${activeCountry}/mock-test` || pathname === `/${activeCountry}/exams`
    },
    ...(activeCountry === 'korea'
      ? [
          {
            key: 'eps-topik',
            label: 'EPS-TOPIK Exam',
            href: '/korea/exams/eps-topik',
            Icon: Clock,
            badge: 'Official CBT',
            isActive: pathname.includes('/eps-topik')
          },
          {
            key: 'kiip',
            label: 'KIIP 사회통합',
            href: '/korea/exams/kiip',
            Icon: Clock,
            badge: 'Level 0-5',
            isActive: pathname.includes('/kiip')
          }
        ]
      : [
          {
            key: 'jlpt-n5',
            label: 'JLPT N5 Exam',
            href: '/japan/exams/jlpt-n5',
            Icon: Clock,
            badge: 'Beginner',
            isActive: pathname.includes('/jlpt-n5')
          },
          {
            key: 'jlpt-n4',
            label: 'JLPT N4 Exam',
            href: '/japan/exams/jlpt-n4',
            Icon: Clock,
            badge: 'N4 Track',
            isActive: pathname.includes('/jlpt-n4')
          }
        ])
  ];

  const visaSubItems = [
    {
      key: 'overview',
      label: 'Visa Hub Overview',
      href: getScopedHref('visa'),
      Icon: Shield,
      badge: 'Guide',
      isActive: pathname === `/${activeCountry}/visa` || pathname === '/visa'
    },
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

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs animate-fade-in"
        onClick={onClose}
      />

      {/* Drawer */}
      <div
        className="fixed top-0 left-0 bottom-0 z-50 w-[85vw] max-w-xs bg-white shadow-2xl animate-slide-left flex flex-col"
        style={{ paddingBottom: 'env(safe-area-inset-bottom)' }}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-4 py-3 border-b border-slate-100 bg-white">
          <div className="flex items-center gap-2">
            <img src="/logo.png" alt="JapanKoreaHub" className="w-7 h-7 rounded-lg object-contain" />
            <div>
              <span className="font-extrabold text-sm text-slate-900 block leading-tight">JapanKoreaHub</span>
              <span className="text-[10px] text-slate-400 font-medium">Study &amp; Work Abroad</span>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 flex items-center justify-center rounded-xl text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors cursor-pointer"
            aria-label="Close menu"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Country Focus Switcher Card inside Mobile Drawer */}
        <div className="p-3 border-b border-slate-100 bg-slate-50/80">
          <div className="flex items-center justify-between mb-1.5 px-1">
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-wider">Active Platform Hub</p>
            <span className="text-[9px] font-bold px-1.5 py-0.5 rounded bg-white text-slate-500 border border-slate-200">
              {activeCountry === 'japan' ? '🇯🇵 Japan' : '🇰🇷 Korea'}
            </span>
          </div>
          <div className="grid grid-cols-2 gap-1 bg-slate-200/80 p-1 rounded-xl">
            <button
              onClick={() => { setCountryFocus('japan'); }}
              className={`py-1.5 px-2 rounded-lg text-xs font-black transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
                activeCountry === 'japan' ? 'bg-red-600 text-white shadow-xs' : 'text-slate-700 hover:bg-white/60'
              }`}
            >
              🇯🇵 Japan Hub
            </button>
            <button
              onClick={() => { setCountryFocus('korea'); }}
              className={`py-1.5 px-2 rounded-lg text-xs font-black transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
                activeCountry === 'korea' ? 'bg-blue-600 text-white shadow-xs' : 'text-slate-700 hover:bg-white/60'
              }`}
            >
              🇰🇷 Korea Hub
            </button>
          </div>
        </div>

        {/* Navigation scroll area */}
        <nav className="flex-1 overflow-y-auto px-3 py-2 space-y-1">
          {/* 1. Home */}
          <Link
            href={getScopedHref('home')}
            onClick={onClose}
            className={`flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm font-medium transition-colors ${
              isActive(getScopedHref('home'))
                ? activeCountry === 'japan' ? 'bg-red-50 text-red-700 font-extrabold border-l-4 border-red-600' : 'bg-blue-50 text-blue-700 font-extrabold border-l-4 border-blue-600'
                : 'text-slate-700 hover:bg-slate-50'
            }`}
          >
            <Home className={`w-4 h-4 shrink-0 ${
              isActive(getScopedHref('home')) ? (activeCountry === 'japan' ? 'text-red-600' : 'text-blue-600') : 'text-slate-400'
            }`} />
            <span>Home</span>
          </Link>

          {/* 2. Learn (Collapsible Dropdown matching Desktop) */}
          <div className="space-y-1">
            <button
              type="button"
              onClick={() => setLearnOpen(prev => !prev)}
              className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-sm font-medium transition-colors cursor-pointer ${
                isLearnRoute
                  ? activeCountry === 'japan' ? 'bg-red-50 text-red-700 font-extrabold border-l-4 border-red-600' : 'bg-blue-50 text-blue-700 font-extrabold border-l-4 border-blue-600'
                  : 'text-slate-700 hover:bg-slate-50'
              }`}
            >
              <div className="flex items-center gap-3">
                <BookOpen className={`w-4 h-4 shrink-0 ${
                  isLearnRoute ? (activeCountry === 'japan' ? 'text-red-600' : 'text-blue-600') : 'text-slate-400'
                }`} />
                <span>Learn</span>
              </div>
              <ChevronDown className={`w-4 h-4 text-slate-400 transition-transform duration-200 ${learnOpen ? 'rotate-180 text-slate-600' : ''}`} />
            </button>

            {learnOpen && (
              <div className="ml-5 pl-2.5 my-1 border-l-2 border-slate-200 space-y-1 animate-fade-in">
                {learnSubItems.map((sub) => (
                  <Link
                    key={sub.key}
                    href={sub.href}
                    onClick={onClose}
                    className={`flex items-center justify-between px-3 py-2 rounded-xl text-xs font-bold transition-all ${
                      sub.isActive
                        ? activeCountry === 'japan'
                          ? 'bg-red-600 text-white shadow-xs'
                          : 'bg-blue-600 text-white shadow-xs'
                        : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <sub.Icon className={`w-3.5 h-3.5 ${sub.isActive ? 'text-white' : 'text-indigo-500'}`} />
                      <span>{sub.label}</span>
                    </div>
                    {sub.badge && (
                      <span className={`px-1.5 py-0.5 rounded text-[9px] font-black ${
                        sub.isActive ? 'bg-white/25 text-white' : 'bg-slate-100 text-slate-600'
                      }`}>
                        {sub.badge}
                      </span>
                    )}
                  </Link>
                ))}
              </div>
            )}
          </div>

          {/* 3. Mock Test (Collapsible Dropdown matching Desktop) */}
          <div className="space-y-1">
            <button
              type="button"
              onClick={() => setExamsOpen(prev => !prev)}
              className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-sm font-medium transition-colors cursor-pointer ${
                isExamsRoute
                  ? activeCountry === 'japan' ? 'bg-red-50 text-red-700 font-extrabold border-l-4 border-red-600' : 'bg-blue-50 text-blue-700 font-extrabold border-l-4 border-blue-600'
                  : 'text-slate-700 hover:bg-slate-50'
              }`}
            >
              <div className="flex items-center gap-3">
                <ClipboardList className={`w-4 h-4 shrink-0 ${
                  isExamsRoute ? (activeCountry === 'japan' ? 'text-red-600' : 'text-blue-600') : 'text-slate-400'
                }`} />
                <span>Mock Test</span>
              </div>
              <ChevronDown className={`w-4 h-4 text-slate-400 transition-transform duration-200 ${examsOpen ? 'rotate-180 text-slate-600' : ''}`} />
            </button>

            {examsOpen && (
              <div className="ml-5 pl-2.5 my-1 border-l-2 border-slate-200 space-y-1 animate-fade-in">
                {examsSubItems.map((sub) => (
                  <Link
                    key={sub.key}
                    href={sub.href}
                    onClick={onClose}
                    className={`flex items-center justify-between px-3 py-2 rounded-xl text-xs font-bold transition-all ${
                      sub.isActive
                        ? activeCountry === 'japan'
                          ? 'bg-red-600 text-white shadow-xs'
                          : 'bg-blue-600 text-white shadow-xs'
                        : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <sub.Icon className={`w-3.5 h-3.5 ${sub.isActive ? 'text-white' : 'text-amber-500'}`} />
                      <span>{sub.label}</span>
                    </div>
                    {sub.badge && (
                      <span className={`px-1.5 py-0.5 rounded text-[9px] font-black ${
                        sub.isActive ? 'bg-white/25 text-white' : 'bg-slate-100 text-slate-600'
                      }`}>
                        {sub.badge}
                      </span>
                    )}
                  </Link>
                ))}
              </div>
            )}
          </div>

          {/* 4. Visa (Collapsible Dropdown matching Desktop) */}
          <div className="space-y-1">
            <button
              type="button"
              onClick={() => setVisaOpen(prev => !prev)}
              className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-sm font-medium transition-colors cursor-pointer ${
                isVisaRoute
                  ? activeCountry === 'japan' ? 'bg-red-50 text-red-700 font-extrabold border-l-4 border-red-600' : 'bg-blue-50 text-blue-700 font-extrabold border-l-4 border-blue-600'
                  : 'text-slate-700 hover:bg-slate-50'
              }`}
            >
              <div className="flex items-center gap-3">
                <Shield className={`w-4 h-4 shrink-0 ${
                  isVisaRoute ? (activeCountry === 'japan' ? 'text-red-600' : 'text-blue-600') : 'text-slate-400'
                }`} />
                <span>Visa &amp; Interview</span>
              </div>
              <ChevronDown className={`w-4 h-4 text-slate-400 transition-transform duration-200 ${visaOpen ? 'rotate-180 text-slate-600' : ''}`} />
            </button>

            {visaOpen && (
              <div className="ml-5 pl-2.5 my-1 border-l-2 border-slate-200 space-y-1 animate-fade-in">
                {visaSubItems.map((sub) => (
                  <Link
                    key={sub.key}
                    href={sub.href}
                    onClick={onClose}
                    className={`flex items-center justify-between px-3 py-2 rounded-xl text-xs font-bold transition-all ${
                      sub.isActive
                        ? activeCountry === 'japan'
                          ? 'bg-red-600 text-white shadow-xs'
                          : 'bg-blue-600 text-white shadow-xs'
                        : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <sub.Icon className={`w-3.5 h-3.5 ${sub.isActive ? 'text-white' : 'text-slate-500'}`} />
                      <span>{sub.label}</span>
                    </div>
                    {sub.badge && (
                      <span className={`px-1.5 py-0.5 rounded text-[9px] font-black ${
                        sub.isActive ? 'bg-white/25 text-white' : 'bg-slate-100 text-slate-600'
                      }`}>
                        {sub.badge}
                      </span>
                    )}
                  </Link>
                ))}
              </div>
            )}
          </div>

          {/* 5. Rooms */}
          <Link
            href={getScopedHref('rooms')}
            onClick={onClose}
            className={`flex items-center justify-between px-3.5 py-2.5 rounded-xl text-sm font-medium transition-colors ${
              isActive(getScopedHref('rooms'))
                ? activeCountry === 'japan' ? 'bg-red-50 text-red-700 font-extrabold border-l-4 border-red-600' : 'bg-blue-50 text-blue-700 font-extrabold border-l-4 border-blue-600'
                : 'text-slate-700 hover:bg-slate-50'
            }`}
          >
            <div className="flex items-center gap-3">
              <Building className={`w-4 h-4 shrink-0 ${
                isActive(getScopedHref('rooms')) ? (activeCountry === 'japan' ? 'text-red-600' : 'text-blue-600') : 'text-slate-400'
              }`} />
              <span>Rooms</span>
            </div>
            <span className="px-1.5 py-0.5 rounded text-[9px] font-black bg-purple-100 text-purple-800">
              Housing
            </span>
          </Link>

          {/* 6. Jobs */}
          <Link
            href={getScopedHref('jobs')}
            onClick={onClose}
            className={`flex items-center justify-between px-3.5 py-2.5 rounded-xl text-sm font-medium transition-colors ${
              isActive(getScopedHref('jobs'))
                ? activeCountry === 'japan' ? 'bg-red-50 text-red-700 font-extrabold border-l-4 border-red-600' : 'bg-blue-50 text-blue-700 font-extrabold border-l-4 border-blue-600'
                : 'text-slate-700 hover:bg-slate-50'
            }`}
          >
            <div className="flex items-center gap-3">
              <Briefcase className={`w-4 h-4 shrink-0 ${
                isActive(getScopedHref('jobs')) ? (activeCountry === 'japan' ? 'text-red-600' : 'text-blue-600') : 'text-slate-400'
              }`} />
              <span>Jobs</span>
            </div>
            <span className="px-1.5 py-0.5 rounded text-[9px] font-black bg-purple-100 text-purple-800">
              Careers
            </span>
          </Link>

          {/* 7. Life */}
          <Link
            href={getScopedHref('life')}
            onClick={onClose}
            className={`flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm font-medium transition-colors ${
              isActive(getScopedHref('life'))
                ? activeCountry === 'japan' ? 'bg-red-50 text-red-700 font-extrabold border-l-4 border-red-600' : 'bg-blue-50 text-blue-700 font-extrabold border-l-4 border-blue-600'
                : 'text-slate-700 hover:bg-slate-50'
            }`}
          >
            <Globe className={`w-4 h-4 shrink-0 ${
              isActive(getScopedHref('life')) ? (activeCountry === 'japan' ? 'text-red-600' : 'text-blue-600') : 'text-slate-400'
            }`} />
            <span>Life & Culture</span>
          </Link>

          {/* Secondary Links (Updates & Articles) */}
          <div className="pt-2 pb-1">
            <p className="px-3.5 text-[10px] font-black text-slate-400 uppercase tracking-wider mb-1">Updates &amp; Articles</p>
            {SECONDARY_LINKS.map((link) => {
              const active = isActive(link.href);
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={onClose}
                  className={`flex items-center gap-3 px-3.5 py-2 rounded-xl text-xs font-medium transition-colors ${
                    active
                      ? 'bg-indigo-50 text-indigo-700 font-extrabold border-l-4 border-indigo-600'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                  }`}
                >
                  <link.Icon className={`w-3.5 h-3.5 shrink-0 ${active ? 'text-indigo-600' : 'text-slate-400'}`} />
                  <span>{link.label}</span>
                </Link>
              );
            })}
          </div>

          {/* Featured Guides Section */}
          <div className="pt-1 pb-1">
            {activeCountry === 'korea' ? (
              <div className="space-y-1">
                <p className="px-3.5 text-[10px] font-black text-blue-600 uppercase tracking-wider mb-1">🇰🇷 Featured Guides &amp; KIIP</p>
                <Link
                  href="/korea/exams/kiip"
                  onClick={onClose}
                  className="flex items-center gap-2 p-2 mx-1 rounded-xl bg-blue-50/60 hover:bg-blue-100/70 text-blue-900 text-xs font-bold transition-colors"
                >
                  <span>🏛️ KIIP (사회통합) Full Guide</span>
                </Link>
                <Link
                  href="/blog/kiip-korea-immigration-integration-program-nepali-guide"
                  onClick={onClose}
                  className="flex items-center gap-2 p-2 mx-1 rounded-xl bg-indigo-50/60 hover:bg-indigo-100/70 text-indigo-900 text-xs font-bold transition-colors"
                >
                  <span>📜 TOPIK vs KIIP Nepali Guide</span>
                </Link>
                <Link
                  href="/blog/topik-ii-level-3-6-month-strategy-nepali-guide"
                  onClick={onClose}
                  className="flex items-center gap-2 p-2 mx-1 rounded-xl bg-amber-50/60 hover:bg-amber-100/70 text-amber-900 text-xs font-bold transition-colors"
                >
                  <span>🚀 6-Month TOPIK II Strategy</span>
                </Link>
              </div>
            ) : (
              <div className="space-y-1">
                <p className="px-3.5 text-[10px] font-black text-red-600 uppercase tracking-wider mb-1">🇯🇵 Featured Japan Guides</p>
                <Link
                  href="/japan/exams/jlpt-n5"
                  onClick={onClose}
                  className="flex items-center gap-2 p-2 mx-1 rounded-xl bg-red-50/60 hover:bg-red-100/70 text-red-900 text-xs font-bold transition-colors"
                >
                  <span>🗾 JLPT N5 Official Simulation</span>
                </Link>
                <Link
                  href="/japan/visa/ssw"
                  onClick={onClose}
                  className="flex items-center gap-2 p-2 mx-1 rounded-xl bg-amber-50/60 hover:bg-amber-100/70 text-amber-900 text-xs font-bold transition-colors"
                >
                  <span>📑 SSW-1 Visa Roadmap &amp; Skills</span>
                </Link>
                <Link
                  href="/japan/jobs"
                  onClick={onClose}
                  className="flex items-center gap-2 p-2 mx-1 rounded-xl bg-emerald-50/60 hover:bg-emerald-100/70 text-emerald-900 text-xs font-bold transition-colors"
                >
                  <span>💼 Arubaito &amp; 28h Rule Guide</span>
                </Link>
              </div>
            )}
          </div>
        </nav>

        {/* Consult Now CTA Button matching Desktop Sidebar */}
        <div className="px-3 py-2 border-t border-slate-100 bg-slate-50/50">
          <Link
            href="/consultancy"
            onClick={onClose}
            className="flex items-center justify-between gap-2 w-full px-3.5 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-600 active:bg-emerald-700 text-white text-xs font-black transition-all shadow-sm shadow-emerald-500/20 cursor-pointer"
          >
            <div className="flex items-center gap-2">
              <Handshake className="w-4 h-4 shrink-0" />
              <span>Consult Now</span>
              <span className="px-1.5 py-0.5 rounded-full bg-white/20 text-white text-[9px] font-black uppercase">
                Free 15m
              </span>
            </div>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {/* Footer Auth */}
        <div className="border-t border-slate-100 px-4 py-2.5 bg-white">
          {user ? (
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-indigo-100 text-indigo-700 font-bold text-xs flex items-center justify-center shrink-0">
                {user.name.charAt(0).toUpperCase()}
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-xs font-bold text-slate-900 truncate">{user.name}</p>
                <p className="text-[11px] text-slate-500 truncate">{user.email}</p>
              </div>
            </div>
          ) : (
            <div className="flex gap-2">
              <button
                onClick={() => { onAuthOpen('signin'); onClose(); }}
                className="flex-1 flex items-center justify-center gap-1.5 py-2 rounded-xl border border-slate-200 text-xs font-bold text-slate-800 hover:bg-slate-50 transition-colors cursor-pointer"
              >
                <LogIn className="w-3.5 h-3.5" /> Sign in
              </button>
              <button
                onClick={() => { onAuthOpen('register'); onClose(); }}
                className="flex-1 flex items-center justify-center gap-1.5 py-2 rounded-xl bg-slate-900 text-xs font-bold text-white hover:bg-slate-800 transition-colors cursor-pointer"
              >
                <User className="w-3.5 h-3.5" /> Register
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

