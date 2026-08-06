import React, { useState, useEffect } from 'react';
import { Sparkles, BookOpen, Layers, Headphones, Clock, Target, Award, Calendar, Flame, CheckCircle2, ChevronRight, Zap, ArrowLeft, FileText, ChevronDown } from 'lucide-react';
import { LevelPassTricks } from './LevelPassTricks';
import { LevelStudyPlanModal } from './LevelStudyPlanModal';
import { VocabularyExplorer } from './VocabularyExplorer';
import { KanjiCard } from './KanjiCard';
import { AlphabetGrid } from './AlphabetGrid';
import { TimedExamEngine } from './TimedExamEngine';
import { RadicalBreakdown } from './RadicalBreakdown';
import { LevelExamSyllabusGuide } from './LevelExamSyllabusGuide';
import { JFTGrammarExplorer } from './JFTGrammarExplorer';

export type LevelType = 'BASICS' | 'N5' | 'N4' | 'N3' | 'N2' | 'N1' | 'JFT' | 'KANJI_1000';
export type LevelSubTab = 'KANA_MATRIX' | 'BASICS_VOCAB' | 'RADICALS' | 'VOCABULARY' | 'GRAMMAR' | 'FLASHCARDS' | 'LISTENING' | 'EXAMS' | 'EXAM_GUIDE';

interface LevelHubDashboardProps {
  level: LevelType;
  onSelectLevel?: (level: LevelType) => void;
  onBackToPortal?: () => void;
  activeTab?: LevelSubTab;
  onTabChange?: (tab: LevelSubTab) => void;
}

