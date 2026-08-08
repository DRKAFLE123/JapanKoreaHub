'use client';
import React from 'react';
import Link from 'next/link';
import {
  BookOpen, ClipboardList, Shield, Briefcase,
  GraduationCap, Globe, ChevronRight, ArrowRight, Sparkles,
  Bell, Award, Headphones, CheckCircle2, Flame, Users
} from 'lucide-react';
import MobileNavbar from '@/components/layout/MobileNavbar';
import BottomTabBar from '@/components/layout/BottomTabBar';

type Country = 'japan' | 'korea';

const COUNTRY_CONFIG = {
  japan: {
    name: 'Japan',
    flag: '🇯🇵',
    theme: {
      primaryBtn: 'bg-red-600 hover:bg-red-700 text-white shadow-sm',
      accentText: 'text-red-600',
      badgeBg: 'bg-red-50 text-red-700 border-red-200',
      heroGrad: 'from-red-950/20 via-slate-900 to-slate-950',
      borderAccent: 'border-red-500/20',
      cardHover: 'hover:border-red-500/40 hover:shadow-red-950/20',
    },
    hero: {
      badge: '🇯🇵 Official Japan Portal',
      title: 'Your gateway to Japan',
      tagline: 'Learn. Study. Work. Live.',
      sub: 'Japanese learning, JLPT & JFT preparation, visa information, study opportunities, SSW jobs and life guides — all in one place.',
    },
    notices: [
      { id: 'j1', date: 'AUG 2026', cat: '🇯🇵 SSW Visa', title: 'SSW Agriculture & Kaigo Caregiving 2026 Assessment Schedule', href: '/notices' },
      { id: 'j2', date: 'JUL 2026', cat: '🇯🇵 JLPT Exam', title: 'JLPT December 2026 Registration & Overseas Test Center Notice', href: '/notices' },
      { id: 'j3', date: 'JUN 2026', cat: '🇯🇵 MEXT Study', title: 'MEXT Embassy Scholarship 2027 Guidelines & Application Open', href: '/notices' },
    ],
    popularTracks: [
      { level: 'BASICS', label: 'Japanese Basics', desc: 'Hiragana & Katakana Vowels & Stroke Guides', count: '12 Lessons', emoji: '🌱', href: '/japan/learn?level=BASICS' },
      { level: 'N5',     label: 'JLPT N5 Master', desc: 'Minna no Nihongo Shokyu I (Vocabulary & Grammar)', count: '25 Lessons', emoji: '🎗', href: '/japan/learn?level=N5' },
      { level: 'JFT',    label: 'JFT-Basic CBT', desc: 'Required 250-mark CBT exam prep for SSW workers', count: '50 Lessons', emoji: '⏱', href: '/japan/learn?level=JFT' },
      { level: 'KANJI',  label: '1,000 Kanji Handbook', desc: 'Complete 1000 Kanji split by N5-N1 with Nepali meanings', count: '1,000 Kanji', emoji: '💮', href: '/japan/learn?level=KANJI_1000' },
    ],
    sections: [
      { href: '/japan/learn',  label: 'Learn Japanese', Icon: BookOpen,     desc: 'Hiragana, Katakana, Minna no Nihongo, Kanji, Grammar & Listening', count: 'Lessons 1-50', color: 'text-indigo-400', bg: 'bg-indigo-950/40 border-indigo-800/50' },
      { href: '/japan/exams',  label: 'Exams & CBT',    Icon: ClipboardList, desc: 'JLPT N5–N1 timed simulators & JFT-Basic CBT engine', count: 'Full Mock Tests', color: 'text-amber-400', bg: 'bg-amber-950/40 border-amber-800/50' },
      { href: '/japan/visa',   label: 'Visa & COE',     Icon: Shield,        desc: 'Student visas, SSW 1 & 2 work permits, COE process & checklist', count: 'Official Checklists', color: 'text-rose-400', bg: 'bg-rose-950/40 border-rose-800/50' },
      { href: '/japan/work',   label: 'SSW Work',       Icon: Briefcase,     desc: 'Specified Skilled Worker sectors, Kaigo, Agriculture, Food Service', count: 'SSW Job Hub', color: 'text-emerald-400', bg: 'bg-emerald-950/40 border-emerald-800/50' },
      { href: '/japan/study',  label: 'Study in Japan', Icon: GraduationCap, desc: 'MEXT Scholarships, Language Schools, University admissions', count: 'School Finder', color: 'text-blue-400', bg: 'bg-blue-950/40 border-blue-800/50' },
      { href: '/japan/life',   label: 'Life in Japan',  Icon: Globe,         desc: 'Cost of living, apartment renting, municipal registration, rights', count: 'Living Guide', color: 'text-purple-400', bg: 'bg-purple-950/40 border-purple-800/50' },
    ],
    featuredExams: [
      { href: '/japan/exams/jlpt-n5',  label: 'JLPT N5 CBT Test',   badge: 'Beginner • 180 Marks' },
      { href: '/japan/exams/jlpt-n4',  label: 'JLPT N4 CBT Test',   badge: 'Elementary • 180 Marks' },
      { href: '/japan/exams/jlpt-n3',  label: 'JLPT N3 CBT Test',   badge: 'Intermediate • 180 Marks' },
      { href: '/japan/exams/jft-basic', label: 'JFT-Basic CBT Engine', badge: 'SSW Required • 250 Marks' },
    ],
  },
  korea: {
    name: 'Korea',
    flag: '🇰🇷',
    theme: {
      primaryBtn: 'bg-blue-600 hover:bg-blue-700 text-white shadow-sm',
      accentText: 'text-blue-500',
      badgeBg: 'bg-blue-50 text-blue-700 border-blue-200',
      heroGrad: 'from-blue-950/20 via-slate-900 to-slate-950',
      borderAccent: 'border-blue-500/20',
      cardHover: 'hover:border-blue-500/40 hover:shadow-blue-950/20',
    },
    hero: {
      badge: '🇰🇷 Official Korea Portal',
      title: 'Your gateway to Korea',
      tagline: 'Learn. Study. Work. Live.',
      sub: 'Korean learning, EPS-TOPIK & TOPIK preparation, visa information, study opportunities, E-9 jobs and life guides — all in one place.',
    },
    notices: [
      { id: 'k1', date: 'AUG 2026', cat: '🇰🇷 EPS-TOPIK', title: 'EPS-TOPIK 2026 Manufacturing & Agriculture Registration Open', href: '/notices' },
      { id: 'k2', date: 'JUL 2026', cat: '🇰🇷 TOPIK Test', title: 'TOPIK 98th International Registration Schedule & Locations', href: '/notices' },
      { id: 'k3', date: 'JUN 2026', cat: '🇰🇷 GKS Study', title: 'Global Korea Scholarship (GKS) 2026 Application Guidelines', href: '/notices' },
    ],
    popularTracks: [
      { level: 'EPS',      label: 'EPS-TOPIK 60 Lessons', desc: 'Official HRD Korea Standard Textbook (Chapters 1-60)', count: '60 Lessons', emoji: '🇰🇷', href: '/korea/learn?level=EPS' },
      { level: 'BASICS',   label: 'Hangul Basics', desc: '14 Consonants, 10 Vowels & Syllable Block Construction', count: '12 Modules', emoji: '🌱', href: '/korea/learn?level=BASICS' },
      { level: 'TOPIK1',   label: 'TOPIK I Master', desc: 'Beginner Reading & Listening Exam Preparation', count: '40 Lessons', emoji: '🏆', href: '/korea/learn?level=TOPIK1_L1' },
      { level: 'WORDS300', label: '300 Common Words', desc: 'Top 300 Essential Daily & Workplace Vocabulary', count: '300 Words', emoji: '📖', href: '/korea/learn?level=BASICS' },
    ],
    sections: [
      { href: '/korea/learn',  label: 'Learn Korean', Icon: BookOpen,     desc: 'Hangul, EPS-TOPIK 60 lessons, TOPIK I & II, 300 Core Words', count: 'Lessons 1-60', color: 'text-indigo-400', bg: 'bg-indigo-950/40 border-indigo-800/50' },
      { href: '/korea/exams',  label: 'Exams & CBT',    Icon: ClipboardList, desc: 'EPS-TOPIK official CBT simulator, TOPIK I & II full tests', count: 'UBT/CBT Tests', color: 'text-amber-400', bg: 'bg-amber-950/40 border-amber-800/50' },
      { href: '/korea/visa',   label: 'Visa & E-9',     Icon: Shield,        desc: 'E-9 non-professional worker visa, D-2 student visa, D-4 language visa', count: 'Visa Checklists', color: 'text-rose-400', bg: 'bg-rose-950/40 border-rose-800/50' },
      { href: '/korea/work',   label: 'EPS Work Sectors', Icon: Briefcase,   desc: 'Manufacturing, Agriculture, Construction, Fishing, Safety', count: '5 Key Sectors', color: 'text-emerald-400', bg: 'bg-emerald-950/40 border-emerald-800/50' },
      { href: '/korea/study',  label: 'Study in Korea', Icon: GraduationCap, desc: 'GKS Global Korea Scholarship, Korean Universities admissions', count: 'University Finder', color: 'text-blue-400', bg: 'bg-blue-950/40 border-blue-800/50' },
      { href: '/korea/life',   label: 'Life in Korea',  Icon: Globe,         desc: 'Cost of living, Alien Registration Card (ARC), rent, rights', count: 'Living Guide', color: 'text-purple-400', bg: 'bg-purple-950/40 border-purple-800/50' },
    ],
    featuredExams: [
      { href: '/korea/exams/eps-topik', label: 'EPS-TOPIK Official CBT Simulator', badge: 'E-9 Required • 200 Pts' },
      { href: '/korea/exams/topik-1',   label: 'TOPIK I Exam Simulator',   badge: 'Level 1 & 2 • 200 Pts' },
      { href: '/korea/exams/topik-2',   label: 'TOPIK II Exam Simulator',  badge: 'Level 3 to 6 • 300 Pts' },
    ],
  },
} as const;

