'use client';

import React, { useState, useEffect, useRef } from 'react';
import {
  BookOpen, Layers, Award, CheckCircle2, Lock, Play, ChevronRight,
  ChevronLeft, RotateCcw, Volume2, Sparkles, ArrowLeft, Target,
  FileText, Check, HelpCircle, Flame, GraduationCap, X, ListFilter,
  Briefcase, Compass
} from 'lucide-react';
import {
  KOREAN_BASICS_MODULES,
  PLACEMENT_TEST_QUESTIONS,
  BasicsModule,
  BasicsLesson,
  ContentBlock
} from '@/lib/korean-basics-modules';
import { AlphabetGrid } from '@/components/AlphabetGrid';

interface UserBasicsProgress {
  completedLessons: string[];
  lastModuleId: string;
  lastLessonId: string;
  earnedBadges: string[];
  quizScores: Record<string, number>;
}

const STORAGE_KEY = 'korean_basics_user_progress';

export interface KoreanBasicsModuleSystemProps {
  onSelectExamBridge?: (path: 'TOPIK1' | 'EPS') => void;
  initialModuleId?: string;
  initialViewMode?: 'LESSON_READER' | 'ROADMAP' | 'PLACEMENT_TEST' | 'HANGEUL_MATRIX';
  initialPlacementOpen?: boolean;
}

