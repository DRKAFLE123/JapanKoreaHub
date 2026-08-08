'use client';

import React, { useState, useEffect } from 'react';
import {
  BookOpen, Layers, Headphones, Clock, FileText, Globe,
  Sparkles, Award, Factory, Leaf, HardHat, Waves, ShieldCheck,
  PenLine, Target, ChevronRight, ChevronDown, GraduationCap, Compass, CheckCircle2
} from 'lucide-react';
import { KoreanVocabularyExplorer } from './KoreanVocabularyExplorer';
import { KoreanGrammarExplorer } from './KoreanGrammarExplorer';
import { Korean300CommonWordsExplorer } from './Korean300CommonWordsExplorer';
import { KoreanFlashcardCard } from './KoreanFlashcardCard';
import { AlphabetGrid } from './AlphabetGrid';
import { TimedExamEngine } from './TimedExamEngine';
import { LevelExamSyllabusGuide } from './LevelExamSyllabusGuide';
import { EPSSectorHub } from './korean/EPSSectorHub';
import { KoreanBasicsModuleSystem } from './korean/KoreanBasicsModuleSystem';
import { KOREAN_BASICS_MODULES } from '@/lib/korean-basics-modules';
import type { KoreanVocabLevel } from '@/lib/korean-vocab';

// ─────────────────────────────────────────────────────────────────────
// TYPES
// ─────────────────────────────────────────────────────────────────────
export type KoreanLevelType =
  | 'BASICS'        // Hangul alphabet
  | 'EPS'           // EPS-TOPIK General (60 lessons)
  | 'EPS_MFG'       // EPS Manufacturing
  | 'EPS_AGR'       // EPS Agriculture
  | 'EPS_CON'       // EPS Construction
  | 'EPS_FISH'      // EPS Fishing
  | 'EPS_SAFETY'    // EPS Workplace Safety
  | 'TOPIK1_L1'     // TOPIK I Level 1 (Beginner)
  | 'TOPIK2'        // TOPIK I Level 2 (Elementary)
  | 'TOPIK3'        // TOPIK II Level 3 (Intermediate)
  | 'TOPIK4'        // TOPIK II Level 4 (Upper-Intermediate)
  | 'TOPIK2_L5'     // TOPIK II Level 5 (Advanced)
  | 'TOPIK2_L6';    // TOPIK II Level 6 (Near-Native)

export type KoreanSubTab =
  | 'BASICS_MODULES'
  | 'BASICS_PROGRESS'
  | 'BASICS_TEST'
  | 'BASICS_ALPHABET'
  | 'GRAMMAR_100'
  | 'COMMON_300'
  | 'VOCABULARY'
  | 'GRAMMAR'
  | 'FLASHCARDS'
  | 'LISTENING'
  | 'READING'
  | 'WRITING'
  | 'EPS_SECTORS'
  | 'EXAMS'
  | 'EXAM_GUIDE';

import { useSidebarCollapse } from './layout/MainLayoutWrapper';
import { PanelLeftClose, PanelLeftOpen } from 'lucide-react';

export interface KoreanHubDashboardProps {
  level?: KoreanLevelType;
  onSelectLevel?: (lvl: KoreanLevelType) => void;
  activeTab?: KoreanSubTab;
  onTabChange?: (tab: KoreanSubTab) => void;
}

// ─────────────────────────────────────────────────────────────────────
// LEVEL METADATA
// ─────────────────────────────────────────────────────────────────────
interface LevelMeta {
  title: string;
  subtitle: string;
  badge: string;
  emoji: string;
  color: string;
  border: string;
  bgGlow: string;
  textAccent: string;
  examType: string;
  stats: { label: string; value: string }[];
  hasWriting: boolean;
  hasListening: boolean;
  hasReading: boolean;
  hasEPSSectors: boolean;
}

