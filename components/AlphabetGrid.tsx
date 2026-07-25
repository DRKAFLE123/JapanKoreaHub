'use client';

import React, { useState } from 'react';
import { Volume2, Headphones, Search, Sparkles, BookOpen } from 'lucide-react';

interface Syllable {
  char: string;
  romaji: string;
  nepaliHint: string;
  category: string; // 'vowel' | 'consonant' | 'double' | 'compound'
}

// ─── JAPANESE HIRAGANA ───
const HIRAGANA_DATA: Syllable[] = [
  // Vowels
  { char: 'あ', romaji: 'a', nepaliHint: 'आ', category: 'vowel' },
  { char: 'い', romaji: 'i', nepaliHint: 'इ', category: 'vowel' },
  { char: 'う', romaji: 'u', nepaliHint: 'उ', category: 'vowel' },
  { char: 'え', romaji: 'e', nepaliHint: 'ए', category: 'vowel' },
  { char: 'お', romaji: 'o', nepaliHint: 'ओ', category: 'vowel' },
  // K-line
  { char: 'か', romaji: 'ka', nepaliHint: 'का', category: 'consonant' },
  { char: 'き', romaji: 'ki', nepaliHint: 'कि', category: 'consonant' },
  { char: 'く', romaji: 'ku', nepaliHint: 'कु', category: 'consonant' },
  { char: 'け', romaji: 'ke', nepaliHint: 'के', category: 'consonant' },
  { char: 'こ', romaji: 'ko', nepaliHint: 'को', category: 'consonant' },
  // S-line
  { char: 'さ', romaji: 'sa', nepaliHint: 'सा', category: 'consonant' },
  { char: 'し', romaji: 'shi', nepaliHint: 'शि', category: 'consonant' },
  { char: 'す', romaji: 'su', nepaliHint: 'सु', category: 'consonant' },
  { char: 'せ', romaji: 'se', nepaliHint: 'से', category: 'consonant' },
  { char: 'そ', romaji: 'so', nepaliHint: 'सो', category: 'consonant' },
  // T-line
  { char: 'た', romaji: 'ta', nepaliHint: 'ता', category: 'consonant' },
  { char: 'ち', romaji: 'chi', nepaliHint: 'चि', category: 'consonant' },
  { char: 'つ', romaji: 'tsu', nepaliHint: 'त्सु', category: 'consonant' },
  { char: 'て', romaji: 'te', nepaliHint: 'ते', category: 'consonant' },
  { char: 'と', romaji: 'to', nepaliHint: 'तो', category: 'consonant' },
  // N-line
  { char: 'な', romaji: 'na', nepaliHint: 'ना', category: 'consonant' },
  { char: 'に', romaji: 'ni', nepaliHint: 'नि', category: 'consonant' },
  { char: 'ぬ', romaji: 'nu', nepaliHint: 'नु', category: 'consonant' },
  { char: 'ね', romaji: 'ne', nepaliHint: 'ने', category: 'consonant' },
  { char: 'の', romaji: 'no', nepaliHint: 'नो', category: 'consonant' },
  // H-line
  { char: 'は', romaji: 'ha', nepaliHint: 'हा', category: 'consonant' },
  { char: 'ひ', romaji: 'hi', nepaliHint: 'हि', category: 'consonant' },
  { char: 'ふ', romaji: 'fu', nepaliHint: 'फु', category: 'consonant' },
  { char: 'へ', romaji: 'he', nepaliHint: 'हे', category: 'consonant' },
  { char: 'ほ', romaji: 'ho', nepaliHint: 'हो', category: 'consonant' },
  // M-line
  { char: 'ま', romaji: 'ma', nepaliHint: 'मा', category: 'consonant' },
  { char: 'み', romaji: 'mi', nepaliHint: 'मि', category: 'consonant' },
  { char: 'む', romaji: 'mu', nepaliHint: 'मु', category: 'consonant' },
  { char: 'め', romaji: 'me', nepaliHint: 'मे', category: 'consonant' },
  { char: 'も', romaji: 'mo', nepaliHint: 'मो', category: 'consonant' },
  // Y-line
  { char: 'や', romaji: 'ya', nepaliHint: 'या', category: 'consonant' },
  { char: 'ゆ', romaji: 'yu', nepaliHint: 'यु', category: 'consonant' },
  { char: 'よ', romaji: 'yo', nepaliHint: 'यो', category: 'consonant' },
  // R-line
  { char: 'ら', romaji: 'ra', nepaliHint: 'रा', category: 'consonant' },
  { char: 'り', romaji: 'ri', nepaliHint: 'रि', category: 'consonant' },
  { char: 'る', romaji: 'ru', nepaliHint: 'रु', category: 'consonant' },
  { char: 'れ', romaji: 're', nepaliHint: 'रे', category: 'consonant' },
  { char: 'ろ', romaji: 'ro', nepaliHint: 'रो', category: 'consonant' },
  // W / N
  { char: 'わ', romaji: 'wa', nepaliHint: 'वा', category: 'consonant' },
  { char: 'を', romaji: 'wo', nepaliHint: 'ओ/वो', category: 'consonant' },
  { char: 'ん', romaji: 'n', nepaliHint: 'न्', category: 'consonant' },
];

