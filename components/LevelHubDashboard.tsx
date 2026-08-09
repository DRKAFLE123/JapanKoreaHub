import React, { useState, useEffect } from 'react';
import { Sparkles, BookOpen, Layers, Headphones, Clock, Target, Award, Calendar, Flame, CheckCircle2, ChevronRight, Zap, ArrowLeft, FileText, Globe, Maximize2, Minimize2 } from 'lucide-react';
import { LevelPassTricks } from './LevelPassTricks';
import { LevelStudyPlanModal } from './LevelStudyPlanModal';
import { VocabularyExplorer } from './VocabularyExplorer';
import { KanjiCard } from './KanjiCard';
import { AlphabetGrid } from './AlphabetGrid';
import { TimedExamEngine } from './TimedExamEngine';
import { RadicalBreakdown } from './RadicalBreakdown';
import { LevelExamSyllabusGuide } from './LevelExamSyllabusGuide';
import { JFTGrammarExplorer } from './JFTGrammarExplorer';

import { useSidebarCollapse } from './layout/MainLayoutWrapper';
import { PanelLeftClose, PanelLeftOpen } from 'lucide-react';

export type LevelType = 'BASICS' | 'N5' | 'N4' | 'N3' | 'N2' | 'N1' | 'JFT' | 'KANJI_1000';
export type LevelSubTab = 'KANA_MATRIX' | 'BASICS_VOCAB' | 'RADICALS' | 'VOCABULARY' | 'GRAMMAR' | 'FLASHCARDS' | 'LISTENING' | 'EXAMS' | 'EXAM_GUIDE';

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
        setActiveTab('EXAMS');
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
        { id: 'LISTENING', label: 'Listening Practice', icon: Headphones, emoji: '🎧' },
        { id: 'EXAMS', label: 'Mock Tests', icon: Clock, emoji: '⏱' },
        { id: 'EXAM_GUIDE', label: 'Exam & Syllabus Guide', icon: FileText, emoji: '🎓' },
      ];
    }
    if (currentLevel === 'N4' || currentLevel === 'N3' || currentLevel === 'N2' || currentLevel === 'N1') {
      return [
        { id: 'VOCABULARY', label: `Vocabulary Explorer (${currentLevel})`, icon: BookOpen, emoji: '📚' },
        { id: 'FLASHCARDS', label: 'Kanji Flashcards', icon: Layers, emoji: '🃏' },
        { id: 'LISTENING', label: 'Listening Practice', icon: Headphones, emoji: '🎧' },
        { id: 'EXAMS', label: 'Mock Tests', icon: Clock, emoji: '⏱' },
        { id: 'EXAM_GUIDE', label: 'Exam & Syllabus Guide', icon: FileText, emoji: '🎓' },
      ];
    }
    if (currentLevel === 'JFT') {
      return [
        { id: 'EXAMS', label: 'CBT Exam Engine', icon: Clock, emoji: '⏱' },
        { id: 'EXAM_GUIDE', label: 'Exam & Syllabus Guide', icon: FileText, emoji: '🎓' },
        { id: 'VOCABULARY', label: 'JFT Meanings (Lessons 1-50)', icon: BookOpen, emoji: '📖' },
        { id: 'GRAMMAR', label: 'JFT Grammar (Lessons 1-50)', icon: FileText, emoji: '📝' },
        { id: 'FLASHCARDS', label: 'Kanji Flashcards', icon: Layers, emoji: '🃏' },
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
      { id: 'EXAMS', label: 'Mock Tests', icon: Clock, emoji: '⏱' },
      { id: 'EXAM_GUIDE', label: 'Exam & Syllabus Guide', icon: FileText, emoji: '🎓' },
    ];
  };

  return (
    <div className={`space-y-2 animate-fade-in font-sans ${isFocusMode ? 'fixed inset-0 z-[100] bg-slate-50 dark:bg-slate-950 p-2 sm:p-5 overflow-y-auto' : ''}`}>
      
      {/* 🌐 ROW 1: CURRICULUM LEVEL BAR + FOCUS MODE TOGGLE */}
      <div className="flex items-center justify-between gap-2 overflow-x-auto no-scrollbar py-1 bg-white dark:bg-slate-900 p-2 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs">
        <div className="flex items-center gap-1.5 text-xs font-black uppercase tracking-wider text-slate-500 whitespace-nowrap pl-1 pr-1">
          <Globe className="w-3.5 h-3.5 text-red-600" />
          <span>Course:</span>
        </div>

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

          {/* ⛶ FOCUS MODE TOGGLE BUTTON */}
          <button
            onClick={() => setIsFocusMode(!isFocusMode)}
            className={`ml-1 px-3 py-1 rounded-xl text-xs font-extrabold transition-all flex items-center gap-1.5 cursor-pointer whitespace-nowrap border ${
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

      {/* 📖 ROW 2: OPTIONS SUB-MENU BAR (Tailored to selected level) */}
      {currentLevel !== 'BASICS' && currentLevel !== 'KANJI_1000' && (
        <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar py-1 bg-white dark:bg-slate-900 p-1.5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs">
          {getSubTabs().map((tab) => {
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => handleTabClick(tab.id as LevelSubTab)}
                className={`px-3 py-1.5 rounded-xl text-xs font-extrabold transition-all flex items-center gap-1.5 cursor-pointer whitespace-nowrap ${
                  isActive
                    ? 'bg-red-600 text-white shadow-xs border border-red-500 font-black'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 hover:bg-slate-100 dark:hover:bg-slate-800 border border-transparent font-bold'
                }`}
              >
                <span>{tab.emoji}</span>
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>
      )}

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
              <KanjiCard />
            )}

            {activeTab === 'LISTENING' && (
              <AlphabetGrid activeLanguage="JAPANESE" />
            )}

            {activeTab === 'EXAMS' && (
              <TimedExamEngine />
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
