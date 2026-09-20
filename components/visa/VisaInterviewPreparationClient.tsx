'use client';

import React, { useState, useMemo, useEffect } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import {
  ArrowLeft,
  GraduationCap,
  Briefcase,
  Shield,
  MessageSquare,
  CheckCircle2,
  AlertTriangle,
  Sparkles,
  ArrowRight,
  UserCheck,
  Languages,
  Eye,
  EyeOff,
  Volume2
} from 'lucide-react';
import {
  InterviewQuestionItem,
  JAPAN_STUDENT_INTERVIEW,
  JAPAN_WORKING_INTERVIEW,
  JAPAN_DEPENDENT_INTERVIEW,
  KOREA_STUDENT_INTERVIEW,
  KOREA_WORKING_INTERVIEW,
  KOREA_DEPENDENT_INTERVIEW
} from '@/lib/visa-interview-data';

interface Props {
  country: 'japan' | 'korea';
}

type InterviewTab = 'STUDENT' | 'WORKING' | 'DEPENDENT';

const INTERVIEW_TAB_SLUG_MAP: Record<string, InterviewTab> = {
  'student': 'STUDENT',
  'working': 'WORKING',
  'work': 'WORKING',
  'ssw': 'WORKING',
  'eps': 'WORKING',
  'dependent': 'DEPENDENT',
  'family': 'DEPENDENT',
};

const INTERVIEW_TABS = [
  { key: 'STUDENT' as InterviewTab, slug: 'student', label: 'Student Visa Interview', icon: GraduationCap },
  { key: 'WORKING' as InterviewTab, slug: 'working', label: 'Working Visa Interview', icon: Briefcase },
  { key: 'DEPENDENT' as InterviewTab, slug: 'dependent', label: 'Dependent Visa Interview', icon: Shield },
];