// ─── JAPANESE KATAKANA ───
const KATAKANA_DATA: Syllable[] = [
  // Vowels
  { char: 'ア', romaji: 'a', nepaliHint: 'आ', category: 'vowel' },
  { char: 'イ', romaji: 'i', nepaliHint: 'इ', category: 'vowel' },
  { char: 'ウ', romaji: 'u', nepaliHint: 'उ', category: 'vowel' },
  { char: 'エ', romaji: 'e', nepaliHint: 'ए', category: 'vowel' },
  { char: 'オ', romaji: 'o', nepaliHint: 'ओ', category: 'vowel' },
  // K-line
  { char: 'カ', romaji: 'ka', nepaliHint: 'का', category: 'consonant' },
  { char: 'キ', romaji: 'ki', nepaliHint: 'कि', category: 'consonant' },
  { char: 'ク', romaji: 'ku', nepaliHint: 'कु', category: 'consonant' },
  { char: 'ケ', romaji: 'ke', nepaliHint: 'के', category: 'consonant' },
  { char: 'コ', romaji: 'ko', nepaliHint: 'को', category: 'consonant' },
  // S-line
  { char: 'サ', romaji: 'sa', nepaliHint: 'सा', category: 'consonant' },
  { char: 'シ', romaji: 'shi', nepaliHint: 'शि', category: 'consonant' },
  { char: 'ス', romaji: 'su', nepaliHint: 'सु', category: 'consonant' },
  { char: 'セ', romaji: 'se', nepaliHint: 'से', category: 'consonant' },
  { char: 'ソ', romaji: 'so', nepaliHint: 'सो', category: 'consonant' },
  // T-line
  { char: 'タ', romaji: 'ta', nepaliHint: 'ता', category: 'consonant' },
  { char: 'チ', romaji: 'chi', nepaliHint: 'चि', category: 'consonant' },
  { char: 'ツ', romaji: 'tsu', nepaliHint: 'त्सु', category: 'consonant' },
  { char: 'テ', romaji: 'te', nepaliHint: 'ते', category: 'consonant' },
  { char: 'ト', romaji: 'to', nepaliHint: 'तो', category: 'consonant' },
  // N-line
  { char: 'ナ', romaji: 'na', nepaliHint: 'ना', category: 'consonant' },
  { char: 'ニ', romaji: 'ni', nepaliHint: 'नि', category: 'consonant' },
  { char: 'ヌ', romaji: 'nu', nepaliHint: 'नु', category: 'consonant' },
  { char: 'ネ', romaji: 'ne', nepaliHint: 'ने', category: 'consonant' },
  { char: 'ノ', romaji: 'no', nepaliHint: 'नो', category: 'consonant' },
  // H-line
  { char: 'ハ', romaji: 'ha', nepaliHint: 'हा', category: 'consonant' },
  { char: 'ヒ', romaji: 'hi', nepaliHint: 'हि', category: 'consonant' },
  { char: 'フ', romaji: 'fu', nepaliHint: 'फु', category: 'consonant' },
  { char: 'ヘ', romaji: 'he', nepaliHint: 'हे', category: 'consonant' },
  { char: 'ホ', romaji: 'ho', nepaliHint: 'हो', category: 'consonant' },
  // M-line
  { char: 'マ', romaji: 'ma', nepaliHint: 'मा', category: 'consonant' },
  { char: 'ミ', romaji: 'mi', nepaliHint: 'मि', category: 'consonant' },
  { char: 'ム', romaji: 'mu', nepaliHint: 'मु', category: 'consonant' },
  { char: 'メ', romaji: 'me', nepaliHint: 'मे', category: 'consonant' },
  { char: 'モ', romaji: 'mo', nepaliHint: 'मो', category: 'consonant' },
  // Y-line
  { char: 'ヤ', romaji: 'ya', nepaliHint: 'या', category: 'consonant' },
  { char: 'ユ', romaji: 'yu', nepaliHint: 'यु', category: 'consonant' },
  { char: 'ヨ', romaji: 'yo', nepaliHint: 'यो', category: 'consonant' },
  // R-line
  { char: 'ラ', romaji: 'ra', nepaliHint: 'रा', category: 'consonant' },
  { char: 'リ', romaji: 'ri', nepaliHint: 'रि', category: 'consonant' },
  { char: 'ル', romaji: 'ru', nepaliHint: 'रु', category: 'consonant' },
  { char: 'レ', romaji: 're', nepaliHint: 'रे', category: 'consonant' },
  { char: 'ロ', romaji: 'ro', nepaliHint: 'रो', category: 'consonant' },
  // W / N
  { char: 'ワ', romaji: 'wa', nepaliHint: 'वा', category: 'consonant' },
  { char: 'ヲ', romaji: 'wo', nepaliHint: 'ओ/वो', category: 'consonant' },
  { char: 'ン', romaji: 'n', nepaliHint: 'न्', category: 'consonant' },
];

