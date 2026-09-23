'use client';
import React from 'react';
import Link from 'next/link';
import {
  BookOpen, ClipboardList, Shield, Briefcase, Home as HomeIcon,
  GraduationCap, Globe, ChevronRight, ArrowRight, Sparkles,
  Bell, Award, Headphones, CheckCircle2, Flame, Users, Clock
} from 'lucide-react';

import { useTranslation } from '@/lib/i18n/LanguageContext';

type Country = 'japan' | 'korea';

const COUNTRY_CONFIG = {
  japan: {
    name: 'Japan',
    flag: '🇯🇵',
    theme: {
      primaryBtn: 'bg-red-600 hover:bg-red-700 text-white shadow-sm',
      accentText: 'text-red-600',
      badgeBg: 'bg-red-50 text-red-700 border-red-200',
      heroGrad: 'from-red-50/80 via-white to-rose-50/60 border-red-100',
      cardHover: 'hover:border-red-300 hover:shadow-md',
      chipColor: 'bg-red-100 text-red-800',
    },
    hero: {
      badge: '🇯🇵 Official Japan Hub',
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
      { href: '/japan/learn',  label: 'Learn Japanese', Icon: BookOpen,     desc: 'Hiragana, Katakana, Minna no Nihongo, Kanji, Grammar & Listening', count: 'Lessons 1-50', color: 'text-indigo-600', bg: 'bg-indigo-50 border-indigo-100' },
      { href: '/japan/mock-test',  label: 'Exams & CBT',    Icon: ClipboardList, desc: 'JLPT N5–N1 timed simulators & JFT-Basic CBT engine', count: 'Full Mock Tests', color: 'text-amber-600', bg: 'bg-amber-50 border-amber-100' },
      { href: '/japan/visa',   label: 'Visa & COE',     Icon: Shield,        desc: 'Student visas, SSW 1 & 2 work permits, COE process & checklist', count: 'Official Checklists', color: 'text-rose-600', bg: 'bg-rose-50 border-rose-100' },
      { href: '/japan/work',   label: 'SSW Work',       Icon: Briefcase,     desc: 'Specified Skilled Worker sectors, Kaigo, Agriculture, Food Service', count: 'SSW Job Hub', color: 'text-emerald-600', bg: 'bg-emerald-50 border-emerald-100' },
      { href: '/japan/study',  label: 'Study in Japan', Icon: GraduationCap, desc: 'MEXT Scholarships, Language Schools, University admissions', count: 'School Finder', color: 'text-blue-600', bg: 'bg-blue-50 border-blue-100' },
      { href: '/japan/life',   label: 'Life & Culture', Icon: Globe,         desc: 'Cost of living, housing, cultural etiquette & traditions', count: 'Living & Culture', color: 'text-purple-600', bg: 'bg-purple-50 border-purple-100' },
    ],
    featuredExams: [
      { href: '/japan/mock-test/jlpt-n5',  label: 'JLPT N5 CBT Test',   badge: 'Beginner • 180 Marks' },
      { href: '/japan/mock-test/jlpt-n4',  label: 'JLPT N4 CBT Test',   badge: 'Elementary • 180 Marks' },
      { href: '/japan/mock-test/jlpt-n3',  label: 'JLPT N3 CBT Test',   badge: 'Intermediate • 180 Marks' },
      { href: '/japan/mock-test/jft-basic', label: 'JFT-Basic CBT Engine', badge: 'SSW Required • 250 Marks' },
    ],
    featuredBlogs: [
      {
        id: 'j-ssw-guide',
        cat: 'SSW WORK VISA',
        catColor: 'bg-emerald-50 text-emerald-700 border-emerald-200',
        readTime: '5 min read',
        title: 'Complete SSW 1 Visa Roadmap: Required Skills, Salary & Prometric CBT Steps',
        titleNe: 'जापान एसएसडब्लु १ (SSW 1) भिसा पूर्ण गाइड: योग्यता, तलब र आवेदन प्रक्रिया',
        excerpt: 'Comprehensive breakdown of Kaigo, Agriculture & Food Service skill evaluation tests, JFT-Basic scoring, and finding direct employers in Japan.',
        excerptNe: 'केयरगिभर, कृषि र फुड सर्भिस सीबीटी परीक्षाको ढाँचा, जेएफटी उत्तीर्णांक र प्रत्यक्ष रोजगारदाता खोज्ने प्रमाणित विधि।',
        href: '/japan/work',
        emoji: '💼',
      },
      {
        id: 'j-jlpt-prep',
        cat: 'EXAM ROADMAP',
        catColor: 'bg-indigo-50 text-indigo-700 border-indigo-200',
        readTime: '4 min read',
        title: 'How to Pass JLPT N5 & JFT-Basic in 90 Days: Self-Study Roadmap',
        titleNe: '९० दिनमा JLPT N5 र JFT-Basic पास गर्ने प्रभावकारी स्व-अध्ययन तालिका',
        excerpt: 'Essential Minna no Nihongo chapters, 100 core grammar patterns, and daily listening strategies for guaranteed high marks.',
        excerptNe: 'मिन्ना नो निहोङ्गोका मुख्य पाठहरू, १०० आधारभूत व्याकरण र परीक्षामा उच्च अंक ल्याउने दैनिक अभ्यास तालिका।',
        href: '/japan/learn',
        emoji: '🎯',
      },
      {
        id: 'j-living-costs',
        cat: 'LIVING IN JAPAN',
        catColor: 'bg-purple-50 text-purple-700 border-purple-200',
        readTime: '4 min read',
        title: 'Cost of Living in Tokyo vs Osaka: Student & Worker Budget Breakdown',
        titleNe: 'टोकियो र ओसाकामा जीवनयापन खर्च: विद्यार्थी र कामदारको मासिक बजेट',
        excerpt: 'Realistic monthly expenses covering zero-deposit sharehouses, supermarket groceries, commuter passes, and national health insurance.',
        excerptNe: 'जिरो-डिपोजिट सेयरहाउस, दैनिक उपभोग्य वस्तु, रेल पास र स्वास्थ्य बीमा सहितको वास्तविक मासिक खर्च विवरण।',
        href: '/japan/life',
        emoji: '💴',
      },
    ],
  },
  korea: {
    name: 'Korea',
    flag: '🇰🇷',
    theme: {
      primaryBtn: 'bg-blue-600 hover:bg-blue-700 text-white shadow-sm',
      accentText: 'text-blue-600',
      badgeBg: 'bg-blue-50 text-blue-700 border-blue-200',
      heroGrad: 'from-blue-50/80 via-white to-indigo-50/60 border-blue-100',
      cardHover: 'hover:border-blue-300 hover:shadow-md',
      chipColor: 'bg-blue-100 text-blue-800',
    },
    hero: {
      badge: '🇰🇷 Official Korea Hub',
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
      { href: '/korea/learn',  label: 'Learn Korean', Icon: BookOpen,     desc: 'Hangul, EPS-TOPIK 60 lessons, TOPIK I & II, 300 Core Words', count: 'Lessons 1-60', color: 'text-indigo-600', bg: 'bg-indigo-50 border-indigo-100' },
      { href: '/korea/mock-test',  label: 'Exams & CBT',    Icon: ClipboardList, desc: 'EPS-TOPIK official CBT simulator, TOPIK I & II full tests', count: 'UBT/CBT Tests', color: 'text-amber-600', bg: 'bg-amber-50 border-amber-100' },
      { href: '/korea/visa',   label: 'Visa & E-9',     Icon: Shield,        desc: 'E-9 non-professional worker visa, D-2 student visa, D-4 language visa', count: 'Visa Checklists', color: 'text-rose-600', bg: 'bg-rose-50 border-rose-100' },
      { href: '/korea/work',   label: 'EPS Work Sectors', Icon: Briefcase,   desc: 'Manufacturing, Agriculture, Construction, Fishing, Safety', count: '5 Key Sectors', color: 'text-emerald-600', bg: 'bg-emerald-50 border-emerald-100' },
      { href: '/korea/study',  label: 'Study in Korea', Icon: GraduationCap, desc: 'GKS Global Korea Scholarship, Korean Universities admissions', count: 'University Finder', color: 'text-blue-600', bg: 'bg-blue-50 border-blue-100' },
      { href: '/korea/life',   label: 'Life & Culture', Icon: Globe,         desc: 'Cost of living, housing, Korean etiquette & workplace culture', count: 'Living & Culture', color: 'text-purple-600', bg: 'bg-purple-50 border-purple-100' },
    ],
    featuredExams: [
      { href: '/korea/mock-test/eps-topik', label: 'EPS-TOPIK Official CBT Simulator', badge: 'E-9 Required • 200 Pts' },
      { href: '/korea/mock-test/topik-1',   label: 'TOPIK I Exam Simulator',   badge: 'Level 1 & 2 • 200 Pts' },
      { href: '/korea/mock-test/topik-2',   label: 'TOPIK II Exam Simulator',  badge: 'Level 3 to 6 • 300 Pts' },
    ],
    featuredBlogs: [
      {
        id: 'k-eps-guide',
        cat: 'EPS WORK PERMIT',
        catColor: 'bg-blue-50 text-blue-700 border-blue-200',
        readTime: '5 min read',
        title: 'EPS-TOPIK 2026 Master Guide: Exam Pattern, Cutoff Marks & Manufacturing Prep',
        titleNe: 'ईपीएस-टोपिक २०२६ पूर्ण गाइड: परीक्षा संरचना, उत्तीर्णांक र तयारी टिप्स',
        excerpt: 'Step-by-step preparation for the 60 official HRD Korea textbook chapters, UBT/CBT computer exam environment, and skill tests.',
        excerptNe: 'एचआरडी कोरियाको ६० पाठे आधिकारिक पाठ्यपुस्तक, युबिटी कम्प्युटर परीक्षा प्रणाली र सीप परीक्षणको तयारी।',
        href: '/korea/work',
        emoji: '🏭',
      },
      {
        id: 'k-e74-pathway',
        cat: 'VISA CONVERSION',
        catColor: 'bg-emerald-50 text-emerald-700 border-emerald-200',
        readTime: '4 min read',
        title: 'E-9 to E-7-4 Skilled Visa Pathway: How to Transition to Long-term Residency',
        titleNe: 'ई-९ बाट ई-७-४ दक्ष भिसा रूपान्तरण: स्थायी बसोबासको कानुनी प्रक्रिया',
        excerpt: 'Understand the new K-point E-7-4 quota, TOPIK level requirements, annual salary thresholds, and bringing family to South Korea.',
        excerptNe: 'के-पोइन्ट प्रणालीको नयाँ कोटा, आवश्यक टोपिक लेभल, न्यूनतम आम्दानी मापदण्ड र परिवार ल्याउने कानुनी आधार।',
        href: '/korea/visa',
        emoji: '🛡️',
      },
      {
        id: 'k-living-costs',
        cat: 'LIVING IN KOREA',
        catColor: 'bg-purple-50 text-purple-700 border-purple-200',
        readTime: '4 min read',
        title: 'Living in Seoul: Goshiwon vs One-Room & Monthly Cost of Living',
        titleNe: 'सियोलमा बसाइ: गोसिवन र वान-रुम बीचको भिन्नता र मासिक खर्च विवरण',
        excerpt: 'Key differences between zero-deposit Goshiwons and deposit-heavy Wolse rentals, grocery budgeting, and subway transit discounts.',
        excerptNe: 'डिपोजिट बिनाको गोसिवन र वान-रुम बीचको भिन्नता, मासिक खाना खर्च र सबवे यातायात छुटका उपायहरू।',
        href: '/korea/rooms',
        emoji: '🏢',
      },
    ],
  },
} as const;