export const LevelHubDashboard: React.FC<LevelHubDashboardProps> = ({
  level,
  onSelectLevel,
  onBackToPortal,
  activeTab: externalActiveTab,
  onTabChange,
}) => {
  const [activeTab, setActiveTab] = useState<LevelSubTab>('VOCABULARY');
  const [showTricksModal, setShowTricksModal] = useState<boolean>(false);
  const [showPlanModal, setShowPlanModal] = useState<boolean>(false);

  // Sync sub tab when level changes or external tab prop changes
  useEffect(() => {
    if (externalActiveTab) {
      setActiveTab(externalActiveTab);
    } else {
      if (level === 'BASICS') {
        setActiveTab('BASICS_VOCAB');
      } else if (level === 'JFT') {
        setActiveTab('EXAMS');
      } else {
        setActiveTab('VOCABULARY');
      }
    }
  }, [level, externalActiveTab]);

  const handleTabClick = (t: LevelSubTab) => {
    setActiveTab(t);
    if (onTabChange) onTabChange(t);
  };

  // Level Metadata
  const levelMeta = {
    BASICS: {
      title: 'Japanese Basics (Kana Fonts, Vowels & Pronunciation)',
      sub: 'Lessons 1–12 • Hiragana & Katakana Vowels & Stroke Guides',
      badge: 'Level 00',
      emoji: '🌱',
      color: 'from-emerald-600 via-teal-600 to-cyan-600',
      border: 'border-emerald-500/30',
      bgGlow: 'bg-emerald-950/40',
      textAccent: 'text-emerald-400',
      stats: { lessons: 12, vocab: '200+ Basic', kanji: '1000 Kanji', passingScore: '100% Reading' }
    },
    N5: {
      title: 'JLPT N5 Complete Curriculum',
      sub: 'Lessons 1–25 • Minna no Nihongo Shokyu I',
      badge: 'JLPT N5',
      emoji: '🎗',
      color: 'from-blue-600 via-indigo-600 to-cyan-600',
      border: 'border-blue-500/30',
      bgGlow: 'bg-blue-950/40',
      textAccent: 'text-blue-400',
      stats: { lessons: 25, vocab: '800+', kanji: '100 Kanji', passingScore: '80 / 180 Pts' }
    },
    N4: {
      title: 'JLPT N4 Complete Curriculum',
      sub: 'Lessons 26–50 • Minna no Nihongo Shokyu II',
      badge: 'JLPT N4',
      emoji: '🎖',
      color: 'from-purple-600 via-pink-600 to-indigo-600',
      border: 'border-purple-500/30',
      bgGlow: 'bg-purple-950/40',
      textAccent: 'text-purple-400',
      stats: { lessons: 25, vocab: '1,500+', kanji: '300 Kanji', passingScore: '90 / 180 Pts' }
    },
    N3: {
      title: 'JLPT N3 Master Syllabus',
      sub: 'Lessons 51–62 • Intermediate Master Syllabus',
      badge: 'JLPT N3',
      emoji: '🏆',
      color: 'from-amber-600 via-orange-600 to-red-600',
      border: 'border-amber-500/30',
      bgGlow: 'bg-amber-950/40',
      textAccent: 'text-amber-400',
      stats: { lessons: 12, vocab: '3,000+', kanji: '650 Kanji', passingScore: '95 / 180 Pts' }
    },
    N2: {
      title: 'JLPT N2 Advanced Master Curriculum',
      sub: 'Lessons 63–80 • Business & Academic Proficiency',
      badge: 'JLPT N2',
      emoji: '🥉',
      color: 'from-cyan-600 via-teal-600 to-indigo-600',
      border: 'border-cyan-500/30',
      bgGlow: 'bg-cyan-950/40',
      textAccent: 'text-cyan-400',
      stats: { lessons: 18, vocab: '6,000+', kanji: '1,000 Kanji', passingScore: '90 / 180 Pts' }
    },
    N1: {
      title: 'JLPT N1 Expert Master Curriculum',
      sub: 'Lessons 81–100 • High Fluency & Native Nuance',
      badge: 'JLPT N1',
      emoji: '🥇',
      color: 'from-rose-600 via-amber-600 to-purple-600',
      border: 'border-rose-500/30',
      bgGlow: 'bg-rose-950/40',
      textAccent: 'text-rose-400',
      stats: { lessons: 20, vocab: '10,000+', kanji: '2,000 Kanji', passingScore: '100 / 180 Pts' }
    },
    JFT: {
      title: 'JFT-Basic Specified Skilled Worker (SSW)',
      sub: 'Sections 1–4 • CBT Examination Engine',
      badge: 'JFT-Basic',
      emoji: '🎯',
      color: 'from-cyan-600 via-blue-600 to-indigo-600',
      border: 'border-cyan-500/30',
      bgGlow: 'bg-cyan-950/40',
      textAccent: 'text-cyan-400',
      stats: { lessons: 20, vocab: '1,200+', kanji: 'Practical', passingScore: '200 / 250 Pts' }
    },
    KANJI_1000: {
      title: '1,000 Japanese Kanji Hub (Nepali & English)',
      sub: 'Complete 1000 Kanji Handbook split by Tiers',
      badge: 'Kanji (1000)',
      emoji: '💮',
      color: 'from-rose-600 via-pink-600 to-amber-600',
      border: 'border-rose-500/30',
      bgGlow: 'bg-rose-950/40',
      textAccent: 'text-rose-400',
      stats: { lessons: 1, vocab: '1000 Kanji', kanji: '1000 Items', passingScore: 'Handbook' }
    }
  }[level];

  // Dynamic Sub Tabs tailored to current level
  const getSubTabs = () => {
    if (level === 'BASICS') {
      return [
        { id: 'BASICS_VOCAB', label: 'Kana Fonts & Vowels', icon: BookOpen, emoji: '🌱' },
        { id: 'RADICALS', label: 'Kanji Radicals', icon: Layers, emoji: '🧩' },
      ];
    }
    if (level === 'N5') {
      return [
        { id: 'VOCABULARY', label: 'Vocabulary Explorer', icon: BookOpen, emoji: '📚' },
        { id: 'FLASHCARDS', label: 'Kanji Flashcards', icon: Layers, emoji: '🃏' },
        { id: 'LISTENING', label: 'Listening Practice', icon: Headphones, emoji: '🎧' },
        { id: 'EXAMS', label: 'Mock Tests', icon: Clock, emoji: '⏱' },
        { id: 'EXAM_GUIDE', label: 'Exam & Syllabus Guide', icon: FileText, emoji: '🎓' },
      ];
    }
    if (level === 'JFT') {
      return [
        { id: 'EXAMS', label: 'CBT Exam Engine', icon: Clock, emoji: '⏱' },
        { id: 'EXAM_GUIDE', label: 'Exam & Syllabus Guide', icon: FileText, emoji: '🎓' },
        { id: 'VOCABULARY', label: 'JFT Meanings (Lessons 1-50)', icon: BookOpen, emoji: '📖' },
        { id: 'GRAMMAR', label: 'JFT Grammar (Lessons 1-50)', icon: FileText, emoji: '📝' },
        { id: 'FLASHCARDS', label: 'Kanji Flashcards', icon: Layers, emoji: '🃏' },
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
    <div className="space-y-4 sm:space-y-6 animate-fade-in">

      {/* Feature Sub Navigation Tabs */}
      {level !== 'BASICS' && level !== 'KANJI_1000' && (
        <div className="flex items-center gap-1.5 flex-wrap">
          {getSubTabs().map((tab) => {
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => handleTabClick(tab.id as LevelSubTab)}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-black transition-all flex items-center gap-1.5 cursor-pointer whitespace-nowrap ${
                  isActive
                    ? 'bg-gradient-to-r from-rose-600 to-pink-600 text-white shadow-glow border border-rose-500/50'
                    : 'bg-slate-900/70 text-slate-400 hover:text-white hover:bg-slate-800 border border-slate-800/80'
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
      <div className="pt-2">
        {level === 'BASICS' ? (
          <VocabularyExplorer preselectedLevel="BASICS" />
        ) : level === 'KANJI_1000' ? (
          <VocabularyExplorer preselectedLevel="KANJI_1000" />
        ) : (
          <>
            {activeTab === 'VOCABULARY' && (
              <VocabularyExplorer preselectedLevel={level} />
            )}

            {activeTab === 'GRAMMAR' && (
              <JFTGrammarExplorer />
            )}

            {activeTab === 'FLASHCARDS' && (
              <KanjiCard currentLevel={level} hideLevelSelector={true} />
            )}

            {activeTab === 'LISTENING' && (
              <AlphabetGrid activeLanguage="JAPANESE" />
            )}

            {activeTab === 'EXAMS' && (
              <TimedExamEngine activeLanguage="JAPANESE" preselectedLevel={level === 'JFT' ? 'JFT' : (level as 'N5' | 'N4' | 'N3')} hideLevelSelector={true} hideCategorySelector={true} />
            )}

            {activeTab === 'EXAM_GUIDE' && (
              <LevelExamSyllabusGuide level={level as any} onSelectTab={(t) => setActiveTab(t)} />
            )}
          </>
        )}
      </div>

      {/* Modals */}
      {showTricksModal && (
        <LevelPassTricks level={level as any} onClose={() => setShowTricksModal(false)} />
      )}

      {showPlanModal && (
        <LevelStudyPlanModal level={level as any} onClose={() => setShowPlanModal(false)} />
      )}
    </div>
  );
};