const LEVEL_META: Record<KoreanLevelType, LevelMeta> = {
  BASICS: {
    title: 'Korean Basics — Hangul Alphabet',
    subtitle: 'Consonants, Vowels, Pronunciation, Syllable Structure',
    badge: 'Level 00',
    emoji: '🌱',
    color: 'from-emerald-600 via-teal-600 to-cyan-600',
    border: 'border-emerald-500/30',
    bgGlow: 'bg-emerald-950/40',
    textAccent: 'text-emerald-400',
    examType: 'Foundation',
    stats: [
      { label: 'Consonants', value: '14 + 5 Double' },
      { label: 'Vowels', value: '10 + 11 Diphthong' },
      { label: 'Syllable Blocks', value: '11,172 possible' },
      { label: 'Reading Goal', value: '100% Hangul' },
    ],
    hasWriting: false, hasListening: true, hasReading: false, hasEPSSectors: false,
  },
  EPS: {
    title: 'EPS-TOPIK General (60 Lessons)',
    subtitle: '완전한 고용허가제 한국어능력시험 • All 60 EPS Lessons',
    badge: 'EPS-TOPIK',
    emoji: '🎯',
    color: 'from-teal-600 via-cyan-600 to-emerald-600',
    border: 'border-teal-500/30',
    bgGlow: 'bg-teal-950/40',
    textAccent: 'text-teal-400',
    examType: 'EPS-TOPIK CBT',
    stats: [
      { label: 'Lessons', value: '60 Complete' },
      { label: 'Vocabulary', value: '2,500+ Words' },
      { label: 'Pass Score', value: '110 / 200 Pts' },
      { label: 'Exam Format', value: 'CBT 25 Qs, 40 min' },
    ],
    hasWriting: false, hasListening: true, hasReading: true, hasEPSSectors: true,
  },
  EPS_MFG: {
    title: 'EPS-TOPIK — Manufacturing (제조업)',
    subtitle: 'Factory, Assembly, Quality Control, Welding, Packaging',
    badge: 'EPS Manufacturing',
    emoji: '🏭',
    color: 'from-blue-600 via-indigo-600 to-cyan-600',
    border: 'border-blue-500/30',
    bgGlow: 'bg-blue-950/40',
    textAccent: 'text-blue-400',
    examType: 'EPS-TOPIK CBT',
    stats: [
      { label: 'Core Lessons', value: '22–27' },
      { label: 'Vocab', value: '500+ Terms' },
      { label: 'Pass Score', value: '80 / 200 Pts' },
      { label: 'Focus', value: 'Machine & Safety' },
    ],
    hasWriting: false, hasListening: true, hasReading: true, hasEPSSectors: true,
  },
  EPS_AGR: {
    title: 'EPS-TOPIK — Agriculture (농업·축산업)',
    subtitle: 'Crop Farming, Greenhouse, Livestock, Harvest, Irrigation',
    badge: 'EPS Agriculture',
    emoji: '🌾',
    color: 'from-emerald-600 via-green-600 to-teal-600',
    border: 'border-emerald-500/30',
    bgGlow: 'bg-emerald-950/40',
    textAccent: 'text-emerald-400',
    examType: 'EPS-TOPIK CBT',
    stats: [
      { label: 'Core Lessons', value: '29–31' },
      { label: 'Vocab', value: '400+ Terms' },
      { label: 'Pass Score', value: '80 / 200 Pts' },
      { label: 'Focus', value: 'Farming & Seasonal' },
    ],
    hasWriting: false, hasListening: true, hasReading: true, hasEPSSectors: true,
  },
  EPS_CON: {
    title: 'EPS-TOPIK — Construction (건설업)',
    subtitle: 'Building Sites, Concrete, Scaffolding, Heavy Equipment',
    badge: 'EPS Construction',
    emoji: '🏗️',
    color: 'from-amber-600 via-orange-600 to-yellow-600',
    border: 'border-amber-500/30',
    bgGlow: 'bg-amber-950/40',
    textAccent: 'text-amber-400',
    examType: 'EPS-TOPIK CBT',
    stats: [
      { label: 'Core Lessons', value: '28, 32–34' },
      { label: 'Vocab', value: '450+ Terms' },
      { label: 'Pass Score', value: '80 / 200 Pts' },
      { label: 'Focus', value: 'Site Safety' },
    ],
    hasWriting: false, hasListening: true, hasReading: true, hasEPSSectors: true,
  },
  EPS_FISH: {
    title: 'EPS-TOPIK — Fishing (어업·양식업)',
    subtitle: 'Fishing Vessels, Nets, Aquaculture, Fish Processing, Ports',
    badge: 'EPS Fishing',
    emoji: '🐟',
    color: 'from-cyan-600 via-sky-600 to-blue-600',
    border: 'border-cyan-500/30',
    bgGlow: 'bg-cyan-950/40',
    textAccent: 'text-cyan-400',
    examType: 'EPS-TOPIK CBT',
    stats: [
      { label: 'Core Lessons', value: 'Lesson 31' },
      { label: 'Vocab', value: '300+ Terms' },
      { label: 'Pass Score', value: '80 / 200 Pts' },
      { label: 'Focus', value: 'Marine & Aquaculture' },
    ],
    hasWriting: false, hasListening: true, hasReading: true, hasEPSSectors: true,
  },
  EPS_SAFETY: {
    title: 'EPS-TOPIK — Workplace Safety (산업 안전)',
    subtitle: 'PPE, Emergency Response, First Aid, Industrial Accident Law',
    badge: 'EPS Safety',
    emoji: '🦺',
    color: 'from-rose-600 via-red-600 to-pink-600',
    border: 'border-rose-500/30',
    bgGlow: 'bg-rose-950/40',
    textAccent: 'text-rose-400',
    examType: 'EPS-TOPIK CBT',
    stats: [
      { label: 'Core Lessons', value: '23, 32–35' },
      { label: 'Vocab', value: '350+ Terms' },
      { label: 'Pass Score', value: 'Cross-sector' },
      { label: 'Focus', value: 'Safety & Emergency' },
    ],
    hasWriting: false, hasListening: true, hasReading: true, hasEPSSectors: true,
  },
  TOPIK1_L1: {
    title: 'TOPIK I — Level 1 (초급)',
    subtitle: '한국어능력시험 I 1급 • Beginner Reading & Listening',
    badge: 'TOPIK I 1급',
    emoji: '⭐',
    color: 'from-violet-600 via-purple-600 to-indigo-600',
    border: 'border-violet-500/30',
    bgGlow: 'bg-violet-950/40',
    textAccent: 'text-violet-400',
    examType: 'TOPIK I',
    stats: [
      { label: 'Vocabulary', value: '800+ Words' },
      { label: 'Grammar', value: '20+ Core Rules' },
      { label: 'Pass Score', value: '80 / 200 Pts' },
      { label: 'Skills', value: 'Reading + Listening' },
    ],
    hasWriting: false, hasListening: true, hasReading: true, hasEPSSectors: false,
  },
  TOPIK2: {
    title: 'TOPIK I — Level 2 (초급)',
    subtitle: '한국어능력시험 I 2급 • Elementary Reading & Listening',
    badge: 'TOPIK I 2급',
    emoji: '⭐⭐',
    color: 'from-blue-600 via-indigo-600 to-violet-600',
    border: 'border-blue-500/30',
    bgGlow: 'bg-blue-950/40',
    textAccent: 'text-blue-400',
    examType: 'TOPIK I',
    stats: [
      { label: 'Vocabulary', value: '1,800+ Words' },
      { label: 'Grammar', value: '50+ Rules' },
      { label: 'Pass Score', value: '140 / 200 Pts' },
      { label: 'Skills', value: 'Reading + Listening' },
    ],
    hasWriting: false, hasListening: true, hasReading: true, hasEPSSectors: false,
  },
  TOPIK3: {
    title: 'TOPIK II — Level 3 (중급)',
    subtitle: '한국어능력시험 II 3급 • Intermediate (Reading, Listening, Writing)',
    badge: 'TOPIK II 3급',
    emoji: '🥉',
    color: 'from-purple-600 via-violet-600 to-indigo-600',
    border: 'border-purple-500/30',
    bgGlow: 'bg-purple-950/40',
    textAccent: 'text-purple-400',
    examType: 'TOPIK II',
    stats: [
      { label: 'Vocabulary', value: '3,500+ Words' },
      { label: 'Grammar', value: '100+ Rules' },
      { label: 'Pass Score', value: '120 / 300 Pts' },
      { label: 'Skills', value: 'Reading + Listening + Writing' },
    ],
    hasWriting: true, hasListening: true, hasReading: true, hasEPSSectors: false,
  },
  TOPIK4: {
    title: 'TOPIK II — Level 4 (중급)',
    subtitle: '한국어능력시험 II 4급 • Upper-Intermediate',
    badge: 'TOPIK II 4급',
    emoji: '🥈',
    color: 'from-pink-600 via-rose-600 to-red-600',
    border: 'border-pink-500/30',
    bgGlow: 'bg-pink-950/40',
    textAccent: 'text-pink-400',
    examType: 'TOPIK II',
    stats: [
      { label: 'Vocabulary', value: '5,000+ Words' },
      { label: 'Grammar', value: '120+ Rules' },
      { label: 'Pass Score', value: '150 / 300 Pts' },
      { label: 'Skills', value: 'Reading + Listening + Writing' },
    ],
    hasWriting: true, hasListening: true, hasReading: true, hasEPSSectors: false,
  },
  TOPIK2_L5: {
    title: 'TOPIK II — Level 5 (고급)',
    subtitle: '한국어능력시험 II 5급 • Advanced Korean',
    badge: 'TOPIK II 5급',
    emoji: '🥇',
    color: 'from-amber-600 via-orange-600 to-red-600',
    border: 'border-amber-500/30',
    bgGlow: 'bg-amber-950/40',
    textAccent: 'text-amber-400',
    examType: 'TOPIK II',
    stats: [
      { label: 'Vocabulary', value: '7,000+ Words' },
      { label: 'Grammar', value: '150+ Rules' },
      { label: 'Pass Score', value: '190 / 300 Pts' },
      { label: 'Skills', value: 'Academic + Writing' },
    ],
    hasWriting: true, hasListening: true, hasReading: true, hasEPSSectors: false,
  },
  TOPIK2_L6: {
    title: 'TOPIK II — Level 6 (고급)',
    subtitle: '한국어능력시험 II 6급 • Near-Native Proficiency',
    badge: 'TOPIK II 6급',
    emoji: '🏆',
    color: 'from-rose-600 via-amber-600 to-purple-600',
    border: 'border-rose-500/30',
    bgGlow: 'bg-rose-950/40',
    textAccent: 'text-rose-400',
    examType: 'TOPIK II',
    stats: [
      { label: 'Vocabulary', value: '10,000+ Words' },
      { label: 'Grammar', value: '200+ Rules' },
      { label: 'Pass Score', value: '230 / 300 Pts' },
      { label: 'Skills', value: 'Advanced Discourse' },
    ],
    hasWriting: true, hasListening: true, hasReading: true, hasEPSSectors: false,
  },
};

