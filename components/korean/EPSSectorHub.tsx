'use client';

import React, { useState } from 'react';
import { Factory, Leaf, HardHat, Waves, ShieldCheck, ChevronRight, BookOpen, Volume2, Award, Search, Globe, Zap } from 'lucide-react';
import { getKoreanVocabByLevel, getKoreanVocabByIndustry, KoreanVocabItem, KoreanVocabLevel } from '@/lib/korean-vocab';

// ─────────────────────────────────────────────────────────────────────
// EPS-TOPIK Industry Sector Hub
// Provides sector-specific vocabulary, key phrases, and exam strategies
// for Manufacturing, Agriculture, Construction, Fishing, and Safety
// ─────────────────────────────────────────────────────────────────────

interface EPS_Sector {
  id: KoreanVocabLevel;
  industryCode: string;
  label: string;
  koreanLabel: string;
  emoji: string;
  icon: React.ReactNode;
  color: string;
  borderColor: string;
  badgeBg: string;
  textAccent: string;
  bgGlow: string;
  description: string;
  nepaliDescription: string;
  keyFacts: string[];
  examLessons: string;
  totalVocab: string;
  passScore: string;
  topics: { title: string; korean: string }[];
}

const EPS_SECTORS: EPS_Sector[] = [
  {
    id: 'EPS_MFG',
    industryCode: 'MFG',
    label: 'Manufacturing',
    koreanLabel: '제조업',
    emoji: '🏭',
    icon: <Factory className="w-5 h-5" />,
    color: 'from-blue-600 via-indigo-600 to-cyan-600',
    borderColor: 'border-blue-500/30',
    badgeBg: 'bg-blue-500/20 text-blue-300 border-blue-500/30',
    textAccent: 'text-blue-400',
    bgGlow: 'bg-blue-950/40',
    description: 'Vocabulary and phrases for factory assembly lines, quality control, machine operation, welding, painting, and packaging.',
    nepaliDescription: 'कारखाना असेम्बली, गुणस्तर नियन्त्रण, मेसिन सञ्चालन, वेल्डिङ र प्याकेजिङका लागि शब्दावली।',
    keyFacts: ['Most common EPS-TOPIK job category', 'Focuses on Lessons 22–27', 'Safety + production vocab critical', 'CBT exam: 50 vocab + 50 reading'],
    examLessons: 'Lessons 22–27',
    totalVocab: '500+ terms',
    passScore: '80 / 200 Pts',
    topics: [
      { title: 'Machine & Tools', korean: '기계와 공구' },
      { title: 'Quality Control', korean: '품질 관리' },
      { title: 'Assembly Process', korean: '조립 공정' },
      { title: 'Welding & Coating', korean: '용접과 도장' },
      { title: 'Packaging & Shipping', korean: '포장과 출하' },
    ],
  },
  {
    id: 'EPS_AGR',
    industryCode: 'AGR',
    label: 'Agriculture',
    koreanLabel: '농업·축산업',
    emoji: '🌾',
    icon: <Leaf className="w-5 h-5" />,
    color: 'from-emerald-600 via-green-600 to-teal-600',
    borderColor: 'border-emerald-500/30',
    badgeBg: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30',
    textAccent: 'text-emerald-400',
    bgGlow: 'bg-emerald-950/40',
    description: 'Vocabulary for crop farming, greenhouse cultivation, livestock management, soil and irrigation, and harvest operations.',
    nepaliDescription: 'बाली खेती, हरितगृह खेती, पशुपालन, माटो र सिँचाइ, तथा कटाइ कार्यका लागि शब्दावली।',
    keyFacts: ['Common for Nepali workers in Korea', 'Seasonal work vocabulary important', 'Focuses on Lessons 29–31', 'Greenhouse & outdoor farming'],
    examLessons: 'Lessons 29–31',
    totalVocab: '400+ terms',
    passScore: '80 / 200 Pts',
    topics: [
      { title: 'Crops & Seeds', korean: '농작물과 씨앗' },
      { title: 'Greenhouse Work', korean: '비닐하우스 작업' },
      { title: 'Livestock Farming', korean: '가축 사육' },
      { title: 'Soil & Fertilizer', korean: '토양과 비료' },
      { title: 'Harvest & Storage', korean: '수확과 보관' },
    ],
  },
  {
    id: 'EPS_CON',
    industryCode: 'CON',
    label: 'Construction',
    koreanLabel: '건설업',
    emoji: '🏗️',
    icon: <HardHat className="w-5 h-5" />,
    color: 'from-amber-600 via-orange-600 to-yellow-600',
    borderColor: 'border-amber-500/30',
    badgeBg: 'bg-amber-500/20 text-amber-300 border-amber-500/30',
    textAccent: 'text-amber-400',
    bgGlow: 'bg-amber-950/40',
    description: 'Vocabulary for building sites, concrete and steel work, scaffolding, carpentry, blueprints, and heavy equipment.',
    nepaliDescription: 'निर्माण स्थल, कंक्रिट र फलामको काम, भर्‍याङ, काठको काम, नक्शा र भारी उपकरणका शब्दावली।',
    keyFacts: ['Highest safety requirements', 'Focuses on Lessons 28, 32–34', 'Heavy equipment vocabulary essential', 'Blueprint reading skills required'],
    examLessons: 'Lessons 28, 32–34',
    totalVocab: '450+ terms',
    passScore: '80 / 200 Pts',
    topics: [
      { title: 'Building Materials', korean: '건축 자재' },
      { title: 'Concrete & Steel', korean: '콘크리트와 철근' },
      { title: 'Heavy Equipment', korean: '중장비' },
      { title: 'Safety at Site', korean: '현장 안전' },
      { title: 'Blueprint Reading', korean: '설계도 보기' },
    ],
  },
  {
    id: 'EPS_FISH',
    industryCode: 'FISH',
    label: 'Fishing',
    koreanLabel: '어업·양식업',
    emoji: '🐟',
    icon: <Waves className="w-5 h-5" />,
    color: 'from-cyan-600 via-sky-600 to-blue-600',
    borderColor: 'border-cyan-500/30',
    badgeBg: 'bg-cyan-500/20 text-cyan-300 border-cyan-500/30',
    textAccent: 'text-cyan-400',
    bgGlow: 'bg-cyan-950/40',
    description: 'Vocabulary for deep-sea fishing, coastal aquaculture, fish processing, marine equipment, and port operations.',
    nepaliDescription: 'गहिरो समुद्री माछा मार्ने, तटीय जलकृषि, माछा प्रशोधन, समुद्री उपकरण र बन्दरगाह सञ्चालन।',
    keyFacts: ['Physically demanding work', 'Focuses on Lesson 31', 'Seasonal catch terminology', 'Aquaculture growing sector'],
    examLessons: 'Lesson 31',
    totalVocab: '300+ terms',
    passScore: '80 / 200 Pts',
    topics: [
      { title: 'Fishing Vessels', korean: '어선과 항구' },
      { title: 'Nets & Equipment', korean: '그물과 어구' },
      { title: 'Aquaculture', korean: '양식업' },
      { title: 'Fish Processing', korean: '수산물 가공' },
      { title: 'Marine Safety', korean: '해상 안전' },
    ],
  },
  {
    id: 'EPS_SAFETY',
    industryCode: 'SAFETY',
    label: 'Workplace Safety',
    koreanLabel: '산업 안전',
    emoji: '🦺',
    icon: <ShieldCheck className="w-5 h-5" />,
    color: 'from-rose-600 via-red-600 to-pink-600',
    borderColor: 'border-rose-500/30',
    badgeBg: 'bg-rose-500/20 text-rose-300 border-rose-500/30',
    textAccent: 'text-rose-400',
    bgGlow: 'bg-rose-950/40',
    description: 'Cross-industry safety vocabulary: protective equipment, emergency procedures, first aid, hazard identification, and industrial accident law.',
    nepaliDescription: 'सबै उद्योगमा आवश्यक सुरक्षा शब्दावली: सुरक्षा सामग्री, आपतकालीन प्रक्रिया, प्राथमिक उपचार, र औद्योगिक दुर्घटना कानुन।',
    keyFacts: ['Required across ALL EPS sectors', 'Focuses on Lessons 23, 32–35', 'PPE vocabulary mandatory', 'Industrial accident law terms'],
    examLessons: 'Lessons 23, 32–35',
    totalVocab: '350+ terms',
    passScore: 'Cross-sector (All)',
    topics: [
      { title: 'Personal Protective Gear', korean: '개인 보호 장구' },
      { title: 'Emergency Response', korean: '비상 대응' },
      { title: 'First Aid', korean: '응급 처치' },
      { title: 'Hazard Identification', korean: '위험 요소 파악' },
      { title: 'Industrial Accident Law', korean: '산재 보험법' },
    ],
  },
];

