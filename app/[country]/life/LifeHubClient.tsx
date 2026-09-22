'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import {
  ArrowLeft,
  Home as HomeIcon,
  Phone,
  Clock,
  Wallet,
  Building,
  FileCheck,
  Scale,
  Sparkles,
  AlertTriangle,
  CheckCircle2,
  HelpCircle,
  Briefcase,
  Heart,
  Utensils,
  Smile,
  Compass,
  Award,
  Check,
  X
} from 'lucide-react';
import { useTranslation } from '@/lib/i18n/LanguageContext';
import { getLifeData } from '@/lib/i18n/life-data';

type Country = 'japan' | 'korea';

type LifeTab = 'SETUP' | 'HOUSING' | 'CULTURE' | 'VISA_RENEWAL' | 'RIGHTS' | 'EMERGENCY';

type CultureCategory = 'ALL' | 'ETIQUETTE' | 'DINING' | 'WORKPLACE' | 'TRADITIONS' | 'NEPALI_TIPS';

const TAB_SLUG_MAP: Record<string, LifeTab> = {
  'city-office': 'SETUP',
  'setup': 'SETUP',
  'housing': 'HOUSING',
  'culture': 'CULTURE',
  'visa-pr': 'VISA_RENEWAL',
  'visa': 'VISA_RENEWAL',
  'labor-rights': 'RIGHTS',
  'rights': 'RIGHTS',
  'helplines': 'EMERGENCY',
  'emergency': 'EMERGENCY',
};

const TAB_ICONS = {
  SETUP: Building,
  HOUSING: HomeIcon,
  CULTURE: Sparkles,
  VISA_RENEWAL: FileCheck,
  RIGHTS: Scale,
  EMERGENCY: Phone,
};

const MODULE_ICONS: Record<string, any> = {
  'jp-bowing': Smile,
  'jp-genkan': HomeIcon,
  'jp-trains': Compass,
  'jp-chopsticks': Utensils,
  'jp-hourenso': Briefcase,
  'jp-garbage': Sparkles,
};

