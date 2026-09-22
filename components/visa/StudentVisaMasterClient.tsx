'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import {
  GraduationCap,
  Award,
  FileText,
  Calendar,
  DollarSign,
  CheckSquare,
  Clock,
  ArrowRight,
  BookOpen,
  MessageSquare,
  ClipboardList,
  Home as HomeIcon,
  ShieldAlert,
  Download,
  CheckCircle2,
  ExternalLink,
  Sparkles,
  ChevronRight
} from 'lucide-react';
import { useCountry } from '@/lib/context/CountryContext';
import { useTranslation } from '@/lib/i18n/LanguageContext';
import { getStudentVisaData } from '@/lib/i18n/student-visa-data';

interface StudentVisaMasterClientProps {
  country: 'japan' | 'korea';
}

type StudentSection = 'COLLEGES' | 'SCHOLARSHIPS' | 'TIPS_SOP' | 'PROCESS' | 'FINANCIALS' | 'CHECKLIST' | 'WORK_RIGHTS';

const STUDENT_TAB_SLUG_MAP: Record<string, StudentSection> = {
  'schools': 'COLLEGES',
  'colleges': 'COLLEGES',
  'scholarships': 'SCHOLARSHIPS',
  'sop': 'TIPS_SOP',
  'tips': 'TIPS_SOP',
  'process': 'PROCESS',
  'financials': 'FINANCIALS',
  'sponsor': 'FINANCIALS',
  'checklist': 'CHECKLIST',
  'work-rights': 'WORK_RIGHTS',
  'work': 'WORK_RIGHTS',
};

const TAB_ICONS = {
  COLLEGES: GraduationCap,
  SCHOLARSHIPS: Award,
  TIPS_SOP: FileText,
  PROCESS: Calendar,
  FINANCIALS: DollarSign,
  CHECKLIST: CheckSquare,
  WORK_RIGHTS: Clock,
};

