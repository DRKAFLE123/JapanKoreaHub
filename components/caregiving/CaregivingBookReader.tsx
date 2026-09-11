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
  Stethoscope,
  Bookmark,
  Share2,
  Clock,
  Timer,
  Activity,
  HeartPulse,
  Brain,
  MessageSquare,
  ClipboardList,
  ShieldAlert,
  UserCheck
} from 'lucide-react';
import {
  CAREGIVING_BOOK_DATA,
  CaregivingChapter,
  CaregivingSectionTestQuestion,
  CaregivingVocabItem
} from '@/lib/caregiving-book-data';
import FuriganaText from '@/components/building-cleaning/FuriganaText';
import {
  BodyMechanicsDiagram,
  WheelchairSafetyDiagram,
  HemiplegiaTransferDiagram,
  ChokingPreventionPostureDiagram,
  DakkenChakkanDiagram,
  PressureUlcerPreventionDiagram,
  VitalSignsStandardsChart,
  DementiaClassificationChart,
  CareRecordReaderCard,
  CaregivingConversationCard
} from './CaregivingEquipmentDiagrams';

interface Props {
  country?: string;
  isEmbedded?: boolean;
}

export default function CaregivingBookReader({ country = 'japan', isEmbedded = false }: Props) {
  const [selectedChapterId, setSelectedChapterId] = useState<number>(1);
  const [showNepali, setShowNepali] = useState<boolean>(true);
  const [furiganaMode, setFuriganaMode] = useState<'katakana' | 'hiragana' | 'off'>('katakana');
  const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(true);
  const [activeView, setActiveView] = useState<'reader' | 'equipment-guide' | 'mock-exam' | 'glossary'>('reader');
  const [guideCategory, setGuideCategory] = useState<string>('ALL');

  const studyScrollRef = React.useRef<HTMLDivElement>(null);

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
      const savedAnswers = localStorage.getItem('lg_caregiving_test_answers');
      if (savedAnswers) setTestAnswers(JSON.parse(savedAnswers));

      const savedSubmissions = localStorage.getItem('lg_caregiving_submitted_sections');
      if (savedSubmissions) setSubmittedSections(JSON.parse(savedSubmissions));
    } catch {
      // Ignore localStorage read errors
    }
  }, []);

  const currentChapter = useMemo(() => {
    return CAREGIVING_BOOK_DATA.chapters.find((c) => c.id === selectedChapterId) || CAREGIVING_BOOK_DATA.chapters[0];
  }, [selectedChapterId]);

  const handleSelectOption = (qId: string, optIdx: number, sectionId: number) => {
    const updated = { ...testAnswers, [qId]: optIdx };
    setTestAnswers(updated);
    try {
      localStorage.setItem('lg_caregiving_test_answers', JSON.stringify(updated));
    } catch {}
  };

  const handleCheckSectionAnswers = (chapterId: number) => {
    const updatedSubmissions = { ...submittedSections, [chapterId]: true };
    setSubmittedSections(updatedSubmissions);
    try {
      localStorage.setItem('lg_caregiving_submitted_sections', JSON.stringify(updatedSubmissions));
    } catch {}
  };

  const handleResetSection = (chapter: CaregivingChapter) => {
    const updatedAnswers = { ...testAnswers };
    chapter.sectionTest.forEach((q) => {
      delete updatedAnswers[q.id];
    });
    setTestAnswers(updatedAnswers);
    const updatedSubmissions = { ...submittedSections, [chapter.id]: false };
    setSubmittedSections(updatedSubmissions);
    try {
      localStorage.setItem('lg_caregiving_test_answers', JSON.stringify(updatedAnswers));
      localStorage.setItem('lg_caregiving_submitted_sections', JSON.stringify(updatedSubmissions));
    } catch {}
  };

  const getChapterScore = (chapter: CaregivingChapter) => {
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
    CAREGIVING_BOOK_DATA.finalModelExam.questions.forEach((q) => {
      if (mockExamAnswers[q.id] === q.correctAnswer) score++;
    });
    return score;
  };

  const mockTotal = CAREGIVING_BOOK_DATA.finalModelExam.questions.length;
  const mockScore = calculateMockScore();
  const mockPercent = Math.round((mockScore / mockTotal) * 100);
  const isMockPassed = mockPercent >= CAREGIVING_BOOK_DATA.finalModelExam.passScorePercent;
  const mockAnsweredCount = Object.keys(mockExamAnswers).length;

  const mockTFQuestions = useMemo(() => {
    return CAREGIVING_BOOK_DATA.finalModelExam.questions.filter((q) => q.type === 'TF');
  }, []);

  const mockMCQQuestions = useMemo(() => {
    return CAREGIVING_BOOK_DATA.finalModelExam.questions.filter((q) => q.type === 'CHOICE');
  }, []);

  const mockTFScore = useMemo(() => {
    return mockTFQuestions.reduce((acc, q) => (mockExamAnswers[q.id] === q.correctAnswer ? acc + 1 : acc), 0);
  }, [mockTFQuestions, mockExamAnswers]);

  const mockMCQScore = useMemo(() => {
    return mockMCQQuestions.reduce((acc, q) => (mockExamAnswers[q.id] === q.correctAnswer ? acc + 1 : acc), 0);
  }, [mockMCQQuestions, mockExamAnswers]);

  // Filtered glossary
  const filteredGlossary = useMemo(() => {
    return CAREGIVING_BOOK_DATA.glossary.filter((item) => {
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
    CAREGIVING_BOOK_DATA.glossary.forEach((g) => {
      if (g.category) set.add(g.category);
    });
    return ['ALL', ...Array.from(set)];
  }, []);

  // Total completed sections
  const totalPassedSections = useMemo(() => {
    let count = 0;
    CAREGIVING_BOOK_DATA.chapters.forEach((ch) => {
      if (submittedSections[ch.id]) {
        const score = getChapterScore(ch);
        if (score >= Math.ceil(ch.sectionTest.length * 0.6)) count++;
      }
    });
    return count;
  }, [submittedSections, testAnswers]);

  return (
    <div className={`${isEmbedded ? 'h-full min-h-[75vh]' : 'h-screen'} flex flex-col bg-slate-50 text-slate-900 overflow-hidden font-sans selection:bg-emerald-100 selection:text-emerald-900`}>
      
      {/* Top Sticky Navigation Bar - Light & Calm */}
      <header className="shrink-0 sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200 shadow-xs">
        <div className="max-w-7xl mx-auto px-4 py-2.5 flex flex-wrap items-center justify-between gap-3">
          
          {/* Left: Back & Title */}
          <div className="flex items-center gap-3">
            {!isEmbedded && (
              <Link
                href={`/${country}/work/nursing`}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 hover:text-slate-900 text-xs font-bold border border-slate-200 transition-colors"
              >
                <ArrowLeft className="w-3.5 h-3.5 text-emerald-600" />
                <span className="hidden sm:inline">Back to Sector Hub</span>
                <span className="sm:hidden">Back</span>
              </Link>
            )}

            <div className="flex items-center gap-2">
              <span className="text-xl">🩺</span>
              <div>
                <h1 className="text-xs sm:text-sm font-black text-slate-900 leading-tight">
                  SSW Caregiving (介護) Official Book
                </h1>
                <p className="text-[10px] text-emerald-700 font-semibold hidden md:block">
                  {CAREGIVING_BOOK_DATA.bookTitleNe}
                </p>
              </div>
            </div>
          </div>

          {/* Center Navigation Tabs: Reader / Visual Guide / Mock Exam / Glossary */}
          <div className="flex items-center p-1 bg-slate-100 rounded-2xl border border-slate-200 text-xs font-bold">
            <button
              onClick={() => setActiveView('reader')}
              className={`px-3 py-1.5 rounded-xl transition-all flex items-center gap-1.5 cursor-pointer ${
                activeView === 'reader'
                  ? 'bg-white text-emerald-800 shadow-xs font-black'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <BookOpen className="w-3.5 h-3.5 text-emerald-600" />
              <span>Study Book</span>
            </button>

            <button
              onClick={() => setActiveView('equipment-guide')}
              className={`px-3 py-1.5 rounded-xl transition-all flex items-center gap-1.5 cursor-pointer ${
                activeView === 'equipment-guide'
                  ? 'bg-white text-emerald-800 shadow-xs font-black'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Stethoscope className="w-3.5 h-3.5 text-indigo-600" />
              <span className="hidden sm:inline">Clinical Visuals</span>
              <span className="sm:hidden">Visuals</span>
            </button>

            <button
              onClick={() => setActiveView('mock-exam')}
              className={`px-3 py-1.5 rounded-xl transition-all flex items-center gap-1.5 cursor-pointer ${
                activeView === 'mock-exam'
                  ? 'bg-white text-emerald-800 shadow-xs font-black'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Award className="w-3.5 h-3.5 text-amber-500" />
              <span className="hidden sm:inline">CBT Mock Exam</span>
              <span className="sm:hidden">Exam</span>
            </button>

            <button
              onClick={() => setActiveView('glossary')}
              className={`px-3 py-1.5 rounded-xl transition-all flex items-center gap-1.5 cursor-pointer ${
                activeView === 'glossary'
                  ? 'bg-white text-emerald-800 shadow-xs font-black'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Search className="w-3.5 h-3.5 text-sky-600" />
              <span className="hidden sm:inline">Glossary ({CAREGIVING_BOOK_DATA.glossary.length})</span>
              <span className="sm:hidden">Vocab</span>
            </button>
          </div>

          {/* Right Controls: Furigana & Nepali & TOC Toggle */}
          <div className="flex items-center gap-2">
            {/* Furigana Mode Selector */}
            <div className="flex items-center bg-slate-100 p-0.5 rounded-xl border border-slate-200 text-[10px] font-bold">
              <button
                onClick={() => setFuriganaMode('katakana')}
                className={`px-2 py-1 rounded-lg transition-all ${
                  furiganaMode === 'katakana'
                    ? 'bg-emerald-600 text-white font-black shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
                title="Convert Kanji to Katakana ruby (Loanwords remain unchanged)"
              >
                カタカナ
              </button>
              <button
                onClick={() => setFuriganaMode('hiragana')}
                className={`px-2 py-1 rounded-lg transition-all ${
                  furiganaMode === 'hiragana'
                    ? 'bg-emerald-600 text-white font-black shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
                title="Convert Kanji to Hiragana ruby"
              >
                ひらがな
              </button>
              <button
                onClick={() => setFuriganaMode('off')}
                className={`px-2 py-1 rounded-lg transition-all ${
                  furiganaMode === 'off'
                    ? 'bg-slate-700 text-white font-black shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
                title="Hide Furigana ruby"
              >
                OFF
              </button>
            </div>

            {/* Nepali Toggle Button */}
            <button
              onClick={() => setShowNepali((v) => !v)}
              className={`px-2.5 py-1 rounded-xl text-xs font-bold border transition-colors flex items-center gap-1.5 cursor-pointer ${
                showNepali
                  ? 'bg-indigo-50 border-indigo-200 text-indigo-700'
                  : 'bg-white border-slate-200 text-slate-500'
              }`}
            >
              <span>🇳🇵</span>
              <span className="hidden sm:inline">{showNepali ? 'Nepali ON' : 'Nepali OFF'}</span>
            </button>

            {/* Sidebar toggle button (Both Desktop and Mobile) */}
            {activeView === 'reader' && (
              <button
                onClick={() => setIsSidebarOpen((v) => !v)}
                className={`px-2.5 py-1 rounded-xl border text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
                  isSidebarOpen
                    ? 'bg-slate-100 border-slate-300 text-slate-700 hover:bg-slate-200'
                    : 'bg-emerald-50 border-emerald-300 text-emerald-800 hover:bg-emerald-100 shadow-xs'
                }`}
                title={isSidebarOpen ? 'Hide Index (目次を閉じる)' : 'Show Index (目次を開く)'}
              >
                <BookOpen className="w-3.5 h-3.5 text-emerald-600" />
                <span className="hidden sm:inline">{isSidebarOpen ? 'Hide Index' : 'Show Index'}</span>
              </button>
            )}
          </div>
        </div>

        {/* Global Progress Bar Across 12 Chapters */}
        <div className="w-full bg-slate-100 h-1">
          <div
            className="bg-gradient-to-r from-emerald-500 via-teal-500 to-indigo-500 h-1 transition-all duration-300"
            style={{ width: `${(totalPassedSections / CAREGIVING_BOOK_DATA.chapters.length) * 100}%` }}
          />
        </div>
      </header>

      {/* Main Container - Contained Viewport Dual-Pane Loop */}
      <div className="flex-1 overflow-hidden max-w-7xl w-full mx-auto px-2 sm:px-4 py-2">

        {/* ===================================================================
            VIEW 1: 12-CHAPTER READER & SECTION-BY-SECTION HIGH-CHANCE TESTS
           =================================================================== */}
        {activeView === 'reader' && (
          <div className="h-full flex gap-3 sm:gap-4 overflow-hidden">
            {/* Left Sidebar: 12 Chapters TOC - Contained Closed-Scroll Loop */}
            {isSidebarOpen && (
              <aside className="w-72 sm:w-80 lg:w-84 shrink-0 h-full flex flex-col space-y-2 overflow-hidden">
                
                {/* Progress Summary Card - Compact */}
                <div className="shrink-0 bg-white border border-slate-200 rounded-2xl p-3 shadow-xs space-y-1.5">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1.5">
                      <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
                      <span className="text-[11px] font-black uppercase tracking-wider text-slate-700">
                        Caregiving Progress
                      </span>
                    </div>
                    <span className="text-[10px] font-bold text-emerald-800 px-2 py-0.5 rounded-full bg-emerald-50 border border-emerald-200">
                      {totalPassedSections} / {CAREGIVING_BOOK_DATA.chapters.length} Passed
                    </span>
                  </div>

                  <p className="text-[10px] text-slate-600 leading-snug">
                    Master each clinical chapter and pass the <strong className="text-emerald-700 font-bold">Section CBT Test</strong>.
                  </p>
                </div>

                {/* Chapters List - Closed Scroll Loop */}
                <div className="flex-1 overflow-y-auto overscroll-contain rounded-2xl bg-white border border-slate-200 p-2 shadow-xs space-y-1 scrollbar-thin scrollbar-thumb-slate-300">
                  <div className="flex items-center justify-between px-2 py-1 border-b border-slate-100 pb-1.5">
                    <div className="flex items-center gap-1.5">
                      <span className="text-[10px] font-black uppercase text-slate-500">
                        Table of Contents (目次)
                      </span>
                      <span className="text-[9px] font-bold text-slate-400">
                        12 Chapters
                      </span>
                    </div>
                    <button
                      onClick={() => setIsSidebarOpen(false)}
                      className="p-1 rounded-lg hover:bg-slate-100 text-slate-400 hover:text-slate-700 transition-colors text-xs font-bold flex items-center gap-1 cursor-pointer"
                      title="Close Table of Contents (目次を閉じる)"
                    >
                      <span className="text-[10px]">Close</span>
                      <XCircle className="w-3.5 h-3.5 text-slate-400" />
                    </button>
                  </div>

                  {CAREGIVING_BOOK_DATA.chapters.map((ch) => {
                    const isSelected = ch.id === selectedChapterId;
                    const isSubmitted = submittedSections[ch.id];
                    const score = getChapterScore(ch);
                    const isPassed = isSubmitted && score >= Math.ceil(ch.sectionTest.length * 0.6);

                    return (
                      <button
                        key={ch.id}
                        onClick={() => {
                          setSelectedChapterId(ch.id);
                          studyScrollRef.current?.scrollTo({ top: 0, behavior: 'smooth' });
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

            {/* Right Main Content Area: Contained Closed-Scroll Loop */}
            <main
              ref={studyScrollRef}
              className="flex-1 h-full overflow-y-auto overscroll-contain rounded-2xl pb-28 pr-1 sm:pr-2 space-y-4 scrollbar-thin scrollbar-thumb-slate-300"
            >
              {/* Top Chapter Control Bar with Toggle Index Button */}
              <div className="sticky top-0 z-20 flex items-center justify-between gap-2 bg-white/95 backdrop-blur-xs border border-slate-200 rounded-2xl px-3.5 py-2 shadow-xs">
                <button
                  onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                  className="px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold border border-slate-200 transition-all flex items-center gap-1.5 cursor-pointer shadow-xs"
                >
                  <BookOpen className="w-3.5 h-3.5 text-emerald-600" />
                  <span>{isSidebarOpen ? 'Hide Index (目次閉じる)' : 'Show Index (目次開く)'}</span>
                </button>

                <div className="flex items-center gap-2 text-xs font-bold text-slate-600">
                  <span className="hidden sm:inline">Chapter {currentChapter.chapterNumber} of {CAREGIVING_BOOK_DATA.chapters.length}</span>
                  <div className="flex items-center gap-1">
                    <button
                      disabled={currentChapter.id === 1}
                      onClick={() => {
                        setSelectedChapterId((id) => Math.max(1, id - 1));
                        studyScrollRef.current?.scrollTo({ top: 0, behavior: 'smooth' });
                      }}
                      className="p-1.5 rounded-lg border border-slate-200 hover:bg-slate-100 disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer"
                      title="Previous Chapter"
                    >
                      <ChevronLeft className="w-3.5 h-3.5" />
                    </button>
                    <button
                      disabled={currentChapter.id === CAREGIVING_BOOK_DATA.chapters.length}
                      onClick={() => {
                        setSelectedChapterId((id) => Math.min(CAREGIVING_BOOK_DATA.chapters.length, id + 1));
                        studyScrollRef.current?.scrollTo({ top: 0, behavior: 'smooth' });
                      }}
                      className="p-1.5 rounded-lg border border-slate-200 hover:bg-slate-100 disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer"
                      title="Next Chapter"
                    >
                      <ChevronRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>

              {/* Chapter Header Card */}
              <div className="bg-white border border-slate-200 rounded-3xl p-5 sm:p-7 shadow-xs space-y-4">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <span className="px-2.5 py-1 rounded-lg bg-emerald-100 text-emerald-900 text-xs font-black uppercase tracking-wide">
                      Chapter {currentChapter.chapterNumber} of 12
                    </span>
                    <span className="px-2.5 py-1 rounded-lg bg-indigo-50 border border-indigo-200 text-indigo-800 text-xs font-bold">
                      {currentChapter.partTitleJp}
                    </span>
                  </div>
                </div>


                <div className="space-y-1.5">
                  <h2 className="text-xl sm:text-2xl font-black text-slate-900 leading-tight">
                    <FuriganaText text={currentChapter.titleJp} showFurigana={isFuriganaOn} furiganaType={furiganaType} />
                  </h2>
                  <p className="text-xs sm:text-sm font-semibold text-emerald-800">
                    🇳🇵 {currentChapter.titleNe}
                  </p>
                </div>

                {/* Summary Box */}
                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-1 text-xs sm:text-sm text-slate-700 leading-relaxed">
                  <p className="font-semibold text-slate-900">
                    <FuriganaText text={currentChapter.summaryJp} showFurigana={isFuriganaOn} furiganaType={furiganaType} />
                  </p>
                  {showNepali && (
                    <p className="text-slate-600 text-xs border-t border-slate-200 pt-1.5 mt-1.5">
                      🇳🇵 {currentChapter.summaryNe}
                    </p>
                  )}
                </div>

                {/* Learning Points */}
                <div className="p-4 rounded-2xl bg-emerald-50/70 border border-emerald-200 space-y-2">
                  <div className="flex items-center gap-1.5 text-xs font-black text-emerald-900 uppercase tracking-wider">
                    <Sparkles className="w-3.5 h-3.5 text-emerald-700" />
                    <span>Key Learning Outcomes (学習目標 / सिकाइका उद्देश्यहरू)</span>
                  </div>
                  <ul className="space-y-2 text-xs text-slate-700">
                    {currentChapter.learningPoints.map((lp, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <span className="text-emerald-600 font-bold">•</span>
                        <div className="space-y-0.5">
                          <p className="font-medium text-slate-900">
                            <FuriganaText text={lp.pointJp} showFurigana={isFuriganaOn} furiganaType={furiganaType} />
                          </p>
                          {showNepali && (
                            <p className="text-[11px] text-slate-600">
                              🇳🇵 {lp.pointNe}
                            </p>
                          )}
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Chapter Core Concepts & Sections */}
                <div className="space-y-6 pt-2">
                  {currentChapter.contentSections.map((sec, sIdx) => (
                    <div key={sIdx} className="space-y-3 p-4 sm:p-5 rounded-2xl bg-slate-50 border border-slate-200">
                      <div className="border-b border-slate-200 pb-2">
                        <h3 className="text-sm sm:text-base font-black text-slate-900 leading-normal">
                          <FuriganaText text={sec.headingJp} showFurigana={isFuriganaOn} furiganaType={furiganaType} />
                        </h3>
                        {showNepali && (
                          <p className="text-xs text-indigo-900 font-medium mt-0.5">
                            🇳🇵 {sec.headingNe}
                          </p>
                        )}
                      </div>

                      <div className="space-y-3 text-xs sm:text-sm text-slate-800 leading-relaxed">
                        {sec.paragraphsJp.map((paraJp, pIdx) => (
                          <div key={pIdx} className="p-3 rounded-xl bg-white border border-slate-200/80 space-y-1">
                            <p className="font-medium">
                              <FuriganaText text={paraJp} showFurigana={isFuriganaOn} furiganaType={furiganaType} />
                            </p>
                            {showNepali && sec.paragraphsNe[pIdx] && (
                              <p className="text-xs text-slate-600 border-t border-slate-100 pt-1.5">
                                🇳🇵 {sec.paragraphsNe[pIdx]}
                              </p>
                            )}
                          </div>
                        ))}

                        {/* Callout box if present */}
                        {sec.callout && (
                          <div className={`p-3 rounded-xl border text-xs space-y-1 ${
                            sec.callout.type === 'WARNING'
                              ? 'bg-rose-50 border-rose-200 text-rose-950'
                              : sec.callout.type === 'TIP'
                              ? 'bg-sky-50 border-sky-200 text-sky-950'
                              : 'bg-emerald-50 border-emerald-200 text-emerald-950'
                          }`}>
                            <span className="font-black uppercase tracking-wider text-[10px] block">
                              {sec.callout.type === 'WARNING' ? '⚠️ Important Warning' : sec.callout.type === 'TIP' ? '💡 Clinical Tip' : '⭐ Key Takeaway'}
                            </span>
                            <p className="font-bold">
                              <FuriganaText text={sec.callout.textJp} showFurigana={isFuriganaOn} furiganaType={furiganaType} />
                            </p>
                            {showNepali && (
                              <p className="text-[11px] opacity-90 border-t border-black/5 pt-1">
                                🇳🇵 {sec.callout.textNe}
                              </p>
                            )}
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>

                {/* ===================================================================
                    EMBEDDED CLINICAL DIAGRAMS SPECIFIC TO THIS CHAPTER
                   =================================================================== */}

                {/* Chapter 1: Dignity & Compassion Scenario Dialogue */}
                {currentChapter.id === 1 && (
                  <div className="space-y-4 pt-2">
                    <CaregivingConversationCard showFurigana={showFurigana} furiganaType={furiganaType} showNepali={showNepali} />
                  </div>
                )}

                {/* Chapter 5: Dementia 4-Type Clinical Classification Diagram */}
                {currentChapter.id === 5 && (
                  <div className="space-y-4 pt-2">
                    <DementiaClassificationChart showFurigana={showFurigana} furiganaType={furiganaType} showNepali={showNepali} />
                  </div>
                )}

                {/* Chapter 6: Vital Signs Standards & Alert Ranges */}
                {currentChapter.id === 6 && (
                  <div className="space-y-4 pt-2">
                    <VitalSignsStandardsChart showFurigana={showFurigana} furiganaType={furiganaType} showNepali={showNepali} />
                  </div>
                )}

                {/* Chapter 7: Clinical Communication & Workplace Dialogue */}
                {currentChapter.id === 7 && (
                  <div className="space-y-4 pt-2">
                    <CaregivingConversationCard showFurigana={showFurigana} furiganaType={furiganaType} showNepali={showNepali} />
                  </div>
                )}

                {/* Chapter 8: Medical Shift Handover & Care Record Card */}
                {currentChapter.id === 8 && (
                  <div className="space-y-4 pt-2">
                    <CareRecordReaderCard showFurigana={showFurigana} furiganaType={furiganaType} showNepali={showNepali} />
                  </div>
                )}

                {/* Chapter 9: Body Mechanics, Wheelchair Safety & Hemiplegia Transfer */}
                {currentChapter.id === 9 && (
                  <div className="space-y-6 pt-2">
                    <BodyMechanicsDiagram showFurigana={showFurigana} furiganaType={furiganaType} showNepali={showNepali} />
                    <WheelchairSafetyDiagram showFurigana={showFurigana} furiganaType={furiganaType} showNepali={showNepali} />
                    <HemiplegiaTransferDiagram showFurigana={showFurigana} furiganaType={furiganaType} showNepali={showNepali} />
                  </div>
                )}

                {/* Chapter 10: Choking Prevention Posture & Dysphagia Care */}
                {currentChapter.id === 10 && (
                  <div className="space-y-4 pt-2">
                    <ChokingPreventionPostureDiagram showFurigana={showFurigana} furiganaType={furiganaType} showNepali={showNepali} />
                  </div>
                )}

                {/* Chapter 11: Dakken Chakkan (Dressing with Hemiplegia) */}
                {currentChapter.id === 11 && (
                  <div className="space-y-4 pt-2">
                    <DakkenChakkanDiagram showFurigana={showFurigana} furiganaType={furiganaType} showNepali={showNepali} />
                  </div>
                )}

                {/* Chapter 12: Bedsores (Pressure Ulcers) Prevention & Elimination Support */}
                {currentChapter.id === 12 && (
                  <div className="space-y-4 pt-2">
                    <PressureUlcerPreventionDiagram showFurigana={showFurigana} furiganaType={furiganaType} showNepali={showNepali} />
                  </div>
                )}

                {/* Exam Traps & Warnings Alert */}
                {currentChapter.examTraps.length > 0 && (
                  <div className="space-y-2 pt-2">
                    {currentChapter.examTraps.map((et, i) => (
                      <div
                        key={i}
                        className="p-3 sm:p-3.5 rounded-xl bg-rose-50/80 border border-rose-200 space-y-1 text-rose-950 text-xs"
                      >
                        <div className="flex items-center gap-1.5 text-rose-700 font-black text-[11px] uppercase tracking-wider">
                          <AlertTriangle className="w-3.5 h-3.5" />
                          <span>Prometric CBT Exam Trap Alert (試験の落とし穴 / परीक्षामा झुक्किने बुँदा)</span>
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

                {/* Section Vocabulary Micro-Table */}
                {currentChapter.vocabulary.length > 0 && (
                  <div className="pt-2 space-y-2">
                    <h3 className="text-[11px] font-black uppercase tracking-wider text-slate-500 flex items-center gap-1">
                      <Bookmark className="w-3.5 h-3.5 text-emerald-600" />
                      High-Yield Technical Vocab for this Chapter ({currentChapter.vocabulary.length})
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

              {/* ===================================================================
                  SECTION-BY-SECTION HIGH-CHANCE CBT PRACTICE TEST
                 =================================================================== */}
              <div className="bg-white border border-slate-200 rounded-3xl p-5 sm:p-7 shadow-xs space-y-5">
                <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-200 pb-3">
                  <div className="space-y-0.5">
                    <div className="flex items-center gap-2">
                      <span className="text-lg">✍️</span>
                      <h3 className="text-sm sm:text-base font-black text-slate-900">
                        Section CBT Quiz — Chapter {currentChapter.chapterNumber}
                      </h3>
                    </div>
                    <p className="text-xs text-slate-500">
                      High-probability Prometric exam questions for this chapter.
                    </p>
                  </div>

                  {submittedSections[currentChapter.id] && (
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-black px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 border border-emerald-300">
                        Score: {getChapterScore(currentChapter)} / {currentChapter.sectionTest.length}
                      </span>
                      <button
                        onClick={() => handleResetSection(currentChapter)}
                        className="p-1.5 rounded-xl border border-slate-200 hover:bg-slate-100 text-slate-600 text-xs flex items-center gap-1 cursor-pointer"
                        title="Retake section test"
                      >
                        <RotateCcw className="w-3.5 h-3.5" />
                        <span className="text-[11px] font-bold hidden sm:inline">Retake</span>
                      </button>
                    </div>
                  )}
                </div>

                {/* Questions List */}
                <div className="space-y-4">
                  {currentChapter.sectionTest.map((q, qIdx) => {
                    const isSubmitted = submittedSections[currentChapter.id];
                    const selectedOpt = testAnswers[q.id];
                    const isCorrect = selectedOpt === q.correctAnswer;

                    return (
                      <div
                        key={q.id}
                        className={`p-4 rounded-2xl border transition-all space-y-3 ${
                          isSubmitted
                            ? isCorrect
                              ? 'bg-emerald-50/40 border-emerald-300'
                              : 'bg-rose-50/40 border-rose-300'
                            : 'bg-slate-50/60 border-slate-200'
                        }`}
                      >
                        {/* Question Title */}
                        <div className="space-y-1">
                          <div className="flex items-center gap-2">
                            <span className="text-xs font-black px-2 py-0.5 rounded-md bg-slate-200 text-slate-700">
                              Q{qIdx + 1}
                            </span>
                            <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-indigo-50 text-indigo-700 border border-indigo-200">
                              {q.type === 'TF' ? '○× True/False' : '4-Choice CBT'}
                            </span>
                          </div>

                          <p className="text-xs sm:text-sm font-black text-slate-900 leading-relaxed pt-1">
                            <FuriganaText text={q.questionJp} showFurigana={isFuriganaOn} furiganaType={furiganaType} />
                          </p>
                          {showNepali && (
                            <p className="text-xs text-indigo-950 font-medium">
                              🇳🇵 {q.questionNe}
                            </p>
                          )}
                        </div>

                        {/* Options */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1">
                          {q.options.map((opt, oIdx) => {
                            const isThisSelected = selectedOpt === oIdx;
                            const isThisCorrect = oIdx === q.correctAnswer;

                            let btnStyle = 'bg-white border-slate-200 text-slate-700 hover:border-emerald-300';
                            if (isSubmitted) {
                              if (isThisCorrect) {
                                btnStyle = 'bg-emerald-100 border-emerald-500 text-emerald-950 font-black shadow-xs';
                              } else if (isThisSelected && !isThisCorrect) {
                                btnStyle = 'bg-rose-100 border-rose-500 text-rose-950 line-through';
                              } else {
                                btnStyle = 'bg-white/60 border-slate-200 text-slate-400 opacity-60';
                              }
                            } else if (isThisSelected) {
                              btnStyle = 'bg-emerald-50 border-emerald-500 text-emerald-950 font-black shadow-xs ring-1 ring-emerald-400';
                            }

                            return (
                              <button
                                key={oIdx}
                                disabled={isSubmitted}
                                onClick={() => handleSelectOption(q.id, oIdx, currentChapter.id)}
                                className={`p-3 rounded-xl border text-left text-xs transition-all flex items-center justify-between gap-2 cursor-pointer ${btnStyle}`}
                              >
                                <div className="space-y-0.5">
                                  <p className="font-semibold leading-snug">
                                    <FuriganaText text={opt.textJp} showFurigana={isFuriganaOn} furiganaType={furiganaType} />
                                  </p>
                                  {showNepali && (
                                    <p className="text-[10px] text-slate-500">
                                      🇳🇵 {opt.textNe}
                                    </p>
                                  )}
                                </div>
                                {isSubmitted && isThisCorrect && (
                                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                                )}
                                {isSubmitted && isThisSelected && !isThisCorrect && (
                                  <XCircle className="w-4 h-4 text-rose-600 shrink-0" />
                                )}
                              </button>
                            );
                          })}
                        </div>

                        {/* Explanation after submission */}
                        {isSubmitted && (
                          <div className="p-3 rounded-xl bg-white border border-slate-200 space-y-1 text-xs">
                            <div className="flex items-center gap-1.5 font-bold text-slate-900">
                              <Lightbulb className="w-3.5 h-3.5 text-amber-500" />
                              <span>Prometric Rationale (解説):</span>
                            </div>
                            <p className="text-slate-700">
                              <FuriganaText text={q.explanationJp} showFurigana={isFuriganaOn} furiganaType={furiganaType} />
                            </p>
                            {showNepali && (
                              <p className="text-indigo-900 border-t border-slate-100 pt-1">
                                🇳🇵 {q.explanationNe}
                              </p>
                            )}
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>

                {/* Section Action Button */}
                <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
                  {!submittedSections[currentChapter.id] ? (
                    <button
                      onClick={() => handleCheckSectionAnswers(currentChapter.id)}
                      disabled={currentChapter.sectionTest.some((q) => testAnswers[q.id] === undefined)}
                      className="w-full sm:w-auto px-6 py-3 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-black text-xs shadow-md transition-all flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
                    >
                      <Check className="w-4 h-4" />
                      <span>Submit Chapter {currentChapter.chapterNumber} Test</span>
                    </button>
                  ) : (
                    <div className="w-full flex items-center justify-between gap-3">
                      <button
                        onClick={() => handleResetSection(currentChapter)}
                        className="px-4 py-2.5 rounded-xl border border-slate-200 hover:bg-slate-100 text-slate-700 font-bold text-xs flex items-center gap-1.5 cursor-pointer"
                      >
                        <RotateCcw className="w-3.5 h-3.5" />
                        <span>Retake Test</span>
                      </button>

                      {currentChapter.id < CAREGIVING_BOOK_DATA.chapters.length && (
                        <button
                          onClick={() => {
                            setSelectedChapterId((id) => id + 1);
                            studyScrollRef.current?.scrollTo({ top: 0, behavior: 'smooth' });
                          }}
                          className="px-5 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-black text-xs flex items-center gap-1.5 shadow-md cursor-pointer"
                        >
                          <span>Next: Chapter {currentChapter.chapterNumber + 1}</span>
                          <ChevronRight className="w-4 h-4" />
                        </button>
                      )}
                    </div>
                  )}
                </div>

              </div>

            </main>
          </div>
        )}

        {/* ===================================================================
            VIEW 2: CLINICAL & EQUIPMENT VISUAL GUIDE (10 DIAGRAMS)
           =================================================================== */}
        {activeView === 'equipment-guide' && (
          <main className="h-full overflow-y-auto overscroll-contain rounded-2xl pb-28 pr-1 sm:pr-2 space-y-6 scrollbar-thin scrollbar-thumb-slate-300">
            
            {/* Visual Guide Header */}
            <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-xs space-y-3">

              <div className="flex flex-wrap items-center justify-between gap-2">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="p-2 rounded-xl bg-emerald-100 text-emerald-800">
                      <Stethoscope className="w-5 h-5" />
                    </span>
                    <h2 className="text-xl sm:text-2xl font-black text-slate-900">
                      Visual Clinical Manual &amp; ADL Diagrams (介護実技図解)
                    </h2>
                  </div>
                  <p className="text-xs sm:text-sm text-slate-600">
                    Interactive technical diagrams for Body Mechanics, Wheelchairs, Hemiplegia Transfers, Choking Prevention, Dressing rules, Pressure Ulcers, Vital Signs, and Dementia.
                  </p>
                </div>

                <span className="text-xs font-black px-3 py-1 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200">
                  10 Clinical Charts
                </span>
              </div>

              {/* Category Filter Pills */}
              <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-slate-100">
                {[
                  { id: 'ALL', label: 'All Visuals (10)' },
                  { id: 'MOBILITY', label: 'Mobility & Body Mechanics (3)' },
                  { id: 'ADL', label: 'ADL & Eating / Dressing (2)' },
                  { id: 'OBSERVATION', label: 'Clinical Vitals & Bedsores (2)' },
                  { id: 'COGNITIVE', label: 'Dementia Care (1)' },
                  { id: 'COMMUNICATION', label: 'Handover & Dialogues (2)' }
                ].map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setGuideCategory(tab.id)}
                    className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                      guideCategory === tab.id
                        ? 'bg-slate-900 text-white shadow-xs'
                        : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                    }`}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Diagrams Grid / Flow */}
            <div className="space-y-6">
              
              {/* Category: MOBILITY */}
              {(guideCategory === 'ALL' || guideCategory === 'MOBILITY') && (
                <div className="space-y-6">
                  <div className="flex items-center gap-2 border-b border-slate-200 pb-2">
                    <span className="text-lg">♿</span>
                    <h3 className="text-sm font-black text-slate-800 uppercase tracking-wider">
                      Part 1: Mobility Assistance &amp; Body Mechanics
                    </h3>
                  </div>

                  <BodyMechanicsDiagram showFurigana={showFurigana} furiganaType={furiganaType} showNepali={showNepali} />
                  <WheelchairSafetyDiagram showFurigana={showFurigana} furiganaType={furiganaType} showNepali={showNepali} />
                  <HemiplegiaTransferDiagram showFurigana={showFurigana} furiganaType={furiganaType} showNepali={showNepali} />
                </div>
              )}

              {/* Category: ADL */}
              {(guideCategory === 'ALL' || guideCategory === 'ADL') && (
                <div className="space-y-6">
                  <div className="flex items-center gap-2 border-b border-slate-200 pb-2">
                    <span className="text-lg">🥣</span>
                    <h3 className="text-sm font-black text-slate-800 uppercase tracking-wider">
                      Part 2: Eating &amp; Dressing (ADL Techniques)
                    </h3>
                  </div>

                  <ChokingPreventionPostureDiagram showFurigana={showFurigana} furiganaType={furiganaType} showNepali={showNepali} />
                  <DakkenChakkanDiagram showFurigana={showFurigana} furiganaType={furiganaType} showNepali={showNepali} />
                </div>
              )}

              {/* Category: OBSERVATION */}
              {(guideCategory === 'ALL' || guideCategory === 'OBSERVATION') && (
                <div className="space-y-6">
                  <div className="flex items-center gap-2 border-b border-slate-200 pb-2">
                    <span className="text-lg">💓</span>
                    <h3 className="text-sm font-black text-slate-800 uppercase tracking-wider">
                      Part 3: Clinical Vitals &amp; Pressure Ulcers (褥瘡)
                    </h3>
                  </div>

                  <VitalSignsStandardsChart showFurigana={showFurigana} furiganaType={furiganaType} showNepali={showNepali} />
                  <PressureUlcerPreventionDiagram showFurigana={showFurigana} furiganaType={furiganaType} showNepali={showNepali} />
                </div>
              )}

              {/* Category: COGNITIVE */}
              {(guideCategory === 'ALL' || guideCategory === 'COGNITIVE') && (
                <div className="space-y-6">
                  <div className="flex items-center gap-2 border-b border-slate-200 pb-2">
                    <span className="text-lg">🧠</span>
                    <h3 className="text-sm font-black text-slate-800 uppercase tracking-wider">
                      Part 4: Dementia Understanding (認知症の理解)
                    </h3>
                  </div>

                  <DementiaClassificationChart showFurigana={showFurigana} furiganaType={furiganaType} showNepali={showNepali} />
                </div>
              )}

              {/* Category: COMMUNICATION */}
              {(guideCategory === 'ALL' || guideCategory === 'COMMUNICATION') && (
                <div className="space-y-6">
                  <div className="flex items-center gap-2 border-b border-slate-200 pb-2">
                    <span className="text-lg">📋</span>
                    <h3 className="text-sm font-black text-slate-800 uppercase tracking-wider">
                      Part 5: Care Records &amp; Workplace Dialogues
                    </h3>
                  </div>

                  <CareRecordReaderCard showFurigana={showFurigana} furiganaType={furiganaType} showNepali={showNepali} />
                  <CaregivingConversationCard showFurigana={showFurigana} furiganaType={furiganaType} showNepali={showNepali} />
                </div>
              )}

            </div>
          </main>
        )}

        {/* ===================================================================
            VIEW 3: PROMETRIC CBT MOCK EXAM (20 QUESTIONS / 60 MIN)
           =================================================================== */}
        {activeView === 'mock-exam' && (
          <main className="h-full overflow-y-auto overscroll-contain rounded-2xl pb-28 pr-1 sm:pr-2 space-y-6 scrollbar-thin scrollbar-thumb-slate-300">
            
            {/* Exam Header & Live Timer Box */}

            <div className="bg-white border border-slate-200 rounded-3xl p-5 sm:p-7 shadow-xs space-y-4">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="p-2 rounded-xl bg-amber-100 text-amber-800">
                      <Award className="w-5 h-5" />
                    </span>
                    <h2 className="text-xl sm:text-2xl font-black text-slate-900">
                      {CAREGIVING_BOOK_DATA.finalModelExam.titleJp}
                    </h2>
                  </div>
                  <p className="text-xs sm:text-sm font-semibold text-emerald-800">
                    🇳🇵 {CAREGIVING_BOOK_DATA.finalModelExam.titleNe}
                  </p>
                </div>

                {/* 60-Minute Countdown Clock */}
                <div className="flex items-center gap-2 px-4 py-2 rounded-2xl bg-slate-900 text-white shadow-md">
                  <Timer className={`w-4 h-4 ${mockExamTimeLeft < 600 ? 'text-rose-400 animate-pulse' : 'text-emerald-400'}`} />
                  <div className="font-mono text-base sm:text-lg font-black tracking-wider">
                    {formatMockTime(mockExamTimeLeft)}
                  </div>
                </div>
              </div>

              {/* Exam Specs Row */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-2 border-t border-slate-100 text-xs">
                <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200">
                  <span className="text-[10px] uppercase font-bold text-slate-400">Total Questions</span>
                  <p className="font-black text-slate-900">20 Questions (10 ○× + 10 択一)</p>
                </div>
                <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200">
                  <span className="text-[10px] uppercase font-bold text-slate-400">Passing Mark</span>
                  <p className="font-black text-emerald-700">60% (12 / 20 Correct)</p>
                </div>
                <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200">
                  <span className="text-[10px] uppercase font-bold text-slate-400">Your Progress</span>
                  <p className="font-black text-slate-900">{mockAnsweredCount} / 20 Answered</p>
                </div>
                <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200">
                  <span className="text-[10px] uppercase font-bold text-slate-400">Standard</span>
                  <p className="font-black text-indigo-700">MHLW Prometric CBT</p>
                </div>
              </div>
            </div>

            {/* Exam Results Banner if submitted */}
            {mockExamSubmitted && (
              <div
                className={`p-6 rounded-3xl border shadow-md space-y-4 ${
                  isMockPassed
                    ? 'bg-emerald-50 border-emerald-300 text-emerald-950'
                    : 'bg-rose-50 border-rose-300 text-rose-950'
                }`}
              >
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <span className="text-4xl">{isMockPassed ? '🎉' : '⚠️'}</span>
                    <div>
                      <h3 className="text-xl font-black">
                        {isMockPassed ? 'CONGRATULATIONS! YOU PASSED (合格)' : 'DID NOT PASS (不合格) — KEEP PRACTICING'}
                      </h3>
                      <p className="text-xs font-semibold mt-0.5">
                        {isMockPassed
                          ? 'तपाईंले MHLW नर्सिङ केयरगिभर सीप परीक्षा उत्तीर्ण गर्न आवश्यक न्यूनतम ६०% अंक प्राप्त गर्नुभयो।'
                          : 'उत्तीर्ण हुन कम्तीमा ६०% (१२/२०) अंक आवश्यक पर्छ। तलका त्रुटिहरू समीक्षा गरी फेरि प्रयास गर्नुहोस्।'}
                      </p>
                    </div>
                  </div>

                  <div className="text-right">
                    <div className="text-3xl font-black">
                      {mockScore} <span className="text-base text-slate-500 font-normal">/ {mockTotal}</span>
                    </div>
                    <div className="text-xs font-bold uppercase tracking-wider">
                      {mockPercent}% Score
                    </div>
                  </div>
                </div>

                {/* Diagnostic Category Score Breakdown */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                  <div className="p-3 rounded-2xl bg-white/80 border border-slate-200">
                    <span className="text-[11px] font-bold text-slate-500">Section 1: True / False (○×問題)</span>
                    <p className="text-sm font-black text-slate-900 mt-0.5">
                      {mockTFScore} / {mockTFQuestions.length} ({Math.round((mockTFScore / mockTFQuestions.length) * 100)}%)
                    </p>
                  </div>
                  <div className="p-3 rounded-2xl bg-white/80 border border-slate-200">
                    <span className="text-[11px] font-bold text-slate-500">Section 2: 4-Choice CBT (択一式問題)</span>
                    <p className="text-sm font-black text-slate-900 mt-0.5">
                      {mockMCQScore} / {mockMCQQuestions.length} ({Math.round((mockMCQScore / mockMCQQuestions.length) * 100)}%)
                    </p>
                  </div>
                </div>

                <div className="flex items-center justify-end pt-2">
                  <button
                    onClick={() => {
                      setMockExamAnswers({});
                      setMockExamSubmitted(false);
                      setMockExamTimeLeft(3600);
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                    className="px-5 py-2.5 rounded-xl bg-slate-900 text-white font-bold text-xs flex items-center gap-2 shadow-sm cursor-pointer"
                  >
                    <RotateCcw className="w-4 h-4" />
                    <span>Reset &amp; Retake Mock Exam</span>
                  </button>
                </div>
              </div>
            )}

            {/* Questions List */}
            <div className="space-y-4">
              {CAREGIVING_BOOK_DATA.finalModelExam.questions.map((q, idx) => {
                const selectedOpt = mockExamAnswers[q.id];
                const isCorrect = selectedOpt === q.correctAnswer;

                return (
                  <div
                    key={q.id}
                    className={`p-4 sm:p-5 rounded-2xl border transition-all space-y-3 bg-white shadow-xs ${
                      mockExamSubmitted
                        ? isCorrect
                          ? 'border-emerald-300 ring-1 ring-emerald-200'
                          : 'border-rose-300 ring-1 ring-rose-200'
                        : 'border-slate-200 hover:border-slate-300'
                    }`}
                  >
                    <div className="flex items-center justify-between gap-2">
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-black px-2 py-0.5 rounded-md bg-slate-100 text-slate-700">
                          Q{idx + 1}
                        </span>
                        <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-slate-100 text-slate-600">
                          {q.type === 'TF' ? '○× True/False' : '4-Choice CBT'}
                        </span>
                      </div>

                      {mockExamSubmitted && (
                        <div>
                          {isCorrect ? (
                            <span className="text-xs font-black text-emerald-700 flex items-center gap-1">
                              <CheckCircle2 className="w-4 h-4" /> Correct
                            </span>
                          ) : (
                            <span className="text-xs font-black text-rose-700 flex items-center gap-1">
                              <XCircle className="w-4 h-4" /> Incorrect
                            </span>
                          )}
                        </div>
                      )}
                    </div>

                    <p className="text-xs sm:text-sm font-black text-slate-900 leading-relaxed">
                      <FuriganaText text={q.questionJp} showFurigana={isFuriganaOn} furiganaType={furiganaType} />
                    </p>
                    {showNepali && (
                      <p className="text-xs text-indigo-950 font-medium">
                        🇳🇵 {q.questionNe}
                      </p>
                    )}

                    {/* Options */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1">
                      {q.options.map((opt, oIdx) => {
                        const isThisSelected = selectedOpt === oIdx;
                        const isThisCorrect = oIdx === q.correctAnswer;

                        let btnStyle = 'bg-slate-50 border-slate-200 text-slate-700 hover:border-emerald-300 hover:bg-emerald-50/40';
                        if (mockExamSubmitted) {
                          if (isThisCorrect) {
                            btnStyle = 'bg-emerald-100 border-emerald-500 text-emerald-950 font-black shadow-xs';
                          } else if (isThisSelected && !isThisCorrect) {
                            btnStyle = 'bg-rose-100 border-rose-500 text-rose-950 line-through';
                          } else {
                            btnStyle = 'bg-slate-50/50 border-slate-200 text-slate-400 opacity-60';
                          }
                        } else if (isThisSelected) {
                          btnStyle = 'bg-emerald-50 border-emerald-500 text-emerald-950 font-black shadow-xs ring-1 ring-emerald-400';
                        }

                        return (
                          <button
                            key={oIdx}
                            disabled={mockExamSubmitted}
                            onClick={() => setMockExamAnswers((prev) => ({ ...prev, [q.id]: oIdx }))}
                            className={`p-3 rounded-xl border text-left text-xs transition-all flex items-center justify-between gap-2 cursor-pointer ${btnStyle}`}
                          >
                            <div className="space-y-0.5">
                              <p className="font-semibold leading-snug">
                                <FuriganaText text={opt.textJp} showFurigana={isFuriganaOn} furiganaType={furiganaType} />
                              </p>
                              {showNepali && (
                                <p className="text-[10px] text-slate-500">
                                  🇳🇵 {opt.textNe}
                                </p>
                              )}
                            </div>
                            {mockExamSubmitted && isThisCorrect && (
                              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                            )}
                            {mockExamSubmitted && isThisSelected && !isThisCorrect && (
                              <XCircle className="w-4 h-4 text-rose-600 shrink-0" />
                            )}
                          </button>
                        );
                      })}
                    </div>

                    {/* Explanation if submitted */}
                    {mockExamSubmitted && (
                      <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 space-y-1 text-xs">
                        <div className="flex items-center gap-1.5 font-bold text-slate-900">
                          <Lightbulb className="w-3.5 h-3.5 text-amber-500" />
                          <span>Prometric Explanation:</span>
                        </div>
                        <p className="text-slate-700">
                          <FuriganaText text={q.explanationJp} showFurigana={isFuriganaOn} furiganaType={furiganaType} />
                        </p>
                        {showNepali && (
                          <p className="text-indigo-900 border-t border-slate-200 pt-1">
                            🇳🇵 {q.explanationNe}
                          </p>
                        )}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            {/* Submit Button */}
            {!mockExamSubmitted && (
              <div className="sticky bottom-4 p-4 rounded-2xl bg-white border border-slate-300 shadow-xl flex flex-wrap items-center justify-between gap-3 z-30">
                <div className="text-xs text-slate-700 font-medium">
                  Answered: <strong className="text-slate-900 font-bold">{mockAnsweredCount}</strong> of 20 questions.
                </div>
                <button
                  onClick={() => {
                    setMockExamSubmitted(true);
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  disabled={mockAnsweredCount === 0}
                  className="px-6 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-black text-xs shadow-md transition-all flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
                >
                  <Check className="w-4 h-4" />
                  <span>Submit Exam &amp; View CBT Diagnostic Score</span>
                </button>
              </div>
            )}
          </main>
        )}

        {/* ===================================================================
            VIEW 4: CAREGIVING GLOSSARY (65+ MEDICAL/CARE TERMS)
           =================================================================== */}
        {activeView === 'glossary' && (
          <main className="h-full overflow-y-auto overscroll-contain rounded-2xl pb-28 pr-1 sm:pr-2 space-y-6 scrollbar-thin scrollbar-thumb-slate-300">
            
            {/* Glossary Header & Search Box */}

            <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-xs space-y-4">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="p-2 rounded-xl bg-sky-100 text-sky-800">
                      <Search className="w-5 h-5" />
                    </span>
                    <h2 className="text-xl sm:text-2xl font-black text-slate-900">
                      Essential Caregiving Glossary (介護専門用語集)
                    </h2>
                  </div>
                  <p className="text-xs sm:text-sm text-slate-600">
                    Search 65+ official clinical, anatomy, and ADL terms with Furigana, Romaji, and Nepali translations.
                  </p>
                </div>

                <span className="text-xs font-black px-3 py-1 rounded-full bg-sky-50 text-sky-800 border border-sky-200">
                  {filteredGlossary.length} Terms Found
                </span>
              </div>

              {/* Search Bar Input */}
              <div className="relative">
                <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={glossarySearch}
                  onChange={(e) => setGlossarySearch(e.target.value)}
                  placeholder="Search by Kanji, Kana, Romaji, or Nepali (e.g. 褥瘡, バイタル, bedsore, ज्वरो)..."
                  className="w-full pl-10 pr-4 py-2.5 rounded-2xl bg-slate-50 border border-slate-200 text-xs font-medium focus:outline-hidden focus:ring-2 focus:ring-sky-500 focus:bg-white transition-all"
                />
              </div>

              {/* Category Pills */}
              <div className="flex flex-wrap items-center gap-2 pt-1 border-t border-slate-100">
                {glossaryCategories.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setGlossaryCategory(cat)}
                    className={`px-3 py-1 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                      glossaryCategory === cat
                        ? 'bg-sky-600 text-white shadow-xs'
                        : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            {/* Glossary Terms Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {filteredGlossary.map((item, idx) => (
                <div
                  key={idx}
                  className="p-4 rounded-2xl bg-white border border-slate-200 shadow-xs hover:border-sky-300 transition-all space-y-2"
                >
                  <div className="flex items-start justify-between gap-2 border-b border-slate-100 pb-2">
                    <div>
                      <h4 className="text-base font-black text-slate-900 leading-normal">
                        <FuriganaText text={item.kanji} showFurigana={isFuriganaOn} furiganaType={furiganaType} />
                      </h4>
                      <p className="text-xs text-sky-700 font-semibold">{item.kana}</p>
                      <p className="text-[10px] text-slate-400 font-mono">{item.romaji}</p>
                    </div>

                    <span className="text-[9px] font-bold px-2 py-0.5 rounded-full bg-slate-100 text-slate-600">
                      {item.category}
                    </span>
                  </div>

                  <div className="space-y-1 text-xs">
                    <p className="font-bold text-slate-800">
                      🇳🇵 {item.nepali}
                    </p>
                    <p className="text-slate-500">
                      🇬🇧 {item.english}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {filteredGlossary.length === 0 && (
              <div className="p-12 text-center rounded-3xl bg-white border border-slate-200 space-y-2">
                <span className="text-3xl">🔍</span>
                <p className="text-sm font-bold text-slate-800">No matching caregiving terms found</p>
                <p className="text-xs text-slate-500">Try searching for &quot;バイタル&quot;, &quot;麻痺&quot;, &quot;誤嚥&quot;, or &quot;介護&quot;</p>
              </div>
            )}

          </main>
        )}

      </div>

    </div>
  );
}