// Map KoreanLevelType → KoreanVocabLevel
function toVocabLevel(level: KoreanLevelType): KoreanVocabLevel {
  const map: Record<KoreanLevelType, KoreanVocabLevel> = {
    BASICS: 'EPS',
    EPS: 'EPS',
    EPS_MFG: 'EPS_MFG',
    EPS_AGR: 'EPS_AGR',
    EPS_CON: 'EPS_CON',
    EPS_FISH: 'EPS_FISH',
    EPS_SAFETY: 'EPS_SAFETY',
    TOPIK1_L1: 'TOPIK1_L1',
    TOPIK2: 'TOPIK2',
    TOPIK3: 'TOPIK3',
    TOPIK4: 'TOPIK4',
    TOPIK2_L5: 'TOPIK2_L5',
    TOPIK2_L6: 'TOPIK2_L6',
  };
  return map[level];
}

// ─────────────────────────────────────────────────────────────────────
// WRITING PRACTICE COMPONENT (inline, lightweight)
// ─────────────────────────────────────────────────────────────────────
const WRITING_PROMPTS: Record<string, { prompt: string; type: string; hints: string[] }[]> = {
  TOPIK3: [
    { prompt: '자신의 꿈과 목표에 대해 200–300자로 쓰세요. Write about your dream and goals in 200–300 characters.', type: '단문 에세이 (Short Essay)', hints: ['꿈 (dream)', '목표 (goal)', '노력하다 (to strive)', '이루다 (to achieve)'] },
    { prompt: '환경 문제에 대한 자신의 생각을 쓰세요. Write your thoughts on environmental issues.', type: '의견 에세이 (Opinion Essay)', hints: ['환경 오염 (pollution)', '지구 온난화 (global warming)', '해결책 (solution)', '보호하다 (to protect)'] },
  ],
  TOPIK4: [
    { prompt: '현대 사회에서 인터넷의 긍정적인 면과 부정적인 면을 비교하여 쓰세요. Compare the positive and negative aspects of the internet.', type: '비교 에세이 (Comparison)', hints: ['편리하다 (convenient)', '중독 (addiction)', '정보 (information)', '반면에 (on the other hand)'] },
  ],
  TOPIK2_L5: [
    { prompt: '글로벌화의 문화적 영향에 대해 논술하시오. Discuss the cultural impact of globalization.', type: '논술 에세이 (Academic Essay)', hints: ['세계화 (globalization)', '문화 다양성 (cultural diversity)', '영향 (impact)', '전통 (tradition)'] },
  ],
  TOPIK2_L6: [
    { prompt: '현대 민주주의의 위기와 해결 방향에 대해 고찰하시오. Examine the crisis of modern democracy and directions for resolution.', type: '고급 논술 (Advanced Essay)', hints: ['민주주의 (democracy)', '위기 (crisis)', '시민 참여 (civic participation)', '제도적 개혁 (institutional reform)'] },
  ],
};