export const KoreanBasicsModuleSystem: React.FC<KoreanBasicsModuleSystemProps> = ({
  onSelectExamBridge,
  initialModuleId,
  initialViewMode,
  initialPlacementOpen,
}) => {
  // State
  const [progress, setProgress] = useState<UserBasicsProgress>({
    completedLessons: [],
    lastModuleId: 'module-01',
    lastLessonId: 'mod1-less1',
    earnedBadges: [],
    quizScores: {},
  });

  const [activeView, setActiveView] = useState<'ROADMAP' | 'MODULE_DETAIL' | 'LESSON_READER' | 'PLACEMENT_TEST' | 'HANGEUL_MATRIX'>('LESSON_READER');
  const [selectedModule, setSelectedModule] = useState<BasicsModule>(KOREAN_BASICS_MODULES[0]);
  const [selectedLesson, setSelectedLesson] = useState<BasicsLesson>(KOREAN_BASICS_MODULES[0].lessons[0]);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [showPlacementModal, setShowPlacementModal] = useState(false);
  const [showProgressModal, setShowProgressModal] = useState(false);
  const [placementAnswers, setPlacementAnswers] = useState<Record<string, number>>({});
  const [placementResult, setPlacementResult] = useState<string | null>(null);
  const [activeQuizSelected, setActiveQuizSelected] = useState<Record<string, number>>({});

  // Light Book Mode vs Dark Reader Mode state (defaults to LIGHT book mode)
  const [readerTheme, setReaderTheme] = useState<'LIGHT' | 'DARK'>('LIGHT');

  // Matrix Filter state for Syllable Combination Chart (Basic, Double Consonants, Compound Vowels, All)
  const [matrixFilter, setMatrixFilter] = useState<'BASIC' | 'DOUBLE' | 'COMPOUND' | 'ALL'>('BASIC');

  // Handle external prop changes
  useEffect(() => {
    if (initialViewMode) {
      setActiveView(initialViewMode);
    }
    if (initialPlacementOpen) {
      setShowPlacementModal(true);
    }
  }, [initialViewMode, initialPlacementOpen]);

  useEffect(() => {
    if (initialModuleId) {
      const found = KOREAN_BASICS_MODULES.find((m) => m.id === initialModuleId);
      if (found) {
        setSelectedModule(found);
        setSelectedLesson(found.lessons[0]);
        setActiveView('LESSON_READER');
      }
    }
  }, [initialModuleId]);

  // Load progress from localStorage
  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed && typeof parsed === 'object') {
          setProgress(parsed);
        }
      }
    } catch (e) {
      console.error('Failed to load Korean Basics progress', e);
    }
  }, []);

  // Save progress to localStorage
  const saveProgress = (newProgress: UserBasicsProgress) => {
    setProgress(newProgress);
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(newProgress));
    } catch (e) {
      console.error('Failed to save Korean Basics progress', e);
    }
  };

  // Calculate stats
  const totalLessonsCount = KOREAN_BASICS_MODULES.reduce((acc, m) => acc + m.lessons.length, 0);
  const completedCount = progress.completedLessons.length;
  const overallPercentage = Math.round((completedCount / (totalLessonsCount || 1)) * 100);

  // Determine last active lesson for "Continue Learning"
  const getLastActiveLessonInfo = () => {
    const mod = KOREAN_BASICS_MODULES.find((m) => m.id === progress.lastModuleId) || KOREAN_BASICS_MODULES[0];
    const less = mod.lessons.find((l) => l.id === progress.lastLessonId) || mod.lessons[0];
    return { module: mod, lesson: less };
  };

  const activeLessonInfo = getLastActiveLessonInfo();

  // TTS audio player
  const playAudio = (text: string) => {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const u = new SpeechSynthesisUtterance(text);
      u.lang = 'ko-KR';
      u.rate = 0.8;
      window.speechSynthesis.speak(u);
    }
  };

  // Lesson Completion Action
  const markLessonComplete = (lessonId: string) => {
    if (!progress.completedLessons.includes(lessonId)) {
      const updatedCompleted = [...progress.completedLessons, lessonId];
      // Check if module is completed and award badge
      let updatedBadges = [...progress.earnedBadges];
      const isCurrentModuleComplete = selectedModule.lessons.every((l) =>
        l.id === lessonId || updatedCompleted.includes(l.id)
      );

      if (isCurrentModuleComplete && !updatedBadges.includes(selectedModule.badgeName)) {
        updatedBadges.push(selectedModule.badgeName);
      }

      saveProgress({
        ...progress,
        completedLessons: updatedCompleted,
        earnedBadges: updatedBadges,
      });
    }
  };

  // Navigate to Lesson
  const openLesson = (mod: BasicsModule, less: BasicsLesson) => {
    setSelectedModule(mod);
    setSelectedLesson(less);
    setActiveView('LESSON_READER');
    saveProgress({
      ...progress,
      lastModuleId: mod.id,
      lastLessonId: less.id,
    });
    if (typeof window !== 'undefined') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  // Next / Previous Lesson Navigation
  const navigateLesson = (direction: 'NEXT' | 'PREV') => {
    const currentModuleLessons = selectedModule.lessons;
    const currentIdx = currentModuleLessons.findIndex((l) => l.id === selectedLesson.id);

    if (direction === 'NEXT') {
      markLessonComplete(selectedLesson.id);
      if (currentIdx < currentModuleLessons.length - 1) {
        openLesson(selectedModule, currentModuleLessons[currentIdx + 1]);
      } else {
        // Move to next module first lesson if available
        const currentModIdx = KOREAN_BASICS_MODULES.findIndex((m) => m.id === selectedModule.id);
        if (currentModIdx < KOREAN_BASICS_MODULES.length - 1) {
          const nextMod = KOREAN_BASICS_MODULES[currentModIdx + 1];
          openLesson(nextMod, nextMod.lessons[0]);
        } else {
          // Completed all modules!
          setActiveView('ROADMAP');
        }
      }
    } else {
      if (currentIdx > 0) {
        openLesson(selectedModule, currentModuleLessons[currentIdx - 1]);
      } else {
        const currentModIdx = KOREAN_BASICS_MODULES.findIndex((m) => m.id === selectedModule.id);
        if (currentModIdx > 0) {
          const prevMod = KOREAN_BASICS_MODULES[currentModIdx - 1];
          openLesson(prevMod, prevMod.lessons[prevMod.lessons.length - 1]);
        }
      }
    }
  };

  // Calculate module progress
  const getModuleProgress = (mod: BasicsModule) => {
    const comp = mod.lessons.filter((l) => progress.completedLessons.includes(l.id)).length;
    const total = mod.lessons.length;
    return {
      completed: comp,
      total,
      percentage: Math.round((comp / (total || 1)) * 100),
      isComplete: comp === total && total > 0,
    };
  };

  // Handle Placement Test submission
  const handlePlacementSubmit = () => {
    let targetModId = 'module-01';
    let targetModName = 'Module 01 — Korean Foundation';

    for (const q of PLACEMENT_TEST_QUESTIONS) {
      if (placementAnswers[q.id] === q.correctIndex) {
        targetModId = q.recommendModuleId;
        targetModName = q.recommendModuleName;
      }
    }

    setPlacementResult(targetModName);
    const targetMod = KOREAN_BASICS_MODULES.find((m) => m.id === targetModId) || KOREAN_BASICS_MODULES[0];
    saveProgress({
      ...progress,
      lastModuleId: targetMod.id,
      lastLessonId: targetMod.lessons[0].id,
    });
  };

  return (
    <div className="space-y-6 text-slate-100 font-sans pb-12 w-full max-w-full overflow-x-hidden">
      {/* ──────────────────────────────────────────────────────────── */}
      {/* 1. DASHBOARD TOP HEADER & HERO (Progress & Roadmap) */}
      {/* ──────────────────────────────────────────────────────────── */}
      {activeView === 'ROADMAP' && (
        <div className="space-y-8 font-sans w-full max-w-full">
          {/* Hero Banner Card */}
          <div className="bg-gradient-to-br from-slate-900 via-slate-950 to-emerald-950 border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-2xl relative overflow-hidden text-white space-y-6">
            <div className="absolute -right-12 -top-12 w-64 h-64 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
            
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 relative z-10">
              <div className="space-y-2 max-w-xl">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 text-xs font-black uppercase tracking-wider">
                  <Award className="w-3.5 h-3.5" /> Official Foundation Pathway
                </div>
                <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-white">
                  Korean Basics Learning Path
                </h1>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Track your mastery across 12 foundation modules, earn official skill badges, and build complete fluency in Hangeul reading, grammar, numbers, and workplace Korean.
                </p>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center gap-3 shrink-0 w-full md:w-auto">
                <button
                  onClick={() => openLesson(activeLessonInfo.module, activeLessonInfo.lesson)}
                  className="flex-1 md:flex-none px-6 py-3.5 rounded-2xl bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-500 hover:from-emerald-400 hover:to-cyan-400 text-slate-950 font-black text-xs shadow-glow transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Play className="w-4 h-4 fill-slate-950" />
                  <span>
                    {completedCount === 0
                      ? 'Start Module 01 ➔'
                      : `Continue: ${activeLessonInfo.lesson.title}`}
                  </span>
                </button>

                <button
                  onClick={() => setActiveView('PLACEMENT_TEST')}
                  className="px-4 py-3.5 rounded-2xl bg-slate-900/90 hover:bg-slate-800 text-cyan-300 border border-cyan-500/30 font-extrabold text-xs transition-all flex items-center justify-center gap-2 cursor-pointer shadow-md"
                  title="Take Placement Diagnostic Test"
                >
                  <Target className="w-4 h-4 text-cyan-400" />
                  <span>Placement Test</span>
                </button>
              </div>
            </div>

            {/* Progress Bar & Stats Row */}
            <div className="bg-slate-950/80 p-4 sm:p-5 rounded-2xl border border-slate-800/80 space-y-3 relative z-10">
              <div className="flex items-center justify-between text-xs font-black">
                <span className="uppercase text-slate-400 tracking-wider">Overall Foundation Completion</span>
                <span className="text-emerald-400">{overallPercentage}% ({completedCount}/{totalLessonsCount} Lessons Completed)</span>
              </div>
              <div className="w-full bg-slate-900 h-3 rounded-full overflow-hidden border border-slate-800">
                <div
                  className="bg-gradient-to-r from-emerald-500 via-teal-400 to-cyan-400 h-full transition-all duration-700 rounded-full"
                  style={{ width: `${overallPercentage}%` }}
                />
              </div>
            </div>
          </div>

          {/* 12 Modules Learning Path Grid */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-black text-slate-900 flex items-center gap-2">
                <Layers className="w-5 h-5 text-emerald-600" />
                <span>Learning Path Roadmap (12 Modules)</span>
              </h2>
              <span className="text-xs text-slate-500 font-bold hidden sm:inline">Select any module to start learning</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5">
              {KOREAN_BASICS_MODULES.map((mod) => {
                const modProg = getModuleProgress(mod);

                return (
                  <div
                    key={mod.id}
                    onClick={() => {
                      setSelectedModule(mod);
                      setActiveView('MODULE_DETAIL');
                    }}
                    className={`group bg-white hover:bg-slate-50/80 border rounded-3xl p-5 sm:p-6 shadow-md hover:shadow-xl transition-all duration-300 flex flex-col justify-between cursor-pointer space-y-4 ${
                      modProg.isComplete
                        ? 'border-emerald-400/80 bg-emerald-50/30'
                        : 'border-slate-200/90 hover:border-emerald-500/60'
                    }`}
                  >
                    <div className="space-y-3">
                      <div className="flex items-center justify-between gap-2">
                        <div className="flex items-center gap-2">
                          <span className="text-[11px] font-black uppercase tracking-wider text-emerald-700 bg-emerald-100/80 border border-emerald-300 px-2.5 py-0.5 rounded-full">
                            MODULE {mod.moduleNumber < 10 ? `0${mod.moduleNumber}` : mod.moduleNumber}
                          </span>
                          <span className="text-xs font-jp font-bold text-slate-500">{mod.titleKorean}</span>
                        </div>

                        {modProg.isComplete && (
                          <span className="px-2 py-0.5 rounded-full bg-emerald-600 text-white text-[10px] font-extrabold flex items-center gap-1 shadow-sm">
                            <CheckCircle2 className="w-3 h-3 text-white" /> Done
                          </span>
                        )}
                      </div>

                      <div className="flex items-start gap-3">
                        <div className="w-12 h-12 rounded-2xl bg-amber-50 border border-amber-200/80 flex items-center justify-center text-2xl shrink-0 group-hover:scale-105 transition-transform shadow-xs">
                          {mod.emoji}
                        </div>
                        <div className="space-y-1 min-w-0 flex-1">
                          <h3 className="text-base font-black text-slate-900 group-hover:text-emerald-700 transition-colors leading-snug truncate">
                            {mod.title}
                          </h3>
                          <p className="text-xs text-slate-600 leading-relaxed line-clamp-2">
                            {mod.description}
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center gap-3 text-[11px] font-bold text-slate-500 flex-wrap pt-1">
                        <span>📚 {mod.lessons.length} Lessons</span>
                        <span>⏱ ~{mod.lessons.length * 10} Mins</span>
                        <span className="text-amber-700 font-extrabold">🏆 {mod.badgeName}</span>
                      </div>
                    </div>

                    {/* Progress Bar & Jump Button */}
                    <div className="space-y-2 pt-3 border-t border-slate-200/80">
                      <div className="flex items-center justify-between text-xs font-bold">
                        <span className="text-slate-500">{modProg.completed} of {modProg.total} completed</span>
                        <span className="text-emerald-700">{modProg.percentage}%</span>
                      </div>

                      <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden border border-slate-200">
                        <div
                          className="bg-gradient-to-r from-emerald-500 to-teal-500 h-full transition-all duration-500 rounded-full"
                          style={{ width: `${modProg.percentage}%` }}
                        />
                      </div>

                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setSelectedModule(mod);
                          setActiveView('MODULE_DETAIL');
                        }}
                        className={`w-full py-2.5 rounded-xl font-black text-xs transition-all flex items-center justify-center gap-1.5 cursor-pointer mt-1 ${
                          modProg.isComplete
                            ? 'bg-slate-100 hover:bg-slate-200 text-slate-800 border border-slate-300'
                            : 'bg-emerald-600 hover:bg-emerald-500 text-white shadow-md'
                        }`}
                      >
                        <span>{modProg.isComplete ? 'Review Module' : 'Explore Module'}</span>
                        <ChevronRight className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* ──────────────────────────────────────────────────────────── */}
      {/* 3. MODULE DETAIL VIEW (LESSON LIST) */}
      {/* ──────────────────────────────────────────────────────────── */}
      {activeView === 'MODULE_DETAIL' && selectedModule && (
        <div className="space-y-6">
          <button
            onClick={() => setActiveView('ROADMAP')}
            className="flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-white border border-slate-800 text-xs font-bold transition-all cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Module Roadmap</span>
          </button>

          {/* Module Banner Header */}
          <div className="bg-slate-900/95 border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-2xl space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-14 h-14 rounded-2xl bg-slate-950 border border-slate-800 flex items-center justify-center text-3xl shrink-0">
                {selectedModule.emoji}
              </div>
              <div>
                <div className="text-xs font-black uppercase tracking-wider text-emerald-400">
                  MODULE {selectedModule.moduleNumber < 10 ? `0${selectedModule.moduleNumber}` : selectedModule.moduleNumber}
                </div>
                <h1 className="text-2xl sm:text-3xl font-black text-white">{selectedModule.title}</h1>
                <p className="text-xs font-jp text-slate-400 mt-0.5">{selectedModule.titleKorean}</p>
              </div>
            </div>

            <p className="text-sm text-slate-300 leading-relaxed max-w-3xl">
              {selectedModule.description}
            </p>

            <div className="pt-3 flex items-center gap-4 text-xs font-bold text-slate-400 flex-wrap">
              <span>{selectedModule.lessons.length} Lessons</span>
              <span>•</span>
              <span>Completion Badge: <span className="text-amber-400">{selectedModule.badgeEmoji} {selectedModule.badgeName}</span></span>
            </div>
          </div>

          {/* Interactive Hangul Audio Matrix & Consonant+Vowel Combination Grid for Module 02 */}
          {selectedModule.id === 'module-02' && (
            <div className="space-y-6 pt-2">
              {/* 1. Complete Consonant + Vowel Combination Grid with Filters */}
              <div className="space-y-3">
                <div className="flex items-center justify-between flex-wrap gap-2">
                  <h2 className="text-sm font-black uppercase tracking-wider text-emerald-400 flex items-center gap-2">
                    <span>🧱</span> Consonant + Vowel Combination Master Matrix
                  </h2>
                  <span className="text-[10px] text-slate-400 font-bold">Click any syllable block to hear pronunciation</span>
                </div>

                <div className="bg-slate-900/90 border border-emerald-500/30 rounded-3xl p-4 sm:p-6 shadow-2xl space-y-4">
                  {/* Filter Sub-Tabs for Matrix Types */}
                  <div className="flex items-center gap-1.5 p-1 rounded-2xl bg-slate-950 border border-slate-800 flex-wrap">
                    {[
                      { id: 'BASIC', label: '🌱 Basic Vowels (140자)', sub: '14 Consonants × 10 Basic Vowels' },
                      { id: 'DOUBLE', label: '⚡ Double Consonants (50자)', sub: '5 Tense (ㄲ, ㄸ, ㅃ, ㅆ, ㅉ) × Basic Vowels' },
                      { id: 'COMPOUND', label: '🧩 Compound Vowels (209자)', sub: '19 Consonants × 11 Diphthongs (ㅐ, ㅔ, ㅘ, ㅝ...)' },
                      { id: 'ALL', label: '👑 All Combinations (399자)', sub: 'Complete 19 Consonants × 21 Vowels' },
                    ].map((tab) => (
                      <button
                        key={tab.id}
                        onClick={() => setMatrixFilter(tab.id as any)}
                        className={`px-3 py-2 rounded-xl text-xs font-black transition-all cursor-pointer ${
                          matrixFilter === tab.id
                            ? 'bg-gradient-to-r from-emerald-600 to-teal-600 text-white shadow-md'
                            : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
                        }`}
                      >
                        {tab.label}
                      </button>
                    ))}
                  </div>

                  <div className="text-xs text-slate-300 leading-relaxed font-sans">
                    {matrixFilter === 'BASIC' && 'Showing 14 Basic Consonants (ㄱ ~ ㅎ) combined with 10 Basic Vowels (ㅏ ~ ㅣ).'}
                    {matrixFilter === 'DOUBLE' && 'Showing 5 Tense Double Consonants (ㄲ, ㄸ, ㅃ, ㅆ, ㅉ) combined with Basic Vowels.'}
                    {matrixFilter === 'COMPOUND' && 'Showing Consonants combined with 11 Compound Vowels / Diphthongs (ㅐ, ㅒ, ㅔ, ㅖ, ㅘ, ㅙ, ㅚ, ㅝ, ㅞ, ㅟ, ㅢ).'}
                    {matrixFilter === 'ALL' && 'Showing complete 399 core Hangeul syllable blocks (All 19 Consonants × All 21 Vowels).'}
                  </div>

                  <div className="overflow-x-auto scrollbar-thin scrollbar-thumb-slate-700">
                    {(() => {
                      const BASIC_CONSONANTS = [
                        { char: 'ㄱ', initIdx: 0, name: 'Giyeok' },
                        { char: 'ㄴ', initIdx: 2, name: 'Nieun' },
                        { char: 'ㄷ', initIdx: 3, name: 'Digeut' },
                        { char: 'ㄹ', initIdx: 5, name: 'Rieul' },
                        { char: 'ㅁ', initIdx: 6, name: 'Mieum' },
                        { char: 'ㅂ', initIdx: 7, name: 'Bieup' },
                        { char: 'ㅅ', initIdx: 9, name: 'Siot' },
                        { char: 'ㅇ', initIdx: 11, name: 'Ieung' },
                        { char: 'ㅈ', initIdx: 12, name: 'Jieut' },
                        { char: 'ㅊ', initIdx: 14, name: 'Chieut' },
                        { char: 'ㅋ', initIdx: 15, name: 'Kieuk' },
                        { char: 'ㅌ', initIdx: 16, name: 'Tieut' },
                        { char: 'ㅍ', initIdx: 17, name: 'Pieup' },
                        { char: 'ㅎ', initIdx: 18, name: 'Hieut' },
                      ];
                      const DOUBLE_CONSONANTS = [
                        { char: 'ㄲ', initIdx: 1, name: 'Ssang-Giyeok' },
                        { char: 'ㄸ', initIdx: 4, name: 'Ssang-Digeut' },
                        { char: 'ㅃ', initIdx: 8, name: 'Ssang-Bieup' },
                        { char: 'ㅆ', initIdx: 10, name: 'Ssang-Siot' },
                        { char: 'ㅉ', initIdx: 13, name: 'Ssang-Jieut' },
                      ];
                      const ALL_CONSONANTS = [...BASIC_CONSONANTS, ...DOUBLE_CONSONANTS].sort((a, b) => a.initIdx - b.initIdx);

                      const BASIC_VOWELS = [
                        { label: 'ㅏ(a)', vIdx: 0 },
                        { label: 'ㅑ(ya)', vIdx: 2 },
                        { label: 'ㅓ(eo)', vIdx: 4 },
                        { label: 'ㅕ(yeo)', vIdx: 6 },
                        { label: 'ㅗ(o)', vIdx: 8 },
                        { label: 'ㅛ(yo)', vIdx: 12 },
                        { label: 'ㅜ(u)', vIdx: 13 },
                        { label: 'ㅠ(yu)', vIdx: 17 },
                        { label: 'ㅡ(eu)', vIdx: 18 },
                        { label: 'ㅣ(i)', vIdx: 20 },
                      ];
                      const COMPOUND_VOWELS = [
                        { label: 'ㅐ(ae)', vIdx: 1 },
                        { label: 'ㅒ(yae)', vIdx: 3 },
                        { label: 'ㅔ(e)', vIdx: 5 },
                        { label: 'ㅖ(ye)', vIdx: 7 },
                        { label: 'ㅘ(wa)', vIdx: 9 },
                        { label: 'ㅙ(wae)', vIdx: 10 },
                        { label: 'ㅚ(oe)', vIdx: 11 },
                        { label: 'ㅝ(wo)', vIdx: 14 },
                        { label: 'ㅞ(we)', vIdx: 15 },
                        { label: 'ㅟ(wi)', vIdx: 16 },
                        { label: 'ㅢ(ui)', vIdx: 19 },
                      ];
                      const ALL_VOWELS = [...BASIC_VOWELS, ...COMPOUND_VOWELS].sort((a, b) => a.vIdx - b.vIdx);

                      const currentConsonants = matrixFilter === 'BASIC' ? BASIC_CONSONANTS : matrixFilter === 'DOUBLE' ? DOUBLE_CONSONANTS : ALL_CONSONANTS;
                      const currentVowels = matrixFilter === 'BASIC' || matrixFilter === 'DOUBLE' ? BASIC_VOWELS : matrixFilter === 'COMPOUND' ? COMPOUND_VOWELS : ALL_VOWELS;

                      return (
                        <table className="w-full text-center border-collapse text-xs">
                          <thead>
                            <tr className="border-b border-slate-800 bg-slate-950 text-emerald-400 font-black">
                              <th className="p-2 border-r border-slate-800">C \ V</th>
                              {currentVowels.map((vObj, idx) => (
                                <th key={idx} className="p-2 min-w-[48px]">{vObj.label}</th>
                              ))}
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-slate-800/60 font-jp">
                            {currentConsonants.map((con) => (
                              <tr key={con.char} className="hover:bg-slate-950/50">
                                <td className="p-2 border-r border-slate-800 font-black text-emerald-400 bg-slate-950/80">
                                  {con.char} <span className="text-[9px] font-mono text-slate-500 font-normal">({con.name})</span>
                                </td>
                                {currentVowels.map((vObj) => {
                                  const syllableChar = String.fromCharCode(0xAC00 + con.initIdx * 588 + vObj.vIdx * 28);
                                  return (
                                    <td key={vObj.vIdx} className="p-1">
                                      <button
                                        onClick={() => playAudio(syllableChar)}
                                        className="w-full py-2 px-1 rounded-xl bg-slate-950 border border-slate-800 hover:border-emerald-500 hover:bg-emerald-500/20 text-slate-100 font-bold text-sm hover:text-emerald-300 transition-all cursor-pointer shadow-sm active:scale-95"
                                        title={`Listen to ${syllableChar}`}
                                      >
                                        {syllableChar}
                                      </button>
                                    </td>
                                  );
                                })}
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      );
                    })()}
                  </div>
                </div>
              </div>

              {/* 2. Interactive Alphabet Matrix */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <h2 className="text-sm font-black uppercase tracking-wider text-cyan-400 flex items-center gap-2">
                    <span>🔤</span> Complete Interactive Hangul Sound Matrix
                  </h2>
                  <span className="text-[10px] text-slate-400 font-bold">Consonants, Vowels &amp; Pronunciation Rules</span>
                </div>
                <div className="bg-slate-900/90 border border-slate-800 rounded-3xl p-4 sm:p-6 shadow-2xl">
                  <AlphabetGrid activeLanguage="KOREAN" />
                </div>
              </div>
            </div>
          )}

          {/* Vertical Lessons Directory */}
          <div className="space-y-3">
            <h2 className="text-sm font-black uppercase tracking-wider text-slate-400">
              LESSON LIST ({selectedModule.lessons.length} Lessons)
            </h2>

            <div className="space-y-3">
              {selectedModule.lessons.map((less, lessIdx) => {
                const isCompleted = progress.completedLessons.includes(less.id);
                const isCurrent = selectedLesson.id === less.id;

                return (
                  <div
                    key={less.id}
                    onClick={() => openLesson(selectedModule, less)}
                    className={`group bg-slate-900/90 border rounded-2xl p-4 sm:p-5 shadow-lg transition-all duration-200 cursor-pointer flex items-center justify-between gap-4 hover:border-emerald-500/50 ${
                      isCompleted
                        ? 'border-emerald-500/40 bg-emerald-950/10'
                        : isCurrent
                          ? 'border-cyan-500 bg-slate-900 ring-1 ring-cyan-500/40'
                          : 'border-slate-800'
                    }`}
                  >
                    <div className="flex items-center gap-4">
                      <div className={`w-10 h-10 rounded-xl flex items-center justify-center font-black text-xs shrink-0 ${
                        isCompleted
                          ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                          : 'bg-slate-950 text-slate-400 border border-slate-800'
                      }`}>
                        {isCompleted ? <Check className="w-5 h-5" /> : less.lessonNumber}
                      </div>

                      <div className="space-y-0.5">
                        <div className="flex items-center gap-2 flex-wrap">
                          <span className="text-xs font-black text-slate-400">
                            Lesson {less.lessonNumber < 10 ? `0${less.lessonNumber}` : less.lessonNumber}
                          </span>
                          {less.titleKorean && <span className="text-xs text-slate-400 font-jp">({less.titleKorean})</span>}
                          {isCompleted && (
                            <span className="px-2 py-0.2 rounded bg-emerald-500/20 text-emerald-300 text-[10px] font-bold">
                              ✓ Completed
                            </span>
                          )}
                        </div>
                        <h3 className="text-base font-bold text-white group-hover:text-emerald-300 transition-colors">
                          {less.title}
                        </h3>
                        <p className="text-xs text-slate-400 line-clamp-1">{less.description}</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-3 shrink-0">
                      <span className="text-xs text-slate-400 hidden sm:inline">⏱ {less.estimatedMinutes} mins</span>
                      <button className="p-2 rounded-xl bg-slate-800 group-hover:bg-emerald-600 text-slate-300 group-hover:text-white transition-colors cursor-pointer">
                        <ChevronRight className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* ──────────────────────────────────────────────────────────── */}
      {/* 4. DISTRACTION-FREE LESSON READER VIEW */}
      {/* ──────────────────────────────────────────────────────────── */}
      {activeView === 'LESSON_READER' && selectedLesson && (
        <div className="space-y-4">
          {/* Mobile Quick Directory Toggle Bar */}
          <div className="lg:hidden flex items-center justify-between bg-slate-900/90 border border-slate-800 rounded-2xl p-3 shadow-md">
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="flex items-center gap-2 text-xs font-black text-emerald-400 bg-emerald-950/80 hover:bg-emerald-900/80 border border-emerald-500/30 px-3 py-2 rounded-xl transition-all cursor-pointer"
            >
              <BookOpen className="w-4 h-4 text-emerald-400" />
              <span>{sidebarOpen ? 'Close Directory ✕' : 'Course Directory 📖'}</span>
            </button>

            <button
              onClick={() => setShowProgressModal(true)}
              className="flex items-center gap-1.5 text-xs font-black text-slate-300 bg-slate-800 hover:bg-slate-700 px-3 py-2 rounded-xl cursor-pointer"
            >
              <Award className="w-3.5 h-3.5 text-amber-400" />
              <span>Progress</span>
            </button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 items-start">
          {/* Collapsible Left Course Navigator Sidebar — full height */}
          <div className={`lg:col-span-1 bg-slate-950 border border-slate-800 rounded-3xl shadow-2xl flex flex-col sticky top-16 overflow-hidden ${sidebarOpen ? 'flex' : 'hidden lg:flex'}`} style={{height: 'calc(100vh - 72px)'}}>
            {/* Header */}
            <div className="flex items-center justify-between px-4 pt-4 pb-3 border-b border-slate-800 shrink-0">
              <div className="text-[11px] font-black uppercase tracking-widest text-slate-400">📚 Course Content</div>
              <button
                onClick={() => setShowProgressModal(true)}
                className="text-[10px] text-emerald-400 hover:text-emerald-300 font-extrabold cursor-pointer flex items-center gap-1 bg-emerald-950/60 hover:bg-emerald-900/60 border border-emerald-500/30 px-2 py-1 rounded-lg transition-all"
                title="View Progress & Milestone Roadmap"
              >
                <Award className="w-3 h-3 text-emerald-400" />
                <span>Progress</span>
              </button>
            </div>

            {/* Scrollable module+lesson list */}
            <div className="flex-1 overflow-y-auto px-2 py-2 space-y-0.5 scrollbar-thin scrollbar-thumb-slate-700">
              {KOREAN_BASICS_MODULES.map((m) => {
                const isSelectedMod = m.id === selectedModule.id;

                return (
                  <div key={m.id}>
                    {/* ── MODULE ROW ── */}
                    <button
                      onClick={() => {
                        setSelectedModule(m);
                        setSelectedLesson(m.lessons[0]);
                      }}
                      className={`w-full text-left px-3 py-2.5 rounded-xl flex items-center gap-2.5 transition-all cursor-pointer group ${
                        isSelectedMod
                          ? 'bg-emerald-900/50 border border-emerald-600/40'
                          : 'hover:bg-slate-800/70 border border-transparent'
                      }`}
                    >
                      {/* Module number badge */}
                      <span className={`shrink-0 w-6 h-6 rounded-lg text-[10px] font-black flex items-center justify-center ${
                        isSelectedMod ? 'bg-emerald-500 text-white' : 'bg-slate-800 text-slate-400 group-hover:bg-slate-700 group-hover:text-slate-200'
                      }`}>
                        {m.moduleNumber}
                      </span>
                      <span className={`flex-1 truncate text-xs font-extrabold uppercase tracking-wide ${
                        isSelectedMod ? 'text-emerald-300' : 'text-slate-400 group-hover:text-slate-100'
                      }`}>
                        {m.title}
                      </span>
                      <span className={`shrink-0 text-[10px] font-bold px-1.5 py-0.5 rounded-md ${
                        isSelectedMod ? 'bg-emerald-800/60 text-emerald-300' : 'text-slate-600'
                      }`}>
                        {m.lessons.length}L
                      </span>
                    </button>

                    {/* ── LESSON ROWS (only when module is expanded) ── */}
                    {isSelectedMod && (
                      <div className="ml-3 pl-3 border-l-2 border-emerald-700/40 mt-0.5 mb-1 space-y-0.5">
                        {m.lessons.map((l) => {
                          const isCurrentLess = l.id === selectedLesson.id;
                          const isDone = progress.completedLessons.includes(l.id);
                          return (
                            <button
                              key={l.id}
                              onClick={() => openLesson(m, l)}
                              className={`w-full text-left px-2.5 py-1.5 rounded-lg flex items-center justify-between gap-2 cursor-pointer transition-all ${
                                isCurrentLess
                                  ? 'bg-emerald-600 text-white'
                                  : isDone
                                    ? 'text-emerald-400 hover:bg-slate-800/80'
                                    : 'text-slate-500 hover:text-slate-200 hover:bg-slate-800/60'
                              }`}
                            >
                              <div className="flex items-center gap-1.5 min-w-0">
                                <span className={`shrink-0 w-4 h-4 rounded text-[9px] font-black flex items-center justify-center ${
                                  isCurrentLess ? 'bg-white/20 text-white' : isDone ? 'bg-emerald-900 text-emerald-400' : 'bg-slate-800 text-slate-500'
                                }`}>
                                  {l.lessonNumber}
                                </span>
                                <span className={`truncate text-[11px] italic ${
                                  isCurrentLess ? 'font-bold not-italic' : 'font-medium'
                                }`}>
                                  {l.title}
                                </span>
                              </div>
                              {isDone && <Check className="w-3 h-3 text-emerald-400 shrink-0" />}
                            </button>
                          );
                        })}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Main Lesson Content Area with Light Book Mode (bg-white) - Full Width Layout */}
          <div className={`lg:col-span-3 rounded-3xl p-4 sm:p-6 shadow-2xl space-y-4 w-full min-w-0 transition-all duration-300 ${
            readerTheme === 'LIGHT'
              ? 'bg-white text-slate-900 border border-slate-200/90'
              : 'bg-slate-900/95 text-slate-100 border border-slate-800'
          }`}>
            {/* Top Reader Navigation & Theme Toggle Bar (Compact) */}
            <div className={`flex items-center justify-between pb-2.5 gap-3 flex-wrap border-b ${
              readerTheme === 'LIGHT' ? 'border-slate-200' : 'border-slate-800'
            }`}>
              <button
                onClick={() => setActiveView('MODULE_DETAIL')}
                className={`flex items-center gap-1.5 text-xs font-extrabold transition-colors cursor-pointer ${
                  readerTheme === 'LIGHT' ? 'text-slate-600 hover:text-emerald-700' : 'text-slate-400 hover:text-white'
                }`}
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>Back to Module {selectedModule.moduleNumber}</span>
              </button>

              <div className="flex items-center gap-3">
                <span className={`text-[10px] font-black uppercase tracking-wider hidden sm:inline ${
                  readerTheme === 'LIGHT' ? 'text-slate-500' : 'text-slate-400'
                }`}>
                  MODULE {selectedModule.moduleNumber} • LESSON {selectedLesson.lessonNumber} OF {selectedModule.lessons.length}
                </span>

                {/* Theme Switcher Button */}
                <button
                  onClick={() => setReaderTheme(readerTheme === 'LIGHT' ? 'DARK' : 'LIGHT')}
                  className={`px-2.5 py-1 rounded-lg text-[11px] font-black transition-all border flex items-center gap-1.5 cursor-pointer shadow-sm ${
                    readerTheme === 'LIGHT'
                      ? 'bg-slate-900 text-amber-300 border-slate-800 hover:bg-slate-850'
                      : 'bg-amber-100 text-amber-950 border-amber-300 hover:bg-amber-200'
                  }`}
                >
                  {readerTheme === 'LIGHT' ? '🌙 Dark Mode' : '📖 Light Book Mode'}
                </button>
              </div>
            </div>

            {/* Compact Lesson Title Header */}
            <div className="space-y-1">
              <div className="flex items-center gap-2 text-[11px] font-black uppercase tracking-wider text-emerald-600">
                <span>{selectedModule.emoji} {selectedModule.title}</span>
              </div>
              <div className="flex flex-wrap items-baseline gap-2">
                <h1 className={`text-lg sm:text-2xl font-black leading-tight ${
                  readerTheme === 'LIGHT' ? 'text-slate-900 font-sans' : 'text-white'
                }`}>
                  {selectedLesson.title}
                </h1>
                {selectedLesson.titleKorean && (
                  <span className={`text-xs font-bold ${
                    readerTheme === 'LIGHT' ? 'text-slate-500 font-jp' : 'text-slate-400 font-jp'
                  }`}>({selectedLesson.titleKorean})</span>
                )}
              </div>
            </div>

            {/* Render Lesson Content Blocks (Compact Spacing) */}
            <div className="space-y-3.5 pt-1">
              {selectedLesson.contentBlocks.map((block) => {
                switch (block.type) {
                  case 'HEADING':
                    return (
                      <h2 key={block.id} className={`text-sm sm:text-base font-black border-b pb-1.5 mt-3 ${
                        readerTheme === 'LIGHT' ? 'text-slate-900 border-slate-200' : 'text-white border-slate-800'
                      }`}>
                        {block.heading}
                      </h2>
                    );

                  case 'TEXT':
                    return (
                      <p key={block.id} className={`text-xs sm:text-sm leading-relaxed ${
                        readerTheme === 'LIGHT' ? 'text-slate-700 font-sans' : 'text-slate-300'
                      }`}>
                        {block.text}
                      </p>
                    );

                  case 'KOREAN_TEXT':
                    return (
                      <div key={block.id} className={`rounded-2xl p-5 space-y-3 shadow-sm border ${
                        readerTheme === 'LIGHT'
                          ? 'bg-emerald-50/80 border-emerald-300/80 text-slate-900'
                          : 'bg-slate-950 border-emerald-500/30 text-white'
                      }`}>
                        <div className="flex items-center justify-between gap-3">
                          <span className={`${
                            (block.koreanText || '').length > 15 ? 'text-base sm:text-lg' : 'text-2xl sm:text-3xl'
                          } font-black font-jp text-emerald-600 leading-snug`}>
                            {block.koreanText}
                          </span>
                          <button
                            onClick={() => playAudio(block.audioText || block.koreanText || '')}
                            className="px-3.5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs shadow transition-all cursor-pointer flex items-center gap-1.5"
                          >
                            <Volume2 className="w-4 h-4" />
                            <span>Listen</span>
                          </button>
                        </div>
                        {block.romanization && (
                          <div className={`text-xs font-mono ${readerTheme === 'LIGHT' ? 'text-slate-600' : 'text-slate-400'}`}>{block.romanization}</div>
                        )}
                        {block.translationEn && (
                          <div className={`text-xs font-bold ${readerTheme === 'LIGHT' ? 'text-slate-800' : 'text-slate-200'}`}>🇬🇧 {block.translationEn}</div>
                        )}
                        {block.translationNp && (
                          <div className="text-xs font-bold text-amber-700">🇳🇵 {block.translationNp}</div>
                        )}
                      </div>
                    );

                  case 'VOCABULARY': {
                    const isAlphabetBlock = block.items?.every((i) => i.term.length <= 3);

                    const getMouthShape = (term: string) => {
                      switch (term) {
                        case 'ㅏ': return { shape: 'Open Wide Mouth', np: 'ओठ पूरा खोलेर', emoji: '👄' };
                        case 'ㅑ': return { shape: 'Open + "Y" Glide', np: 'ओठ खोलेर "य"', emoji: '👄' };
                        case 'ㅓ': return { shape: 'Relaxed Unrounded', np: 'ओठ नगोली अ', emoji: '👄' };
                        case 'ㅕ': return { shape: 'Relaxed + "Y" Glide', np: 'ओठ नगोली "य"', emoji: '👄' };
                        case 'ㅗ': return { shape: 'Rounded Forward', np: 'ओठ गोलो र अघि', emoji: '⭕' };
                        case 'ㅛ': return { shape: 'Rounded + "Y" Glide', np: 'ओठ गोलो "यो"', emoji: '⭕' };
                        case 'ㅜ': return { shape: 'Pouted Narrow Lips', np: 'ओठ चुच्चो (अघि)', emoji: '😗' };
                        case 'ㅠ': return { shape: 'Pouted + "Y" Glide', np: 'ओठ चुच्चो "यू"', emoji: '😗' };
                        case 'ㅡ': return { shape: 'Flat Teeth Lips', np: 'तेर्सो ओठ र दाँत', emoji: '😬' };
                        case 'ㅣ': return { shape: 'Wide Smile Lips', np: 'हाँसेझैँ तेर्सो ओठ', emoji: '😁' };
                        case 'ㅐ':
                        case 'ㅔ': return { shape: 'Half-Open Lips', np: 'आधा खुलेको ओठ', emoji: '👄' };
                        case 'ㅒ':
                        case 'ㅖ': return { shape: 'Half-Open + "Y"', np: 'आधा खुलेको "ये"', emoji: '👄' };
                        case 'ㅘ': return { shape: 'Round to Open (ㅗ+ㅏ)', np: 'गोलोबाट खोलेर (वा)', emoji: '⭕' };
                        case 'ㅙ':
                        case 'ㅚ':
                        case 'ㅞ': return { shape: 'Round to Half-Open', np: 'गोलोबाट ए ओठ (वे)', emoji: '⭕' };
                        case 'ㅝ': return { shape: 'Pout to Open (ㅜ+ㅓ)', np: 'चुच्चोबाट खुलेर (व)', emoji: '😗' };
                        case 'ㅟ': return { shape: 'Pout to Smile (ㅜ+ㅣ)', np: 'चुच्चोबाट तेर्सो (वि)', emoji: '😗' };
                        case 'ㅢ': return { shape: 'Flat to Smile (ㅡ+ㅣ)', np: 'तेर्सोबाट ई (उई)', emoji: '😬' };
                        default: return null;
                      }
                    };

                    return (
                      <div key={block.id} className={`grid gap-2.5 ${
                        isAlphabetBlock
                          ? 'grid-cols-2 sm:grid-cols-3 lg:grid-cols-4'
                          : 'grid-cols-1 sm:grid-cols-2'
                      }`}>
                        {block.items?.map((item, idx) => {
                          const mouth = getMouthShape(item.term);

                          return (
                            <div key={idx} className={`rounded-2xl p-3 space-y-1 transition-colors border shadow-sm ${
                              readerTheme === 'LIGHT'
                                ? 'bg-amber-50/60 border-amber-200/90 hover:border-emerald-500/50 text-slate-900'
                                : 'bg-slate-950/90 border-slate-800 hover:border-slate-700 text-white'
                            }`}>
                              <div className="flex items-center justify-between">
                                <div className="flex items-baseline gap-2">
                                  <span className="text-2xl font-black font-jp text-emerald-600">{item.term}</span>
                                  <span className={`text-xs font-mono font-bold ${readerTheme === 'LIGHT' ? 'text-slate-600' : 'text-slate-400'}`}>
                                    {item.rom}
                                  </span>
                                </div>
                                <button
                                  onClick={() => playAudio(item.term)}
                                  className={`p-1.5 rounded-lg transition-colors cursor-pointer ${
                                    readerTheme === 'LIGHT'
                                      ? 'bg-emerald-100 hover:bg-emerald-600 text-emerald-900 hover:text-white'
                                      : 'bg-slate-800 hover:bg-emerald-600 text-slate-300 hover:text-white'
                                  }`}
                                  title={`Listen to ${item.term}`}
                                >
                                  <Volume2 className="w-3.5 h-3.5" />
                                </button>
                              </div>

                              {/* Lips / Mouth Structure Visual Pill */}
                              {mouth && (
                                <div className={`px-2 py-0.5 rounded-md text-[10px] font-extrabold flex items-center gap-1 border ${
                                  readerTheme === 'LIGHT'
                                    ? 'bg-emerald-50 border-emerald-200 text-emerald-900'
                                    : 'bg-emerald-950/40 border-emerald-500/30 text-emerald-300'
                                }`}>
                                  <span>{mouth.emoji} Lips:</span>
                                  <span className="truncate">{mouth.shape} ({mouth.np})</span>
                                </div>
                              )}

                              <div className={`text-[11px] font-bold ${readerTheme === 'LIGHT' ? 'text-slate-800' : 'text-slate-200'}`}>
                                🇬🇧 {item.en}
                              </div>
                              {item.np && (
                                <div className="text-[11px] font-bold text-amber-700">
                                  🇳🇵 {item.np}
                                </div>
                              )}
                            </div>
                          );
                        })}
                      </div>
                    );
                  }

                  case 'GRAMMAR':
                    return (
                      <div key={block.id} className={`rounded-2xl p-5 space-y-2 border shadow-sm ${
                        readerTheme === 'LIGHT'
                          ? 'bg-purple-50/80 border-purple-200 text-slate-900'
                          : 'bg-gradient-to-r from-slate-950 via-purple-950/30 to-slate-950 border-purple-500/40 text-white'
                      }`}>
                        <div className="text-xs font-black uppercase tracking-wider text-purple-600">Grammar Rule / व्याकरण नियम</div>
                        <h3 className={`text-base font-black ${readerTheme === 'LIGHT' ? 'text-slate-900' : 'text-white'}`}>{block.heading}</h3>
                        <p className={`text-xs leading-relaxed ${readerTheme === 'LIGHT' ? 'text-slate-700' : 'text-slate-300'}`}>{block.text}</p>
                      </div>
                    );

                  case 'EXAMPLE':
                    return (
                      <div key={block.id} className={`rounded-2xl p-4 space-y-1.5 border shadow-sm ${
                        readerTheme === 'LIGHT'
                          ? 'bg-cyan-50/80 border-cyan-200 text-slate-900'
                          : 'bg-slate-950 border-cyan-500/30 text-white'
                      }`}>
                        <div className="flex items-center justify-between">
                          <span className="text-base font-bold font-jp text-cyan-700">{block.koreanText}</span>
                          <button
                            onClick={() => playAudio(block.koreanText || '')}
                            className={`p-1.5 rounded-lg transition-colors cursor-pointer ${
                              readerTheme === 'LIGHT'
                                ? 'bg-cyan-100 hover:bg-cyan-600 text-cyan-900 hover:text-white'
                                : 'bg-slate-800 hover:bg-cyan-600 text-slate-300 hover:text-white'
                            }`}
                          >
                            <Volume2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                        {block.romanization && <div className={`text-xs font-mono ${readerTheme === 'LIGHT' ? 'text-slate-600' : 'text-slate-400'}`}>{block.romanization}</div>}
                        {block.translationEn && <div className={`text-xs font-bold ${readerTheme === 'LIGHT' ? 'text-slate-800' : 'text-slate-200'}`}>🇬🇧 {block.translationEn}</div>}
                        {block.translationNp && <div className="text-xs font-bold text-amber-700">🇳🇵 {block.translationNp}</div>}
                      </div>
                    );

                  case 'TABLE':
                    return (
                      <div key={block.id} className={`overflow-x-auto border rounded-2xl ${
                        readerTheme === 'LIGHT' ? 'border-slate-200 bg-white' : 'border-slate-800 bg-slate-950'
                      }`}>
                        <table className="w-full text-left text-xs">
                          <thead className={readerTheme === 'LIGHT' ? 'bg-slate-100 text-slate-800 font-bold border-b border-slate-200' : 'bg-slate-950 text-slate-300 font-bold border-b border-slate-800'}>
                            <tr>
                              {block.tableData?.headers.map((h, i) => (
                                <th key={i} className="p-3 font-black">{h}</th>
                              ))}
                            </tr>
                          </thead>
                          <tbody className={`divide-y ${readerTheme === 'LIGHT' ? 'divide-slate-200' : 'divide-slate-800/60'}`}>
                            {block.tableData?.rows.map((row, rIdx) => (
                              <tr key={rIdx} className={readerTheme === 'LIGHT' ? 'hover:bg-slate-50' : 'hover:bg-slate-950/50'}>
                                {row.map((cell, cIdx) => (
                                  <td key={cIdx} className={`p-3 font-jp ${readerTheme === 'LIGHT' ? 'text-slate-800 font-medium' : 'text-slate-200'}`}>{cell}</td>
                                ))}
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    );

                  case 'QUIZ':
                    if (!block.quizQuestion) return null;
                    const qq = block.quizQuestion;
                    const userSelected = activeQuizSelected[block.id];
                    const isCorrect = userSelected === qq.correctIndex;

                    return (
                      <div key={block.id} className={`rounded-2xl p-5 space-y-4 border shadow-sm ${
                        readerTheme === 'LIGHT' ? 'bg-slate-50 border-slate-200 text-slate-900' : 'bg-slate-950 border-slate-800 text-white'
                      }`}>
                        <div className="flex items-center gap-2 text-xs font-black uppercase text-amber-600">
                          <HelpCircle className="w-4 h-4" /> Quick Practice Quiz
                        </div>
                        <h4 className={`text-sm font-bold ${readerTheme === 'LIGHT' ? 'text-slate-900' : 'text-white'}`}>{qq.question}</h4>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                          {qq.options.map((opt, oIdx) => {
                            const isChosen = userSelected === oIdx;
                            const showAns = userSelected !== undefined;

                            return (
                              <button
                                key={oIdx}
                                onClick={() => setActiveQuizSelected({ ...activeQuizSelected, [block.id]: oIdx })}
                                className={`p-3 rounded-xl text-xs font-bold text-left transition-all border cursor-pointer ${
                                  showAns
                                    ? oIdx === qq.correctIndex
                                      ? 'bg-emerald-600 text-white border-emerald-500'
                                      : isChosen
                                        ? 'bg-rose-600 text-white border-rose-500'
                                        : 'border-slate-200 text-slate-400 opacity-60'
                                    : readerTheme === 'LIGHT'
                                      ? 'border-slate-200 bg-white text-slate-800 hover:border-emerald-500 hover:bg-emerald-50'
                                      : 'border-slate-800 text-slate-300 hover:border-slate-700 hover:bg-slate-800'
                                }`}
                              >
                                {opt}
                              </button>
                            );
                          })}
                        </div>

                        {userSelected !== undefined && (
                          <div className={`p-3 rounded-xl text-xs font-bold ${
                            isCorrect
                              ? 'bg-emerald-500/20 text-emerald-800 border border-emerald-500/30'
                              : 'bg-rose-500/20 text-rose-800 border border-rose-500/30'
                          }`}>
                            {isCorrect ? '✅ Correct! ' : '❌ Try again. '} {qq.explanation}
                          </div>
                        )}
                      </div>
                    );

                  case 'TIP':
                    return (
                      <div key={block.id} className={`rounded-2xl p-4 text-xs leading-relaxed flex items-start gap-2.5 border ${
                        readerTheme === 'LIGHT'
                          ? 'bg-amber-50/90 border-amber-300/80 text-amber-950 font-sans'
                          : 'bg-emerald-950/40 border-emerald-500/30 text-emerald-300'
                      }`}>
                        <Sparkles className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                        <div>{block.text}</div>
                      </div>
                    );

                  default:
                    return null;
                }
              })}

              {/* Render Full Interactive Consonant + Vowel Combination Chart for Lesson 4 of Module 02 */}
              {selectedModule.id === 'module-02' && selectedLesson.lessonNumber === 4 && (
                <div className="space-y-4 pt-4 border-t border-emerald-500/30">
                  <div className="flex items-center justify-between flex-wrap gap-2">
                    <h3 className="text-sm font-black uppercase tracking-wider text-emerald-600 flex items-center gap-2">
                      <span>🧱</span> Full Consonant + Vowel Combination Master Chart
                    </h3>
                    <span className="text-[10px] text-slate-500 font-bold">Click any cell to hear pronunciation</span>
                  </div>

                  <div className={`border rounded-3xl p-4 sm:p-6 shadow-xl space-y-4 ${
                    readerTheme === 'LIGHT' ? 'bg-amber-50/50 border-amber-200' : 'bg-slate-950 border-slate-800'
                  }`}>
                    {/* Sub-Tabs for Combinations */}
                    <div className={`flex items-center gap-1.5 p-1 rounded-2xl border flex-wrap ${
                      readerTheme === 'LIGHT' ? 'bg-white border-slate-200' : 'bg-slate-900 border-slate-800'
                    }`}>
                      {[
                        { id: 'BASIC', label: '🌱 Basic Vowels (140자)' },
                        { id: 'DOUBLE', label: '⚡ Double Consonants (50자)' },
                        { id: 'COMPOUND', label: '🧩 Compound Vowels (209자)' },
                        { id: 'ALL', label: '👑 All 399 Master' },
                      ].map((tab) => (
                        <button
                          key={tab.id}
                          onClick={() => setMatrixFilter(tab.id as any)}
                          className={`px-3 py-1.5 rounded-xl text-xs font-black transition-all cursor-pointer ${
                            matrixFilter === tab.id
                              ? 'bg-gradient-to-r from-emerald-600 to-teal-600 text-white shadow-md'
                              : readerTheme === 'LIGHT'
                                ? 'text-slate-700 hover:bg-slate-100'
                                : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
                          }`}
                        >
                          {tab.label}
                        </button>
                      ))}
                    </div>

                    <div className="overflow-x-auto scrollbar-thin scrollbar-thumb-slate-700">
                      {(() => {
                        const BASIC_CONSONANTS = [
                          { char: 'ㄱ', initIdx: 0, name: 'Giyeok' },
                          { char: 'ㄴ', initIdx: 2, name: 'Nieun' },
                          { char: 'ㄷ', initIdx: 3, name: 'Digeut' },
                          { char: 'ㄹ', initIdx: 5, name: 'Rieul' },
                          { char: 'ㅁ', initIdx: 6, name: 'Mieum' },
                          { char: 'ㅂ', initIdx: 7, name: 'Bieup' },
                          { char: 'ㅅ', initIdx: 9, name: 'Siot' },
                          { char: 'ㅇ', initIdx: 11, name: 'Ieung' },
                          { char: 'ㅈ', initIdx: 12, name: 'Jieut' },
                          { char: 'ㅊ', initIdx: 14, name: 'Chieut' },
                          { char: 'ㅋ', initIdx: 15, name: 'Kieuk' },
                          { char: 'ㅌ', initIdx: 16, name: 'Tieut' },
                          { char: 'ㅍ', initIdx: 17, name: 'Pieup' },
                          { char: 'ㅎ', initIdx: 18, name: 'Hieut' },
                        ];
                        const DOUBLE_CONSONANTS = [
                          { char: 'ㄲ', initIdx: 1, name: 'Ssang-Giyeok' },
                          { char: 'ㄸ', initIdx: 4, name: 'Ssang-Digeut' },
                          { char: 'ㅃ', initIdx: 8, name: 'Ssang-Bieup' },
                          { char: 'ㅆ', initIdx: 10, name: 'Ssang-Siot' },
                          { char: 'ㅉ', initIdx: 13, name: 'Ssang-Jieut' },
                        ];
                        const ALL_CONSONANTS = [...BASIC_CONSONANTS, ...DOUBLE_CONSONANTS].sort((a, b) => a.initIdx - b.initIdx);

                        const BASIC_VOWELS = [
                          { label: 'ㅏ(a)', vIdx: 0 },
                          { label: 'ㅑ(ya)', vIdx: 2 },
                          { label: 'ㅓ(eo)', vIdx: 4 },
                          { label: 'ㅕ(yeo)', vIdx: 6 },
                          { label: 'ㅗ(o)', vIdx: 8 },
                          { label: 'ㅛ(yo)', vIdx: 12 },
                          { label: 'ㅜ(u)', vIdx: 13 },
                          { label: 'ㅠ(yu)', vIdx: 17 },
                          { label: 'ㅡ(eu)', vIdx: 18 },
                          { label: 'ㅣ(i)', vIdx: 20 },
                        ];
                        const COMPOUND_VOWELS = [
                          { label: 'ㅐ(ae)', vIdx: 1 },
                          { label: 'ㅒ(yae)', vIdx: 3 },
                          { label: 'ㅔ(e)', vIdx: 5 },
                          { label: 'ㅖ(ye)', vIdx: 7 },
                          { label: 'ㅘ(wa)', vIdx: 9 },
                          { label: 'ㅙ(wae)', vIdx: 10 },
                          { label: 'ㅚ(oe)', vIdx: 11 },
                          { label: 'ㅝ(wo)', vIdx: 14 },
                          { label: 'ㅞ(we)', vIdx: 15 },
                          { label: 'ㅟ(wi)', vIdx: 16 },
                          { label: 'ㅢ(ui)', vIdx: 19 },
                        ];
                        const ALL_VOWELS = [...BASIC_VOWELS, ...COMPOUND_VOWELS].sort((a, b) => a.vIdx - b.vIdx);

                        const currentConsonants = matrixFilter === 'BASIC' ? BASIC_CONSONANTS : matrixFilter === 'DOUBLE' ? DOUBLE_CONSONANTS : ALL_CONSONANTS;
                        const currentVowels = matrixFilter === 'BASIC' || matrixFilter === 'DOUBLE' ? BASIC_VOWELS : matrixFilter === 'COMPOUND' ? COMPOUND_VOWELS : ALL_VOWELS;

                        return (
                          <table className="w-full text-center border-collapse text-xs">
                            <thead>
                              <tr className={`border-b font-black ${
                                readerTheme === 'LIGHT' ? 'bg-emerald-100 text-emerald-950 border-emerald-200' : 'bg-slate-900 text-emerald-400 border-slate-800'
                              }`}>
                                <th className="p-2 border-r border-slate-300/50">C \ V</th>
                                {currentVowels.map((vObj, idx) => (
                                  <th key={idx} className="p-2 min-w-[48px]">{vObj.label}</th>
                                ))}
                              </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-300/40 font-jp">
                              {currentConsonants.map((con) => (
                                <tr key={con.char} className={readerTheme === 'LIGHT' ? 'hover:bg-amber-100/50' : 'hover:bg-slate-900/50'}>
                                  <td className={`p-2 border-r font-black ${
                                    readerTheme === 'LIGHT' ? 'bg-emerald-50 text-emerald-900 border-slate-200' : 'bg-slate-950 text-emerald-400 border-slate-800'
                                  }`}>
                                    {con.char} <span className="text-[9px] font-mono text-slate-500 font-normal">({con.name})</span>
                                  </td>
                                  {currentVowels.map((vObj) => {
                                    const syllableChar = String.fromCharCode(0xAC00 + con.initIdx * 588 + vObj.vIdx * 28);
                                    return (
                                      <td key={vObj.vIdx} className="p-1">
                                        <button
                                          onClick={() => playAudio(syllableChar)}
                                          className={`w-full py-2 px-1 rounded-xl font-bold text-sm transition-all cursor-pointer shadow-sm active:scale-95 border ${
                                            readerTheme === 'LIGHT'
                                              ? 'bg-white border-slate-200 text-slate-900 hover:border-emerald-500 hover:bg-emerald-50 text-emerald-900'
                                              : 'bg-slate-950 border-slate-800 text-slate-100 hover:border-emerald-500 hover:bg-emerald-500/20 hover:text-emerald-300'
                                          }`}
                                          title={`Listen to ${syllableChar}`}
                                        >
                                          {syllableChar}
                                        </button>
                                      </td>
                                    );
                                  })}
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        );
                      })()}
                    </div>
                  </div>
                </div>
              )}
              {/* ──────────────────────────────────────────────────────────── */}
              {/* MODULE MASTERY MCQ QUIZ AT THE END OF EVERY MODULE */}
              {/* ──────────────────────────────────────────────────────────── */}
              {(() => {
                const MODULE_MASTERY_QUIZZES: Record<string, { question: string; options: string[]; correctIndex: number; explanation: string }[]> = {
                  'module-01': [
                    {
                      question: 'Who created the Korean alphabet Hangeul in 1443?',
                      options: ['King Sejong the Great', 'General Yi Sun-sin', 'Emperor Gojong', 'King Taejo'],
                      correctIndex: 0,
                      explanation: 'King Sejong the Great created Hangeul in 1443 so all common people could read and write.',
                    },
                    {
                      question: 'What are the 3 natural philosophical elements of Hangeul vowels?',
                      options: ['Sun, Moon, Stars', 'Sky (•), Earth (ㅡ), Human (ㅣ)', 'Fire, Water, Earth', 'East, West, South'],
                      correctIndex: 1,
                      explanation: 'Hangeul vowels represent Sky (•), Earth (ㅡ), and Human (ㅣ).',
                    },
                    {
                      question: 'What is the standard Korean sentence word order?',
                      options: ['Subject + Verb + Object (SVO)', 'Subject + Object + Verb (SOV)', 'Verb + Subject + Object (VSO)', 'Object + Subject + Verb (OSV)'],
                      correctIndex: 1,
                      explanation: 'Korean sentences follow Subject + Object + Verb (SOV), placing the main verb at the very end.',
                    },
                  ],
                  'module-02': [
                    {
                      question: 'How many basic consonants and basic vowels are in Hangeul?',
                      options: ['10 Consonants & 14 Vowels', '14 Basic Consonants & 10 Basic Vowels', '21 Consonants & 19 Vowels', '5 Consonants & 11 Vowels'],
                      correctIndex: 1,
                      explanation: 'Hangeul has 14 Basic Consonants (ㄱ~ㅎ) and 10 Basic Vowels (ㅏ~ㅣ).',
                    },
                    {
                      question: 'Which consonant acts as a silent placeholder at the top of a vowel block, and as "ng" at the bottom (Batchim)?',
                      options: ['ㄱ (Giyeok)', 'ㄴ (Nieun)', 'ㅇ (Ieung)', 'ㅁ (Mieum)'],
                      correctIndex: 2,
                      explanation: 'ㅇ (Ieung) is silent as an initial consonant, and sounds like "ng" at the bottom (Batchim).',
                    },
                    {
                      question: 'How many syllable blocks are formed by combining 14 basic consonants × 10 basic vowels?',
                      options: ['50 Blocks', '100 Blocks', '140 Syllable Blocks', '399 Blocks'],
                      correctIndex: 2,
                      explanation: '14 Consonants × 10 Vowels = 140 core syllable blocks (가, 나, 다... 하).',
                    },
                  ],
                  'module-03': [
                    {
                      question: 'What happens when a final consonant (Batchim) is followed by a silent vowel block "ㅇ"?',
                      options: ['The batchim becomes silent', 'The batchim links into the next vowel sound (연음)', 'The vowel changes to "ㅡ"', 'No change happens'],
                      correctIndex: 1,
                      explanation: 'Under sound linking (연음), the batchim consonant slides up to replace the silent ㅇ.',
                    },
                  ],
                  'module-04': [
                    {
                      question: 'Which number system is used for money (원), phone numbers, dates, and minutes?',
                      options: ['Native Korean (하나, 둘, 셋...)', 'Sino-Korean (일, 이, 삼...)', 'English Numbers', 'Roman Numerals'],
                      correctIndex: 1,
                      explanation: 'Sino-Korean numbers (일, 이, 삼...) are used for money, dates, phone numbers, and minutes.',
                    },
                    {
                      question: 'Which number system is used for telling hours (시) and age (살)?',
                      options: ['Sino-Korean (일, 이, 삼...)', 'Native Korean (하나, 둘, 셋...)', 'Chinese Kanji', 'Attributive Numbers'],
                      correctIndex: 1,
                      explanation: 'Native Korean numbers (하나, 둘, 셋...) are used for telling hours (시) and age (살).',
                    },
                  ],
                  'module-05': [
                    {
                      question: 'What is the polite Korean word for "Father"?',
                      options: ['어머니', '아버지', '형', '누나'],
                      correctIndex: 1,
                      explanation: '아버지 (abeoji) is the polite Korean word for Father.',
                    },
                    {
                      question: 'How do you politely say "Please give me water" in Korean?',
                      options: ['물 좀 주세요', '밥 먹어요', '감사합니다', '안녕하세요'],
                      correctIndex: 0,
                      explanation: '물 (water) + 좀 (please) + 주세요 (give me) = 물 좀 주세요.',
                    },
                  ],
                  'module-06': [
                    {
                      question: 'Which topic marker is attached after a noun ending in a vowel?',
                      options: ['은', '는', '이', '가'],
                      correctIndex: 1,
                      explanation: 'Use 는 after a noun ending in a vowel (e.g. 저는). Use 은 after a noun ending in a consonant.',
                    },
                  ],
                  'module-07': [
                    {
                      question: 'How do you ask "How much is this?" when shopping in Korea?',
                      options: ['안녕하세요?', '이거 얼마예요?', '감사합니다', '어디에 있어요?'],
                      correctIndex: 1,
                      explanation: '이거 얼마예요? (I-geo eol-ma-ye-yo?) means "How much is this?".',
                    },
                    {
                      question: 'What is the emergency telephone number in Korea for medical/fire help?',
                      options: ['911', '119', '112', '100'],
                      correctIndex: 1,
                      explanation: '119 is the emergency service number in South Korea for ambulances and fire department.',
                    },
                  ],
                };

                const quizList = MODULE_MASTERY_QUIZZES[selectedModule.id];
                if (!quizList || quizList.length === 0) return null;

                return (
                  <div className="space-y-4 pt-6 border-t border-emerald-500/30">
                    <div className="flex items-center justify-between">
                      <h3 className="text-sm font-black uppercase tracking-wider text-amber-600 flex items-center gap-2">
                        <HelpCircle className="w-4 h-4" /> Module {selectedModule.moduleNumber} Mastery Assessment (MCQ Quiz)
                      </h3>
                      <span className="text-[10px] text-slate-500 font-bold">Test your module knowledge</span>
                    </div>

                    <div className={`rounded-3xl p-5 sm:p-6 border shadow-xl space-y-5 ${
                      readerTheme === 'LIGHT' ? 'bg-amber-50/40 border-amber-200' : 'bg-slate-950 border-slate-800'
                    }`}>
                      {quizList.map((mq, qIdx) => {
                        const quizId = `${selectedModule.id}_mastery_${qIdx}`;
                        const userSelected = activeQuizSelected[quizId];
                        const isCorrect = userSelected === mq.correctIndex;

                        return (
                          <div key={quizId} className={`p-4 rounded-2xl border space-y-3 ${
                            readerTheme === 'LIGHT' ? 'bg-white border-slate-200' : 'bg-slate-900 border-slate-800'
                          }`}>
                            <div className={`text-xs font-extrabold ${readerTheme === 'LIGHT' ? 'text-slate-900' : 'text-white'}`}>
                              Q{qIdx + 1}. {mq.question}
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                              {mq.options.map((opt, oIdx) => {
                                const isOptSelected = userSelected === oIdx;
                                const isOptCorrect = mq.correctIndex === oIdx;

                                let btnStyle = readerTheme === 'LIGHT'
                                  ? 'bg-slate-50 border-slate-200 text-slate-800 hover:bg-emerald-50 hover:border-emerald-400'
                                  : 'bg-slate-950 border-slate-800 text-slate-200 hover:bg-slate-800';

                                if (userSelected !== undefined) {
                                  if (isOptCorrect) {
                                    btnStyle = 'bg-emerald-600 text-white border-emerald-500 font-black';
                                  } else if (isOptSelected) {
                                    btnStyle = 'bg-rose-600 text-white border-rose-500 font-black';
                                  }
                                }

                                return (
                                  <button
                                    key={oIdx}
                                    onClick={() => setActiveQuizSelected({ ...activeQuizSelected, [quizId]: oIdx })}
                                    className={`p-2.5 rounded-xl text-xs font-bold text-left transition-all border cursor-pointer ${btnStyle}`}
                                  >
                                    {opt}
                                  </button>
                                );
                              })}
                            </div>

                            {userSelected !== undefined && (
                              <div className={`p-3 rounded-xl text-xs font-bold ${
                                isCorrect
                                  ? 'bg-emerald-500/20 text-emerald-800 border border-emerald-500/30'
                                  : 'bg-rose-500/20 text-rose-800 border border-rose-500/30'
                              }`}>
                                {isCorrect ? '✅ Correct! ' : '❌ Incorrect. '} {mq.explanation}
                              </div>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  </div>
                );
              })()}
            </div>

            {/* Bottom Lesson Navigation Bar */}
            <div className={`flex flex-col sm:flex-row items-center justify-between pt-6 border-t gap-3 ${
              readerTheme === 'LIGHT' ? 'border-slate-200' : 'border-slate-800'
            }`}>
              <button
                onClick={() => navigateLesson('PREV')}
                className={`w-full sm:w-auto px-5 py-3 rounded-xl text-xs font-extrabold transition-all flex items-center justify-center gap-1.5 border cursor-pointer ${
                  readerTheme === 'LIGHT'
                    ? 'bg-slate-100 hover:bg-slate-200 text-slate-800 border-slate-300'
                    : 'bg-slate-800 hover:bg-slate-700 text-white border-slate-700'
                }`}
              >
                <ChevronLeft className="w-4 h-4" />
                <span>Previous Lesson</span>
              </button>

              <button
                onClick={() => navigateLesson('NEXT')}
                className="w-full sm:w-auto px-6 py-3 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white text-xs font-black transition-all flex items-center justify-center gap-2 shadow-glow cursor-pointer"
              >
                <span>Complete &amp; Next</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
      )}
                                {/* ──────────────────────────────────────────────────────────── */}
      {/* 5. IN-PAGE PLACEMENT TEST VIEW (White Book Background) */}
      {/* ──────────────────────────────────────────────────────────── */}
      {activeView === 'PLACEMENT_TEST' && (
        <div className="bg-white text-slate-900 border border-slate-200/90 shadow-2xl rounded-3xl p-6 sm:p-8 font-sans max-w-4xl mx-auto w-full space-y-6">
          <div className="flex items-center justify-between border-b border-slate-200 pb-4">
            <button
              onClick={() => setActiveView('LESSON_READER')}
              className="flex items-center gap-1.5 text-xs font-black text-slate-600 hover:text-emerald-700 transition-colors cursor-pointer"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back to Course Reader</span>
            </button>
            <span className="text-xs font-black text-emerald-600 uppercase tracking-wider">Diagnostic Placement Assessment</span>
          </div>

          <div className="space-y-2">
            <div className="flex items-center gap-2 text-emerald-700 text-sm font-black uppercase tracking-wider">
              <Target className="w-5 h-5 text-emerald-600" /> Korean Basics Skill Placement Test
            </div>
            <h2 className="text-2xl font-black text-slate-900">Evaluate Your Korean Foundation Level</h2>
            <p className="text-xs text-slate-600 leading-relaxed">
              Answer these 5 diagnostic questions to evaluate your Hangeul reading speed, vocabulary recognition, and grammar rules in English 🇬🇧 and Nepali 🇳🇵.
            </p>
          </div>

          {!placementResult ? (
            <div className="space-y-6">
              <div className="space-y-4">
                {PLACEMENT_TEST_QUESTIONS.map((pq, qIdx) => (
                  <div key={pq.id} className="bg-amber-50/50 p-5 rounded-2xl border border-amber-200 space-y-3 shadow-sm">
                    <div className="text-sm font-extrabold text-slate-900">
                      Q{qIdx + 1}. {pq.question}
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                      {pq.options.map((opt, oIdx) => (
                        <button
                          key={oIdx}
                          onClick={() => setPlacementAnswers({ ...placementAnswers, [pq.id]: oIdx })}
                          className={`p-3 rounded-xl text-xs text-left font-bold border transition-all cursor-pointer ${
                            placementAnswers[pq.id] === oIdx
                              ? 'bg-emerald-600 text-white border-emerald-500 shadow-md'
                              : 'bg-white border-slate-200 text-slate-800 hover:bg-emerald-50 hover:border-emerald-300'
                          }`}
                        >
                          {opt}
                        </button>
                      ))}
                    </div>
                  </div>
                ))}
              </div>

              <button
                onClick={handlePlacementSubmit}
                disabled={Object.keys(placementAnswers).length < PLACEMENT_TEST_QUESTIONS.length}
                className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-emerald-600 via-teal-600 to-cyan-600 hover:from-emerald-500 hover:to-teal-500 text-white font-black text-xs shadow-glow transition-all cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed"
              >
                Submit &amp; View Recommended Starting Module
              </button>
            </div>
          ) : (
            <div className="text-center space-y-5 py-6 bg-emerald-50/60 rounded-3xl border border-emerald-200 p-6">
              <div className="w-16 h-16 rounded-full bg-emerald-600 text-white flex items-center justify-center mx-auto text-3xl shadow-lg">
                🎯
              </div>
              <div className="space-y-1">
                <div className="text-xs text-emerald-800 font-black uppercase tracking-wider">Recommended Starting Point</div>
                <h3 className="text-2xl font-black text-slate-900">{placementResult}</h3>
                <p className="text-xs text-slate-600 max-w-md mx-auto pt-1">
                  Based on your test score, we recommend launching your learning at this module!
                </p>
              </div>

              <button
                onClick={() => {
                  setActiveView('LESSON_READER');
                }}
                className="px-6 py-3 rounded-2xl bg-emerald-600 hover:bg-emerald-500 text-white font-black text-xs transition-all cursor-pointer shadow-glow"
              >
                Go to Recommended Module ➔
              </button>
            </div>
          )}
        </div>
      )}

      {/* ──────────────────────────────────────────────────────────── */}
      {/* 6. IN-PAGE HANGEUL MATRIX VIEW (White Book Background) */}
      {/* ──────────────────────────────────────────────────────────── */}
      {activeView === 'HANGEUL_MATRIX' && (
        <div className="bg-white text-slate-900 border border-slate-200/90 shadow-2xl rounded-3xl p-6 sm:p-8 font-sans max-w-5xl mx-auto w-full space-y-6">
          <div className="flex items-center justify-between border-b border-slate-200 pb-4">
            <button
              onClick={() => setActiveView('LESSON_READER')}
              className="flex items-center gap-1.5 text-xs font-black text-slate-600 hover:text-emerald-700 transition-colors cursor-pointer"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back to Course Reader</span>
            </button>
            <span className="text-xs font-black text-emerald-600 uppercase tracking-wider">399 Syllable Master Combination Matrix</span>
          </div>

          <div className="space-y-2">
            <h2 className="text-2xl font-black text-slate-900 flex items-center gap-2">
              <span>👑</span> Full Hangeul Syllable Combination Master Chart
            </h2>
            <p className="text-xs text-slate-600 leading-relaxed">
              Explore all 399 Korean syllable blocks formed by combining 19 Consonants (Initial) with 21 Vowels (Core). Click any cell in the chart below to hear native Web Speech audio pronunciation!
            </p>
          </div>

          {/* Sub-Tabs for Matrix Filter */}
          <div className="flex items-center gap-2 p-1.5 bg-slate-100 rounded-2xl border border-slate-200 flex-wrap">
            {[
              { id: 'BASIC', label: '🌱 Basic Vowels (140 Syllables)' },
              { id: 'DOUBLE', label: '⚡ Double Consonants (50 Syllables)' },
              { id: 'COMPOUND', label: '🧩 Compound Vowels (209 Syllables)' },
              { id: 'ALL', label: '👑 All 399 Master Grid' },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setMatrixFilter(tab.id as any)}
                className={`px-3.5 py-2 rounded-xl text-xs font-black transition-all cursor-pointer ${
                  matrixFilter === tab.id
                    ? 'bg-gradient-to-r from-emerald-600 to-teal-600 text-white shadow-md'
                    : 'text-slate-700 hover:bg-slate-200'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Syllable Combination Table */}
          <div className="overflow-x-auto scrollbar-thin scrollbar-thumb-slate-300 bg-amber-50/50 border border-amber-200 rounded-2xl p-4 sm:p-6 shadow-sm">
            {(() => {
              const BASIC_CONSONANTS = [
                { char: 'ㄱ', initIdx: 0 }, { char: 'ㄴ', initIdx: 2 }, { char: 'ㄷ', initIdx: 3 },
                { char: 'ㄹ', initIdx: 5 }, { char: 'ㅁ', initIdx: 6 }, { char: 'ㅂ', initIdx: 7 },
                { char: 'ㅅ', initIdx: 9 }, { char: 'ㅇ', initIdx: 11 }, { char: 'ㅈ', initIdx: 12 },
                { char: 'ㅊ', initIdx: 14 }, { char: 'ㅋ', initIdx: 15 }, { char: 'ㅌ', initIdx: 16 },
                { char: 'ㅍ', initIdx: 17 }, { char: 'ㅎ', initIdx: 18 },
              ];
              const DOUBLE_CONSONANTS = [
                { char: 'ㄲ', initIdx: 1 }, { char: 'ㄸ', initIdx: 4 }, { char: 'ㅃ', initIdx: 8 },
                { char: 'ㅆ', initIdx: 10 }, { char: 'ㅉ', initIdx: 13 },
              ];
              const BASIC_VOWELS = [
                { char: 'ㅏ', vIdx: 0 }, { char: 'ㅑ', vIdx: 2 }, { char: 'ㅓ', vIdx: 4 },
                { char: 'ㅕ', vIdx: 6 }, { char: 'ㅗ', vIdx: 8 }, { char: 'ㅛ', vIdx: 12 },
                { char: 'ㅜ', vIdx: 13 }, { char: 'ㅠ', vIdx: 17 }, { char: 'ㅡ', vIdx: 18 },
                { char: 'ㅣ', vIdx: 20 },
              ];
              const COMPOUND_VOWELS = [
                { char: 'ㅐ', vIdx: 1 }, { char: 'ㅒ', vIdx: 3 }, { char: 'ㅔ', vIdx: 5 },
                { char: 'ㅖ', vIdx: 7 }, { char: 'ㅘ', vIdx: 9 }, { char: 'ㅙ', vIdx: 10 },
                { char: 'ㅚ', vIdx: 11 }, { char: 'ㅝ', vIdx: 14 }, { char: 'ㅞ', vIdx: 15 },
                { char: 'ㅟ', vIdx: 16 }, { char: 'ㅢ', vIdx: 19 },
              ];

              let currentConsonants = BASIC_CONSONANTS;
              let currentVowels = BASIC_VOWELS;

              if (matrixFilter === 'DOUBLE') {
                currentConsonants = DOUBLE_CONSONANTS;
                currentVowels = BASIC_VOWELS;
              } else if (matrixFilter === 'COMPOUND') {
                currentConsonants = [...BASIC_CONSONANTS, ...DOUBLE_CONSONANTS];
                currentVowels = COMPOUND_VOWELS;
              } else if (matrixFilter === 'ALL') {
                currentConsonants = [...BASIC_CONSONANTS, ...DOUBLE_CONSONANTS];
                currentVowels = [...BASIC_VOWELS, ...COMPOUND_VOWELS];
              }

              return (
                <table className="w-full text-center border-collapse">
                  <thead>
                    <tr>
                      <th className="p-2 border border-slate-200 text-xs font-black text-slate-700 bg-white">Consonant / Vowel</th>
                      {currentVowels.map((v) => (
                        <th key={v.char} className="p-2 border border-slate-200 text-sm font-black text-emerald-700 bg-emerald-50">
                          {v.char}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {currentConsonants.map((c) => (
                      <tr key={c.char}>
                        <td className="p-2 border border-slate-200 text-sm font-black text-amber-700 bg-amber-50">
                          {c.char}
                        </td>
                        {currentVowels.map((v) => {
                          const syllableCode = 0xAC00 + c.initIdx * 588 + v.vIdx * 28;
                          const syllableChar = String.fromCharCode(syllableCode);

                          return (
                            <td
                              key={v.char}
                              onClick={() => playAudio(syllableChar)}
                              className="p-2 border border-slate-200 text-base font-black font-jp text-slate-900 hover:bg-emerald-600 hover:text-white transition-all cursor-pointer bg-white"
                              title={`Click to listen: ${syllableChar}`}
                            >
                              {syllableChar}
                            </td>
                          );
                        })}
                      </tr>
                    ))}
                  </tbody>
                </table>
              );
            })()}
          </div>
        </div>
      )}      {/* ──────────────────────────────────────────────────────────── */}
      {/* 6. COURSE PROGRESS & MILESTONE ROADMAP MODAL */}
      {/* ──────────────────────────────────────────────────────────── */}
      {showProgressModal && (
        <div className="fixed inset-0 z-[200] bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 max-w-2xl w-full shadow-2xl space-y-6 max-h-[85vh] overflow-y-auto scrollbar-thin scrollbar-thumb-slate-700">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div className="flex items-center gap-2 text-emerald-400 text-sm font-black uppercase tracking-wider">
                <Award className="w-5 h-5 text-emerald-400" /> Korean Basics Progress &amp; Milestone Roadmap
              </div>
              <button onClick={() => setShowProgressModal(false)} className="text-slate-400 hover:text-white cursor-pointer p-1 rounded-lg bg-slate-800 hover:bg-slate-700">
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Progress Bar Header */}
            <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-black uppercase text-slate-300">Overall Foundation Progress</span>
                <span className="text-xs font-black text-emerald-400">{overallPercentage}% ({completedCount}/{totalLessonsCount} Lessons Completed)</span>
              </div>
              <div className="w-full bg-slate-900 h-3 rounded-full overflow-hidden border border-slate-800">
                <div className="bg-gradient-to-r from-emerald-500 to-teal-400 h-full transition-all duration-500" style={{ width: `${overallPercentage}%` }} />
              </div>
            </div>

            {/* 12 Modules Roadmap Milestone List */}
            <div className="space-y-3">
              <div className="text-xs font-black uppercase tracking-wider text-slate-400">12 Modules Roadmap Checklist</div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {KOREAN_BASICS_MODULES.map((m) => {
                  const mProg = getModuleProgress(m);
                  const isCurrent = m.id === selectedModule.id;

                  return (
                    <div
                      key={m.id}
                      onClick={() => {
                        setSelectedModule(m);
                        setSelectedLesson(m.lessons[0]);
                        setShowProgressModal(false);
                      }}
                      className={`p-3 rounded-2xl border transition-all cursor-pointer flex items-center justify-between group ${
                        isCurrent
                          ? 'bg-emerald-950/80 border-emerald-500/50 text-white shadow-lg'
                          : mProg.isComplete
                            ? 'bg-slate-950/90 border-emerald-500/30 text-emerald-300 hover:bg-slate-850'
                            : 'bg-slate-950/60 border-slate-800 text-slate-300 hover:bg-slate-800'
                      }`}
                    >
                      <div className="flex items-center gap-3 min-w-0">
                        <span className="text-2xl">{m.emoji}</span>
                        <div className="truncate">
                          <div className="text-xs font-bold truncate group-hover:text-emerald-300">
                            Mod {m.moduleNumber}: {m.title}
                          </div>
                          <div className="text-[10px] text-slate-400 truncate">
                            {mProg.completed}/{mProg.total} Lessons ({mProg.percentage}%)
                          </div>
                        </div>
                      </div>

                      {mProg.isComplete ? (
                        <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                      ) : (
                        <ChevronRight className="w-4 h-4 text-slate-500 group-hover:text-emerald-400 shrink-0" />
                      )}
                    </div>
                  );
                })}
              </div>
            </div>

            <button
              onClick={() => setShowProgressModal(false)}
              className="w-full py-3 rounded-2xl bg-emerald-600 hover:bg-emerald-500 text-white font-black text-xs shadow-glow transition-all cursor-pointer"
            >
              Resume Lesson Reading
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
