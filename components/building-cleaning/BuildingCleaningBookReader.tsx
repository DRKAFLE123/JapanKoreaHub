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
  Download
} from 'lucide-react';
import {
  BUILDING_CLEANING_BOOK_DATA,
  BookChapter,
  SectionTestQuestion,
  BookVocabItem
} from '@/lib/building-cleaning-book-data';

interface Props {
  country?: string;
}

export default function BuildingCleaningBookReader({ country = 'japan' }: Props) {
  const [selectedChapterId, setSelectedChapterId] = useState<number>(1);
  const [showNepali, setShowNepali] = useState<boolean>(true);
  const [showFurigana, setShowFurigana] = useState<boolean>(true);
  const [activeView, setActiveView] = useState<'reader' | 'mock-exam' | 'glossary'>('reader');
  
  // Section test answers state: { [questionId]: selectedOptionIndex }
  const [testAnswers, setTestAnswers] = useState<Record<string, number>>({});
  // Submitted status per section
  const [submittedSections, setSubmittedSections] = useState<Record<number, boolean>>({});
  // Final Mock Exam state
  const [mockExamAnswers, setMockExamAnswers] = useState<Record<string, number>>({});
  const [mockExamSubmitted, setMockExamSubmitted] = useState<boolean>(false);
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
              onClick={() => setShowFurigana(!showFurigana)}
              title={showFurigana ? 'Hide Furigana' : 'Show Furigana reading aids'}
              className={`px-2.5 py-1.5 rounded-xl text-xs font-bold border transition-all flex items-center gap-1.5 cursor-pointer ${
                showFurigana
                  ? 'bg-emerald-50 border-emerald-200 text-emerald-800 shadow-xs'
                  : 'bg-white border-slate-200 text-slate-500 hover:bg-slate-50'
              }`}
            >
              {showFurigana ? <Eye className="w-3.5 h-3.5 text-emerald-600" /> : <EyeOff className="w-3.5 h-3.5" />}
              <span className="hidden sm:inline">Furigana</span>
              <span className="text-[10px] font-black uppercase">{showFurigana ? 'ON' : 'OFF'}</span>
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
      <div className="flex-1 max-w-7xl w-full mx-auto px-3 sm:px-6 py-6 grid grid-cols-1 lg:grid-cols-12 gap-6">

        {/* ===================================================================
            VIEW 1: 12-CHAPTER READER & SECTION-BY-SECTION HIGH-CHANCE TESTS
           =================================================================== */}
        {activeView === 'reader' && (
          <>
            {/* Left Sidebar: 12 Chapters TOC - Clean Light */}
            <aside className="lg:col-span-4 space-y-4">
              
              {/* Progress Summary Card */}
              <div className="bg-white border border-slate-200 rounded-3xl p-5 shadow-xs space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-emerald-600" />
                    <span className="text-xs font-black uppercase tracking-wider text-slate-700">
                      Study Progress
                    </span>
                  </div>
                  <span className="text-xs font-bold text-emerald-800 px-2.5 py-0.5 rounded-full bg-emerald-50 border border-emerald-200">
                    {totalPassedSections} / {BUILDING_CLEANING_BOOK_DATA.chapters.length} Passed
                  </span>
                </div>

                <p className="text-xs text-slate-600 leading-relaxed">
                  Study each chapter and pass the <strong className="text-emerald-700">Section CBT Test</strong> at the end of each topic.
                </p>

                {/* Direct Download of Docx File */}
                <a
                  href="/BuildingCleaningBookwithmodelqsn.docx"
                  download="BuildingCleaningBookwithmodelqsn.docx"
                  className="flex items-center justify-center gap-2 w-full py-2.5 rounded-xl bg-slate-50 hover:bg-slate-100 border border-slate-200 text-slate-700 hover:text-slate-900 text-xs font-bold transition-all"
                >
                  <Download className="w-4 h-4 text-indigo-600" />
                  Download Original Book (.docx)
                </a>
              </div>

              {/* Chapters List */}
              <div className="bg-white border border-slate-200 rounded-3xl p-3 shadow-xs space-y-1.5 max-h-[72vh] overflow-y-auto scrollbar-thin scrollbar-thumb-slate-200">
                <p className="text-[11px] font-black uppercase text-slate-400 px-3 py-1">
                  Table of Contents (目次)
                </p>

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
                      className={`w-full text-left p-3 rounded-2xl transition-all flex items-start justify-between gap-2 cursor-pointer ${
                        isSelected
                          ? 'bg-emerald-50/90 border border-emerald-300 shadow-xs'
                          : 'hover:bg-slate-50 border border-transparent text-slate-700'
                      }`}
                    >
                      <div className="space-y-0.5 min-w-0">
                        <div className="flex items-center gap-2">
                          <span
                            className={`text-[10px] font-black px-1.5 py-0.5 rounded-md ${
                              isSelected
                                ? 'bg-emerald-600 text-white'
                                : 'bg-slate-100 text-slate-600'
                            }`}
                          >
                            Ch.{ch.chapterNumber}
                          </span>
                          <span className={`text-xs font-bold truncate ${isSelected ? 'text-emerald-950 font-black' : 'text-slate-900'}`}>
                            {ch.titleJp.replace(/^第\d+章\s*/, '')}
                          </span>
                        </div>
                        <p className="text-[11px] text-slate-500 truncate">
                          {ch.titleNe.replace(/^अध्याय\s*[\d.]+\s*:\s*/, '')}
                        </p>
                      </div>

                      {/* Status indicator */}
                      <div className="shrink-0 mt-0.5">
                        {isSubmitted ? (
                          isPassed ? (
                            <span className="inline-flex items-center text-[10px] font-black px-1.5 py-0.5 rounded-md bg-emerald-100 text-emerald-800 border border-emerald-300">
                              ✓ {score}/{ch.sectionTest.length}
                            </span>
                          ) : (
                            <span className="inline-flex items-center text-[10px] font-black px-1.5 py-0.5 rounded-md bg-rose-50 text-rose-700 border border-rose-200">
                              {score}/{ch.sectionTest.length}
                            </span>
                          )
                        ) : (
                          <ChevronRight className="w-4 h-4 text-slate-400" />
                        )}
                      </div>
                    </button>
                  );
                })}
              </div>
            </aside>

            {/* Right Main Column: Chapter Content & Section Test */}
            <main className="lg:col-span-8 space-y-6">
              
              {/* Chapter Header Card - Calm, Light White/Mint */}
              <div className="bg-gradient-to-br from-white via-slate-50 to-emerald-50/40 border border-slate-200 rounded-3xl p-6 sm:p-8 shadow-xs space-y-4">
                
                <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-100 pb-3">
                  <span className="px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-black uppercase tracking-wider">
                    {currentChapter.badge}
                  </span>
                  <span className="text-xs font-bold text-slate-500 flex items-center gap-1">
                    ⏱️ ~{currentChapter.readTimeMinutes} min read
                  </span>
                </div>

                {/* Japanese Title with optional Furigana */}
                <div className="space-y-1">
                  {showFurigana && (
                    <p className="text-xs font-semibold text-emerald-700 tracking-wide">
                      {currentChapter.titleFurigana}
                    </p>
                  )}
                  <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
                    {currentChapter.titleJp}
                  </h2>
                  <p className="text-sm sm:text-base font-bold text-indigo-800">
                    🇳🇵 {currentChapter.titleNe}
                  </p>
                  <p className="text-xs font-semibold text-slate-500">
                    🇬🇧 {currentChapter.titleEn}
                  </p>
                </div>
              </div>

              {/* Theory Content Paragraphs - Light, Calm Reading Surface */}
              <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 shadow-xs space-y-6">
                <div className="space-y-6">
                  {currentChapter.paragraphs.map((p, idx) => (
                    <div key={idx} className="space-y-3 border-b border-slate-100 pb-5 last:border-b-0 last:pb-0">
                      
                      {/* Japanese Primary Text */}
                      <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 text-sm sm:text-base text-slate-900 font-medium leading-relaxed">
                        <span className="inline-block px-2 py-0.5 rounded-md bg-emerald-100 text-emerald-800 text-[10px] font-black uppercase mr-2">
                          JP
                        </span>
                        {p.jp}
                      </div>

                      {/* Nepali Dual Translation */}
                      {showNepali && (
                        <div className="p-4 rounded-2xl bg-indigo-50/60 border border-indigo-100 text-xs sm:text-sm text-indigo-950 font-normal leading-relaxed">
                          <span className="inline-block px-2 py-0.5 rounded-md bg-indigo-100 text-indigo-800 text-[10px] font-black uppercase mr-2">
                            🇳🇵 NP
                          </span>
                          {p.ne}
                        </div>
                      )}
                    </div>
                  ))}
                </div>

                {/* Key Points Grid */}
                {currentChapter.keyPoints.length > 0 && (
                  <div className="pt-4 space-y-3">
                    <h3 className="text-xs font-black uppercase tracking-wider text-slate-500 flex items-center gap-1.5">
                      <Lightbulb className="w-4 h-4 text-amber-600" />
                      Key Exam Principles (重要ポイント)
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      {currentChapter.keyPoints.map((kp, i) => (
                        <div key={i} className="p-4 rounded-2xl bg-amber-50/70 border border-amber-200 space-y-1.5">
                          <p className="text-xs font-black text-amber-900">
                            ⭐ {kp.titleJp}
                          </p>
                          <p className="text-[11px] font-bold text-amber-800">
                            🇳🇵 {kp.titleNe}
                          </p>
                          <p className="text-xs text-slate-700 leading-snug">
                            {kp.descriptionJp}
                          </p>
                          {showNepali && (
                            <p className="text-[11px] text-slate-600 leading-snug pt-1 border-t border-amber-200/60">
                              {kp.descriptionNe}
                            </p>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Exam Traps & Warnings Alert */}
                {currentChapter.examTraps.length > 0 && (
                  <div className="space-y-3 pt-2">
                    {currentChapter.examTraps.map((et, i) => (
                      <div
                        key={i}
                        className="p-4 rounded-2xl bg-rose-50/80 border border-rose-200 space-y-2 text-rose-950 text-xs sm:text-sm"
                      >
                        <div className="flex items-center gap-2 text-rose-700 font-black text-xs uppercase tracking-wider">
                          <AlertTriangle className="w-4 h-4" />
                          <span>Exam Trap Alert (試験の落とし穴 / परीक्षामा झुक्किने बुँदा)</span>
                        </div>
                        <p className="font-semibold text-slate-900 leading-relaxed">
                          {et.alertJp}
                        </p>
                        {showNepali && (
                          <p className="text-rose-900 text-xs leading-relaxed border-t border-rose-200 pt-1.5">
                            🇳🇵 {et.alertNe}
                          </p>
                        )}
                      </div>
                    ))}
                  </div>
                )}

                {/* Section Vocabulary Micro-Table */}
                {currentChapter.vocabulary.length > 0 && (
                  <div className="pt-4 space-y-3">
                    <h3 className="text-xs font-black uppercase tracking-wider text-slate-500 flex items-center gap-1.5">
                      <Bookmark className="w-4 h-4 text-emerald-600" />
                      Essential Technical Vocab for this Section ({currentChapter.vocabulary.length})
                    </h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {currentChapter.vocabulary.map((vocab, i) => (
                        <div
                          key={i}
                          className="p-3 rounded-2xl bg-slate-50 border border-slate-200 flex items-start justify-between gap-2"
                        >
                          <div>
                            <div className="flex items-center gap-2">
                              <span className="text-sm font-black text-slate-900">{vocab.kanji}</span>
                              <span className="text-xs text-emerald-700 font-medium">({vocab.kana})</span>
                            </div>
                            <p className="text-[11px] text-slate-700 font-semibold mt-0.5">
                              🇳🇵 {vocab.nepali}
                            </p>
                            <p className="text-[10px] text-slate-500">
                              🇬🇧 {vocab.english}
                            </p>
                          </div>
                          <span
                            className={`text-[9px] font-black uppercase px-2 py-0.5 rounded-full ${
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

                {/* Question List */}
                <div className="space-y-6">
                  {currentChapter.sectionTest.map((q, qIndex) => {
                    const selectedIdx = testAnswers[q.id];
                    const isSubmitted = submittedSections[currentChapter.id];
                    const isCorrect = isSubmitted && selectedIdx === q.correctAnswer;
                    const isWrong = isSubmitted && selectedIdx !== undefined && selectedIdx !== q.correctAnswer;

                    return (
                      <div
                        key={q.id}
                        className={`p-5 rounded-3xl border transition-all space-y-4 ${
                          isCorrect
                            ? 'bg-emerald-50/50 border-emerald-300'
                            : isWrong
                            ? 'bg-rose-50/50 border-rose-300'
                            : 'bg-slate-50/70 border-slate-200'
                        }`}
                      >
                        {/* Question Title & Prompt */}
                        <div className="space-y-1.5">
                          <div className="flex items-center gap-2">
                            <span className="px-2 py-0.5 rounded-md bg-emerald-100 text-emerald-800 text-[11px] font-black uppercase">
                              Q{qIndex + 1} • {q.type === 'TF' ? '○× 真偽法' : '4-Choice 択一式'}
                            </span>
                            {isSubmitted && (
                              isCorrect ? (
                                <span className="text-xs font-black text-emerald-700 flex items-center gap-1">
                                  <CheckCircle2 className="w-4 h-4" /> Correct
                                </span>
                              ) : (
                                <span className="text-xs font-black text-rose-700 flex items-center gap-1">
                                  <XCircle className="w-4 h-4" /> Incorrect
                                </span>
                              )
                            )}
                          </div>

                          {showFurigana && q.questionFurigana && (
                            <p className="text-[11px] text-emerald-700 font-medium">
                              {q.questionFurigana}
                            </p>
                          )}

                          <h4 className="text-sm sm:text-base font-bold text-slate-900 leading-snug">
                            {q.questionJp}
                          </h4>

                          {showNepali && (
                            <p className="text-xs text-indigo-900 font-medium">
                              🇳🇵 {q.questionNe}
                            </p>
                          )}
                        </div>

                        {/* Options */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
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
                                className={`p-3 rounded-2xl border text-left text-xs transition-all cursor-pointer flex items-start gap-2.5 ${optStyle}`}
                              >
                                <span className="w-5 h-5 rounded-full border border-slate-300 flex items-center justify-center shrink-0 text-[10px] font-bold mt-0.5">
                                  {q.type === 'TF' ? (optIdx === 0 ? '○' : '×') : optIdx + 1}
                                </span>
                                <div className="space-y-0.5">
                                  <p className="font-bold">{opt.textJp}</p>
                                  {showNepali && (
                                    <p className="text-[11px] opacity-80 font-normal">
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
                          <div className="mt-3 p-4 rounded-2xl bg-white border border-slate-200 space-y-2 text-xs">
                            <p className="font-bold text-emerald-800 flex items-center gap-1.5">
                              <Lightbulb className="w-4 h-4" />
                              正解・解説（Correct Answer &amp; Explanation）
                            </p>
                            <p className="text-slate-800 leading-relaxed font-medium">
                              {q.explanationJp}
                            </p>
                            {showNepali && (
                              <p className="text-indigo-900 leading-relaxed border-t border-slate-100 pt-1.5">
                                🇳🇵 {q.explanationNe}
                              </p>
                            )}
                            {q.examTrapNote && (
                              <p className="text-[11px] text-amber-900 font-semibold bg-amber-50 border border-amber-200 p-2.5 rounded-xl">
                                💡 試験対策のヒント: {q.examTrapNote}
                                {showNepali && q.examTrapNoteNe && (
                                  <span className="block text-[10px] text-amber-800 pt-1">
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
                  <span className="text-[10px] uppercase font-bold text-slate-400">Format</span>
                  <p className="text-sm font-black text-slate-900">5 〇× + 5 MCQ</p>
                </div>
                <div className="p-3 rounded-2xl bg-white border border-slate-200 shadow-xs">
                  <span className="text-[10px] uppercase font-bold text-slate-400">Passing Mark</span>
                  <p className="text-sm font-black text-amber-700">60% (6 / 10 Pts)</p>
                </div>
                <div className="p-3 rounded-2xl bg-white border border-slate-200 shadow-xs">
                  <span className="text-[10px] uppercase font-bold text-slate-400">Current Status</span>
                  <p className="text-sm font-black text-emerald-700">
                    {mockExamSubmitted ? `${mockScore}/${mockTotal} (${mockPercent}%)` : 'In Progress'}
                  </p>
                </div>
              </div>
            </div>

            {/* Score Result Announcement if Submitted */}
            {mockExamSubmitted && (
              <div
                className={`p-6 rounded-3xl border shadow-xs flex flex-col sm:flex-row items-center justify-between gap-4 ${
                  isMockPassed
                    ? 'bg-emerald-50 border-emerald-300 text-emerald-950'
                    : 'bg-rose-50 border-rose-300 text-rose-950'
                }`}
              >
                <div className="space-y-1 text-center sm:text-left">
                  <div className="flex items-center justify-center sm:justify-start gap-2">
                    <span className="text-2xl">{isMockPassed ? '🎉' : '⚠️'}</span>
                    <h3 className="text-xl font-black text-slate-900">
                      {isMockPassed ? '合格！ (EXAM PASSED!)' : '不合格 (NEEDS MORE PRACTICE)'}
                    </h3>
                  </div>
                  <p className="text-xs">
                    You scored <strong>{mockScore}</strong> out of <strong>{mockTotal}</strong> ({mockPercent}%). Passing threshold is 60%.
                  </p>
                </div>

                <button
                  onClick={() => {
                    setMockExamAnswers({});
                    setMockExamSubmitted(false);
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="px-5 py-2.5 rounded-2xl bg-white hover:bg-slate-50 text-slate-800 font-bold text-xs border border-slate-200 transition-all flex items-center gap-2 cursor-pointer shadow-xs"
                >
                  <RotateCcw className="w-4 h-4" />
                  Retake Mock Exam
                </button>
              </div>
            )}

            {/* Questions Form */}
            <div className="space-y-6">
              {BUILDING_CLEANING_BOOK_DATA.finalModelExam.questions.map((q, idx) => {
                const selected = mockExamAnswers[q.id];
                const isCorrect = mockExamSubmitted && selected === q.correctAnswer;
                const isWrong = mockExamSubmitted && selected !== undefined && selected !== q.correctAnswer;

                return (
                  <div
                    key={q.id}
                    className={`p-6 rounded-3xl border transition-all space-y-4 ${
                      isCorrect
                        ? 'bg-emerald-50/60 border-emerald-300'
                        : isWrong
                        ? 'bg-rose-50/60 border-rose-300'
                        : 'bg-white border-slate-200 shadow-xs'
                    }`}
                  >
                    <div className="space-y-1.5">
                      <span className="px-2 py-0.5 rounded-md bg-emerald-100 text-emerald-800 text-[10px] font-black uppercase">
                        Question {idx + 1} • {q.type === 'TF' ? '○×形式 (True/False)' : '択一式 (Multiple Choice)'}
                      </span>
                      <h4 className="text-base font-bold text-slate-900 leading-snug">
                        {q.questionJp}
                      </h4>
                      {showNepali && (
                        <p className="text-xs text-indigo-900 font-medium">
                          🇳🇵 {q.questionNe}
                        </p>
                      )}
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
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
                            className={`p-3.5 rounded-2xl border text-left text-xs transition-all cursor-pointer flex items-start gap-2.5 ${style}`}
                          >
                            <span className="w-5 h-5 rounded-full border border-slate-300 flex items-center justify-center shrink-0 text-[10px] font-bold mt-0.5">
                              {q.type === 'TF' ? (optIdx === 0 ? '○' : '×') : optIdx + 1}
                            </span>
                            <div className="space-y-0.5">
                              <p className="font-bold">{opt.textJp}</p>
                              {showNepali && (
                                <p className="text-[11px] opacity-80 font-normal">
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
                      <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-1.5 text-xs">
                        <p className="font-bold text-emerald-800">
                          正解の解説（Explanation）
                        </p>
                        <p className="text-slate-800">{q.explanationJp}</p>
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