const WritingPractice: React.FC<{ level: KoreanLevelType }> = ({ level }) => {
  const [text, setText] = useState('');
  const [promptIdx, setPromptIdx] = useState(0);
  const prompts = WRITING_PROMPTS[level] ?? WRITING_PROMPTS['TOPIK3'];
  const current = prompts[promptIdx % prompts.length];
  const charCount = text.length;

  return (
    <div className="space-y-4">
      <div className="bg-gradient-to-r from-slate-900 via-purple-950/40 to-slate-900 border border-purple-500/30 rounded-3xl p-5 shadow-xl">
        <div className="flex items-center gap-2 mb-2">
          <PenLine className="w-4 h-4 text-purple-400" />
          <span className="px-2.5 py-0.5 rounded-lg bg-purple-500/20 text-purple-300 border border-purple-500/30 text-xs font-black uppercase tracking-wider">{current.type}</span>
          <span className="px-2.5 py-0.5 rounded-lg bg-slate-800 text-slate-400 border border-slate-700 text-xs font-bold">TOPIK II Writing Practice</span>
        </div>
        <h3 className="text-base font-black text-white mb-1">Writing Prompt</h3>
        <p className="text-sm text-slate-200 leading-relaxed">{current.prompt}</p>

        {/* Hint chips */}
        <div className="mt-3 flex flex-wrap gap-1.5">
          {current.hints.map(h => (
            <span key={h} className="px-2.5 py-1 rounded-xl bg-purple-500/10 border border-purple-500/30 text-xs text-purple-300 font-bold">{h}</span>
          ))}
        </div>
      </div>

      {/* Textarea */}
      <div className="relative">
        <textarea
          value={text}
          onChange={e => setText(e.target.value)}
          placeholder="시작하세요... Start writing your essay here in Korean..."
          className="w-full h-64 bg-slate-900 border border-slate-700 focus:border-purple-500 rounded-2xl p-4 text-sm text-white placeholder-slate-500 resize-none focus:outline-none transition-colors"
        />
        <div className="absolute bottom-3 right-4 text-xs text-slate-500 font-mono">
          <span className={charCount < 200 ? 'text-rose-400' : charCount < 300 ? 'text-amber-400' : 'text-emerald-400'}>{charCount}</span> 자
        </div>
      </div>

      {/* Actions */}
      <div className="flex items-center justify-between gap-3">
        <button
          onClick={() => { setPromptIdx(p => p + 1); setText(''); }}
          className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-white text-xs font-black transition-all cursor-pointer"
        >
          Next Prompt →
        </button>
        <p className="text-[10px] text-slate-500 text-center flex-1">
          ⚠️ This is practice feedback only — not an official TOPIK score or assessment.
        </p>
        <button
          onClick={() => setText('')}
          className="px-4 py-2 rounded-xl bg-rose-900/50 hover:bg-rose-800/50 text-rose-300 text-xs font-black transition-all cursor-pointer border border-rose-800/50"
        >
          Clear
        </button>
      </div>
    </div>
  );
};

// ─────────────────────────────────────────────────────────────────────
// LISTENING PRACTICE (inline, lightweight)
// ─────────────────────────────────────────────────────────────────────
const LISTENING_SCRIPTS: Record<string, { title: string; script: string; translation: string; questions: { q: string; options: string[]; correct: number }[] }[]> = {
  BASICS: [
    {
      title: 'Korean Vowel Pronunciation (모음 발음)',
      script: '아 야 어 여 오 요 우 유 으 이',
      translation: 'a, ya, eo, yeo, o, yo, u, yu, eu, i',
      questions: [{ q: 'How many basic vowels does Korean have?', options: ['5', '10', '14', '21'], correct: 1 }],
    },
  ],
  EPS: [
    {
      title: 'Lesson 1: Greetings at Work (직장 인사)',
      script: '안녕하세요! 저는 라젠드라입니다. 처음 뵙겠습니다. 잘 부탁드립니다.',
      translation: 'Hello! I am Rajendra. Nice to meet you for the first time. I look forward to working with you.',
      questions: [
        { q: "What does '잘 부탁드립니다' mean?", options: ['Goodbye', 'Please take care of me / I look forward to working with you', 'Thank you very much', 'See you tomorrow'], correct: 1 },
      ],
    },
  ],
  TOPIK1_L1: [
    {
      title: 'Short Dialogue (짧은 대화)',
      script: '가: 안녕하세요! 이름이 뭐예요? 나: 저는 라메쉬예요. 네팔 사람이에요.',
      translation: 'A: Hello! What is your name? B: I am Ramesh. I am Nepali.',
      questions: [
        { q: "What is the person's nationality?", options: ['Korean', 'Japanese', 'Nepali', 'Indian'], correct: 2 },
      ],
    },
  ],
};