// ─── KOREAN HANGUL ───
const KOREAN_CONSONANTS: Syllable[] = [
  { char: 'ㄱ', romaji: 'g/k', nepaliHint: 'ग/क', category: 'consonant' },
  { char: 'ㄴ', romaji: 'n', nepaliHint: 'न', category: 'consonant' },
  { char: 'ㄷ', romaji: 'd/t', nepaliHint: 'द/त', category: 'consonant' },
  { char: 'ㄹ', romaji: 'r/l', nepaliHint: 'र/ल', category: 'consonant' },
  { char: 'ㅁ', romaji: 'm', nepaliHint: 'म', category: 'consonant' },
  { char: 'ㅂ', romaji: 'b/p', nepaliHint: 'ब/प', category: 'consonant' },
  { char: 'ㅅ', romaji: 's', nepaliHint: 'स', category: 'consonant' },
  { char: 'ㅇ', romaji: 'ng/silent', nepaliHint: 'ङ', category: 'consonant' },
  { char: 'ㅈ', romaji: 'j', nepaliHint: 'ज', category: 'consonant' },
  { char: 'ㅊ', romaji: 'ch', nepaliHint: 'छ', category: 'consonant' },
  { char: 'ㅋ', romaji: 'k', nepaliHint: 'ख', category: 'consonant' },
  { char: 'ㅌ', romaji: 't', nepaliHint: 'थ', category: 'consonant' },
  { char: 'ㅍ', romaji: 'p', nepaliHint: 'फ', category: 'consonant' },
  { char: 'ㅎ', romaji: 'h', nepaliHint: 'ह', category: 'consonant' },
];

const KOREAN_DOUBLE_CONSONANTS: Syllable[] = [
  { char: 'ㄲ', romaji: 'kk', nepaliHint: 'क्क', category: 'double' },
  { char: 'ㄸ', romaji: 'tt', nepaliHint: 'त्त', category: 'double' },
  { char: 'ㅃ', romaji: 'pp', nepaliHint: 'प्प', category: 'double' },
  { char: 'ㅆ', romaji: 'ss', nepaliHint: 'स्स', category: 'double' },
  { char: 'ㅉ', romaji: 'jj', nepaliHint: 'ज्ज', category: 'double' },
];

const KOREAN_VOWELS: Syllable[] = [
  { char: 'ㅏ', romaji: 'a', nepaliHint: 'आ', category: 'vowel' },
  { char: 'ㅑ', romaji: 'ya', nepaliHint: 'या', category: 'vowel' },
  { char: 'ㅓ', romaji: 'eo', nepaliHint: 'अ', category: 'vowel' },
  { char: 'ㅕ', romaji: 'yeo', nepaliHint: 'य', category: 'vowel' },
  { char: 'ㅗ', romaji: 'o', nepaliHint: 'ओ', category: 'vowel' },
  { char: 'ㅛ', romaji: 'yo', nepaliHint: 'यो', category: 'vowel' },
  { char: 'ㅜ', romaji: 'u', nepaliHint: 'उ', category: 'vowel' },
  { char: 'ㅠ', romaji: 'yu', nepaliHint: 'यु', category: 'vowel' },
  { char: 'ㅡ', romaji: 'eu', nepaliHint: 'उ (समथर)', category: 'vowel' },
  { char: 'ㅣ', romaji: 'i', nepaliHint: 'इ', category: 'vowel' },
];