export default function StudentVisaMasterClient({ country }: StudentVisaMasterClientProps) {
  const { setCountryFocus } = useCountry();
  const { lang, langMode } = useTranslation();
  const isNe = lang === 'ne' || langMode === 'ne';
  const isJapan = country === 'japan';

  const data = getStudentVisaData(country, isNe);

  const searchParams = useSearchParams();
  const rawTab = searchParams.get('tab')?.toLowerCase();
  const initialSection: StudentSection = (rawTab && STUDENT_TAB_SLUG_MAP[rawTab]) ? STUDENT_TAB_SLUG_MAP[rawTab] : 'COLLEGES';

  const [activeSection, setActiveSection] = useState<StudentSection>(initialSection);

  useEffect(() => {
    const qTab = searchParams.get('tab')?.toLowerCase();
    if (qTab && STUDENT_TAB_SLUG_MAP[qTab]) {
      setActiveSection(STUDENT_TAB_SLUG_MAP[qTab]);
    }
  }, [searchParams]);

  const [checklistItems, setChecklistItems] = useState<Record<string, boolean>>({
    doc1: true,
    doc2: true,
    doc3: false,
    doc4: false,
    doc5: false,
    doc6: false,
    doc7: false,
    doc8: false,
  });

  const toggleChecklist = (id: string) => {
    setChecklistItems(prev => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-4 pb-24 font-sans">
      
      {/* Top Header Section - Clean, Light & Minimalist UI */}
      <div className="rounded-3xl bg-white border border-slate-200 p-6 sm:p-7 mb-6 shadow-xs space-y-4 font-sans">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex flex-wrap items-center gap-2">
            <span className="px-3 py-1 rounded-full bg-indigo-50 border border-indigo-200 text-indigo-700 text-xs font-black uppercase tracking-wider">
              {data.hero.badge}
            </span>
            <span className="text-xs text-emerald-700 font-bold flex items-center gap-1 bg-emerald-50 border border-emerald-200 px-2.5 py-0.5 rounded-full">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
              {data.hero.updatedBadge}
            </span>
          </div>

          {/* Country Switcher */}
          <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-xl border border-slate-200">
            <Link
              href="/japan/visa/student"
              onClick={() => setCountryFocus('japan')}
              className={`px-3 py-1.5 rounded-lg text-xs font-extrabold transition-all ${
                isJapan
                  ? 'bg-white text-slate-900 shadow-xs border border-slate-200 font-black'
                  : 'text-slate-600 hover:text-slate-900 font-bold'
              }`}
            >
              🇯🇵 {isNe ? 'जापान अध्ययन' : 'Japan Study'}
            </Link>
            <Link
              href="/korea/visa/student"
              onClick={() => setCountryFocus('korea')}
              className={`px-3 py-1.5 rounded-lg text-xs font-extrabold transition-all ${
                !isJapan
                  ? 'bg-white text-slate-900 shadow-xs border border-slate-200 font-black'
                  : 'text-slate-600 hover:text-slate-900 font-bold'
              }`}
            >
              🇰🇷 {isNe ? 'कोरिया अध्ययन' : 'Korea Study'}
            </Link>
          </div>
        </div>

        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight mb-2">
            {data.hero.title}
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 max-w-3xl leading-relaxed">
            {data.hero.sub}
          </p>
        </div>

        {/* Quick Inter-Link Navigation Bar */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 pt-3 border-t border-slate-100">
          <Link
            href={isJapan ? '/japan/learn' : '/korea/learn'}
            className="flex items-center gap-2 p-2.5 rounded-xl bg-slate-50 hover:bg-slate-100 border border-slate-200 text-xs font-bold text-slate-700 hover:text-slate-900 transition-colors shadow-2xs"
          >
            <BookOpen className="w-4 h-4 text-slate-500 shrink-0" />
            <span>{data.hero.quickLinks[0].label}</span>
          </Link>

          <Link
            href={isJapan ? '/japan/visa/interview' : '/korea/visa/interview'}
            className="flex items-center gap-2 p-2.5 rounded-xl bg-slate-50 hover:bg-slate-100 border border-slate-200 text-xs font-bold text-slate-700 hover:text-slate-900 transition-colors shadow-2xs"
          >
            <MessageSquare className="w-4 h-4 text-slate-500 shrink-0" />
            <span>{data.hero.quickLinks[1].label}</span>
          </Link>

          <Link
            href={isJapan ? '/japan/exams' : '/korea/exams'}
            className="flex items-center gap-2 p-2.5 rounded-xl bg-slate-50 hover:bg-slate-100 border border-slate-200 text-xs font-bold text-slate-700 hover:text-slate-900 transition-colors shadow-2xs"
          >
            <ClipboardList className="w-4 h-4 text-slate-500 shrink-0" />
            <span>{data.hero.quickLinks[2].label}</span>
          </Link>

          <Link
            href={isJapan ? '/japan/rooms' : '/korea/rooms'}
            className="flex items-center gap-2 p-2.5 rounded-xl bg-slate-50 hover:bg-slate-100 border border-slate-200 text-xs font-bold text-slate-700 hover:text-slate-900 transition-colors shadow-2xs"
          >
            <HomeIcon className="w-4 h-4 text-slate-500 shrink-0" />
            <span>{data.hero.quickLinks[3].label}</span>
          </Link>
        </div>
      </div>

      {/* Navigation Tabs - SEO Friendly Links to Slugs */}
      <div className="flex items-center gap-1.5 mb-6 border-b border-slate-200 pb-3 overflow-x-auto no-scrollbar">
        {data.tabs.map((tab) => {
          const Icon = TAB_ICONS[tab.key];
          const active = activeSection === tab.key;
          return (
            <Link
              key={tab.key}
              href={`/${country}/visa/student?tab=${tab.slug}`}
              scroll={false}
              onClick={() => setActiveSection(tab.key)}
              className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-extrabold transition-all shrink-0 border ${
                active
                  ? 'bg-indigo-600 text-white shadow-xs border-indigo-600 font-black'
                  : 'bg-white text-slate-600 hover:text-slate-900 hover:bg-slate-50 border-slate-200'
              }`}
            >
              <Icon className="w-4 h-4" />
              <span>{tab.label}</span>
            </Link>
          );
        })}
      </div>

      {/* TAB 1: CHOOSING SCHOOLS & COLLEGES */}
      {activeSection === 'COLLEGES' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {data.colleges.map((col, idx) => (
              <div key={idx} className="p-6 rounded-3xl bg-white border border-slate-200 shadow-xs space-y-3 flex flex-col justify-between">
                <div>
                  <span className="text-2xl mb-2 block">{col.icon}</span>
                  <h3 className="text-base font-black text-slate-900">{col.title}</h3>
                  <p className="text-xs text-slate-600 leading-relaxed mt-2">{col.desc}</p>
                  <div className="mt-4 space-y-1.5 text-xs text-slate-700">
                    <p><strong>{col.criteria}</strong></p>
                    <p><strong>{isNe ? 'ट्युसन:' : 'Tuition:'}</strong> {col.tuition}</p>
                  </div>
                </div>
                <div className="pt-3 border-t border-slate-100 text-xs text-slate-600 font-bold">
                  ✓ {col.intakes}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 2: SCHOLARSHIPS DIRECTORY */}
      {activeSection === 'SCHOLARSHIPS' && (
        <div className="space-y-6">
          <div className="p-6 rounded-3xl bg-amber-50/70 border border-amber-200 text-amber-950 flex items-start gap-3">
            <Award className="w-6 h-6 text-amber-600 shrink-0 mt-0.5" />
            <div className="text-xs space-y-1">
              <h3 className="text-sm font-black">{data.scholarships.bannerTitle}</h3>
              <p className="leading-relaxed">{data.scholarships.bannerDesc}</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {data.scholarships.items.map((item, idx) => (
              <div key={idx} className="p-6 rounded-3xl bg-white border border-slate-200 shadow-xs space-y-3">
                <div className="flex items-center justify-between">
                  <h3 className="text-base font-black text-slate-900">{item.title}</h3>
                  <span className="px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-700 text-xs font-black">
                    {item.badge}
                  </span>
                </div>
                <ul className="space-y-2 text-xs text-slate-600">
                  {item.points.map((pt, pIdx) => (
                    <li key={pIdx} className="flex items-start gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                      <span>{pt}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 3: SOP WRITING & CRUCIAL TIPS */}
      {activeSection === 'TIPS_SOP' && (
        <div className="space-y-6">
          <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-xs space-y-4">
            <h3 className="text-base font-black text-slate-900 flex items-center gap-2">
              <FileText className="w-4 h-4 text-indigo-600" />
              <span>{data.sop.title}</span>
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed">{data.sop.desc}</p>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-3 text-xs">
              {data.sop.paragraphs.map((p, idx) => (
                <div key={idx} className="p-4 rounded-2xl bg-slate-50 border border-slate-100 space-y-1.5">
                  <span className="font-black text-indigo-600 block">{p.title}</span>
                  <p className="text-slate-600">{p.desc}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="p-6 rounded-3xl bg-rose-50/80 border border-rose-200 text-rose-950 space-y-2">
            <h3 className="text-sm font-black flex items-center gap-2">
              <ShieldAlert className="w-4 h-4 text-rose-600" />
              <span>{data.sop.fraudWarningTitle}</span>
            </h3>
            <ul className="space-y-1.5 text-xs text-rose-900 leading-relaxed list-disc pl-5">
              {data.sop.fraudWarnings.map((warn, idx) => (
                <li key={idx}>{warn}</li>
              ))}
            </ul>
          </div>
        </div>
      )}

      {/* TAB 4: STEP-BY-STEP PROCESS */}
      {activeSection === 'PROCESS' && (
        <div className="space-y-4">
          <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-xs space-y-6">
            <h3 className="text-base font-black text-slate-900">
              {isJapan
                ? (isNe ? 'जापान विद्यार्थी भिसाको ६-चरण प्रक्रिया' : 'The 6-Step Japan Student Visa Pipeline')
                : (isNe ? 'कोरिया विद्यार्थी भिसाको ६-चरण प्रक्रिया' : 'The 6-Step Korea Student Visa Pipeline')}
            </h3>

            <div className="space-y-4">
              {data.processSteps.map((item, idx) => (
                <div key={idx} className="flex items-start gap-4 p-4 rounded-2xl bg-slate-50 border border-slate-100">
                  <span className="w-9 h-9 rounded-2xl bg-indigo-600 text-white font-black text-xs flex items-center justify-center shrink-0">
                    {item.step}
                  </span>
                  <div>
                    <h4 className="text-sm font-black text-slate-900">{item.title}</h4>
                    <p className="text-xs text-slate-600 leading-relaxed mt-1">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* TAB 5: FINANCIALS & SPONSOR REQUIREMENTS */}
      {activeSection === 'FINANCIALS' && (
        <div className="space-y-6">
          <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-xs space-y-4">
            <h3 className="text-base font-black text-slate-900 flex items-center gap-2">
              <DollarSign className="w-5 h-5 text-indigo-600" />
              <span>{data.financials.title}</span>
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              {data.financials.sub}
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
              {data.financials.cards.map((c, idx) => (
                <div key={idx} className="p-5 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-2">
                  <h4 className="font-black text-slate-900">{c.title}</h4>
                  <p className="text-slate-600 leading-relaxed">{c.desc}</p>
                </div>
              ))}
            </div>

            <div className="p-4 rounded-2xl bg-indigo-50 border border-indigo-100 text-xs text-indigo-950 flex items-center justify-between">
              <div>
                <span className="font-bold">
                  {isJapan
                    ? (isNe ? 'स्पन्सर ग्यारेन्टी पत्र (身元保証書) को ढाँचा चाहिन्छ?' : 'Need a template for Sponsor Letter of Guarantee (身元保証書)?')
                    : (isNe ? 'स्पन्सर ग्यारेन्टी पत्र (재정보증서) को ढाँचा चाहिन्छ?' : 'Need a template for Sponsor Letter of Guarantee (재정보증서)?')}
                </span>
                <p className="text-[11px] text-indigo-700">
                  {isJapan
                    ? (isNe ? 'नेपाली र जापानी भाषाको आधिकारिक स्पन्सर फारम डाउनलोड गर्नुहोस्।' : 'Download formatted bilingual Nepali & Japanese financial guarantee forms.')
                    : (isNe ? 'नेपाली र कोरियन भाषाको आधिकारिक स्पन्सर फारम डाउनलोड गर्नुहोस्।' : 'Download formatted bilingual Nepali & Korean financial guarantee forms.')}
                </p>
              </div>
              <button
                type="button"
                onClick={() => alert(isNe ? 'स्पन्सर फारम तयार गरिएको छ।' : 'Sponsor template package prepared for download.')}
                className="px-4 py-2 rounded-xl bg-indigo-600 text-white font-black text-xs cursor-pointer flex items-center gap-1.5 shrink-0 hover:bg-indigo-700 transition-colors shadow-xs"
              >
                <Download className="w-3.5 h-3.5" />
                <span>{isNe ? 'फारम डाउनलोड' : 'Download Form'}</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* TAB 6: INTERACTIVE DOCUMENT CHECKLIST */}
      {activeSection === 'CHECKLIST' && (
        <div className="space-y-6">
          <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-xs space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div>
                <h3 className="text-base font-black text-slate-900">{data.checklist.title}</h3>
                <p className="text-xs text-slate-500">{data.checklist.sub}</p>
              </div>
              <button
                type="button"
                onClick={() => window.print()}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-slate-200 text-xs font-bold text-slate-700 hover:bg-slate-50 cursor-pointer shadow-2xs"
              >
                <Download className="w-3.5 h-3.5" />
                <span>{isNe ? 'प्रिन्ट गर्नुहोस्' : 'Print Checklist'}</span>
              </button>
            </div>

            <div className="space-y-2.5">
              {data.checklist.items.map((item) => (
                <div
                  key={item.id}
                  onClick={() => toggleChecklist(item.id)}
                  className={`flex items-center justify-between p-3.5 rounded-2xl border cursor-pointer transition-all ${
                    checklistItems[item.id]
                      ? 'bg-emerald-50/60 border-emerald-200 text-emerald-900 font-bold'
                      : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <input
                      type="checkbox"
                      checked={checklistItems[item.id] || false}
                      onChange={() => {}}
                      className="w-4 h-4 rounded text-emerald-600 focus:ring-emerald-500 cursor-pointer"
                    />
                    <div>
                      <span className="text-xs block font-bold">{item.title}</span>
                      <span className="text-[11px] text-slate-500 font-normal">{item.desc}</span>
                    </div>
                  </div>
                  <span className="text-[10px] px-2 py-0.5 rounded-md bg-slate-100 text-slate-600 font-black uppercase shrink-0">
                    {checklistItems[item.id] ? '✓' : 'Pending'}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* TAB 7: STUDENT WORK RIGHTS (ARUBAITO / ALBA) */}
      {activeSection === 'WORK_RIGHTS' && (
        <div className="space-y-6">
          <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-xs space-y-5">
            <h3 className="text-base font-black text-slate-900 flex items-center gap-2">
              <Clock className="w-5 h-5 text-indigo-600" />
              <span>{data.workRights.title}</span>
            </h3>
            <p className="text-xs text-slate-600">{data.workRights.sub}</p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
              {data.workRights.cards.map((c, idx) => (
                <div
                  key={idx}
                  className={`p-5 rounded-2xl border space-y-2 ${
                    c.alert
                      ? 'bg-red-50/50 border-red-200 text-red-950'
                      : 'bg-slate-50 border-slate-200 text-slate-900'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <h4 className="font-black text-sm">{c.title}</h4>
                    {c.alert && (
                      <span className="px-2 py-0.5 rounded-md bg-red-100 text-red-800 text-[10px] font-black uppercase">
                        {isNe ? 'कडा कानुन' : 'Strict Law'}
                      </span>
                    )}
                  </div>
                  <p className="text-xs leading-relaxed opacity-90">{c.desc}</p>
                </div>
              ))}
            </div>

            {/* Direct Link to Jobs Board */}
            <div className="p-5 rounded-2xl bg-indigo-50/70 border border-indigo-200 text-indigo-950 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div>
                <h4 className="text-sm font-black text-slate-900">
                  {isJapan
                    ? (isNe ? 'जापानमा विद्यार्थीका लागि पार्ट-टाइम काम (Arubaito) खोज्दै हुनुहुन्छ?' : 'Looking for student jobs (Arubaito) in Japan?')
                    : (isNe ? 'कोरियामा विद्यार्थीका लागि पार्ट-टाइम काम (Alba) खोज्दै हुनुहुन्छ?' : 'Looking for student jobs (Alba) in Korea?')}
                </h4>
                <p className="text-xs text-slate-600 mt-0.5">
                  {isJapan
                    ? (isNe ? 'कन्भिनिएन्स स्टोर, रेस्टुरेन्ट र फुड प्याकिङका कामहरू हेर्नुहोस् (२८ घण्टा नियम अनुसार)।' : 'Browse convenience store shifts, restaurant staff, and logistics sorting jobs strictly adhering to 28 hours/week.')
                    : (isNe ? 'क्याम्पस तथा रेस्टुरेन्टका कामहरू खोज्नुहोस्।' : 'Browse campus jobs and restaurant shifts conforming strictly to Korean immigration regulations.')}
                </p>
              </div>
              <Link
                href={isJapan ? '/japan/jobs' : '/korea/jobs'}
                className="px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-black uppercase tracking-wider transition-colors shrink-0 shadow-xs"
              >
                {isJapan
                  ? (isNe ? 'जापान जब्स हेर्नुहोस् →' : 'Explore Japan Student Jobs →')
                  : (isNe ? 'कोरिया जब्स हेर्नुहोस् →' : 'Explore Korea Student Jobs →')}
              </Link>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
