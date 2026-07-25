'use client';

import React, { useState, useEffect } from 'react';
import { Clock, Flag, CheckCircle2, Volume2, Award, ChevronRight, ChevronLeft, Layers, HelpCircle, Check, X } from 'lucide-react';
import { validateExamSubmission } from '@/lib/auth-security';

export interface ExamQuestion {
  id: string;
  level: string; // N5, N4, N3, N2 | EPS, TOPIK2, TOPIK3, TOPIK4
  type: 'MULTIPLE_CHOICE' | 'LISTENING' | 'FILL_BLANK';
  prompt: string;
  audioUrl?: string;
  options: string[];
  correctAnswer: string;
  explanation?: string;
}

const JAPANESE_QUESTIONS: ExamQuestion[] = [
  // N5 Questions
  {
    id: 'jp_n5_1',
    level: 'N5',
    type: 'MULTIPLE_CHOICE',
    prompt: '下線の言葉のひらがなを選んでください: 私は毎日日本のご飯を【食べます】。',
    options: ['のみます', 'たべます', 'いきます', 'きます'],
    correctAnswer: 'たべます',
    explanation: '「食べます」のひらがな読みは「たべます」です。',
  },
  {
    id: 'jp_n5_2',
    level: 'N5',
    type: 'FILL_BLANK',
    prompt: '正しい助詞(particle)を入れてください: 私はバス____学校へ行きます。',
    options: ['に', 'で', 'を', 'が'],
    correctAnswer: 'で',
    explanation: '手段(by means of)を表す助詞は「で」を使います。「バスで行きます」 = Go by bus.',
  },
  {
    id: 'jp_n5_3',
    level: 'N5',
    type: 'MULTIPLE_CHOICE',
    prompt: '【明日】の正しい読み方を選んでください。',
    options: ['あした', 'きょう', 'きのう', 'あさって'],
    correctAnswer: 'あした',
    explanation: '「明日」の読み方は「あした」(Tomorrow)です。',
  },

  // N4 Questions
  {
    id: 'jp_n4_1',
    level: 'N4',
    type: 'MULTIPLE_CHOICE',
    prompt: '【準備】の正しい読み方を選んでください。',
    options: ['じゅんび', 'しょんび', 'じゅうび', 'ちゅんび'],
    correctAnswer: 'じゅんび',
    explanation: '「準備」の読み方は「じゅんび」(Preparation)です。',
  },
  {
    id: 'jp_n4_2',
    level: 'N4',
    type: 'FILL_BLANK',
    prompt: '適切な文法を選んでください: 雨が_____そうだから、傘を持っていきましょう。',
    options: ['ふり', 'ふって', 'ふった', 'ふりそう'],
    correctAnswer: 'ふり',
    explanation: '動詞のます形語幹 ＋ そう (Look like it is going to rain).',
  },
  {
    id: 'jp_n4_3',
    level: 'N4',
    type: 'FILL_BLANK',
    prompt: '日本語を勉強したい_____、いい先生を紹介していただけませんか。',
    options: ['んですが', 'のに', 'ので', 'から'],
    correctAnswer: 'んですが',
    explanation: '依頼・質問の前に状況を導入する「〜んですが」を使います。',
  },

  // N3 Questions
  {
    id: 'jp_n3_1',
    level: 'N3',
    type: 'MULTIPLE_CHOICE',
    prompt: '「環境問題について_____。」に続く最も適切な表現を選びなさい。',
    options: ['議論するべきだ', '食べるべきだ', '走るべきだ', '寝るべきだ'],
    correctAnswer: '議論するべきだ',
    explanation: '環境問題(Environmental problems)について議論する(discuss)べきです。',
  },
  {
    id: 'jp_n3_2',
    level: 'N3',
    type: 'FILL_BLANK',
    prompt: '彼が犯人に_____。証拠が揃っている。',
    options: ['違いない', 'かもしれない', 'はずがない', 'わけがない'],
    correctAnswer: '違いない',
    explanation: '「〜に違いない」 = Must be ~ without doubt.',
  },

  // N2 Questions
  {
    id: 'jp_n2_1',
    level: 'N2',
    type: 'FILL_BLANK',
    prompt: 'どんなに困難であっても、最後まであきらめる____。',
    options: ['べきではない', 'わけにはいかない', 'にほかならない', 'にすぎない'],
    correctAnswer: 'わけにはいかない',
    explanation: '「あきらめるわけにはいかない」 = Cannot afford to give up.',
  },
];

