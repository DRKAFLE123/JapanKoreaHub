'use client';

import React, { useState, useEffect, useMemo, useRef } from 'react';
import Link from 'next/link';
import {
  Clock,
  Award,
  RotateCcw,
  CheckCircle2,
  XCircle,
  Flag,
  ChevronRight,
  ChevronLeft,
  AlertTriangle,
  Lightbulb,
  Sparkles,
  BookOpen,
  ArrowLeft,
  Filter,
  Eye,
  EyeOff,
  HelpCircle,
  BarChart3,
  Layers,
  Wrench,
  Check,
  Pause,
  Play,
  X
} from 'lucide-react';
import {
  BUILDING_CLEANING_OFFICIAL_MOCK_TEST,
  BuildingCleaningQuestion
} from '@/lib/building-cleaning-exam-data';
import FuriganaText from './FuriganaText';
import {
  FloorPolisherDiagram,
  CarpetExtractorDiagram,
  GlassSqueegeeDiagram,
  ColorCodedMopsDiagram,
  ChemicalPHChart,
  StepladderSafetyDiagram,
  PersonalProtectiveEquipmentDiagram
} from './CleaningEquipmentDiagrams';

interface Props {
  country?: string;
  isEmbedded?: boolean;
  onExit?: () => void;
  setNumber?: number;
}

