'use client';

import React, { useState, useMemo } from 'react';
import { KOREAN_300_COMMON_WORDS, KoreanCommonWord } from '@/lib/korean-300-words';
import { Search, Volume2, BookOpen, Sparkles, Filter, CheckCircle2 } from 'lucide-react';

export const Korean300CommonWordsExplorer: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('ALL');
  const [playingId, setPlayingId] = useState<number | null>(null);

  // Play Korean Speech Synthesis
  const playPronunciation = (text: string, id: number) => {
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) return;
    window.speechSynthesis.cancel();

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'ko-KR';
    utterance.rate = 0.85;

    setPlayingId(id);
    utterance.onend = () => setPlayingId(null);
    utterance.onerror = () => setPlayingId(null);

    window.speechSynthesis.speak(utterance);
  };

  // Filtered Words
  const filteredWords = useMemo(() => {
    return KOREAN_300_COMMON_WORDS.filter((item) => {
      const matchesCat = selectedCategory === 'ALL' || item.category === selectedCategory;
      const q = searchQuery.trim().toLowerCase();
      if (!q) return matchesCat;

      const matchesSearch =
        item.word.toLowerCase().includes(q) ||
        item.romanization.toLowerCase().includes(q) ||
        item.meaning.toLowerCase().includes(q) ||
        item.meaningNepali.toLowerCase().includes(q);

      return matchesCat && matchesSearch;
    });
  }, [searchQuery, selectedCategory]);

  const categories = [
    { id: 'ALL', label: 'All 300 Words', emoji: '📚' },
    { id: 'GREETINGS', label: 'Greetings (인사)', emoji: '👋' },
    { id: 'NUMBERS', label: 'Numbers & Time (숫자·시간)', emoji: '🔢' },
    { id: 'WORKPLACE', label: 'Workplace & Safety (작업장)', emoji: '🏢' },
    { id: 'DAILY', label: 'Daily Life & Home (일상)', emoji: '🏠' },
    { id: 'FOOD', label: 'Food & Dining (음식)', emoji: '🍱' },
    { id: 'TRANSPORT', label: 'Transport & Way (교통)', emoji: '🚌' },
    { id: 'HEALTH', label: 'Health & Body (건강)', emoji: '🏥' },
    { id: 'VERBS', label: 'Core Verbs (동사)', emoji: '🏃' },
    { id: 'ADJECTIVES', label: 'Core Adjectives (형용사)', emoji: '✨' },
  ];

  return (
    <div className="space-y-5 font-sans max-w-5xl mx-auto w-full">
      {/* Thin Left-Aligned Header Bar */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-3.5 sm:p-4 text-white space-y-2.5 shadow-md">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div className="flex flex-wrap items-center gap-2">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-md bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 text-[10px] font-black uppercase tracking-wider">
              <Sparkles className="w-3 h-3" /> Essential Vocabulary
            </span>
            <span className="px-2.5 py-0.5 rounded-md bg-amber-500/20 text-amber-300 border border-amber-500/30 text-[10px] font-black">
              300 Words
            </span>
            <h2 className="text-base sm:text-lg font-black text-white w-full sm:w-auto">
              300 Common Essential Korean Words (300 आवश्यक कोरियाली शब्दहरू)
            </h2>
          </div>
        </div>

        {/* Left-Aligned Category Filters Ribbon */}
        <div className="flex items-center gap-1.5 overflow-x-auto scrollbar-none pt-1 pb-0.5 no-scrollbar">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-[11px] font-extrabold whitespace-nowrap transition-all cursor-pointer shrink-0 ${
                selectedCategory === cat.id
                  ? 'bg-emerald-500 text-slate-950 shadow-sm font-black'
                  : 'bg-slate-800/90 text-slate-300 hover:text-white hover:bg-slate-700'
              }`}
            >
              <span>{cat.emoji}</span>
              <span>{cat.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Main Content White Book Paper Card */}
      <div className="bg-white text-slate-900 border border-slate-200/90 shadow-2xl rounded-3xl p-4 sm:p-6 space-y-4 font-sans">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 pb-3 border-b border-slate-200">
          <div className="flex items-center gap-2">
            <BookOpen className="w-5 h-5 text-emerald-700" />
            <div className="text-xs font-black uppercase tracking-wider text-emerald-800">
              Showing {filteredWords.length} of 300 Common Words
            </div>
          </div>

          {/* Search Bar */}
          <div className="relative w-full sm:w-80">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              placeholder="Search Hangul / English / Nepali..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-slate-50 border border-slate-300 rounded-xl pl-9 pr-3 py-2 text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:border-emerald-600 transition-all font-sans"
            />
          </div>
        </div>

        {/* 300 Words Grid (Compact White Book Cards) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 max-h-[68vh] overflow-y-auto pr-1 scrollbar-thin scrollbar-thumb-slate-300">
          {filteredWords.length === 0 ? (
            <div className="col-span-full text-center py-12 text-slate-500 text-xs font-bold">
              No matching words found for "{searchQuery}".
            </div>
          ) : (
            filteredWords.map((item) => {
              const isPlaying = playingId === item.id;
              return (
                <div
                  key={item.id}
                  className="bg-amber-50/40 hover:bg-amber-50 border border-amber-200/90 hover:border-emerald-500 rounded-2xl p-3.5 space-y-2 transition-all shadow-xs flex flex-col justify-between"
                >
                  <div className="space-y-1">
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <div className="text-lg sm:text-xl font-black font-kr text-slate-900 leading-tight">
                          {item.word}
                        </div>
                        <div className="text-xs font-bold text-emerald-700 italic">
                          {item.romanization}
                        </div>
                      </div>

                      <button
                        onClick={() => playPronunciation(item.word, item.id)}
                        className={`p-2 rounded-xl border transition-all cursor-pointer shrink-0 ${
                          isPlaying
                            ? 'bg-emerald-600 text-white border-emerald-500 shadow-md'
                            : 'bg-white hover:bg-emerald-600 text-slate-700 hover:text-white border-slate-300 shadow-xs'
                        }`}
                        title="Listen Audio"
                      >
                        <Volume2 className="w-4 h-4" />
                      </button>
                    </div>

                    <div className="pt-1.5 border-t border-slate-200 space-y-0.5 text-xs font-sans">
                      <div className="text-slate-800 font-medium">🇬🇧 {item.meaning}</div>
                      <div className="text-amber-900 font-extrabold">🇳🇵 {item.meaningNepali}</div>
                    </div>
                  </div>

                  <div className="pt-1 flex items-center justify-between text-[10px] font-black text-slate-500">
                    <span className="bg-emerald-100 text-emerald-900 px-2 py-0.5 rounded-md border border-emerald-300">
                      #{item.id} • {item.category}
                    </span>
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
};