const KOREAN_COMPOUND_VOWELS: Syllable[] = [
  { char: 'ㅐ', romaji: 'ae', nepaliHint: 'ए', category: 'compound' },
  { char: 'ㅒ', romaji: 'yae', nepaliHint: 'ये', category: 'compound' },
  { char: 'ㅔ', romaji: 'e', nepaliHint: 'ए', category: 'compound' },
  { char: 'ㅖ', romaji: 'ye', nepaliHint: 'ये', category: 'compound' },
  { char: 'ㅘ', romaji: 'wa', nepaliHint: 'वा', category: 'compound' },
  { char: 'ㅙ', romaji: 'wae', nepaliHint: 'वे', category: 'compound' },
  { char: 'ㅚ', romaji: 'oe', nepaliHint: 'वे', category: 'compound' },
  { char: 'ㅝ', romaji: 'wo', nepaliHint: 'वो', category: 'compound' },
  { char: 'ㅞ', romaji: 'we', nepaliHint: 'वे', category: 'compound' },
  { char: 'ㅟ', romaji: 'wi', nepaliHint: 'वि', category: 'compound' },
  { char: 'ㅢ', romaji: 'ui', nepaliHint: 'उइ', category: 'compound' },
];

export interface AlphabetGridProps {
  activeLanguage: 'JAPANESE' | 'KOREAN';
}