function playKorean(text: string) {
  if ('speechSynthesis' in window) {
    window.speechSynthesis.cancel();
    const u = new SpeechSynthesisUtterance(text);
    u.lang = 'ko-KR';
    u.rate = 0.85;
    window.speechSynthesis.speak(u);
  }
}

interface EPSSectorHubProps {
  initialSector?: KoreanVocabLevel;
}

export const EPSSectorHub: React.FC<EPSSectorHubProps> = ({ initialSector }) => {
  const [activeSector, setActiveSector] = useState<KoreanVocabLevel | null>(initialSector ?? null);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeLesson, setActiveLesson] = useState<number | null>(null);

  const selectedSector = EPS_SECTORS.find(s => s.id === activeSector) ?? null;

  const sectorVocab = activeSector
    ? getKoreanVocabByLevel(activeSector).filter(v => {
        if (searchQuery) {
          const q = searchQuery.toLowerCase();
          return (
            v.word.includes(searchQuery) ||
            v.meaning.toLowerCase().includes(q) ||
            v.meaningNepali.includes(searchQuery) ||
            v.romanization.toLowerCase().includes(q)
          );
        }
        if (activeLesson !== null) return v.lesson === activeLesson;
        return true;
      })
    : [];

  const availableLessons = activeSector
    ? [...new Set(getKoreanVocabByLevel(activeSector).map(v => v.lesson))].sort((a, b) => a - b)
    : [];

  if (!activeSector) {
    return (
      <div className="space-y-6 text-slate-900">
        {/* Header */}
        <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-xs">
          <div className="flex items-center gap-3 mb-2">
            <span className="px-3 py-1 rounded-lg bg-teal-50 text-teal-700 border border-teal-200 text-xs font-black uppercase tracking-wider">
              EPS-TOPIK Industry Sectors
            </span>
            <span className="px-2.5 py-1 rounded-lg bg-emerald-50 text-emerald-700 border border-emerald-200 text-xs font-bold">
              5 Sectors
            </span>
          </div>
          <h2 className="text-2xl font-black text-slate-900">🏢 EPS-TOPIK Industry-Specific Modules</h2>
          <p className="text-sm text-slate-600 mt-1">
            Choose your industry to access specialized vocabulary, key phrases, and exam strategies tailored to your work sector in Korea.
          </p>
        </div>

        {/* Sector Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {EPS_SECTORS.map(sector => (
            <button
              key={sector.id}
              onClick={() => { setActiveSector(sector.id); setActiveLesson(null); }}
              className="group relative text-left bg-white border border-slate-200 hover:border-blue-400 rounded-3xl p-5 shadow-xs transition-all duration-300 hover:scale-[1.02] hover:shadow-md cursor-pointer"
            >
              {/* Top row */}
              <div className="relative flex items-start justify-between gap-3 mb-4">
                <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${sector.color} flex items-center justify-center text-white text-xl shadow-md flex-shrink-0`}>
                  {sector.emoji}
                </div>
                <span className="px-2.5 py-1 rounded-lg border border-blue-200 bg-blue-50 text-blue-800 text-[10px] font-black uppercase tracking-wider">
                  {sector.examLessons}
                </span>
              </div>

              {/* Title */}
              <div className="relative mb-2">
                <h3 className="text-base font-black text-slate-900 flex items-center gap-1">
                  {sector.label}
                  <ChevronRight className="w-4 h-4 text-blue-600 transition-transform group-hover:translate-x-1" />
                </h3>
                <p className="text-xs font-bold text-blue-700">{sector.koreanLabel}</p>
              </div>

              {/* Description */}
              <p className="relative text-[11px] text-slate-600 leading-relaxed mb-4 line-clamp-2">
                {sector.description}
              </p>

              {/* Stats row */}
              <div className="relative grid grid-cols-2 gap-2">
                <div className="bg-slate-50 rounded-xl p-2 border border-slate-200">
                  <div className="text-[10px] text-slate-500 font-bold uppercase">Vocab</div>
                  <div className="text-xs font-black text-blue-700">{sector.totalVocab}</div>
                </div>
                <div className="bg-slate-50 rounded-xl p-2 border border-slate-200">
                  <div className="text-[10px] text-slate-500 font-bold uppercase">Pass</div>
                  <div className="text-xs font-black text-amber-700">{sector.passScore}</div>
                </div>
              </div>

              {/* Topics */}
              <div className="relative mt-3 flex flex-wrap gap-1">
                {sector.topics.slice(0, 3).map(t => (
                  <span key={t.title} className="px-2 py-0.5 rounded-full bg-slate-100 border border-slate-200 text-[10px] text-slate-700 font-semibold">
                    {t.korean}
                  </span>
                ))}
                {sector.topics.length > 3 && (
                  <span className="px-2 py-0.5 rounded-full bg-slate-100 border border-slate-200 text-[10px] text-slate-500 font-semibold">
                    +{sector.topics.length - 3} more
                  </span>
                )}
              </div>
            </button>
          ))}
        </div>

        {/* General EPS also accessible */}
        <div className="bg-white border border-slate-200 rounded-2xl p-4 flex items-center gap-4 shadow-xs">
          <div className="w-10 h-10 rounded-xl bg-slate-100 border border-slate-200 flex items-center justify-center text-xl flex-shrink-0">📚</div>
          <div className="flex-1">
            <p className="text-sm font-black text-slate-900">EPS-TOPIK General (All 60 Lessons)</p>
            <p className="text-xs text-slate-600">Complete EPS curriculum including all industry topics + daily life + workplace Korean.</p>
          </div>
          <button
            onClick={() => setActiveSector('EPS')}
            className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-black transition-all cursor-pointer whitespace-nowrap shadow-xs"
          >
            View All →
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-5 text-slate-900">
      {/* Back + Sector Header */}
      <div className="bg-white border border-slate-200 rounded-3xl p-5 shadow-xs">
        <button
          onClick={() => { setActiveSector(null); setSearchQuery(''); setActiveLesson(null); }}
          className="text-slate-500 hover:text-slate-900 text-xs font-black flex items-center gap-1 mb-3 transition-colors cursor-pointer"
        >
          ← Back to Sectors
        </button>

        <div className="flex flex-col sm:flex-row sm:items-center gap-4">
          <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${selectedSector?.color} flex items-center justify-center text-3xl shadow-md flex-shrink-0`}>
            {selectedSector?.emoji}
          </div>
          <div className="flex-1">
            <div className="flex flex-wrap items-center gap-2 mb-1">
              <span className="px-2.5 py-0.5 rounded-lg border border-blue-200 bg-blue-50 text-blue-800 text-[10px] font-black uppercase tracking-wider">
                {selectedSector?.examLessons}
              </span>
              <span className="px-2.5 py-0.5 rounded-lg bg-slate-100 border border-slate-200 text-[10px] font-bold text-slate-700">
                EPS-TOPIK Industry
              </span>
            </div>
            <h2 className="text-xl font-black text-slate-900">
              {selectedSector?.emoji} {selectedSector?.label} <span className="text-base text-blue-700">({selectedSector?.koreanLabel})</span>
            </h2>
            <p className="text-xs text-slate-600 mt-0.5">{selectedSector?.nepaliDescription}</p>
          </div>
        </div>

        {/* Key facts */}
        <div className="mt-4 grid grid-cols-2 sm:grid-cols-4 gap-2">
          {selectedSector?.keyFacts.map((fact, i) => (
            <div key={i} className="bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-[11px] text-slate-700 font-semibold flex items-start gap-1.5">
              <Zap className="w-3 h-3 text-blue-600 mt-0.5 shrink-0" />
              {fact}
            </div>
          ))}
        </div>
      </div>

      {/* Topics overview */}
      <div className="bg-white border border-slate-200 rounded-2xl p-4 shadow-xs">
        <h3 className="text-xs font-black uppercase tracking-wider text-slate-500 mb-3 flex items-center gap-2">
          <BookOpen className="w-4 h-4 text-blue-600" /> Exam Topics ({selectedSector?.koreanLabel})
        </h3>
        <div className="flex flex-wrap gap-2">
          {selectedSector?.topics.map(t => (
            <div key={t.title} className="px-3 py-1.5 rounded-xl border border-blue-200 bg-blue-50 text-xs font-bold">
              <span className="text-blue-700 font-black">{t.korean}</span>
              <span className="text-slate-600 ml-1">({t.title})</span>
            </div>
          ))}
        </div>
      </div>

      {/* Search & Lesson Filter */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search vocabulary..."
            value={searchQuery}
            onChange={e => { setSearchQuery(e.target.value); setActiveLesson(null); }}
            className="w-full pl-10 pr-4 py-2.5 bg-white border border-slate-200 rounded-xl text-xs font-bold text-slate-900 placeholder-slate-400 focus:outline-none focus:border-blue-500 shadow-xs"
          />
        </div>
        <div className="flex items-center gap-2 flex-wrap">
          <button
            onClick={() => setActiveLesson(null)}
            className={`px-3 py-2 rounded-xl text-xs font-black transition-all cursor-pointer ${activeLesson === null && !searchQuery ? `bg-blue-600 text-white shadow-xs` : 'text-slate-700 hover:text-slate-900 bg-white border border-slate-200'}`}
          >
            All
          </button>
          {availableLessons.map(l => (
            <button
              key={l}
              onClick={() => { setActiveLesson(l); setSearchQuery(''); }}
              className={`px-3 py-2 rounded-xl text-xs font-black transition-all cursor-pointer ${activeLesson === l ? `bg-blue-600 text-white shadow-xs` : 'text-slate-700 hover:text-slate-900 bg-white border border-slate-200'}`}
            >
              Lesson {l}
            </button>
          ))}
        </div>
      </div>

      {/* Vocab count */}
      <div className="flex items-center justify-between px-1">
        <span className="text-xs text-slate-500 font-bold">
          Showing {sectorVocab.length} vocabulary items
        </span>
        <span className="text-xs font-black px-3 py-1 rounded-full bg-blue-50 text-blue-700 border border-blue-200">
          {selectedSector?.label}
        </span>
      </div>

      {/* Vocabulary Cards */}
      {sectorVocab.length === 0 ? (
        <div className="text-center py-16 text-slate-500 bg-white border border-slate-200 rounded-2xl shadow-xs">
          <Globe className="w-12 h-12 mx-auto mb-3 opacity-30 text-slate-400" />
          <p className="font-bold">No vocabulary found for this filter.</p>
          <button onClick={() => { setSearchQuery(''); setActiveLesson(null); }} className="text-xs text-blue-600 mt-2 underline cursor-pointer">
            Clear filter
          </button>
        </div>
      ) : (
        <div className="space-y-3">
          {sectorVocab.map((item) => (
            <div
              key={item.id}
              className="bg-white border border-slate-200 hover:border-slate-300 rounded-2xl p-4 shadow-xs transition-all"
            >
              <div className="flex items-start justify-between gap-3">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-xl font-black text-slate-900">{item.word}</span>
                    <button
                      onClick={() => playKorean(item.word)}
                      className="p-1.5 rounded-lg bg-slate-100 hover:bg-blue-50 border border-slate-200 transition-all cursor-pointer"
                    >
                      <Volume2 className="w-3.5 h-3.5 text-slate-600" />
                    </button>
                  </div>
                  <div className="text-xs font-bold text-blue-700 mb-1">{item.romanization}</div>
                  <div className="flex flex-wrap gap-2 text-xs">
                    <span className="text-slate-800 font-semibold">🇬🇧 {item.meaning}</span>
                    <span className="text-emerald-700 font-semibold">🇳🇵 {item.meaningNepali}</span>
                  </div>
                </div>
                <div className="flex flex-col items-end gap-1 shrink-0">
                  {item.partOfSpeech && (
                    <span className="px-2 py-0.5 rounded-full bg-slate-100 border border-slate-200 text-[10px] text-slate-600 font-bold">
                      {item.partOfSpeech}
                    </span>
                  )}
                  {item.topic && (
                    <span className="px-2 py-0.5 rounded-full border border-blue-200 bg-blue-50 text-blue-700 text-[10px] font-bold">
                      {item.topic}
                    </span>
                  )}
                </div>
              </div>

              {/* Example Sentence */}
              {item.grammarSentences && item.grammarSentences.length > 0 && (
                <div className="mt-3 pt-3 border-t border-slate-100 space-y-1">
                  <div className="flex items-start justify-between gap-2">
                    <div className="text-sm font-bold text-slate-800">{item.grammarSentences[0].korean}</div>
                    <button
                      onClick={() => playKorean(item.grammarSentences![0].korean)}
                      className="p-1.5 rounded-lg bg-slate-100 hover:bg-blue-50 border border-slate-200 transition-all cursor-pointer shrink-0"
                    >
                      <Volume2 className="w-3 h-3 text-slate-600" />
                    </button>
                  </div>
                  <div className="text-[11px] text-blue-600 font-medium">{item.grammarSentences[0].romanization}</div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-1 text-[11px]">
                    <span className="text-slate-700">🇬🇧 {item.grammarSentences[0].english}</span>
                    <span className="text-emerald-700">🇳🇵 {item.grammarSentences[0].nepali}</span>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default EPSSectorHub;
