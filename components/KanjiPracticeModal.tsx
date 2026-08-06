'use client';

import React, { useState, useEffect, useMemo } from 'react';
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

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-md animate-fade-in font-sans">
      <div className="w-full max-w-2xl bg-[#faf6ee] text-[#2d2219] border border-[#e8decb] rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        
        {/* Header bar */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-[#e8decb] bg-[#fcf8f2]">
          <div>
            <div className="text-[10px] font-black uppercase tracking-wider text-rose-800">💮 Kanji practice active recall</div>
            <div className="text-sm font-black text-[#2d2219]">{title}</div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-xl bg-white border border-[#e8decb] hover:bg-rose-50 hover:text-rose-800 hover:border-rose-200 transition-all cursor-pointer text-slate-500"
          >
            <X className="w-4.5 h-4.5" />
          </button>
        </div>

        {/* Info Ribbon & Mode Switch */}
        <div className="px-6 py-3 border-b border-[#e8decb]/80 bg-[#fbf6eb] flex items-center justify-between text-xs font-bold text-[#5c4a3c]">
          <div>
            Card <span className="text-[#2d2219] font-black">{currentIndex + 1}</span> of <span className="text-[#2d2219] font-black">{deck.length}</span>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-[10px] uppercase tracking-wider">Practice Mode:</span>
            <button
              onClick={() => setIsRandom(!isRandom)}
              className={`flex items-center gap-1 px-3 py-1 rounded-lg border text-[11px] font-black tracking-wide transition-all cursor-pointer ${
                isRandom
                  ? 'bg-rose-800 border-rose-800 text-white shadow-xs'
                  : 'bg-white border-[#e8decb] text-[#5c4a3c] hover:bg-[#f5efe6]'
              }`}
            >
              <Shuffle className="w-3 h-3" />
              {isRandom ? 'Random (शफल)' : 'Serial (क्रमिक)'}
            </button>
          </div>
        </div>

        {/* Card Body */}
        <div className="flex-1 overflow-y-auto p-6 flex flex-col items-center justify-center space-y-6 min-h-[300px]">
          {/* Main Flashcard Container (Click or Double-Click to toggle, Touch & Hold on mobile) */}
          <div
            onClick={(e) => {
              const target = e.target as HTMLElement;
              if (target.closest('button') || target.closest('a')) return;
              setShowAnswer(prev => !prev);
            }}
            onTouchStart={(e) => {
              const target = e.target as HTMLElement;
              if (target.closest('button') || target.closest('a')) return;
              // Gentle touch peek on mobile
              setShowAnswer(true);
            }}
            onTouchEnd={(e) => {
              const target = e.target as HTMLElement;
              if (target.closest('button') || target.closest('a')) return;
              // On touch release, keep revealed if toggled or auto-reset if quick touch
            }}
            className="w-full max-w-md bg-white border border-[#e8decb] rounded-2xl p-6 sm:p-8 shadow-md flex flex-col items-center relative group min-h-[260px] justify-center transition-all duration-300 select-none cursor-pointer"
          >
            
            {/* Red Stamp Number */}
            <span className="absolute top-4 left-4 text-[10px] font-black text-rose-700 bg-rose-50 border border-rose-200 px-2.5 py-0.5 rounded-md font-mono">
              #{currentCard.number}
            </span>

            {/* Top Action Buttons: Eye Toggle & Audio Button */}
            <div className="absolute top-3.5 right-4 flex items-center gap-1.5 z-10">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setShowAnswer(prev => !prev);
                }}
                className="px-2.5 py-1 rounded-xl bg-white text-[#5c4a3c] hover:bg-[#fbf6eb] border border-[#e8decb] text-xs font-black transition-all flex items-center gap-1 cursor-pointer select-none active:scale-95 shadow-2xs"
                title={showAnswer ? "Click to hide answer" : "Click to show answer"}
              >
                {showAnswer ? (
                  <>
                    <Eye className="w-3.5 h-3.5 text-rose-800" />
                    <span>Hide</span>
                  </>
                ) : (
                  <>
                    <EyeOff className="w-3.5 h-3.5 text-rose-800" />
                    <span>Show</span>
                  </>
                )}
              </button>

              <button
                onClick={(e) => {
                  e.stopPropagation();
                  playPronunciation(currentCard.character);
                }}
                className="p-1.5 rounded-xl bg-[#fbf6eb] hover:bg-rose-700 hover:text-white text-rose-700 border border-[#e8decb] transition-all cursor-pointer shadow-2xs"
                title="Hear Pronunciation"
              >
                <Volume2 className="w-4 h-4" />
              </button>
            </div>

            {/* Kanji Character glyph (Always visible at top of card) */}
            <div className="text-7xl sm:text-8xl font-black font-jp text-[#2d2219] mt-8 mb-4 select-none leading-none">
              {currentCard.character}
            </div>

            {/* Answer Details Display */}
            {showAnswer ? (
              <div className="w-full text-center space-y-3.5 pt-4 border-t border-[#e8decb] animate-fade-in">
                {/* Meanings */}
                <div>
                  <div className="text-[10px] font-black text-rose-800 uppercase tracking-widest">MEANING</div>
                  <div className="text-lg font-black text-[#2d2219]">{currentCard.meaningEn}</div>
                  <div className="text-sm font-extrabold text-[#5c4a3c] font-jp">{currentCard.meaningNe}</div>
                </div>

                {/* Readings */}
                <div>
                  <div className="text-[10px] font-black text-[#a8813d] uppercase tracking-widest">READINGS</div>
                  <div className="text-xs font-black text-[#2d2219] font-jp tracking-wider px-4 break-words">
                    {currentCard.readings}
                  </div>
                </div>

                {/* Examples */}
                {currentCard.examples && currentCard.examples.length > 0 && (
                  <div className="pt-2.5 border-t border-dashed border-[#e8decb]/80 w-full text-left">
                    <div className="text-[9px] font-black text-rose-800 uppercase tracking-widest mb-1.5 text-center">EXAMPLES</div>
                    <ul className="space-y-1 max-w-xs mx-auto">
                      {currentCard.examples.slice(0, 3).map((ex, idx) => (
                        <li key={idx} className="text-[11px] text-[#4a463d] font-bold list-disc list-inside truncate font-jp" title={ex}>
                          {ex}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setShowAnswer(false);
                  }}
                  className="mt-2 text-[10px] font-black text-rose-800 hover:underline cursor-pointer"
                >
                  Click card or "Next" to hide
                </button>
              </div>
            ) : (
              <div className="text-[11px] font-bold text-[#8c7b6c] italic mt-2 text-center select-none">
                Click card body or top <span className="font-extrabold text-rose-800">"Show"</span> button to toggle answer
              </div>
            )}
          </div>
        </div>

        {/* Footer controls */}
        <div className="px-6 py-4 border-t border-[#e8decb] bg-[#fcf8f2] flex items-center justify-between">
          <button
            onClick={handlePrev}
            className="flex items-center gap-1.5 px-4 py-2 bg-white border border-[#e8decb] rounded-xl text-xs font-black text-[#5c4a3c] hover:bg-[#fbf6eb] cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
            Previous (अघिल्लो)
          </button>

          <button
            onClick={handleNext}
            className="flex items-center gap-1.5 px-4 py-2 bg-rose-800 border border-rose-800 rounded-xl text-xs font-black text-white hover:bg-rose-700 cursor-pointer shadow-xs"
          >
            Next (अर्को)
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