export default function CountryHubClient({ country }: { country: Country }) {
  const cfg = COUNTRY_CONFIG[country];

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans pb-24">
      <MobileNavbar user={null} lang="en" onLangToggle={() => {}} onSearchOpen={() => {}} />

      <main className="max-w-6xl mx-auto px-4 pt-4 md:pt-8 space-y-8">

        {/* 🚀 HERO SECTION */}
        <section className={`relative overflow-hidden rounded-3xl bg-gradient-to-b ${cfg.theme.heroGrad} border border-slate-800 p-6 sm:p-10 shadow-2xl`}>
          <div className="relative z-10 space-y-4 max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider bg-slate-900/90 border border-slate-700 text-slate-300">
              <span>{cfg.hero.badge}</span>
            </div>

            <div className="space-y-1">
              <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
                {cfg.hero.title}
              </h1>
              <p className={`text-base sm:text-xl font-bold ${cfg.theme.accentText}`}>
                {cfg.hero.tagline}
              </p>
            </div>

            <p className="text-sm sm:text-base text-slate-300 leading-relaxed font-medium">
              {cfg.hero.sub}
            </p>

            <div className="pt-2 flex flex-wrap items-center gap-3">
              <Link
                href={`/${country}/learn`}
                className={`px-5 py-2.5 rounded-xl text-sm font-extrabold transition-all flex items-center gap-2 cursor-pointer ${cfg.theme.primaryBtn}`}
              >
                <span>Start {cfg.name} Track</span>
                <ArrowRight className="w-4 h-4" />
              </Link>

              <Link
                href="/consultancy"
                className="px-5 py-2.5 rounded-xl text-sm font-bold bg-slate-900/90 text-slate-200 hover:text-white hover:bg-slate-800 border border-slate-700 transition-all flex items-center gap-2 cursor-pointer"
              >
                <span>🤝 Get Expert Guidance</span>
              </Link>
            </div>
          </div>
        </section>

        {/* 📢 LATEST COUNTRY UPDATES (NOTICES) */}
        <section className="space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Bell className={`w-4 h-4 ${cfg.theme.accentText}`} />
              <h2 className="text-xs font-black uppercase tracking-wider text-slate-400">
                Latest {cfg.name} Updates & Announcements
              </h2>
            </div>
            <Link href="/notices" className={`text-xs font-bold ${cfg.theme.accentText} hover:underline flex items-center gap-1`}>
              View all notices <ChevronRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {cfg.notices.map((n) => (
              <Link
                key={n.id}
                href={n.href}
                className="p-4 bg-slate-900/80 border border-slate-800/90 hover:border-slate-700 rounded-2xl transition-all space-y-2 group cursor-pointer"
              >
                <div className="flex items-center justify-between text-[11px]">
                  <span className="font-extrabold px-2 py-0.5 rounded-md bg-slate-800 text-slate-300 border border-slate-700">
                    {n.cat}
                  </span>
                  <span className="font-bold text-slate-500">{n.date}</span>
                </div>
                <p className="text-xs font-bold text-slate-200 group-hover:text-white line-clamp-2 leading-relaxed">
                  {n.title}
                </p>
              </Link>
            ))}
          </div>
        </section>

        {/* 📚 POPULAR LEARNING TRACKS */}
        <section className="space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <BookOpen className={`w-4 h-4 ${cfg.theme.accentText}`} />
              <h2 className="text-xs font-black uppercase tracking-wider text-slate-400">
                Popular {cfg.name} Learning Curriculum
              </h2>
            </div>
            <Link href={`/${country}/learn`} className={`text-xs font-bold ${cfg.theme.accentText} hover:underline flex items-center gap-1`}>
              Explore curriculum <ChevronRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            {cfg.popularTracks.map((tr) => (
              <Link
                key={tr.level}
                href={tr.href}
                className="p-4 bg-slate-900/90 border border-slate-800 rounded-2xl hover:border-slate-700 hover:bg-slate-850 transition-all space-y-3 group cursor-pointer"
              >
                <div className="flex items-center justify-between">
                  <span className="text-2xl">{tr.emoji}</span>
                  <span className="text-[10px] font-black uppercase px-2 py-0.5 rounded-md bg-slate-800 text-slate-300 border border-slate-700">
                    {tr.count}
                  </span>
                </div>
                <div>
                  <h3 className="text-sm font-extrabold text-white group-hover:text-amber-300 transition-colors">
                    {tr.label}
                  </h3>
                  <p className="text-xs text-slate-400 mt-1 line-clamp-2 leading-relaxed">
                    {tr.desc}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* 🗺 WHAT BRINGS YOU TO COUNTRY? (INTENT GRID) */}
        <section className="space-y-3">
          <div className="flex items-center justify-between">
            <h2 className="text-xs font-black uppercase tracking-wider text-slate-400">
              What Brings You to {cfg.name}?
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {cfg.sections.map(({ href, label, Icon, desc, count, color, bg }) => (
              <Link
                key={href}
                href={href}
                className={`p-5 bg-slate-900/90 border border-slate-800 rounded-2xl transition-all space-y-3 group cursor-pointer ${cfg.theme.cardHover}`}
              >
                <div className="flex items-center justify-between">
                  <div className={`w-10 h-10 rounded-xl ${bg} border flex items-center justify-center`}>
                    <Icon className={`w-5 h-5 ${color}`} />
                  </div>
                  <span className="text-[10px] font-black text-slate-400 uppercase tracking-wider bg-slate-950 px-2 py-1 rounded-lg border border-slate-800">
                    {count}
                  </span>
                </div>
                <div>
                  <h3 className="text-base font-extrabold text-white group-hover:text-cyan-300 transition-colors">
                    {label}
                  </h3>
                  <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                    {desc}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* ⏱ FEATURED EXAMS */}
        <section className="space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <ClipboardList className={`w-4 h-4 ${cfg.theme.accentText}`} />
              <h2 className="text-xs font-black uppercase tracking-wider text-slate-400">
                Official Exam & CBT Simulators
              </h2>
            </div>
            <Link href={`/${country}/exams`} className={`text-xs font-bold ${cfg.theme.accentText} hover:underline flex items-center gap-1`}>
              All exams <ChevronRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {cfg.featuredExams.map(({ href, label, badge }) => (
              <Link
                key={href}
                href={href}
                className="p-4 bg-slate-900/90 border border-slate-800 rounded-2xl hover:border-slate-700 transition-all flex items-center justify-between group cursor-pointer"
              >
                <div>
                  <h3 className="text-sm font-extrabold text-white group-hover:text-amber-300 transition-colors">
                    {label}
                  </h3>
                  <span className="text-[11px] font-bold text-slate-400 mt-0.5 block">
                    {badge}
                  </span>
                </div>
                <ChevronRight className="w-4 h-4 text-slate-500 group-hover:text-white transition-colors" />
              </Link>
            ))}
          </div>
        </section>

        {/* 🤝 GET EXPERT GUIDANCE CTA BANNER */}
        <section className="pt-2">
          <div className="p-6 sm:p-8 bg-gradient-to-r from-slate-900 via-slate-900/95 to-slate-900 border border-slate-800 rounded-3xl shadow-xl flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <span className="text-lg">🤝</span>
                <h3 className="text-lg font-black text-white">Get expert guidance</h3>
              </div>
              <p className="text-xs sm:text-sm text-slate-300 font-medium">
                Visa, study & application assistance for {cfg.name} from verified consultants.
              </p>
            </div>

            <Link
              href="/consultancy"
              className={`px-5 py-2.5 rounded-xl text-xs font-extrabold transition-all whitespace-nowrap self-start sm:self-auto cursor-pointer ${cfg.theme.primaryBtn}`}
            >
              Visa & Application Help →
            </Link>
          </div>
        </section>

      </main>

      <BottomTabBar />
    </div>
  );
}