export const AlphabetGrid: React.FC<AlphabetGridProps> = ({ activeLanguage }) => {
  const [jpSubTab, setJpSubTab] = useState<'HIRAGANA' | 'KATAKANA' | 'VOWELS' | 'CONSONANTS'>('HIRAGANA');
  const [krSubTab, setKrSubTab] = useState<'CONSONANTS' | 'VOWELS' | 'DOUBLE_CONSONANTS' | 'COMPOUND_VOWELS'>('CONSONANTS');
  const [searchQuery, setSearchQuery] = useState('');
  const [activeChar, setActiveChar] = useState<string | null>(null);

  // Compute dataset based on language and active sub-tab
  const getDataset = (): Syllable[] => {
    if (activeLanguage === 'JAPANESE') {
      switch (jpSubTab) {
        case 'HIRAGANA': return HIRAGANA_DATA;
        case 'KATAKANA': return KATAKANA_DATA;
        case 'VOWELS': return HIRAGANA_DATA.filter(i => i.category === 'vowel');
        case 'CONSONANTS': return HIRAGANA_DATA.filter(i => i.category === 'consonant');
      }
    } else {
      switch (krSubTab) {
        case 'CONSONANTS': return KOREAN_CONSONANTS;
        case 'VOWELS': return KOREAN_VOWELS;
        case 'DOUBLE_CONSONANTS': return KOREAN_DOUBLE_CONSONANTS;
        case 'COMPOUND_VOWELS': return KOREAN_COMPOUND_VOWELS;
      }
    }
  };

  const dataset = getDataset();

  const filteredData = dataset.filter(
    item =>
      item.char.includes(searchQuery) ||
      item.romaji.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.nepaliHint.includes(searchQuery)
  );

  const playSound = (char: string) => {
    setActiveChar(char);
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(char);
      utterance.lang = activeLanguage === 'JAPANESE' ? 'ja-JP' : 'ko-KR';
      utterance.rate = 0.8;
      window.speechSynthesis.speak(utterance);
    }
    setTimeout(() => setActiveChar(null), 800);
  };

  return (
    <div className="w-full max-w-5xl mx-auto bg-slate-900/90 backdrop-blur-xl border border-slate-800 rounded-3xl p-6 shadow-2xl">
      {/* Header Info */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6 pb-5 border-b border-slate-800">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-indigo-400">
            <Headphones className="w-4 h-4 text-emerald-400" />
            <span>Interactive Pronunciation Matrix & Nepali Phonetics</span>
          </div>
          <h2 className="text-xl font-bold text-white mt-1">
            {activeLanguage === 'JAPANESE' ? 'Japanese Alphabets (ひらがな / カタカナ / स्वर / व्यंजन)' : 'Korean Hangul Alphabets (한글 자음 / 모음 / 쌍자음)'}
          </h2>
        </div>
      </div>

      {/* Sub-Tabs Selector */}
      <div className="flex flex-wrap gap-2 mb-6 bg-slate-950/80 p-2 rounded-2xl border border-slate-800">
        {activeLanguage === 'JAPANESE' ? (
          <>
            <button
              onClick={() => setJpSubTab('HIRAGANA')}
              className={`px-4 py-2 rounded-xl text-xs font-extrabold transition-all ${
                jpSubTab === 'HIRAGANA' ? 'bg-rose-600 text-white shadow-lg' : 'text-slate-400 hover:text-white'
              }`}
            >
              Hiragana (ひらがな 46)
            </button>
            <button
              onClick={() => setJpSubTab('KATAKANA')}
              className={`px-4 py-2 rounded-xl text-xs font-extrabold transition-all ${
                jpSubTab === 'KATAKANA' ? 'bg-rose-600 text-white shadow-lg' : 'text-slate-400 hover:text-white'
              }`}
            >
              Katakana (カタカナ 46)
            </button>
            <button
              onClick={() => setJpSubTab('VOWELS')}
              className={`px-4 py-2 rounded-xl text-xs font-extrabold transition-all ${
                jpSubTab === 'VOWELS' ? 'bg-indigo-600 text-white shadow-lg' : 'text-slate-400 hover:text-white'
              }`}
            >
              Basic Vowels (स्वर - あいうえお)
            </button>
            <button
              onClick={() => setJpSubTab('CONSONANTS')}
              className={`px-4 py-2 rounded-xl text-xs font-extrabold transition-all ${
                jpSubTab === 'CONSONANTS' ? 'bg-indigo-600 text-white shadow-lg' : 'text-slate-400 hover:text-white'
              }`}
            >
              Consonants (व्यंजन - か, さ, た...)
            </button>
          </>
        ) : (
          <>
            <button
              onClick={() => setKrSubTab('CONSONANTS')}
              className={`px-4 py-2 rounded-xl text-xs font-extrabold transition-all ${
                krSubTab === 'CONSONANTS' ? 'bg-emerald-600 text-white shadow-lg' : 'text-slate-400 hover:text-white'
              }`}
            >
              Basic Consonants (기본 자음 14)
            </button>
            <button
              onClick={() => setKrSubTab('VOWELS')}
              className={`px-4 py-2 rounded-xl text-xs font-extrabold transition-all ${
                krSubTab === 'VOWELS' ? 'bg-emerald-600 text-white shadow-lg' : 'text-slate-400 hover:text-white'
              }`}
            >
              Basic Vowels (기본 모음 10)
            </button>
            <button
              onClick={() => setKrSubTab('DOUBLE_CONSONANTS')}
              className={`px-4 py-2 rounded-xl text-xs font-extrabold transition-all ${
                krSubTab === 'DOUBLE_CONSONANTS' ? 'bg-indigo-600 text-white shadow-lg' : 'text-slate-400 hover:text-white'
              }`}
            >
              Double Consonants (쌍자음 5)
            </button>
            <button
              onClick={() => setKrSubTab('COMPOUND_VOWELS')}
              className={`px-4 py-2 rounded-xl text-xs font-extrabold transition-all ${
                krSubTab === 'COMPOUND_VOWELS' ? 'bg-indigo-600 text-white shadow-lg' : 'text-slate-400 hover:text-white'
              }`}
            >
              Compound Vowels (복모음 11)
            </button>
          </>
        )}
      </div>

      {/* Search Bar & Counter */}
      <div className="flex items-center justify-between gap-4 mb-5">
        <div className="relative flex-1">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
          <input
            type="text"
            placeholder="Search character, romaji, or Nepali sound (e.g., ka, आ, ㅂ)..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-slate-950/80 border border-slate-800 rounded-xl pl-10 pr-4 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500 transition-all"
          />
        </div>
        <div className="text-xs text-slate-400 font-medium">
          Showing <span className="text-white font-bold">{filteredData.length}</span> items
        </div>
      </div>

      {/* Tap-to-Hear Cards Grid */}
      <div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 lg:grid-cols-10 gap-3">
        {filteredData.map((item, idx) => (
          <button
            key={idx}
            onClick={() => playSound(item.char)}
            className={`relative group p-3 rounded-2xl border transition-all duration-200 flex flex-col items-center justify-center cursor-pointer select-none ${
              activeChar === item.char
                ? 'scale-110 bg-indigo-600 border-indigo-400 text-white shadow-glow'
                : 'bg-slate-950/60 hover:bg-slate-800/90 border-slate-800/80 hover:border-indigo-500/50 hover:shadow-lg'
            }`}
          >
            <Volume2 className="absolute top-1 right-1 w-3.5 h-3.5 text-indigo-400 opacity-0 group-hover:opacity-100 transition-opacity" />

            <div className={`text-2xl font-black mb-1 ${activeLanguage === 'JAPANESE' ? 'font-jp text-rose-300' : 'font-kr text-emerald-300'}`}>
              {item.char}
            </div>

            <div className="text-[11px] font-bold text-slate-200">
              {item.romaji}
            </div>

            <div className="text-[10px] text-amber-400 font-medium mt-0.5">
              {item.nepaliHint}
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};
