'use client';

import React, { useState, useRef } from 'react';
import {
  BookOpen, Search, Volume2, ChevronDown, ChevronRight, ChevronLeft, MessageSquare, Sparkles, Flame,
  Trophy, CheckCircle2, Bookmark, ExternalLink, RefreshCw, X, Layers, FileText, Music, Headphones, Mic2, Square, BookCheck, Printer, Book, Check, Eye, EyeOff
} from 'lucide-react';
import {
  NIHONGO_VOCAB_DATA, JAPANESE_HIRAGANA, JAPANESE_KATAKANA, JAPANESE_DAKUTON_HANDAKUTON,
  JAPANESE_YOON, VocabItem, KanaItem,
  getVocabByLevel, getVocabByLevelAndLesson, getAvailableLessonsForLevel
} from '@/lib/nihongo-vocab';
import { getAudioTracksForLesson } from '@/lib/n5-audio-tracks';
import { getKanjiByLevel, KanjiItem } from '@/lib/kanji-dataset';
import { getGrammarGuide, LessonGrammarGuide } from '@/lib/grammar-guide';
import { RadicalBreakdown } from '@/components/RadicalBreakdown';
import { BASIC_KANJI_100, BASIC_VOCAB_200 } from '@/lib/basics-japanese-data';
import { KANJI_1000_DATA, Kanji1000Item } from '@/lib/kanji-1000-data';
import { KanjiPracticeModal } from '@/components/KanjiPracticeModal';

const LEVEL_LABELS: Record<string, string> = {
  BASICS: '🎯 Japanese Basics (Kana, Rules & Kanji Radicals)',
  N5: 'Minna no Nihongo Book 1 (Lessons 1–25 Complete)',
  N4: 'Minna no Nihongo Book 2 (Lessons 26–50 Complete)',
  N3: 'JLPT N3 Intermediate Master Curriculum',
  N2: 'JLPT N2 Upper-Intermediate Curriculum',
  N1: 'JLPT N1 Advanced Mastery Curriculum',
  JFT: 'JFT-Basic A2 Exam Comprehensive Handbook',
};

const BASIC_RULES = [
  { title: 'Dakuten (濁点) Sound Change', rule: 'k→g, s→z, t→d, h→b', desc: 'Adds two small dots (゛) to soften consonant sounds.', nepali: 'व्यञ्जन ध्वनिलाई परिवर्तन गर्न दुईवटा थोप्ला (゛) थपिन्छ।', example: 'か (ka) → が (ga)' },
  { title: 'Handakuten (半濁点) P-Sound', rule: 'h → p', desc: 'Adds a small circle (゜) to change H-row to P-row sounds.', nepali: 'H-लाइन ध्वनिलाई P-लाइनमा रूपान्तरण गर्न सानो वृत्त (゜) थपिन्छ।', example: 'は (ha) → ぱ (pa)' },
  { title: 'Long Vowels (長音)', rule: 'う / い / ー', desc: 'Extend vowel length: おう = ō, えい = ē, Katakana uses ー.', nepali: 'स्वरको लम्बाइ बढाउन: おう = ओ:, Katakana मा ー प्रयोग गरिन्छ।', example: 'とうきょう (Tōkyō)' },
  { title: 'Small Sokuon (っ / ッ)', rule: 'Double Consonant', desc: 'Creates a slight pause, doubling the following consonant.', nepali: 'सानो っ ले पछिल्लो व्यञ्जनलाई दोहोर्याउँछ र सानो अडान सिर्जना गर्छ।', example: 'きって (kitte - Stamp)' },
  { title: 'Topic Particle (は - wa)', rule: 'Pronounced "wa"', desc: 'When used as a particle, は is pronounced "wa", not "ha".', nepali: 'व्याकरण कणको रूपमा प्रयोग गर्दा は लाई "wa" उच्चारण गरिन्छ।', example: 'わたし は (Watashi wa)' },
  { title: 'Direction Particle (へ - e)', rule: 'Pronounced "e"', desc: 'When pointing direction, へ is pronounced "e", not "he".', nepali: 'दिशा जनाउने कणको रूपमा へ लाई "e" उच्चारण गरिन्छ।', example: 'とうきょう へ (Tōkyō e)' },
];

export const JAPANESE_LESSON_TITLES: Record<number, { title: string; topic: string }> = {
  1: { title: 'Introductions & Identity', topic: '自己紹介' },
  2: { title: 'Demonstratives & Belongings', topic: 'これ・それ・あれ' },
  3: { title: 'Places & Locations', topic: 'ここ・そこ・あそこ' },
  4: { title: 'Time & Daily Routines', topic: '時間と日課' },
  5: { title: 'Movement & Transport', topic: '移動と交通' },
  6: { title: 'Objects & Daily Actions', topic: '目的語と行動' },
  7: { title: 'Tools & Giving/Receiving', topic: '道具と授受' },
  8: { title: 'Adjectives & Qualities', topic: '形容詞と性質' },
  9: { title: 'Preferences & Abilities', topic: '好き嫌いと能力' },
  10: { title: 'Existence & Location', topic: '存在と位置' },
  11: { title: 'Quantifiers & Counters', topic: '助数詞と数量' },
  12: { title: 'Past Adjectives & Comparison', topic: '過去形と比較' },
  13: { title: 'Desires & Purpose', topic: '欲しい・〜たい' },
  14: { title: 'Te-Form & Requests', topic: 'て形と依頼' },
  15: { title: 'Permission & Prohibition', topic: '許可と禁止' },
  16: { title: 'Sequential Actions & State', topic: '文の接続' },
  17: { title: 'Nai-Form & Obligations', topic: 'ない形と義務' },
  18: { title: 'Dictionary Form & Ability', topic: '辞書形と可能' },
  19: { title: 'Ta-Form & Experiences', topic: 'た形と経験' },
  20: { title: 'Plain Speech & Conversation', topic: '普通体会話' },
  21: { title: 'Opinions & Quotations', topic: '意見と引用' },
  22: { title: 'Noun Modification / Relative Clauses', topic: '連体修飾' },
  23: { title: 'Time Clauses & Conditionals', topic: 'とき・と' },
  24: { title: 'Giving & Receiving Favors', topic: '授受表現' },
  25: { title: 'Conditionals & Concessions', topic: 'たら・ても' },
  26: { title: 'Stating Reasons & States', topic: '〜んです' },
  27: { title: 'Potential Verb Forms', topic: '可能形' },
  28: { title: 'Simultaneous Actions & Habits', topic: '〜ながら' },
  29: { title: 'Intransitive Verbs & States', topic: '〜ています' },
  30: { title: 'Preparatory Actions', topic: '〜てあります' },
  31: { title: 'Volitional Form & Intentions', topic: '意向形' },
  32: { title: 'Advice & Predictions', topic: '〜ほうがいい' },
  33: { title: 'Imperative & Prohibitive', topic: '命令形・禁止形' },
  34: { title: 'Following Instructions', topic: '〜とおりに' },
  35: { title: 'Conditional Form 〜ば', topic: '条件形' },
  36: { title: 'Trying to Achieve', topic: '〜ようにします' },
  37: { title: 'Passive Voice', topic: '受動形' },
  38: { title: 'Nominalizing Actions', topic: '〜の / 〜こと' },
  39: { title: 'Causes & Reasons 〜て/〜で', topic: '原因・理由' },
  40: { title: 'Embedded Questions', topic: '〜かどうか' },
  41: { title: 'Favors & Honorific Giving', topic: '〜てさしあげる' },
  42: { title: 'Purpose & Usage', topic: '〜ために / 〜のに' },
  43: { title: 'Appearances & Expectation', topic: '〜そうです' },
  44: { title: 'Excessive Actions & Ease', topic: '〜すぎます' },
  45: { title: 'Situations & Cases', topic: '〜場合に' },
  46: { title: 'Completion & Regret', topic: '〜ところです' },
  47: { title: 'Hearsay & Evidence', topic: '〜そうです/ようです' },
  48: { title: 'Causative Verb Forms', topic: '使役形' },
  49: { title: 'Respectful Honorific Speech', topic: '尊敬語' },
  50: { title: 'Humble Honorific Speech', topic: '謙譲語' },
};

export interface VocabularyExplorerProps {
  preselectedLevel?: 'BASICS' | 'N5' | 'N4' | 'N3' | 'N2' | 'N1' | 'JFT' | 'KANJI_1000';
}

type BasicsSubTab = 'HIRAGANA' | 'KATAKANA' | 'DAKUTEN' | 'YOON' | 'RULES' | 'RADICALS' | 'KANJI' | 'VOCAB';

