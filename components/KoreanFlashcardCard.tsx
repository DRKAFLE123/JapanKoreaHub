import React, { useState, useMemo, useEffect } from 'react';
import { RotateCcw, Volume2, ChevronRight, ChevronLeft, Award, ArrowRight, BookOpen, Globe, Eye, Filter, ChevronDown, Shuffle, Bookmark, Lock, User, Sparkles, CheckCircle2 } from 'lucide-react';
import { calculateSM2, SrsItemState, SrsRating } from '@/lib/srs-engine';
import { KOREAN_VOCAB_DATA, KoreanVocabItem, getKoreanVocabByLevel } from '@/lib/korean-vocab';
import { getAuthUser, getMarkedUnknownWords, isWordMarked, toggleMarkedWord, recordCardReviewStat, AuthUser } from '@/lib/practice-later';
import SignupGate from '@/components/gates/SignupGate';
import AuthSheet from '@/components/auth/AuthSheet';
import { useTranslation } from '@/lib/i18n/LanguageContext';

export interface KoreanFlashcardCardProps {
  currentLevel?: KoreanVocabItem['level'];
  hideLevelSelector?: boolean;
}

export const KoreanFlashcardCard: React.FC<KoreanFlashcardCardProps> = ({
  currentLevel,
  hideLevelSelector = false,
}) => {
  const { langMode } = useTranslation();
  const [selectedLevel, setSelectedLevel] = useState<KoreanVocabItem['level']>(currentLevel || 'EPS');
  const [selectedLesson, setSelectedLesson] = useState<number | 'ALL'>('ALL');
  const [isShuffled, setIsShuffled] = useState<boolean>(false);
  const [showFilterDropdown, setShowFilterDropdown] = useState<boolean>(false);

  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [isFlipped, setIsFlipped] = useState<boolean>(false);
  const [selectedRating, setSelectedRating] = useState<SrsRating | null>(null);
  const [showAdvanceModal, setShowAdvanceModal] = useState<boolean>(false);

  // Auth & Unknown words state
  const [authUser, setAuthUser] = useState<AuthUser | null>(null);
  const [onlyUnknownMode, setOnlyUnknownMode] = useState<boolean>(false);
  const [markedVersion, setMarkedVersion] = useState<number>(0);
  const [signupGateOpen, setSignupGateOpen] = useState<boolean>(false);
  const [signupGateReason, setSignupGateReason] = useState<string>('');
  const [authSheetOpen, setAuthSheetOpen] = useState<boolean>(false);

  useEffect(() => {
    setAuthUser(getAuthUser());
    const handleSync = () => {
      setAuthUser(getAuthUser());
      setMarkedVersion(v => v + 1);
    };
    window.addEventListener('lg_unknown_words_changed', handleSync);
    window.addEventListener('storage', handleSync);
    return () => {
      window.removeEventListener('lg_unknown_words_changed', handleSync);
      window.removeEventListener('storage', handleSync);
    };
  }, []);

  React.useEffect(() => {
    if (currentLevel) {
      setSelectedLevel(currentLevel);
      setSelectedLesson('ALL');
      setCurrentIndex(0);
    }
  }, [currentLevel]);

  const requireAuth = (reason?: string): boolean => {
    const user = getAuthUser();
    if (!user) {
      setSignupGateReason(reason || 'Please sign in or create a free account to practice flashcards and track your progress!');
      setSignupGateOpen(true);
      return false;
    }
    return true;
  };

  const fullList = useMemo(() => getKoreanVocabByLevel(selectedLevel), [selectedLevel]);
  const uniqueLessons = useMemo(() => Array.from(new Set(fullList.map(item => item.lesson))).sort((a, b) => a - b), [fullList]);

  // Filtered list based on lesson, shuffle, and unknown mode
  const currentList = useMemo(() => {
    let list = selectedLesson === 'ALL' ? fullList : fullList.filter(item => item.lesson === selectedLesson);

    if (onlyUnknownMode) {
      list = list.filter(item => isWordMarked(`ko-${item.word}`));
    }

    if (isShuffled) {
      list = [...list].sort(() => 0.5 - Math.random());
    }
    return list;
  }, [selectedLevel, selectedLesson, isShuffled, fullList, onlyUnknownMode, markedVersion]);

  const allUnknownCount = useMemo(() => {
    return getMarkedUnknownWords('korean').length;
  }, [markedVersion]);

  const safeIndex = Math.min(currentIndex, Math.max(0, currentList.length - 1));
  const currentItem: KoreanVocabItem | undefined = currentList[safeIndex] || currentList[0];

  const isCurrentItemMarked = currentItem ? isWordMarked(`ko-${currentItem.word}`) : false;

  const currentSrsState: SrsItemState = { easeFactor: 2.5, intervalDays: 0, repetitions: 0 };
  const srsAgain = calculateSM2(currentSrsState, 1);
  const srsHard = calculateSM2(currentSrsState, 2);
  const srsGood = calculateSM2(currentSrsState, 3);
  const srsEasy = calculateSM2(currentSrsState, 4);

  const playAudio = () => {
    if (!currentItem) return;
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(currentItem.word);
      utterance.lang = 'ko-KR';
      window.speechSynthesis.speak(utterance);
    }
  };

  const handleNext = () => {
    if (!requireAuth('Sign in or register to flip through cards and record your practice streak!')) return;
    recordCardReviewStat();
    setIsFlipped(false);
    setSelectedRating(null);
    if (safeIndex < currentList.length - 1) {
      setCurrentIndex(safeIndex + 1);
    } else {
      setShowAdvanceModal(true);
    }
  };

  const handlePrev = () => {
    setIsFlipped(false);
    setSelectedRating(null);
    if (safeIndex > 0) {
      setCurrentIndex(safeIndex - 1);
    }
  };

  const handleAdvanceLevel = () => {
    setShowAdvanceModal(false);
    const levels: KoreanVocabItem['level'][] = ['EPS', 'TOPIK2', 'TOPIK3', 'TOPIK4'];
    const idx = levels.indexOf(selectedLevel);
    if (idx < levels.length - 1) {
      setSelectedLevel(levels[idx + 1]);
      setCurrentIndex(0);
    } else {
      alert('Congratulations! You completed all Korean Flashcard levels!');
    }
  };

  return (
    <div className="w-full max-w-2xl mx-auto font-sans space-y-3 sm:space-y-4 text-slate-900">
      {/* Top Banner: User Status & Practice Mode Selector */}
      <div className="bg-white border border-slate-200 rounded-2xl sm:rounded-3xl p-3 shadow-xs flex flex-wrap items-center justify-between gap-2.5">
        {/* User Auth Status Badge */}
        <div className="flex items-center gap-2">
          {authUser ? (
            <div className="flex items-center gap-1.5 px-3 py-1 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-black">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span>👤 {authUser.name}</span>
              <span className="hidden xs:inline text-[10px] opacity-75">• Synced</span>
            </div>
          ) : (
            <button
              onClick={() => setAuthSheetOpen(true)}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 text-white text-xs font-black shadow-xs hover:opacity-90 transition-opacity cursor-pointer"
            >
              <Lock className="w-3.5 h-3.5" />
              <span>Sign In to Track Progress</span>
            </button>
          )}
        </div>

        {/* Practice Mode Toggle Pills: All vs Unknown */}
        <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-xl border border-slate-200 text-xs font-bold">
          <button
            onClick={() => {
              setOnlyUnknownMode(false);
              setCurrentIndex(0);
            }}
            className={`px-3 py-1 rounded-lg text-xs font-black transition-all cursor-pointer ${
              !onlyUnknownMode ? 'bg-emerald-600 text-white shadow-xs' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            All Words ({fullList.length})
          </button>

          <button
            onClick={() => {
              if (!requireAuth('Sign in or create a free account to practice your saved unknown words!')) return;
              setOnlyUnknownMode(true);
              setCurrentIndex(0);
            }}
            className={`px-3 py-1 rounded-lg text-xs font-black transition-all flex items-center gap-1.5 cursor-pointer ${
              onlyUnknownMode ? 'bg-amber-600 text-white shadow-xs' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Bookmark className={`w-3.5 h-3.5 ${allUnknownCount > 0 ? 'fill-current text-amber-400' : ''}`} />
            <span>Unknown ({allUnknownCount})</span>
          </button>
        </div>
      </div>

      {/* Level Selector Bar (Only show if not locked) */}
      {!hideLevelSelector && !currentLevel && (
        <div className="bg-white border border-slate-200 rounded-2xl sm:rounded-3xl p-2.5 sm:p-3.5 shadow-xs flex items-center justify-between gap-3">
          <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-xl sm:rounded-2xl border border-slate-200 w-full justify-around">
            {(['EPS', 'TOPIK2', 'TOPIK3', 'TOPIK4'] as const).map((lvl) => (
              <button
                key={lvl}
                onClick={() => {
                  setSelectedLevel(lvl);
                  setSelectedLesson('ALL');
                  setCurrentIndex(0);
                  setShowAdvanceModal(false);
                  setIsFlipped(false);
                }}
                className={`flex-1 py-1.5 rounded-lg sm:rounded-xl text-xs font-black transition-all ${
                  selectedLevel === lvl
                    ? 'bg-blue-600 text-white shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                {lvl}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Empty State when in Practice Unknown Mode and list is empty */}
      {onlyUnknownMode && currentList.length === 0 && (
        <div className="w-full bg-white border border-slate-200 rounded-3xl p-8 shadow-xs text-center space-y-4 my-4">
          <div className="w-16 h-16 rounded-full bg-amber-100 text-amber-600 flex items-center justify-center mx-auto border border-amber-200">
            <Bookmark className="w-8 h-8" />
          </div>
          <div>
            <h3 className="text-lg font-black text-slate-900">No Unknown Words Marked Yet</h3>
            <p className="text-xs text-slate-500 mt-1 max-w-sm mx-auto">
              Click the <strong className="text-slate-800">🔖 Tick Unknown</strong> button on any flashcard or vocabulary item to add it to your personalized practice deck!
            </p>
          </div>
          <button
            onClick={() => setOnlyUnknownMode(false)}
            className="px-5 py-2.5 rounded-xl bg-emerald-600 text-white text-xs font-extrabold shadow-xs hover:bg-emerald-500 transition-colors cursor-pointer"
          >
            Explore All Words ({fullList.length})
          </button>
        </div>
      )}

      {/* Flashcard Component */}
      {currentItem && (
        <div className="relative group">
          <div
            className={`w-full min-h-[320px] sm:min-h-[380px] bg-white border border-slate-200 rounded-3xl p-4 sm:p-6 shadow-xs transition-all duration-300 flex flex-col justify-between ${
              isFlipped ? 'border-emerald-500 shadow-sm' : 'hover:border-slate-300'
            }`}
          >
            {/* Unified Card Header Bar */}
            <div className="flex items-center justify-between pb-3 border-b border-slate-200 gap-2">
              <div className="flex items-center gap-2.5 min-w-0">
                <div className="w-8 h-8 rounded-lg bg-emerald-600 flex items-center justify-center text-white font-black text-lg shadow-xs font-kr flex-shrink-0">
                  {currentItem.word.slice(0, 1)}
                </div>
                <div className="min-w-0">
                  <span className="text-[10px] sm:text-xs font-black uppercase tracking-wider text-emerald-800 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded-md inline-block">
                    {selectedLevel} • Lesson {currentItem.lesson}
                  </span>
                  <div className="text-[11px] font-bold text-slate-600 mt-0.5 truncate">
                    Word {safeIndex + 1} of {currentList.length} {onlyUnknownMode && '(Unknown Deck)'}
                  </div>
                </div>
              </div>

              {/* Header Right Actions: Filter Dropdown, Tick Bookmark & Reveal Button */}
              <div className="flex items-center gap-1.5 sm:gap-2 flex-shrink-0">
                {/* Tick Unknown Word Toggle Button */}
                <button
                  onClick={() => {
                    if (!requireAuth('Sign in or register to tick unknown words for practice!')) return;
                    toggleMarkedWord({
                      id: `ko-${currentItem.word}`,
                      language: 'korean',
                      level: selectedLevel,
                      word: currentItem.word,
                      reading: currentItem.romanization,
                      meaning: currentItem.meaning,
                      meaningNepali: currentItem.meaningNepali,
                      lesson: currentItem.lesson,
                    });
                    setMarkedVersion(v => v + 1);
                  }}
                  className={`text-xs font-black px-2.5 py-1.5 rounded-xl transition-all flex items-center gap-1 shadow-xs border cursor-pointer min-h-[38px] ${
                    isCurrentItemMarked
                      ? 'bg-amber-500 text-white border-amber-400 shadow-amber-200'
                      : 'bg-amber-50 text-amber-800 hover:bg-amber-100 border-amber-200'
                  }`}
                  title={isCurrentItemMarked ? 'Remove from Unknown Practice' : 'Tick as Unknown Word'}
                >
                  <Bookmark className={`w-3.5 h-3.5 ${isCurrentItemMarked ? 'fill-current text-white' : 'text-amber-600'}`} />
                  <span className="hidden sm:inline">{isCurrentItemMarked ? 'Ticked Unknown' : 'Tick Unknown'}</span>
                </button>

                <div className="relative">
                  <button
                    onClick={() => setShowFilterDropdown(!showFilterDropdown)}
                    className="text-xs font-extrabold px-2.5 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 border border-slate-200 transition-all flex items-center gap-1 shadow-xs cursor-pointer min-h-[38px]"
                    title="Filter by Lesson"
                  >
                    <Filter className="w-3.5 h-3.5 text-emerald-600" />
                    <span className="hidden xs:inline">
                      {selectedLesson === 'ALL' ? 'Filter' : `L${selectedLesson}`}
                    </span>
                    <ChevronDown className={`w-3.5 h-3.5 text-slate-500 transition-transform duration-200 ${showFilterDropdown ? 'rotate-180' : ''}`} />
                  </button>

                  {/* Filter Dropdown Popover */}
                  {showFilterDropdown && (
                    <>
                      <div className="fixed inset-0 z-40" onClick={() => setShowFilterDropdown(false)} />
                      <div className="absolute right-0 top-full mt-2 w-64 bg-white border border-slate-200 rounded-2xl p-3 shadow-xl z-50 space-y-3">
                        <div className="flex items-center justify-between pb-2 border-b border-slate-200">
                          <div className="flex items-center gap-1.5 text-xs font-black text-slate-900">
                            <Filter className="w-3.5 h-3.5 text-emerald-600" />
                            <span>Flashcard Filters</span>
                          </div>
                          <span className="text-[10px] text-slate-500 font-bold">{currentList.length} items</span>
                        </div>

                        {/* Lesson Select */}
                        <div>
                          <label className="text-[10px] font-black uppercase tracking-wider text-slate-500 block mb-1">
                            Lesson Filter
                          </label>
                          <select
                            value={selectedLesson}
                            onChange={(e) => {
                              setSelectedLesson(e.target.value === 'ALL' ? 'ALL' : Number(e.target.value));
                              setCurrentIndex(0);
                              setIsFlipped(false);
                            }}
                            className="w-full bg-slate-50 border border-slate-200 rounded-xl px-2.5 py-1.5 text-xs text-slate-900 font-bold focus:outline-none focus:border-emerald-500"
                          >
                            <option value="ALL">All Lessons ({uniqueLessons.length} available)</option>
                            {uniqueLessons.map(l => (
                              <option key={l} value={l}>Lesson {l}</option>
                            ))}
                          </select>
                        </div>

                        {/* Shuffle Mode Toggle */}
                        <div className="flex items-center justify-between pt-2 border-t border-slate-200">
                          <div className="flex items-center gap-1.5 text-xs font-bold text-slate-700">
                            <Shuffle className="w-3.5 h-3.5 text-indigo-600" />
                            <span>Shuffle Order</span>
                          </div>
                          <button
                            onClick={() => {
                              setIsShuffled(!isShuffled);
                              setCurrentIndex(0);
                            }}
                            className={`px-3 py-1 rounded-lg text-xs font-black transition-all cursor-pointer ${
                              isShuffled ? 'bg-emerald-600 text-white shadow-xs' : 'bg-slate-100 text-slate-600'
                            }`}
                          >
                            {isShuffled ? 'On' : 'Off'}
                          </button>
                        </div>
                      </div>
                    </>
                  )}
                </div>

                {/* Eye Icon Reveal Button */}
                <button
                  onClick={() => {
                    if (!requireAuth('Sign in or create a free account to practice flashcards and track progress!')) return;
                    setIsFlipped(!isFlipped);
                  }}
                  className={`text-xs font-extrabold px-3 py-1.5 rounded-xl transition-all flex items-center gap-1.5 shadow-xs flex-shrink-0 cursor-pointer border min-h-[38px] ${
                    isFlipped
                      ? 'bg-emerald-600 text-white border-emerald-500'
                      : 'bg-emerald-50 text-emerald-700 border-emerald-200 hover:bg-emerald-600 hover:text-white'
                  }`}
                  title={isFlipped ? 'Hide Answer' : 'Show Answer'}
                >
                  <Eye className="w-4 h-4" />
                  <span className="hidden xs:inline">{isFlipped ? 'Hide Answer' : 'Show Answer'}</span>
                </button>

                {/* Restart Deck Button */}
                <button
                  onClick={() => {
                    setCurrentIndex(0);
                    setIsFlipped(false);
                  }}
                  className="p-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-600 hover:text-slate-900 border border-slate-200 transition-all flex items-center justify-center shadow-xs cursor-pointer min-h-[38px] min-w-[38px]"
                  title="Restart Deck from Word 1"
                >
                  <RotateCcw className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Front View */}
            {!isFlipped ? (
              <div className="my-auto py-6 sm:py-8 text-center space-y-4">
                <div className="relative inline-flex flex-col items-center justify-center p-6 sm:p-8 rounded-3xl bg-slate-50 border border-slate-200 shadow-xs max-w-full">
                  <div className="text-5xl sm:text-6xl font-kr font-black text-slate-900 select-none">
                    {currentItem.word}
                  </div>
                  <div className="text-xs sm:text-sm font-semibold text-slate-500 italic mt-2">
                    {currentItem.romanization}
                  </div>

                  <button
                    onClick={playAudio}
                    className="mt-3.5 px-3.5 py-2 rounded-2xl bg-white hover:bg-emerald-50 text-slate-700 hover:text-emerald-700 transition-all border border-slate-200 shadow-xs flex items-center gap-2 text-xs font-bold cursor-pointer min-h-[40px]"
                  >
                    <Volume2 className="w-4 h-4 text-emerald-600" />
                    <span>Listen Pronunciation</span>
                  </button>
                </div>
              </div>
            ) : (
              /* Back View */
              <div className="my-auto py-3 space-y-3.5 text-left">
                {(langMode === 'en' || langMode === 'both') && (
                  <div>
                    <div className="text-[10px] sm:text-xs font-bold uppercase tracking-wider text-emerald-700 mb-1">
                      English Meaning
                    </div>
                    <div className="text-xl sm:text-2xl font-black text-slate-900">{currentItem.meaning}</div>
                  </div>
                )}

                {(langMode === 'ne' || langMode === 'both') && (
                  <div>
                    <div className="text-[10px] sm:text-xs font-bold uppercase tracking-wider text-amber-700 mb-1">
                      Nepali Meaning (नेपाली अर्थ)
                    </div>
                    <div className="text-base sm:text-lg font-bold text-amber-800">🇳🇵 {currentItem.meaningNepali || currentItem.meaning}</div>
                  </div>
                )}

                {currentItem.partOfSpeech && (
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500 block mb-1">
                      Part of Speech
                    </span>
                    <span className="px-2.5 py-1 rounded-lg bg-emerald-50 text-emerald-700 border border-emerald-200 text-xs font-bold">
                      {currentItem.partOfSpeech}
                    </span>
                  </div>
                )}

                {currentItem.grammarSentences && currentItem.grammarSentences.length > 0 && (
                  <div className="bg-slate-50 p-3 rounded-xl border border-slate-200 space-y-1">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-700 block">
                      Example Sentence
                    </span>
                    <div className="text-xs sm:text-sm font-kr font-bold text-slate-900">
                      {currentItem.grammarSentences[0].korean}
                    </div>
                    <div className="text-[11px] text-slate-500 italic">
                      {currentItem.grammarSentences[0].romanization}
                    </div>
                    <div className="text-[11px] text-emerald-800 font-semibold">
                      🇳🇵 {currentItem.grammarSentences[0].nepali}
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Bottom SRS Rating Buttons & Nav Controls */}
            <div className="pt-3 border-t border-slate-200 flex flex-col gap-2.5">
              {isFlipped && (
                <div className="grid grid-cols-4 gap-1.5 sm:gap-2">
                  <button
                    onClick={() => {
                      if (!requireAuth()) return;
                      recordCardReviewStat();
                      setSelectedRating(1);
                    }}
                    className={`py-2 px-1 rounded-xl text-center border transition-all cursor-pointer min-h-[44px] ${
                      selectedRating === 1
                        ? 'bg-rose-600 border-rose-500 text-white shadow-xs font-black'
                        : 'bg-rose-50 hover:bg-rose-100 border-rose-200 text-rose-800 font-bold'
                    }`}
                  >
                    <div className="text-xs font-bold">Again</div>
                    <div className="text-[9px] opacity-80">{srsAgain.intervalPreviewText}</div>
                  </button>

                  <button
                    onClick={() => {
                      if (!requireAuth()) return;
                      recordCardReviewStat();
                      setSelectedRating(2);
                    }}
                    className={`py-2 px-1 rounded-xl text-center border transition-all cursor-pointer min-h-[44px] ${
                      selectedRating === 2
                        ? 'bg-amber-600 border-amber-500 text-white shadow-xs font-black'
                        : 'bg-amber-50 hover:bg-amber-100 border-amber-200 text-amber-800 font-bold'
                    }`}
                  >
                    <div className="text-xs font-bold">Hard</div>
                    <div className="text-[9px] opacity-80">{srsHard.intervalPreviewText}</div>
                  </button>

                  <button
                    onClick={() => {
                      if (!requireAuth()) return;
                      recordCardReviewStat();
                      setSelectedRating(3);
                    }}
                    className={`py-2 px-1 rounded-xl text-center border transition-all cursor-pointer min-h-[44px] ${
                      selectedRating === 3
                        ? 'bg-emerald-600 border-emerald-500 text-white shadow-xs font-black'
                        : 'bg-emerald-50 hover:bg-emerald-100 border-emerald-200 text-emerald-800 font-bold'
                    }`}
                  >
                    <div className="text-xs font-bold">Good</div>
                    <div className="text-[9px] opacity-80">{srsGood.intervalPreviewText}</div>
                  </button>

                  <button
                    onClick={() => {
                      if (!requireAuth()) return;
                      recordCardReviewStat();
                      setSelectedRating(4);
                    }}
                    className={`py-2 px-1 rounded-xl text-center border transition-all cursor-pointer min-h-[44px] ${
                      selectedRating === 4
                        ? 'bg-blue-600 border-blue-500 text-white shadow-xs font-black'
                        : 'bg-blue-50 hover:bg-blue-100 border-blue-200 text-blue-800 font-bold'
                    }`}
                  >
                    <div className="text-xs font-bold">Easy</div>
                    <div className="text-[9px] opacity-80">{srsEasy.intervalPreviewText}</div>
                  </button>
                </div>
              )}

              {/* Prev / Next controls */}
              <div className="flex items-center justify-between gap-2">
                <button
                  onClick={handlePrev}
                  disabled={safeIndex === 0}
                  className="px-3.5 py-2.5 rounded-xl bg-slate-100 disabled:opacity-30 hover:bg-slate-200 text-slate-700 text-xs font-bold transition-all flex items-center gap-1 cursor-pointer border border-slate-200 min-h-[44px]"
                >
                  <ChevronLeft className="w-4 h-4" /> Prev
                </button>

                <button
                  onClick={() => {
                    if (!requireAuth('Sign in or create a free account to practice flashcards and track progress!')) return;
                    setIsFlipped(!isFlipped);
                  }}
                  className="flex-1 py-2.5 px-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-extrabold flex items-center justify-center gap-1.5 shadow-xs cursor-pointer min-h-[44px]"
                >
                  <Eye className="w-4 h-4" />
                  <span>{isFlipped ? 'Show Hangul' : 'Show Answer'}</span>
                </button>

                <button
                  onClick={handleNext}
                  className="px-3.5 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold transition-all flex items-center gap-1 cursor-pointer shadow-xs min-h-[44px]"
                >
                  Next <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Reset Deck Option Below Card */}
      {currentItem && (
        <div className="flex items-center justify-center pt-1">
          <button
            onClick={() => {
              setCurrentIndex(0);
              setIsFlipped(false);
            }}
            className="text-xs font-extrabold text-slate-400 hover:text-emerald-400 flex items-center gap-1.5 transition-colors cursor-pointer py-1.5 px-3.5 rounded-xl hover:bg-slate-900 border border-transparent hover:border-slate-800"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset Deck to Card 1</span>
          </button>
        </div>
      )}

      {/* Sign Up / Login Gate Modal */}
      <SignupGate
        isOpen={signupGateOpen}
        onClose={() => setSignupGateOpen(false)}
        reason={signupGateReason}
      />

      {/* Full Auth Sheet Modal */}
      {authSheetOpen && (
        <AuthSheet
          initialMode="signin"
          onClose={() => setAuthSheetOpen(false)}
          onSuccess={(user) => {
            setAuthUser(user);
            setAuthSheetOpen(false);
            window.dispatchEvent(new Event('lg_auth_changed'));
          }}
        />
      )}

      {/* Auto Advance Modal */}
      {showAdvanceModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-fade-in">
          <div className="w-full max-w-md bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-2xl space-y-4 text-center">
            <div className="w-16 h-16 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto border border-emerald-500/30">
              <Award className="w-8 h-8 animate-bounce" />
            </div>

            <div>
              <h3 className="text-lg font-black text-white">{selectedLevel} Korean Completed!</h3>
              <p className="text-xs text-slate-400 mt-1">
                You have studied all flashcards in level {selectedLevel}. Ready to advance?
              </p>
            </div>

            <div className="grid grid-cols-2 gap-3 pt-2">
              <button
                onClick={() => setShowAdvanceModal(false)}
                className="px-4 py-2.5 rounded-xl bg-slate-800 text-slate-300 text-xs font-bold border border-slate-700 transition-all"
              >
                Review Level
              </button>
              <button
                onClick={handleAdvanceLevel}
                className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 text-white text-xs font-bold shadow-glow transition-all flex items-center justify-center gap-1"
              >
                <span>Next Level</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

