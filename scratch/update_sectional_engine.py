import os

file_path = "components/TimedExamEngine.tsx"
with open(file_path, "r", encoding="utf-8") as f:
    code = f.read()

# Locate handleSubmitExam in code
sub_idx = code.find("const handleSubmitExam = () => {")
rest_code = code[sub_idx:]

# We'll update state and handleSubmitExam + Scorecard rendering
header_code = code[:code.find("export const TimedExamEngine: React.FC<TimedExamEngineProps>")]

new_component = """export interface TimedExamEngineProps {
  activeLanguage?: 'JAPANESE' | 'KOREAN';
  onCompleteExam?: (result: { score: number; passed: boolean; timeSpentSeconds: number }) => void;
}

export const TimedExamEngine: React.FC<TimedExamEngineProps> = ({
  activeLanguage = 'JAPANESE',
  onCompleteExam,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isFullscreen, setIsFullscreen] = useState(false);

  // Flow State
  const [isExamActive, setIsExamActive] = useState(false);
  const [selectedMockTest, setSelectedMockTest] = useState<MockTestInfo | null>(null);

  // 2-Paper Official JLPT Structure (0: Paper 1 [Vocab/Grammar/Reading], 1: Paper 2 [Listening])
  const [currentPaperIndex, setCurrentPaperIndex] = useState<number>(0);
  const [paper1Submitted, setPaper1Submitted] = useState<boolean>(false);
  
  // Modal States
  const [showExitConfirmModal, setShowExitConfirmModal] = useState(false);
  const [showBreakModal, setShowBreakModal] = useState(false);
  const [breakTimerSeconds, setBreakTimerSeconds] = useState(15 * 60);

  const [selectedLevelFilter, setSelectedLevelFilter] = useState<string>('ALL');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<string, string>>({});
  const [flaggedQuestions, setFlaggedQuestions] = useState<Record<string, boolean>>({});
  const [secondsRemaining, setSecondsRemaining] = useState(60 * 60);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [audioPlaysCount, setAudioPlaysCount] = useState<Record<string, number>>({});

  // Exam Results state with JFT 250 marks support
  const [examResult, setExamResult] = useState<{
    score: number;
    correctCount: number;
    totalQuestions: number;
    passed: boolean;
    timeSpentSeconds: number;
    jftScore?: number; // Out of 250 points
    jftSections?: { sectionTitle: string; correct: number; total: number; pts: number }[];
    paper1Score?: { correct: number; total: number; percentage: number };
    paper2Score?: { correct: number; total: number; percentage: number };
  } | null>(null);
  const [reviewFilter, setReviewFilter] = useState<'ALL' | 'INCORRECT' | 'FLAGGED'>('ALL');

  const allQuestions = activeLanguage === 'JAPANESE' ? JAPANESE_QUESTIONS : KOREAN_QUESTIONS;

  const rawQuestions = selectedMockTest
    ? allQuestions.filter((q) => q.mockSet === selectedMockTest.mockSet || (selectedMockTest.mockSet.startsWith('ALL_') && q.level === selectedMockTest.level))
    : allQuestions;

  const isJFT = selectedMockTest?.examFormat === 'JFT_CBT' || selectedMockTest?.level === 'JFT';

  // Filter questions according to current paper (JLPT) vs CBT (JFT)
  const currentPaperQuestions = React.useMemo(() => {
    if (!selectedMockTest || selectedMockTest.language !== 'JAPANESE' || rawQuestions.length < 40 || isJFT) {
      return rawQuestions;
    }
    if (currentPaperIndex === 0) return rawQuestions.slice(0, 36); // Paper 1: Vocab + Grammar + Reading (Q1 to Q36)
    return rawQuestions.slice(36); // Paper 2: Audio Listening (Q37 to Q44)
  }, [rawQuestions, currentPaperIndex, selectedMockTest, isJFT]);

  const questions = currentPaperQuestions;

  const filteredCatalog = MOCK_TEST_CATALOG.filter((test) => {
    if (test.language !== activeLanguage) return false;
    if (selectedLevelFilter !== 'ALL' && test.level !== selectedLevelFilter) return false;
    return true;
  });

  const stopCurrentAudio = () => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
      audioRef.current = null;
    }
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      window.speechSynthesis.cancel();
    }
  };

  useEffect(() => {
    stopCurrentAudio();
  }, [currentIndex, currentPaperIndex, isSubmitted, showBreakModal, showExitConfirmModal, isExamActive]);

  const toggleFullscreen = () => {
    if (!isFullscreen) {
      if (containerRef.current?.requestFullscreen) {
        containerRef.current.requestFullscreen().catch(() => {});
      }
      setIsFullscreen(true);
    } else {
      if (document.fullscreenElement) {
        document.exitFullscreen().catch(() => {});
      }
      setIsFullscreen(false);
    }
  };

  const handleStartExam = (test: MockTestInfo) => {
    stopCurrentAudio();
    setSelectedMockTest(test);
    setCurrentPaperIndex(0);
    setPaper1Submitted(false);
    setCurrentIndex(0);
    setSelectedAnswers({});
    setFlaggedQuestions({});
    setSecondsRemaining((test.timeLimitMinutes || 60) * 60);
    setIsSubmitted(false);
    setExamResult(null);
    setAudioPlaysCount({});
    setReviewFilter('ALL');
    setShowExitConfirmModal(false);
    setShowBreakModal(false);
    setIsExamActive(true);

    if (containerRef.current?.requestFullscreen) {
      containerRef.current.requestFullscreen().catch(() => {});
    }
    setIsFullscreen(true);
  };

  const handleFinishPaper1 = () => {
    stopCurrentAudio();
    setPaper1Submitted(true);
    setShowBreakModal(true);
    setBreakTimerSeconds(15 * 60);
  };

  const handleStartPaper2 = () => {
    stopCurrentAudio();
    setShowBreakModal(false);
    setCurrentPaperIndex(1);
    setCurrentIndex(0);
    setSecondsRemaining(30 * 60); // 30 mins for Paper 2 Listening
  };

  const handleBackButtonClick = () => {
    stopCurrentAudio();
    if (isExamActive && !isSubmitted) {
      setShowExitConfirmModal(true);
    } else {
      handleExitExam();
    }
  };

  const handleExitExam = () => {
    stopCurrentAudio();
    if (document.fullscreenElement) {
      document.exitFullscreen().catch(() => {});
    }
    setIsFullscreen(false);
    setIsExamActive(false);
    setSelectedMockTest(null);
    setIsSubmitted(false);
    setExamResult(null);
    setShowExitConfirmModal(false);
    setShowBreakModal(false);
  };

  // Keyboard navigation
  useEffect(() => {
    if (!isExamActive || isSubmitted || showBreakModal) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (['input', 'textarea'].includes((e.target as HTMLElement)?.tagName?.toLowerCase())) return;

      if (e.key === 'ArrowRight' || e.key === 'PageDown') {
        e.preventDefault();
        setCurrentIndex((prev) => Math.min(questions.length - 1, prev + 1));
      } else if (e.key === 'ArrowLeft' || e.key === 'PageUp') {
        e.preventDefault();
        setCurrentIndex((prev) => Math.max(0, prev - 1));
      } else if (['1', '2', '3', '4'].includes(e.key)) {
        const idx = parseInt(e.key, 10) - 1;
        const currentQ = questions[currentIndex];
        if (currentQ && currentQ.options[idx]) {
          handleSelectAnswer(currentQ.options[idx]);
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isExamActive, isSubmitted, showBreakModal, currentIndex, questions]);

  useEffect(() => {
    if (!showBreakModal) return;
    const breakInterval = setInterval(() => {
      setBreakTimerSeconds((prev) => Math.max(0, prev - 1));
    }, 1000);
    return () => clearInterval(breakInterval);
  }, [showBreakModal]);

  useEffect(() => {
    if (!isExamActive || isSubmitted) return;
    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      e.preventDefault();
      e.returnValue = '';
      return 'Your official exam session is currently in progress. Are you sure you want to leave?';
    };
    window.addEventListener('beforeunload', handleBeforeUnload);
    return () => window.removeEventListener('beforeunload', handleBeforeUnload);
  }, [isExamActive, isSubmitted]);

  useEffect(() => {
    const handleFsChange = () => {
      setIsFullscreen(Boolean(document.fullscreenElement));
    };
    document.addEventListener('fullscreenchange', handleFsChange);
    return () => document.removeEventListener('fullscreenchange', handleFsChange);
  }, []);

  useEffect(() => {
    stopCurrentAudio();
    setIsExamActive(false);
    setSelectedMockTest(null);
    setSelectedLevelFilter('ALL');
    setIsSubmitted(false);
    setExamResult(null);
    setShowExitConfirmModal(false);
    setShowBreakModal(false);
  }, [activeLanguage]);

  useEffect(() => {
    if (!isExamActive || isSubmitted || showBreakModal) return;
    const timer = setInterval(() => {
      setSecondsRemaining((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          if (currentPaperIndex === 0 && rawQuestions.length >= 40 && !isJFT) {
            handleFinishPaper1();
          } else {
            handleSubmitExam();
          }
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [isExamActive, isSubmitted, currentPaperIndex, showBreakModal, isJFT]);

  const currentQ = questions[currentIndex] || questions[0];

  const formatTime = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  const handleSelectAnswer = (option: string) => {
    if (isSubmitted || !currentQ) return;
    setSelectedAnswers((prev) => ({ ...prev, [currentQ.id]: option }));
  };

  const toggleFlag = (qId: string) => {
    setFlaggedQuestions((prev) => ({ ...prev, [qId]: !prev[qId] }));
  };

  const playAudioPrompt = () => {
    if (!currentQ) return;
    const currentPlays = audioPlaysCount[currentQ.id] || 0;
    if (currentPlays >= 2) {
      alert('Rule: Audio can only be replayed a maximum of 2 times in official JLPT exams.');
      return;
    }

    stopCurrentAudio();

    setAudioPlaysCount((prev) => ({ ...prev, [currentQ.id]: currentPlays + 1 }));

    if (currentQ.audioUrl) {
      const audio = new Audio(currentQ.audioUrl);
      audioRef.current = audio;
      audio.play().catch(() => {
        if ('speechSynthesis' in window) {
          const utterance = new SpeechSynthesisUtterance(currentQ.prompt);
          utterance.lang = activeLanguage === 'JAPANESE' ? 'ja-JP' : 'ko-KR';
          window.speechSynthesis.speak(utterance);
        }
      });
    } else if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(currentQ.prompt);
      utterance.lang = activeLanguage === 'JAPANESE' ? 'ja-JP' : 'ko-KR';
      window.speechSynthesis.speak(utterance);
    }
  };

  const handleSubmitExam = () => {
    stopCurrentAudio();
    setIsSubmitted(true);
    let correctCount = 0;
    rawQuestions.forEach((q) => {
      if (selectedAnswers[q.id] === q.correctAnswer) {
        correctCount++;
      }
    });

    const totalQ = rawQuestions.length || 1;
    const percentage = Math.round((correctCount / totalQ) * 100);
    const timeSpentSeconds = ((selectedMockTest?.timeLimitMinutes || 60) * 60) - secondsRemaining;

    if (isJFT) {
      // JFT-Basic CBT Exam 250 Points Scale Scoring (Pass: 200 / 250 pts)
      const jftPoints = Math.round(10 + (correctCount / totalQ) * 240);
      const passed = jftPoints >= 200;

      // 4 JFT Section Scores (~11-12 Qs per section)
      const sec1 = rawQuestions.slice(0, 12);
      const sec2 = rawQuestions.slice(12, 24);
      const sec3 = rawQuestions.slice(24, 36);
      const sec4 = rawQuestions.slice(36);

      const calcJftSec = (title: string, arr: ExamQuestion[], maxPts: number) => {
        const c = arr.filter(q => selectedAnswers[q.id] === q.correctAnswer).length;
        const pts = arr.length ? Math.round((c / arr.length) * maxPts) : 0;
        return { sectionTitle: title, correct: c, total: arr.length, pts };
      };

      setExamResult({
        score: percentage,
        correctCount,
        totalQuestions: totalQ,
        passed,
        timeSpentSeconds: Math.max(1, timeSpentSeconds),
        jftScore: jftPoints,
        jftSections: [
          calcJftSec('Script & Vocabulary (文字・語彙)', sec1, 60),
          calcJftSec('Conversation & Expression (会話・表現)', sec2, 60),
          calcJftSec('Listening Comprehension (聴解)', sec3, 65),
          calcJftSec('Reading Comprehension (読解)', sec4, 65),
        ]
      });

      if (onCompleteExam) {
        onCompleteExam({ score: jftPoints, passed, timeSpentSeconds });
      }
    } else {
      // Standard JLPT Paper Exam Scoring
      const passed = percentage >= 70;
      const p1Arr = rawQuestions.slice(0, 36);
      const p2Arr = rawQuestions.slice(36);

      const calcArr = (arr: ExamQuestion[]) => {
        const c = arr.filter(q => selectedAnswers[q.id] === q.correctAnswer).length;
        return { correct: c, total: arr.length, percentage: arr.length ? Math.round((c/arr.length)*100) : 0 };
      };

      setExamResult({
        score: percentage,
        correctCount,
        totalQuestions: totalQ,
        passed,
        timeSpentSeconds: Math.max(1, timeSpentSeconds),
        paper1Score: rawQuestions.length >= 40 ? calcArr(p1Arr) : undefined,
        paper2Score: rawQuestions.length >= 40 ? calcArr(p2Arr) : undefined,
      });

      if (onCompleteExam) {
        onCompleteExam({ score: percentage, passed, timeSpentSeconds });
      }
    }

    const check = validateExamSubmission(totalQ, timeSpentSeconds, percentage);
    if (!check.valid) {
      console.warn('[AntiCheat]', check.reason);
    }
  };

  // ----------------------------------------------------
  // LOBBY VIEW: DIRECTORY OF MOCK TESTS
  // ----------------------------------------------------
  if (!isExamActive) {
    return (
      <div className="w-full max-w-5xl mx-auto font-sans space-y-6">
        {/* Lobby Header */}
        <div className="bg-slate-900/95 backdrop-blur-xl border border-slate-800 rounded-3xl p-6 shadow-2xl flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-emerald-400 mb-1">
              <Award className="w-4 h-4 text-amber-400" />
              <span>Official Exam Simulator & Prometric CBT Center</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-black text-white">
              {activeLanguage === 'JAPANESE' ? 'JLPT Paper & JFT-Basic CBT Official Exam Center' : 'EPS-TOPIK & TOPIK I / II Mock Test Center'}
            </h2>
            <p className="text-xs text-slate-400 mt-1">
              Supports both JLPT Official 2-Paper Booklet Exam (with 15-min Break) and JFT-Basic Computer Test (250 Marks Scale for SSW A2 Visa).
            </p>
          </div>
        </div>

        {/* Level Filter Bar */}
        <div className="flex items-center gap-2 bg-slate-900/80 p-2 rounded-2xl border border-slate-800 flex-wrap">
          <span className="text-xs font-bold text-slate-400 px-2 flex items-center gap-1.5">
            <Layers className="w-4 h-4 text-indigo-400" /> Choose Level:
          </span>
          <button
            onClick={() => setSelectedLevelFilter('ALL')}
            className={`px-4 py-2 rounded-xl text-xs font-extrabold transition-all cursor-pointer ${
              selectedLevelFilter === 'ALL' ? 'bg-indigo-600 text-white shadow-glow' : 'bg-slate-950 text-slate-400 hover:text-white border border-slate-800'
            }`}
          >
            All Levels ({MOCK_TEST_CATALOG.filter(t => t.language === activeLanguage).length})
          </button>
          {activeLanguage === 'JAPANESE' ? (
            ['N5', 'N4', 'N3', 'N2', 'JFT'].map((lvl) => (
              <button
                key={lvl}
                onClick={() => setSelectedLevelFilter(lvl)}
                className={`px-4 py-2 rounded-xl text-xs font-extrabold transition-all cursor-pointer ${
                  selectedLevelFilter === lvl
                    ? lvl === 'JFT' ? 'bg-cyan-600 text-white shadow-glow' : 'bg-rose-600 text-white shadow-glow'
                    : 'bg-slate-950 text-slate-400 hover:text-white border border-slate-800'
                }`}
              >
                {lvl === 'JFT' ? '💻 JFT-Basic (250 Pts CBT)' : `JLPT ${lvl}`} ({MOCK_TEST_CATALOG.filter(t => t.language === 'JAPANESE' && t.level === lvl).length})
              </button>
            ))
          ) : (
            ['EPS', 'TOPIK2', 'TOPIK3'].map((lvl) => (
              <button
                key={lvl}
                onClick={() => setSelectedLevelFilter(lvl)}
                className={`px-4 py-2 rounded-xl text-xs font-extrabold transition-all cursor-pointer ${
                  selectedLevelFilter === lvl ? 'bg-emerald-600 text-white shadow-glow' : 'bg-slate-950 text-slate-400 hover:text-white border border-slate-800'
                }`}
              >
                {lvl} ({MOCK_TEST_CATALOG.filter(t => t.language === 'KOREAN' && t.level === lvl).length})
              </button>
            ))
          )}
        </div>

        {/* Mock Test Cards Directory */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {filteredCatalog.map((test) => (
            <div
              key={test.id}
              className="group bg-slate-900/90 backdrop-blur-xl border border-slate-800 hover:border-indigo-500/60 rounded-3xl p-6 shadow-xl transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-3">
                  <span className={`px-3 py-1 rounded-xl text-xs font-black text-white bg-gradient-to-r ${test.badgeColor} shadow-md`}>
                    {test.examFormat === 'JFT_CBT' ? '💻 JFT-Basic CBT (250 Marks)' : `📄 JLPT ${test.level} Official Paper`}
                  </span>
                  <div className="flex items-center gap-1.5 text-xs font-bold text-amber-400 bg-slate-950 px-2.5 py-1 rounded-lg border border-slate-800">
                    <Clock className="w-3.5 h-3.5" />
                    <span>{test.examFormat === 'JFT_CBT' ? '4 Sections • 60 Mins' : '2 Papers • 90 Mins'}</span>
                  </div>
                </div>

                <h3 className="text-lg font-black text-white group-hover:text-indigo-300 transition-colors">
                  {test.title}
                </h3>
                {test.japaneseTitle && (
                  <div className="text-xs font-bold font-jp text-slate-400 mt-0.5 mb-2">
                    {test.japaneseTitle}
                  </div>
                )}
                <p className="text-xs text-slate-300 leading-relaxed mb-4">
                  {test.description}
                </p>

                {/* Section tags */}
                <div className="flex flex-wrap gap-1.5 mb-4">
                  {test.examFormat === 'JFT_CBT' ? (
                    <>
                      <span className="px-2.5 py-1 rounded-lg bg-cyan-950/80 border border-cyan-500/40 text-[10px] font-bold text-cyan-300">
                        💻 Prometric CBT Computer Interface
                      </span>
                      <span className="px-2.5 py-1 rounded-lg bg-amber-950/80 border border-amber-500/40 text-[10px] font-bold text-amber-300">
                        🎯 200 / 250 Pass Benchmark (CEFR A2)
                      </span>
                      <span className="px-2.5 py-1 rounded-lg bg-emerald-950/80 border border-emerald-500/40 text-[10px] font-bold text-emerald-300">
                        🔒 4 Section-Locked Parts
                      </span>
                    </>
                  ) : (
                    <>
                      <span className="px-2.5 py-1 rounded-lg bg-indigo-950/80 border border-indigo-500/40 text-[10px] font-bold text-indigo-300">
                        📄 Paper 1: Vocab + Grammar + Reading (Q1-36)
                      </span>
                      <span className="px-2.5 py-1 rounded-lg bg-amber-950/80 border border-amber-500/40 text-[10px] font-bold text-amber-300">
                        ☕ 15-Min Break
                      </span>
                      <span className="px-2.5 py-1 rounded-lg bg-emerald-950/80 border border-emerald-500/40 text-[10px] font-bold text-emerald-300 flex items-center gap-1">
                        <Headphones className="w-3 h-3 text-emerald-400" /> Paper 2: Listening (Q37-44)
                      </span>
                    </>
                  )}
                </div>
              </div>

              <div className="pt-4 border-t border-slate-800/80 flex items-center justify-between">
                <div className="text-[11px] text-slate-400 font-medium">
                  {test.questionCount} Questions • Official Exam Rules
                </div>
                <button
                  onClick={() => handleStartExam(test)}
                  className="px-5 py-2.5 rounded-2xl bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white font-extrabold text-xs shadow-glow transition-all flex items-center gap-2 group-hover:scale-105 cursor-pointer"
                >
                  <Play className="w-4 h-4 fill-white" />
                  <span>Start Official Exam</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  // ----------------------------------------------------
  // INTERACTIVE ACTIVE EXAM VIEW (FULL SCREEN MODE)
  // ----------------------------------------------------
  return (
    <div
      ref={containerRef}
      className={`w-full font-sans transition-all duration-300 ${
        isFullscreen
          ? 'fixed inset-0 z-50 overflow-y-auto bg-slate-950 p-3 sm:p-6 space-y-4'
          : 'max-w-5xl mx-auto space-y-4'
      }`}
    >
      {/* Official 15-Min Break Modal (Between Paper 1 and Paper 2 for JLPT) */}
      {showBreakModal && (
        <div className="fixed inset-0 z-50 bg-slate-950/95 backdrop-blur-md flex items-center justify-center p-4 animate-fade-in">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 max-w-lg w-full shadow-2xl text-center space-y-6">
            <div className="w-20 h-20 rounded-3xl bg-gradient-to-tr from-amber-500 to-orange-600 flex items-center justify-center text-4xl mx-auto shadow-glow">
              ☕
            </div>

            <div>
              <div className="inline-block px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 text-xs font-black uppercase tracking-wider mb-2">
                ✓ Paper 1 (Vocab, Grammar & Reading) Collected & Saved
              </div>
              <h3 className="text-2xl font-black text-white">
                Official Exam Break Interval
              </h3>
              <p className="text-xs text-slate-300 mt-2 leading-relaxed">
                In official JLPT exams, Paper 1 is collected before Paper 2 begins. You can rest now for up to 15 minutes before opening Paper 2 (Listening Audio Section).
              </p>
            </div>

            {/* Break Countdown Display */}
            <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800 flex items-center justify-center gap-3">
              <Clock className="w-6 h-6 text-amber-400 animate-pulse" />
              <div className="text-center">
                <div className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">Break Timer</div>
                <div className="text-3xl font-black font-mono text-amber-400 tracking-wider">
                  {formatTime(breakTimerSeconds)}
                </div>
              </div>
            </div>

            <div className="space-y-3 pt-2">
              <button
                onClick={handleStartPaper2}
                className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-black text-xs shadow-glow transition-all flex items-center justify-center gap-2 cursor-pointer text-sm"
              >
                <Headphones className="w-4 h-4" />
                <span>Begin Paper 2: Listening Audio Section (30 Mins) ➔</span>
              </button>

              <p className="text-[11px] text-slate-400 italic">
                Note: Once Paper 2 begins, you cannot return to Paper 1 questions.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Exit Confirmation Modal Prompt */}
      {showExitConfirmModal && (
        <div className="fixed inset-0 z-50 bg-slate-950/85 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 max-w-md w-full shadow-2xl space-y-5">
            <div className="flex items-center gap-3">
              <div className="p-3 rounded-2xl bg-amber-500/10 border border-amber-500/20">
                <AlertTriangle className="w-6 h-6 text-amber-400" />
              </div>
              <div>
                <h3 className="text-lg font-black text-white">Exit Official Session?</h3>
                <p className="text-xs text-amber-300 font-medium">An official timed exam paper is in progress.</p>
              </div>
            </div>

            <p className="text-xs text-slate-300 leading-relaxed bg-slate-950 p-3.5 rounded-2xl border border-slate-800">
              Leaving now will interrupt your exam for <span className="font-bold text-white">{selectedMockTest?.title}</span>. Submit current answers or exit?
            </p>

            <div className="space-y-2.5 pt-1">
              <button
                onClick={() => {
                  setShowExitConfirmModal(false);
                  handleSubmitExam();
                }}
                className="w-full py-3 rounded-2xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-black text-xs shadow-glow transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <CheckCircle2 className="w-4 h-4" />
                <span>Submit Exam & View Marks</span>
              </button>

              <button
                onClick={() => {
                  setShowExitConfirmModal(false);
                  handleExitExam();
                }}
                className="w-full py-2.5 rounded-2xl bg-slate-800 hover:bg-rose-900/40 text-slate-300 hover:text-rose-300 font-bold text-xs transition-all flex items-center justify-center gap-2 border border-slate-700 cursor-pointer"
              >
                <X className="w-4 h-4" />
                <span>Exit Without Submitting</span>
              </button>

              <button
                onClick={() => setShowExitConfirmModal(false)}
                className="w-full py-2 rounded-xl text-slate-400 hover:text-white font-bold text-xs transition-colors cursor-pointer"
              >
                ▶ Resume Exam Session
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Top Header Bar */}
      <div className="bg-slate-900/95 backdrop-blur-xl border border-slate-800 rounded-2xl p-3 sm:p-4 shadow-2xl flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <button
            onClick={handleBackButtonClick}
            className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-all border border-slate-700 cursor-pointer"
            title="Exit or Submit Exam"
          >
            <ArrowLeft className="w-4 h-4" />
          </button>
          <div>
            <div className="flex items-center gap-1.5 sm:gap-2 text-[10px] sm:text-xs font-bold uppercase tracking-wider text-emerald-400">
              <Award className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-amber-400" />
              <span>{isJFT ? 'JFT-Basic CBT Official Exam (250 Marks Scale)' : `${selectedMockTest?.level} Official Timed Examination`}</span>
              {rawQuestions.length >= 40 && !isJFT && (
                <span className={`px-2 py-0.5 rounded-md text-[10px] font-bold border ${
                  currentPaperIndex === 0 ? 'bg-indigo-600/30 text-indigo-300 border-indigo-500/40' : 'bg-emerald-600/30 text-emerald-300 border-emerald-500/40'
                }`}>
                  {currentPaperIndex === 0 ? 'Paper 1: Vocab + Grammar + Reading' : 'Paper 2: Audio Listening'}
                </span>
              )}
              {isJFT && (
                <span className="px-2 py-0.5 rounded-md bg-cyan-600/30 text-cyan-300 border border-cyan-500/40 text-[10px] font-bold">
                  Prometric CBT Interface
                </span>
              )}
            </div>
            <h2 className="text-sm sm:text-base font-bold text-white mt-0.5">
              {selectedMockTest?.title || 'JLPT Mock Examination'}
            </h2>
          </div>
        </div>

        <div className="flex items-center justify-between sm:justify-end gap-2.5 pt-2 sm:pt-0 border-t sm:border-t-0 border-slate-800 flex-wrap">
          {/* Full Screen Mode Toggle Button */}
          <button
            onClick={toggleFullscreen}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white border border-slate-700 text-xs font-bold transition-all cursor-pointer"
            title={isFullscreen ? 'Exit Full Screen' : 'Enter Full Screen Exam Mode'}
          >
            {isFullscreen ? <Minimize2 className="w-3.5 h-3.5 text-amber-400" /> : <Maximize2 className="w-3.5 h-3.5 text-indigo-400" />}
            <span className="hidden sm:inline">{isFullscreen ? 'Exit Full Screen' : 'Full Screen'}</span>
          </button>

          {/* Timer Display */}
          <div
            className={`flex items-center gap-2 px-3 py-1.5 rounded-xl border transition-all ${
              secondsRemaining < 180
                ? 'bg-rose-950/80 border-rose-500 text-rose-300 animate-pulse'
                : 'bg-slate-950 border-slate-800 text-amber-400'
            }`}
          >
            <Clock className="w-4 h-4 text-amber-400" />
            <span className="text-base sm:text-lg font-black font-mono tracking-wider">{formatTime(secondsRemaining)}</span>
          </div>

          {!isSubmitted && (
            <button
              onClick={currentPaperIndex === 0 && rawQuestions.length >= 40 && !isJFT ? handleFinishPaper1 : handleSubmitExam}
              className="px-4 py-1.5 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-bold text-xs shadow-glow transition-all cursor-pointer"
            >
              {currentPaperIndex === 0 && rawQuestions.length >= 40 && !isJFT ? 'Submit Paper 1 ➔' : 'Submit Final Exam 🏁'}
            </button>
          )}
        </div>
      </div>

      {/* POST-SUBMISSION MARKS & REVIEW SCREEN (PROMETRIC CBT / JLPT SCORECARD) */}
      {isSubmitted && examResult && (
        <div className="bg-slate-900/95 border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-2xl space-y-6">
          {/* Marks Summary Hero Header */}
          <div className="flex flex-col md:flex-row items-center justify-between gap-6 pb-6 border-b border-slate-800">
            <div className="flex items-center gap-5">
              <div
                className={`w-28 h-28 rounded-3xl flex flex-col items-center justify-center font-black text-white shadow-2xl ${
                  examResult.passed ? 'bg-gradient-to-tr from-emerald-600 to-teal-500 shadow-emerald-900/40' : 'bg-gradient-to-tr from-rose-600 to-pink-600 shadow-rose-900/40'
                }`}
              >
                {isJFT ? (
                  <>
                    <span className="text-3xl">{examResult.jftScore}</span>
                    <span className="text-[10px] text-slate-200">/ 250 PTS</span>
                    <span className="text-[9px] uppercase font-bold tracking-wider mt-0.5">{examResult.passed ? 'PASSED' : 'FAILED'}</span>
                  </>
                ) : (
                  <>
                    <span className="text-3xl">{examResult.score}%</span>
                    <span className="text-[10px] uppercase font-bold tracking-wider">{examResult.passed ? 'PASSED' : 'FAILED'}</span>
                  </>
                )}
              </div>

              <div className="space-y-1 text-center md:text-left">
                <div className="flex items-center justify-center md:justify-start gap-2 flex-wrap">
                  <span className="text-xs font-bold uppercase tracking-wider text-amber-400">
                    {isJFT ? 'Prometric CBT Score Report' : 'Official Exam Scorecard'}
                  </span>
                  <span
                    className={`px-2.5 py-0.5 rounded-full text-[10px] font-extrabold ${
                      examResult.passed ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30' : 'bg-rose-500/20 text-rose-300 border border-rose-500/30'
                    }`}
                  >
                    {isJFT
                      ? (examResult.passed ? '★ CEFR A2 Level • SSW Visa Eligible (200+ Pts)' : 'Below 200 Pts Benchmark')
                      : (examResult.passed ? '★ JLPT Certificate Eligible' : 'Retake Practice Advised')}
                  </span>
                </div>
                <h3 className="text-2xl font-black text-white">
                  {selectedMockTest?.title || 'JLPT Mock Examination'}
                </h3>
                <p className="text-xs text-slate-400">
                  Time Spent: <span className="font-bold text-white">{Math.floor(examResult.timeSpentSeconds / 60)}m {examResult.timeSpentSeconds % 60}s</span> • Questions Correct: <span className="font-bold text-white">{examResult.correctCount} / {examResult.totalQuestions}</span> ({examResult.score}%)
                </p>

                {/* Sectional Breakdown for JFT-Basic (250 Marks Scale) */}
                {isJFT && examResult.jftSections && (
                  <div className="grid grid-cols-2 gap-2 pt-2 text-xs">
                    {examResult.jftSections.map((sec, secIdx) => (
                      <div key={secIdx} className="p-2 rounded-xl bg-slate-950 border border-slate-800 flex items-center justify-between">
                        <span className="text-slate-300 text-[11px] font-bold">{sec.sectionTitle}</span>
                        <span className="text-amber-400 font-extrabold">{sec.pts} Pts ({sec.correct}/{sec.total})</span>
                      </div>
                    ))}
                  </div>
                )}

                {/* Sectional Breakdown for JLPT 2-Paper */}
                {!isJFT && examResult.paper1Score && examResult.paper2Score && (
                  <div className="flex items-center gap-2 pt-2 flex-wrap">
                    <span className="px-2.5 py-1 rounded-lg bg-indigo-950/80 border border-indigo-800 text-[11px] font-bold text-indigo-300">
                      Paper 1 (Vocab/Grammar/Reading): <span className="text-amber-400">{examResult.paper1Score.correct}/{examResult.paper1Score.total} ({examResult.paper1Score.percentage}%)</span>
                    </span>
                    <span className="px-2.5 py-1 rounded-lg bg-emerald-950/80 border border-emerald-800 text-[11px] font-bold text-emerald-300">
                      Paper 2 (Listening Audio): <span className="text-amber-400">{examResult.paper2Score.correct}/{examResult.paper2Score.total} ({examResult.paper2Score.percentage}%)</span>
                    </span>
                  </div>
                )}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center gap-3">
              <button
                onClick={() => {
                  stopCurrentAudio();
                  setIsSubmitted(false);
                  setExamResult(null);
                  setSelectedAnswers({});
                  setFlaggedQuestions({});
                  setCurrentPaperIndex(0);
                  setPaper1Submitted(false);
                  setSecondsRemaining((selectedMockTest?.timeLimitMinutes || 60) * 60);
                  setCurrentIndex(0);
                }}
                className="px-4 py-2.5 rounded-2xl bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs transition-all flex items-center gap-2 border border-slate-700 shadow cursor-pointer"
              >
                <RotateCcw className="w-4 h-4 text-amber-400" />
                <span>Retake Exam</span>
              </button>

              <button
                onClick={handleExitExam}
                className="px-5 py-2.5 rounded-2xl bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white font-extrabold text-xs shadow-glow transition-all flex items-center gap-2 cursor-pointer"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Return to Catalog</span>
              </button>
            </div>
          </div>

          {/* Detailed Review Section */}
          <div className="space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <h4 className="text-sm font-bold text-white flex items-center gap-2">
                <BookOpen className="w-4 h-4 text-indigo-400" />
                <span>Detailed Question Review & Explanation Solutions ({rawQuestions.length} Questions)</span>
              </h4>

              {/* Filter Tabs */}
              <div className="flex items-center gap-1.5 bg-slate-950 p-1 rounded-xl border border-slate-800">
                <button
                  onClick={() => setReviewFilter('ALL')}
                  className={`px-3 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                    reviewFilter === 'ALL' ? 'bg-indigo-600 text-white' : 'text-slate-400 hover:text-white'
                  }`}
                >
                  All ({rawQuestions.length})
                </button>
                <button
                  onClick={() => setReviewFilter('INCORRECT')}
                  className={`px-3 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                    reviewFilter === 'INCORRECT' ? 'bg-rose-600 text-white' : 'text-slate-400 hover:text-white'
                  }`}
                >
                  Incorrect ({rawQuestions.filter((q) => selectedAnswers[q.id] !== q.correctAnswer).length})
                </button>
                <button
                  onClick={() => setReviewFilter('FLAGGED')}
                  className={`px-3 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                    reviewFilter === 'FLAGGED' ? 'bg-amber-600 text-white' : 'text-slate-400 hover:text-white'
                  }`}
                >
                  Flagged ({Object.keys(flaggedQuestions).filter((k) => flaggedQuestions[k]).length})
                </button>
              </div>
            </div>

            {/* Questions Detailed List */}
            <div className="space-y-4">
              {rawQuestions
                .filter((q) => {
                  if (reviewFilter === 'INCORRECT') return selectedAnswers[q.id] !== q.correctAnswer;
                  if (reviewFilter === 'FLAGGED') return Boolean(flaggedQuestions[q.id]);
                  return true;
                })
                .map((q, qIdx) => {
                  const userAnswer = selectedAnswers[q.id];
                  const isCorrect = userAnswer === q.correctAnswer;

                  return (
                    <div
                      key={q.id}
                      className={`p-5 rounded-2xl border transition-all space-y-3 ${
                        isCorrect ? 'bg-slate-950/80 border-emerald-500/40' : 'bg-slate-950/80 border-rose-500/40'
                      }`}
                    >
                      <div className="flex items-start justify-between gap-3">
                        <div className="flex items-center gap-2">
                          <span
                            className={`w-7 h-7 rounded-xl flex items-center justify-center text-xs font-bold ${
                              isCorrect ? 'bg-emerald-500/20 text-emerald-300' : 'bg-rose-500/20 text-rose-300'
                            }`}
                          >
                            {qIdx + 1}
                          </span>
                          <span className="text-xs font-bold text-amber-400 uppercase tracking-wider">
                            {q.level} • {q.type}
                          </span>
                        </div>
                        <span
                          className={`px-2.5 py-0.5 rounded-full text-[10px] font-extrabold flex items-center gap-1 ${
                            isCorrect ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30' : 'bg-rose-500/20 text-rose-300 border border-rose-500/30'
                          }`}
                        >
                          {isCorrect ? <Check className="w-3 h-3" /> : <X className="w-3 h-3" />}
                          {isCorrect ? 'Correct Answer' : 'Incorrect'}
                        </span>
                      </div>

                      <div className="text-sm font-bold text-white">{q.prompt}</div>

                      {/* Audio Track Replay */}
                      {q.type === 'LISTENING' && q.audioUrl && (
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => {
                              stopCurrentAudio();
                              const audio = new Audio(q.audioUrl);
                              audioRef.current = audio;
                              audio.play().catch(() => {});
                            }}
                            className="px-3 py-1 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs flex items-center gap-1.5 shadow cursor-pointer"
                          >
                            <Volume2 className="w-3.5 h-3.5" /> Replay Audio Clip
                          </button>
                        </div>
                      )}

                      {/* Options Comparison Grid */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                        {q.options.map((opt, oIdx) => {
                          const isOptionSelected = userAnswer === opt;
                          const isOptionCorrect = q.correctAnswer === opt;

                          let style = 'bg-slate-900 border-slate-800 text-slate-400';
                          if (isOptionCorrect) {
                            style = 'bg-emerald-950 border-emerald-500 text-emerald-200 font-bold';
                          } else if (isOptionSelected) {
                            style = 'bg-rose-950 border-rose-500 text-rose-200 line-through opacity-80';
                          }

                          return (
                            <div key={oIdx} className={`p-2.5 rounded-xl border flex items-center justify-between ${style}`}>
                              <span>{opt}</span>
                              {isOptionCorrect && <span className="text-[10px] font-extrabold text-emerald-400 uppercase">Correct Answer</span>}
                              {isOptionSelected && !isOptionCorrect && <span className="text-[10px] font-extrabold text-rose-400 uppercase">Your Choice</span>}
                            </div>
                          );
                        })}
                      </div>

                      {/* Detailed Explanation */}
                      {q.explanation && (
                        <div className="p-3 rounded-xl bg-indigo-950/40 border border-indigo-800/50 text-xs text-indigo-200">
                          <span className="font-bold text-indigo-300 block mb-0.5">💡 Solution Explanation:</span>
                          {q.explanation}
                        </div>
                      )}
                    </div>
                  );
                })}
            </div>
          </div>
        </div>
      )}

      {/* Main Interactive Question Panel (When taking exam) */}
      {!isSubmitted && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
          {currentQ ? (
            <div className="lg:col-span-2 bg-slate-900/90 border border-slate-800 rounded-3xl p-4 sm:p-6 shadow-xl flex flex-col justify-between">
              <div>
                {/* Header info & Top Quick Next/Prev Controls */}
                <div className="flex items-center justify-between pb-3 mb-3 border-b border-slate-800 flex-wrap gap-2">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="px-3 py-1 rounded-lg bg-indigo-600/20 border border-indigo-500/30 text-indigo-300 text-xs font-extrabold">
                      Question {currentIndex + 1} of {questions.length}
                    </span>
                    {rawQuestions.length >= 40 && !isJFT && (
                      <span className={`px-2.5 py-0.5 rounded-md text-[10px] font-bold border ${
                        currentPaperIndex === 0 ? 'bg-indigo-500/15 border-indigo-500/30 text-indigo-300' : 'bg-emerald-500/15 border-emerald-500/30 text-emerald-300'
                      }`}>
                        {currentPaperIndex === 0 ? 'Paper 1 (Vocab/Grammar/Reading)' : 'Paper 2 (Listening Audio)'}
                      </span>
                    )}
                    {isJFT && (
                      <span className="px-2.5 py-0.5 rounded-md bg-cyan-500/15 border border-cyan-500/30 text-cyan-300 text-[10px] font-bold">
                        CBT Section Locked
                      </span>
                    )}
                  </div>

                  {/* FAST TOP NEXT / PREV BUTTONS (ALWAYS VISIBLE AT TOP) */}
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => setCurrentIndex(Math.max(0, currentIndex - 1))}
                      disabled={currentIndex === 0}
                      className="px-3 py-1 rounded-lg bg-slate-800 disabled:opacity-30 hover:bg-slate-700 text-slate-200 text-xs font-bold transition-all border border-slate-700 flex items-center gap-1 cursor-pointer disabled:cursor-not-allowed"
                    >
                      <ChevronLeft className="w-3.5 h-3.5" /> Prev
                    </button>

                    {currentIndex < questions.length - 1 ? (
                      <button
                        onClick={() => setCurrentIndex(Math.min(questions.length - 1, currentIndex + 1))}
                        className="px-4 py-1.5 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white text-xs font-black transition-all flex items-center gap-1.5 shadow-glow cursor-pointer"
                      >
                        <span>Next</span>
                        <ChevronRight className="w-3.5 h-3.5" />
                      </button>
                    ) : (
                      <button
                        onClick={currentPaperIndex === 0 && rawQuestions.length >= 40 && !isJFT ? handleFinishPaper1 : handleSubmitExam}
                        className="px-4 py-1.5 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white text-xs font-black transition-all flex items-center gap-1.5 shadow-glow cursor-pointer"
                      >
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        <span>{currentPaperIndex === 0 && rawQuestions.length >= 40 && !isJFT ? 'Submit Paper 1 ➔' : 'Submit Exam 🏁'}</span>
                      </button>
                    )}

                    <button
                      onClick={() => toggleFlag(currentQ.id)}
                      className={`p-1.5 rounded-lg text-xs border transition-all cursor-pointer ml-1 ${
                        flaggedQuestions[currentQ.id]
                          ? 'bg-amber-500/20 border-amber-500/50 text-amber-300'
                          : 'bg-slate-950 border-slate-800 text-slate-400 hover:text-white'
                      }`}
                      title={flaggedQuestions[currentQ.id] ? 'Flagged for Review' : 'Flag Question'}
                    >
                      <Flag className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

                <div className="mb-4">
                  {currentQ.type === 'LISTENING' && (
                    <div className="mb-3 bg-slate-950 p-3.5 rounded-2xl border border-slate-800 flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="p-2.5 rounded-xl bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
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
                        className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs shadow-md transition-all cursor-pointer"
                      >
                        Play Audio Clip
                      </button>
                    </div>
                  )}

                  <h3 className="text-base sm:text-lg font-extrabold text-slate-100 leading-relaxed font-jp whitespace-pre-line bg-slate-950/60 p-3.5 rounded-2xl border border-slate-800/80">
                    {currentQ.prompt}
                  </h3>
                </div>

                <div className="space-y-2.5">
                  {currentQ.options.map((option, idx) => {
                    const isSelected = selectedAnswers[currentQ.id] === option;

                    let optionStyle = 'bg-slate-950/80 border-slate-800 text-slate-200 hover:border-slate-700';
                    if (isSelected) {
                      optionStyle = 'bg-indigo-950/90 border-indigo-500 text-indigo-200 shadow-glow font-bold';
                    }

                    return (
                      <button
                        key={idx}
                        onClick={() => handleSelectAnswer(option)}
                        className={`w-full text-left p-3.5 rounded-2xl border transition-all flex items-center justify-between cursor-pointer ${optionStyle}`}
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
              </div>

              {/* Bottom Action Bar: Previous, Next, and Submit on Last Question */}
              <div className="flex items-center justify-between pt-4 mt-5 border-t border-slate-800 gap-3">
                <button
                  onClick={() => setCurrentIndex(Math.max(0, currentIndex - 1))}
                  disabled={currentIndex === 0}
                  className="px-4 py-2 rounded-xl bg-slate-800 disabled:opacity-30 hover:bg-slate-700 text-slate-200 text-xs font-extrabold transition-all flex items-center gap-1.5 border border-slate-700 cursor-pointer disabled:cursor-not-allowed"
                >
                  <ChevronLeft className="w-4 h-4" />
                  <span>Previous</span>
                </button>

                <div className="text-[11px] text-slate-400 hidden sm:block">
                  Press <kbd className="px-1.5 py-0.5 bg-slate-950 rounded border border-slate-800 text-slate-300 font-mono">➔</kbd> for Next
                </div>

                {currentIndex < questions.length - 1 ? (
                  <button
                    onClick={() => setCurrentIndex(Math.min(questions.length - 1, currentIndex + 1))}
                    className="px-6 py-2.5 rounded-2xl bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white text-xs font-black transition-all flex items-center gap-2 shadow-glow cursor-pointer"
                  >
                    <span>Next Question</span>
                    <ChevronRight className="w-4 h-4" />
                  </button>
                ) : (
                  <button
                    onClick={currentPaperIndex === 0 && rawQuestions.length >= 40 && !isJFT ? handleFinishPaper1 : handleSubmitExam}
                    className="px-6 py-2.5 rounded-2xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white text-xs font-black transition-all flex items-center gap-2 shadow-glow cursor-pointer"
                  >
                    <CheckCircle2 className="w-4 h-4" />
                    <span>{currentPaperIndex === 0 && rawQuestions.length >= 40 && !isJFT ? 'Submit Paper 1 ➔' : 'Submit Final Exam 🏁'}</span>
                  </button>
                )}
              </div>
            </div>
          ) : (
            <div className="lg:col-span-2 bg-slate-900/90 border border-slate-800 rounded-3xl p-8 text-center text-slate-400">
              No questions available for this section.
            </div>
          )}

          <div className="bg-slate-900/90 border border-slate-800 rounded-3xl p-4 sm:p-5 shadow-xl flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-3 border-b border-slate-800 pb-2">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-300">
                  Question Navigator
                </h4>
                {rawQuestions.length >= 40 && !isJFT && (
                  <span className="text-[10px] font-bold text-amber-400">
                    {currentPaperIndex === 0 ? 'Paper 1 (Q1-36)' : 'Paper 2 (Q37-44)'}
                  </span>
                )}
                {isJFT && (
                  <span className="text-[10px] font-bold text-cyan-400">
                    JFT CBT (50 Qs)
                  </span>
                )}
              </div>

              <div className="grid grid-cols-5 gap-2 mb-4 max-h-[320px] overflow-y-auto pr-1 scrollbar-thin scrollbar-thumb-slate-700">
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
                      className={`relative h-9 rounded-xl border text-xs flex items-center justify-center transition-all cursor-pointer ${gridStyle}`}
                    >
                      <span>{idx + 1}</span>
                      {isFlagged && <Flag className="absolute top-0.5 right-0.5 w-2.5 h-2.5 text-amber-400" />}
                    </button>
                  );
                })}
              </div>

              <div className="space-y-1.5 text-[11px] text-slate-400 border-t border-slate-800 pt-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 rounded bg-emerald-950 border border-emerald-500" />
                    <span>Answered</span>
                  </div>
                  <span className="font-bold text-emerald-400">{questions.filter(q => selectedAnswers[q.id]).length}</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 rounded bg-amber-950 border border-amber-500" />
                    <span>Flagged</span>
                  </div>
                  <span className="font-bold text-amber-400">{questions.filter(q => flaggedQuestions[q.id]).length}</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 rounded bg-slate-950 border border-slate-800" />
                    <span>Unanswered</span>
                  </div>
                  <span className="font-bold text-slate-400">{questions.length - questions.filter(q => selectedAnswers[q.id]).length}</span>
                </div>
              </div>
            </div>

            <div className="mt-4 pt-3 border-t border-slate-800 text-center">
              {currentPaperIndex === 0 && rawQuestions.length >= 40 && !isJFT ? (
                <button
                  onClick={handleFinishPaper1}
                  className="w-full py-2.5 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white font-bold text-xs shadow-glow transition-all cursor-pointer"
                >
                  Submit Paper 1 ➔
                </button>
              ) : (
                <button
                  onClick={handleSubmitExam}
                  className="w-full py-2.5 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-bold text-xs shadow-glow transition-all cursor-pointer"
                >
                  Submit Final Exam 🏁
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
"""

full_code = header_code + new_component

with open(file_path, "w", encoding="utf-8") as f:
    f.write(full_code)

print("SUCCESSFULLY_UPDATED_JFT_250_MARKS_SCORING_ENGINE")