export const VocabularyExplorer: React.FC<VocabularyExplorerProps> = ({ preselectedLevel }) => {
  const [selectedLevel, setSelectedLevel] = useState<'BASICS' | 'N5' | 'N4' | 'N3' | 'N2' | 'N1' | 'JFT' | 'KANJI_1000'>(preselectedLevel || 'N5');
  const [selectedLesson, setSelectedLesson] = useState<number>(1);
  const [activeLessonTab, setActiveLessonTab] = useState<'VOCAB' | 'GRAMMAR'>('VOCAB');

  // 1000 Kanji Hub states
  const [kanjiSearchQuery, setKanjiSearchQuery] = useState<string>('');
  const [kanjiActiveTier, setKanjiActiveTier] = useState<'all' | 'basic' | 'intermediate' | 'advanced'>('all');
  const [kanjiCurrentPage, setKanjiCurrentPage] = useState<number>(1);
  const kanjiItemsPerPage = 20;

  // Practice Modal states
  const [isPracticeOpen, setIsPracticeOpen] = useState<boolean>(false);
  const [practiceDeck, setPracticeDeck] = useState<Kanji1000Item[]>([]);
  const [practiceTitle, setPracticeTitle] = useState<string>('');

  // Lesson Meaning Hide/Revise states
  const [hideLessonMeanings, setHideLessonMeanings] = useState<boolean>(false);
  const [revealedVocabIds, setRevealedVocabIds] = useState<Set<string | number>>(new Set());

  const toggleVocabReveal = (id: string | number) => {
    setRevealedVocabIds(prev => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  React.useEffect(() => {
    if (preselectedLevel) {
      setSelectedLevel(preselectedLevel);
      if (preselectedLevel !== 'BASICS' && preselectedLevel !== 'KANJI_1000') {
        if (preselectedLevel === 'JFT') {
          setSelectedLesson(1);
        } else {
          const targetLvl = (preselectedLevel === 'N2' || preselectedLevel === 'N1') ? 'N3' : preselectedLevel;
          const available = getAvailableLessonsForLevel(targetLvl);
          if (available.length > 0) setSelectedLesson(available[0]);
        }
      }
    }
  }, [preselectedLevel]);

  const [searchQuery, setSearchQuery] = useState<string>('');
  const [inspectKanji, setInspectKanji] = useState<string | null>(null);
  const [expandedGrammar, setExpandedGrammar] = useState<string | null>(null);

  const mainRef = useRef<HTMLDivElement | null>(null);
  const vocabListRef = useRef<HTMLDivElement | null>(null);
  const grammarListRef = useRef<HTMLDivElement | null>(null);

  // Auto instant scroll to top of new lesson (Item #1) inside container when selectedLesson changes
  React.useEffect(() => {
    if (vocabListRef.current) vocabListRef.current.scrollTop = 0;
    if (grammarListRef.current) grammarListRef.current.scrollTop = 0;
    if (mainRef.current) mainRef.current.scrollTop = 0;
  }, [selectedLesson]);
  const [showGrammarModal, setShowGrammarModal] = useState<boolean>(false);
  const [showScannedSheetModal, setShowScannedSheetModal] = useState<boolean>(false);
  const [showShortNoteModal, setShowShortNoteModal] = useState<boolean>(false);
  const [modalLangMode, setModalLangMode] = useState<'en' | 'np' | 'both'>('both');
  const [basicsSubTab, setBasicsSubTab] = useState<BasicsSubTab>('HIRAGANA');
  const [activeKanaChar, setActiveKanaChar] = useState<string | null>(null);

  const [mobileLessonMenuOpen, setMobileLessonMenuOpen] = useState<boolean>(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [playingTrack, setPlayingTrack] = useState<'vocab' | 'dialogue' | 'drill' | null>(null);

  const playPronunciation = (text: string, lang = 'ja-JP') => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = lang;
      utterance.rate = 0.85;
      window.speechSynthesis.speak(utterance);
    }
  };

  const renderKanaCard = (item: KanaItem, color = 'text-rose-600') => (
    <button
      key={item.char}
      onClick={() => {
        setActiveKanaChar(item.char);
        playPronunciation(item.char);
      }}
      className={`p-2.5 sm:p-3 rounded-xl border text-center transition-all cursor-pointer group relative ${
        activeKanaChar === item.char
          ? 'bg-rose-600 text-white border-rose-400 shadow-md scale-105'
          : 'bg-white hover:bg-rose-50/70 border-slate-200 hover:border-rose-300 text-slate-900 shadow-xs'
      }`}
    >
      <Volume2 className="absolute top-1 right-1 w-3 h-3 text-rose-500 opacity-0 group-hover:opacity-100 transition-opacity" />
      <div className={`text-xl sm:text-2xl font-black mb-0.5 font-jp ${activeKanaChar === item.char ? 'text-white' : color}`}>
        {item.char}
      </div>
      <div className="text-[10px] sm:text-[11px] font-extrabold text-slate-700 leading-tight">{item.romaji}</div>
      <div className="text-[9px] text-amber-950 font-black mt-0.5">{item.nepali}</div>
    </button>
  );

  const playLessonTrack = (trackType: 'vocab' | 'dialogue' | 'drill', url: string) => {
    if (audioRef.current) { audioRef.current.pause(); audioRef.current.currentTime = 0; }
    if (playingTrack === trackType) { setPlayingTrack(null); return; }
    const audio = new Audio(url);
    audioRef.current = audio;
    audio.play().catch(() => {
      if ('speechSynthesis' in window) {
        const utt = new SpeechSynthesisUtterance(`レッスン ${selectedLesson} の ${trackType === 'vocab' ? '単語' : trackType === 'dialogue' ? '会話' : '練習'} です。`);
        utt.lang = 'ja-JP';
        window.speechSynthesis.speak(utt);
      }
    });
    audio.onended = () => setPlayingTrack(null);
    setPlayingTrack(trackType);
  };

  const stopAudio = () => {
    if (audioRef.current) { audioRef.current.pause(); audioRef.current.currentTime = 0; }
    setPlayingTrack(null);
  };

  const effectiveLevel = selectedLevel === 'JFT'
    ? (selectedLesson <= 25 ? 'N5' : 'N4')
    : ((selectedLevel === 'N2' || selectedLevel === 'N1') ? 'N3' : (selectedLevel as 'N5' | 'N4' | 'N3'));

  const availableLessons = selectedLevel === 'JFT'
    ? Array.from({ length: 50 }, (_, i) => i + 1)
    : (selectedLevel !== 'BASICS' ? getAvailableLessonsForLevel(effectiveLevel) : []);

  const lessonVocab = selectedLevel !== 'BASICS'
    ? getVocabByLevelAndLesson(effectiveLevel, selectedLesson)
    : [];

  const allLevelVocab = selectedLevel === 'JFT'
    ? [...getVocabByLevel('N5'), ...getVocabByLevel('N4')]
    : (selectedLevel !== 'BASICS' ? getVocabByLevel(effectiveLevel) : []);

  const grammarGuide = selectedLevel !== 'BASICS'
    ? getGrammarGuide('JAPANESE', effectiveLevel, selectedLesson)
    : null;

  const filteredVocab = searchQuery
    ? allLevelVocab.filter((v: VocabItem) =>
        v.word.includes(searchQuery) ||
        v.reading.includes(searchQuery) ||
        v.meaning.toLowerCase().includes(searchQuery.toLowerCase()) ||
        v.meaningNepali.includes(searchQuery)
      )
    : lessonVocab;

  const getInspectKanjiDetails = (char: string): KanjiItem => {
    const allKanji = [...getKanjiByLevel('N5'), ...getKanjiByLevel('N4'), ...getKanjiByLevel('N3'), ...getKanjiByLevel('N2')];
    const match = allKanji.find(k => k.character === char);
    if (match) return match;
    return {
      character: char,
      level: 'N5',
      lessonOrder: 1,
      strokeCount: 5,
      readingsOnyomi: ['オン'],
      readingsKunyomi: ['くん'],
      meanings: [`${char} Kanji`],
      meaningsNepali: [`${char} काञ्जी`],
      radicals: [{ radical: '部首', meaning: 'Radical', color: '#ffb703' }],
      compounds: [
        { word: `${char}語`, reading: `${char}ご`, meaning: `${char} word` }
      ]
    };
  };

  return (
    <div className="w-full font-sans space-y-4 sm:space-y-5">
      {/* (Top Banner Removed for Clean Full-Width Display) */}

      {/* ══════════════════════════════════════════════════════════
          JAPANESE BASICS VIEW (HIRAGANA, KATAKANA, DAKUTEN, YOON, RULES - White Book Paper Mode)
      ══════════════════════════════════════════════════════════ */}
      {selectedLevel === 'BASICS' && (
        <div className="space-y-2 font-sans pt-0">
          <div className="flex items-center gap-1.5 overflow-x-auto bg-slate-900/90 border border-slate-800 p-1.5 rounded-2xl">
            {(['HIRAGANA', 'KATAKANA', 'DAKUTEN', 'YOON', 'RULES', 'RADICALS', 'KANJI', 'VOCAB'] as const).map((sub) => (
              <button
                key={sub}
                onClick={() => setBasicsSubTab(sub)}
                className={`px-3 py-1.5 rounded-xl text-xs font-extrabold transition-all cursor-pointer whitespace-nowrap ${
                  basicsSubTab === sub
                    ? 'bg-red-600 text-white shadow-sm'
                    : 'text-slate-400 hover:text-white hover:bg-slate-800'
                }`}
              >
                {sub === 'HIRAGANA' && 'あ Hiragana (46)'}
                {sub === 'KATAKANA' && 'ア Katakana (46)'}
                {sub === 'DAKUTEN' && '゛ Dakuten/Handakuten (25)'}
                {sub === 'YOON' && 'きゃ Yoon Combination (33)'}
                {sub === 'RULES' && '📖 Grammar Rules'}
                {sub === 'RADICALS' && '🧩 Kanji Radicals'}
                {sub === 'KANJI' && '💮 Basic Kanji (100)'}
                {sub === 'VOCAB' && '📖 Basic Vocab (200)'}
              </button>
            ))}
          </div>

          {basicsSubTab === 'HIRAGANA' && (
            <div className="bg-white text-slate-900 border border-slate-200/90 rounded-2xl sm:rounded-3xl p-4 sm:p-6 shadow-2xl space-y-3 font-sans">
              <div className="text-xs font-black uppercase tracking-wider text-red-600">Basic 46 Hiragana Phonetic Characters (ひらがな)</div>
              <div className="grid grid-cols-5 sm:grid-cols-10 gap-2">
                {JAPANESE_HIRAGANA.map(item => renderKanaCard(item, 'text-red-600'))}
              </div>
            </div>
          )}

          {basicsSubTab === 'KATAKANA' && (
            <div className="bg-white text-slate-900 border border-slate-200/90 rounded-2xl sm:rounded-3xl p-4 sm:p-6 shadow-2xl space-y-3 font-sans">
              <div className="text-xs font-black uppercase tracking-wider text-red-600">Basic 46 Katakana Characters for Foreign Words (カタカナ)</div>
              <div className="grid grid-cols-5 sm:grid-cols-10 gap-2">
                {JAPANESE_KATAKANA.map(item => renderKanaCard(item, 'text-red-600'))}
              </div>
            </div>
          )}

          {basicsSubTab === 'DAKUTEN' && (
            <div className="bg-white text-slate-900 border border-slate-200/90 rounded-2xl sm:rounded-3xl p-4 sm:p-6 shadow-2xl space-y-3 font-sans">
              <div className="text-xs font-black uppercase tracking-wider text-amber-700">25 Voiced & Semi-Voiced Sounds (濁点・半濁点)</div>
              <div className="grid grid-cols-5 sm:grid-cols-10 gap-2">
                {JAPANESE_DAKUTON_HANDAKUTON.map(item => renderKanaCard(item, 'text-amber-700'))}
              </div>
            </div>
          )}

          {basicsSubTab === 'YOON' && (
            <div className="bg-white text-slate-900 border border-slate-200/90 rounded-2xl sm:rounded-3xl p-4 sm:p-6 shadow-2xl space-y-3 font-sans">
              <div className="text-xs font-black uppercase tracking-wider text-emerald-700">33 Contracted Combination Sounds (拗音 - きゃ, きゅ, きょ)</div>
              <div className="grid grid-cols-4 sm:grid-cols-8 gap-2">
                {JAPANESE_YOON.map(item => renderKanaCard(item, 'text-emerald-700'))}
              </div>
            </div>
          )}

          {basicsSubTab === 'RULES' && (
            <div className="bg-white text-slate-900 border border-slate-200/90 rounded-2xl sm:rounded-3xl p-4 sm:p-6 shadow-2xl space-y-3 font-sans">
              <div className="text-xs font-black uppercase tracking-wider text-rose-600">📖 Key Pronunciation & Grammar Rules for N5</div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {BASIC_RULES.map((rule, i) => (
                  <div key={i} className="p-4 bg-amber-50/50 border border-amber-200/90 rounded-2xl space-y-2 hover:border-amber-300 transition-all font-sans shadow-xs">
                    <div className="flex items-start justify-between gap-2">
                      <div className="text-sm font-black text-slate-900">{rule.title}</div>
                      <div className="text-xs font-extrabold text-rose-900 bg-rose-100 border border-rose-300 px-2 py-0.5 rounded-lg whitespace-nowrap flex-shrink-0 font-mono">
                        {rule.rule}
                      </div>
                    </div>
                    <p className="text-xs text-slate-800 font-medium leading-relaxed">🇬🇧 {rule.desc}</p>
                    <p className="text-xs text-amber-950 font-extrabold">🇳🇵 {rule.nepali}</p>
                    <div className="flex items-center gap-2 pt-1 border-t border-amber-200/60">
                      <span className="text-lg font-jp font-black text-rose-700">{rule.example}</span>
                      <button
                        onClick={() => playPronunciation(rule.example)}
                        className="p-1 rounded-lg bg-rose-50 hover:bg-rose-600 text-rose-700 hover:text-white border border-rose-200 transition-all cursor-pointer"
                      >
                        <Volume2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {basicsSubTab === 'RADICALS' && (
            <RadicalBreakdown />
          )}

          {basicsSubTab === 'KANJI' && (
            <div className="bg-[#fcf8f2] text-[#2d2219] border border-[#e8decb] rounded-2xl sm:rounded-3xl p-4 sm:p-6 shadow-xl space-y-4 font-sans relative">
              <div className="flex items-center justify-between pb-3 border-b border-[#e8decb]">
                <div>
                  <div className="text-xs font-black uppercase tracking-wider text-rose-800">💮 Beginner Level Kanji Guide (100)</div>
                  <div className="text-[10px] font-bold text-[#5c4a3c] mt-0.5 font-jp">Scroll through basic characters, meanings, and formations</div>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => {
                      const basicDeck = KANJI_1000_DATA.slice(0, 100);
                      setPracticeDeck(basicDeck);
                      setPracticeTitle('Basic Kanji (100) Practice');
                      setIsPracticeOpen(true);
                    }}
                    className="px-3 py-1 rounded-xl text-[11px] font-black bg-rose-800 hover:bg-rose-700 text-white border border-rose-700 transition-all cursor-pointer flex items-center gap-1 shadow-xs"
                  >
                    💮 Practice (अभ्यास)
                  </button>
                  <div className="text-xs font-black text-rose-800 bg-rose-100 border border-rose-200 px-2 py-0.5 rounded-lg font-mono">
                    100 Kanji Total
                  </div>
                </div>
              </div>

              {/* Scrollable detailed list styled like pages of a study book - Two Column Grid */}
              <div className="max-h-[600px] overflow-y-auto pr-1 scrollbar-thin scrollbar-thumb-[#e8decb] scrollbar-track-transparent">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {BASIC_KANJI_100.map((kanji, idx) => (
                    <div
                      key={kanji.character}
                      className="p-4 bg-[#fbf6eb] border border-[#e8decb] rounded-2xl hover:shadow-md hover:border-amber-900/20 transition-all flex flex-col sm:flex-row gap-4 items-start relative group"
                    >
                      {/* Left: Large Kanji Box */}
                      <div className="flex flex-col items-center shrink-0 w-20 p-2.5 bg-white border border-[#e8decb] rounded-xl shadow-xs animate-fade-in">
                        <div className="text-3xl sm:text-4xl font-black font-jp text-rose-900 mb-0.5">{kanji.character}</div>
                        <div className="text-[8px] font-extrabold text-[#5c4a3c] uppercase tracking-wider bg-[#f5efe6] px-1.5 py-0.5 rounded border border-[#e8decb]">
                          {kanji.strokeCount} Strokes
                        </div>
                        <button
                          onClick={() => playPronunciation(kanji.character)}
                          className="mt-2 p-1 rounded-lg bg-rose-50 hover:bg-rose-700 text-rose-700 hover:text-white border border-rose-200 transition-all cursor-pointer flex items-center justify-center"
                          title="Hear Pronunciation"
                        >
                          <Volume2 className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      {/* Right: Readings, Meanings and Formation */}
                      <div className="flex-1 space-y-2 min-w-0 w-full">
                        <div className="flex flex-wrap items-baseline gap-x-2 gap-y-0.5">
                          <div className="text-sm font-extrabold text-[#2d2219]">
                            {idx + 1}. {kanji.meanings.join(', ')}
                          </div>
                          <div className="text-xs font-black text-[#5c4a3c] font-jp tracking-wider">
                            {kanji.meaningsNepali.join(', ')}
                          </div>
                        </div>

                        {/* Readings block */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-1 text-[11px] py-1 border-y border-[#e8decb]/60">
                          <div className="flex items-center gap-1">
                            <span className="font-extrabold text-[#5c4a3c] bg-[#f5efe6] px-1 py-0.2 rounded text-[9px] uppercase">On</span>
                            <span className="font-bold text-[#2d2219] font-jp tracking-wider truncate">{kanji.readingsOnyomi.join(', ') || '—'}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <span className="font-extrabold text-[#5c4a3c] bg-[#f5efe6] px-1 py-0.2 rounded text-[9px] uppercase">Kun</span>
                            <span className="font-bold text-[#2d2219] font-jp tracking-wider truncate">{kanji.readingsKunyomi.join(', ') || '—'}</span>
                          </div>
                        </div>

                        {/* Formation explanation */}
                        <div className="p-2.5 bg-white/70 border border-[#e8decb]/80 rounded-xl space-y-0.5">
                          <div className="text-[9px] font-black uppercase tracking-wider text-rose-800 flex items-center gap-1">
                            <span>💮 Kanji Formation</span>
                          </div>
                          <p className="text-[11px] text-[#2d2219] font-medium leading-normal">
                            {kanji.formation}
                          </p>
                          <p className="text-[11px] text-[#5c4a3c] font-extrabold leading-normal">
                            🇳🇵 {kanji.formationNepali}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}


          {basicsSubTab === 'VOCAB' && (
            <div className="bg-[#fcf8f2] text-[#2d2219] border border-[#e8decb] rounded-2xl sm:rounded-3xl p-4 sm:p-6 shadow-xl space-y-4 font-sans relative">
              <div className="flex items-center justify-between pb-3 border-b border-[#e8decb]">
                <div>
                  <div className="text-xs font-black uppercase tracking-wider text-rose-800">📖 Beginner Kana Vocabulary (200)</div>
                  <div className="text-[10px] font-bold text-[#5c4a3c] mt-0.5">Dual-column scrollable list of high-frequency words (no Kanji)</div>
                </div>
                <div className="text-xs font-black text-rose-800 bg-rose-100 border border-rose-200 px-2 py-0.5 rounded-lg font-mono">
                  200 Words Total
                </div>
              </div>

              {/* Dual Column list view - Scroll at once */}
              <div className="max-h-[600px] overflow-y-auto pr-1 scrollbar-thin scrollbar-thumb-[#e8decb] scrollbar-track-transparent">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                  {/* Left Column (Items 1-100) */}
                  <div className="space-y-2">
                    {BASIC_VOCAB_200.slice(0, 100).map((vocab, i) => (
                      <div
                        key={i}
                        className="p-3 bg-[#fbf6eb] border border-[#e8decb]/80 rounded-xl hover:border-amber-900/10 hover:shadow-xs transition-all flex items-center justify-between gap-3"
                      >
                        <div className="min-w-0 space-y-0.5">
                          <div className="flex items-center gap-2">
                            <span className="text-[10px] font-black text-[#5c4a3c] font-mono">{i + 1}</span>
                            <span className="text-base font-black text-[#2d2219] font-jp tracking-wider">{vocab.word}</span>
                          </div>
                          <div className="text-[11px] font-extrabold text-[#5c4a3c] font-mono pl-5">({vocab.romaji})</div>
                        </div>
                        <div className="text-right flex items-center gap-3">
                          <div className="min-w-0">
                            <div className="text-xs font-black text-[#2d2219] truncate max-w-[160px]">{vocab.meaning}</div>
                            <div className="text-[11px] font-bold text-[#5c4a3c] truncate max-w-[160px]">{vocab.meaningNepali}</div>
                          </div>
                          <button
                            onClick={() => playPronunciation(vocab.word)}
                            className="p-1 rounded-lg bg-rose-50 hover:bg-rose-600 text-rose-700 hover:text-white border border-rose-200 transition-all cursor-pointer flex-shrink-0"
                            title="Speak"
                          >
                            <Volume2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Right Column (Items 101-200) */}
                  <div className="space-y-2">
                    {BASIC_VOCAB_200.slice(100, 200).map((vocab, i) => (
                      <div
                        key={i}
                        className="p-3 bg-[#fbf6eb] border border-[#e8decb]/80 rounded-xl hover:border-amber-900/10 hover:shadow-xs transition-all flex items-center justify-between gap-3"
                      >
                        <div className="min-w-0 space-y-0.5">
                          <div className="flex items-center gap-2">
                            <span className="text-[10px] font-black text-[#5c4a3c] font-mono">{i + 101}</span>
                            <span className="text-base font-black text-[#2d2219] font-jp tracking-wider">{vocab.word}</span>
                          </div>
                          <div className="text-[11px] font-extrabold text-[#5c4a3c] font-mono pl-5">({vocab.romaji})</div>
                        </div>
                        <div className="text-right flex items-center gap-3">
                          <div className="min-w-0">
                            <div className="text-xs font-black text-[#2d2219] truncate max-w-[160px]">{vocab.meaning}</div>
                            <div className="text-[11px] font-bold text-[#5c4a3c] truncate max-w-[160px]">{vocab.meaningNepali}</div>
                          </div>
                          <button
                            onClick={() => playPronunciation(vocab.word)}
                            className="p-1 rounded-lg bg-rose-50 hover:bg-rose-600 text-rose-700 hover:text-white border border-rose-200 transition-all cursor-pointer flex-shrink-0"
                            title="Speak"
                          >
                            <Volume2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {/* ══════════════════════════════════════════════════════════
          1000 KANJI HUB FULL-PAGE VIEW
      ══════════════════════════════════════════════════════════ */}
      {selectedLevel === 'KANJI_1000' && (() => {
        const filtered1000Kanjis = KANJI_1000_DATA.filter(item => {
          if (kanjiActiveTier !== 'all' && item.tier !== kanjiActiveTier) return false;
          if (kanjiSearchQuery) {
            const q = kanjiSearchQuery.toLowerCase();
            const matchChar = item.character.includes(kanjiSearchQuery);
            const matchRead = item.readings.toLowerCase().includes(q);
            const matchEn = item.meaningEn.toLowerCase().includes(q);
            const matchNe = item.meaningNe.toLowerCase().includes(q);
            return matchChar || matchRead || matchEn || matchNe;
          }
          return true;
        });

        const totalKanjiPages = Math.max(1, Math.ceil(filtered1000Kanjis.length / kanjiItemsPerPage));
        const clampedPage = Math.min(kanjiCurrentPage, totalKanjiPages);
        const startIndex = (clampedPage - 1) * kanjiItemsPerPage;
        const paginatedKanjis = filtered1000Kanjis.slice(startIndex, startIndex + kanjiItemsPerPage);

        return (
          <div className="bg-[#fcf8f2] text-[#2d2219] border border-[#e8decb] rounded-2xl sm:rounded-3xl p-4 sm:p-6 shadow-xl space-y-4 font-sans relative">
            {/* Header Ribbon */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-3 border-b border-[#e8decb] gap-2">
              <div>
                <div className="text-xs font-black uppercase tracking-wider text-rose-800">💮 Japanese Kanji Hub (1000)</div>
                <div className="text-[10px] font-bold text-[#5c4a3c] mt-0.5">Learn 1000 high-frequency Kanji with Nepali explanation and examples</div>
              </div>
              <div className="flex items-center gap-2 self-start sm:self-auto">
                <button
                  onClick={() => {
                    setPracticeDeck(filtered1000Kanjis);
                    const tierLabel = kanjiActiveTier === 'all' ? 'All 1000' :
                                      kanjiActiveTier === 'basic' ? 'Basic (350)' :
                                      kanjiActiveTier === 'intermediate' ? 'Intermediate (350)' : 'Advanced (300)';
                    setPracticeTitle(`Kanji Hub ${tierLabel} Practice`);
                    setIsPracticeOpen(true);
                  }}
                  className="px-3.5 py-1.5 rounded-xl text-[11px] font-black bg-rose-800 hover:bg-rose-700 text-white border border-rose-700 transition-all cursor-pointer flex items-center gap-1 shadow-xs"
                >
                  💮 Practice (अभ्यास)
                </button>
                <div className="text-xs font-black text-rose-800 bg-rose-100 border border-rose-200 px-2 py-0.5 rounded-lg font-mono">
                  {filtered1000Kanjis.length} / 1000 Kanji Found
                </div>
              </div>
            </div>

            {/* Filter and Search Controls */}
            <div className="flex flex-col md:flex-row gap-3 items-center justify-between">
              {/* Search Input */}
              <div className="relative w-full md:w-80">
                <input
                  type="text"
                  value={kanjiSearchQuery}
                  onChange={(e) => {
                    setKanjiSearchQuery(e.target.value);
                    setKanjiCurrentPage(1);
                  }}
                  placeholder="Search Kanji, readings or meaning..."
                  className="w-full pl-9 pr-4 py-2 bg-white text-[#2d2219] border border-[#e8decb] rounded-xl text-xs font-bold shadow-xs placeholder-[#a89e8c] focus:outline-none focus:ring-1 focus:ring-rose-800 focus:border-rose-800"
                />
                <div className="absolute left-3 top-2.5 text-xs text-[#a89e8c] font-black font-jp">検</div>
              </div>

              {/* Tier Switches */}
              <div className="flex flex-wrap gap-1.5 w-full md:w-auto justify-start md:justify-end">
                {(['all', 'basic', 'intermediate', 'advanced'] as const).map((tier) => (
                  <button
                    key={tier}
                    onClick={() => {
                      setKanjiActiveTier(tier);
                      setKanjiCurrentPage(1);
                    }}
                    className={`px-3 py-1.5 rounded-lg text-[11px] font-black tracking-wide border transition-all cursor-pointer ${
                      kanjiActiveTier === tier
                        ? 'bg-rose-800 border-rose-800 text-white shadow-xs'
                        : 'bg-white border-[#e8decb] text-[#5c4a3c] hover:bg-[#fbf6eb]'
                    }`}
                  >
                    {tier === 'all' && 'सबै All'}
                    {tier === 'basic' && 'आधारभूत Basic (350)'}
                    {tier === 'intermediate' && 'मध्यम Intermediate (350)'}
                    {tier === 'advanced' && 'उच्च Advanced (300)'}
                  </button>
                ))}
              </div>
            </div>

            {/* Pagination Controls */}
            {totalKanjiPages > 1 && (
              <div className="flex items-center justify-between py-2 border-y border-[#e8decb]/60 text-xs">
                <button
                  onClick={() => setKanjiCurrentPage(prev => Math.max(1, prev - 1))}
                  disabled={clampedPage === 1}
                  className="px-3 py-1.5 rounded-lg border border-[#e8decb] bg-white font-extrabold text-[#5c4a3c] hover:bg-[#fbf6eb] disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
                >
                  ◀ Previous
                </button>
                <div className="flex items-center gap-2">
                  <span className="font-extrabold text-[#5c4a3c]">Page</span>
                  <select
                    value={clampedPage}
                    onChange={(e) => setKanjiCurrentPage(Number(e.target.value))}
                    className="bg-white border border-[#e8decb] rounded-lg px-2.5 py-1 text-xs font-bold text-[#2d2219] focus:outline-none focus:ring-1 focus:ring-rose-800"
                  >
                    {Array.from({ length: totalKanjiPages }, (_, i) => i + 1).map(pageNum => (
                      <option key={pageNum} value={pageNum}>
                        {pageNum} of {totalKanjiPages}
                      </option>
                    ))}
                  </select>
                </div>
                <button
                  onClick={() => setKanjiCurrentPage(prev => Math.min(totalKanjiPages, prev + 1))}
                  disabled={clampedPage === totalKanjiPages}
                  className="px-3 py-1.5 rounded-lg border border-[#e8decb] bg-white font-extrabold text-[#5c4a3c] hover:bg-[#fbf6eb] disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
                >
                  Next ▶
                </button>
              </div>
            )}

            {/* Two-Column Grid list */}
            <div className="max-h-[600px] overflow-y-auto pr-1 scrollbar-thin scrollbar-thumb-[#e8decb] scrollbar-track-transparent">
              {paginatedKanjis.length === 0 ? (
                <div className="py-12 text-center text-xs font-bold text-[#a89e8c]">
                  No Kanji found matching your search or filters.
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {paginatedKanjis.map((kanji) => (
                    <div
                      key={kanji.number}
                      className="p-4 bg-white border border-[#e8decb] rounded-2xl hover:shadow-md hover:border-amber-900/20 transition-all flex gap-4 items-start relative group"
                    >
                      {/* Left: Stamp Number & Large Character */}
                      <div className="flex flex-col items-center shrink-0 w-20 p-2 bg-[#fbf6eb] border border-[#e8decb] rounded-xl">
                        <span className="text-[10px] font-black text-rose-700 bg-rose-50 border border-rose-200 px-2 py-0.5 rounded-md font-mono mb-1.5">
                          {kanji.number}
                        </span>
                        <div className="text-3xl sm:text-4xl font-black font-jp text-[#2d2219] mb-1.5">{kanji.character}</div>
                        <button
                          onClick={() => playPronunciation(kanji.character)}
                          className="p-1 rounded-lg bg-rose-50 hover:bg-rose-700 text-rose-700 hover:text-white border border-rose-200 transition-all cursor-pointer flex items-center justify-center"
                          title="Hear Pronunciation"
                        >
                          <Volume2 className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      {/* Right: Readings, Meanings, and Examples */}
                      <div className="flex-1 space-y-1.5 min-w-0 w-full">
                        {/* Meanings */}
                        <div>
                          <div className="text-[10px] font-black text-rose-800 uppercase tracking-wider">MEANING</div>
                          <div className="text-sm font-black text-[#2d2219] leading-tight">
                            {kanji.meaningEn}
                          </div>
                          <div className="text-xs font-black text-[#5c4a3c] font-jp tracking-wider leading-tight">
                            {kanji.meaningNe}
                          </div>
                        </div>

                        {/* Readings */}
                        <div>
                          <div className="text-[10px] font-black text-[#a8813d] uppercase tracking-wider">READINGS</div>
                          <div className="text-[11px] font-extrabold text-[#2d2219] font-jp tracking-wider break-words leading-tight">
                            {kanji.readings}
                          </div>
                        </div>

                        {/* Examples */}
                        {kanji.examples && kanji.examples.length > 0 && (
                          <div className="pt-1.5 border-t border-dashed border-[#e8decb]">
                            <div className="text-[9px] font-black text-rose-800 uppercase tracking-wider mb-1">EXAMPLES</div>
                            <ul className="space-y-0.5">
                              {kanji.examples.map((ex, i) => (
                                <li key={i} className="text-[11px] text-[#4a463d] font-bold list-disc list-inside truncate font-jp" title={ex}>
                                  {ex}
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Bottom Pagination Info */}
            {totalKanjiPages > 1 && (
              <div className="text-center text-[10px] font-extrabold text-[#a89e8c] pt-2 border-t border-[#e8decb]/60">
                Showing Kanji {startIndex + 1} – {Math.min(startIndex + kanjiItemsPerPage, filtered1000Kanjis.length)} of {filtered1000Kanjis.length} (Page {clampedPage} of {totalKanjiPages})
              </div>
            )}
          </div>
        );
      })()}

      {/* ══════════════════════════════════════════════════════════
          N5 / N4 / N3 / JFT VOCABULARY & GRAMMAR VIEW
      ══════════════════════════════════════════════════════════ */}
      {selectedLevel !== 'BASICS' && selectedLevel !== 'KANJI_1000' && (
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 sm:gap-6 items-start font-sans">
          {/* ════ LEFT LESSONS SIDEBAR ════ */}
          <aside className="lg:col-span-1 bg-slate-900/95 border border-slate-800 rounded-2xl sm:rounded-3xl p-3.5 sm:p-4 text-white shadow-xl space-y-3">
            <div className="flex items-center justify-between pb-2 border-b border-slate-800">
              <div className="flex items-center gap-2 font-black text-xs sm:text-sm text-rose-400 uppercase tracking-wider">
                <BookOpen className="w-4 h-4 text-rose-400" />
                <span>LESSONS</span>
              </div>
              <span className="text-[10px] font-black px-2 py-0.5 rounded-full bg-slate-800 text-slate-300 border border-slate-700">
                {availableLessons.length} Total
              </span>
            </div>

            {/* Mobile Dropdown Quick Selector (Custom Bounded Picker) */}
            <div className="block lg:hidden relative w-full pb-1 z-30">
              <button
                type="button"
                onClick={() => setMobileLessonMenuOpen(!mobileLessonMenuOpen)}
                className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3.5 py-2.5 text-xs font-black text-rose-400 flex items-center justify-between shadow-inner cursor-pointer"
              >
                <span className="truncate">
                  Lesson {selectedLesson}: {JAPANESE_LESSON_TITLES[selectedLesson]?.title || `Lesson ${selectedLesson}`}
                </span>
                <ChevronDown className={`w-4 h-4 text-rose-400 shrink-0 transition-transform duration-200 ${mobileLessonMenuOpen ? 'rotate-180' : ''}`} />
              </button>

              {mobileLessonMenuOpen && (
                <>
                  <div className="fixed inset-0 z-40 bg-slate-950/40" onClick={() => setMobileLessonMenuOpen(false)} />
                  <div className="absolute top-full left-0 right-0 mt-1 w-full max-w-full bg-slate-900 border border-slate-800 rounded-2xl p-1.5 shadow-2xl z-50 max-h-64 overflow-y-auto space-y-1 scrollbar-thin scrollbar-thumb-slate-700">
                    {availableLessons.map((n) => {
                      const isSel = selectedLesson === n;
                      const meta = JAPANESE_LESSON_TITLES[n];
                      return (
                        <button
                          key={n}
                          type="button"
                          onClick={() => {
                            setSelectedLesson(n);
                            setSearchQuery('');
                            setInspectKanji(null);
                            setExpandedGrammar(null);
                            setActiveLessonTab('VOCAB');
                            setMobileLessonMenuOpen(false);
                          }}
                          className={`w-full text-left p-2.5 rounded-xl text-xs font-extrabold flex items-center justify-between gap-2 cursor-pointer ${
                            isSel ? 'bg-gradient-to-r from-rose-600 to-pink-600 text-white font-black shadow-sm' : 'text-slate-300 hover:bg-slate-800 hover:text-white'
                          }`}
                        >
                          <span className="truncate">Lesson {n}: {meta ? meta.title : `Lesson ${n}`}</span>
                          {isSel && <Check className="w-3.5 h-3.5 shrink-0 text-white" />}
                        </button>
                      );
                    })}
                  </div>
                </>
              )}
            </div>

            <div className="hidden lg:block max-h-[580px] sm:max-h-[640px] overflow-y-auto space-y-1.5 pr-1 scrollbar-thin scrollbar-thumb-slate-800 scrollbar-track-transparent">
              {availableLessons.map((n) => {
                const isSelected = selectedLesson === n;
                const tracks = selectedLevel === 'N5' ? getAudioTracksForLesson(n) : undefined;
                const lessonMeta = JAPANESE_LESSON_TITLES[n];
                return (
                  <button
                    key={n}
                    onClick={() => {
                      setSelectedLesson(n);
                      setSearchQuery('');
                      setInspectKanji(null);
                      setExpandedGrammar(null);
                      setActiveLessonTab('VOCAB');
                    }}
                    className={`w-full text-left p-2.5 rounded-xl text-xs transition-all flex items-center justify-between gap-2 cursor-pointer ${
                      isSelected
                        ? 'bg-gradient-to-r from-rose-600 to-pink-600 text-white font-black shadow-md border-l-4 border-rose-300'
                        : 'bg-slate-950/80 text-slate-300 hover:text-white hover:bg-slate-800/90 border border-slate-800/80'
                    }`}
                  >
                    <div className="flex items-center gap-2.5 min-w-0 flex-1">
                      <span className={`w-6 h-6 rounded-full font-black text-[11px] flex items-center justify-center shrink-0 ${
                        isSelected ? 'bg-white text-rose-950 shadow-xs' : 'bg-slate-800 text-slate-300'
                      }`}>
                        {n}
                      </span>
                      <div className="min-w-0 flex-1">
                        <div className="truncate text-xs font-black flex items-center gap-1">
                          <span>{lessonMeta?.title || `Lesson ${n}`}</span>
                          {tracks && <span className="text-[10px]">🎵</span>}
                        </div>
                        {lessonMeta && (
                          <div className={`truncate text-[10px] ${isSelected ? 'text-rose-100 font-medium' : 'text-slate-400'}`}>
                            Lesson {n}: {lessonMeta.topic}
                          </div>
                        )}
                      </div>
                    </div>
                    <ChevronRight className={`w-3.5 h-3.5 shrink-0 transition-transform ${isSelected ? 'text-white translate-x-0.5' : 'text-slate-500'}`} />
                  </button>
                );
              })}
            </div>
          </aside>

          {/* ════ RIGHT CONTENT AREA (White Book Paper Mode) ════ */}
          <main id="vocab-content-area" ref={mainRef} className="lg:col-span-3 bg-white text-slate-900 border border-slate-200/90 rounded-2xl sm:rounded-3xl p-4 sm:p-6 shadow-2xl space-y-4 font-sans scroll-mt-24">
            {/* Header Ribbon Controls (Compact) */}
            <div className="space-y-2.5 pb-2.5 border-b border-slate-200 font-sans">
              <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-2.5">
                <div>
                  <div className="text-[10px] sm:text-xs font-black uppercase tracking-wider text-rose-600">
                    JLPT {effectiveLevel} • Lesson {selectedLesson}
                  </div>
                  <h2 className="text-base sm:text-lg font-black text-slate-900 mt-0.5">
                    Minna no Nihongo (第{selectedLesson}課)
                  </h2>

                  {/* Small text links below lesson title */}
                  <div className="flex items-center gap-2 mt-1.5 flex-wrap">
                    <button
                      onClick={() => setShowShortNoteModal(true)}
                      className="text-[11px] font-bold text-blue-700 hover:text-blue-900 hover:underline flex items-center gap-1 cursor-pointer bg-blue-50 hover:bg-blue-100 px-2 py-0.5 rounded-md border border-blue-200/80 transition-colors"
                    >
                      <FileText className="w-3 h-3 text-blue-600" />
                      <span>Meaning Note</span>
                    </button>

                    <button
                      onClick={() => setShowGrammarModal(true)}
                      className="text-[11px] font-bold text-rose-700 hover:text-rose-900 hover:underline flex items-center gap-1 cursor-pointer bg-rose-50 hover:bg-rose-100 px-2 py-0.5 rounded-md border border-rose-200/80 transition-colors"
                    >
                      <BookCheck className="w-3 h-3 text-rose-600" />
                      <span>Grammar Note</span>
                    </button>

                    <button
                      onClick={() => setHideLessonMeanings(!hideLessonMeanings)}
                      className={`text-[11px] font-bold flex items-center gap-1 cursor-pointer px-2 py-0.5 rounded-md border transition-all ${
                        hideLessonMeanings
                          ? 'bg-rose-100 text-rose-900 border-rose-300 font-extrabold shadow-2xs'
                          : 'bg-slate-100 text-slate-700 hover:bg-slate-200 border-slate-200'
                      }`}
                      title={hideLessonMeanings ? "Click to show all meanings" : "Click to hide meanings for self-test revision"}
                    >
                      {hideLessonMeanings ? (
                        <>
                          <EyeOff className="w-3 h-3 text-rose-700" />
                          <span>Meanings Hidden</span>
                        </>
                      ) : (
                        <>
                          <Eye className="w-3 h-3 text-slate-600" />
                          <span>Hide Meanings</span>
                        </>
                      )}
                    </button>

                    {selectedLesson > 25 && (
                      <button
                        onClick={() => setShowScannedSheetModal(true)}
                        className="text-[11px] font-bold text-emerald-700 hover:text-emerald-900 hover:underline flex items-center gap-1 cursor-pointer bg-emerald-50 hover:bg-emerald-100 px-2 py-0.5 rounded-md border border-emerald-200/80 transition-colors"
                      >
                        <span>🖼️ Book Sheet</span>
                      </button>
                    )}
                  </div>
                </div>

                <div className="flex items-center gap-2 flex-wrap self-stretch md:self-auto justify-start md:justify-end">
                  {/* Audio Controls */}
                  {(() => {
                    const tracks = selectedLevel === 'N5' ? getAudioTracksForLesson(selectedLesson) : undefined;
                    if (!tracks) return null;
                    const btns: { type: 'vocab' | 'dialogue' | 'drill'; label: string; url: string; icon: React.ReactNode; color: string; activeColor: string }[] = [
                      { type: 'vocab',    label: 'Vocab',    url: tracks.vocab,    icon: <Music className="w-3 h-3" />,     color: 'bg-violet-700 hover:bg-violet-600',   activeColor: 'bg-violet-500 ring-1 ring-violet-300' },
                      { type: 'dialogue', label: 'Dialogue', url: tracks.dialogue, icon: <Headphones className="w-3 h-3" />, color: 'bg-emerald-700 hover:bg-emerald-600', activeColor: 'bg-emerald-500 ring-1 ring-emerald-300' },
                      { type: 'drill',    label: 'Drills',   url: tracks.drill,    icon: <Mic2 className="w-3 h-3" />,      color: 'bg-sky-700 hover:bg-sky-600',         activeColor: 'bg-sky-500 ring-1 ring-sky-300' },
                    ];
                    return (
                      <div className="flex items-center gap-1">
                        {btns.map((btn) => (
                          <button
                            key={btn.type}
                            onClick={() => playLessonTrack(btn.type, btn.url)}
                            className={`flex items-center gap-1 px-2.5 py-1.5 rounded-xl text-white text-xs font-black transition-all shadow-xs cursor-pointer ${playingTrack === btn.type ? btn.activeColor : btn.color}`}
                          >
                            {playingTrack === btn.type ? (
                              <span className="flex gap-0.5 items-center">
                                <span className="w-0.5 h-3 bg-white rounded-full animate-bounce" />
                                <span className="w-0.5 h-3 bg-white rounded-full animate-bounce" />
                              </span>
                            ) : (
                              btn.icon
                            )}
                            <span>{btn.label}</span>
                          </button>
                        ))}
                        {playingTrack && (
                          <button onClick={stopAudio} className="p-1.5 rounded-xl bg-rose-700 hover:bg-rose-600 text-white cursor-pointer" title="Stop audio">
                            <Square className="w-3 h-3 fill-white" />
                          </button>
                        )}
                      </div>
                    );
                  })()}

                  {/* In-Page Tab Switcher (Vocabulary vs Chapter Grammar) */}
                  <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-xl border border-slate-200/80">
                    <button
                      onClick={() => setActiveLessonTab('VOCAB')}
                      className={`px-3 py-1.5 rounded-lg text-xs font-extrabold transition-all cursor-pointer flex items-center gap-1.5 ${
                        activeLessonTab === 'VOCAB'
                          ? 'bg-rose-600 text-white shadow-xs'
                          : 'text-slate-600 hover:text-slate-900'
                      }`}
                    >
                      <Book className="w-3.5 h-3.5" />
                      <span>Vocabulary ({filteredVocab.length})</span>
                    </button>

                    <button
                      onClick={() => setActiveLessonTab('GRAMMAR')}
                      className={`px-3 py-1.5 rounded-lg text-xs font-extrabold transition-all cursor-pointer flex items-center gap-1.5 ${
                        activeLessonTab === 'GRAMMAR'
                          ? 'bg-rose-600 text-white shadow-xs'
                          : 'text-slate-600 hover:text-slate-900'
                      }`}
                    >
                      <BookCheck className="w-3.5 h-3.5" />
                      <span>Chapter Grammar ({grammarGuide?.grammarPoints.length || 0})</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Search Bar for Vocabulary View */}
            {activeLessonTab === 'VOCAB' && (
              <div className="relative w-full">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <input
                  type="text"
                  placeholder="Search Kanji / Reading / English / Nepali..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl pl-9 pr-3 py-2 text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:border-rose-600 transition-all font-sans"
                />
              </div>
            )}

            {/* ────────────────────────────────────────────────────────────
                TAB 1: VOCABULARY VIEW (White Book Paper Mode)
            ──────────────────────────────────────────────────────────── */}
            {activeLessonTab === 'VOCAB' && (
              <div ref={vocabListRef} className="max-h-[620px] overflow-y-auto pr-1 scrollbar-thin scrollbar-thumb-slate-300 space-y-2">
                {filteredVocab.length === 0 ? (
                  <div className="text-center py-10 text-slate-500 text-xs font-semibold">
                    No matching vocabulary items found for this lesson.
                  </div>
                ) : (
                  filteredVocab.map((vocab, vIdx) => {
                    const extractedKanji = vocab.kanjiCharacters && vocab.kanjiCharacters.length > 0
                      ? vocab.kanjiCharacters
                      : vocab.word.split('').filter(c => /[\u4e00-\u9faf]/.test(c));
                    return (
                      <div
                        key={vocab.id}
                        className="bg-white border border-slate-200/90 hover:border-rose-500/80 rounded-xl p-3 transition-all shadow-xs hover:shadow-md space-y-2 font-sans"
                      >
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                          <div className="flex items-center gap-2.5 flex-wrap">
                            <span className="w-6 h-6 rounded-lg bg-rose-100 border border-rose-300 text-rose-950 font-black text-xs flex items-center justify-center shrink-0 shadow-xs">
                              {vIdx + 1}
                            </span>
                            <div className="text-lg sm:text-xl font-black font-jp text-slate-900 leading-none">{vocab.word}</div>
                            <span className="text-xs font-bold font-jp text-rose-600">{vocab.reading}</span>
                            <button
                              onClick={() => playPronunciation(vocab.reading)}
                              className="p-1 rounded-md bg-slate-100 hover:bg-rose-600 text-slate-600 hover:text-white border border-slate-200 transition-all cursor-pointer"
                              title="Play pronunciation"
                            >
                              <Volume2 className="w-3.5 h-3.5" />
                            </button>
                            {vocab.partOfSpeech && (
                              <span className="text-[10px] px-1.5 py-0.5 rounded-md bg-rose-100 border border-rose-300 text-rose-900 font-extrabold">
                                {vocab.partOfSpeech}
                              </span>
                            )}
                            {extractedKanji.length > 0 && (
                              <div className="flex items-center gap-1">
                                {extractedKanji.map((kChar, kIdx) => (
                                  <button
                                    key={kIdx}
                                    onClick={() => setInspectKanji(kChar)}
                                    className="px-1.5 py-0.5 rounded bg-amber-100 hover:bg-amber-600 text-amber-900 hover:text-white border border-amber-300 text-xs font-jp font-bold transition-all flex items-center gap-0.5 cursor-pointer"
                                    title={`Inspect Kanji ${kChar}`}
                                  >
                                    <span>{kChar}</span>
                                    <Layers className="w-2.5 h-2.5" />
                                  </button>
                                ))}
                              </div>
                            )}
                          </div>
                          {hideLessonMeanings && !revealedVocabIds.has(vocab.id) ? (
                            <button
                              onClick={() => toggleVocabReveal(vocab.id)}
                              className="px-2 py-0.5 rounded-md bg-amber-50 hover:bg-amber-100 text-amber-900 border border-amber-200/90 text-[11px] font-extrabold transition-all flex items-center gap-1 cursor-pointer shadow-2xs self-start sm:self-auto"
                              title="Click to reveal meaning"
                            >
                              <Eye className="w-3 h-3 text-amber-700" />
                              <span>Meaning</span>
                            </button>
                          ) : (
                            <div className="flex items-center gap-2 text-xs flex-wrap sm:flex-nowrap">
                              <span className="font-semibold text-slate-800">🇬🇧 {vocab.meaning}</span>
                              <span className="text-slate-300 hidden sm:inline">•</span>
                              <span className="font-bold text-amber-900">🇳🇵 {vocab.meaningNepali}</span>
                              {hideLessonMeanings && (
                                <button
                                  onClick={() => toggleVocabReveal(vocab.id)}
                                  className="ml-1 text-[10px] text-slate-400 hover:text-slate-600 hover:underline cursor-pointer"
                                  title="Hide this item again"
                                >
                                  (hide)
                                </button>
                              )}
                            </div>
                          )}
                        </div>

                        {vocab.grammarSentences && vocab.grammarSentences.length > 0 && (
                          <div className="pt-1 border-t border-slate-100">
                            <button
                              onClick={() => setExpandedGrammar(expandedGrammar === vocab.id ? null : vocab.id)}
                              className="flex items-center gap-1 text-[11px] text-rose-600 hover:text-rose-700 font-extrabold transition-colors cursor-pointer"
                            >
                              <MessageSquare className="w-3 h-3" />
                              <span>{expandedGrammar === vocab.id ? 'Hide sentence' : 'Show example sentence'}</span>
                              <ChevronDown className={`w-3 h-3 transition-transform ${expandedGrammar === vocab.id ? 'rotate-180' : ''}`} />
                            </button>

                            {expandedGrammar === vocab.id && vocab.grammarSentences.map((gs, idx) => (
                              <div key={idx} className="mt-1.5 p-2.5 rounded-lg bg-amber-50/60 border border-amber-200/80 space-y-1 text-xs">
                                <div className="flex items-center justify-between gap-2">
                                  <div className="font-jp font-black text-slate-900">{gs.japanese}</div>
                                  <button
                                    onClick={() => playPronunciation(gs.japanese)}
                                    className="p-1 rounded bg-white text-slate-600 hover:text-rose-600 border border-slate-200 shrink-0 cursor-pointer"
                                  >
                                    <Volume2 className="w-3 h-3" />
                                  </button>
                                </div>
                                <div className="text-slate-700 text-[11px]">🇬🇧 {gs.english}</div>
                                <div className="text-amber-900 text-[11px] font-bold">🇳🇵 {gs.nepali}</div>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    );
                  })
                )}
              </div>
            )}

            {/* ────────────────────────────────────────────────────────────
                TAB 2: CHAPTER-WISE GRAMMAR VIEW (White Book Paper Mode)
            ──────────────────────────────────────────────────────────── */}
            {activeLessonTab === 'GRAMMAR' && (
              <div ref={grammarListRef} className="max-h-[620px] overflow-y-auto pr-1 scrollbar-thin scrollbar-thumb-slate-300 space-y-4 font-sans">
                <div className="p-3.5 rounded-2xl bg-amber-50 border border-amber-200 text-xs text-amber-950 font-bold flex items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <BookCheck className="w-4 h-4 text-amber-700 shrink-0" />
                    <span>Minna no Nihongo Lesson {selectedLesson} Grammar Syllabus</span>
                  </div>
                  <span className="px-2.5 py-0.5 rounded-full bg-amber-700 text-white font-black text-[10px]">
                    Lesson {selectedLesson}
                  </span>
                </div>

                {!grammarGuide || grammarGuide.grammarPoints.length === 0 ? (
                  <div className="text-center py-12 text-slate-500 text-xs font-semibold">
                    No grammar rules for this lesson.
                  </div>
                ) : (
                  <div className="space-y-4">
                    {grammarGuide.grammarPoints.map((point, idx) => (
                      <div key={idx} className="bg-amber-50/50 border border-amber-200/90 rounded-2xl p-4 sm:p-5 shadow-xs space-y-3 font-sans">
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-amber-200/60 pb-2.5">
                          <h3 className="text-sm sm:text-base font-black text-slate-900 font-jp leading-snug">
                            {point.title}
                          </h3>
                          <span className="self-start sm:self-auto px-2.5 py-1 rounded-lg bg-amber-200/80 text-amber-950 font-mono text-xs font-black border border-amber-300">
                            {point.pattern}
                          </span>
                        </div>

                        {/* Explanations in English & Nepali */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                          <div className="p-3 rounded-xl bg-white border border-slate-200/80 space-y-1">
                            <span className="text-[10px] font-black uppercase text-rose-800 block tracking-wider">🇬🇧 English Explanation</span>
                            <p className="text-slate-800 font-medium leading-relaxed">{point.explanationEnglish}</p>
                          </div>
                          <div className="p-3 rounded-xl bg-amber-100/60 border border-amber-300/80 space-y-1">
                            <span className="text-[10px] font-black uppercase text-amber-950 block tracking-wider">🇳🇵 नेपाली व्याख्या</span>
                            <p className="text-amber-950 font-extrabold leading-relaxed">{point.explanationNepali}</p>
                          </div>
                        </div>

                        {/* Examples */}
                        {point.examples && point.examples.length > 0 && (
                          <div className="space-y-2 pt-2 border-t border-amber-200/60">
                            <span className="text-[10px] font-black uppercase tracking-wider text-slate-400 block">
                              Example Sentences (उदाहरणहरू):
                            </span>
                            <div className="space-y-2">
                              {point.examples.map((ex, eIdx) => (
                                <div key={eIdx} className="p-3 rounded-xl bg-white border border-slate-200/80 flex items-start justify-between gap-2 text-xs shadow-xs">
                                  <div className="space-y-1">
                                    <div className="text-sm font-black text-slate-900 font-jp">{ex.target}</div>
                                    {ex.reading && <div className="text-[10px] font-bold text-rose-700 italic">{ex.reading}</div>}
                                    <div className="text-xs text-slate-800">🇬🇧 {ex.english}</div>
                                    <div className="text-xs text-amber-900 font-bold">🇳🇵 {ex.nepali}</div>
                                  </div>
                                  <button
                                    onClick={() => playPronunciation(ex.target)}
                                    className="p-1.5 rounded-lg bg-rose-50 hover:bg-rose-600 text-rose-700 hover:text-white border border-rose-200 transition-all shrink-0 cursor-pointer"
                                    title="Play audio"
                                  >
                                    <Volume2 className="w-3.5 h-3.5" />
                                  </button>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* Bottom Lesson Navigation Bar (Direct Next/Prev Lesson Move) */}
            <div className="pt-4 border-t border-slate-200 flex items-center justify-between gap-2 font-sans">
              <button
                onClick={() => {
                  const idx = availableLessons.indexOf(selectedLesson);
                  if (idx > 0) {
                    setSelectedLesson(availableLessons[idx - 1]);
                    setSearchQuery('');
                    setInspectKanji(null);
                    setExpandedGrammar(null);
                    setActiveLessonTab('VOCAB');
                  }
                }}
                disabled={availableLessons.indexOf(selectedLesson) <= 0}
                className="px-3.5 py-2 sm:px-5 sm:py-2.5 rounded-xl bg-slate-100 disabled:opacity-30 hover:bg-slate-200 text-slate-800 text-xs font-black flex items-center gap-1.5 transition-all border border-slate-200 cursor-pointer shadow-xs"
              >
                <ChevronLeft className="w-4 h-4" />
                <span>Prev Lesson</span>
              </button>

              <div className="text-[11px] font-black text-slate-500 hidden xs:block">
                Lesson {selectedLesson} of {availableLessons[availableLessons.length - 1]}
              </div>

              <button
                onClick={() => {
                  const idx = availableLessons.indexOf(selectedLesson);
                  if (idx < availableLessons.length - 1) {
                    setSelectedLesson(availableLessons[idx + 1]);
                    setSearchQuery('');
                    setInspectKanji(null);
                    setExpandedGrammar(null);
                    setActiveLessonTab('VOCAB');
                  }
                }}
                disabled={availableLessons.indexOf(selectedLesson) >= availableLessons.length - 1}
                className="px-4 py-2 sm:px-6 sm:py-2.5 rounded-xl bg-gradient-to-r from-rose-600 to-pink-600 hover:from-rose-500 hover:to-pink-500 disabled:opacity-40 text-white text-xs sm:text-sm font-black flex items-center gap-1.5 shadow-md transition-all cursor-pointer"
              >
                <span>Next Lesson</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </main>
        </div>
      )}

      {/* ── GRAMMAR GUIDE MODAL (White Book Paper Mode) ── */}
      {showGrammarModal && grammarGuide && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/85 backdrop-blur-md animate-fade-in">
          <div className="w-[96vw] sm:w-full max-w-3xl bg-white text-slate-900 border border-slate-200/90 rounded-3xl p-5 sm:p-8 shadow-2xl space-y-5 max-h-[90vh] overflow-y-auto font-sans">
            <div className="flex items-center justify-between pb-3 border-b border-slate-200">
              <div className="flex items-center gap-2">
                <div className="p-2 rounded-xl bg-amber-100 text-amber-900 border border-amber-300">
                  <BookCheck className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xs font-black uppercase tracking-wider text-amber-800">
                    JLPT {selectedLevel} • Lesson {selectedLesson} Grammar Guide
                  </div>
                  <h3 className="text-base sm:text-xl font-black text-slate-900">{grammarGuide.lessonTitle}</h3>
                </div>
              </div>
              <button
                onClick={() => setShowGrammarModal(false)}
                className="p-2 rounded-xl bg-slate-100 hover:bg-rose-600 text-slate-700 hover:text-white transition-all border border-slate-300 cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-4">
              {grammarGuide.grammarPoints.map((pt, pIdx) => (
                <div key={pIdx} className="bg-amber-50/50 border border-amber-200/80 rounded-2xl p-4 sm:p-5 space-y-3 shadow-xs">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-amber-200/80 pb-2">
                    <span className="text-xs font-black text-amber-900 bg-amber-100 px-2.5 py-1 rounded-lg border border-amber-300 font-jp">
                      Rule {pIdx + 1}: {pt.title}
                    </span>
                    <span className="text-xs font-jp font-bold text-rose-800 bg-rose-100 px-2 py-0.5 rounded border border-rose-300">
                      {pt.pattern}
                    </span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs pt-1">
                    <div className="p-3 rounded-xl bg-white border border-slate-200/80">
                      <span className="text-[10px] font-black uppercase tracking-wider text-rose-800 block">🇬🇧 English Explanation</span>
                      <p className="text-slate-800 font-medium leading-relaxed mt-0.5">{pt.explanationEnglish}</p>
                    </div>

                    <div className="p-3 rounded-xl bg-amber-100/60 border border-amber-300/80">
                      <span className="text-[10px] font-black uppercase tracking-wider text-amber-950 block">🇳🇵 नेपाली व्याख्या</span>
                      <p className="text-amber-950 font-extrabold leading-relaxed mt-0.5">{pt.explanationNepali}</p>
                    </div>
                  </div>

                  {pt.examples && pt.examples.length > 0 && (
                    <div className="space-y-2 pt-1 border-t border-amber-200/60">
                      <span className="text-[10px] font-black uppercase tracking-wider text-slate-500 block">Example Sentences:</span>
                      {pt.examples.map((ex, eIdx) => (
                        <div key={eIdx} className="bg-white p-3 rounded-xl border border-slate-200/80 flex items-start justify-between gap-2 shadow-xs">
                          <div className="space-y-1">
                            <div className="text-sm font-black font-jp text-slate-900">{ex.target}</div>
                            {ex.reading && <div className="text-[10px] text-rose-700 font-bold italic">{ex.reading}</div>}
                            <div className="text-xs text-slate-800">🇬🇧 {ex.english}</div>
                            <div className="text-xs text-amber-900 font-bold">🇳🇵 {ex.nepali}</div>
                          </div>
                          <button
                            onClick={() => playPronunciation(ex.target)}
                            className="p-1.5 rounded-lg bg-rose-50 hover:bg-rose-600 text-rose-700 hover:text-white border border-rose-200 transition-all shrink-0 cursor-pointer"
                          >
                            <Volume2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>

            <div className="pt-3 border-t border-slate-200 text-right">
              <button
                onClick={() => setShowGrammarModal(false)}
                className="w-full sm:w-auto px-5 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs transition-all cursor-pointer"
              >
                Close Grammar Guide
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Scanned Minna no Nihongo Textbook Image Modal */}
      {showScannedSheetModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/85 backdrop-blur-md animate-fade-in">
          <div className="w-[96vw] sm:w-full max-w-4xl bg-slate-900 border border-slate-800 rounded-3xl p-4 sm:p-6 shadow-2xl space-y-4 max-h-[90vh] flex flex-col text-white">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <div className="flex items-center gap-2">
                <span className="text-lg">🖼️</span>
                <div>
                  <div className="text-xs font-bold text-emerald-400">
                    Minna no Nihongo {selectedLevel === 'N4' ? 'Book 2' : 'Book 1'} • Lesson {selectedLesson}
                  </div>
                  <h3 className="text-base sm:text-lg font-black text-white">Official Scanned Reference Sheet</h3>
                </div>
              </div>
              <button onClick={() => setShowScannedSheetModal(false)} className="p-2 rounded-xl bg-slate-800 hover:bg-rose-600 text-slate-400 hover:text-white transition-all">
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto rounded-xl bg-slate-950 p-2 border border-slate-800 flex items-center justify-center">
                <img
                  src={selectedLevel === 'N4'
                    ? `/N4-26-50-vocab/lesson${selectedLesson}.jpg`
                    : `/N5-1-25-vocab/lesson${selectedLesson}.jpg`
                  }
                  alt={`Minna no Nihongo Lesson ${selectedLesson} Scanned Sheet`}
                  className="max-w-full h-auto rounded-lg shadow-md"
                onError={(e) => {
                  (e.target as HTMLElement).style.display = 'none';
                  const parent = (e.target as HTMLElement).parentElement;
                  if (parent) {
                    parent.innerHTML = `<div class="p-8 text-center text-slate-400 text-xs font-semibold">
                      <p className="text-sm font-bold text-amber-400 mb-1">🖼️ Scanned Book Sheet Preview</p>
                      <p>Reference sheet for Minna no Nihongo Lesson ${selectedLesson} is available in digital vector format above.</p>
                    </div>`;
                  }
                }}
              />
            </div>
          </div>
        </div>
      )}

      {/* Textbook Japanese Vocab Short Note Modal (4-column sheet view) */}
      {showShortNoteModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/85 backdrop-blur-md animate-fade-in print:p-0 print:bg-white">
          <div className="w-[96vw] sm:w-full max-w-4xl bg-slate-900 border border-slate-800 rounded-2xl sm:rounded-3xl p-4 sm:p-6 shadow-2xl space-y-4 max-h-[90vh] flex flex-col print:max-h-none print:w-full print:border-none print:shadow-none print:bg-white print:text-black text-white">
            {/* Modal Header */}
            <div className="flex items-center justify-between pb-3 border-b border-slate-800 print:hidden">
              <div className="flex items-center gap-2.5">
                <div className="p-2 rounded-xl bg-rose-600/20 text-rose-400 border border-rose-500/30">
                  <FileText className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-[10px] sm:text-xs font-bold uppercase tracking-wider text-rose-400">
                    JLPT {effectiveLevel} • Lesson {selectedLesson} Meanings Reference Sheet
                  </div>
                  <h3 className="text-base sm:text-lg font-black text-white">
                    Minna no Nihongo Lesson {selectedLesson} Vocab ({lessonVocab.length} Words)
                  </h3>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => window.print()}
                  className="px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer"
                  title="Print / Save PDF"
                >
                  <Printer className="w-4 h-4 text-rose-400" />
                  <span className="hidden sm:inline">Print / PDF</span>
                </button>
                <button
                  onClick={() => setShowShortNoteModal(false)}
                  className="p-1.5 sm:p-2 rounded-xl bg-slate-800 hover:bg-rose-600 text-slate-400 hover:text-white transition-all cursor-pointer"
                >
                  <X className="w-4 h-4 sm:w-5 sm:h-5" />
                </button>
              </div>
            </div>

            {/* Print Header */}
            <div className="hidden print:block text-center mb-4">
              <h1 className="text-2xl font-bold text-black">Lesson {selectedLesson} 単語整理 Sheet</h1>
              <p className="text-sm text-gray-700">Minna no Nihongo Japanese Vocabulary Reference Sheet ({lessonVocab.length} words)</p>
            </div>

            {/* 4-Column Table Sheet */}
            <div className="flex-1 overflow-y-auto pr-1 scrollbar-thin scrollbar-thumb-slate-700 scrollbar-track-transparent border border-slate-800 rounded-xl bg-slate-950/60 print:bg-white print:border-black">
              <table className="w-full text-left border-collapse">
                <thead className="sticky top-0 z-10 bg-slate-950 border-b border-slate-800 text-[11px] sm:text-xs text-rose-400 font-extrabold uppercase tracking-wider print:bg-gray-100 print:text-black print:border-black">
                  <tr>
                    <th className="py-2.5 px-3.5 w-1/4 border-r border-slate-800/60 print:border-black">1. Kanji / Word (漢字)</th>
                    <th className="py-2.5 px-3.5 w-1/4 border-r border-slate-800/60 print:border-black">2. Reading (読み)</th>
                    <th className="py-2.5 px-3.5 w-1/4 border-r border-slate-800/60 print:border-black">3. English Meaning</th>
                    <th className="py-2.5 px-3.5 w-1/4 text-amber-400 print:text-black">4. Nepali Meaning (नेपाली अर्थ)</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/60 text-xs font-sans print:divide-black">
                  {lessonVocab.map((v, i) => (
                    <tr
                      key={v.id || i}
                      onClick={() => playPronunciation(v.reading)}
                      className="hover:bg-rose-950/30 transition-colors cursor-pointer group print:hover:bg-transparent"
                    >
                      <td className="py-2.5 px-3.5 font-jp font-bold text-white group-hover:text-rose-300 text-sm border-r border-slate-800/40 print:text-black print:border-black">
                        {v.word}
                      </td>
                      <td className="py-2.5 px-3.5 font-jp font-bold text-rose-300 border-r border-slate-800/40 print:text-black print:border-black">
                        {v.reading}
                      </td>
                      <td className="py-2.5 px-3.5 text-slate-200 font-medium border-r border-slate-800/40 print:text-black print:border-black">
                        {v.meaning}
                      </td>
                      <td className="py-2.5 px-3.5 text-amber-300 font-semibold print:text-black">
                        {v.meaningNepali}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Modal Footer */}
            <div className="pt-2 sm:pt-3 border-t border-slate-800 flex items-center justify-between text-xs text-slate-400 print:hidden">
              <span className="text-[11px] text-slate-400">💡 Click any row to hear native Japanese audio</span>
              <button
                onClick={() => setShowShortNoteModal(false)}
                className="px-5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-bold transition-all cursor-pointer"
              >
                Close Sheet
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Kanji Inspection Modal */}
      {inspectKanji && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/85 backdrop-blur-md animate-fade-in">
          <div className="w-[94vw] sm:w-full max-w-lg bg-slate-900 border border-slate-800 rounded-3xl p-5 sm:p-6 shadow-2xl space-y-4 max-h-[85vh] overflow-y-auto text-white font-sans">
            {(() => {
              const details = getInspectKanjiDetails(inspectKanji);
              return (
                <>
                  <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                    <div className="flex items-center gap-2">
                      <span className="p-2 rounded-xl bg-amber-500/15 border border-amber-500/30 text-amber-400">
                        <Layers className="w-5 h-5" />
                      </span>
                      <div>
                        <div className="text-xs font-black uppercase tracking-wider text-amber-400">Kanji Inspector (漢字詳細)</div>
                        <h3 className="text-lg font-black text-white">{details.character} Structure & Stroke Analysis</h3>
                      </div>
                    </div>
                    <button onClick={() => setInspectKanji(null)} className="p-2 rounded-xl bg-slate-800 hover:bg-rose-600 text-slate-400 hover:text-white transition-all cursor-pointer">
                      <X className="w-4 h-4" />
                    </button>
                  </div>

                  <div className="grid grid-cols-3 gap-2 text-center">
                    <div className="p-3 bg-slate-950 rounded-2xl border border-slate-800">
                      <div className="text-[10px] font-bold text-slate-400">Onyomi (音読み)</div>
                      <div className="text-sm font-black font-jp text-rose-400 mt-0.5">{details.readingsOnyomi.join(', ') || '—'}</div>
                    </div>
                    <div className="p-3 bg-slate-950 rounded-2xl border border-slate-800">
                      <div className="text-[10px] font-bold text-slate-400">Kunyomi (訓読み)</div>
                      <div className="text-sm font-black font-jp text-pink-400 mt-0.5">{details.readingsKunyomi.join(', ') || '—'}</div>
                    </div>
                    <div className="p-3 bg-slate-950 rounded-2xl border border-slate-800">
                      <div className="text-[10px] font-bold text-slate-400">JLPT / Strokes</div>
                      <div className="text-sm font-black text-amber-400 mt-0.5">{details.level} • {details.strokeCount}画</div>
                    </div>
                  </div>

                  <div className="p-3.5 bg-slate-950 rounded-2xl border border-slate-800 space-y-1 text-xs">
                    <div className="text-slate-300">🇬🇧 <strong>English Meaning:</strong> {details.meanings.join(', ')}</div>
                    <div className="text-amber-400">🇳🇵 <strong>नेपाली अर्थ:</strong> {details.meaningsNepali.join(', ')}</div>
                    <div className="text-slate-400 text-[11px] pt-1">
                      Radicals / Sub-components: <span className="text-slate-200 font-jp font-bold">{details.radicals.map(r => `${r.radical} (${r.meaning})`).join(', ')}</span>
                    </div>
                  </div>

                  {details.compounds && details.compounds.length > 0 && (
                    <div className="space-y-2 pt-2 border-t border-slate-800">
                      <div className="text-xs font-bold text-slate-300">Common Vocabulary Compounds:</div>
                      <div className="space-y-1.5">
                        {details.compounds.map((ex, i) => (
                          <div key={i} className="p-2.5 rounded-xl bg-slate-950 border border-slate-800 flex items-center justify-between text-xs">
                            <div>
                              <div className="font-jp font-bold text-white text-sm">{ex.word} <span className="text-xs font-normal text-rose-400">({ex.reading})</span></div>
                              <div className="text-[11px] text-slate-300">🇬🇧 {ex.meaning}</div>
                            </div>
                            <button onClick={() => playPronunciation(ex.word)} className="p-1 rounded bg-slate-800 hover:bg-rose-600 text-slate-400 hover:text-white transition-all cursor-pointer">
                              <Volume2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  <div className="pt-2 text-right">
                    <button onClick={() => setInspectKanji(null)} className="w-full sm:w-auto px-5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs transition-all cursor-pointer">
                      Close Kanji Inspector
                    </button>
                  </div>
                </>
              );
            })()}
          </div>
        </div>
      )}
      <KanjiPracticeModal
        isOpen={isPracticeOpen}
        onClose={() => setIsPracticeOpen(false)}
        initialKanjis={practiceDeck}
        title={practiceTitle}
      />
    </div>
  );
};
