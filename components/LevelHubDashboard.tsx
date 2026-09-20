import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { Sparkles, BookOpen, Layers, Headphones, Clock, Target, Award, Calendar, Flame, CheckCircle2, ChevronRight, ChevronDown, Zap, ArrowLeft, ArrowRight, FileText, Globe, Maximize2, Minimize2 } from 'lucide-react';
import { LevelPassTricks } from './LevelPassTricks';
import { LevelStudyPlanModal } from './LevelStudyPlanModal';
import { VocabularyExplorer } from './VocabularyExplorer';
import { KanjiCard } from './KanjiCard';
import { AlphabetGrid } from './AlphabetGrid';
import { RadicalBreakdown } from './RadicalBreakdown';
import { LevelExamSyllabusGuide } from './LevelExamSyllabusGuide';
import { JFTGrammarExplorer } from './JFTGrammarExplorer';
import { TimedExamEngine } from './TimedExamEngine';

import { useSidebarCollapse } from './layout/MainLayoutWrapper';
import { PanelLeftClose, PanelLeftOpen } from 'lucide-react';

export type LevelType = 'BASICS' | 'N5' | 'N4' | 'N3' | 'N2' | 'N1' | 'JFT' | 'KANJI_1000';
export type LevelSubTab = 'KANA_MATRIX' | 'BASICS_VOCAB' | 'RADICALS' | 'VOCABULARY' | 'GRAMMAR' | 'FLASHCARDS' | 'LISTENING' | 'EXAMS' | 'EXAM_GUIDE' | 'SECTION_PRACTICE';

interface LevelHubDashboardProps {
  level: LevelType;
  onSelectLevel?: (level: LevelType) => void;
  onBackToPortal?: () => void;
  activeTab?: LevelSubTab;
  onTabChange?: (tab: LevelSubTab) => void;
}

const JAPAN_LEVEL_LIST: { id: LevelType; label: string }[] = [
  { id: 'BASICS',     label: 'Basics' },
  { id: 'N5',         label: 'N5' },
  { id: 'N4',         label: 'N4' },
  { id: 'N3',         label: 'N3' },
  { id: 'N2',         label: 'N2' },
  { id: 'N1',         label: 'N1' },
  { id: 'JFT',        label: 'JFT' },
  { id: 'KANJI_1000', label: 'Kanji (1000)' },
];