const ListeningPractice: React.FC<{ level: KoreanLevelType }> = ({ level }) => {
  const [revealed, setRevealed] = useState(false);
  const [selected, setSelected] = useState<number | null>(null);
  const [scriptIdx, setScriptIdx] = useState(0);

  const levelKey = level === 'BASICS' ? 'BASICS' : level === 'TOPIK1_L1' ? 'TOPIK1_L1' : 'EPS';
  const scripts = LISTENING_SCRIPTS[levelKey] ?? LISTENING_SCRIPTS['EPS'];
  const current = scripts[scriptIdx % scripts.length];

  function playScript() {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const u = new SpeechSynthesisUtterance(current.script);
      u.lang = 'ko-KR';
      u.rate = 0.8;
      window.speechSynthesis.speak(u);
    }
  }

  return (
    <div className="space-y-4">
      {/* Script card */}
      <div className="bg-gradient-to-r from-slate-900 via-cyan-950/40 to-slate-900 border border-cyan-500/30 rounded-3xl p-5 shadow-xl">
        <div className="flex items-center gap-2 mb-3">
          <Headphones className="w-4 h-4 text-cyan-400" />
          <span className="px-2.5 py-0.5 rounded-lg bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 text-xs font-black uppercase">Listening Exercise</span>
        </div>
        <h3 className="text-base font-black text-white mb-3">{current.title}</h3>

        {/* Play button */}
        <button
          onClick={playScript}
          className="w-full py-3 rounded-2xl bg-gradient-to-r from-cyan-600 to-teal-600 hover:from-cyan-500 hover:to-teal-500 text-white font-black text-sm flex items-center justify-center gap-2 transition-all cursor-pointer mb-3 shadow-lg"
        >
          🔊 Play Audio (Browser TTS)
        </button>

        {/* Script (hidden until revealed) */}
        {revealed ? (
          <div className="bg-slate-950/80 border border-cyan-500/20 rounded-2xl p-4 space-y-2">
            <p className="text-sm font-bold text-white leading-relaxed">{current.script}</p>
            <p className="text-xs text-cyan-300 font-medium">{current.translation}</p>
          </div>
        ) : (
          <button
            onClick={() => setRevealed(true)}
            className="w-full py-2 rounded-xl border border-slate-700 text-slate-400 hover:text-white text-xs font-black transition-all cursor-pointer"
          >
            Reveal Script & Translation
          </button>
        )}
      </div>

      {/* Questions */}
      {current.questions.map((q, qi) => (
        <div key={qi} className="bg-slate-900 border border-slate-800 rounded-2xl p-5 space-y-3">
          <p className="text-sm font-black text-white">Q{qi + 1}. {q.q}</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {q.options.map((opt, oi) => {
              const isSelected = selected === oi;
              const isCorrect = oi === q.correct;
              const showResult = selected !== null;
              return (
                <button
                  key={oi}
                  onClick={() => setSelected(oi)}
                  disabled={selected !== null}
                  className={`p-3 rounded-xl text-xs font-bold text-left transition-all cursor-pointer border ${
                    showResult
                      ? isCorrect
                        ? 'bg-emerald-900/40 border-emerald-500/60 text-emerald-300'
                        : isSelected
                          ? 'bg-rose-900/40 border-rose-500/60 text-rose-300'
                          : 'border-slate-800 text-slate-500'
                      : 'border-slate-700 text-slate-200 hover:border-cyan-500/40 hover:bg-slate-800'
                  }`}
                >
                  {String.fromCharCode(65 + oi)}. {opt}
                </button>
              );
            })}
          </div>
          {selected !== null && (
            <p className={`text-xs font-black ${selected === q.correct ? 'text-emerald-400' : 'text-rose-400'}`}>
              {selected === q.correct ? '✅ Correct!' : `❌ Incorrect. Correct answer: ${q.options[q.correct]}`}
            </p>
          )}
        </div>
      ))}

      <button
        onClick={() => { setScriptIdx(i => i + 1); setRevealed(false); setSelected(null); }}
        className="w-full py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-white text-xs font-black transition-all cursor-pointer"
      >
        Next Exercise →
      </button>
    </div>
  );
};

// ─────────────────────────────────────────────────────────────────────
// READING PRACTICE (inline, lightweight)
// ─────────────────────────────────────────────────────────────────────
const READING_PASSAGES: Record<string, { title: string; passage: string; translation: string; topic: string; questions: { q: string; options: string[]; correct: number }[] }[]> = {
  TOPIK1_L1: [
    {
      title: '나의 하루 (My Day)',
      topic: 'Daily Life',
      passage: '저는 아침 7시에 일어납니다. 씻고 아침을 먹습니다. 그리고 학교에 갑니다. 학교에서 한국어를 공부합니다. 점심은 식당에서 먹습니다. 저녁에 집에 돌아옵니다.',
      translation: 'I wake up at 7 in the morning. I wash up and eat breakfast. Then I go to school. I study Korean at school. I eat lunch at the cafeteria. In the evening I return home.',
      questions: [{ q: 'Where does the person study Korean?', options: ['At home', 'At the library', 'At school', 'At the cafeteria'], correct: 2 }],
    },
  ],
  EPS: [
    {
      title: '직장 생활 (Workplace Life)',
      topic: 'Workplace',
      passage: '저는 한국 공장에서 일합니다. 아침 8시에 출근합니다. 작업복을 입고 안전모를 씁니다. 오후 5시에 퇴근합니다. 일이 힘들지만 월급을 받으면 기쁩니다.',
      translation: 'I work at a factory in Korea. I start work at 8 AM. I wear work clothes and a safety helmet. I finish work at 5 PM. The work is hard, but I am happy when I receive my salary.',
      questions: [{ q: 'When does the person start work?', options: ['7 AM', '8 AM', '9 AM', '5 PM'], correct: 1 }],
    },
  ],
  TOPIK3: [
    {
      title: '한국의 사계절 (Four Seasons of Korea)',
      topic: 'Culture & Nature',
      passage: '한국에는 뚜렷한 사계절이 있습니다. 봄에는 벚꽃이 피고, 여름에는 무덥고 비가 많이 옵니다. 가을에는 단풍이 아름답고, 겨울에는 눈이 내립니다.',
      translation: 'Korea has four distinct seasons. In spring, cherry blossoms bloom. Summers are hot and humid with lots of rain. In autumn, the fall foliage is beautiful, and in winter it snows.',
      questions: [{ q: 'What happens in autumn (가을) in Korea?', options: ['Cherry blossoms bloom', 'Heavy rain', 'Beautiful fall foliage', 'Heavy snow'], correct: 2 }],
    },
  ],
};