export default function CountryHubClient({ country }: { country: Country }) {
  const cfg = COUNTRY_CONFIG[country];
  const { lang, t, toggleLang } = useTranslation();
  const isNe = lang === 'ne';

  const heroTitle = isNe 
    ? (country === 'japan' ? t('japanGatewayTitle') : t('koreaGatewayTitle'))
    : cfg.hero.title;

  const heroSub = isNe 
    ? (country === 'japan' ? t('japanSub') : t('koreaSub'))
    : cfg.hero.sub;

  const startTrackLabel = isNe
    ? (country === 'japan' ? t('startJapaneseTrack') : t('startKoreanTrack'))
    : `Start ${cfg.name} Track`;

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans pb-24">
      <main className="max-w-6xl mx-auto px-4 pt-2 sm:pt-4 md:pt-8 space-y-8">

        {/* 🚀 LIGHT HERO SECTION */}
        <section className={`relative overflow-hidden rounded-3xl bg-gradient-to-br ${cfg.theme.heroGrad} border p-6 sm:p-10 shadow-sm`}>
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
            
            {/* Left Content */}
            <div className="md:col-span-7 space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider bg-white/90 border border-slate-200 text-slate-700 shadow-xs">
                <span>{isNe ? (country === 'japan' ? '🇯🇵 जापानी पोर्टल' : '🇰🇷 कोरियन पोर्टल') : cfg.hero.badge}</span>
              </div>

              <div className="space-y-1">
                <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-slate-900 tracking-tight">
                  {heroTitle}
                </h1>
                <p className={`text-base sm:text-xl font-bold ${cfg.theme.accentText}`}>
                  {isNe ? t('heroTitle') : cfg.hero.tagline}
                </p>
              </div>

              <p className="text-sm sm:text-base text-slate-600 max-w-2xl leading-relaxed font-medium">
                {heroSub}
              </p>

              <div className="pt-2 flex flex-wrap items-center gap-3">
                <Link
                  href={`/${country}/learn`}
                  className={`px-5 py-2.5 rounded-xl text-sm font-extrabold transition-all flex items-center gap-2 cursor-pointer ${cfg.theme.primaryBtn}`}
                >
                  <span>{startTrackLabel}</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
                <Link
                  href="/consultancy"
                  className="px-5 py-2.5 rounded-xl text-sm font-bold bg-white border border-slate-200 text-slate-700 hover:bg-slate-50 transition-colors"
                >
                  {isNe ? 'सेवाहरू हेर्नुहोस्' : 'Explore Services'}
                </Link>
              </div>
            </div>

            {/* Right Landmark Illustration — Blended into background (no card box) */}
            <div className="md:col-span-5 flex justify-center items-center">
              <div className="relative w-full max-w-[220px] sm:max-w-sm mx-auto">
                <img
                  src={country === 'japan' ? '/japan_hero_landmarks.png' : '/korea_hero_landmarks.png'}
                  alt={`${cfg.name} Landmarks`}
                  className="w-full h-auto object-contain mix-blend-multiply hover:scale-102 transition-transform duration-300 pointer-events-none"
                />
              </div>
            </div>

          </div>
        </section>

        {/* 🧭 OPTION 2: 4-CARD APP-STYLE QUICK HUB BAR */}
        <section aria-label="Platform Pillars" className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
          
          {/* Card 1: Study & Learn */}
          <Link
            href={`/${country}/learn`}
            className="group relative bg-white border border-slate-200/90 rounded-2xl p-3.5 sm:p-4 shadow-xs hover:shadow-md hover:border-indigo-300 hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200 flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between mb-3">
                <div className="w-10 h-10 rounded-xl bg-indigo-50 border border-indigo-100 flex items-center justify-center text-indigo-600 group-hover:scale-105 transition-transform">
                  <BookOpen className="w-5 h-5" />
                </div>
                <span className="text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded-full bg-indigo-50/80 text-indigo-700 border border-indigo-100">
                  {isNe ? 'पाठ्यक्रम' : 'Courses'}
                </span>
              </div>
              <h2 className="text-sm sm:text-base font-black text-slate-900 group-hover:text-indigo-600 transition-colors flex items-center gap-1">
                <span>{isNe ? 'पढ्नुहोस् र सिक्नुहोस्' : 'Study & Learn'}</span>
                <ChevronRight className="w-3.5 h-3.5 opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all text-indigo-600" />
              </h2>
              <p className="text-[11px] sm:text-xs text-slate-500 line-clamp-1 mt-0.5">
                {isNe 
                  ? (country === 'japan' ? 'JLPT र JFT तयारी' : 'EPS-TOPIK ६० पाठ')
                  : (country === 'japan' ? 'JLPT & JFT curriculum' : 'EPS-TOPIK 60 lessons')}
              </p>
            </div>
          </Link>

          {/* Card 2: Mock CBT Exams */}
          <Link
            href={`/${country}/mock-test`}
            className="group relative bg-white border border-slate-200/90 rounded-2xl p-3.5 sm:p-4 shadow-xs hover:shadow-md hover:border-amber-300 hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200 flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between mb-3">
                <div className="w-10 h-10 rounded-xl bg-amber-50 border border-amber-100 flex items-center justify-center text-amber-600 group-hover:scale-105 transition-transform">
                  <ClipboardList className="w-5 h-5" />
                </div>
                <span className="text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded-full bg-amber-50/80 text-amber-700 border border-amber-100">
                  {isNe ? 'अभ्यास' : 'Practice'}
                </span>
              </div>
              <h2 className="text-sm sm:text-base font-black text-slate-900 group-hover:text-amber-600 transition-colors flex items-center gap-1">
                <span>{isNe ? 'मोडल परीक्षा' : 'Mock CBT Exams'}</span>
                <ChevronRight className="w-3.5 h-3.5 opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all text-amber-600" />
              </h2>
              <p className="text-[11px] sm:text-xs text-slate-500 line-clamp-1 mt-0.5">
                {isNe 
                  ? 'CBT वास्तविक परीक्षा सेट' 
                  : 'Real timed CBT simulator'}
              </p>
            </div>
          </Link>

          {/* Card 3: Find Jobs */}
          <Link
            href={`/${country}/jobs`}
            className="group relative bg-white border border-slate-200/90 rounded-2xl p-3.5 sm:p-4 shadow-xs hover:shadow-md hover:border-emerald-300 hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200 flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between mb-3">
                <div className="w-10 h-10 rounded-xl bg-emerald-50 border border-emerald-100 flex items-center justify-center text-emerald-600 group-hover:scale-105 transition-transform">
                  <Briefcase className="w-5 h-5" />
                </div>
                <span className="text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded-full bg-emerald-50/80 text-emerald-700 border border-emerald-100 flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                  <span>{isNe ? 'नयाँ' : 'Live'}</span>
                </span>
              </div>
              <h2 className="text-sm sm:text-base font-black text-slate-900 group-hover:text-emerald-600 transition-colors flex items-center gap-1">
                <span>{isNe ? 'काम खोज्नुहोस्' : 'Find Jobs'}</span>
                <ChevronRight className="w-3.5 h-3.5 opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all text-emerald-600" />
              </h2>
              <p className="text-[11px] sm:text-xs text-slate-500 line-clamp-1 mt-0.5">
                {isNe 
                  ? 'पार्ट-टाइम र SSW अवसर' 
                  : (country === 'japan' ? 'Arubaito & SSW listings' : 'E-9 & part-time jobs')}
              </p>
            </div>
          </Link>

          {/* Card 4: Find Rooms */}
          <Link
            href={`/${country}/rooms`}
            className="group relative bg-white border border-slate-200/90 rounded-2xl p-3.5 sm:p-4 shadow-xs hover:shadow-md hover:border-sky-300 hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200 flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between mb-3">
                <div className="w-10 h-10 rounded-xl bg-sky-50 border border-sky-100 flex items-center justify-center text-sky-600 group-hover:scale-105 transition-transform">
                  <HomeIcon className="w-5 h-5" />
                </div>
                <span className="text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded-full bg-sky-50/80 text-sky-700 border border-sky-100">
                  {isNe ? 'प्रमाणित' : 'Verified'}
                </span>
              </div>
              <h2 className="text-sm sm:text-base font-black text-slate-900 group-hover:text-sky-600 transition-colors flex items-center gap-1">
                <span>{isNe ? 'कोठा खोज्नुहोस्' : 'Find Rooms'}</span>
                <ChevronRight className="w-3.5 h-3.5 opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all text-sky-600" />
              </h2>
              <p className="text-[11px] sm:text-xs text-slate-500 line-clamp-1 mt-0.5">
                {isNe 
                  ? 'जिरो डिपोजिट र सेयर बसाइ' 
                  : '0-deposit & shared stays'}
              </p>
            </div>
          </Link>

        </section>

        {/* 📢 COMPACT SINGLE-LINE OFFICIAL ALERT BAR */}
        <section aria-label="Official Announcements Ticker">
          <div className="bg-white border border-slate-200/90 rounded-2xl p-2.5 sm:px-4 sm:py-2.5 shadow-2xs flex items-center justify-between gap-3 hover:border-slate-300 transition-colors">
            <div className="flex items-center gap-2.5 min-w-0">
              <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-rose-50 text-rose-700 border border-rose-200 text-[11px] font-bold shrink-0">
                <span className="w-1.5 h-1.5 rounded-full bg-rose-500 animate-pulse" />
                <span>{isNe ? 'आधिकारिक सूचना' : 'OFFICIAL ALERT'}</span>
              </span>
              <Link href="/notices" className="text-xs sm:text-sm font-semibold text-slate-800 hover:text-indigo-600 truncate">
                <span className="font-extrabold text-slate-900 mr-1.5">{cfg.notices[0]?.cat}:</span>
                <span>{cfg.notices[0]?.title}</span>
              </Link>
            </div>
            <Link href="/notices" className={`text-xs font-bold ${cfg.theme.accentText} hover:underline shrink-0 flex items-center gap-1`}>
              <span>{isNe ? 'सबै सूचना' : 'All Updates'}</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </section>

        {/* 📚 POPULAR LEARNING TRACKS */}
        <section className="space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <BookOpen className={`w-4 h-4 ${cfg.theme.accentText}`} />
              <h2 className="text-xs font-black uppercase tracking-wider text-slate-500">
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
                className="p-4 bg-white border border-gray-200/90 rounded-2xl hover:border-gray-300 hover:shadow-md transition-all space-y-3 group cursor-pointer"
              >
                <div className="flex items-center justify-between">
                  <span className="text-2xl">{tr.emoji}</span>
                  <span className="text-[10px] font-black uppercase px-2 py-0.5 rounded-md bg-slate-100 text-slate-600 border border-slate-200">
                    {tr.count}
                  </span>
                </div>
                <div>
                  <h3 className="text-sm font-extrabold text-slate-900 group-hover:text-blue-600 transition-colors">
                    {tr.label}
                  </h3>
                  <p className="text-xs text-slate-500 mt-1 line-clamp-2 leading-relaxed">
                    {tr.desc}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* 📰 DEDICATED 3-COLUMN FEATURED COUNTRY GUIDES (BLOGS) */}
        <section className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <BookOpen className={`w-4.5 h-4.5 ${cfg.theme.accentText}`} />
              <div>
                <h2 className="text-base sm:text-lg font-bold text-slate-900 tracking-tight">
                  {isNe ? (country === 'japan' ? '🇯🇵 विशेष जापानी गाइड तथा लेखहरू' : '🇰🇷 विशेष कोरियन गाइड तथा लेखहरू') : `Featured ${cfg.name} Guides & Stories`}
                </h2>
                <p className="text-xs text-slate-500">
                  {isNe ? 'भिसा, अध्ययन र रोजगारीका लागि प्रमाणित मार्गनिर्देशन' : `Practical roadmaps, visa procedures & living advice for ${cfg.name}`}
                </p>
              </div>
            </div>
            <Link href={`/${country}/life`} className={`text-xs font-bold ${cfg.theme.accentText} hover:underline flex items-center gap-1 shrink-0`}>
              <span>{t('viewAll')}</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {cfg.featuredBlogs.map((b) => (
              <Link
                key={b.id}
                href={b.href}
                className="bg-white border border-slate-200/90 rounded-2xl p-5 hover:border-slate-300 hover:shadow-md transition-all duration-200 flex flex-col justify-between group cursor-pointer"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between gap-2">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-extrabold tracking-wide border ${b.catColor}`}>
                      {b.cat}
                    </span>
                    <span className="inline-flex items-center gap-1 text-[11px] font-medium text-slate-400 shrink-0">
                      <Clock className="w-3 h-3 text-slate-400" />
                      <span>{b.readTime}</span>
                    </span>
                  </div>

                  <h3 className="text-sm sm:text-base font-bold text-slate-900 leading-snug tracking-tight group-hover:text-indigo-600 transition-colors line-clamp-2">
                    {isNe ? b.titleNe : b.title}
                  </h3>

                  <p className="text-xs text-slate-600 font-normal leading-relaxed line-clamp-2">
                    {isNe ? b.excerptNe : b.excerpt}
                  </p>
                </div>

                <div className="pt-3 mt-3 border-t border-slate-100 flex items-center justify-between text-xs font-semibold text-slate-500 group-hover:text-indigo-600 transition-colors">
                  <span className="flex items-center gap-1.5">
                    <span className="text-sm">{b.emoji}</span>
                    <span>{isNe ? 'विस्तृत गाइड पढ्नुहोस्' : 'Read Guide'}</span>
                  </span>
                  <ArrowRight className="w-3.5 h-3.5 -translate-x-1 group-hover:translate-x-0 transition-transform" />
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* 🗺 WHAT BRINGS YOU TO COUNTRY? (INTENT GRID) */}
        <section className="space-y-3">
          <div className="flex items-center justify-between">
            <h2 className="text-xs font-black uppercase tracking-wider text-slate-500">
              What Brings You to {cfg.name}?
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {cfg.sections.map(({ href, label, Icon, desc, count, color, bg }) => (
              <Link
                key={href}
                href={href}
                className="p-5 bg-white border border-gray-200/90 rounded-2xl hover:border-gray-300 hover:shadow-md transition-all space-y-3 group cursor-pointer"
              >
                <div className="flex items-center justify-between">
                  <div className={`w-10 h-10 rounded-xl ${bg} border flex items-center justify-center`}>
                    <Icon className={`w-5 h-5 ${color}`} />
                  </div>
                  <span className="text-[10px] font-black text-slate-500 uppercase tracking-wider bg-slate-100 px-2 py-1 rounded-lg border border-slate-200">
                    {count}
                  </span>
                </div>
                <div>
                  <h3 className="text-base font-extrabold text-slate-900 group-hover:text-blue-600 transition-colors">
                    {label}
                  </h3>
                  <p className="text-xs text-slate-500 mt-1 leading-relaxed">
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
              <h2 className="text-xs font-black uppercase tracking-wider text-slate-500">
                Official Exam & CBT Simulators
              </h2>
            </div>
            <Link href={`/${country}/mock-test`} className={`text-xs font-bold ${cfg.theme.accentText} hover:underline flex items-center gap-1`}>
              All mock tests <ChevronRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {cfg.featuredExams.map(({ href, label, badge }) => (
              <Link
                key={href}
                href={href}
                className="p-4 bg-white border border-gray-200/90 rounded-2xl hover:border-gray-300 hover:shadow-sm transition-all flex items-center justify-between group cursor-pointer"
              >
                <div>
                  <h3 className="text-sm font-extrabold text-slate-900 group-hover:text-blue-600 transition-colors">
                    {label}
                  </h3>
                  <span className="text-[11px] font-bold text-slate-500 mt-0.5 block">
                    {badge}
                  </span>
                </div>
                <ChevronRight className="w-4 h-4 text-slate-400 group-hover:text-slate-800 transition-colors" />
              </Link>
            ))}
          </div>
        </section>

        {/* 🤝 GET EXPERT GUIDANCE CTA BANNER */}
        <section className="pt-2">
          <div className="p-6 sm:p-8 bg-gradient-to-r from-blue-50/90 via-indigo-50/70 to-slate-50 border border-blue-100 rounded-3xl shadow-sm flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <span className="text-lg">🤝</span>
                <h3 className="text-lg font-black text-slate-900">Get expert guidance</h3>
              </div>
              <p className="text-xs sm:text-sm text-slate-600 font-medium">
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

    </div>
  );
}