export const LevelHubDashboard: React.FC<LevelHubDashboardProps> = ({
  level: propLevel,
  onSelectLevel,
  onBackToPortal,
  activeTab: externalActiveTab,
  onTabChange,
}) => {
  const [currentLevel, setCurrentLevel] = useState<LevelType>(propLevel);
  const [activeTabState, setActiveTabState] = useState<LevelSubTab>(externalActiveTab || 'VOCABULARY');
  const [isFocusMode, setIsFocusMode] = useState<boolean>(false);
  const [activeTab, setActiveTab] = useState<LevelSubTab>('VOCABULARY');
  const { isCollapsed, toggleCollapse } = useSidebarCollapse();

  const row1Ref = useRef<HTMLDivElement | null>(null);
  const row2Ref = useRef<HTMLDivElement | null>(null);

  const scrollRowRight = (ref: React.RefObject<HTMLDivElement | null>) => {
    if (ref.current) {
      ref.current.scrollBy({ left: 180, behavior: 'smooth' });
    }
  };

  useEffect(() => {
    setCurrentLevel(propLevel);
  }, [propLevel]);

  // Sync sub tab when level changes or external tab prop changes
  useEffect(() => {
    if (externalActiveTab) {
      setActiveTab(externalActiveTab);
    } else {
      if (currentLevel === 'BASICS') {
        setActiveTab('BASICS_VOCAB');
      } else if (currentLevel === 'JFT') {
        setActiveTab('VOCABULARY');
      } else {
        setActiveTab('VOCABULARY');
      }
    }
  }, [currentLevel, externalActiveTab]);

  const handleLevelSwitch = (lvl: LevelType) => {
    setCurrentLevel(lvl);
    if (onSelectLevel) onSelectLevel(lvl);
  };

  const handleTabClick = (t: LevelSubTab) => {
    setActiveTab(t);
    if (onTabChange) onTabChange(t);
  };

  const [practiceSection, setPracticeSection] = useState<'LISTENING' | 'READING' | 'VOCABULARY' | 'GRAMMAR'>('LISTENING');
  const [practiceDropdownOpen, setPracticeDropdownOpen] = useState(false);
  const practiceDropdownRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (practiceDropdownRef.current && !practiceDropdownRef.current.contains(e.target as Node)) {
        setPracticeDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const getJapanesePracticeSections = (lvl: LevelType) => {
    if (lvl === 'JFT') {
      return [
        { id: 'LISTENING' as const, title: 'Listening Comprehension', sub: '聴解 (Dialogue & Audio Tasks)', icon: '🎧' },
        { id: 'READING' as const, title: 'Reading Comprehension', sub: '読解 (Passages, Signs & Menus)', icon: '📖' },
        { id: 'VOCABULARY' as const, title: 'Script & Vocabulary', sub: '文字と語彙 (Kanji & Practical Words)', icon: '🔤' },
        { id: 'GRAMMAR' as const, title: 'Conversation & Expression', sub: '会話と表現 (Grammar & Phrases)', icon: '💬' },
      ];
    }
    return [
      { id: 'LISTENING' as const, title: 'Listening Practice', sub: '聴解 (Chōkai - Audio & Dialogues)', icon: '🎧' },
      { id: 'READING' as const, title: 'Reading Practice', sub: '読解 (Dokkai - Passages & Comprehension)', icon: '📖' },
      { id: 'VOCABULARY' as const, title: 'Vocabulary & Kanji', sub: '文字・語彙 (Kanji Readings & Meaning)', icon: '🔤' },
      { id: 'GRAMMAR' as const, title: 'Grammar Practice', sub: '文法 (Bunpō - Sentence Star & Star)', icon: '📝' },
    ];
  };

  // Dynamic Sub Tabs tailored strictly to current selected level
  const getSubTabs = () => {
    if (currentLevel === 'BASICS') {
      return [
        { id: 'BASICS_VOCAB', label: 'Kana Fonts & Vowels', icon: BookOpen, emoji: 'あ' },
        { id: 'RADICALS', label: 'Kanji Radicals', icon: Layers, emoji: '🧩' },
      ];
    }
    if (currentLevel === 'N5') {
      return [
        { id: 'VOCABULARY', label: 'Vocabulary Explorer', icon: BookOpen, emoji: '📚' },
        { id: 'FLASHCARDS', label: 'Kanji Flashcards', icon: Layers, emoji: '🃏' },
        { id: 'SECTION_PRACTICE', label: 'Practice', icon: Target, emoji: '🎯', isPracticeDropdown: true },
        { id: 'EXAM_GUIDE', label: 'Exam & Syllabus Guide', icon: FileText, emoji: '🎓' },
      ];
    }
    if (currentLevel === 'N4' || currentLevel === 'N3' || currentLevel === 'N2' || currentLevel === 'N1') {
      return [
        { id: 'VOCABULARY', label: `Vocabulary Explorer (${currentLevel})`, icon: BookOpen, emoji: '📚' },
        { id: 'FLASHCARDS', label: 'Kanji Flashcards', icon: Layers, emoji: '🃏' },
        { id: 'SECTION_PRACTICE', label: 'Practice', icon: Target, emoji: '🎯', isPracticeDropdown: true },
        { id: 'EXAM_GUIDE', label: 'Exam & Syllabus Guide', icon: FileText, emoji: '🎓' },
      ];
    }
    if (currentLevel === 'JFT') {
      return [
        { id: 'VOCABULARY', label: 'JFT Meanings (Lessons 1-50)', icon: BookOpen, emoji: '📖' },
        { id: 'GRAMMAR', label: 'JFT Grammar (Lessons 1-50)', icon: FileText, emoji: '📝' },
        { id: 'FLASHCARDS', label: 'Kanji Flashcards', icon: Layers, emoji: '🃏' },
        { id: 'SECTION_PRACTICE', label: 'Practice', icon: Target, emoji: '🎯', isPracticeDropdown: true },
        { id: 'EXAM_GUIDE', label: 'Exam & Syllabus Guide', icon: FileText, emoji: '🎓' },
      ];
    }
    if (currentLevel === 'KANJI_1000') {
      return [
        { id: 'FLASHCARDS', label: '1,000 Kanji Cards', icon: Layers, emoji: '💮' },
        { id: 'RADICALS', label: '214 Kanji Radicals', icon: Layers, emoji: '🧩' },
        { id: 'VOCABULARY', label: 'Kanji Vocabulary Explorer', icon: BookOpen, emoji: '📚' },
      ];
    }
    return [
      { id: 'VOCABULARY', label: 'Vocabulary Explorer', icon: BookOpen, emoji: '📚' },
      { id: 'FLASHCARDS', label: 'Kanji Flashcards', icon: Layers, emoji: '🃏' },
      { id: 'EXAM_GUIDE', label: 'Exam & Syllabus Guide', icon: FileText, emoji: '🎓' },
    ];
  };

  return (
    <div className={`space-y-2 animate-fade-in font-sans ${isFocusMode ? 'fixed inset-0 z-[100] bg-slate-50 dark:bg-slate-950 p-2 sm:p-5 overflow-y-auto' : ''}`}>
      
      {/* 🌐 UNIFIED LEVEL & SUB-MENU NAVIGATION CARD */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-2 space-y-1.5 shadow-xs">
        {/* ROW 1: Level Switcher (Course Label on Left, Level Pills Aligned to Right like Mock Test) */}
        <div className="flex items-center justify-between gap-2 overflow-x-auto no-scrollbar touch-pan-x py-1 w-full">
          {/* Left: Course Label */}
          <div className="flex items-center gap-1.5 text-xs font-black uppercase tracking-wider text-slate-500 whitespace-nowrap pl-1 pr-2 shrink-0">
            <Globe className="w-3.5 h-3.5 text-red-600" />
            <span>Course:</span>
          </div>

          {/* Right: Level Switcher Pills & Focus Action */}
          <div className="flex items-center gap-1.5 flex-nowrap">
            {JAPAN_LEVEL_LIST.map((lvl) => {
              const isSelected = currentLevel === lvl.id;
              return (
                <button
                  key={lvl.id}
                  onClick={() => handleLevelSwitch(lvl.id)}
                  className={`px-2.5 py-1 rounded-xl text-xs font-extrabold transition-all cursor-pointer whitespace-nowrap border ${
                    isSelected
                      ? 'bg-red-600 text-white shadow-xs border-red-500 font-black'
                      : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:text-slate-900 hover:bg-slate-200 border-slate-200 dark:border-slate-700 font-bold'
                  }`}
                >
                  {lvl.label}
                </button>
              );
            })}

            {/* 🛠️ Study SSW Skill Quick Jump to Study Portal */}
            <Link
              href="/japan/work"
              className="px-2.5 py-1 rounded-xl text-xs font-extrabold transition-all cursor-pointer whitespace-nowrap border bg-indigo-50 dark:bg-indigo-950/60 text-indigo-700 dark:text-indigo-300 hover:bg-indigo-100 dark:hover:bg-indigo-900/60 border-indigo-200 dark:border-indigo-800 flex items-center gap-1 shadow-xs"
              title="Open Official SSW Skills Study Portal & Sector Curriculum"
            >
              <span>🛠️ Study SSW Skill</span>
            </Link>

            {/* ⛶ FOCUS MODE TOGGLE BUTTON */}
            <button
              onClick={() => setIsFocusMode(!isFocusMode)}
              className={`px-3 py-1 rounded-xl text-xs font-extrabold transition-all flex items-center gap-1.5 cursor-pointer whitespace-nowrap border ${
                isFocusMode
                  ? 'bg-red-600 text-white border-red-500 shadow-md font-black animate-pulse'
                  : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 border-slate-200 dark:border-slate-700 font-bold'
              }`}
              title={isFocusMode ? "Exit Fullscreen Focus Mode" : "Enter Distraction-Free Fullscreen Focus Mode"}
            >
              {isFocusMode ? <Minimize2 className="w-3.5 h-3.5" /> : <Maximize2 className="w-3.5 h-3.5" />}
              <span>{isFocusMode ? 'Exit Focus' : 'Focus'}</span>
            </button>
          </div>
        </div>

        {/* ROW 2: Sub-Menu Options (Micro-Pill Navigation - Centered & Clean) */}
        {currentLevel !== 'BASICS' && currentLevel !== 'KANJI_1000' && (
          <div className="pt-1.5 border-t border-slate-100 dark:border-slate-800/80 flex items-center justify-start sm:justify-center gap-1.5 overflow-x-auto no-scrollbar touch-pan-x py-0.5">
            {getSubTabs().map((tab) => {
              const isActive = activeTab === tab.id;

              if ((tab as any).isPracticeDropdown) {
                return (
                  <div
                    key={tab.id}
                    ref={practiceDropdownRef}
                    className="relative shrink-0"
                    onMouseEnter={() => setPracticeDropdownOpen(true)}
                    onMouseLeave={() => setPracticeDropdownOpen(false)}
                  >
                    <button
                      type="button"
                      onClick={() => setPracticeDropdownOpen(!practiceDropdownOpen)}
                      className={`px-3 py-1 rounded-lg text-xs font-extrabold transition-all flex items-center gap-1.5 cursor-pointer whitespace-nowrap shrink-0 ${
                        activeTab === 'SECTION_PRACTICE' || activeTab === 'LISTENING'
                          ? 'bg-red-600 text-white shadow-xs border border-red-500 font-black'
                          : 'bg-slate-50 dark:bg-slate-800/50 text-slate-600 dark:text-slate-400 hover:text-slate-900 hover:bg-slate-100 dark:hover:bg-slate-800 border border-slate-200/60 dark:border-slate-700/60 font-bold'
                      }`}
                    >
                      <span className="text-[11px]">{tab.emoji}</span>
                      <span>{tab.label}</span>
                      <ChevronDown className={`w-3 h-3 transition-transform duration-200 ${practiceDropdownOpen ? 'rotate-180' : ''}`} />
                    </button>

                    {/* Dropdown Menu of Official Sections */}
                    {practiceDropdownOpen && (
                      <div className="absolute top-full left-1/2 -translate-x-1/2 sm:left-0 sm:translate-x-0 mt-1 w-64 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-xl p-1.5 z-50 animate-fade-in space-y-0.5">
                        <div className="px-2.5 py-1 text-[10px] font-black uppercase tracking-wider text-slate-400 border-b border-slate-100 dark:border-slate-800">
                          {currentLevel} Official Exam Sections
                        </div>
                        {getJapanesePracticeSections(currentLevel).map((sec) => (
                          <button
                            key={sec.id}
                            type="button"
                            onClick={() => {
                              setPracticeSection(sec.id);
                              setActiveTab('SECTION_PRACTICE');
                              setPracticeDropdownOpen(false);
                              if (onTabChange) onTabChange('SECTION_PRACTICE');
                            }}
                            className={`w-full px-2.5 py-2 rounded-xl text-xs font-bold text-left flex items-center justify-between transition-colors cursor-pointer ${
                              activeTab === 'SECTION_PRACTICE' && practiceSection === sec.id
                                ? 'bg-red-50 text-red-700 dark:bg-red-950/50 dark:text-red-300 font-black'
                                : 'text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
                            }`}
                          >
                            <div className="flex items-center gap-2">
                              <span className="text-sm">{sec.icon}</span>
                              <div>
                                <p className="leading-tight">{sec.title}</p>
                                <p className="text-[10px] text-slate-400 dark:text-slate-500 font-medium">{sec.sub}</p>
                              </div>
                            </div>
                            <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                );
              }

              return (
                <button
                  key={tab.id}
                  onClick={() => handleTabClick(tab.id as LevelSubTab)}
                  className={`px-3 py-1 rounded-lg text-xs font-extrabold transition-all flex items-center gap-1.5 cursor-pointer whitespace-nowrap shrink-0 ${
                    isActive
                      ? 'bg-red-600 text-white shadow-xs border border-red-500 font-black'
                      : 'bg-slate-50 dark:bg-slate-800/50 text-slate-600 dark:text-slate-400 hover:text-slate-900 hover:bg-slate-100 dark:hover:bg-slate-800 border border-slate-200/60 dark:border-slate-700/60 font-bold'
                  }`}
                >
                  <span className="text-[11px]">{tab.emoji}</span>
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>
        )}
      </div>

      {/* Active Level Content Body */}
      <div className="pt-1">
        {currentLevel === 'BASICS' ? (
          <VocabularyExplorer preselectedLevel="BASICS" />
        ) : currentLevel === 'KANJI_1000' ? (
          <VocabularyExplorer preselectedLevel="KANJI_1000" />
        ) : (
          <>
            {activeTab === 'VOCABULARY' && (
              <VocabularyExplorer preselectedLevel={currentLevel} />
            )}

            {activeTab === 'GRAMMAR' && (
              <JFTGrammarExplorer />
            )}

            {activeTab === 'FLASHCARDS' && (
              <KanjiCard currentLevel={currentLevel} />
            )}

            {(activeTab === 'SECTION_PRACTICE' || activeTab === 'LISTENING') && (
              <div className="space-y-3">
                {/* Section Practice Header & Section Quick Switcher */}
                <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-3.5 shadow-xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="px-2.5 py-0.5 rounded-lg bg-red-100 dark:bg-red-950/60 text-red-800 dark:text-red-300 text-[10px] font-black uppercase tracking-wider">
                        {currentLevel} Section Practice
                      </span>
                      <span className="text-[11px] font-bold text-slate-500">
                        Official Exam Format • Self-Paced Focused Drill
                      </span>
                    </div>
                    <h3 className="text-sm sm:text-base font-black text-slate-900 dark:text-white mt-1">
                      {practiceSection === 'LISTENING' && '🎧 聴解 (Listening Comprehension) Practice'}
                      {practiceSection === 'READING' && '📖 読解 (Reading Comprehension) Practice'}
                      {practiceSection === 'VOCABULARY' && '🔤 文字・語彙 (Vocabulary & Kanji) Practice'}
                      {practiceSection === 'GRAMMAR' && (currentLevel === 'JFT' ? '💬 会話と表現 (Conversation & Expression)' : '📝 文法 (Grammar & Sentence Star) Practice')}
                    </h3>
                  </div>

                  {/* Quick Section Switcher */}
                  <div className="flex items-center gap-1.5 flex-wrap">
                    {getJapanesePracticeSections(currentLevel).map((sec) => (
                      <button
                        key={sec.id}
                        type="button"
                        onClick={() => {
                          setPracticeSection(sec.id);
                          setActiveTab('SECTION_PRACTICE');
                        }}
                        className={`px-3 py-1.5 rounded-xl text-xs font-black transition-all cursor-pointer flex items-center gap-1.5 border ${
                          practiceSection === sec.id
                            ? 'bg-red-600 text-white border-red-500 shadow-xs'
                            : 'bg-slate-50 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 border-slate-200 dark:border-slate-700'
                        }`}
                      >
                        <span>{sec.icon}</span>
                        <span>{sec.title.split(' ')[0]}</span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Dedicated Practice Engine */}
                <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-3 sm:p-5 shadow-xs">
                  <TimedExamEngine
                    initialLanguage="JAPANESE"
                    preselectedLevel={currentLevel === 'JFT' ? 'JFT' : currentLevel}
                    selectedSections={[practiceSection]}
                    examMode="PARTIAL"
                    autoStart={true}
                  />
                </div>
              </div>
            )}

            {activeTab === 'EXAMS' && (
              <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 sm:p-8 text-center space-y-4 max-w-2xl mx-auto my-6 shadow-xs">
                <div className="w-14 h-14 rounded-2xl bg-red-50 text-red-600 text-2xl flex items-center justify-center mx-auto border border-red-200">
                  ⏱️
                </div>
                <div className="space-y-1">
                  <h3 className="text-lg font-black text-slate-900 dark:text-white">
                    Official Timed Mock Exams are in the Mock Test Section
                  </h3>
                  <p className="text-xs text-slate-600 dark:text-slate-400 max-w-md mx-auto leading-relaxed">
                    Learn section is dedicated strictly to study &amp; reading. Launch full-length timed paper &amp; CBT mock tests with official timers, answer keys, and score tracking in the Mock Test section.
                  </p>
                </div>
                <Link
                  href="/japan/exams"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-red-600 hover:bg-red-500 text-white font-black text-xs transition-all shadow-sm cursor-pointer"
                >
                  <span>Go to Japan Mock Test Section</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            )}

            {activeTab === 'EXAM_GUIDE' && (
              <LevelExamSyllabusGuide level={currentLevel} />
            )}

            {activeTab === 'RADICALS' && (
              <RadicalBreakdown />
            )}
          </>
        )}
      </div>
    </div>
  );
};