const ReadingPractice: React.FC<{ level: KoreanLevelType }> = ({ level }) => {
  const [selected, setSelected] = useState<number | null>(null);
  const [showTranslation, setShowTranslation] = useState(false);

  const levelKey = level === 'BASICS' ? 'TOPIK1_L1' :
    level === 'EPS' || level.startsWith('EPS_') ? 'EPS' :
    level === 'TOPIK1_L1' ? 'TOPIK1_L1' : 'TOPIK3';
  const passages = READING_PASSAGES[levelKey] ?? READING_PASSAGES['EPS'];
  const current = passages[0];

  return (
    <div className="space-y-4">
      {/* Reading Passage Card (White Book Mode) */}
      <div className="bg-white text-slate-900 border border-slate-200/90 rounded-3xl p-6 sm:p-8 shadow-2xl space-y-4 font-sans">
        <div className="flex items-center gap-2 mb-3">
          <BookOpen className="w-4 h-4 text-violet-700" />
          <span className="px-2.5 py-0.5 rounded-lg bg-violet-100 text-violet-900 border border-violet-300 text-xs font-black uppercase">Reading Comprehension</span>
          <span className="px-2 py-0.5 rounded-full bg-slate-100 text-slate-700 border border-slate-300 text-[10px] font-bold">{current.topic}</span>
        </div>
        <h3 className="text-base sm:text-xl font-black text-slate-900 mb-4">{current.title}</h3>

        {/* Passage (White Book Paper Box) */}
        <div className="bg-amber-50/50 border border-amber-200 rounded-2xl p-5 mb-3 shadow-xs">
          <p className="text-base sm:text-lg text-slate-900 leading-relaxed font-black font-kr">{current.passage}</p>
        </div>

        <button
          onClick={() => setShowTranslation(v => !v)}
          className="text-xs text-violet-700 hover:text-violet-800 font-black underline cursor-pointer transition-colors"
        >
          {showTranslation ? 'Hide Translation' : 'Show Translation'}
        </button>
        {showTranslation && (
          <p className="text-xs text-slate-600 mt-2 italic font-sans">{current.translation}</p>
        )}
      </div>

      {/* Questions */}
      {current.questions.map((q, qi) => (
        <div key={qi} className="bg-white text-slate-900 border border-slate-200/90 rounded-2xl p-5 space-y-3 shadow-md font-sans">
          <p className="text-sm font-black text-slate-900">Q{qi + 1}. {q.q}</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {q.options.map((opt, oi) => {
              const isSelected = selected === oi;
              const isCorrect = oi === q.correct;
              const showResult = selected !== null;
              return (
                <button
                  key={oi}
                  onClick={() => setSelected(oi)}
                  disabled={selected !== null}
                  className={`p-3 rounded-xl text-xs font-bold text-left transition-all cursor-pointer border ${
                    showResult
                      ? isCorrect
                        ? 'bg-emerald-600 text-white border-emerald-500 font-black'
                        : isSelected
                          ? 'bg-rose-600 text-white border-rose-500 font-black'
                          : 'border-slate-200 text-slate-400 bg-slate-50'
                      : 'border-slate-200 text-slate-800 bg-slate-50 hover:bg-emerald-50 hover:border-emerald-300'
                  }`}
                >
                  {String.fromCharCode(65 + oi)}. {opt}
                </button>
              );
            })}
          </div>
          {selected !== null && (
            <p className={`text-xs font-black ${selected === q.correct ? 'text-emerald-400' : 'text-rose-400'}`}>
              {selected === q.correct ? '✅ Correct!' : `❌ Incorrect. Correct: ${q.options[q.correct]}`}
            </p>
          )}
        </div>
      ))}
    </div>
  );
};


