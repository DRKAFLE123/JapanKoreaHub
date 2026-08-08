import React, { useState, useEffect } from 'react';
import { Sparkles, BookOpen, Layers, Headphones, Clock, Target, Award, Calendar, Flame, CheckCircle2, ChevronRight, Zap, ArrowLeft, FileText, Globe } from 'lucide-react';
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
  { id: 'N5',         label: 'JLPT N5' },
  { id: 'N4',         label: 'JLPT N4' },
  { id: 'N3',         label: 'JLPT N3' },
  { id: 'N2',         label: 'JLPT N2' },
  { id: 'N1',         label: 'JLPT N1' },
  { id: 'JFT',        label: 'JFT-Basic' },
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
    <div className="space-y-2 animate-fade-in font-sans">
      
      {/* 🌐 ROW 1: CURRICULUM LEVEL BAR (Mobile Responsive Horizontal Scroll) */}
      <div className="flex items-center justify-between gap-2 overflow-x-auto no-scrollbar py-1 bg-white p-2 rounded-2xl border border-slate-200 shadow-xs">
        <div className="flex items-center gap-2">
          {/* Desktop Sidebar Minimize / Expand Toggle Button */}
          <button
            onClick={toggleCollapse}
            title={isCollapsed ? 'Expand Sidebar' : 'Minimize Sidebar'}
            className="hidden lg:flex items-center gap-1.5 px-2.5 py-1 rounded-xl bg-slate-100 text-slate-700 hover:text-slate-900 hover:bg-slate-200 border border-slate-200 text-xs font-bold transition-all cursor-pointer"
          >
            {isCollapsed ? <PanelLeftOpen className="w-3.5 h-3.5 text-red-600" /> : <PanelLeftClose className="w-3.5 h-3.5 text-red-600" />}
            <span>{isCollapsed ? 'Expand Sidebar' : 'Minimize Sidebar'}</span>
          </button>

          <div className="flex items-center gap-1.5 text-xs font-black uppercase tracking-wider text-slate-500 whitespace-nowrap pl-1 pr-2">
            <Globe className="w-3.5 h-3.5 text-red-600" />
            <span>Curriculum Level:</span>
          </div>
        </div>

        <div className="flex items-center gap-1.5 flex-nowrap">
          {JAPAN_LEVEL_LIST.map((lvl) => {
            const isSelected = currentLevel === lvl.id;
            return (
              <button
                key={lvl.id}
                onClick={() => handleLevelSwitch(lvl.id)}
                className={`px-3 py-1 rounded-xl text-xs font-extrabold transition-all cursor-pointer whitespace-nowrap border ${
                  isSelected
                    ? 'bg-red-600 text-white shadow-xs border-red-500'
                    : 'bg-slate-100 text-slate-700 hover:text-slate-900 hover:bg-slate-200 border-slate-200'
                }`}
              >
                {lvl.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* 📖 ROW 2: OPTIONS SUB-MENU BAR (Tailored to selected level) */}
      {currentLevel !== 'BASICS' && (
        <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar py-1 bg-white p-1.5 rounded-2xl border border-slate-200 shadow-xs">
          {getSubTabs().map((tab) => {
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => handleTabClick(tab.id as LevelSubTab)}
                className={`px-3 py-1.5 rounded-xl text-xs font-extrabold transition-all flex items-center gap-1.5 cursor-pointer whitespace-nowrap ${
                  isActive
                    ? 'bg-red-600 text-white shadow-xs border border-red-500'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100 border border-transparent'
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
