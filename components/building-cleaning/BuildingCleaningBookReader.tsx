'use client';
import React, { useState, useEffect, useMemo } from 'react';
import Link from 'next/link';
import {
  ArrowLeft,
  BookOpen,
  CheckCircle2,
  XCircle,
  AlertTriangle,
  Lightbulb,
  Award,
  RotateCcw,
  Sparkles,
  Search,
  Check,
  ChevronRight,
  ChevronLeft,
  Languages,
  Eye,
  EyeOff,
  Flame,
  HelpCircle,
  Wrench,
  Bookmark,
  Share2,
  Download,
  Clock,
  Timer
} from 'lucide-react';
import {
  BUILDING_CLEANING_BOOK_DATA,
  BookChapter,
  SectionTestQuestion,
  BookVocabItem
} from '@/lib/building-cleaning-book-data';
import FuriganaText from './FuriganaText';
import {
  VacuumCleanerDiagram,
  FloorPolisherDiagram,
  CarpetExtractorDiagram,
  GlassSqueegeeDiagram,
  ColorCodedMopsDiagram,
  ChemicalPHChart,
  WorkplaceConversationCard,
  StepladderSafetyDiagram,
  PersonalProtectiveEquipmentDiagram,
  AutoScrubberDiagram,
  FloorBlowerDiagram
} from './CleaningEquipmentDiagrams';

interface Props {
  country?: string;
}