// ─────────────────────────────────────────────────────────────────────
// MAIN COMPONENT
// ─────────────────────────────────────────────────────────────────────
export const KoreanHubDashboard: React.FC<KoreanHubDashboardProps> = ({
  level = 'BASICS',
  onSelectLevel,
  activeTab: externalActiveTab,
  onTabChange,
}) => {
  const [activeTab, setActiveTab] = useState<KoreanSubTab>(level === 'BASICS' ? 'BASICS_MODULES' : 'VOCABULARY');
  const [selectedModuleId, setSelectedModuleId] = useState<string | undefined>(undefined);
  const [showModuleDropdown, setShowModuleDropdown] = useState<boolean>(false);
  const meta = LEVEL_META[level] ?? LEVEL_META['EPS'];

  // Sync activeTab when level changes or external prop changes
  useEffect(() => {
    if (externalActiveTab) {
      setActiveTab(externalActiveTab);
    } else {
      if (level === 'BASICS') {
        setActiveTab('BASICS_MODULES');
      } else {
        setActiveTab('VOCABULARY');
      }
    }
  }, [level, externalActiveTab]);

  const handleTabClick = (t: KoreanSubTab) => {
    setActiveTab(t);
    if (onTabChange) onTabChange(t);
  };

  const getSubTabs = () => {
    if (level === 'BASICS') {
      return [
        { id: 'BASICS_MODULES' as KoreanSubTab, label: '12 Modules Foundation', icon: Compass, emoji: '🌱' },
        { id: 'BASICS_PROGRESS' as KoreanSubTab, label: 'Progress & Roadmap', icon: Award, emoji: '📊' },
        { id: 'BASICS_TEST' as KoreanSubTab, label: 'Placement Test', icon: Target, emoji: '🎯' },
        { id: 'BASICS_ALPHABET' as KoreanSubTab, label: 'Hangeul Chart', icon: BookOpen, emoji: '🔤' },
        { id: 'GRAMMAR_100' as KoreanSubTab, label: 'Grammar (100)', icon: FileText, emoji: '📘' },
        { id: 'COMMON_300' as KoreanSubTab, label: 'Common Words (300)', icon: BookOpen, emoji: '📚' },
      ];
    }

    const tabs: { id: KoreanSubTab; label: string; icon: typeof BookOpen; emoji: string }[] = [
      { id: 'VOCABULARY', label: level.startsWith('EPS') ? 'Vocabulary' : 'Vocabulary', icon: BookOpen, emoji: '📖' },
      { id: 'GRAMMAR', label: 'Grammar', icon: FileText, emoji: '📝' },
      { id: 'FLASHCARDS', label: 'Flashcards', icon: Layers, emoji: '🃏' },
    ];

    if (meta.hasListening) tabs.push({ id: 'LISTENING', label: 'Listening', icon: Headphones, emoji: '🎧' });
    if (meta.hasReading) tabs.push({ id: 'READING', label: 'Reading', icon: BookOpen, emoji: '📰' });
    if (meta.hasEPSSectors) tabs.push({ id: 'EPS_SECTORS', label: 'Industry Sectors', icon: Factory, emoji: '🏢' });
    if (meta.hasWriting) tabs.push({ id: 'WRITING', label: 'Writing', icon: PenLine, emoji: '✍️' });

    tabs.push(
      { id: 'EXAMS', label: 'Mock Exams', icon: Clock, emoji: '⏱' },
      { id: 'EXAM_GUIDE', label: 'Exam Guide', icon: GraduationCap, emoji: '🎓' },
    );

    return tabs;
  };

  const subTabs = getSubTabs();

  const KOREA_LEVEL_LIST: { id: KoreanLevelType; label: string }[] = [
    { id: 'BASICS',    label: 'Basics' },
    { id: 'TOPIK1_L1', label: 'TOPIK I (Levels 1–2)' },
    { id: 'TOPIK3',    label: 'TOPIK II (Levels 3–6)' },
    { id: 'EPS',       label: 'EPS-TOPIK (1-60)' },
  ];

  const { isCollapsed, toggleCollapse } = useSidebarCollapse();

  return (
    <div className="space-y-2 font-sans w-full max-w-full overflow-x-hidden">

      {/* 🌐 ROW 1: KOREAN CURRICULUM LEVEL BAR (Mobile Responsive Horizontal Scroll) */}
      <div className="flex items-center justify-between gap-2 overflow-x-auto no-scrollbar py-1 bg-white p-2 rounded-2xl border border-slate-200 shadow-xs">
        <div className="flex items-center gap-2">
          {/* Desktop Sidebar Minimize / Expand Toggle Button */}
          <button
            onClick={toggleCollapse}
            title={isCollapsed ? 'Expand Sidebar' : 'Minimize Sidebar'}
            className="hidden lg:flex items-center gap-1.5 px-2.5 py-1 rounded-xl bg-slate-100 text-slate-700 hover:text-slate-900 hover:bg-slate-200 border border-slate-200 text-xs font-bold transition-all cursor-pointer"
          >
            {isCollapsed ? <PanelLeftOpen className="w-3.5 h-3.5 text-blue-600" /> : <PanelLeftClose className="w-3.5 h-3.5 text-blue-600" />}
            <span>{isCollapsed ? 'Expand Sidebar' : 'Minimize Sidebar'}</span>
          </button>

          <div className="flex items-center gap-1.5 text-xs font-black uppercase tracking-wider text-slate-500 whitespace-nowrap pl-1 pr-2">
            <Globe className="w-3.5 h-3.5 text-blue-600" />
            <span>Curriculum Level:</span>
          </div>
        </div>

        <div className="flex items-center gap-1.5 flex-nowrap">
          {KOREA_LEVEL_LIST.map((lvl) => {
            const isSelected = level === lvl.id;
            return (
              <button
                key={lvl.id}
                onClick={() => {
                  if (onSelectLevel) onSelectLevel(lvl.id);
                }}
                className={`px-3 py-1 rounded-xl text-xs font-extrabold transition-all cursor-pointer whitespace-nowrap border ${
                  isSelected
                    ? 'bg-blue-600 text-white shadow-xs border-blue-500'
                    : 'bg-slate-100 text-slate-700 hover:text-slate-900 hover:bg-slate-200 border-slate-200'
                }`}
              >
                {lvl.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* 📖 ROW 2: OPTIONS SUB-MENU BAR (Tailored to selected Korean level) */}
      <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar py-1 bg-white p-1.5 rounded-2xl border border-slate-200 shadow-xs">

        {subTabs.map(tab => {
          const isActive = activeTab === tab.id;

          if (tab.id === 'BASICS_MODULES') {
            return (
              <div key={tab.id} className="relative shrink-0">
                <button
                  onClick={() => {
                    setActiveTab('BASICS_MODULES');
                    setShowModuleDropdown(!showModuleDropdown);
                  }}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-extrabold transition-all cursor-pointer ${
                    isActive
                      ? `bg-gradient-to-r ${meta.color} text-white shadow-glow`
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                  }`}
                >
                  <span>{tab.emoji}</span>
                  <span>{tab.label}</span>
                  <ChevronDown className={`w-3.5 h-3.5 text-slate-400 transition-transform duration-200 ${showModuleDropdown ? 'rotate-180' : ''}`} />
                </button>

                {/* Click Dropdown Card for 12 Modules Quick Jump */}
                {showModuleDropdown && (
                  <>
                    <div className="fixed inset-0 z-[90]" onClick={() => setShowModuleDropdown(false)} />
                    <div className="absolute top-full left-0 mt-2 w-80 bg-white border border-slate-200 rounded-2xl p-2.5 shadow-2xl z-[100] space-y-1 max-h-[75vh] overflow-y-auto scrollbar-thin text-slate-900">
                      <div className="px-2 py-1 text-[10px] font-black uppercase tracking-wider text-emerald-600 border-b border-slate-100 mb-1 flex items-center justify-between">
                        <span>Korean Basics Modules (12)</span>
                        <span>Quick Jump</span>
                      </div>

                      {KOREAN_BASICS_MODULES.map((m) => (
                        <button
                          key={m.id}
                          onClick={() => {
                            setSelectedModuleId(m.id);
                            setActiveTab('BASICS_MODULES');
                            setShowModuleDropdown(false);
                          }}
                          className="w-full text-left p-2 rounded-xl hover:bg-emerald-50 border border-transparent transition-all flex items-center justify-between group/item cursor-pointer"
                        >
                          <div className="flex items-center gap-2 min-w-0">
                            <span className="text-base">{m.emoji}</span>
                            <div className="truncate">
                              <div className="text-xs font-bold text-slate-900 group-hover/item:text-emerald-700 truncate">
                                Mod {m.moduleNumber}: {m.title}
                              </div>
                              <div className="text-[10px] text-slate-500 truncate">{m.lessons.length} Lessons • {m.badgeName}</div>
                            </div>
                          </div>
                          <ChevronRight className="w-3.5 h-3.5 text-slate-400 group-hover/item:text-emerald-600 shrink-0" />
                        </button>
                      ))}
                    </div>
                  </>
                )}
              </div>
            );
          }

          return (
            <button
              key={tab.id}
              onClick={() => handleTabClick(tab.id)}
              className={`flex items-center gap-1.5 px-3 py-1 rounded-xl text-xs font-extrabold whitespace-nowrap transition-all shrink-0 cursor-pointer ${
                isActive
                  ? 'bg-blue-600 text-white shadow-xs border border-blue-500'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100 border border-transparent'
              }`}
            >
              <span>{tab.emoji}</span>
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* Active Content Body */}
      <div className="pt-1">
        {activeTab === 'BASICS_MODULES' && (
          <KoreanBasicsModuleSystem
            initialModuleId={selectedModuleId}
            initialViewMode="LESSON_READER"
            onSelectExamBridge={(path) => {
              if (onSelectLevel) {
                onSelectLevel(path === 'TOPIK1' ? 'TOPIK1_L1' : 'EPS');
              }
            }}
          />
        )}

        {activeTab === 'BASICS_PROGRESS' && (
          <KoreanBasicsModuleSystem
            initialViewMode="ROADMAP"
            onSelectExamBridge={(path) => {
              if (onSelectLevel) {
                onSelectLevel(path === 'TOPIK1' ? 'TOPIK1_L1' : 'EPS');
              }
            }}
          />
        )}

        {activeTab === 'BASICS_TEST' && (
          <KoreanBasicsModuleSystem
            initialViewMode="PLACEMENT_TEST"
            onSelectExamBridge={(path) => {
              if (onSelectLevel) {
                onSelectLevel(path === 'TOPIK1' ? 'TOPIK1_L1' : 'EPS');
              }
            }}
          />
        )}

        {activeTab === 'BASICS_ALPHABET' && (
          <KoreanBasicsModuleSystem
            initialViewMode="HANGEUL_MATRIX"
            onSelectExamBridge={(path) => {
              if (onSelectLevel) {
                onSelectLevel(path === 'TOPIK1' ? 'TOPIK1_L1' : 'EPS');
              }
            }}
          />
        )}

        {activeTab === 'VOCABULARY' && (
          <KoreanVocabularyExplorer preselectedLevel={toVocabLevel(level)} />
        )}

        {activeTab === 'GRAMMAR_100' && (
          <KoreanGrammarExplorer level={level} />
        )}

        {activeTab === 'COMMON_300' && (
          <Korean300CommonWordsExplorer />
        )}

        {activeTab === 'GRAMMAR' && <KoreanGrammarExplorer level={level} />}

        {activeTab === 'FLASHCARDS' && (
          <KoreanFlashcardCard currentLevel={toVocabLevel(level)} hideLevelSelector={true} />
        )}

        {activeTab === 'LISTENING' && <ListeningPractice level={level} />}

        {activeTab === 'READING' && <ReadingPractice level={level} />}

        {activeTab === 'WRITING' && <WritingPractice level={level} />}

        {activeTab === 'EPS_SECTORS' && (
          <EPSSectorHub initialSector={level.startsWith('EPS_') ? level as KoreanVocabLevel : undefined} />
        )}

        {activeTab === 'EXAMS' && (
          <TimedExamEngine
            activeLanguage="KOREAN"
            preselectedLevel={level === 'BASICS' ? 'EPS' : level}
            hideLevelSelector={true}
            hideCategorySelector={true}
          />
        )}

        {activeTab === 'EXAM_GUIDE' && (
          <LevelExamSyllabusGuide
            level={level === 'BASICS' ? 'EPS' : level}
            onSelectTab={(t) => setActiveTab(t as KoreanSubTab)}
          />
        )}
      </div>
    </div>
  );
};
