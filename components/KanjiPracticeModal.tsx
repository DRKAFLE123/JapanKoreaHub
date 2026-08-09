'use client';

import React, { useState, useEffect, useRef } from 'react';
import { X, Volume2, Shuffle, ArrowLeft, ArrowRight, Eye, EyeOff, Play } from 'lucide-react';
import { Kanji1000Item } from '@/lib/kanji-1000-data';

interface KanjiPracticeModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialKanjis: Kanji1000Item[];
  title: string;
}

// Seeded shuffle function for repeatable shuffling
function shuffleArray<T>(array: T[]): T[] {
  const arr = [...array];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

export const KanjiPracticeModal: React.FC<KanjiPracticeModalProps> = ({
  isOpen,
  onClose,
  initialKanjis,
  title,
}) => {
  const [isRandom, setIsRandom] = useState<boolean>(false);
  const [deck, setDeck] = useState<Kanji1000Item[]>([]);
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [showAnswer, setShowAnswer] = useState<boolean>(false);
  const overlayRef = useRef<HTMLDivElement>(null);

  // Scroll page to top and lock body scroll when modal opens
  useEffect(() => {
    if (isOpen) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  // Initialize and refresh deck when base list or shuffling changes
  useEffect(() => {
    if (initialKanjis.length > 0) {
      if (isRandom) {
        setDeck(shuffleArray(initialKanjis));
      } else {
        setDeck([...initialKanjis]);
      }
      setCurrentIndex(0);
      setShowAnswer(false);
    }
  }, [initialKanjis, isRandom, isOpen]);

  if (!isOpen || deck.length === 0) return null;

  const currentCard = deck[currentIndex];

  const handleNext = () => {
    setShowAnswer(false);
    if (currentIndex < deck.length - 1) {
      setCurrentIndex(prev => prev + 1);
    } else {
      // Wrap around or show completed message
      setCurrentIndex(0);
    }
  };

  const handlePrev = () => {
    setShowAnswer(false);
    if (currentIndex > 0) {
      setCurrentIndex(prev => prev - 1);
    } else {
      setCurrentIndex(deck.length - 1);
    }
  };

  const playPronunciation = (char: string) => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(char);
      utterance.lang = 'ja-JP';
      window.speechSynthesis.speak(utterance);
    }
  };

  // ── Dynamic color tokens based on flashcard state ──
  // FRONT (question) → warm cream palette  |  BACK (answer) → warm amber/gold — stays within Japanese rose theme
  const cardBg       = showAnswer ? 'bg-[#fffbf2]'      : 'bg-white';
  const cardBorder   = showAnswer ? 'border-amber-300'   : 'border-[#e8decb]';
  const stampBg      = showAnswer ? 'bg-amber-50 border-amber-300 text-amber-800' : 'bg-rose-50 border-rose-200 text-rose-700';
  const eyeBtnBase   = showAnswer ? 'bg-amber-50 border-amber-200 text-amber-900 hover:bg-amber-100' : 'bg-white border-[#e8decb] text-[#5c4a3c] hover:bg-[#fbf6eb]';
  const eyeIconColor = showAnswer ? 'text-amber-700'    : 'text-rose-800';
  const audioBtnBase = showAnswer ? 'bg-amber-50 border-amber-200 text-amber-700 hover:bg-rose-800 hover:text-white' : 'bg-[#fbf6eb] border-[#e8decb] text-rose-700 hover:bg-rose-700 hover:text-white';
  const glyphColor   = showAnswer ? 'text-rose-900'     : 'text-[#2d2219]';
  const dividerColor = showAnswer ? 'border-amber-200'   : 'border-[#e8decb]';
  const modalBg      = showAnswer ? 'bg-[#fffcf5]'      : 'bg-[#faf6ee]';
  const modalBorder  = showAnswer ? 'border-amber-200'   : 'border-[#e8decb]';
  const headerBg     = showAnswer ? 'bg-[#fff8ec]'      : 'bg-[#fcf8f2]';
  const ribbonBg     = showAnswer ? 'bg-[#fff4e0]'      : 'bg-[#fbf6eb]';
  const footerBg     = showAnswer ? 'bg-[#fff8ec]'      : 'bg-[#fcf8f2]';
  const nextBtnClass = showAnswer ? 'bg-rose-800 border-rose-800 hover:bg-rose-700'  : 'bg-rose-800 border-rose-800 hover:bg-rose-700';
  const accentLabel  = showAnswer ? 'text-amber-800'    : 'text-rose-800';
  const readingLabel = showAnswer ? 'text-amber-700'    : 'text-[#a8813d]';

  return (
    <div
      ref={overlayRef}
      className="fixed inset-0 z-[100] flex items-start justify-center p-3 sm:p-6 bg-slate-900/65 backdrop-blur-sm animate-fade-in font-sans"
    >
      <div className={`w-full max-w-xl ${modalBg} text-[#2d2219] border ${modalBorder} rounded-2xl sm:rounded-3xl shadow-2xl overflow-hidden flex flex-col mx-auto transition-colors duration-300`} style={{ maxHeight: 'calc(100dvh - 1.5rem)', minHeight: 'min(520px, 90dvh)' }}>
        
        {/* Header bar */}
        <div className={`flex items-center justify-between px-4 sm:px-5 py-2.5 sm:py-3 border-b ${dividerColor} ${headerBg} shrink-0 transition-colors duration-300`}>
          <div>
            <div className={`text-[10px] font-black uppercase tracking-wider ${accentLabel}`}>
              {showAnswer ? '✅' : '💮'} Kanji practice active recall
            </div>
            <div className="text-xs sm:text-sm font-black text-[#2d2219]">{title}</div>
          </div>
          <button
            onClick={onClose}
            className={`p-1 rounded-xl border transition-all cursor-pointer text-slate-500 ${showAnswer ? 'bg-white border-amber-200 hover:bg-amber-50 hover:text-amber-800' : 'bg-white border-[#e8decb] hover:bg-rose-50 hover:text-rose-800 hover:border-rose-200'}`}
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Info Ribbon & Mode Switch */}
        <div className={`px-4 sm:px-5 py-1.5 sm:py-2 border-b ${dividerColor}/80 ${ribbonBg} flex items-center justify-between text-xs font-bold text-[#5c4a3c] shrink-0 transition-colors duration-300`}>
          <div>
            Card <span className="text-[#2d2219] font-black">{currentIndex + 1}</span> of <span className="text-[#2d2219] font-black">{deck.length}</span>
            {showAnswer && <span className="ml-2 text-[10px] font-black text-amber-700 uppercase tracking-wider">• Answer Revealed</span>}
          </div>

          <div className="flex items-center gap-2">
            <span className="text-[10px] uppercase tracking-wider hidden sm:inline">Practice Mode:</span>
            <button
              onClick={() => setIsRandom(!isRandom)}
              className={`flex items-center gap-1 px-2.5 py-0.5 rounded-lg border text-[11px] font-black tracking-wide transition-all cursor-pointer ${
                isRandom
                  ? showAnswer ? 'bg-rose-800 border-rose-800 text-white shadow-xs' : 'bg-rose-800 border-rose-800 text-white shadow-xs'
                  : showAnswer ? 'bg-white border-amber-200 text-amber-800 hover:bg-amber-50' : 'bg-white border-[#e8decb] text-[#5c4a3c] hover:bg-[#f5efe6]'
              }`}
            >
              <Shuffle className="w-3 h-3" />
              {isRandom ? 'Random (शफल)' : 'Serial (क्रमिक)'}
            </button>
          </div>
        </div>

        {/* Card Body */}
        <div className="flex-1 overflow-y-auto p-2.5 sm:p-4 flex flex-col items-center justify-start min-h-0">
          {/* Main Flashcard */}
          <div
            onClick={(e) => {
              const target = e.target as HTMLElement;
              if (target.closest('button') || target.closest('a')) return;
              setShowAnswer(prev => !prev);
            }}
            className={`w-full max-w-md ${cardBg} border-2 ${cardBorder} rounded-2xl sm:rounded-3xl p-3 sm:p-4 shadow-md flex flex-col items-center relative group h-[270px] sm:h-[300px] ${showAnswer ? 'justify-start' : 'justify-center'} transition-all duration-300 select-none cursor-pointer overflow-hidden shrink-0`}
          >
            {/* Card number stamp — color changes with state */}
            <span className={`absolute top-3 left-3 text-[10px] font-black px-2 py-0.5 rounded-md font-mono z-10 border transition-colors duration-300 ${stampBg}`}>
              #{currentCard.number}
            </span>

            {/* Top Action Buttons */}
            <div className="absolute top-2.5 right-3 flex items-center gap-1.5 z-10">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setShowAnswer(prev => !prev);
                }}
                className={`px-2 py-0.5 rounded-xl text-xs font-black transition-all flex items-center gap-1 cursor-pointer select-none active:scale-95 shadow-2xs border ${eyeBtnBase}`}
                title={showAnswer ? 'Click to hide answer' : 'Click to show answer'}
              >
                {showAnswer ? (
                  <>
                    <Eye className={`w-3.5 h-3.5 ${eyeIconColor}`} />
                    <span>Hide</span>
                  </>
                ) : (
                  <>
                    <EyeOff className={`w-3.5 h-3.5 ${eyeIconColor}`} />
                    <span>Show</span>
                  </>
                )}
              </button>

              <button
                onClick={(e) => {
                  e.stopPropagation();
                  playPronunciation(currentCard.character);
                }}
                className={`p-1 rounded-xl border transition-all cursor-pointer shadow-2xs ${audioBtnBase}`}
                title="Hear Pronunciation"
              >
                <Volume2 className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Kanji Character Glyph */}
            <div className={`text-5xl sm:text-6xl font-black font-jp ${glyphColor} shrink-0 flex items-center justify-center ${showAnswer ? 'pt-10 pb-3' : 'pt-0 pb-2'} transition-colors duration-300`}>
              {currentCard.character}
            </div>

            {/* Answer Details */}
            {showAnswer ? (
              <div className={`w-full text-center border-t ${dividerColor} pt-2 flex-1 flex flex-col justify-between overflow-hidden animate-fade-in`}>
                <div className="overflow-y-auto max-h-[150px] pr-1 space-y-1.5 text-xs scrollbar-thin">
                  {/* Meanings */}
                  <div>
                    <div className={`text-[9px] font-black uppercase tracking-widest ${accentLabel}`}>MEANING</div>
                    <div className="text-xs sm:text-sm font-black text-[#2d2219] leading-snug">{currentCard.meaningEn}</div>
                    <div className="text-[11px] font-extrabold text-[#5c4a3c] font-jp">{currentCard.meaningNe}</div>
                  </div>

                  {/* Readings */}
                  <div>
                    <div className={`text-[9px] font-black uppercase tracking-widest ${readingLabel}`}>READINGS</div>
                    <div className="text-[10px] font-bold text-[#2d2219] font-jp tracking-wider px-2 break-words leading-tight">
                      {currentCard.readings}
                    </div>
                  </div>

                  {/* Examples */}
                  {currentCard.examples && currentCard.examples.length > 0 && (
                    <div className={`pt-1 border-t border-dashed ${dividerColor}/80 w-full text-left`}>
                      <div className={`text-[8px] font-black uppercase tracking-widest mb-0.5 text-center ${accentLabel}`}>EXAMPLES</div>
                      <ul className="space-y-0.5 max-w-xs mx-auto">
                        {currentCard.examples.map((ex, idx) => (
                          <li key={idx} className="text-[9px] text-[#4a463d] font-bold list-disc list-inside font-jp leading-tight" title={ex}>
                            {ex}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>

                <div className="text-[9px] font-black text-amber-700/80 pt-0.5 shrink-0">
                  Click card body or &quot;Next&quot; to hide answer
                </div>
              </div>
            ) : (
              <div className="text-[11px] font-bold text-[#8c7b6c] italic mb-2 text-center select-none py-2">
                Click card body or top <span className="font-extrabold text-rose-800">&quot;Show&quot;</span> button to reveal answer
              </div>
            )}
          </div>
        </div>

        {/* Footer controls */}
        <div className={`px-4 sm:px-5 py-2.5 sm:py-3 border-t ${dividerColor} ${footerBg} flex items-center justify-between shrink-0 transition-colors duration-300`}>
          <button
            onClick={handlePrev}
            className={`flex items-center gap-1 px-3 py-1.5 rounded-xl text-xs font-black cursor-pointer transition-all border ${showAnswer ? 'bg-white border-amber-200 text-amber-800 hover:bg-amber-50' : 'bg-white border-[#e8decb] text-[#5c4a3c] hover:bg-[#fbf6eb]'}`}
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            Previous (अघिल्लो)
          </button>

          <button
            onClick={handleNext}
            className={`flex items-center gap-1 px-3.5 py-1.5 rounded-xl text-xs font-black text-white cursor-pointer shadow-xs transition-all border ${nextBtnClass}`}
          >
            Next (अर्को)
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
};