export default function LifeHubClient({ country }: { country: Country }) {
  const { lang, langMode } = useTranslation();
  const isNe = lang === 'ne' || langMode === 'ne';

  const searchParams = useSearchParams();
  const rawTab = searchParams.get('tab')?.toLowerCase();
  const initialTab: LifeTab = (rawTab && TAB_SLUG_MAP[rawTab]) ? TAB_SLUG_MAP[rawTab] : 'SETUP';

  const [activeTab, setActiveTab] = useState<LifeTab>(initialTab);

  useEffect(() => {
    const qTab = searchParams.get('tab')?.toLowerCase();
    if (qTab && TAB_SLUG_MAP[qTab]) {
      setActiveTab(TAB_SLUG_MAP[qTab]);
    }
  }, [searchParams]);

  const [cultureCategory, setCultureCategory] = useState<CultureCategory>('ALL');
  const [quizAnswers, setQuizAnswers] = useState<Record<number, number>>({});
  const [quizFeedback, setQuizFeedback] = useState<Record<number, boolean>>({});

  const isJapan = country === 'japan';
  const data = getLifeData(country, isNe);

  const filteredCultureModules = cultureCategory === 'ALL'
    ? data.cultureModules
    : data.cultureModules.filter(m => m.cat === cultureCategory);

  const handleQuizOption = (qIdx: number, optIdx: number) => {
    if (quizAnswers[qIdx] !== undefined) return;
    const isCorrect = optIdx === data.quiz[qIdx].correct;
    setQuizAnswers(prev => ({ ...prev, [qIdx]: optIdx }));
    setQuizFeedback(prev => ({ ...prev, [qIdx]: isCorrect }));
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans pb-24">
      <main className="max-w-6xl mx-auto px-4 pt-4 sm:pt-6 space-y-6">

        {/* Breadcrumb Navigation */}
        <div className="flex items-center justify-between text-xs text-slate-500">
          <Link
            href={`/${country}`}
            className="inline-flex items-center gap-1.5 hover:text-slate-900 transition-colors font-medium"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>{isNe ? (isJapan ? 'जापान पोर्टलमा फर्कनुहोस्' : 'कोरिया पोर्टलमा फर्कनुहोस्') : `Back to ${isJapan ? 'Japan' : 'Korea'} Portal`}</span>
          </Link>

          <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
            {isJapan ? '🇯🇵 Japan Life & Culture' : '🇰🇷 Korea Life & Culture'}
          </span>
        </div>

        {/* Hero Section */}
        <section className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-xs space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <span className="px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider bg-purple-50 border border-purple-200 text-purple-700">
              {data.hero.badge}
            </span>

            {/* Country Selector */}
            <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-xl border border-slate-200">
              <Link
                href="/japan/life"
                className={`px-3 py-1.5 rounded-lg text-xs font-extrabold transition-all ${
                  isJapan
                    ? 'bg-white text-slate-900 shadow-xs border border-slate-200 font-black'
                    : 'text-slate-600 hover:text-slate-900 font-bold'
                }`}
              >
                🇯🇵 {isNe ? 'जापान' : 'Japan'}
              </Link>
              <Link
                href="/korea/life"
                className={`px-3 py-1.5 rounded-lg text-xs font-extrabold transition-all ${
                  !isJapan
                    ? 'bg-white text-slate-900 shadow-xs border border-slate-200 font-black'
                    : 'text-slate-600 hover:text-slate-900 font-bold'
                }`}
              >
                🇰🇷 {isNe ? 'कोरिया' : 'Korea'}
              </Link>
            </div>
          </div>

          <div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight mb-2">
              {data.hero.title}
            </h1>
            <p className="text-xs sm:text-sm text-slate-600 max-w-3xl leading-relaxed font-normal">
              {data.hero.sub}
            </p>
          </div>
        </section>

        {/* 6 Navigation Tabs */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2 bg-white p-2 rounded-2xl border border-slate-200 shadow-xs">
          {data.tabs.map((tab) => {
            const Icon = TAB_ICONS[tab.key];
            const isActive = activeTab === tab.key;
            return (
              <Link
                key={tab.key}
                href={`/${country}/life?tab=${tab.slug}`}
                scroll={false}
                onClick={() => setActiveTab(tab.key)}
                className={`py-3 px-2 rounded-xl text-xs font-extrabold flex flex-col items-center justify-center gap-1.5 transition-all border ${
                  isActive
                    ? 'bg-indigo-600 text-white shadow-xs border-indigo-600 font-black'
                    : 'bg-white text-slate-600 hover:text-slate-900 hover:bg-slate-50 border-transparent'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span className="flex items-center gap-1">
                  {tab.label}
                  {tab.hasDot && <span className="w-2 h-2 rounded-full bg-emerald-400"></span>}
                </span>
              </Link>
            );
          })}
        </div>

        {/* TAB 1: CITY OFFICE & INITIAL SETUP */}
        {activeTab === 'SETUP' && (
          <div className="space-y-4 animate-fade-in">
            <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-xs space-y-4">
              <h2 className="text-lg font-black text-slate-900 flex items-center gap-2">
                <Building className="w-5 h-5 text-indigo-600" />
                <span>{data.setup.title}</span>
              </h2>
              <p className="text-xs text-slate-600 leading-relaxed">
                {data.setup.sub}
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs pt-2">
                {data.setup.cards.map((card, idx) => (
                  <div key={idx} className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
                    <h3 className="font-bold text-slate-900 flex items-center gap-1.5">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                      <span>{card.title}</span>
                    </h3>
                    <p className="text-slate-600 leading-relaxed text-[11px]">
                      {card.desc}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: HOUSING & MONTHLY LIVING COSTS */}
        {activeTab === 'HOUSING' && (
          <div className="space-y-4 animate-fade-in">
            <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-xs space-y-4">
              <h2 className="text-lg font-black text-slate-900 flex items-center gap-2">
                <Wallet className="w-5 h-5 text-emerald-600" />
                <span>{data.housing.title}</span>
              </h2>
              <p className="text-xs text-slate-600 leading-relaxed">
                {data.housing.sub}
              </p>

              <div className="space-y-2 pt-1">
                {data.costs.map((c, i) => (
                  <div key={i} className="p-3.5 bg-slate-50 rounded-2xl flex items-center justify-between gap-4 border border-slate-100">
                    <div>
                      <p className="font-bold text-xs text-slate-900">{c.category}</p>
                      <p className="text-[11px] text-slate-500 mt-0.5">{c.note}</p>
                    </div>
                    <span className="text-xs font-black text-indigo-900 whitespace-nowrap bg-indigo-50 px-2.5 py-1 rounded-xl border border-indigo-100">
                      {c.amount}
                    </span>
                  </div>
                ))}
              </div>

              {/* Housing Tips Card */}
              <div className="bg-amber-50/70 border border-amber-200 rounded-2xl p-4 space-y-2 text-xs">
                <h3 className="font-bold text-amber-950 flex items-center gap-1.5">
                  <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0" />
                  <span>{data.housing.tipTitle}</span>
                </h3>
                <p className="text-amber-900 leading-relaxed text-[11px]">
                  {data.housing.tipDesc}
                </p>
              </div>
            </div>
          </div>
        )}

        {/* TAB 3: CULTURE & ETIQUETTE */}
        {activeTab === 'CULTURE' && (
          <div className="space-y-6 animate-fade-in">
            {/* Culture Overview Card */}
            <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-xs space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 pb-4">
                <div>
                  <h2 className="text-lg sm:text-xl font-black text-slate-900 flex items-center gap-2">
                    <Sparkles className={`w-5 h-5 ${isJapan ? 'text-red-600' : 'text-blue-600'}`} />
                    <span>
                      {isNe
                        ? `${isJapan ? 'जापान' : 'कोरिया'}को संस्कृति, परम्परा र शिष्टाचार पूर्ण गाइड`
                        : `${isJapan ? 'Japan' : 'Korea'} Culture, Customs & Etiquette Guide`}
                    </span>
                  </h2>
                  <p className="text-xs text-slate-600 mt-1">
                    {isNe
                      ? 'आदर र शिष्टाचार जापानी तथा कोरियन समाजको मेरुदण्ड हो। मुख्य सामाजिक नियमहरू सिकेर सम्मान प्राप्त गर्नुहोस्।'
                      : 'Understand core cultural codes to build respect, avoid accidental offense, and thrive.'}
                  </p>
                </div>
                <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase self-start sm:self-auto ${
                  isJapan ? 'bg-red-50 text-red-700 border border-red-200' : 'bg-blue-50 text-blue-700 border border-blue-200'
                }`}>
                  {isNe ? 'सांस्कृतिक ज्ञान' : 'Cultural Immersion'}
                </span>
              </div>

              {/* Culture Sub-categories Filter */}
              <div className="flex flex-wrap gap-1.5 pt-1">
                {data.cultureCategories.map(filter => (
                  <button
                    key={filter.id}
                    onClick={() => setCultureCategory(filter.id as CultureCategory)}
                    className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                      cultureCategory === filter.id
                        ? isJapan ? 'bg-red-600 text-white shadow-xs' : 'bg-blue-600 text-white shadow-xs'
                        : 'bg-slate-100 text-slate-600 hover:bg-slate-200 hover:text-slate-900'
                    }`}
                  >
                    {filter.label}
                  </button>
                ))}
              </div>

              {/* Cultural Modules Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
                {filteredCultureModules.map((item) => {
                  const IconComp = MODULE_ICONS[item.id] || Sparkles;
                  return (
                    <div key={item.id} className="rounded-2xl border border-slate-200 bg-white p-5 space-y-3.5 hover:shadow-xs transition-all">
                      <div className="flex items-start justify-between gap-2">
                        <div className="flex items-center gap-2.5">
                          <div className="p-2 rounded-xl bg-slate-50 border border-slate-100 shadow-2xs">
                            <IconComp className="w-5 h-5 text-indigo-600" />
                          </div>
                          <div>
                            <h3 className="font-black text-sm text-slate-950">{item.title}</h3>
                            <p className="text-[11px] font-semibold text-slate-500">{item.sub}</p>
                          </div>
                        </div>
                        <span className="text-[10px] font-black uppercase px-2 py-0.5 rounded-full bg-slate-100 border border-slate-200 text-slate-700 shrink-0">
                          {item.badge}
                        </span>
                      </div>

                      <p className="text-xs text-slate-700 leading-relaxed font-medium">
                        {item.summary}
                      </p>

                      <div className="space-y-2 bg-slate-50 rounded-xl p-3 border border-slate-100">
                        {item.points.map((pt, idx) => (
                          <div key={idx} className="text-xs">
                            <span className="font-extrabold text-slate-900">{pt.label}: </span>
                            <span className="text-slate-700">{pt.desc}</span>
                          </div>
                        ))}
                      </div>

                      <div className="text-[11px] bg-amber-50/60 rounded-xl p-2.5 border border-amber-200/60 flex items-start gap-1.5 text-slate-900">
                        <Sparkles className="w-3.5 h-3.5 text-amber-600 shrink-0 mt-0.5" />
                        <div>
                          <strong className="font-extrabold text-amber-900">
                            {isNe ? 'मुख्य नियम (Golden Rule): ' : 'Golden Rule: '}
                          </strong>
                          <span>{item.proTip}</span>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Interactive Cultural Knowledge Check (Quiz) */}
            <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-xs space-y-4">
              <div className="flex items-center gap-2">
                <Award className={`w-5 h-5 ${isJapan ? 'text-red-600' : 'text-blue-600'}`} />
                <h3 className="text-base sm:text-lg font-black text-slate-900">
                  {isNe ? `सांस्कृतिक ज्ञान परीक्षण: ${isJapan ? 'जापान' : 'कोरिया'}सम्बन्धी प्रश्नोत्तर` : `Cultural Quick Quiz: Test Your ${isJapan ? 'Japan' : 'Korea'} Knowledge`}
                </h3>
              </div>
              <p className="text-xs text-slate-600">
                {isNe
                  ? 'जापान वा कोरिया जानुअघि त्यहाँको व्यावहारिक सामाजिक नियमहरू कत्तिको बुझ्नुभएको छ भनी जाँच्नुहोस्।'
                  : 'Check your understanding of real-life cultural situations.'}
              </p>

              <div className="space-y-4 pt-2">
                {data.quiz.map((quiz, qIdx) => {
                  const hasAnswered = quizAnswers[qIdx] !== undefined;
                  const isCorrect = quizFeedback[qIdx];

                  return (
                    <div key={qIdx} className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
                      <p className="text-xs font-black text-slate-900 flex items-start gap-2">
                        <span className="px-2 py-0.5 rounded-full bg-slate-200 text-slate-800 text-[10px] font-bold">
                          Q{qIdx + 1}
                        </span>
                        <span>{quiz.q}</span>
                      </p>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                        {quiz.options.map((opt, optIdx) => {
                          const isSelected = quizAnswers[qIdx] === optIdx;
                          let btnStyle = 'bg-white border-slate-200 text-slate-700 hover:bg-slate-100';

                          if (hasAnswered) {
                            if (optIdx === quiz.correct) {
                              btnStyle = 'bg-emerald-100 border-emerald-300 text-emerald-950 font-bold';
                            } else if (isSelected && !isCorrect) {
                              btnStyle = 'bg-rose-100 border-rose-300 text-rose-950';
                            }
                          }

                          return (
                            <button
                              key={optIdx}
                              onClick={() => handleQuizOption(qIdx, optIdx)}
                              className={`p-3 rounded-xl border text-left flex items-center justify-between gap-2 text-xs transition-colors cursor-pointer ${btnStyle}`}
                            >
                              <span>{opt}</span>
                              {hasAnswered && optIdx === quiz.correct && (
                                <Check className="w-4 h-4 text-emerald-700 shrink-0" />
                              )}
                              {hasAnswered && isSelected && !isCorrect && (
                                <X className="w-4 h-4 text-rose-700 shrink-0" />
                              )}
                            </button>
                          );
                        })}
                      </div>

                      {hasAnswered && (
                        <div className={`p-3 rounded-xl text-xs flex items-start gap-2 ${
                          isCorrect ? 'bg-emerald-50 text-emerald-900 border border-emerald-200' : 'bg-amber-50 text-amber-900 border border-amber-200'
                        }`}>
                          <HelpCircle className="w-4 h-4 shrink-0 mt-0.5" />
                          <div>
                            <span className="font-extrabold">{isCorrect ? (isNe ? 'सहि उत्तर! ' : 'Correct! ') : (isNe ? 'व्याख्या: ' : 'Explanation: ')}</span>
                            <span>{quiz.explanation}</span>
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}

        {/* TAB 4: VISA RENEWAL, STATUS CHANGE & PR */}
        {activeTab === 'VISA_RENEWAL' && (
          <div className="space-y-4 animate-fade-in">
            <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-xs space-y-4">
              <h2 className="text-lg font-black text-slate-900 flex items-center gap-2">
                <FileCheck className="w-5 h-5 text-indigo-600" />
                <span>{data.visaRenewal.title}</span>
              </h2>
              <p className="text-xs text-slate-600 leading-relaxed">
                {data.visaRenewal.sub}
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs pt-1">
                {data.visaRenewal.cards.map((c, idx) => (
                  <div key={idx} className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
                    <h3 className="font-bold text-slate-900 flex items-center gap-1.5">
                      <Sparkles className="w-4 h-4 text-indigo-600 shrink-0" />
                      <span>{c.title}</span>
                    </h3>
                    <p className="text-slate-600 leading-relaxed text-[11px]">
                      {c.desc}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* TAB 5: LABOR RIGHTS & 28-HOUR RULE */}
        {activeTab === 'RIGHTS' && (
          <div className="space-y-4 animate-fade-in">
            <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-xs space-y-4">
              <h2 className="text-lg font-black text-slate-900 flex items-center gap-2">
                <Scale className="w-5 h-5 text-amber-600" />
                <span>{data.rights.title}</span>
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                {data.rights.cards.map((c, idx) => (
                  <div
                    key={idx}
                    className={`p-4 rounded-2xl border space-y-2 ${
                      c.alert
                        ? 'bg-red-50 border-red-200 text-red-950'
                        : 'bg-slate-50 border-slate-200 text-slate-900'
                    }`}
                  >
                    <h3 className="font-bold flex items-center gap-1.5">
                      {c.alert ? <Clock className="w-4 h-4 text-red-600 shrink-0" /> : <Scale className="w-4 h-4 text-emerald-600 shrink-0" />}
                      <span>{c.title}</span>
                    </h3>
                    <p className={`leading-relaxed text-[11px] ${c.alert ? 'text-red-900' : 'text-slate-600'}`}>
                      {c.desc}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* TAB 6: EMERGENCY HELPLINES & EMBASSY */}
        {activeTab === 'EMERGENCY' && (
          <div className="space-y-4 animate-fade-in">
            <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-xs space-y-4">
              <h2 className="text-lg font-black text-slate-900 flex items-center gap-2">
                <Phone className="w-5 h-5 text-indigo-600" />
                <span>{data.emergency.title}</span>
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                {data.emergency.cards.map((c, idx) => (
                  <div key={idx} className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-1.5">
                    <p className="font-bold text-slate-900">{c.title}</p>
                    <p className="text-xl font-black text-indigo-700">{c.contact}</p>
                    <p className="text-[11px] text-slate-600">{c.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

      </main>
    </div>
  );
}