export default function VisaInterviewPreparationClient({ country }: Props) {
  const searchParams = useSearchParams();
  const rawTab = searchParams.get('tab')?.toLowerCase();
  const initialTab: InterviewTab = (rawTab && INTERVIEW_TAB_SLUG_MAP[rawTab]) ? INTERVIEW_TAB_SLUG_MAP[rawTab] : 'STUDENT';

  const [activeTab, setActiveTab] = useState<InterviewTab>(initialTab);
  const isJapan = country === 'japan';

  useEffect(() => {
    const qTab = searchParams.get('tab')?.toLowerCase();
    if (qTab && INTERVIEW_TAB_SLUG_MAP[qTab]) {
      setActiveTab(INTERVIEW_TAB_SLUG_MAP[qTab]);
    }
  }, [searchParams]);

  // Interactive On/Off Display Toggles
  const [showRomaji, setShowRomaji] = useState<boolean>(true);
  const [showEnglish, setShowEnglish] = useState<boolean>(true);
  const [showNepali, setShowNepali] = useState<boolean>(true);

  const questionsList: InterviewQuestionItem[] = useMemo(() => {
    if (isJapan) {
      if (activeTab === 'STUDENT') return JAPAN_STUDENT_INTERVIEW;
      if (activeTab === 'WORKING') return JAPAN_WORKING_INTERVIEW;
      return JAPAN_DEPENDENT_INTERVIEW;
    } else {
      if (activeTab === 'STUDENT') return KOREA_STUDENT_INTERVIEW;
      if (activeTab === 'WORKING') return KOREA_WORKING_INTERVIEW;
      return KOREA_DEPENDENT_INTERVIEW;
    }
  }, [isJapan, activeTab]);

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 pb-24 font-sans">
      <main className="max-w-5xl mx-auto px-4 sm:px-6 py-6 space-y-6">

        {/* Top Breadcrumb & Badge */}
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-200 pb-4">
          <Link
            href={`/${country}/visa`}
            className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-600 hover:text-slate-900 bg-white border border-slate-200 rounded-xl px-3 py-2 shadow-xs transition-colors"
          >
            <ArrowLeft className="w-4 h-4 text-emerald-600" />
            <span>Back to {isJapan ? 'Japan' : 'Korea'} Visa Directory</span>
          </Link>
          <span className="px-3 py-1 rounded-full bg-indigo-50 border border-indigo-200 text-indigo-700 text-xs font-black uppercase tracking-wider">
            {isJapan ? '🇯🇵 Embassy of Japan & Employer Prep' : '🇰🇷 Korean Embassy & EPS Viva Prep'}
          </span>
        </div>

        {/* Hero Section - Clean, Light Minimalist Premium UI */}
        <section className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-7 shadow-xs space-y-3">
          <div className="flex flex-wrap items-center gap-2">
            <span className="px-3 py-1 rounded-full bg-slate-100 text-slate-700 text-xs font-black uppercase tracking-wider">
              {isJapan ? 'Japan Visa & Job Interview Master Preparation' : 'Korea Visa & EPS Viva Master Preparation'}
            </span>
            <span className="text-xs text-emerald-700 font-bold flex items-center gap-1 bg-emerald-50 border border-emerald-200 px-2.5 py-0.5 rounded-full">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
              Verified Embassy & Employer Questions
            </span>
          </div>

          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            {isJapan
              ? 'Complete Master Guide to Japan Visa & Job Interviews'
              : 'Complete Master Guide to Korea Visa & EPS Viva Interviews'}
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed max-w-3xl font-normal">
            Real questions asked by embassy visa officers and Japanese/Korean employers with recommended model answers, phonetic pronunciation (Romaji), English translation, Nepali meanings, and trap warnings.
          </p>
        </section>

        {/* Interview Type Selector Tabs - SEO Friendly Links to Slugs */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 bg-white p-2 rounded-2xl border border-slate-200 shadow-xs">
          {INTERVIEW_TABS.map((tab) => {
            const Icon = tab.icon;
            const active = activeTab === tab.key;
            return (
              <Link
                key={tab.key}
                href={`/${country}/visa/interview?tab=${tab.slug}`}
                scroll={false}
                onClick={() => setActiveTab(tab.key)}
                className={`py-3 px-3 rounded-xl text-xs font-extrabold flex items-center justify-center gap-2 transition-all border ${
                  active
                    ? 'bg-indigo-600 text-white shadow-xs border-indigo-600 font-black'
                    : 'bg-white text-slate-600 hover:text-slate-900 hover:bg-slate-50 border-transparent'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{tab.label}</span>
              </Link>
            );
          })}
        </div>

        {/* Interactive Display Toggles Bar */}
        <div className="bg-white border border-slate-200 rounded-2xl p-4 shadow-xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          <div className="flex items-center gap-2 text-xs font-bold text-slate-700">
            <Languages className="w-4 h-4 text-indigo-600" />
            <span>Display Toggles (पढ्न सजिलो बनाउन):</span>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            {/* Romaji Pronunciation Toggle */}
            <button
              type="button"
              onClick={() => setShowRomaji(!showRomaji)}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer border ${
                showRomaji
                  ? 'bg-amber-50 border-amber-300 text-amber-900 font-black shadow-2xs'
                  : 'bg-slate-100 border-slate-200 text-slate-400 line-through'
              }`}
            >
              {showRomaji ? <Eye className="w-3.5 h-3.5 text-amber-700" /> : <EyeOff className="w-3.5 h-3.5 text-slate-400" />}
              <span>{isJapan ? 'Romaji Pronunciation' : 'Romanization'}</span>
            </button>

            {/* English Toggle */}
            <button
              type="button"
              onClick={() => setShowEnglish(!showEnglish)}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer border ${
                showEnglish
                  ? 'bg-indigo-50 border-indigo-300 text-indigo-900 font-black shadow-2xs'
                  : 'bg-slate-100 border-slate-200 text-slate-400 line-through'
              }`}
            >
              {showEnglish ? <Eye className="w-3.5 h-3.5 text-indigo-700" /> : <EyeOff className="w-3.5 h-3.5 text-slate-400" />}
              <span>English Translation</span>
            </button>

            {/* Nepali Toggle */}
            <button
              type="button"
              onClick={() => setShowNepali(!showNepali)}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer border ${
                showNepali
                  ? 'bg-emerald-50 border-emerald-300 text-emerald-900 font-black shadow-2xs'
                  : 'bg-slate-100 border-slate-200 text-slate-400 line-through'
              }`}
            >
              {showNepali ? <Eye className="w-3.5 h-3.5 text-emerald-700" /> : <EyeOff className="w-3.5 h-3.5 text-slate-400" />}
              <span>नेपाली अनुवाद</span>
            </button>
          </div>
        </div>

        {/* Tab Context Guidance Banner */}
        <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4 flex items-start gap-3">
          <AlertTriangle className="w-5 h-5 text-indigo-600 shrink-0 mt-0.5" />
          <div className="text-xs space-y-1">
            <h2 className="font-bold text-slate-900">
              {activeTab === 'STUDENT' && 'विद्यार्थी भिसा अन्तर्वार्ता: अध्ययन उद्देश्य, कलेज छनोट र आर्थिक प्रायोजकको यकिन विवरण मुख्य हो।'}
              {activeTab === 'WORKING' && 'कामदार भिसा अन्तर्वार्ता: शारीरिक तन्दुरुस्ती, कार्यक्षेत्रको ज्ञान, अनुशासन र हो-रेन-सो (Ho-Ren-So) मुख्य हो।'}
              {activeTab === 'DEPENDENT' && 'आश्रित (Dependent) भिसा: विवाहको वास्तविकता, श्रीमान्/श्रीमतीको आम्दानी र सँगै बस्ने योजना मुख्य हो।'}
            </h2>
            <p className="text-slate-600 leading-relaxed">
              Always maintain confident posture, polite honorific speech ({isJapan ? 'Keigo / です・ます' : '합니다・습니다'}), and ensure all verbal statements 100% match your submitted documents.
            </p>
          </div>
        </div>

        {/* Questions & Model Answers List */}
        <section className="space-y-4">
          <h2 className="text-sm font-black text-slate-800 uppercase tracking-wider flex items-center gap-2">
            <MessageSquare className="w-4 h-4 text-indigo-600" />
            <span>High-Frequency Questions &amp; Model Answers (बारम्बार सोधिने प्रश्नहरू)</span>
          </h2>

          <div className="space-y-4">
            {questionsList.map((q, idx) => (
              <div
                key={q.id}
                className="bg-white rounded-3xl border border-slate-200 p-5 sm:p-6 shadow-xs space-y-4 transition-all hover:border-slate-300"
              >
                {/* Question Header */}
                <div className="space-y-2 border-b border-slate-100 pb-3">
                  <div className="flex items-center justify-between">
                    <span className="px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-700 text-[10px] font-black uppercase tracking-wider">
                      Question {idx + 1} · {q.category} ({q.categoryNe})
                    </span>
                  </div>

                  {/* Original Question (Japanese / Korean) */}
                  <h3 className="text-base sm:text-lg font-black text-slate-900 pt-0.5">
                    {q.questionOriginal}
                  </h3>

                  {/* Easy Romaji Pronunciation */}
                  {showRomaji && (
                    <div className="p-2.5 rounded-xl bg-amber-50/70 border border-amber-200 text-amber-950 text-xs font-mono leading-relaxed flex items-start gap-2">
                      <Volume2 className="w-3.5 h-3.5 text-amber-700 shrink-0 mt-0.5" />
                      <div>
                        <span className="text-[10px] font-black uppercase text-amber-800 tracking-wider block">Pronunciation / उच्चारण:</span>
                        <p className="font-semibold text-amber-900">{q.questionRomaji}</p>
                      </div>
                    </div>
                  )}

                  {/* English Question */}
                  {showEnglish && (
                    <p className="text-xs font-semibold text-slate-600 flex items-center gap-1.5">
                      <span className="text-[10px] px-1.5 py-0.5 rounded bg-slate-100 text-slate-600 font-bold uppercase">EN</span>
                      <span>{q.questionEn}</span>
                    </p>
                  )}

                  {/* Nepali Question */}
                  {showNepali && (
                    <p className="text-xs font-bold text-indigo-700 flex items-center gap-1.5">
                      <span className="text-[10px] px-1.5 py-0.5 rounded bg-indigo-50 text-indigo-700 font-bold uppercase">नेपाली</span>
                      <span>{q.questionNe}</span>
                    </p>
                  )}
                </div>

                {/* Model Answer Box - Clean Light Emerald UI */}
                <div className="bg-emerald-50/60 border border-emerald-200/90 rounded-2xl p-4 sm:p-5 space-y-2.5">
                  <div className="flex items-center gap-1.5 text-xs font-black text-emerald-800">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    <span>Recommended Answer (नमुना उत्तर):</span>
                  </div>

                  {/* Target Language Answer */}
                  <p className="text-xs sm:text-sm font-bold text-slate-900 leading-relaxed">
                    {q.modelAnswerOriginal}
                  </p>

                  {/* Model Answer Romaji Pronunciation */}
                  {showRomaji && (
                    <div className="p-2.5 rounded-xl bg-white/80 border border-emerald-200 text-emerald-950 text-xs font-mono leading-relaxed space-y-0.5">
                      <span className="text-[10px] font-black uppercase text-emerald-800 tracking-wider block">🗣️ Say It Like This (यसरी बोल्नुहोस्):</span>
                      <p className="text-slate-800 font-medium">{q.modelAnswerRomaji}</p>
                    </div>
                  )}

                  {/* English Answer */}
                  {showEnglish && (
                    <p className="text-xs text-slate-600 leading-relaxed pt-1">
                      <strong className="text-slate-800">English:</strong> {q.modelAnswerEn}
                    </p>
                  )}

                  {/* Nepali Answer */}
                  {showNepali && (
                    <p className="text-xs text-emerald-950 font-medium leading-relaxed border-t border-emerald-100 pt-2">
                      <strong className="text-emerald-900 font-bold">नेपाली:</strong> {q.modelAnswerNe}
                    </p>
                  )}
                </div>

                {/* Trap Warning & Pro Tip Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                  <div className="bg-rose-50/80 border border-rose-200 rounded-2xl p-3.5 space-y-1">
                    <strong className="text-rose-900 font-bold flex items-center gap-1 text-xs">
                      <AlertTriangle className="w-3.5 h-3.5 text-rose-600" />
                      Trap to Avoid (गल्ती नगर्नुहोस्):
                    </strong>
                    <p className="text-rose-900 leading-snug text-[11px] font-medium">
                      {q.trapWarning}
                    </p>
                    {showNepali && (
                      <p className="text-rose-800 leading-snug text-[11px] border-t border-rose-100/80 pt-1">
                        🇳🇵 {q.trapWarningNe}
                      </p>
                    )}
                  </div>

                  <div className="bg-indigo-50/80 border border-indigo-200 rounded-2xl p-3.5 space-y-1">
                    <strong className="text-indigo-900 font-bold flex items-center gap-1 text-xs">
                      <Sparkles className="w-3.5 h-3.5 text-indigo-600" />
                      Expert Tip (सल्लाह):
                    </strong>
                    <p className="text-indigo-900 leading-snug text-[11px] font-medium">
                      {q.tip}
                    </p>
                    {showNepali && (
                      <p className="text-indigo-800 leading-snug text-[11px] border-t border-indigo-100/80 pt-1">
                        🇳🇵 {q.tipNe}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Universal Etiquette & Golden Rules Card - Clean Light UI */}
        <section className="bg-white rounded-3xl border border-slate-200 p-6 shadow-xs space-y-4">
          <h2 className="text-base font-black text-slate-900 flex items-center gap-2">
            <UserCheck className="w-5 h-5 text-indigo-600" />
            <span>Interview Etiquette &amp; Golden Rules (अन्तर्वार्ताका महत्वपूर्ण शिष्टाचार नियमहरू)</span>
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div className="space-y-1.5 p-4 rounded-2xl bg-slate-50 border border-slate-100">
              <h3 className="font-bold text-slate-900">1. Punctuality &amp; Dress Code (समय र पोसाक)</h3>
              <p className="text-slate-600 leading-relaxed">
                Wear a clean, dark-colored formal business suit (Navy or Black). Be seated in front of your camera 15 minutes before the scheduled time with good lighting and zero background noise.
              </p>
            </div>
            <div className="space-y-1.5 p-4 rounded-2xl bg-slate-50 border border-slate-100">
              <h3 className="font-bold text-slate-900">2. Eye Contact &amp; Posture (आँखाको सम्पर्क र बसाइ)</h3>
              <p className="text-slate-600 leading-relaxed">
                Look directly into the camera lens, not down at the screen. Sit upright with your back straight, hands resting calmly on your knees or desk.
              </p>
            </div>
            <div className="space-y-1.5 p-4 rounded-2xl bg-slate-50 border border-slate-100">
              <h3 className="font-bold text-slate-900">3. Clear Honorific Speech (नम्र भाषा र आदरार्थी)</h3>
              <p className="text-slate-600 leading-relaxed">
                Always respond with clear voice volume. Use polite Japanese (Hai, wakarimashita / Hai, sou desu) or polite Korean (Ne, algesseumnida). If you didn’t catch a question, politely ask: &quot;Mou ichido onegai shimasu&quot; or &quot;Dasi han beon malsseumhae jusigesseumnikka?&quot;.
              </p>
            </div>
            <div className="space-y-1.5 p-4 rounded-2xl bg-slate-50 border border-slate-100">
              <h3 className="font-bold text-slate-900">4. Consistency with Documents (कागजातसँग मेल खाने कुरा)</h3>
              <p className="text-slate-600 leading-relaxed">
                The interviewer will cross-examine your submitted forms. Any contradiction in dates, school names, family income figures, or marriage dates will result in immediate rejection.
              </p>
            </div>
          </div>
        </section>

        {/* 1-on-1 Consultation & Mock Interview CTA - Clean Light Premium UI */}
        <section className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-7 shadow-xs flex flex-col sm:flex-row items-center justify-between gap-5">
          <div className="space-y-1.5">
            <span className="px-3 py-1 rounded-full bg-indigo-50 border border-indigo-200 text-indigo-700 text-[10px] font-black uppercase tracking-wider">
              Free 15-Minute Expert Mock Session
            </span>
            <h2 className="text-lg sm:text-xl font-black text-slate-900">
              Need 1-on-1 Mock Interview Practice?
            </h2>
            <p className="text-xs text-slate-600 leading-relaxed max-w-lg">
              Practice real questions face-to-face with verified Japan &amp; Korea visa counselors. Get your pronunciation, body language, and answers graded before embassy interview.
            </p>
          </div>
          <Link
            href="/consultancy"
            className="px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-2xl font-black text-xs shadow-xs transition-colors flex items-center gap-2 shrink-0 cursor-pointer"
          >
            <span>Book Mock Interview</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </section>

      </main>
    </div>
  );
}