const KOREAN_QUESTIONS: ExamQuestion[] = [
  // EPS-TOPIK
  {
    id: 'ko_eps_1',
    level: 'EPS',
    type: 'MULTIPLE_CHOICE',
    prompt: '다음 단어와 관계있는 것은 무엇입니까? (다음: 사과, 배, 수박)',
    options: ['야채', '과일', '음료수', '가구'],
    correctAnswer: '과일',
    explanation: '사과(Apple), 배(Pear), 수박(Watermelon)은 모두 과일(Fruit)입니다.',
  },
  {
    id: 'ko_eps_2',
    level: 'EPS',
    type: 'FILL_BLANK',
    prompt: '빈칸에 들어갈 가장 알맞은 것을 골라주십시오: 한국어 시험이 _____ 너무 떨려요.',
    options: ['어려워서', '쉬워서', '재미있어서', '좋아서'],
    correctAnswer: '어려워서',
    explanation: '시험이 어려워서(Because test is difficult) 떨립니다.',
  },
  {
    id: 'ko_eps_3',
    level: 'EPS',
    type: 'MULTIPLE_CHOICE',
    prompt: '공장에서 일할 때 반드시 착용해야 하는 안전 장구는 무엇입니까?',
    options: ['안전모', '운동화', '모자', '슬리퍼'],
    correctAnswer: '안전모',
    explanation: '공장에서는 머리를 보호하기 위해 안전모(Safety Helmet)를 착용해야 합니다.',
  },

  // TOPIK 2
  {
    id: 'ko_t2_1',
    level: 'TOPIK2',
    type: 'MULTIPLE_CHOICE',
    prompt: '다음 글의 주제로 가장 알맞은 것을 골라주십시오: 건강을 유지하기 위해서는 규칙적인 운동과 식사가 필수적이다.',
    options: ['건강 관리의 중요성', '운동의 종류', '식사 요리법', '병원 이용 방법'],
    correctAnswer: '건강 관리의 중요성',
    explanation: '규칙적인 운동과 식사로 건강을 유지하는 중요성을 설명합니다.',
  },

  // TOPIK 3
  {
    id: 'ko_t3_1',
    level: 'TOPIK3',
    type: 'FILL_BLANK',
    prompt: '환경 오염이 심각해짐에 _____ 정부는 새로운 정책을 발표했다.',
    options: ['따라', '대해', '관해', '위해'],
    correctAnswer: '따라',
    explanation: '~에 따라 = according to / as a consequence of.',
  },

  // TOPIK 4
  {
    id: 'ko_t4_1',
    level: 'TOPIK4',
    type: 'MULTIPLE_CHOICE',
    prompt: '다음 중 문맥상 의미가 가장 어색한 표현을 고르시오.',
    options: ['경제 성장이 가속화되고 있다', '기술 혁신이 침체되고 있다', '물가가 지속적으로 상승한다', '고용 시장이 활성화된다'],
    correctAnswer: '기술 혁신이 침체되고 있다',
    explanation: '문맥 및 일반적 표현 비교 시 적절성을 평가합니다.',
  },
];

export interface TimedExamEngineProps {
  activeLanguage?: 'JAPANESE' | 'KOREAN';
  onCompleteExam?: (result: { score: number; passed: boolean; timeSpentSeconds: number }) => void;
}

