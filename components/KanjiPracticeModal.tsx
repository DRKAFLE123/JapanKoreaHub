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

        {/* Card Body with Fixed Height Container (Never resizes) */}
        <div className="flex-1 overflow-hidden p-4 sm:p-6 flex flex-col items-center justify-center">
          {/* Main Flashcard Container with Fixed Height h-[360px] */}
          <div
            onClick={(e) => {
              const target = e.target as HTMLElement;
              if (target.closest('button') || target.closest('a')) return;
              setShowAnswer(prev => !prev);
            }}
            className="w-full max-w-md bg-white border border-[#e8decb] rounded-3xl p-5 sm:p-6 shadow-md flex flex-col items-center relative group h-[360px] justify-between transition-all duration-200 select-none cursor-pointer overflow-hidden"
          >
            {/* Red Stamp Number */}
            <span className="absolute top-4 left-4 text-[10px] font-black text-rose-700 bg-rose-50 border border-rose-200 px-2.5 py-0.5 rounded-md font-mono z-10">
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

            {/* Kanji Character glyph */}
            <div className={`font-black font-jp text-[#2d2219] transition-all duration-200 select-none flex items-center justify-center ${
              showAnswer ? 'text-4xl sm:text-5xl mt-6 mb-1 shrink-0' : 'text-7xl sm:text-8xl my-auto'
            }`}>
              {currentCard.character}
            </div>

            {/* Answer Details Display with Scrollable Area & Small Typography */}
            {showAnswer ? (
              <div className="w-full text-center border-t border-[#e8decb] pt-2.5 flex-1 flex flex-col justify-between overflow-hidden animate-fade-in">
                <div className="overflow-y-auto max-h-[175px] pr-1 space-y-2 text-xs scrollbar-thin">
                  {/* Meanings */}
                  <div>
                    <div className="text-[9px] font-black text-rose-800 uppercase tracking-widest">MEANING</div>
                    <div className="text-sm font-black text-[#2d2219] leading-snug">{currentCard.meaningEn}</div>
                    <div className="text-xs font-extrabold text-[#5c4a3c] font-jp">{currentCard.meaningNe}</div>
                  </div>

                  {/* Readings */}
                  <div>
                    <div className="text-[9px] font-black text-[#a8813d] uppercase tracking-widest">READINGS</div>
                    <div className="text-[11px] font-bold text-[#2d2219] font-jp tracking-wider px-2 break-words leading-tight">
                      {currentCard.readings}
                    </div>
                  </div>

                  {/* Examples */}
                  {currentCard.examples && currentCard.examples.length > 0 && (
                    <div className="pt-1.5 border-t border-dashed border-[#e8decb]/80 w-full text-left">
                      <div className="text-[8px] font-black text-rose-800 uppercase tracking-widest mb-1 text-center">EXAMPLES</div>
                      <ul className="space-y-0.5 max-w-xs mx-auto">
                        {currentCard.examples.map((ex, idx) => (
                          <li key={idx} className="text-[10px] text-[#4a463d] font-bold list-disc list-inside font-jp leading-tight" title={ex}>
                            {ex}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>

                <div className="text-[9px] font-black text-rose-800/80 pt-1 shrink-0">
                  Click card body or "Next" to hide answer
                </div>
              </div>
            ) : (
              <div className="text-[11px] font-bold text-[#8c7b6c] italic mb-4 text-center select-none">
                Click card body or top <span className="font-extrabold text-rose-800">"Show"</span> button to reveal answer
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