export default function BuildingCleaningMockExam({
  country = 'japan',
  isEmbedded = false,
  onExit,
  setNumber = 1
}: Props) {
  const examData = BUILDING_CLEANING_OFFICIAL_MOCK_TEST;

  // Exam state
  const [isExamStarted, setIsExamStarted] = useState<boolean>(false);
  const [showExitConfirmModal, setShowExitConfirmModal] = useState<boolean>(false);
  const [currentIdx, setCurrentIdx] = useState<number>(0);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<string, number>>({});
  const [flaggedQuestions, setFlaggedQuestions] = useState<Record<string, boolean>>({});
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
  const [isReviewModalOpen, setIsReviewModalOpen] = useState<boolean>(false);

  // Timer: 60 minutes = 3600 seconds
  const [timeLeftSeconds, setTimeLeftSeconds] = useState<number>(3600);
  const [isTimerPaused, setIsTimerPaused] = useState<boolean>(false);

  // Furigana and language controls
  const [furiganaMode, setFuriganaMode] = useState<'hiragana' | 'katakana' | 'off'>('hiragana');
  const [showNepali, setShowNepali] = useState<boolean>(true);
  const [showDiagram, setShowDiagram] = useState<boolean>(true);

  // Review mode filter (ALL, WRONG, FLAGGED)
  const [reviewFilter, setReviewFilter] = useState<'ALL' | 'WRONG' | 'CORRECT' | 'FLAGGED'>('ALL');

  const questionContainerRef = useRef<HTMLDivElement>(null);

  const currentQ = examData.questions[currentIdx];
  const isFuriganaOn = furiganaMode !== 'off';
  const furiganaType = furiganaMode === 'katakana' ? 'katakana' : 'hiragana';

  // Timer countdown (only runs when exam is started, not submitted, and not paused)
  useEffect(() => {
    if (!isExamStarted || isSubmitted || isTimerPaused) return;

    const interval = setInterval(() => {
      setTimeLeftSeconds((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          setIsSubmitted(true);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [isExamStarted, isSubmitted, isTimerPaused]);

  // Browser beforeunload protection while exam is active
  useEffect(() => {
    if (!isExamStarted || isSubmitted) return;

    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      e.preventDefault();
      e.returnValue = 'You have an active exam in progress. Exiting will discard your current progress.';
      return e.returnValue;
    };

    window.addEventListener('beforeunload', handleBeforeUnload);
    return () => window.removeEventListener('beforeunload', handleBeforeUnload);
  }, [isExamStarted, isSubmitted]);

  const handleRequestExit = () => {
    if (isSubmitted || !isExamStarted) {
      if (isEmbedded && onExit) {
        onExit();
      } else {
        window.location.href = `/${country}/exams/skills?sector=building-cleaning`;
      }
    } else {
      setIsTimerPaused(true);
      setShowExitConfirmModal(true);
    }
  };

  const handleConfirmExit = () => {
    setShowExitConfirmModal(false);
    if (isEmbedded && onExit) {
      onExit();
    } else {
      window.location.href = `/${country}/exams/skills?sector=building-cleaning`;
    }
  };

  const handleCancelExit = () => {
    setShowExitConfirmModal(false);
    setIsTimerPaused(false);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const handleSelectAnswer = (questionId: string, optIdx: number) => {
    if (isSubmitted) return;
    setSelectedAnswers((prev) => ({
      ...prev,
      [questionId]: optIdx
    }));
  };

  const handleToggleFlag = (questionId: string) => {
    setFlaggedQuestions((prev) => ({
      ...prev,
      [questionId]: !prev[questionId]
    }));
  };

  const handleRetake = () => {
    setSelectedAnswers({});
    setFlaggedQuestions({});
    setIsSubmitted(false);
    setTimeLeftSeconds(3600);
    setIsTimerPaused(false);
    setCurrentIdx(0);
    setIsReviewModalOpen(false);
  };

  // Score calculations
  const calculateScore = () => {
    let score = 0;
    examData.questions.forEach((q) => {
      if (selectedAnswers[q.id] === q.correctAnswer) {
        score++;
      }
    });
    return score;
  };

  const score = calculateScore();
  const percentage = Math.round((score / examData.totalQuestions) * 100);
  const isPassed = score >= examData.passScore;
  const answeredCount = Object.keys(selectedAnswers).length;
  const flaggedCount = Object.values(flaggedQuestions).filter(Boolean).length;
  const unansweredCount = examData.totalQuestions - answeredCount;

  // Category breakdown
  const categoryScores = useMemo(() => {
    const catMap: Record<
      string,
      { titleJp: string; titleNe: string; total: number; correct: number }
    > = {};

    examData.questions.forEach((q) => {
      if (!catMap[q.category]) {
        catMap[q.category] = {
          titleJp: q.categoryNameJp,
          titleNe: q.categoryNameNe,
          total: 0,
          correct: 0
        };
      }
      catMap[q.category].total++;
      if (selectedAnswers[q.id] === q.correctAnswer) {
        catMap[q.category].correct++;
      }
    });

    return catMap;
  }, [examData.questions, selectedAnswers]);

  // Diagram renderer for visual judgment
  const renderDiagram = (key?: string) => {
    if (!key) return null;
    return (
      <div className="my-3 p-3 bg-white rounded-2xl border border-slate-200 shadow-xs">
        <div className="flex items-center justify-between pb-2 mb-2 border-b border-slate-100 text-xs">
          <span className="font-bold text-slate-700 flex items-center gap-1.5">
            <Wrench className="w-3.5 h-3.5 text-emerald-600" />
            実務判断 図解・写真資料（Visual CBT Reference）
          </span>
          <button
            onClick={() => setShowDiagram(!showDiagram)}
            className="text-[11px] font-bold text-emerald-700 hover:text-emerald-800 cursor-pointer"
          >
            {showDiagram ? 'Hide Diagram' : 'Show Diagram'}
          </button>
        </div>
        {showDiagram && (
          <div className="pt-1">
            {key === 'polisher' && <FloorPolisherDiagram showFurigana={isFuriganaOn} showNepali={showNepali} />}
            {key === 'chemical-ph' && <ChemicalPHChart showFurigana={isFuriganaOn} showNepali={showNepali} />}
            {key === 'stepladder' && <StepladderSafetyDiagram showFurigana={isFuriganaOn} showNepali={showNepali} />}
            {key === 'mop-colors' && <ColorCodedMopsDiagram showFurigana={isFuriganaOn} showNepali={showNepali} />}
            {key === 'squeegee' && <GlassSqueegeeDiagram showFurigana={isFuriganaOn} showNepali={showNepali} />}
            {key === 'extractor' && <CarpetExtractorDiagram showFurigana={isFuriganaOn} showNepali={showNepali} />}
            {key === 'ppe' && <PersonalProtectiveEquipmentDiagram showFurigana={isFuriganaOn} showNepali={showNepali} />}
          </div>
        )}
      </div>
    );
  };

  // ── PRE-EXAM CONFIRMATION SCREEN ──
  if (!isExamStarted) {
    return (
      <div className={`h-full w-full flex flex-col items-center justify-center p-4 bg-slate-100 text-slate-900 font-sans select-none overflow-y-auto ${isEmbedded ? 'rounded-2xl' : ''}`}>
        <div className="w-full max-w-2xl bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 shadow-xl space-y-6 my-auto">
          
          {/* Header */}
          <div className="flex items-start justify-between gap-4 border-b border-slate-100 pb-5">
            <div className="flex items-center gap-3.5">
              <span className="text-4xl p-3 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-600 shadow-xs shrink-0">
                🧹
              </span>
              <div>
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="px-2.5 py-0.5 rounded-full bg-emerald-600 text-white text-[10px] font-black uppercase tracking-wider shadow-xs">
                    SET {setNumber}
                  </span>
                  <span className="px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-800 text-[10px] font-black uppercase tracking-wider border border-emerald-200">
                    Official Prometric CBT
                  </span>
                </div>
                <h1 className="text-lg sm:text-xl font-black text-slate-900 mt-1">
                  Building Cleaning SSW-1 Mock Test — Set {setNumber}
                </h1>
                <p className="text-xs text-slate-500 font-bold">
                  ビルクリーニング分野特定技能1号評価試験 • 🇳🇵 भवन सरसफाइ विशेष सीप परीक्षा
                </p>
              </div>
            </div>

            <button
              onClick={handleRequestExit}
              className="p-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-500 hover:text-slate-800 transition-colors cursor-pointer shrink-0"
              title="Return"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* 4 Specs Badges */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 text-center text-xs">
            <div className="p-3 rounded-2xl bg-slate-50 border border-slate-200 space-y-0.5">
              <span className="text-[10px] font-bold uppercase text-slate-400 block">Duration</span>
              <span className="font-black text-slate-900 text-sm">60 Mins</span>
              <span className="text-[10px] text-slate-500 block">Countdown Timer</span>
            </div>
            <div className="p-3 rounded-2xl bg-slate-50 border border-slate-200 space-y-0.5">
              <span className="text-[10px] font-bold uppercase text-slate-400 block">Questions</span>
              <span className="font-black text-slate-900 text-sm">30 Questions</span>
              <span className="text-[10px] text-slate-500 block">15 T/F + 15 MCQ</span>
            </div>
            <div className="p-3 rounded-2xl bg-slate-50 border border-slate-200 space-y-0.5">
              <span className="text-[10px] font-bold uppercase text-slate-400 block">Pass Target</span>
              <span className="font-black text-emerald-700 text-sm">60%</span>
              <span className="text-[10px] text-emerald-600 font-bold block">18 / 30 Correct</span>
            </div>
            <div className="p-3 rounded-2xl bg-slate-50 border border-slate-200 space-y-0.5">
              <span className="text-[10px] font-bold uppercase text-slate-400 block">Assistance</span>
              <span className="font-black text-indigo-700 text-sm">Furigana + 🇳🇵</span>
              <span className="text-[10px] text-indigo-600 font-bold block">Toggleable</span>
            </div>
          </div>

          {/* Important Rules and Instructions */}
          <div className="p-4 rounded-2xl bg-amber-50/80 border border-amber-200 text-xs text-amber-950 space-y-2">
            <div className="font-black uppercase tracking-wider text-amber-900 flex items-center gap-1.5">
              <span>⚠️ Important Examination Instructions (परीक्षासम्बन्धी निर्देशन)</span>
            </div>
            <ul className="space-y-1.5 text-slate-800 font-medium pl-1 list-disc list-inside">
              <li>
                The <strong>60-minute countdown</strong> starts immediately upon clicking <strong>Begin CBT Mock Exam</strong>.
              </li>
              <li>
                You can review or flag questions for later and navigate freely across all 30 questions.
              </li>
              <li>
                Leaving or closing the exam window before submitting will discard your answers and progress.
              </li>
              <li>
                <span className="text-indigo-900 font-bold">नेपाली सहयोग:</span> परीक्षा हलमा प्रश्न बुझ्न सजिलोका लागि प्रत्येक प्रश्नको नेपाली अनुवाद र कान्जीमा फुरिगाना उपलब्ध छ।
              </li>
            </ul>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row items-center gap-3 pt-2">
            <button
              type="button"
              onClick={handleRequestExit}
              className="w-full sm:w-1/3 py-3 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-extrabold text-xs transition-colors cursor-pointer border border-slate-200 text-center"
            >
              Cancel &amp; Return
            </button>

            <button
              type="button"
              onClick={() => setIsExamStarted(true)}
              className="w-full sm:w-2/3 py-3 rounded-xl font-black text-xs text-white bg-emerald-600 hover:bg-emerald-500 shadow-md transition-all cursor-pointer flex items-center justify-center gap-2"
            >
              <Play className="w-4 h-4 fill-white" />
              <span>Begin Official CBT Exam (परीक्षा सुरु गर्नुहोस्)</span>
            </button>
          </div>

        </div>
      </div>
    );
  }

  return (
    <div className={`h-full w-full flex flex-col bg-slate-100 text-slate-900 font-sans select-none ${isEmbedded ? 'rounded-2xl overflow-hidden' : ''}`}>
      
      {/* 1. TOP STATUS BAR (Exam Timer, Progress, Furigana & Nepali Controls) */}
      <header className="bg-white border-b border-slate-200 px-3 sm:px-6 py-2.5 flex items-center justify-between gap-2 shrink-0 shadow-xs z-20">
        <div className="flex items-center gap-3 min-w-0">
          <button
            onClick={handleRequestExit}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-rose-50 hover:border-rose-200 hover:text-rose-600 text-slate-700 text-xs font-bold border border-slate-200 transition-colors shrink-0 cursor-pointer"
            title="Exit CBT Exam"
          >
            <ArrowLeft className="w-3.5 h-3.5 text-emerald-600" />
            <span>Exit Mock Test</span>
          </button>

          <div className="min-w-0">
            <div className="flex items-center gap-1.5">
              <span className="px-2 py-0.5 rounded-full bg-emerald-600 text-white text-[10px] font-black uppercase tracking-wide shadow-xs">
                SET {setNumber}
              </span>
              <span className="px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[10px] font-black uppercase tracking-wide hidden sm:inline">
                Official Prometric CBT
              </span>
              <span className="text-xs font-bold text-slate-500 hidden sm:inline">
                30 Questions • Pass 60% (18/30)
              </span>
            </div>
            <h1 className="text-xs sm:text-sm font-black text-slate-900 truncate">
              <FuriganaText text={examData.titleJp} showFurigana={isFuriganaOn} furiganaType={furiganaType} />
            </h1>
          </div>
        </div>

          {/* Center/Right: Timer, Furigana & Nepali Toggles, Submit */}
          <div className="flex items-center gap-2 shrink-0">
            
            {/* Live 60-Min Timer */}
            {!isSubmitted && (
              <div
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl border text-xs font-black shadow-xs ${
                  timeLeftSeconds < 600
                    ? 'bg-rose-50 border-rose-300 text-rose-600 animate-pulse'
                    : 'bg-emerald-50 border-emerald-300 text-emerald-800'
                }`}
              >
                <Clock className="w-4 h-4" />
                <span className="font-mono text-sm tracking-wide">{formatTime(timeLeftSeconds)}</span>
                <button
                  onClick={() => setIsTimerPaused(!isTimerPaused)}
                  title={isTimerPaused ? 'Resume Timer' : 'Pause Timer'}
                  className="ml-1 p-0.5 text-slate-500 hover:text-slate-800 cursor-pointer"
                >
                  {isTimerPaused ? <Play className="w-3 h-3" /> : <Pause className="w-3 h-3" />}
                </button>
              </div>
            )}

            {/* Furigana Toggle Button */}
            <div className="flex items-center rounded-xl bg-slate-100 border border-slate-200 p-0.5 text-xs font-bold">
              <button
                onClick={() => setFuriganaMode('hiragana')}
                className={`px-2 py-1 rounded-lg transition-colors cursor-pointer ${
                  furiganaMode === 'hiragana' ? 'bg-white text-emerald-800 font-black shadow-xs' : 'text-slate-600 hover:text-slate-900'
                }`}
                title="Hiragana Furigana (ひらがな)"
              >
                あ
              </button>
              <button
                onClick={() => setFuriganaMode('katakana')}
                className={`px-2 py-1 rounded-lg transition-colors cursor-pointer ${
                  furiganaMode === 'katakana' ? 'bg-white text-emerald-800 font-black shadow-xs' : 'text-slate-600 hover:text-slate-900'
                }`}
                title="Katakana Furigana (カタカナ)"
              >
                ア
              </button>
              <button
                onClick={() => setFuriganaMode('off')}
                className={`px-1.5 py-1 rounded-lg transition-colors cursor-pointer ${
                  furiganaMode === 'off' ? 'bg-white text-slate-800 font-black shadow-xs' : 'text-slate-400 hover:text-slate-700'
                }`}
                title="Turn Furigana Off (ルビなし)"
              >
                OFF
              </button>
            </div>

            {/* Nepali Toggle Button */}
            <button
              onClick={() => setShowNepali(!showNepali)}
              className={`px-2.5 py-1.5 rounded-xl border text-xs font-bold transition-all cursor-pointer flex items-center gap-1 ${
                showNepali
                  ? 'bg-indigo-50 border-indigo-200 text-indigo-700 shadow-xs'
                  : 'bg-white border-slate-200 text-slate-400 hover:text-slate-700'
              }`}
              title="Toggle Nepali Translation"
            >
              <span>🇳🇵</span>
              <span className="hidden md:inline">{showNepali ? 'Nepali ON' : 'Nepali OFF'}</span>
            </button>

            {/* Submit / End Exam Button */}
            {!isSubmitted ? (
              <button
                onClick={() => setIsReviewModalOpen(true)}
                className="px-4 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-black text-xs transition-all shadow-sm cursor-pointer flex items-center gap-1.5"
              >
                <Award className="w-4 h-4" />
                <span>Submit (採点)</span>
              </button>
            ) : (
              <button
                onClick={handleRetake}
                className="px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs transition-all flex items-center gap-1.5 cursor-pointer shadow-xs"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Retake</span>
              </button>
            )}
          </div>
      </header>

      {/* =========================================================================
          MAIN TEST BODY: Split Layout (Left: Question, Right: Question Palette)
         ========================================================================= */}
      <div className="flex-1 min-h-0 overflow-hidden max-w-7xl w-full mx-auto p-2 sm:p-4 flex flex-col lg:flex-row gap-4">
        
        {/* LEFT PANE: Active Question & Options / Result Report */}
        <div
          ref={questionContainerRef}
          className="flex-1 min-h-0 overflow-y-auto overscroll-contain rounded-2xl bg-white border border-slate-200 p-4 sm:p-6 shadow-xs flex flex-col justify-between scrollbar-thin scrollbar-thumb-slate-300"
        >
          {/* IF EXAM SUBMITTED: RESULT SUMMARY CARD */}
          {isSubmitted ? (
            <div className="space-y-6">
              
              {/* Score Banner */}
              <div
                className={`p-6 sm:p-8 rounded-3xl border shadow-xs space-y-4 ${
                  isPassed
                    ? 'bg-gradient-to-r from-emerald-50 via-teal-50 to-emerald-50/50 border-emerald-300 text-emerald-950'
                    : 'bg-gradient-to-r from-rose-50 via-orange-50 to-rose-50/50 border-rose-300 text-rose-950'
                }`}
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div className="flex items-center gap-4">
                    <span className="text-4xl p-3 bg-white rounded-2xl border border-slate-200 shadow-xs">
                      {isPassed ? '🎉' : '⚠️'}
                    </span>
                    <div>
                      <span
                        className={`px-3 py-0.5 rounded-full text-xs font-black uppercase tracking-wider ${
                          isPassed ? 'bg-emerald-200 text-emerald-900' : 'bg-rose-200 text-rose-900'
                        }`}
                      >
                        {isPassed ? 'PROMETRIC CBT PASSED • 合格' : 'NEEDS PRACTICE • 不合格'}
                      </span>
                      <h2 className="text-2xl sm:text-3xl font-black text-slate-900 mt-1">
                        Your Score: {score} / {examData.totalQuestions} ({percentage}%)
                      </h2>
                      <p className="text-xs sm:text-sm text-slate-600 font-medium">
                        Passing benchmark is 60% ({examData.passScore} / {examData.totalQuestions} correct answers).
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={handleRetake}
                      className="px-5 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs transition-all flex items-center gap-2 shadow-sm cursor-pointer"
                    >
                      <RotateCcw className="w-4 h-4" />
                      Retake Mock Exam
                    </button>
                  </div>
                </div>

                {/* Nepali translation of result */}
                {showNepali && (
                  <div className="p-3.5 rounded-2xl bg-white/80 border border-slate-200/80 text-xs text-slate-800 font-medium">
                    🇳🇵 {isPassed
                      ? `बधाई छ! तपाईंले भवन सरसफाइ विशेष सीप नं. १ परीक्षा उत्तीर्ण गर्नुभयो। तपाईंको प्राप्तांक: ${score}/${examData.totalQuestions} (${percentage}%)।`
                      : `अझै मेहनतको आवश्यकता छ। पास हुन कम्तीमा १८ वटा (६०%) मिलाउनुपर्छ। तपाईंको प्राप्तांक: ${score}/${examData.totalQuestions} (${percentage}%)। गल्तीहरूको तल व्याख्या हेरेर पुनः प्रयास गर्नुहोस्।`}
                  </div>
                )}
              </div>

              {/* Category Breakdown Grid */}
              <div className="space-y-2">
                <h3 className="text-xs font-black uppercase tracking-wider text-slate-500 flex items-center gap-1.5">
                  <BarChart3 className="w-3.5 h-3.5 text-emerald-600" />
                  Syllabus Diagnostic Breakdown (分野別得点分析)
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5">
                  {Object.entries(categoryScores).map(([catKey, cat]) => {
                    const catPct = Math.round((cat.correct / cat.total) * 100);
                    const isCatPassed = catPct >= 60;
                    return (
                      <div key={catKey} className="p-3 rounded-2xl bg-slate-50 border border-slate-200 space-y-1">
                        <div className="flex items-center justify-between text-xs">
                          <span className="font-black text-slate-800 truncate">
                            <FuriganaText text={cat.titleJp} showFurigana={isFuriganaOn} furiganaType={furiganaType} />
                          </span>
                          <span className={`font-black ${isCatPassed ? 'text-emerald-700' : 'text-rose-600'}`}>
                            {cat.correct} / {cat.total}
                          </span>
                        </div>
                        {showNepali && (
                          <p className="text-[10px] text-slate-500 truncate">
                            {cat.titleNe}
                          </p>
                        )}
                        <div className="w-full bg-slate-200 h-1.5 rounded-full overflow-hidden">
                          <div
                            className={`h-full ${isCatPassed ? 'bg-emerald-500' : 'bg-rose-500'}`}
                            style={{ width: `${catPct}%` }}
                          />
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Review Filter Tabs */}
              <div className="flex items-center justify-between border-b border-slate-200 pb-2">
                <div className="flex items-center gap-1">
                  <button
                    onClick={() => setReviewFilter('ALL')}
                    className={`px-3 py-1 rounded-lg text-xs font-bold transition-colors cursor-pointer ${
                      reviewFilter === 'ALL' ? 'bg-slate-900 text-white' : 'bg-slate-100 text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    All Questions ({examData.totalQuestions})
                  </button>
                  <button
                    onClick={() => setReviewFilter('WRONG')}
                    className={`px-3 py-1 rounded-lg text-xs font-bold transition-colors cursor-pointer ${
                      reviewFilter === 'WRONG' ? 'bg-rose-600 text-white' : 'bg-rose-50 text-rose-700 hover:bg-rose-100'
                    }`}
                  >
                    Mistakes Only ({examData.totalQuestions - score})
                  </button>
                  <button
                    onClick={() => setReviewFilter('FLAGGED')}
                    className={`px-3 py-1 rounded-lg text-xs font-bold transition-colors cursor-pointer ${
                      reviewFilter === 'FLAGGED' ? 'bg-amber-600 text-white' : 'bg-amber-50 text-amber-700 hover:bg-amber-100'
                    }`}
                  >
                    Flagged ({flaggedCount})
                  </button>
                </div>
              </div>

              {/* Question-by-Question Review List */}
              <div className="space-y-4">
                {examData.questions
                  .filter((q) => {
                    const isCorrect = selectedAnswers[q.id] === q.correctAnswer;
                    if (reviewFilter === 'WRONG') return !isCorrect;
                    if (reviewFilter === 'CORRECT') return isCorrect;
                    if (reviewFilter === 'FLAGGED') return flaggedQuestions[q.id];
                    return true;
                  })
                  .map((q) => {
                    const selected = selectedAnswers[q.id];
                    const isCorrect = selected === q.correctAnswer;

                    return (
                      <div
                        key={q.id}
                        className={`p-4 rounded-2xl border transition-all space-y-3 ${
                          isCorrect ? 'bg-emerald-50/40 border-emerald-200' : 'bg-rose-50/40 border-rose-200'
                        }`}
                      >
                        <div className="flex items-start justify-between gap-2">
                          <div className="space-y-1">
                            <div className="flex items-center gap-2">
                              <span
                                className={`px-2 py-0.5 rounded-md text-[10px] font-black uppercase ${
                                  isCorrect ? 'bg-emerald-100 text-emerald-800' : 'bg-rose-100 text-rose-800'
                                }`}
                              >
                                Q{q.number} • {isCorrect ? 'CORRECT (正解)' : 'INCORRECT (不正解)'}
                              </span>
                              <span className="text-[10px] font-bold text-slate-500">
                                {q.type === 'TF' ? '○×形式 (True/False)' : '4択一式 (Multiple Choice)'}
                              </span>
                            </div>
                            <h4 className="text-sm font-bold text-slate-900 leading-relaxed">
                              <FuriganaText text={q.questionJp} showFurigana={isFuriganaOn} furiganaType={furiganaType} />
                            </h4>
                            {showNepali && (
                              <p className="text-xs text-indigo-900 font-medium">
                                🇳🇵 {q.questionNe}
                              </p>
                            )}
                          </div>

                          <span className="text-xl shrink-0">{isCorrect ? '✅' : '❌'}</span>
                        </div>

                        {/* Options List */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1">
                          {q.options.map((opt, oIdx) => {
                            const isUserChoice = selected === oIdx;
                            const isCorrectChoice = oIdx === q.correctAnswer;

                            let optStyle = 'bg-white border-slate-200 text-slate-700 opacity-60';
                            if (isCorrectChoice) {
                              optStyle = 'bg-emerald-600 text-white font-black border-emerald-600 shadow-xs';
                            } else if (isUserChoice && !isCorrect) {
                              optStyle = 'bg-rose-100 text-rose-900 font-bold border-rose-300';
                            }

                            return (
                              <div
                                key={oIdx}
                                className={`p-2.5 rounded-xl border text-xs flex items-start gap-2 ${optStyle}`}
                              >
                                <span className="font-mono font-bold shrink-0">
                                  {q.type === 'TF' ? (oIdx === 0 ? '○' : '×') : oIdx + 1}.
                                </span>
                                <div>
                                  <p className="leading-relaxed">
                                    <FuriganaText text={opt.textJp} showFurigana={isFuriganaOn} furiganaType={furiganaType} />
                                  </p>
                                  {showNepali && (
                                    <p className="text-[10px] opacity-80 pt-0.5">
                                      {opt.textNe}
                                    </p>
                                  )}
                                </div>
                              </div>
                            );
                          })}
                        </div>

                        {/* Detailed Explanation */}
                        <div className="p-3.5 rounded-xl bg-white border border-slate-200 space-y-1.5 text-xs">
                          <p className="font-black text-emerald-800 flex items-center gap-1.5">
                            <Lightbulb className="w-3.5 h-3.5" />
                            正解の解説（Explanation）:
                          </p>
                          <p className="text-slate-800 leading-relaxed font-medium">
                            <FuriganaText text={q.explanationJp} showFurigana={isFuriganaOn} furiganaType={furiganaType} />
                          </p>
                          {showNepali && (
                            <p className="text-indigo-950 font-medium border-t border-slate-100 pt-1">
                              🇳🇵 {q.explanationNe}
                            </p>
                          )}
                          {q.examTrapJp && (
                            <div className="p-2 rounded-lg bg-amber-50 border border-amber-200 text-[11px] text-amber-900 space-y-0.5">
                              <p className="font-bold flex items-center gap-1">
                                <AlertTriangle className="w-3 h-3 text-amber-600" />
                                試験のヒント (Exam Tip):
                              </p>
                              <p>
                                <FuriganaText text={q.examTrapJp} showFurigana={isFuriganaOn} furiganaType={furiganaType} />
                              </p>
                              {showNepali && q.examTrapNe && (
                                <p className="text-amber-800">🇳🇵 {q.examTrapNe}</p>
                              )}
                            </div>
                          )}
                        </div>
                      </div>
                    );
                  })}
              </div>

            </div>
          ) : (
            /* =========================================================================
               ACTIVE QUESTION VIEW (DURING LIVE EXAM)
               ========================================================================= */
            <div className="space-y-4">
              
              {/* Question Header & Category Badge */}
              <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                <div className="flex items-center gap-2">
                  <span className="w-8 h-8 rounded-xl bg-slate-900 text-white font-black text-xs flex items-center justify-center">
                    {currentQ.number}
                  </span>
                  <div>
                    <span className="text-[10px] font-black text-emerald-800 uppercase tracking-wider block">
                      <FuriganaText text={currentQ.categoryNameJp} showFurigana={isFuriganaOn} furiganaType={furiganaType} />
                    </span>
                    <span className="text-[11px] font-bold text-slate-500">
                      {currentQ.type === 'TF' ? '○×形式 正誤判定問題' : '4肢択一式 専門知識問題'}
                    </span>
                  </div>
                </div>

                <button
                  onClick={() => handleToggleFlag(currentQ.id)}
                  className={`px-3 py-1.5 rounded-xl border text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                    flaggedQuestions[currentQ.id]
                      ? 'bg-amber-100 border-amber-300 text-amber-800 shadow-xs'
                      : 'bg-slate-50 border-slate-200 text-slate-600 hover:bg-slate-100'
                  }`}
                  title="Mark this question to review later"
                >
                  <Flag className={`w-3.5 h-3.5 ${flaggedQuestions[currentQ.id] ? 'fill-amber-600 text-amber-600' : ''}`} />
                  <span>{flaggedQuestions[currentQ.id] ? 'Flagged (見直す)' : 'Mark for Review'}</span>
                </button>
              </div>

              {/* Question Prompt */}
              <div className="space-y-2 py-1">
                <h3 className="text-base sm:text-lg font-black text-slate-900 leading-relaxed">
                  <FuriganaText text={currentQ.questionJp} showFurigana={isFuriganaOn} furiganaType={furiganaType} />
                </h3>
                {showNepali && (
                  <p className="text-xs sm:text-sm text-indigo-900 font-bold bg-indigo-50/70 p-3 rounded-xl border border-indigo-100">
                    🇳🇵 <strong>नेपाली:</strong> {currentQ.questionNe}
                  </p>
                )}
              </div>

              {/* Optional Visual Diagram Reference for Judgment Questions */}
              {renderDiagram(currentQ.diagramKey)}

              {/* Options Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                {currentQ.options.map((opt, optIdx) => {
                  const isSelected = selectedAnswers[currentQ.id] === optIdx;

                  return (
                    <button
                      key={optIdx}
                      onClick={() => handleSelectAnswer(currentQ.id, optIdx)}
                      className={`p-4 rounded-2xl border text-left transition-all cursor-pointer flex items-start gap-3 ${
                        isSelected
                          ? 'bg-emerald-50 border-emerald-500 ring-2 ring-emerald-500/20 shadow-sm text-emerald-950 font-black'
                          : 'bg-slate-50 border-slate-200 hover:border-slate-300 hover:bg-white text-slate-800'
                      }`}
                    >
                      <span
                        className={`w-6 h-6 rounded-full flex items-center justify-center font-black text-xs shrink-0 transition-colors ${
                          isSelected
                            ? 'bg-emerald-600 text-white'
                            : 'bg-white border border-slate-300 text-slate-600'
                        }`}
                      >
                        {currentQ.type === 'TF' ? (optIdx === 0 ? '○' : '×') : optIdx + 1}
                      </span>
                      <div className="space-y-1">
                        <p className="text-sm font-bold leading-snug">
                          <FuriganaText text={opt.textJp} showFurigana={isFuriganaOn} furiganaType={furiganaType} />
                        </p>
                        {showNepali && (
                          <p className="text-xs text-slate-500 font-normal">
                            {opt.textNe}
                          </p>
                        )}
                      </div>
                    </button>
                  );
                })}
              </div>

              {/* Live Status Hint */}
              <div className="pt-2 text-[11px] text-slate-400 flex items-center justify-between">
                <span>Click any option to select answer</span>
                <span>Question {currentIdx + 1} of {examData.totalQuestions}</span>
              </div>
            </div>
          )}

          {/* Bottom Navigation Buttons */}
          {!isSubmitted && (
            <div className="flex items-center justify-between pt-6 border-t border-slate-100 mt-6">
              <button
                disabled={currentIdx === 0}
                onClick={() => setCurrentIdx((prev) => Math.max(0, prev - 1))}
                className="px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold disabled:opacity-30 disabled:cursor-not-allowed transition-all flex items-center gap-1.5 cursor-pointer"
              >
                <ChevronLeft className="w-4 h-4" />
                <span>Previous (前へ)</span>
              </button>

              <div className="text-xs font-bold text-slate-500">
                Answered: <strong className="text-emerald-700 font-black">{answeredCount}</strong> / {examData.totalQuestions}
              </div>

              {currentIdx < examData.totalQuestions - 1 ? (
                <button
                  onClick={() => setCurrentIdx((prev) => Math.min(examData.totalQuestions - 1, prev + 1))}
                  className="px-5 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-black transition-all flex items-center gap-1.5 cursor-pointer shadow-sm"
                >
                  <span>Next (次へ)</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              ) : (
                <button
                  onClick={() => setIsReviewModalOpen(true)}
                  className="px-5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-black transition-all flex items-center gap-1.5 cursor-pointer shadow-md"
                >
                  <span>Review &amp; Submit</span>
                  <Check className="w-4 h-4" />
                </button>
              )}
            </div>
          )}
        </div>

        {/* =========================================================================
            RIGHT PANE: CBT Question Palette (1 to 30 Grid) & Info Card
           ========================================================================= */}
        <aside className="w-full lg:w-72 shrink-0 bg-white border border-slate-200 rounded-2xl p-4 shadow-xs flex flex-col justify-between space-y-4">
          
          <div className="space-y-3">
            <div className="flex items-center justify-between border-b border-slate-100 pb-2.5">
              <div className="flex items-center gap-1.5">
                <Layers className="w-4 h-4 text-emerald-600" />
                <h3 className="font-black text-xs text-slate-900 uppercase tracking-wider">
                  Question Palette (問題一覧)
                </h3>
              </div>
              <span className="text-[10px] font-black px-2 py-0.5 rounded-md bg-slate-100 text-slate-700">
                {examData.totalQuestions} Qs
              </span>
            </div>

            {/* Legend */}
            <div className="grid grid-cols-2 gap-1.5 text-[10px] text-slate-600 font-semibold pb-1">
              <div className="flex items-center gap-1.5">
                <span className="w-3 h-3 rounded-md bg-emerald-600"></span>
                <span>Answered ({answeredCount})</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-3 h-3 rounded-md bg-slate-100 border border-slate-300"></span>
                <span>Unanswered ({unansweredCount})</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-3 h-3 rounded-md bg-amber-400"></span>
                <span>Flagged ({flaggedCount})</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-3 h-3 rounded-md ring-2 ring-slate-900 bg-white"></span>
                <span>Current</span>
              </div>
            </div>

            {/* 30-Button Grid */}
            <div className="grid grid-cols-6 gap-1.5 pt-1">
              {examData.questions.map((q, qIdx) => {
                const isCurrent = currentIdx === qIdx;
                const isAnswered = selectedAnswers[q.id] !== undefined;
                const isFlagged = flaggedQuestions[q.id];

                let btnStyle = 'bg-slate-100 text-slate-700 hover:bg-slate-200 border-slate-200';
                if (isAnswered) {
                  btnStyle = 'bg-emerald-600 text-white font-black shadow-xs border-emerald-600';
                }
                if (isFlagged) {
                  btnStyle = isAnswered
                    ? 'bg-amber-500 text-white font-black border-amber-600'
                    : 'bg-amber-100 text-amber-900 border-amber-300 font-bold';
                }
                if (isCurrent) {
                  btnStyle += ' ring-2 ring-slate-900 ring-offset-1 scale-105';
                }

                return (
                  <button
                    key={q.id}
                    onClick={() => {
                      setCurrentIdx(qIdx);
                      questionContainerRef.current?.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                    className={`h-9 rounded-xl border text-xs font-bold transition-all flex items-center justify-center relative cursor-pointer ${btnStyle}`}
                  >
                    {q.number}
                    {isFlagged && (
                      <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-amber-500 rounded-full border border-white" />
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Quick Submit & Specs Card */}
          <div className="p-3 rounded-2xl bg-slate-50 border border-slate-200 space-y-2 text-xs">
            <div className="flex items-center justify-between font-bold text-slate-700">
              <span>Pass Criteria:</span>
              <span className="text-emerald-700 font-black">60% (18/30)</span>
            </div>
            <div className="flex items-center justify-between font-bold text-slate-700">
              <span>Time Allowed:</span>
              <span className="text-slate-900 font-black">60 Minutes</span>
            </div>

            {!isSubmitted && (
              <button
                onClick={() => setIsReviewModalOpen(true)}
                className="w-full py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-black text-xs transition-all shadow-sm flex items-center justify-center gap-1.5 cursor-pointer mt-2"
              >
                <Award className="w-3.5 h-3.5" />
                <span>Submit Exam (採点)</span>
              </button>
            )}
          </div>

        </aside>
      </div>

      {/* =========================================================================
          PRE-SUBMISSION CONFIRMATION MODAL
         ========================================================================= */}
      {isReviewModalOpen && !isSubmitted && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4 backdrop-blur-xs animate-fade-in">
          <div className="bg-white rounded-3xl p-6 max-w-md w-full shadow-2xl border border-slate-200 space-y-4 animate-scale-up">
            <div className="flex items-center gap-3">
              <span className="text-3xl p-2.5 bg-emerald-50 text-emerald-700 rounded-2xl border border-emerald-200">
                📝
              </span>
              <div>
                <h3 className="text-lg font-black text-slate-900">
                  Ready to Submit Exam? (採点の確認)
                </h3>
                <p className="text-xs text-slate-500 font-medium">
                  Review your progress before final scoring.
                </p>
              </div>
            </div>

            {/* Status Statistics */}
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2 text-xs font-bold">
              <div className="flex items-center justify-between">
                <span className="text-slate-600">Total Questions:</span>
                <span className="text-slate-900 font-black">{examData.totalQuestions}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-emerald-700">Answered:</span>
                <span className="text-emerald-700 font-black">{answeredCount}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-rose-600">Unanswered:</span>
                <span className="text-rose-600 font-black">{unansweredCount}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-amber-700">Flagged for Review:</span>
                <span className="text-amber-700 font-black">{flaggedCount}</span>
              </div>
              <div className="flex items-center justify-between pt-1 border-t border-slate-200">
                <span className="text-slate-700">Remaining Time:</span>
                <span className="text-slate-900 font-mono font-black">{formatTime(timeLeftSeconds)}</span>
              </div>
            </div>

            {unansweredCount > 0 && (
              <p className="text-xs text-rose-600 font-semibold bg-rose-50 border border-rose-200 p-2.5 rounded-xl">
                ⚠️ You still have {unansweredCount} unanswered question{unansweredCount > 1 ? 's' : ''}. Unanswered questions will be scored as incorrect.
              </p>
            )}

            <div className="flex items-center justify-end gap-2 pt-2">
              <button
                onClick={() => setIsReviewModalOpen(false)}
                className="px-4 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold transition-all cursor-pointer"
              >
                Return to Exam
              </button>
              <button
                onClick={() => {
                  setIsReviewModalOpen(false);
                  setIsSubmitted(true);
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-black transition-all shadow-md cursor-pointer flex items-center gap-1.5"
              >
                <Check className="w-4 h-4" />
                Confirm &amp; Grade
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ── EXIT CONFIRMATION MODAL ── */}
      {showExitConfirmModal && (
        <div className="fixed inset-0 z-[120] flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-fade-in">
          <div className="w-full max-w-md bg-white rounded-3xl p-6 shadow-2xl border border-slate-200 space-y-4">
            <div className="flex items-start gap-3">
              <div className="p-3 rounded-2xl bg-rose-50 text-rose-600 border border-rose-200 text-2xl shrink-0">
                ⚠️
              </div>
              <div className="space-y-1">
                <h3 className="text-base sm:text-lg font-black text-slate-900 leading-snug">
                  Exit CBT Mock Exam? (परीक्षा छोड्ने?)
                </h3>
                <p className="text-xs text-slate-500 font-medium">
                  Set {setNumber} • Building Cleaning CBT Simulator
                </p>
              </div>
            </div>

            <div className="p-3.5 rounded-2xl bg-rose-50/80 border border-rose-200 text-xs text-rose-950 space-y-2">
              <p className="font-semibold leading-relaxed">
                You have answered <strong>{answeredCount} of {examData.totalQuestions} questions</strong> with <strong>{formatTime(timeLeftSeconds)}</strong> remaining.
              </p>
              <p className="text-slate-700 text-[11px] leading-relaxed">
                If you exit now, your current exam session will be terminated and all unsaved progress will be discarded.
              </p>
              <p className="text-indigo-900 font-bold text-[11px] pt-1 border-t border-rose-200">
                🇳🇵 के तपाईं साँच्चै परीक्षा छोड्न चाहनुहुन्छ? बाहिरिएमा तपाईंको प्रगति मेटिनेछ।
              </p>
            </div>

            <div className="flex items-center gap-2 pt-2">
              <button
                type="button"
                onClick={handleCancelExit}
                className="flex-1 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-extrabold text-xs transition-colors cursor-pointer border border-slate-200 text-center"
              >
                Resume Exam (जारी राख्नुहोस्)
              </button>
              <button
                type="button"
                onClick={handleConfirmExit}
                className="flex-1 py-2.5 rounded-xl bg-rose-600 hover:bg-rose-500 text-white font-black text-xs transition-colors cursor-pointer border border-rose-600 shadow-sm text-center"
              >
                Yes, Exit Exam (हो, बाहिरिनुहोस्)
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