export default function BuildingCleaningBookReader({ country = 'japan' }: Props) {
  const [selectedChapterId, setSelectedChapterId] = useState<number>(1);
  const [showNepali, setShowNepali] = useState<boolean>(true);
  const [furiganaMode, setFuriganaMode] = useState<'katakana' | 'hiragana' | 'off'>('katakana');
  const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(true);
  const [activeView, setActiveView] = useState<'reader' | 'equipment-guide' | 'mock-exam' | 'glossary'>('reader');

  const isFuriganaOn = furiganaMode !== 'off';
  const furiganaType = furiganaMode === 'katakana' ? 'katakana' : 'hiragana';
  const showFurigana = isFuriganaOn;
  
  // Section test answers state: { [questionId]: selectedOptionIndex }
  const [testAnswers, setTestAnswers] = useState<Record<string, number>>({});
  // Submitted status per section
  const [submittedSections, setSubmittedSections] = useState<Record<number, boolean>>({});
  // Final Mock Exam state
  const [mockExamAnswers, setMockExamAnswers] = useState<Record<string, number>>({});
  const [mockExamSubmitted, setMockExamSubmitted] = useState<boolean>(false);
  const [mockExamTimeLeft, setMockExamTimeLeft] = useState<number>(3600); // 60 minutes in seconds
  // Glossary search & filter
  const [glossarySearch, setGlossarySearch] = useState<string>('');
  const [glossaryCategory, setGlossaryCategory] = useState<string>('ALL');

  // Load progress from localStorage
  useEffect(() => {
    try {
      const savedAnswers = localStorage.getItem('lg_bc_test_answers');
      if (savedAnswers) setTestAnswers(JSON.parse(savedAnswers));

      const savedSubmissions = localStorage.getItem('lg_bc_submitted_sections');
      if (savedSubmissions) setSubmittedSections(JSON.parse(savedSubmissions));
    } catch {
      // Ignore localStorage read errors
    }
  }, []);

  const currentChapter = useMemo(() => {
    return BUILDING_CLEANING_BOOK_DATA.chapters.find((c) => c.id === selectedChapterId) || BUILDING_CLEANING_BOOK_DATA.chapters[0];
  }, [selectedChapterId]);

  const handleSelectOption = (qId: string, optIdx: number, sectionId: number) => {
    const updated = { ...testAnswers, [qId]: optIdx };
    setTestAnswers(updated);
    try {
      localStorage.setItem('lg_bc_test_answers', JSON.stringify(updated));
    } catch {}
  };

  const handleCheckSectionAnswers = (chapterId: number) => {
    const updatedSubmissions = { ...submittedSections, [chapterId]: true };
    setSubmittedSections(updatedSubmissions);
    try {
      localStorage.setItem('lg_bc_submitted_sections', JSON.stringify(updatedSubmissions));
    } catch {}
  };

  const handleResetSection = (chapter: BookChapter) => {
    const updatedAnswers = { ...testAnswers };
    chapter.sectionTest.forEach((q) => {
      delete updatedAnswers[q.id];
    });
    setTestAnswers(updatedAnswers);
    const updatedSubmissions = { ...submittedSections, [chapter.id]: false };
    setSubmittedSections(updatedSubmissions);
    try {
      localStorage.setItem('lg_bc_test_answers', JSON.stringify(updatedAnswers));
      localStorage.setItem('lg_bc_submitted_sections', JSON.stringify(updatedSubmissions));
    } catch {}
  };

  const getChapterScore = (chapter: BookChapter) => {
    let score = 0;
    chapter.sectionTest.forEach((q) => {
      if (testAnswers[q.id] === q.correctAnswer) score++;
    });
    return score;
  };

  // Mock Exam timer (60 minutes)
  useEffect(() => {
    let timer: NodeJS.Timeout | null = null;
    if (activeView === 'mock-exam' && !mockExamSubmitted && mockExamTimeLeft > 0) {
      timer = setInterval(() => {
        setMockExamTimeLeft((prev) => {
          if (prev <= 1) {
            setMockExamSubmitted(true);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => {
      if (timer) clearInterval(timer);
    };
  }, [activeView, mockExamSubmitted, mockExamTimeLeft]);

  const formatMockTime = (totalSeconds: number) => {
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  };

  // Mock Exam scoring
  const calculateMockScore = () => {
    let score = 0;
    BUILDING_CLEANING_BOOK_DATA.finalModelExam.questions.forEach((q) => {
      if (mockExamAnswers[q.id] === q.correctAnswer) score++;
    });
    return score;
  };

  const mockTotal = BUILDING_CLEANING_BOOK_DATA.finalModelExam.questions.length;
  const mockScore = calculateMockScore();
  const mockPercent = Math.round((mockScore / mockTotal) * 100);
  const isMockPassed = mockPercent >= BUILDING_CLEANING_BOOK_DATA.finalModelExam.passScorePercent;
  const mockAnsweredCount = Object.keys(mockExamAnswers).length;

  const mockTFQuestions = useMemo(() => {
    return BUILDING_CLEANING_BOOK_DATA.finalModelExam.questions.filter((q) => q.type === 'TF');
  }, []);

  const mockMCQQuestions = useMemo(() => {
    return BUILDING_CLEANING_BOOK_DATA.finalModelExam.questions.filter((q) => q.type === 'CHOICE');
  }, []);

  const mockTFScore = useMemo(() => {
    return mockTFQuestions.reduce((acc, q) => (mockExamAnswers[q.id] === q.correctAnswer ? acc + 1 : acc), 0);
  }, [mockTFQuestions, mockExamAnswers]);

  const mockMCQScore = useMemo(() => {
    return mockMCQQuestions.reduce((acc, q) => (mockExamAnswers[q.id] === q.correctAnswer ? acc + 1 : acc), 0);
  }, [mockMCQQuestions, mockExamAnswers]);

  // Filtered glossary
  const filteredGlossary = useMemo(() => {
    return BUILDING_CLEANING_BOOK_DATA.glossary.filter((item) => {
      const matchesSearch =
        glossarySearch === '' ||
        item.kanji.toLowerCase().includes(glossarySearch.toLowerCase()) ||
        item.kana.toLowerCase().includes(glossarySearch.toLowerCase()) ||
        item.romaji.toLowerCase().includes(glossarySearch.toLowerCase()) ||
        item.nepali.toLowerCase().includes(glossarySearch.toLowerCase()) ||
        item.english.toLowerCase().includes(glossarySearch.toLowerCase());

      const matchesCat = glossaryCategory === 'ALL' || item.category === glossaryCategory;
      return matchesSearch && matchesCat;
    });
  }, [glossarySearch, glossaryCategory]);

  const glossaryCategories = useMemo(() => {
    const set = new Set<string>();
    BUILDING_CLEANING_BOOK_DATA.glossary.forEach((g) => {
      if (g.category) set.add(g.category);
    });
    return ['ALL', ...Array.from(set)];
  }, []);

  // Total completed sections
  const totalPassedSections = useMemo(() => {
    let count = 0;
    BUILDING_CLEANING_BOOK_DATA.chapters.forEach((ch) => {
      if (submittedSections[ch.id]) {
        const score = getChapterScore(ch);
        if (score >= Math.ceil(ch.sectionTest.length * 0.6)) count++;
      }
    });
    return count;
  }, [submittedSections, testAnswers]);

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col font-sans selection:bg-emerald-100 selection:text-emerald-900">
      
      {/* Top Sticky Navigation Bar - Light & Calm */}
      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200 shadow-xs">
        <div className="max-w-7xl mx-auto px-4 py-3 flex flex-wrap items-center justify-between gap-3">
          
          {/* Left: Back & Title */}
          <div className="flex items-center gap-3">
            <Link
              href={`/${country}/work/building_cleaning`}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 hover:text-slate-900 text-xs font-bold border border-slate-200 transition-colors"
            >
              <ArrowLeft className="w-3.5 h-3.5 text-emerald-600" />
              <span className="hidden sm:inline">Back to Sector Hub</span>
              <span className="sm:hidden">Back</span>
            </Link>

            <div className="flex items-center gap-2">
              <span className="text-xl">🧹</span>
              <div>
                <h1 className="text-xs sm:text-sm font-black text-slate-900 leading-tight">
                  SSW-1 Building Cleaning Official Book
                </h1>
                <p className="text-[10px] text-emerald-700 font-semibold hidden md:block">
                  {BUILDING_CLEANING_BOOK_DATA.titleNe}
                </p>
              </div>
            </div>
          </div>

          {/* Center: Mode Switch Tabs */}
          <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-xl border border-slate-200 text-xs font-bold">
            <button
              onClick={() => setActiveView('reader')}
              className={`px-3 py-1.5 rounded-lg transition-all flex items-center gap-1.5 cursor-pointer ${
                activeView === 'reader'
                  ? 'bg-white text-slate-900 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <BookOpen className="w-3.5 h-3.5 text-emerald-600" />
              <span>12 Chapters</span>
            </button>
            <button
              onClick={() => setActiveView('equipment-guide')}
              className={`px-3 py-1.5 rounded-lg transition-all flex items-center gap-1.5 cursor-pointer ${
                activeView === 'equipment-guide'
                  ? 'bg-white text-slate-900 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Wrench className="w-3.5 h-3.5 text-teal-600" />
              <span>🎨 Equipment Guide</span>
            </button>
            <button
              onClick={() => setActiveView('mock-exam')}
              className={`px-3 py-1.5 rounded-lg transition-all flex items-center gap-1.5 cursor-pointer ${
                activeView === 'mock-exam'
                  ? 'bg-white text-slate-900 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Award className="w-3.5 h-3.5 text-amber-600" />
              <span>CBT Mock Exam</span>
            </button>
            <button
              onClick={() => setActiveView('glossary')}
              className={`px-3 py-1.5 rounded-lg transition-all flex items-center gap-1.5 cursor-pointer ${
                activeView === 'glossary'
                  ? 'bg-white text-slate-900 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Languages className="w-3.5 h-3.5 text-indigo-600" />
              <span>Vocab ({BUILDING_CLEANING_BOOK_DATA.glossary.length})</span>
            </button>
          </div>

          {/* Right: Study Toggles (Nepali & Furigana) */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => setShowNepali(!showNepali)}
              title={showNepali ? 'Hide Nepali (Exam simulation mode)' : 'Show Nepali translation'}
              className={`px-2.5 py-1.5 rounded-xl text-xs font-bold border transition-all flex items-center gap-1.5 cursor-pointer ${
                showNepali
                  ? 'bg-indigo-50 border-indigo-200 text-indigo-800 shadow-xs'
                  : 'bg-white border-slate-200 text-slate-500 hover:bg-slate-50'
              }`}
            >
              <Languages className="w-3.5 h-3.5 text-indigo-600" />
              <span className="hidden sm:inline">Nepali Notes</span>
              <span className="text-[10px] font-black uppercase">{showNepali ? 'ON' : 'OFF'}</span>
            </button>

            <button
              onClick={() => {
                if (furiganaMode === 'katakana') setFuriganaMode('hiragana');
                else if (furiganaMode === 'hiragana') setFuriganaMode('off');
                else setFuriganaMode('katakana');
              }}
              title="Click to cycle: Katakana (カタカナ) → Hiragana (ひらがな) → OFF"
              className={`px-2.5 py-1.5 rounded-xl text-xs font-bold border transition-all flex items-center gap-1.5 cursor-pointer ${
                furiganaMode !== 'off'
                  ? 'bg-emerald-50 border-emerald-200 text-emerald-800 shadow-xs'
                  : 'bg-white border-slate-200 text-slate-500 hover:bg-slate-50'
              }`}
            >
              {furiganaMode !== 'off' ? <Eye className="w-3.5 h-3.5 text-emerald-600" /> : <EyeOff className="w-3.5 h-3.5" />}
              <span className="hidden sm:inline">Furigana</span>
              <span className="text-[10px] font-black uppercase px-1.5 py-0.5 rounded bg-white/80 border border-emerald-200">
                {furiganaMode === 'katakana' ? 'カタカナ' : furiganaMode === 'hiragana' ? 'ひらがな' : 'OFF'}
              </span>
            </button>
          </div>

        </div>

        {/* Global Progress Bar */}
        <div className="w-full bg-slate-100 h-1">
          <div
            className="bg-emerald-500 h-1 transition-all duration-300"
            style={{
              width: `${(totalPassedSections / BUILDING_CLEANING_BOOK_DATA.chapters.length) * 100}%`,
            }}
          />
        </div>
      </header>

      {/* Main Container */}
      <div className="flex-1 max-w-7xl w-full mx-auto px-3 sm:px-6 py-4 grid grid-cols-1 lg:grid-cols-12 gap-4">

        {/* ===================================================================
            VIEW 1: 12-CHAPTER READER & SECTION-BY-SECTION HIGH-CHANCE TESTS
           =================================================================== */}
        {activeView === 'reader' && (
          <>
            {/* Left Sidebar: 12 Chapters TOC - Compact & Independently Scrollable */}
            {isSidebarOpen && (
              <aside className="lg:col-span-4 lg:sticky lg:top-16 lg:h-[calc(100vh-5rem)] flex flex-col space-y-2.5">
                
                {/* Progress Summary Card - Compact */}
                <div className="bg-white border border-slate-200 rounded-2xl p-3.5 shadow-xs space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1.5">
                      <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
                      <span className="text-[11px] font-black uppercase tracking-wider text-slate-700">
                        Study Progress
                      </span>
                    </div>
                    <span className="text-[11px] font-bold text-emerald-800 px-2 py-0.5 rounded-full bg-emerald-50 border border-emerald-200">
                      {totalPassedSections} / {BUILDING_CLEANING_BOOK_DATA.chapters.length} Passed
                    </span>
                  </div>

                  <p className="text-[11px] text-slate-600 leading-snug">
                    Study each chapter and pass the <strong className="text-emerald-700 font-bold">Section CBT Test</strong>.
                  </p>
                </div>

                {/* Chapters List - Independent Scroll Container */}
                <div className="bg-white border border-slate-200 rounded-2xl p-2 shadow-xs flex-1 overflow-y-auto overscroll-contain scrollbar-thin scrollbar-thumb-slate-200 space-y-1">
                  <div className="flex items-center justify-between px-2 py-1">
                    <span className="text-[10px] font-black uppercase text-slate-400">
                      Table of Contents (目次)
                    </span>
                    <span className="text-[10px] font-bold text-slate-400">
                      12 Chapters
                    </span>
                  </div>

                  {BUILDING_CLEANING_BOOK_DATA.chapters.map((ch) => {
                    const isSelected = ch.id === selectedChapterId;
                    const isSubmitted = submittedSections[ch.id];
                    const score = getChapterScore(ch);
                    const isPassed = isSubmitted && score >= Math.ceil(ch.sectionTest.length * 0.6);

                    return (
                      <button
                        key={ch.id}
                        onClick={() => {
                          setSelectedChapterId(ch.id);
                          window.scrollTo({ top: 0, behavior: 'smooth' });
                        }}
                        className={`w-full text-left p-2 rounded-xl transition-all flex items-center justify-between gap-2 cursor-pointer ${
                          isSelected
                            ? 'bg-emerald-50/90 border border-emerald-300 shadow-xs'
                            : 'hover:bg-slate-50 border border-transparent text-slate-700'
                        }`}
                      >
                        <div className="space-y-0.5 min-w-0 flex-1">
                          <div className="flex items-center gap-1.5">
                            <span
                              className={`text-[9px] font-black px-1.5 py-0.5 rounded-md shrink-0 ${
                                isSelected
                                  ? 'bg-emerald-600 text-white'
                                  : 'bg-slate-100 text-slate-600'
                              }`}
                            >
                              Ch.{ch.chapterNumber}
                            </span>
                            <span className={`text-xs truncate ${isSelected ? 'text-emerald-950 font-black' : 'text-slate-900 font-semibold'}`}>
                              {ch.titleJp.replace(/^第\d+章\s*/, '')}
                            </span>
                          </div>
                          <p className="text-[10px] text-slate-500 truncate pl-0.5">
                            {ch.titleNe.replace(/^अध्याय\s*[\d.]+\s*:\s*/, '')}
                          </p>
                        </div>

                        {/* Status indicator */}
                        <div className="shrink-0">
                          {isSubmitted ? (
                            isPassed ? (
                              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                            ) : (
                              <span className="text-[9px] font-black px-1.5 py-0.5 rounded-full bg-rose-50 text-rose-700 border border-rose-200">
                                {score}/{ch.sectionTest.length}
                              </span>
                            )
                          ) : (
                            <ChevronRight className="w-3.5 h-3.5 text-slate-300" />
                          )}
                        </div>
                      </button>
                    );
                  })}
                </div>
              </aside>
            )}

            {/* Right Main Column: Chapter Content & Section Test */}
            <main className={`${isSidebarOpen ? 'lg:col-span-8' : 'lg:col-span-12'} space-y-4`}>
              
              {/* Top Chapter Control Bar: Toggle Index Sidebar */}
              <div className="flex items-center justify-between gap-2">
                <button
                  onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                  className="px-2.5 py-1 rounded-xl bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer shadow-xs"
                >
                  <BookOpen className="w-3.5 h-3.5 text-emerald-600" />
                  <span>{isSidebarOpen ? 'Hide Index (目次を閉じる)' : 'Show Index (目次を開く)'}</span>
                </button>

                <div className="text-[11px] font-bold text-slate-500 flex items-center gap-1">
                  <span>Chapter {currentChapter.chapterNumber} of {BUILDING_CLEANING_BOOK_DATA.chapters.length}</span>
                </div>
              </div>

              {/* Chapter Header Card - Compact, Light White/Mint */}
              <div className="bg-gradient-to-br from-white via-slate-50 to-emerald-50/40 border border-slate-200 rounded-2xl p-4 sm:p-5 shadow-xs space-y-2">
                
                <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-100 pb-2">
                  <span className="px-2.5 py-0.5 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 text-[11px] font-black uppercase tracking-wider">
                    {currentChapter.badge}
                  </span>
                  <span className="text-xs font-bold text-slate-500 flex items-center gap-1">
                    ⏱️ ~{currentChapter.readTimeMinutes} min read
                  </span>
                </div>

                {/* Japanese Title with Furigana directly above Kanji */}
                <div className="space-y-0.5">
                  <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight leading-relaxed">
                    <FuriganaText text={currentChapter.titleJp} showFurigana={isFuriganaOn} furiganaType={furiganaType} />
                  </h2>
                  <p className="text-xs sm:text-sm font-bold text-indigo-800">
                    🇳🇵 {currentChapter.titleNe}
                  </p>
                  <p className="text-[11px] font-medium text-slate-500">
                    🇬🇧 {currentChapter.titleEn}
                  </p>
                </div>
              </div>

              {/* Theory Content Paragraphs - Compact Reading Surface */}
              <div className="bg-white border border-slate-200 rounded-2xl p-4 sm:p-5 shadow-xs space-y-4">
                <div className="space-y-3">
                  {currentChapter.paragraphs.map((p, idx) => (
                    <div key={idx} className="space-y-2 border-b border-slate-100 pb-3 last:border-b-0 last:pb-0">
                      
                      {/* Japanese Primary Text with Furigana above Kanji */}
                      <div className="p-3 sm:p-3.5 rounded-xl bg-slate-50 border border-slate-200 text-xs sm:text-sm text-slate-900 font-medium leading-relaxed">
                        <span className="inline-block px-1.5 py-0.5 rounded-md bg-emerald-100 text-emerald-800 text-[9px] font-black uppercase mr-1.5 align-middle">
                          JP
                        </span>
                        <FuriganaText text={p.jp} showFurigana={isFuriganaOn} furiganaType={furiganaType} />
                      </div>

                      {/* Nepali Dual Translation */}
                      {showNepali && (
                        <div className="p-2.5 sm:p-3 rounded-xl bg-indigo-50/60 border border-indigo-100 text-[11px] sm:text-xs text-indigo-950 font-normal leading-relaxed">
                          <span className="inline-block px-1.5 py-0.5 rounded-md bg-indigo-100 text-indigo-800 text-[9px] font-black uppercase mr-1.5 align-middle">
                            🇳🇵 NP
                          </span>
                          {p.ne}
                        </div>
                      )}
                    </div>
                  ))}
                </div>

                {/* Key Points Grid - Compact */}
                {currentChapter.keyPoints.length > 0 && (
                  <div className="pt-2 space-y-2">
                    <h3 className="text-[11px] font-black uppercase tracking-wider text-slate-500 flex items-center gap-1">
                      <Lightbulb className="w-3.5 h-3.5 text-amber-600" />
                      Key Exam Principles (重要ポイント)
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5">
                      {currentChapter.keyPoints.map((kp, i) => (
                        <div key={i} className="p-3 rounded-xl bg-amber-50/70 border border-amber-200 space-y-1">
                          <p className="text-xs font-black text-amber-900 leading-normal">
                            ⭐ <FuriganaText text={kp.titleJp} showFurigana={isFuriganaOn} furiganaType={furiganaType} />
                          </p>
                          <p className="text-[10px] font-bold text-amber-800">
                            🇳🇵 {kp.titleNe}
                          </p>
                          <p className="text-[11px] text-slate-700 leading-relaxed">
                            <FuriganaText text={kp.descriptionJp} showFurigana={isFuriganaOn} furiganaType={furiganaType} />
                          </p>
                          {showNepali && (
                            <p className="text-[10px] text-slate-600 leading-snug pt-1 border-t border-amber-200/60">
                              {kp.descriptionNe}
                            </p>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Exam Traps & Warnings Alert - Compact */}
                {currentChapter.examTraps.length > 0 && (
                  <div className="space-y-2 pt-1">
                    {currentChapter.examTraps.map((et, i) => (
                      <div
                        key={i}
                        className="p-3 sm:p-3.5 rounded-xl bg-rose-50/80 border border-rose-200 space-y-1 text-rose-950 text-xs"
                      >
                        <div className="flex items-center gap-1.5 text-rose-700 font-black text-[11px] uppercase tracking-wider">
                          <AlertTriangle className="w-3.5 h-3.5" />
                          <span>Exam Trap Alert (試験の落とし穴 / परीक्षामा झुक्किने बुँदा)</span>
                        </div>
                        <p className="font-semibold text-slate-900 leading-relaxed">
                          <FuriganaText text={et.alertJp} showFurigana={isFuriganaOn} furiganaType={furiganaType} />
                        </p>
                        {showNepali && (
                          <p className="text-rose-900 text-[11px] leading-relaxed border-t border-rose-200 pt-1">
                            🇳🇵 {et.alertNe}
                          </p>
                        )}
                      </div>
                    ))}
                  </div>
                )}

                {/* Section Vocabulary Micro-Table - Compact */}
                {currentChapter.vocabulary.length > 0 && (
                  <div className="pt-2 space-y-2">
                    <h3 className="text-[11px] font-black uppercase tracking-wider text-slate-500 flex items-center gap-1">
                      <Bookmark className="w-3.5 h-3.5 text-emerald-600" />
                      Essential Technical Vocab for this Section ({currentChapter.vocabulary.length})
                    </h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {currentChapter.vocabulary.map((vocab, i) => (
                        <div
                          key={i}
                          className="p-2.5 rounded-xl bg-slate-50 border border-slate-200 flex items-start justify-between gap-2"
                        >
                          <div>
                            <div className="flex items-center gap-1.5">
                              <span className="text-xs sm:text-sm font-black text-slate-900 leading-normal">
                                <FuriganaText text={vocab.kanji} showFurigana={isFuriganaOn} furiganaType={furiganaType} />
                              </span>
                              <span className="text-[11px] text-emerald-700 font-medium">({vocab.kana})</span>
                            </div>
                            <p className="text-[10px] text-slate-700 font-semibold mt-0.5">
                              🇳🇵 {vocab.nepali}
                            </p>
                            <p className="text-[9px] text-slate-500">
                              🇬🇧 {vocab.english}
                            </p>
                          </div>
                          <span
                            className={`text-[8px] font-black uppercase px-1.5 py-0.5 rounded-full ${
                              vocab.importance === 'CRITICAL'
                                ? 'bg-rose-100 text-rose-800 border border-rose-200'
                                : 'bg-emerald-100 text-emerald-800 border border-emerald-200'
                            }`}
                          >
                            {vocab.importance}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

              </div>

              {/* ====================================              {/* Chapter 2: Safety & 5S Conversation Dialogue, PPE & Stepladder Safety */}
              {currentChapter.id === 2 && (
                <div className="space-y-6">
                  <PersonalProtectiveEquipmentDiagram showFurigana={showFurigana} showNepali={showNepali} />
                  <StepladderSafetyDiagram showFurigana={showFurigana} showNepali={showNepali} />
                  <WorkplaceConversationCard
                    titleJp="[始業前点検|しぎょうまえてんけん]と[安全衛生|あんぜんえいせい]の[指示|しじ]"
                    titleNe="काम सुरु गर्नुअघिको निरीक्षण र सुरक्षा निर्देशन"
                    badge="Safety & 5S Dialogue"
                    sceneJp="朝の朝礼時、作業責任者から新人の外国人スタッフへ安全靴と保護具の着用を確認する場面"
                    sceneNe="बिहानी बैठकमा कामको सुपरभाइजरले नयाँ विदेशी कर्मचारीलाई सुरक्षा जुत्ता र सुरक्षित पोसाक लगाएको जाँच गर्दै"
                    showFurigana={showFurigana}
                    showNepali={showNepali}
                    lines={[
                      {
                        speaker: 'LEADER',
                        speakerNameJp: '佐藤リーダー',
                        speakerNameNe: 'सातो लिडर',
                        textJp: 'おはようございます。今日の作業前に、安全靴の靴ひもがしっかり結ばれているか確認してください。',
                        textNe: 'शुभ प्रभात। आजको काम सुरु गर्नुअघि सुरक्षा जुत्ताको तुना राम्ररी बाँधिएको छ कि छैन जाँच गर्नुहोस्।',
                      },
                      {
                        speaker: 'WORKER',
                        speakerNameJp: 'タパ（作業員）',
                        speakerNameNe: 'थापा (कर्मचारी)',
                        textJp: 'おはようございます！はい、安全靴よし、ゴム手袋も携帯しました！',
                        textNe: 'शुभ प्रभात हजुर! हजुर, सुरक्षा जुत्ता ठिक छ, रबरको पन्जा पनि साथमा लिएको छु!',
                      },
                      {
                        speaker: 'LEADER',
                        speakerNameJp: '佐藤リーダー',
                        speakerNameNe: 'सातो लिडर',
                        textJp: '素晴らしいですね。脚立を使うときは天板の上に立たないよう厳守してください。ご安全に！',
                        textNe: 'अति राम्रो। भर्‍याङ प्रयोग गर्दा माथिल्लो स्टेपमा कहिल्यै नउभिनुहोला। सुरक्षित रहनुहोस्!',
                      },
                    ]}
                    examTipJp="脚立の天板に乗って作業することは墜落災害につながるため固く禁止されています。「天板立ち作業＝禁止」は試験必出です。"
                    examTipNe="भर्‍याङको सबैभन्दा माथिल्लो स्टेपमा उभिएर काम गर्न कडा प्रतिबन्ध लगाइएको छ। यो परीक्षामा १००% सोधिने प्रश्न हो।"
                  />
                </div>
              )}

              {/* Chapter 4: Floor Machines (Vacuum Cleaner, Polisher, Auto-Scrubber, Floor Blower, Carpet Extractor) */}
              {currentChapter.id === 4 && (
                <div className="space-y-6">
                  <VacuumCleanerDiagram showFurigana={showFurigana} showNepali={showNepali} />
                  <FloorPolisherDiagram showFurigana={showFurigana} showNepali={showNepali} />
                  <AutoScrubberDiagram showFurigana={showFurigana} showNepali={showNepali} />
                  <FloorBlowerDiagram showFurigana={showFurigana} showNepali={showNepali} />
                  <CarpetExtractorDiagram showFurigana={showFurigana} showNepali={showNepali} />
                </div>
              )}

              {/* Chapter 5: Chemical pH Chart & Dilution Conversation */}
              {currentChapter.id === 5 && (
                <div className="space-y-6">
                  <ChemicalPHChart showFurigana={showFurigana} showNepali={showNepali} />
                  <WorkplaceConversationCard
                    titleJp="[洗剤|せんざい]の[希釈|きしゃく]と[保護具着用|ほごぐちゃくよう]の[確認|かくにん]"
                    titleNe="डिटर्जेन्ट पानीमा मिसाउने र सुरक्षित पोसाक लगाउने संवाद"
                    badge="Chemical Dilution Dialogue"
                    sceneJp="洗剤倉庫で、強力な剥離剤を水で希釈して希釈液を作る場面"
                    sceneNe="रसायन भण्डारमा कडा वाक्स उप्काउने केमिकल पानीमा मिसाएर बनाउँदै गर्दा"
                    showFurigana={showFurigana}
                    showNepali={showNepali}
                    lines={[
                      {
                        speaker: 'LEADER',
                        speakerNameJp: '佐藤リーダー',
                        speakerNameNe: 'सातो लिडर',
                        textJp: '剥離剤はアルカリが強いので、必ず保護メガネと耐薬品手袋を着用してから希釈してください。',
                        textNe: 'वाक्स उप्काउने केमिकल धेरै कडा अल्कालाइन हुने भएकाले चस्मा र केमिकल-प्रतिरोधी पन्जा लगाएर मात्र मिसाउनुहोस्।',
                      },
                      {
                        speaker: 'WORKER',
                        speakerNameJp: 'タパ（作業員）',
                        speakerNameNe: 'थापा (कर्मचारी)',
                        textJp: '承知いたしました。バケツに先に水を入れてから剥離剤を投入します。',
                        textNe: 'बुझेँ हजुर। बाल्टिनमा पहिले पानी हालेर मात्र केमिकल मिसाउँछु।',
                      },
                      {
                        speaker: 'LEADER',
                        speakerNameJp: '佐藤リーダー',
                        speakerNameNe: 'सातो लिडर',
                        textJp: 'その通りです！洗剤を先に入れると泡立って正確に計量できず、飛び散る危険があります。完璧です！',
                        textNe: 'एकदम सही! केमिकल पहिले हालेमा फिँज आएर सही नाप लिन सकिँदैन र उछिट्टिने डर हुन्छ। उत्कृष्ट!',
                      },
                    ]}
                    examTipJp="洗剤希釈の鉄則：「バケツに水を先に入れ、後から洗剤を注ぐ」。洗剤を先に入れると泡立ち飛び散るため不正解となります。"
                    examTipNe="डिटर्जेन्ट मिसाउने मुख्य नियम: “पहिले बाल्टिनमा पानी हाल्ने, त्यसपछि मात्र केमिकल हाल्ने”। परीक्षामा यो बारम्बार सोधिन्छ।"
                  />
                </div>
              )}

              {/* Chapter 6: Carpet Cleaning & Rapid Drying */}
              {currentChapter.id === 6 && (
                <div className="space-y-6">
                  <CarpetExtractorDiagram showFurigana={showFurigana} showNepali={showNepali} />
                  <FloorBlowerDiagram showFurigana={showFurigana} showNepali={showNepali} />
                </div>
              )}

              {/* Chapter 7: Glass Cleaning & High-Place Safety */}
              {currentChapter.id === 7 && (
                <div className="space-y-6">
                  <GlassSqueegeeDiagram showFurigana={showFurigana} showNepali={showNepali} />
                  <StepladderSafetyDiagram showFurigana={showFurigana} showNepali={showNepali} />
                </div>
              )}

              {/* Chapter 8: Color-Coded Mops & Sanitary PPE */}
              {currentChapter.id === 8 && (
                <div className="space-y-6">
                  <ColorCodedMopsDiagram showFurigana={showFurigana} showNepali={showNepali} />
                  <PersonalProtectiveEquipmentDiagram showFurigana={showFurigana} showNepali={showNepali} />
                </div>
              )}

              {/* Chapter 11: Workplace Manners & Lost Item Dialogue */}
              {currentChapter.id === 11 && (
                <WorkplaceConversationCard
                  titleJp="[お客様|おきゃくさま]への[挨拶|あいさつ]と[遺失物|いしつぶつ]の[報告|ほうこく]（報連相）"
                  titleNe="सेवाग्राहीलाई अभिवादन र हराएको सामान भेटिँदा प्रतिवेदन (हो-रेन-सो)"
                  badge="Work Manners & Hō-Ren-Sō"
                  sceneJp="ロビー清掃中に財布の落とし物を発見し、責任者に速やかに報告する場面"
                  sceneNe="प्रवेश हलमा सफाइ गर्दा कसैको पर्स भेटाएर तत्काल सुपरभाइजरलाई जानकारी गराउँदा"
                  showFurigana={showFurigana}
                  showNepali={showNepali}
                  lines={[
                    {
                      speaker: 'WORKER',
                      speakerNameJp: 'タパ（作業員）',
                      speakerNameNe: 'थापा (कर्मचारी)',
                      textJp: '佐藤リーダー、報告があります。2階のソファの隙間で茶色の財布を拾得いたしました。',
                      textNe: 'सातो लिडर, म एउटा जानकारी दिन चाहन्छु। दोस्रो तलाको सोफाको कापमा खैरो पर्स भेटाएँ।',
                    },
                    {
                      speaker: 'LEADER',
                      speakerNameJp: '佐藤リーダー',
                      speakerNameNe: 'सातो लिडर',
                      textJp: '素早い報告ありがとう。中身は開けずに、発見場所と時間を記録してすぐに防災センターへ届けましょう。',
                      textNe: 'तुरुन्त जानकारी दिएकोमा धन्यवाद। भित्र नखोली कहाँ र कति बजे भेटियो टिपोट गरी विपद् व्यवस्थापन केन्द्रमा बुझाऔँ।',
                    },
                    {
                      speaker: 'WORKER',
                      speakerNameJp: 'タパ（作業員）',
                      speakerNameNe: 'थापा (कर्मचारी)',
                      textJp: 'かしこまりました。拾得場所と時刻をメモして同行いたします。',
                      textNe: 'हस हजुर। भेटिएको ठाउँ र समय टिपेर म हजुरसँगै जान्छु।',
                    },
                  ]}
                  examTipJp="落とし物（遺失物）を拾ったときは中身を勝手に改めず、「速やかに責任者へ報告して引き渡す」ことが絶対ルールです。"
                  examTipNe="हराएको सामान भेटिँदा आफैँले नखोली तत्काल लिडर वा सुरक्षा शाखामा बुझाउनु पर्छ।"
                />
              )}

              {/* ===================================================================
                  SECTION-BY-SECTION HIGH-CHANCE CBT SKILL TEST CARD - Light Theme
                 =================================================================== */}
              <section className="bg-white border-2 border-emerald-500/30 rounded-3xl p-6 sm:p-8 shadow-xs space-y-6">
                
                {/* Header */}
                <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-100 pb-4">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="p-2 rounded-xl bg-emerald-100 text-emerald-800 border border-emerald-200">
                        <Flame className="w-5 h-5" />
                      </span>
                      <h3 className="text-lg sm:text-xl font-black text-slate-900">
                        Section {currentChapter.chapterNumber} High-Chance CBT Test
                      </h3>
                    </div>
                    <p className="text-xs text-slate-500">
                      {currentChapter.titleJp} の重要ポイント確認問題（試験出題確率：高）
                    </p>
                  </div>

                  {submittedSections[currentChapter.id] && (
                    <div className="flex items-center gap-3">
                      <div className="text-right">
                        <span className="text-[10px] uppercase font-bold text-slate-400 block">
                          Score
                        </span>
                        <span
                          className={`text-lg font-black ${
                            getChapterScore(currentChapter) >= Math.ceil(currentChapter.sectionTest.length * 0.6)
                              ? 'text-emerald-700'
                              : 'text-rose-700'
                          }`}
                        >
                          {getChapterScore(currentChapter)} / {currentChapter.sectionTest.length} Pts
                        </span>
                      </div>
                      <button
                        onClick={() => handleResetSection(currentChapter)}
                        className="p-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 hover:text-slate-900 transition-colors cursor-pointer"
                        title="Retake section quiz"
                      >
                        <RotateCcw className="w-4 h-4" />
                      </button>
                    </div>
                  )}
                </div>

                {/* Question List - Compact */}
                <div className="space-y-3.5">
                  {currentChapter.sectionTest.map((q, qIndex) => {
                    const selectedIdx = testAnswers[q.id];
                    const isSubmitted = submittedSections[currentChapter.id];
                    const isCorrect = isSubmitted && selectedIdx === q.correctAnswer;
                    const isWrong = isSubmitted && selectedIdx !== undefined && selectedIdx !== q.correctAnswer;

                    return (
                      <div
                        key={q.id}
                        className={`p-3.5 sm:p-4 rounded-2xl border transition-all space-y-3 ${
                          isCorrect
                            ? 'bg-emerald-50/50 border-emerald-300'
                            : isWrong
                            ? 'bg-rose-50/50 border-rose-300'
                            : 'bg-slate-50/70 border-slate-200'
                        }`}
                      >
                        {/* Question Title & Prompt */}
                        <div className="space-y-1">
                          <div className="flex items-center gap-2">
                            <span className="px-2 py-0.5 rounded-md bg-emerald-100 text-emerald-800 text-[10px] font-black uppercase">
                              Q{qIndex + 1} • {q.type === 'TF' ? '○× 真偽法' : '4-Choice 択一式'}
                            </span>
                            {isSubmitted && (
                              isCorrect ? (
                                <span className="text-xs font-black text-emerald-700 flex items-center gap-1">
                                  <CheckCircle2 className="w-3.5 h-3.5" /> Correct
                                </span>
                              ) : (
                                <span className="text-xs font-black text-rose-700 flex items-center gap-1">
                                  <XCircle className="w-3.5 h-3.5" /> Incorrect
                                </span>
                              )
                            )}
                          </div>

                          {isFuriganaOn && q.questionFurigana && (
                            <p className="text-[11px] text-emerald-700 font-medium">
                              {q.questionFurigana}
                            </p>
                          )}

                          <h4 className="text-sm font-bold text-slate-900 leading-snug">
                            <FuriganaText text={q.questionJp} showFurigana={isFuriganaOn} furiganaType={furiganaType} />
                          </h4>

                          {showNepali && (
                            <p className="text-xs text-indigo-900 font-medium">
                              🇳🇵 {q.questionNe}
                            </p>
                          )}
                        </div>

                        {/* Options */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                          {q.options?.map((opt, optIdx) => {
                            const isThisSelected = selectedIdx === optIdx;
                            const isThisCorrectAnswer = isSubmitted && optIdx === q.correctAnswer;

                            let optStyle = 'bg-white border-slate-200 text-slate-800 hover:border-slate-300 hover:bg-slate-50';

                            if (isThisSelected) {
                              optStyle = 'bg-emerald-50 border-emerald-500 text-emerald-950 font-bold';
                            }
                            if (isSubmitted) {
                              if (isThisCorrectAnswer) {
                                optStyle = 'bg-emerald-600 text-white font-black border-emerald-600 shadow-xs';
                              } else if (isThisSelected && !isCorrect) {
                                optStyle = 'bg-rose-100 text-rose-900 font-bold border-rose-300';
                              } else {
                                optStyle = 'opacity-50 bg-slate-50 border-slate-200 text-slate-500';
                              }
                            }

                            return (
                              <button
                                key={optIdx}
                                disabled={isSubmitted}
                                onClick={() => handleSelectOption(q.id, optIdx, currentChapter.id)}
                                className={`p-2.5 rounded-xl border text-left text-xs transition-all cursor-pointer flex items-start gap-2 ${optStyle}`}
                              >
                                <span className="w-4 h-4 rounded-full border border-slate-300 flex items-center justify-center shrink-0 text-[10px] font-bold mt-0.5">
                                  {q.type === 'TF' ? (optIdx === 0 ? '○' : '×') : optIdx + 1}
                                </span>
                                <div className="space-y-0.5">
                                  <p className="font-bold leading-normal">
                                    <FuriganaText text={opt.textJp} showFurigana={isFuriganaOn} furiganaType={furiganaType} />
                                  </p>
                                  {showNepali && (
                                    <p className="text-[10px] opacity-80 font-normal">
                                      {opt.textNe}
                                    </p>
                                  )}
                                </div>
                              </button>
                            );
                          })}
                        </div>

                        {/* Explanation Card (shows after submit) */}
                        {isSubmitted && (
                          <div className="mt-2.5 p-3 rounded-xl bg-white border border-slate-200 space-y-1.5 text-xs">
                            <p className="font-bold text-emerald-800 flex items-center gap-1.5">
                              <Lightbulb className="w-3.5 h-3.5" />
                              正解・解説（Correct Answer &amp; Explanation）
                            </p>
                            <p className="text-slate-800 leading-relaxed font-medium">
                              <FuriganaText text={q.explanationJp} showFurigana={isFuriganaOn} furiganaType={furiganaType} />
                            </p>
                            {showNepali && (
                              <p className="text-indigo-900 leading-relaxed border-t border-slate-100 pt-1">
                                🇳🇵 {q.explanationNe}
                              </p>
                            )}
                            {q.examTrapNote && (
                              <p className="text-[10px] text-amber-900 font-semibold bg-amber-50 border border-amber-200 p-2 rounded-lg">
                                💡 試験対策のヒント: <FuriganaText text={q.examTrapNote} showFurigana={isFuriganaOn} furiganaType={furiganaType} />
                                {showNepali && q.examTrapNoteNe && (
                                  <span className="block text-[10px] text-amber-800 pt-0.5">
                                    🇳🇵 {q.examTrapNoteNe}
                                  </span>
                                )}
                              </p>
                            )}
                          </div>
                        )}

                      </div>
                    );
                  })}
                </div>

                {/* Submit Action Button */}
                {!submittedSections[currentChapter.id] ? (
                  <button
                    onClick={() => handleCheckSectionAnswers(currentChapter.id)}
                    className="w-full py-4 rounded-2xl bg-emerald-600 hover:bg-emerald-500 text-white font-black text-sm shadow-md transition-all cursor-pointer flex items-center justify-center gap-2"
                  >
                    <CheckCircle2 className="w-5 h-5" />
                    Submit &amp; Check Answers (解答を確認する)
                  </button>
                ) : (
                  <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
                    <button
                      onClick={() => handleResetSection(currentChapter)}
                      className="px-5 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer border border-slate-200"
                    >
                      <RotateCcw className="w-4 h-4" />
                      Retake Section Test
                    </button>

                    {currentChapter.id < BUILDING_CLEANING_BOOK_DATA.chapters.length && (
                      <button
                        onClick={() => {
                          setSelectedChapterId(currentChapter.id + 1);
                          window.scrollTo({ top: 0, behavior: 'smooth' });
                        }}
                        className="px-6 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-black transition-all flex items-center gap-2 cursor-pointer shadow-sm"
                      >
                        Next: Chapter {currentChapter.id + 1}
                        <ChevronRight className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                )}

              </section>

              {/* Bottom Pagination */}
              <div className="flex items-center justify-between pt-4 border-t border-slate-200">
                <button
                  disabled={currentChapter.id === 1}
                  onClick={() => {
                    setSelectedChapterId(currentChapter.id - 1);
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="px-4 py-2 rounded-xl bg-white border border-slate-200 disabled:opacity-30 text-xs font-bold text-slate-700 hover:bg-slate-50 transition-all flex items-center gap-1.5 cursor-pointer shadow-xs"
                >
                  <ChevronLeft className="w-4 h-4" />
                  Previous Chapter
                </button>

                <span className="text-xs font-bold text-slate-500">
                  Chapter {currentChapter.chapterNumber} of {BUILDING_CLEANING_BOOK_DATA.chapters.length}
                </span>

                <button
                  disabled={currentChapter.id === BUILDING_CLEANING_BOOK_DATA.chapters.length}
                  onClick={() => {
                    setSelectedChapterId(currentChapter.id + 1);
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="px-4 py-2 rounded-xl bg-white border border-slate-200 disabled:opacity-30 text-xs font-bold text-slate-700 hover:bg-slate-50 transition-all flex items-center gap-1.5 cursor-pointer shadow-xs"
                >
                  Next Chapter
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>

            </main>
          </>
        )}

        {/* ===================================================================
            VIEW: DEDICATED EQUIPMENT & DIAGRAM MANUAL GUIDE (器具・資機材図解マニュアル)
           =================================================================== */}
        {activeView === 'equipment-guide' && (
          <main className="lg:col-span-12 max-w-5xl mx-auto w-full space-y-6">
            
            {/* Guide Banner */}
            <div className="bg-gradient-to-r from-teal-50 via-white to-emerald-50 border border-teal-200 rounded-3xl p-6 sm:p-8 shadow-xs space-y-4">
              <div className="flex items-center gap-3">
                <span className="text-3xl p-3 bg-teal-100 text-teal-800 rounded-2xl border border-teal-200">
                  🎨
                </span>
                <div>
                  <h2 className="text-2xl font-black text-slate-900">
                    清掃資機材・用具ビジュアル図解マニュアル
                  </h2>
                  <p className="text-xs sm:text-sm font-bold text-teal-800">
                    भवन सरसफाइ मेसिन, औजार र कार्यविधि सचित्र गाइड (Visual Diagrams &amp; Machinery Guide)
                  </p>
                </div>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed">
                ビルクリーニング特定技能１号試験（判断試験・作業試験）に出題される主要な清掃機材（真空掃除機、ポリッシャー、エクストラクター、スクイジー）、モップの色分け基準、洗剤のpH液性をすべて図解で直感的に学習できます。
              </p>
            </div>

            {/* Grid of All Equipment Diagrams */}
            <div className="space-y-8">
              {/* 1. Floor Cleaning Electric Machines */}
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-500"></span>
                  <h3 className="text-xs sm:text-sm font-black uppercase tracking-wider text-slate-700">
                    1. 床面清掃の主要機械（Floor Cleaning Electric Machinery）
                  </h3>
                </div>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <VacuumCleanerDiagram showFurigana={showFurigana} showNepali={showNepali} />
                  <FloorPolisherDiagram showFurigana={showFurigana} showNepali={showNepali} />
                  <AutoScrubberDiagram showFurigana={showFurigana} showNepali={showNepali} />
                  <FloorBlowerDiagram showFurigana={showFurigana} showNepali={showNepali} />
                </div>
              </div>

              {/* 2. Carpet Extractor */}
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-indigo-500"></span>
                  <h3 className="text-xs sm:text-sm font-black uppercase tracking-wider text-slate-700">
                    2. カーペット深層温水洗浄機（Carpet Deep Hot-Water Extractor）
                  </h3>
                </div>
                <CarpetExtractorDiagram showFurigana={showFurigana} showNepali={showNepali} />
              </div>

              {/* 3. Glass Squeegee */}
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-cyan-500"></span>
                  <h3 className="text-xs sm:text-sm font-black uppercase tracking-wider text-slate-700">
                    3. ガラス水切り動作・用具（Glass Squeegee &amp; Washer）
                  </h3>
                </div>
                <GlassSqueegeeDiagram showFurigana={showFurigana} showNepali={showNepali} />
              </div>

              {/* 4. Safety & PPE */}
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-amber-500"></span>
                  <h3 className="text-xs sm:text-sm font-black uppercase tracking-wider text-slate-700">
                    4. 高所作業・脚立安全基準 &amp; 個人用保護具（Safety Gears &amp; Stepladder Inspection）
                  </h3>
                </div>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <StepladderSafetyDiagram showFurigana={showFurigana} showNepali={showNepali} />
                  <PersonalProtectiveEquipmentDiagram showFurigana={showFurigana} showNepali={showNepali} />
                </div>
              </div>

              {/* 5. Color-Coded Mops */}
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-rose-500"></span>
                  <h3 className="text-xs sm:text-sm font-black uppercase tracking-wider text-slate-700">
                    5. 衛生管理基準・色分けモップ（Color-Coded Mops &amp; Cross-Contamination）
                  </h3>
                </div>
                <ColorCodedMopsDiagram showFurigana={showFurigana} showNepali={showNepali} />
              </div>

              {/* 6. Chemical pH Spectrum */}
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-purple-500"></span>
                  <h3 className="text-xs sm:text-sm font-black uppercase tracking-wider text-slate-700">
                    6. 洗剤化学特性（Chemical pH Spectrum &amp; Soil Neutralization）
                  </h3>
                </div>
                <ChemicalPHChart showFurigana={showFurigana} showNepali={showNepali} />
              </div>

              {/* 7. Workplace Dialogues */}
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-500"></span>
                  <h3 className="text-xs sm:text-sm font-black uppercase tracking-wider text-slate-700">
                    7. 実技・現場対話シミュレーション（Workplace Dialogue Cards）
                  </h3>
                </div>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <WorkplaceConversationCard
                    titleJp="[洗剤|せんざい]の[希釈|きしゃく]と[安全衛生|あんぜんえいせい]"
                    titleNe="डिटर्जेन्ट पानीमा मिसाउने र सुरक्षा संवाद"
                    badge="Chemical Dialogue"
                    sceneJp="剥離剤の希釈作業での安全確認"
                    sceneNe="कडा केमिकल पानीमा मिसाउने समयको सुरक्षा जाँच"
                    showFurigana={showFurigana}
                    showNepali={showNepali}
                    lines={[
                      {
                        speaker: 'LEADER',
                        speakerNameJp: '佐藤リーダー',
                        speakerNameNe: 'सातो लिडर',
                        textJp: '剥離剤を使うときは、必ず保護メガネとゴム手袋を着用してください。',
                        textNe: 'वाक्स उप्काउने केमिकल चलाउँदा चस्मा र रबरको पन्जा अनिवार्य लगाउनुहोस्।',
                      },
                      {
                        speaker: 'WORKER',
                        speakerNameJp: 'タパ（作業員）',
                        speakerNameNe: 'थापा (कर्मचारी)',
                        textJp: 'はい！バケツに水を先に注いでから、正確に希釈します。',
                        textNe: 'हजुर! बाल्टिनमा पहिले पानी हालेर मात्र सहि अनुपातमा मिसाउँछु।',
                      },
                    ]}
                    examTipJp="「バケツに水が先、洗剤が後」。洗剤が先だと泡立って危険です。"
                    examTipNe="पहिले पानी, त्यसपछि मात्र केमिकल हाल्ने।"
                  />

                  <WorkplaceConversationCard
                    titleJp="[高所作業|こうしょさぎょう]と[脚立|きゃたつ]の[安全|あんぜん]"
                    titleNe="अग्लो ठाउँको काम र भर्‍याङको सुरक्षा"
                    badge="Safety Dialogue"
                    sceneJp="脚立を使用した高所清掃の安全指導"
                    sceneNe="भर्‍याङ प्रयोग गरी अग्लो ठाउँ सफा गर्दाको सुरक्षा निर्देशन"
                    showFurigana={showFurigana}
                    showNepali={showNepali}
                    lines={[
                      {
                        speaker: 'LEADER',
                        speakerNameJp: '佐藤リーダー',
                        speakerNameNe: 'सातो लिडर',
                        textJp: '脚立の天板に乗って作業することは絶対に禁止です。',
                        textNe: 'भर्‍याङको सबैभन्दा माथिल्लो स्टेपमा उभिन कडा प्रतिबन्ध छ।',
                      },
                      {
                        speaker: 'WORKER',
                        speakerNameJp: 'タパ（作業員）',
                        speakerNameNe: 'थापा (कर्मचारी)',
                        textJp: '了解しました！開き止め金具を確実にロックして作業します。',
                        textNe: 'बुझेँ हजुर! भर्‍याङको लक राम्ररी लगाएर मात्र काम गर्छु।',
                      },
                    ]}
                    examTipJp="脚立の天板立ち作業は墜落の危険があり法令で禁止されています。"
                    examTipNe="भर्‍याङको माथिल्लो स्टेपमा उभिएर काम गर्न निषेध गरिएको छ।"
                  />
                </div>
              </div>
            </div>

          </main>
        )}

        {/* ===================================================================
            VIEW 2: FINAL COMPREHENSIVE CBT MOCK EXAM (総合模擬試験) - Light
           =================================================================== */}
        {activeView === 'mock-exam' && (
          <main className="lg:col-span-12 max-w-4xl mx-auto w-full space-y-6">
            
            {/* Mock Exam Banner */}
            <div className="bg-gradient-to-r from-emerald-50 via-teal-50/60 to-indigo-50 border border-emerald-200 rounded-3xl p-6 sm:p-8 shadow-xs space-y-4">
              <div className="flex items-center gap-3">
                <span className="text-4xl p-3 bg-white rounded-2xl border border-emerald-200 shadow-xs">
                  🏆
                </span>
                <div>
                  <span className="px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-xs font-black uppercase tracking-wider">
                    Full Prometric Simulation
                  </span>
                  <h2 className="text-2xl sm:text-3xl font-black text-slate-900 mt-1">
                    {BUILDING_CLEANING_BOOK_DATA.finalModelExam.titleJp}
                  </h2>
                  <p className="text-xs sm:text-sm font-bold text-indigo-900 mt-0.5">
                    🇳🇵 {BUILDING_CLEANING_BOOK_DATA.finalModelExam.titleNe}
                  </p>
                </div>
              </div>

              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                {BUILDING_CLEANING_BOOK_DATA.finalModelExam.descriptionJp}
              </p>

              {/* Exam Specs */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2 text-xs">
                <div className="p-3 rounded-2xl bg-white border border-slate-200 shadow-xs">
                  <span className="text-[10px] uppercase font-bold text-slate-400">Total Questions</span>
                  <p className="text-sm font-black text-slate-900">{mockTotal} Questions</p>
                </div>
                <div className="p-3 rounded-2xl bg-white border border-slate-200 shadow-xs">
                  <span className="text-[10px] uppercase font-bold text-slate-400">Official Format</span>
                  <p className="text-sm font-black text-slate-900">10 〇× + 10 択一式</p>
                </div>
                <div className="p-3 rounded-2xl bg-white border border-slate-200 shadow-xs">
                  <span className="text-[10px] uppercase font-bold text-slate-400">Passing Mark</span>
                  <p className="text-sm font-black text-amber-700">60% (12 / 20 Pts)</p>
                </div>
                <div className="p-3 rounded-2xl bg-white border border-slate-200 shadow-xs">
                  <span className="text-[10px] uppercase font-bold text-slate-400">Exam Timer</span>
                  <p className={`text-sm font-black flex items-center gap-1 ${mockExamTimeLeft < 600 ? 'text-rose-600 animate-pulse' : 'text-emerald-700'}`}>
                    <Clock className="w-3.5 h-3.5" />
                    {formatMockTime(mockExamTimeLeft)}
                  </p>
                </div>
              </div>
            </div>

            {/* Live Exam Progress & Timer Bar */}
            {!mockExamSubmitted && (
              <div className="sticky top-20 z-30 p-3.5 sm:p-4 rounded-2xl bg-white/95 backdrop-blur-md border border-slate-200 shadow-sm flex items-center justify-between gap-4">
                <div className="flex items-center gap-4 text-xs">
                  <div className="flex items-center gap-1.5 font-black text-slate-800">
                    <Clock className={`w-4 h-4 ${mockExamTimeLeft < 600 ? 'text-rose-600 animate-pulse' : 'text-emerald-600'}`} />
                    <span>Time: <span className={mockExamTimeLeft < 600 ? 'text-rose-600 font-black' : 'text-slate-900'}>{formatMockTime(mockExamTimeLeft)}</span></span>
                  </div>
                  <div className="text-slate-500 font-bold hidden sm:block">
                    Answered: <span className="text-emerald-600 font-black">{mockAnsweredCount}</span> / {mockTotal}
                  </div>
                </div>

                <button
                  onClick={() => {
                    setMockExamSubmitted(true);
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="px-5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-black text-xs transition-all shadow-xs cursor-pointer flex items-center gap-1.5"
                >
                  <Award className="w-4 h-4" />
                  Submit Exam (採点する)
                </button>
              </div>
            )}

            {/* Score Result Announcement if Submitted */}
            {mockExamSubmitted && (
              <div
                className={`p-6 sm:p-8 rounded-3xl border shadow-xs space-y-4 ${
                  isMockPassed
                    ? 'bg-emerald-50 border-emerald-300 text-emerald-950'
                    : 'bg-rose-50 border-rose-300 text-rose-950'
                }`}
              >
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="text-3xl">{isMockPassed ? '🎉' : '⚠️'}</span>
                      <div>
                        <h3 className="text-xl sm:text-2xl font-black text-slate-900">
                          {isMockPassed ? '合格！ (PROMETRIC CBT PASSED!)' : '不合格 (NEEDS MORE PRACTICE)'}
                        </h3>
                        <p className="text-xs font-bold text-slate-600">
                          ビルクリーニング特定技能１号 評価試験基準（合格ライン：60%以上 / 12点以上）
                        </p>
                      </div>
                    </div>
                    <p className="text-xs sm:text-sm text-slate-700 pt-1">
                      You scored <strong>{mockScore}</strong> out of <strong>{mockTotal}</strong> ({mockPercent}%). Passing threshold is 60% (12 / 20).
                    </p>
                  </div>

                  <button
                    onClick={() => {
                      setMockExamAnswers({});
                      setMockExamSubmitted(false);
                      setMockExamTimeLeft(3600);
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                    className="px-5 py-2.5 rounded-2xl bg-white hover:bg-slate-50 text-slate-800 font-bold text-xs border border-slate-200 transition-all flex items-center gap-2 cursor-pointer shadow-xs shrink-0"
                  >
                    <RotateCcw className="w-4 h-4" />
                    Retake Mock Exam
                  </button>
                </div>

                {/* Diagnostic Category Breakdown */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                  <div className="p-3 rounded-2xl bg-white border border-slate-200 flex items-center justify-between">
                    <div>
                      <span className="text-[10px] font-black uppercase text-slate-400 block">Section 1</span>
                      <p className="text-xs font-bold text-slate-800">○×形式 正誤判断（True/False）</p>
                    </div>
                    <span className={`text-sm font-black ${mockTFScore >= 6 ? 'text-emerald-600' : 'text-rose-600'}`}>
                      {mockTFScore} / {mockTFQuestions.length}
                    </span>
                  </div>

                  <div className="p-3 rounded-2xl bg-white border border-slate-200 flex items-center justify-between">
                    <div>
                      <span className="text-[10px] font-black uppercase text-slate-400 block">Section 2</span>
                      <p className="text-xs font-bold text-slate-800">択一式 専門知識（Multiple Choice）</p>
                    </div>
                    <span className={`text-sm font-black ${mockMCQScore >= 6 ? 'text-emerald-600' : 'text-rose-600'}`}>
                      {mockMCQScore} / {mockMCQQuestions.length}
                    </span>
                  </div>
                </div>
              </div>
            )}

            {/* Questions Form - Compact */}
            <div className="space-y-3.5">
              {BUILDING_CLEANING_BOOK_DATA.finalModelExam.questions.map((q, idx) => {
                const selected = mockExamAnswers[q.id];
                const isCorrect = mockExamSubmitted && selected === q.correctAnswer;
                const isWrong = mockExamSubmitted && selected !== undefined && selected !== q.correctAnswer;

                return (
                  <div
                    key={q.id}
                    className={`p-3.5 sm:p-4 rounded-2xl border transition-all space-y-3 ${
                      isCorrect
                        ? 'bg-emerald-50/60 border-emerald-300'
                        : isWrong
                        ? 'bg-rose-50/60 border-rose-300'
                        : 'bg-white border-slate-200 shadow-xs'
                    }`}
                  >
                    <div className="space-y-1">
                      <span className="px-2 py-0.5 rounded-md bg-emerald-100 text-emerald-800 text-[10px] font-black uppercase">
                        Question {idx + 1} • {q.type === 'TF' ? '○×形式 (True/False)' : '択一式 (Multiple Choice)'}
                      </span>
                      <h4 className="text-sm sm:text-base font-bold text-slate-900 leading-snug">
                        <FuriganaText text={q.questionJp} showFurigana={isFuriganaOn} furiganaType={furiganaType} />
                      </h4>
                      {showNepali && (
                        <p className="text-xs text-indigo-900 font-medium">
                          🇳🇵 {q.questionNe}
                        </p>
                      )}
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {q.options?.map((opt, optIdx) => {
                        const isThisSelected = selected === optIdx;
                        const isThisCorrect = mockExamSubmitted && optIdx === q.correctAnswer;

                        let style = 'bg-slate-50 border-slate-200 text-slate-800 hover:bg-white hover:border-slate-300';
                        if (isThisSelected) style = 'bg-emerald-50 border-emerald-500 text-emerald-950 font-bold';
                        if (mockExamSubmitted) {
                          if (isThisCorrect) {
                            style = 'bg-emerald-600 text-white font-black border-emerald-600 shadow-xs';
                          } else if (isThisSelected && !isCorrect) {
                            style = 'bg-rose-100 text-rose-900 font-bold border-rose-300';
                          } else {
                            style = 'opacity-40 bg-slate-50 border-slate-200 text-slate-500';
                          }
                        }

                        return (
                          <button
                            key={optIdx}
                            disabled={mockExamSubmitted}
                            onClick={() => setMockExamAnswers((prev) => ({ ...prev, [q.id]: optIdx }))}
                            className={`p-2.5 rounded-xl border text-left text-xs transition-all cursor-pointer flex items-start gap-2 ${style}`}
                          >
                            <span className="w-4 h-4 rounded-full border border-slate-300 flex items-center justify-center shrink-0 text-[10px] font-bold mt-0.5">
                              {q.type === 'TF' ? (optIdx === 0 ? '○' : '×') : optIdx + 1}
                            </span>
                            <div className="space-y-0.5">
                              <p className="font-bold leading-normal">
                                <FuriganaText text={opt.textJp} showFurigana={isFuriganaOn} furiganaType={furiganaType} />
                              </p>
                              {showNepali && (
                                <p className="text-[10px] opacity-80 font-normal">
                                  {opt.textNe}
                                </p>
                              )}
                            </div>
                          </button>
                        );
                      })}
                    </div>

                    {/* Explanations */}
                    {mockExamSubmitted && (
                      <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 space-y-1.5 text-xs">
                        <p className="font-bold text-emerald-800">
                          正解の解説（Explanation）
                        </p>
                        <p className="text-slate-800">
                          <FuriganaText text={q.explanationJp} showFurigana={isFuriganaOn} furiganaType={furiganaType} />
                        </p>
                        {showNepali && <p className="text-indigo-900">🇳🇵 {q.explanationNe}</p>}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            {/* Mock Exam Submit Button */}
            {!mockExamSubmitted && (
              <div className="pt-4">
                <button
                  onClick={() => {
                    setMockExamSubmitted(true);
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="w-full py-4 rounded-2xl bg-emerald-600 hover:bg-emerald-500 text-white font-black text-sm shadow-md transition-all cursor-pointer flex items-center justify-center gap-2"
                >
                  <Award className="w-5 h-5" />
                  Submit Mock Exam &amp; View Pass/Fail Result (採点する)
                </button>
              </div>
            )}

          </main>
        )}

        {/* ===================================================================
            VIEW 3: COMPLETE BILINGUAL CLEANING GLOSSARY (用語集) - Light
           =================================================================== */}
        {activeView === 'glossary' && (
          <main className="lg:col-span-12 max-w-5xl mx-auto w-full space-y-6">
            
            {/* Glossary Banner */}
            <div className="bg-gradient-to-r from-slate-100 via-white to-emerald-50 border border-slate-200 rounded-3xl p-6 sm:p-8 shadow-xs space-y-4">
              <div className="flex items-center gap-3">
                <span className="text-3xl p-3 bg-indigo-50 text-indigo-700 rounded-2xl border border-indigo-200">
                  📖
                </span>
                <div>
                  <h2 className="text-2xl font-black text-slate-900">
                    日本語・ネパール語 清掃用語集
                  </h2>
                  <p className="text-xs sm:text-sm font-bold text-indigo-800">
                    जापानी-नेपाली भवन सरसफाइ प्राविधिक शब्दावली (Master All 41+ Terms)
                  </p>
                </div>
              </div>

              {/* Search & Category Filter */}
              <div className="grid grid-cols-1 sm:grid-cols-12 gap-3 pt-2">
                <div className="sm:col-span-8 relative">
                  <Search className="w-4 h-4 text-slate-400 absolute left-4 top-3.5" />
                  <input
                    type="text"
                    value={glossarySearch}
                    onChange={(e) => setGlossarySearch(e.target.value)}
                    placeholder="Search in Kanji, Hiragana, Nepali, or English..."
                    className="w-full pl-11 pr-4 py-2.5 rounded-2xl bg-white border border-slate-200 text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:border-emerald-500 shadow-xs"
                  />
                </div>

                <div className="sm:col-span-4">
                  <select
                    value={glossaryCategory}
                    onChange={(e) => setGlossaryCategory(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-2xl bg-white border border-slate-200 text-xs text-slate-900 focus:outline-none focus:border-emerald-500 shadow-xs"
                  >
                    {glossaryCategories.map((cat) => (
                      <option key={cat} value={cat}>
                        {cat === 'ALL' ? 'All Categories' : cat}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            {/* Glossary Term Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {filteredGlossary.map((term, i) => (
                <div
                  key={i}
                  className="bg-white border border-slate-200 hover:border-emerald-300 rounded-3xl p-4 shadow-xs transition-all space-y-2 flex flex-col justify-between"
                >
                  <div className="space-y-1">
                    <div className="flex items-center justify-between">
                      <span className="text-base font-black text-slate-900">{term.kanji}</span>
                      <span
                        className={`text-[9px] font-black uppercase px-2 py-0.5 rounded-full ${
                          term.importance === 'CRITICAL'
                            ? 'bg-rose-100 text-rose-800 border border-rose-200'
                            : 'bg-emerald-100 text-emerald-800 border border-emerald-200'
                        }`}
                      >
                        {term.importance}
                      </span>
                    </div>

                    <p className="text-xs font-semibold text-emerald-800">
                      {term.kana} • <span className="text-slate-500 font-mono text-[11px]">{term.romaji}</span>
                    </p>
                  </div>

                  <div className="pt-2 border-t border-slate-100 space-y-0.5 text-xs">
                    <p className="font-bold text-indigo-900">
                      🇳🇵 {term.nepali}
                    </p>
                    <p className="text-slate-500">
                      🇬🇧 {term.english}
                    </p>
                  </div>
                </div>
              ))}
            </div>

          </main>
        )}

      </div>
    </div>
  );
}