export const TimedExamEngine: React.FC<TimedExamEngineProps> = ({
  activeLanguage = 'JAPANESE',
  onCompleteExam,
}) => {
  const [selectedLevelFilter, setSelectedLevelFilter] = useState<string>('ALL');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<string, string>>({});
  const [flaggedQuestions, setFlaggedQuestions] = useState<Record<string, boolean>>({});
  const [secondsRemaining, setSecondsRemaining] = useState(50 * 60);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [audioPlaysCount, setAudioPlaysCount] = useState<Record<string, number>>({});

  const allQuestions = activeLanguage === 'JAPANESE' ? JAPANESE_QUESTIONS : KOREAN_QUESTIONS;

  const questions = selectedLevelFilter === 'ALL'
    ? allQuestions
    : allQuestions.filter(q => q.level === selectedLevelFilter);

  useEffect(() => {
    setCurrentIndex(0);
    setSelectedAnswers({});
    setFlaggedQuestions({});
    setSecondsRemaining(50 * 60);
    setIsSubmitted(false);
    setAudioPlaysCount({});
    setSelectedLevelFilter('ALL');
  }, [activeLanguage]);

  useEffect(() => {
    if (isSubmitted) return;
    const timer = setInterval(() => {
      setSecondsRemaining((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          handleSubmitExam();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [isSubmitted]);

  const currentQ = questions[currentIndex] || questions[0];

  const formatTime = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  const handleSelectAnswer = (option: string) => {
    if (isSubmitted || !currentQ) return;
    setSelectedAnswers({ ...selectedAnswers, [currentQ.id]: option });
  };

  const toggleFlag = (qId: string) => {
    setFlaggedQuestions({ ...flaggedQuestions, [qId]: !flaggedQuestions[qId] });
  };

  const playAudioPrompt = () => {
    if (!currentQ) return;
    const currentPlays = audioPlaysCount[currentQ.id] || 0;
    if (currentPlays >= 2) {
      alert('Rule: Audio can only be replayed a maximum of 2 times.');
      return;
    }
    setAudioPlaysCount({ ...audioPlaysCount, [currentQ.id]: currentPlays + 1 });

    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(currentQ.prompt);
      utterance.lang = activeLanguage === 'JAPANESE' ? 'ja-JP' : 'ko-KR';
      window.speechSynthesis.speak(utterance);
    }
  };

  const handleSubmitExam = () => {
    setIsSubmitted(true);
    let correctCount = 0;
    questions.forEach((q) => {
      if (selectedAnswers[q.id] === q.correctAnswer) {
        correctCount++;
      }
    });

    const score = Math.round((correctCount / questions.length) * 100);
    const passed = score >= 70;
    const timeSpentSeconds = 50 * 60 - secondsRemaining;

    const check = validateExamSubmission(questions.length, timeSpentSeconds, score);
    if (!check.valid) {
      console.warn('[AntiCheat]', check.reason);
    }

    if (onCompleteExam) {
      onCompleteExam({ score, passed, timeSpentSeconds });
    }
  };

  return (
    <div className="w-full max-w-5xl mx-auto font-sans">
      {/* Top Header Bar */}
      <div className="bg-slate-900/95 backdrop-blur-xl border border-slate-800 rounded-3xl p-5 shadow-2xl mb-6 flex flex-col md:flex-row items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-emerald-400">
            <Award className="w-4 h-4 text-amber-400" />
            <span>Timed Exam Simulator & Auto Grading</span>
          </div>
          <h2 className="text-xl font-bold text-white mt-1">
            {activeLanguage === 'JAPANESE'
              ? 'JLPT Standard Model Mock Examination (N5, N4, N3, N2)'
              : 'EPS-TOPIK & TOPIK Level 2, 3, 4 Mock Examination'}
          </h2>
        </div>

        <div className="flex items-center gap-4">
          <div
            className={`flex items-center gap-2.5 px-4 py-2 rounded-2xl border transition-all ${
              secondsRemaining < 300
                ? 'bg-rose-950/80 border-rose-500 text-rose-300 animate-pulse'
                : 'bg-slate-950 border-slate-800 text-amber-400'
            }`}
          >
            <Clock className="w-5 h-5 text-amber-400" />
            <span className="text-xl font-black font-mono tracking-wider">{formatTime(secondsRemaining)}</span>
          </div>

          {!isSubmitted && (
            <button
              onClick={handleSubmitExam}
              className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-bold text-xs shadow-glow transition-all"
            >
              Submit Exam Now
            </button>
          )}
        </div>
      </div>

      {/* Level Selector Bar */}
      <div className="flex items-center gap-2 mb-6 bg-slate-900/80 p-2 rounded-2xl border border-slate-800 flex-wrap">
        <span className="text-xs font-bold text-slate-400 px-2 flex items-center gap-1">
          <Layers className="w-3.5 h-3.5" /> Level:
        </span>
        <button
          onClick={() => { setSelectedLevelFilter('ALL'); setCurrentIndex(0); }}
          className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
            selectedLevelFilter === 'ALL' ? 'bg-indigo-600 text-white' : 'bg-slate-950 text-slate-400 hover:text-white'
          }`}
        >
          All Levels
        </button>
        {activeLanguage === 'JAPANESE' ? (
          ['N5', 'N4', 'N3', 'N2'].map(lvl => (
            <button
              key={lvl}
              onClick={() => { setSelectedLevelFilter(lvl); setCurrentIndex(0); }}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                selectedLevelFilter === lvl ? 'bg-rose-600 text-white' : 'bg-slate-950 text-slate-400 hover:text-white'
              }`}
            >
              JLPT {lvl}
            </button>
          ))
        ) : (
          ['EPS', 'TOPIK2', 'TOPIK3', 'TOPIK4'].map(lvl => (
            <button
              key={lvl}
              onClick={() => { setSelectedLevelFilter(lvl); setCurrentIndex(0); }}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                selectedLevelFilter === lvl ? 'bg-emerald-600 text-white' : 'bg-slate-950 text-slate-400 hover:text-white'
              }`}
            >
              {lvl}
            </button>
          ))
        )}
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {currentQ && (
          <div className="lg:col-span-2 bg-slate-900/90 border border-slate-800 rounded-3xl p-6 shadow-xl flex flex-col justify-between min-h-[420px]">
            <div>
              <div className="flex items-center justify-between pb-4 mb-4 border-b border-slate-800">
                <div className="flex items-center gap-2">
                  <span className="px-3 py-1 rounded-lg bg-indigo-600/20 border border-indigo-500/30 text-indigo-300 text-xs font-bold">
                    Question {currentIndex + 1} of {questions.length}
                  </span>
                  <span className="px-2 py-0.5 rounded-md bg-slate-800 text-amber-400 text-[10px] font-bold">
                    {currentQ.level}
                  </span>
                </div>

                <button
                  onClick={() => toggleFlag(currentQ.id)}
                  className={`flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-semibold border transition-all ${
                    flaggedQuestions[currentQ.id]
                      ? 'bg-amber-500/20 border-amber-500/50 text-amber-300'
                      : 'bg-slate-950 border-slate-800 text-slate-400 hover:text-white'
                  }`}
                >
                  <Flag className="w-3.5 h-3.5" />
                  <span>{flaggedQuestions[currentQ.id] ? 'Flagged' : 'Flag for Review'}</span>
                </button>
              </div>

              <div className="mb-6">
                {currentQ.type === 'LISTENING' && (
                  <div className="mb-4 bg-slate-950 p-4 rounded-2xl border border-slate-800 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="p-3 rounded-xl bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                        <Volume2 className="w-5 h-5 animate-pulse" />
                      </div>
                      <div>
                        <div className="text-xs font-bold text-white">Audio Listening Track</div>
                        <div className="text-[11px] text-slate-400">
                          Played: {audioPlaysCount[currentQ.id] || 0} / 2 times max
                        </div>
                      </div>
                    </div>
                    <button
                      onClick={playAudioPrompt}
                      className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs shadow-md transition-all"
                    >
                      Play Audio Clip
                    </button>
                  </div>
                )}

                <h3 className="text-lg font-bold text-slate-100 leading-relaxed">{currentQ.prompt}</h3>
              </div>

              <div className="space-y-3">
                {currentQ.options.map((option, idx) => {
                  const isSelected = selectedAnswers[currentQ.id] === option;
                  const isCorrect = currentQ.correctAnswer === option;

                  let optionStyle = 'bg-slate-950/80 border-slate-800 text-slate-200 hover:border-slate-700';

                  if (isSubmitted) {
                    if (isCorrect) {
                      optionStyle = 'bg-emerald-950/80 border-emerald-500 text-emerald-200 font-bold';
                    } else if (isSelected) {
                      optionStyle = 'bg-rose-950/80 border-rose-500 text-rose-200';
                    }
                  } else if (isSelected) {
                    optionStyle = 'bg-indigo-950/80 border-indigo-500 text-indigo-200 shadow-glow font-bold';
                  }

                  return (
                    <button
                      key={idx}
                      onClick={() => handleSelectAnswer(option)}
                      className={`w-full text-left p-4 rounded-2xl border transition-all flex items-center justify-between ${optionStyle}`}
                    >
                      <div className="flex items-center gap-3">
                        <span className="w-7 h-7 rounded-xl bg-slate-800 flex items-center justify-center text-xs font-bold text-slate-300">
                          {idx + 1}
                        </span>
                        <span className="text-sm font-medium">{option}</span>
                      </div>
                      {isSelected && <CheckCircle2 className="w-5 h-5 text-indigo-400" />}
                    </button>
                  );
                })}
              </div>

              {isSubmitted && currentQ.explanation && (
                <div className="mt-5 p-4 rounded-2xl bg-indigo-950/40 border border-indigo-800/50 text-xs text-indigo-200">
                  <span className="font-bold block mb-1">Explanation:</span>
                  {currentQ.explanation}
                </div>
              )}
            </div>

            <div className="flex items-center justify-between pt-6 mt-6 border-t border-slate-800">
              <button
                onClick={() => setCurrentIndex(Math.max(0, currentIndex - 1))}
                disabled={currentIndex === 0}
                className="px-4 py-2 rounded-xl bg-slate-800 disabled:opacity-40 hover:bg-slate-700 text-slate-200 text-xs font-bold transition-all flex items-center gap-1.5"
              >
                <ChevronLeft className="w-4 h-4" /> Previous
              </button>

              <button
                onClick={() => setCurrentIndex(Math.min(questions.length - 1, currentIndex + 1))}
                disabled={currentIndex === questions.length - 1}
                className="px-4 py-2 rounded-xl bg-slate-800 disabled:opacity-40 hover:bg-slate-700 text-slate-200 text-xs font-bold transition-all flex items-center gap-1.5"
              >
                Next <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        <div className="bg-slate-900/90 border border-slate-800 rounded-3xl p-6 shadow-xl flex flex-col justify-between">
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-4">
              Question Navigator Grid
            </h4>

            <div className="grid grid-cols-4 gap-2.5 mb-6">
              {questions.map((q, idx) => {
                const isAnswered = Boolean(selectedAnswers[q.id]);
                const isFlagged = Boolean(flaggedQuestions[q.id]);
                const isCurrent = idx === currentIndex;

                let gridStyle = 'bg-slate-950 border-slate-800 text-slate-400';

                if (isCurrent) {
                  gridStyle = 'ring-2 ring-indigo-500 border-indigo-400 text-white font-bold bg-slate-800';
                } else if (isFlagged) {
                  gridStyle = 'bg-amber-950/80 border-amber-500 text-amber-300 font-bold';
                } else if (isAnswered) {
                  gridStyle = 'bg-emerald-950/80 border-emerald-500 text-emerald-300 font-bold';
                }

                return (
                  <button
                    key={q.id}
                    onClick={() => setCurrentIndex(idx)}
                    className={`relative h-12 rounded-xl border text-xs flex items-center justify-center transition-all ${gridStyle}`}
                  >
                    <span>{idx + 1}</span>
                    {isFlagged && <Flag className="absolute top-1 right-1 w-3 h-3 text-amber-400" />}
                  </button>
                );
              })}
            </div>

            <div className="space-y-2 text-xs text-slate-400 border-t border-slate-800 pt-4">
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded bg-emerald-950 border border-emerald-500" />
                <span>Answered</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded bg-amber-950 border border-amber-500" />
                <span>Flagged for Review</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded bg-slate-950 border border-slate-800" />
                <span>Unanswered</span>
              </div>
            </div>
          </div>

          <div className="mt-6 pt-4 border-t border-slate-800 text-center">
            <div className="text-xs text-slate-400 font-medium">Answered Progress</div>
            <div className="text-xl font-bold text-white mt-0.5">
              {Object.keys(selectedAnswers).length} / {questions.length} Questions
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
