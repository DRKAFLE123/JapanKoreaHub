'use client';

import React, { useState, useRef } from 'react';
import {
  BookOpen,
  Search,
  HelpCircle,
  Sparkles,
  Volume2,
  ChevronDown,
  ChevronRight,
  MessageSquare,
  Globe,
  Award,
  BookCheck,
  X,
  Layers,
  ExternalLink,
  FileText,
  Printer,
  Music,
  Headphones,
  Mic2,
  Square,
  Sprout,
} from 'lucide-react';
import { getAudioTracksForLesson, LessonAudioTracks } from '@/lib/n5-audio-tracks';
import {
  NIHONGO_VOCAB_DATA, VocabItem,
  getVocabByLevel, getVocabByLevelAndLesson, getAvailableLessonsForLevel
} from '@/lib/nihongo-vocab';
import { getKanjiByLevelAndLesson, KanjiItem } from '@/lib/kanji-dataset';
import { getGrammarGuide, LessonGrammarGuide } from '@/lib/grammar-guide';

/* ──────────────────────────────────────────────────────────────
   BASICS DATA — Hiragana, Katakana, Greetings
────────────────────────────────────────────────────────────── */
interface KanaChar { char: string; romaji: string; nepali: string; }

const HIRAGANA: KanaChar[] = [
  { char:'あ', romaji:'a',  nepali:'आ'    }, { char:'い', romaji:'i',  nepali:'इ'    }, { char:'う', romaji:'u',  nepali:'उ'    }, { char:'え', romaji:'e',  nepali:'ए'    }, { char:'お', romaji:'o',  nepali:'ओ'    },
  { char:'か', romaji:'ka', nepali:'का'   }, { char:'き', romaji:'ki', nepali:'कि'   }, { char:'く', romaji:'ku', nepali:'कु'   }, { char:'け', romaji:'ke', nepali:'के'   }, { char:'こ', romaji:'ko', nepali:'को'   },
  { char:'さ', romaji:'sa', nepali:'सा'   }, { char:'し', romaji:'shi',nepali:'शि'   }, { char:'す', romaji:'su', nepali:'सु'   }, { char:'せ', romaji:'se', nepali:'से'   }, { char:'そ', romaji:'so', nepali:'सो'   },
  { char:'た', romaji:'ta', nepali:'ता'   }, { char:'ち', romaji:'chi',nepali:'चि'   }, { char:'つ', romaji:'tsu',nepali:'त्सु'}, { char:'て', romaji:'te', nepali:'ते'   }, { char:'と', romaji:'to', nepali:'तो'   },
  { char:'な', romaji:'na', nepali:'ना'   }, { char:'に', romaji:'ni', nepali:'नि'   }, { char:'ぬ', romaji:'nu', nepali:'नु'   }, { char:'ね', romaji:'ne', nepali:'ने'   }, { char:'の', romaji:'no', nepali:'नो'   },
  { char:'は', romaji:'ha', nepali:'हा'   }, { char:'ひ', romaji:'hi', nepali:'हि'   }, { char:'ふ', romaji:'fu', nepali:'फु'   }, { char:'へ', romaji:'he', nepali:'हे'   }, { char:'ほ', romaji:'ho', nepali:'हो'   },
  { char:'ま', romaji:'ma', nepali:'मा'   }, { char:'み', romaji:'mi', nepali:'मि'   }, { char:'む', romaji:'mu', nepali:'मु'   }, { char:'め', romaji:'me', nepali:'मे'   }, { char:'も', romaji:'mo', nepali:'मो'   },
  { char:'や', romaji:'ya', nepali:'या'   },                                               { char:'ゆ', romaji:'yu', nepali:'यु'   },                                               { char:'よ', romaji:'yo', nepali:'यो'   },
  { char:'ら', romaji:'ra', nepali:'रा'   }, { char:'り', romaji:'ri', nepali:'रि'   }, { char:'る', romaji:'ru', nepali:'रु'   }, { char:'れ', romaji:'re', nepali:'रे'   }, { char:'ろ', romaji:'ro', nepali:'रो'   },
  { char:'わ', romaji:'wa', nepali:'वा'   },                                                                                                                                        { char:'を', romaji:'wo', nepali:'वो'   },
  { char:'ん', romaji:'n',  nepali:'न्'   },
];

const KATAKANA: KanaChar[] = [
  { char:'ア', romaji:'a',  nepali:'आ'    }, { char:'イ', romaji:'i',  nepali:'इ'    }, { char:'ウ', romaji:'u',  nepali:'उ'    }, { char:'エ', romaji:'e',  nepali:'ए'    }, { char:'オ', romaji:'o',  nepali:'ओ'    },
  { char:'カ', romaji:'ka', nepali:'का'   }, { char:'キ', romaji:'ki', nepali:'कि'   }, { char:'ク', romaji:'ku', nepali:'कु'   }, { char:'ケ', romaji:'ke', nepali:'के'   }, { char:'コ', romaji:'ko', nepali:'को'   },
  { char:'サ', romaji:'sa', nepali:'सा'   }, { char:'シ', romaji:'shi',nepali:'शि'   }, { char:'ス', romaji:'su', nepali:'सु'   }, { char:'セ', romaji:'se', nepali:'से'   }, { char:'ソ', romaji:'so', nepali:'सो'   },
  { char:'タ', romaji:'ta', nepali:'ता'   }, { char:'チ', romaji:'chi',nepali:'चि'   }, { char:'ツ', romaji:'tsu',nepali:'त्सु'}, { char:'テ', romaji:'te', nepali:'ते'   }, { char:'ト', romaji:'to', nepali:'तो'   },
  { char:'ナ', romaji:'na', nepali:'ना'   }, { char:'ニ', romaji:'ni', nepali:'नि'   }, { char:'ヌ', romaji:'nu', nepali:'नु'   }, { char:'ネ', romaji:'ne', nepali:'ने'   }, { char:'ノ', romaji:'no', nepali:'नो'   },
  { char:'ハ', romaji:'ha', nepali:'हा'   }, { char:'ヒ', romaji:'hi', nepali:'हि'   }, { char:'フ', romaji:'fu', nepali:'फु'   }, { char:'ヘ', romaji:'he', nepali:'हे'   }, { char:'ホ', romaji:'ho', nepali:'हो'   },
  { char:'マ', romaji:'ma', nepali:'मा'   }, { char:'ミ', romaji:'mi', nepali:'मि'   }, { char:'ム', romaji:'mu', nepali:'मु'   }, { char:'メ', romaji:'me', nepali:'मे'   }, { char:'モ', romaji:'mo', nepali:'मो'   },
  { char:'ヤ', romaji:'ya', nepali:'या'   },                                               { char:'ユ', romaji:'yu', nepali:'यु'   },                                               { char:'ヨ', romaji:'yo', nepali:'यो'   },
  { char:'ラ', romaji:'ra', nepali:'रा'   }, { char:'リ', romaji:'ri', nepali:'रि'   }, { char:'ル', romaji:'ru', nepali:'रु'   }, { char:'レ', romaji:'re', nepali:'रे'   }, { char:'ロ', romaji:'ro', nepali:'रो'   },
  { char:'ワ', romaji:'wa', nepali:'वा'   },                                                                                                                                        { char:'ヲ', romaji:'wo', nepali:'वो'   },
  { char:'ン', romaji:'n',  nepali:'न्'   },
];

interface Greeting { japanese: string; reading: string; english: string; nepali: string; }
const GREETINGS: Greeting[] = [
  { japanese:'おはようございます', reading:'ohayou gozaimasu', english:'Good Morning (Formal)',    nepali:'शुभ प्रभात (आदरणीय)' },
  { japanese:'おはよう',          reading:'ohayou',           english:'Good Morning (Casual)',    nepali:'शुभ प्रभात (आफन्त)' },
  { japanese:'こんにちは',        reading:'konnichiwa',       english:'Hello / Good Afternoon',   nepali:'नमस्ते / शुभ दिन' },
  { japanese:'こんばんは',        reading:'konbanwa',         english:'Good Evening',             nepali:'शुभ साँझ' },
  { japanese:'おやすみなさい',    reading:'oyasuminasai',     english:'Good Night (Formal)',       nepali:'शुभ रात्रि (आदरणीय)' },
  { japanese:'さようなら',        reading:'sayounara',        english:'Goodbye',                  nepali:'अलविदा' },
  { japanese:'ありがとうございます',reading:'arigatou gozaimasu',english:'Thank you (Formal)',    nepali:'धन्यवाद (आदरणीय)' },
  { japanese:'ありがとう',        reading:'arigatou',         english:'Thank you (Casual)',        nepali:'धन्यवाद' },
  { japanese:'すみません',        reading:'sumimasen',        english:'Excuse me / Sorry',        nepali:'माफ गर्नुहोस्' },
  { japanese:'ごめんなさい',      reading:'gomen nasai',      english:'I\'m sorry',               nepali:'मलाई माफ गर्नुहोस्' },
  { japanese:'はじめまして',      reading:'hajimemashite',    english:'Nice to meet you',         nepali:'भेट भएकोमा खुसी' },
  { japanese:'よろしくおねがいします',reading:'yoroshiku onegaishimasu',english:'Please treat me well', nepali:'सहयोग गरिदिनु होला' },
  { japanese:'はい',             reading:'hai',              english:'Yes',                      nepali:'हो / हजुर' },
  { japanese:'いいえ',           reading:'iie',              english:'No',                       nepali:'होइन' },
  { japanese:'わかります',        reading:'wakarimasu',       english:'I understand',             nepali:'म बुझ्छु' },
  { japanese:'わかりません',      reading:'wakarimasen',      english:'I don\'t understand',      nepali:'म बुझ्दिन' },
];

const BASIC_RULES = [
  { title: 'Vowels (母音)', rule: 'a • i • u • e • o', desc: 'Japanese has 5 pure vowels. Each is pronounced clearly and distinctly.', nepali: 'जापानीमा ५ स्वर छन् — आ, इ, उ, ए, ओ।', example: 'あいうえお' },
  { title: 'Long Vowels (長音)', rule: 'aa / ii / uu / ee / oo', desc: 'Doubling a vowel extends its sound. e.g. おかあさん (okaasan = mother).', nepali: 'स्वरलाई दोब्बर गर्दा लामो उच्चारण हुन्छ।', example: 'おかあさん' },
  { title: 'Double Consonants (促音)', rule: 'っ (small tsu)', desc: 'A small っ doubles the following consonant. e.g. きって (kitte = stamp).', nepali: 'साना っ ले अर्को व्यञ्जनलाई दोब्बर गर्छ।', example: 'きって' },
  { title: 'Dakuten (濁点)', rule: '゛marks (voiced)', desc: 'Adding ゛ to a consonant voices it: か→が, さ→ざ, た→だ, は→ば', nepali: '゛चिह्न थप्दा व्यञ्जन घोष हुन्छ।', example: 'が ざ だ ば' },
  { title: 'Handakuten (半濁点)', rule: '゜marks (p-sounds)', desc: 'Adding ゜to は-row creates p-sounds: は→ぱ, ひ→ぴ, ふ→ぷ, へ→ぺ, ほ→ぽ', nepali: '゜चिह्न थप्दा प-ध्वनि बन्छ।', example: 'ぱ ぴ ぷ ぺ ぽ' },
  { title: 'Particles (助詞)', rule: 'は・を・が・に・で・へ', desc: 'Particles connect sentence parts. は (wa) marks the topic, を (wo) marks the object, に (ni) marks direction/time.', nepali: 'कारक चिह्नले वाक्यका भागलाई जोड्छ।', example: 'わたしは がくせいです。' },
];

/* ──────────────────────────────────────────────────────────────
   EXISTING STATIC DATA
────────────────────────────────────────────────────────────── */
const LEVEL_LABELS: Record<'N5' | 'N4' | 'N3', string> = {
  N5: 'JLPT N5 (Basic Minna no Nihongo 1–25)',
  N4: 'JLPT N4 (Elementary Minna no Nihongo 26–50)',
  N3: 'JLPT N3 (Intermediate Japanese 51–75)',
};

const LESSON_TOPICS: Record<number, string> = {
  1: 'Introductions & Identity (は・です)', 2: 'Demonstratives (これ・それ・あれ)', 3: 'Location (ここ・そこ・あそこ)', 4: 'Time & Verb Tenses (〜ます)', 5: 'Movement & Transport (へ・で)',
  6: 'Objects & Invitations (を・ませんか)', 7: 'Tools, Giving & Receiving (で・あげる・もらう)', 8: 'Adjectives (い形・な形)', 9: 'Preferences & Reasons (が好き・から)', 10: 'Existence & Location (あります・います)',
  11: 'Counters & Frequency (助数詞・〜に〜回)', 12: 'Comparisons & Superlatives (〜より・一番)', 13: 'Desires & Purpose (欲しい・〜たい・に)', 14: 'Te-form Conjugation & Requests (〜てください)', 15: 'Permission & Prohibition (〜てもいい・〜てはいけない)',
  16: 'Connecting & Sequence (〜て・〜てから)', 17: 'Nai-form & Obligations (〜なければ)', 18: 'Dictionary Form & Ability (〜ことができる)', 19: 'Ta-form & Experience (〜たことがある)', 20: 'Plain Speech Style (普通体)',
  21: 'Opinions & Quotes (〜と思います)', 22: 'Relative Clauses (連体修飾)', 23: 'Time Clauses & Conditionals (とき・と)', 24: 'Giving & Receiving Favors (〜てくれる)', 25: 'Conditionals & Concessions (〜たら・〜ても)',
  26: 'Explanatory (〜んです)', 27: 'Potential Verbs', 28: 'Simultaneous Actions (〜ながら)', 29: 'States of Being', 30: 'Preparatory Action (〜ておく)',
  31: 'Volitional Form (おう/よう)', 32: 'Advice & Probabilities', 33: 'Imperative & Prohibition', 34: 'Instructions (〜通りに)', 35: 'Conditional (〜ば)',
  36: 'Habits (〜ようにする)', 37: 'Passive Voice (〜れる/られる)', 38: 'Nominalization (〜の)', 39: 'Causes & Reasons', 40: 'Embedded Questions (〜かどうか)',
  41: 'Polite Giving (いただきます)', 42: 'Purpose (〜ために)', 43: 'Conjecture (〜そうです)', 44: 'Excess (〜すぎる)', 45: 'Cases (〜場合は)',
  46: 'Timing (〜ところ)', 47: 'Hearsay (〜そうです)', 48: 'Causative (〜させる)', 49: 'Honorific Keigo (尊敬語)', 50: 'Humble Keigo (謙譲語)',
  51: 'Must Be (〜に違いない)', 52: 'Regarding (〜に関して)', 53: 'Centered On (〜を中心に)', 54: 'Through (〜を通じて)', 55: 'Depending On (〜によって)',
};

const KANJI_LOOKUP_DATABASE: Record<string, KanjiItem> = {
  '見': { character: '見', level: 'N5', meanings: ['See', 'Look', 'Show'], meaningsNepali: ['हेर्नु', 'देखाउनु'], readingsOnyomi: ['ケン'], readingsKunyomi: ['み.る', 'み.える'], strokeCount: 7, strokeSvgData: [], radicals: [{ radical: '目', meaning: 'Eye', color: '#f59e0b' }, { radical: '儿', meaning: 'Legs', color: '#3b82f6' }], lessonOrder: 1, compounds: [{ word: '見学', reading: 'けんがく', meaning: 'Study tour' }, { word: '意見', reading: 'いけん', meaning: 'Opinion' }] },
  '学': { character: '学', level: 'N5', meanings: ['Study', 'Learn', 'Science'], meaningsNepali: ['सिक्नु', 'पढ्नु'], readingsOnyomi: ['ガク'], readingsKunyomi: ['まな.ぶ'], strokeCount: 8, strokeSvgData: [], radicals: [{ radical: '子', meaning: 'Child', color: '#10b981' }], lessonOrder: 1, compounds: [{ word: '学生', reading: 'がくせい', meaning: 'Student' }, { word: '学校', reading: 'がっこう', meaning: 'School' }] },
};

type SelectedLevel = 'BASICS' | 'N5' | 'N4' | 'N3';
type BasicsSubTab = 'HIRAGANA' | 'KATAKANA' | 'GREETINGS' | 'RULES';

export const VocabularyExplorer: React.FC = () => {
  const [selectedLevel, setSelectedLevel] = useState<SelectedLevel>('BASICS');
  const [selectedLesson, setSelectedLesson] = useState<number>(1);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [inspectKanji, setInspectKanji] = useState<string | null>(null);
  const [expandedGrammar, setExpandedGrammar] = useState<string | null>(null);
  const [showGrammarModal, setShowGrammarModal] = useState<boolean>(false);
  const [showScannedSheetModal, setShowScannedSheetModal] = useState<boolean>(false);
  const [showShortNoteModal, setShowShortNoteModal] = useState<boolean>(false);
  const [modalLangMode, setModalLangMode] = useState<'en' | 'np' | 'both'>('both');
  const [basicsSubTab, setBasicsSubTab] = useState<BasicsSubTab>('HIRAGANA');
  const [activeKanaChar, setActiveKanaChar] = useState<string | null>(null);

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

  const playKana = (char: string) => {
    setActiveKanaChar(char);
    playPronunciation(char);
    setTimeout(() => setActiveKanaChar(null), 700);
  };

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

  // Only needed for N5/N4/N3 levels
  const availableLessons = selectedLevel !== 'BASICS' ? getAvailableLessonsForLevel(selectedLevel as 'N5'|'N4'|'N3') : [];
  const lessonVocab      = selectedLevel !== 'BASICS' ? getVocabByLevelAndLesson(selectedLevel as 'N5'|'N4'|'N3', selectedLesson) : [];
  const allLevelVocab    = selectedLevel !== 'BASICS' ? getVocabByLevel(selectedLevel as 'N5'|'N4'|'N3') : [];
  const grammarGuide     = selectedLevel !== 'BASICS' ? getGrammarGuide('JAPANESE', selectedLevel as 'N5'|'N4'|'N3', selectedLesson) : null;

  const filteredVocab = searchQuery
    ? allLevelVocab.filter((v) =>
        v.word.includes(searchQuery) ||
        v.reading.includes(searchQuery) ||
        v.meaning.toLowerCase().includes(searchQuery.toLowerCase()) ||
        v.meaningNepali.includes(searchQuery)
      )
    : lessonVocab;

  const getInspectKanjiDetails = (char: string): KanjiItem => {
    if (KANJI_LOOKUP_DATABASE[char]) return KANJI_LOOKUP_DATABASE[char];
    return {
      character: char, level: selectedLevel === 'BASICS' ? 'N5' : selectedLevel,
      meanings: ['Kanji Character'], meaningsNepali: ['काञ्जी अक्षर'],
      readingsOnyomi: ['—'], readingsKunyomi: ['—'], strokeCount: 8, strokeSvgData: [],
      radicals: [{ radical: char, meaning: 'Radical Component', color: '#f59e0b' }],
      lessonOrder: selectedLesson, compounds: [],
    };
  };

  const inspectKanjiObj = inspectKanji ? getInspectKanjiDetails(inspectKanji) : null;

  /* ──────── KANA CARD ──────── */
  const KanaCard = ({ item, color }: { item: KanaChar; color: string }) => (
    <button
      onClick={() => playKana(item.char)}
      className={`group relative flex flex-col items-center justify-center p-2 sm:p-3 rounded-xl border transition-all cursor-pointer select-none min-h-[72px] sm:min-h-[80px] ${
        activeKanaChar === item.char
          ? 'scale-110 bg-indigo-600 border-indigo-400 shadow-glow'
          : 'bg-slate-950/60 hover:bg-slate-800/90 border-slate-800 hover:border-indigo-500/50 hover:shadow-lg'
      }`}
    >
      <Volume2 className="absolute top-1 right-1 w-3 h-3 text-indigo-400 opacity-0 group-hover:opacity-100 transition-opacity" />
      <div className={`text-xl sm:text-2xl font-black mb-0.5 font-jp ${activeKanaChar === item.char ? 'text-white' : color}`}>
        {item.char}
      </div>
      <div className="text-[10px] sm:text-[11px] font-extrabold text-slate-200 leading-tight">{item.romaji}</div>
      <div className="text-[9px] text-amber-400 font-medium mt-0.5">{item.nepali}</div>
    </button>
  );

  return (
    <div className="w-full max-w-7xl mx-auto font-sans space-y-3.5">

      {/* ── TOP: Level Selector Bar ── */}
      <div className="bg-slate-900/90 backdrop-blur-xl border border-slate-800 rounded-2xl p-2.5 sm:p-3 shadow-xl flex items-center justify-between gap-3">
        <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-rose-400 flex-shrink-0">
          <Globe className="w-4 h-4" />
          <span className="hidden sm:inline">Japanese Curriculum</span>
        </div>

        {/* Level Tabs */}
        <div className="flex items-center gap-1 sm:gap-1.5 bg-slate-950 p-1 rounded-xl border border-slate-800 flex-1 max-w-2xl overflow-x-auto scrollbar-none">
          {/* BASICS tab */}
          <button
            onClick={() => { setSelectedLevel('BASICS'); setBasicsSubTab('HIRAGANA'); setSearchQuery(''); setInspectKanji(null); stopAudio(); }}
            className={`flex items-center justify-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-black transition-all whitespace-nowrap flex-shrink-0 ${
              selectedLevel === 'BASICS'
                ? 'bg-gradient-to-r from-emerald-600 to-teal-600 text-white shadow-glow'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Sprout className="w-3.5 h-3.5" />
            <span>Basics</span>
          </button>

          {/* N5 / N4 / N3 tabs */}
          {(['N5', 'N4', 'N3'] as const).map((level) => (
            <button
              key={level}
              onClick={() => {
                setSelectedLevel(level);
                setSelectedLesson(getAvailableLessonsForLevel(level)[0] || 1);
                setSearchQuery(''); setInspectKanji(null); setExpandedGrammar(null); stopAudio();
              }}
              className={`flex-1 py-1.5 px-2 sm:px-3 rounded-lg text-xs font-black transition-all flex items-center justify-center gap-1.5 whitespace-nowrap ${
                selectedLevel === level
                  ? 'bg-gradient-to-r from-rose-600 to-pink-600 text-white shadow-glow'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <Award className="w-3.5 h-3.5" />
              <span>JLPT {level}</span>
            </button>
          ))}
        </div>
      </div>

      {/* ══════════════════════════════════════════════════════════
          BASICS VIEW — Hiragana / Katakana / Greetings / Rules
      ══════════════════════════════════════════════════════════ */}
      {selectedLevel === 'BASICS' && (
        <div className="space-y-4">

          {/* Basics banner */}
          <div className="bg-gradient-to-r from-emerald-950/80 to-teal-950/80 border border-emerald-800/60 rounded-2xl p-4 sm:p-5 shadow-xl">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-emerald-600 to-teal-600 flex items-center justify-center text-2xl shadow-glow flex-shrink-0">
                🌱
              </div>
              <div>
                <div className="text-[10px] font-extrabold uppercase tracking-widest text-emerald-400">Japanese Fundamentals</div>
                <h2 className="text-base sm:text-lg font-black text-white">Hiragana • Katakana • Basic Greetings & Rules</h2>
                <p className="text-xs text-slate-400 mt-0.5">Master all Japanese alphabets, pronunciation rules, and essential greetings before starting N5 lessons.</p>
              </div>
            </div>
          </div>

          {/* Sub-tab bar */}
          <div className="flex items-center gap-1.5 p-1.5 bg-slate-900 border border-slate-800 rounded-2xl overflow-x-auto scrollbar-none">
            {([
              { id: 'HIRAGANA',  label: 'Hiragana (ひらがな)', emoji: '🔤', count: HIRAGANA.length },
              { id: 'KATAKANA',  label: 'Katakana (カタカナ)', emoji: '🔡', count: KATAKANA.length },
              { id: 'GREETINGS', label: 'Greetings (あいさつ)', emoji: '👋', count: GREETINGS.length },
              { id: 'RULES',     label: 'Key Rules (規則)',     emoji: '📖', count: BASIC_RULES.length },
            ] as { id: BasicsSubTab; label: string; emoji: string; count: number }[]).map(tab => (
              <button
                key={tab.id}
                onClick={() => setBasicsSubTab(tab.id)}
                className={`flex items-center gap-2 px-3 sm:px-4 py-2 rounded-xl text-xs font-extrabold transition-all whitespace-nowrap flex-shrink-0 ${
                  basicsSubTab === tab.id
                    ? 'bg-gradient-to-r from-emerald-600 to-teal-600 text-white shadow-glow'
                    : 'bg-slate-950/60 text-slate-400 hover:text-white border border-slate-800'
                }`}
              >
                <span>{tab.emoji}</span>
                <span>{tab.label}</span>
                <span className={`text-[10px] px-1.5 py-0.5 rounded-full font-black ${
                  basicsSubTab === tab.id ? 'bg-white/20 text-white' : 'bg-slate-800 text-slate-400'
                }`}>{tab.count}</span>
              </button>
            ))}
          </div>

          {/* ── HIRAGANA Grid ── */}
          {basicsSubTab === 'HIRAGANA' && (
            <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-4 sm:p-5 shadow-xl space-y-4">
              <div className="flex items-center gap-2">
                <div className="text-[10px] font-extrabold uppercase tracking-widest text-rose-400">ひらがな — Hiragana Alphabet</div>
                <div className="ml-auto text-[10px] text-slate-400 bg-slate-800 px-2 py-0.5 rounded-md border border-slate-700">Tap each card to hear pronunciation</div>
              </div>
              <div className="grid grid-cols-5 sm:grid-cols-8 md:grid-cols-10 gap-2">
                {HIRAGANA.map((item) => (
                  <KanaCard key={item.char} item={item} color="text-rose-300" />
                ))}
              </div>
            </div>
          )}

          {/* ── KATAKANA Grid ── */}
          {basicsSubTab === 'KATAKANA' && (
            <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-4 sm:p-5 shadow-xl space-y-4">
              <div className="flex items-center gap-2">
                <div className="text-[10px] font-extrabold uppercase tracking-widest text-violet-400">カタカナ — Katakana Alphabet</div>
                <div className="ml-auto text-[10px] text-slate-400 bg-slate-800 px-2 py-0.5 rounded-md border border-slate-700">Tap each card to hear pronunciation</div>
              </div>
              <div className="grid grid-cols-5 sm:grid-cols-8 md:grid-cols-10 gap-2">
                {KATAKANA.map((item) => (
                  <KanaCard key={item.char} item={item} color="text-violet-300" />
                ))}
              </div>
            </div>
          )}

          {/* ── GREETINGS List ── */}
          {basicsSubTab === 'GREETINGS' && (
            <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-4 sm:p-5 shadow-xl space-y-3">
              <div className="text-[10px] font-extrabold uppercase tracking-widest text-amber-400">あいさつ — Essential Japanese Greetings</div>
              <div className="space-y-2">
                {GREETINGS.map((g, i) => (
                  <div key={i} className="flex items-center gap-3 sm:gap-4 p-3 sm:p-4 bg-slate-950/70 border border-slate-800 rounded-2xl hover:border-slate-700 hover:bg-slate-800/50 transition-all group">
                    <div className="w-7 h-7 rounded-xl bg-amber-500/15 border border-amber-500/30 flex items-center justify-center text-xs font-black text-amber-400 flex-shrink-0">
                      {i + 1}
                    </div>
                    <div className="flex-1 min-w-0 grid grid-cols-1 sm:grid-cols-2 gap-1 sm:gap-3">
                      <div>
                        <div className="text-base sm:text-lg font-black font-jp text-white">{g.japanese}</div>
                        <div className="text-xs text-slate-400 italic">{g.reading}</div>
                      </div>
                      <div>
                        <div className="text-xs font-semibold text-slate-200">🇬🇧 {g.english}</div>
                        <div className="text-xs font-semibold text-amber-400">🇳🇵 {g.nepali}</div>
                      </div>
                    </div>
                    <button
                      onClick={() => playPronunciation(g.japanese)}
                      className="p-2 rounded-xl bg-slate-800 hover:bg-rose-600 text-slate-400 hover:text-white transition-all border border-slate-700 flex-shrink-0"
                      title="Play pronunciation"
                    >
                      <Volume2 className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ── RULES Cards ── */}
          {basicsSubTab === 'RULES' && (
            <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-4 sm:p-5 shadow-xl space-y-3">
              <div className="text-[10px] font-extrabold uppercase tracking-widest text-sky-400">📖 Key Pronunciation & Grammar Rules for N5</div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {BASIC_RULES.map((rule, i) => (
                  <div key={i} className="p-4 bg-slate-950/80 border border-slate-800 rounded-2xl space-y-2 hover:border-slate-700 transition-all">
                    <div className="flex items-start justify-between gap-2">
                      <div className="text-sm font-black text-white">{rule.title}</div>
                      <div className="text-xs font-extrabold text-sky-300 bg-sky-500/10 border border-sky-500/30 px-2 py-0.5 rounded-lg whitespace-nowrap flex-shrink-0">
                        {rule.rule}
                      </div>
                    </div>
                    <p className="text-xs text-slate-300 leading-relaxed">🇬🇧 {rule.desc}</p>
                    <p className="text-xs text-amber-400 font-semibold">🇳🇵 {rule.nepali}</p>
                    <div className="flex items-center gap-2 pt-1 border-t border-slate-800">
                      <span className="text-lg font-jp font-black text-rose-300">{rule.example}</span>
                      <button
                        onClick={() => playPronunciation(rule.example)}
                        className="p-1 rounded-lg bg-slate-800 hover:bg-rose-600 text-slate-400 hover:text-white transition-all"
                      >
                        <Volume2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {/* ══════════════════════════════════════════════════════════
          N5 / N4 / N3 VOCABULARY VIEW
      ══════════════════════════════════════════════════════════ */}
      {selectedLevel !== 'BASICS' && (
        <div className="flex gap-3.5 items-start">

          {/* ════ LEFT SIDEBAR ════ */}
          <aside className="hidden lg:flex flex-col w-60 xl:w-64 flex-shrink-0 sticky top-4">
            <div className="bg-slate-900/95 border border-slate-800 rounded-2xl shadow-2xl overflow-hidden">
              <div className="px-3.5 py-2.5 border-b border-slate-800 bg-slate-950/60 flex items-center justify-between">
                <div className="flex items-center gap-1.5 text-xs font-black text-white uppercase tracking-wider">
                  <BookOpen className="w-3.5 h-3.5 text-rose-400" /><span>Lessons</span>
                </div>
                <span className="text-[10px] font-bold text-slate-400 bg-slate-900 px-2 py-0.5 rounded-md border border-slate-800">
                  {availableLessons.length} Total
                </span>
              </div>
              <div className="overflow-y-auto max-h-[calc(100vh-180px)] scrollbar-thin scrollbar-thumb-slate-700 scrollbar-track-transparent py-1 space-y-0.5">
                {availableLessons.map((n) => {
                  const isActive = selectedLesson === n && !searchQuery;
                  const tracks = selectedLevel === 'N5' ? getAudioTracksForLesson(n) : undefined;
                  return (
                    <button
                      key={n}
                      onClick={() => { setSelectedLesson(n); setSearchQuery(''); setInspectKanji(null); setExpandedGrammar(null); }}
                      className={`w-full text-left px-3 py-2 flex items-center gap-2.5 transition-all group border-l-[3px] ${
                        isActive ? 'bg-rose-600/15 border-l-rose-500 text-white' : 'border-l-transparent text-slate-400 hover:bg-slate-800/60 hover:text-white'
                      }`}
                    >
                      <span className={`flex-shrink-0 w-6 h-6 rounded-lg flex items-center justify-center text-[11px] font-black transition-all ${
                        isActive ? 'bg-rose-600 text-white shadow-sm' : 'bg-slate-800 text-slate-400 group-hover:bg-slate-700 group-hover:text-white'
                      }`}>{n}</span>
                      <div className="min-w-0 flex-1">
                        <div className={`text-[11px] font-bold leading-tight truncate ${isActive ? 'text-white' : 'text-slate-300 group-hover:text-white'}`}>
                          {LESSON_TOPICS[n] || `Lesson ${n}`}
                        </div>
                        {isActive && tracks && <div className="text-[9px] font-bold text-emerald-400 mt-0.5">🎵 Audio Ready</div>}
                      </div>
                      {isActive && <ChevronRight className="w-3.5 h-3.5 text-rose-400 flex-shrink-0" />}
                    </button>
                  );
                })}
              </div>
            </div>
          </aside>

          {/* ════ RIGHT MAIN CONTENT ════ */}
          <div className="flex-1 min-w-0 space-y-3.5">

            {/* Mobile lesson strip */}
            <div className="lg:hidden flex items-center gap-1.5 overflow-x-auto scrollbar-none bg-slate-900/90 border border-slate-800 rounded-xl p-2">
              <span className="text-[10px] font-bold text-slate-400 whitespace-nowrap pl-1">Lesson:</span>
              {availableLessons.map((n) => (
                <button
                  key={n}
                  onClick={() => { setSelectedLesson(n); setSearchQuery(''); setInspectKanji(null); setExpandedGrammar(null); }}
                  className={`px-2.5 py-1 rounded-lg text-[11px] font-bold whitespace-nowrap border transition-all flex-shrink-0 ${
                    selectedLesson === n && !searchQuery ? 'bg-rose-600 border-rose-400 text-white' : 'bg-slate-950 border-slate-800 text-slate-400 hover:text-white'
                  }`}
                >{n}</button>
              ))}
            </div>

            {/* Lesson Header + Audio + Actions */}
            <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-3.5 sm:p-4 shadow-xl">
              <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-3">
                <div>
                  <div className="text-[10px] font-bold uppercase tracking-wider text-rose-400">{LEVEL_LABELS[selectedLevel as 'N5'|'N4'|'N3']}</div>
                  <h2 className="text-sm sm:text-base font-black text-white mt-0.5">
                    {searchQuery ? 'Search Results' : `Lesson ${selectedLesson}: ${LESSON_TOPICS[selectedLesson] || ''}`}
                  </h2>
                </div>
                <div className="flex items-center gap-1.5 flex-wrap sm:flex-nowrap">
                  {selectedLevel === 'N5' && (() => {
                    const tracks = getAudioTracksForLesson(selectedLesson);
                    if (!tracks) return null;
                    const btns: { type: 'vocab' | 'dialogue' | 'drill'; label: string; url: string; icon: React.ReactNode; color: string; activeColor: string }[] = [
                      { type: 'vocab',    label: 'Vocab',    url: tracks.vocab,    icon: <Music className="w-3 h-3" />,     color: 'bg-violet-700/80 hover:bg-violet-600',   activeColor: 'bg-violet-500 ring-1 ring-violet-300' },
                      { type: 'dialogue', label: 'Dialogue', url: tracks.dialogue, icon: <Headphones className="w-3 h-3" />, color: 'bg-emerald-700/80 hover:bg-emerald-600', activeColor: 'bg-emerald-500 ring-1 ring-emerald-300' },
                      { type: 'drill',    label: 'Drills',   url: tracks.drill,    icon: <Mic2 className="w-3 h-3" />,      color: 'bg-sky-700/80 hover:bg-sky-600',         activeColor: 'bg-sky-500 ring-1 ring-sky-300' },
                    ];
                    return (
                      <div className="flex items-center gap-1">
                        {btns.map((btn) => (
                          <button key={btn.type} onClick={() => playLessonTrack(btn.type, btn.url)}
                            className={`flex items-center gap-1 px-2 py-1 rounded-lg text-white text-[11px] font-bold transition-all shadow-sm ${playingTrack === btn.type ? btn.activeColor : btn.color}`}>
                            {playingTrack === btn.type ? <span className="flex gap-0.5 items-center"><span className="w-0.5 h-2.5 bg-white rounded-full animate-bounce" /><span className="w-0.5 h-2.5 bg-white rounded-full animate-bounce" /></span> : btn.icon}
                            <span>{btn.label}</span>
                          </button>
                        ))}
                        {playingTrack && <button onClick={stopAudio} className="p-1 rounded-lg bg-rose-700 hover:bg-rose-600 text-white"><Square className="w-3 h-3 fill-white" /></button>}
                      </div>
                    );
                  })()}
                  {selectedLesson > 25 && (
                    <button onClick={() => setShowScannedSheetModal(true)} className="px-2.5 py-1 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white text-[11px] font-extrabold flex items-center gap-1 shadow-sm transition-all whitespace-nowrap cursor-pointer" title="View scanned Minna no Nihongo textbook image">
                      <span>🖼️ Scanned Book Sheet (Lesson {selectedLesson})</span>
                    </button>
                  )}
                  <button onClick={() => setShowShortNoteModal(true)} className="px-2.5 py-1 rounded-lg bg-blue-600 hover:bg-blue-500 text-white text-[11px] font-extrabold flex items-center gap-1 shadow-sm transition-all whitespace-nowrap cursor-pointer">
                    <FileText className="w-3 h-3" /><span>Meanings</span>
                  </button>
                  <button onClick={() => setShowGrammarModal(true)} className="px-2.5 py-1 rounded-lg bg-amber-600 hover:bg-amber-500 text-white text-[11px] font-extrabold flex items-center gap-1 shadow-sm transition-all whitespace-nowrap cursor-pointer">
                    <BookCheck className="w-3 h-3" /><span>Grammar Guide</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Vocabulary List */}
            <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-3.5 sm:p-4 shadow-2xl space-y-3">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2.5 pb-2.5 border-b border-slate-800">
                <div className="text-xs font-bold text-slate-300">
                  {filteredVocab.length} vocabulary words in {searchQuery ? 'search' : `Lesson ${selectedLesson}`}
                </div>
                <div className="relative w-full sm:w-64">
                  <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-500" />
                  <input
                    type="text"
                    placeholder="Search Kanji / Reading / English / Nepali..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full bg-slate-950/80 border border-slate-800 rounded-xl pl-8 pr-3 py-1.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-rose-500 transition-all"
                  />
                </div>
              </div>
              <div className="space-y-2 max-h-[calc(100vh-280px)] overflow-y-auto pr-1 scrollbar-thin scrollbar-thumb-slate-700 scrollbar-track-transparent">
                {filteredVocab.length === 0 ? (
                  <div className="text-center py-10 text-slate-500 text-xs font-semibold">No matching vocabulary items found for this lesson.</div>
                ) : (
                  filteredVocab.map((vocab) => {
                    const extractedKanji = vocab.kanjiCharacters && vocab.kanjiCharacters.length > 0
                      ? vocab.kanjiCharacters
                      : vocab.word.split('').filter(c => /[\u4e00-\u9faf]/.test(c));
                    return (
                      <div key={vocab.id} className="bg-slate-950/70 hover:bg-slate-800/80 border border-slate-800/80 hover:border-slate-700 rounded-xl p-2.5 sm:p-3 transition-all">
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                          <div className="flex items-center gap-2.5 flex-wrap">
                            <div className="text-lg sm:text-xl font-bold font-jp text-white leading-none">{vocab.word}</div>
                            <span className="text-xs font-bold font-jp text-rose-300">{vocab.reading}</span>
                            <button onClick={() => playPronunciation(vocab.reading)} className="p-1 rounded-md bg-slate-900 hover:bg-rose-600 text-slate-400 hover:text-white transition-all" title="Play pronunciation">
                              <Volume2 className="w-3.5 h-3.5" />
                            </button>
                            {vocab.partOfSpeech && <span className="text-[10px] px-1.5 py-0.5 rounded-md bg-rose-500/15 border border-rose-500/30 text-rose-300 font-semibold">{vocab.partOfSpeech}</span>}
                            {extractedKanji.length > 0 && (
                              <div className="flex items-center gap-1">
                                {extractedKanji.map((kChar, kIdx) => (
                                  <button key={kIdx} onClick={() => setInspectKanji(kChar)} className="px-1.5 py-0.5 rounded bg-amber-500/20 hover:bg-amber-500 text-amber-300 hover:text-slate-950 border border-amber-500/30 text-xs font-jp font-bold transition-all flex items-center gap-0.5 cursor-pointer" title={`Inspect Kanji ${kChar}`}>
                                    <span>{kChar}</span><Layers className="w-2.5 h-2.5" />
                                  </button>
                                ))}
                              </div>
                            )}
                          </div>
                          <div className="flex items-center gap-2 text-xs flex-wrap sm:flex-nowrap">
                            <span className="font-semibold text-slate-200">🇬🇧 {vocab.meaning}</span>
                            <span className="text-slate-700 hidden sm:inline">•</span>
                            <span className="font-semibold text-amber-400">🇳🇵 {vocab.meaningNepali}</span>
                          </div>
                        </div>
                        {vocab.grammarSentences && vocab.grammarSentences.length > 0 && (
                          <div className="mt-2 pt-2 border-t border-slate-800/80">
                            <button onClick={() => setExpandedGrammar(expandedGrammar === vocab.id ? null : vocab.id)} className="flex items-center gap-1 text-[11px] text-rose-400 hover:text-rose-300 font-semibold transition-colors">
                              <MessageSquare className="w-3 h-3" />
                              <span>{expandedGrammar === vocab.id ? 'Hide sentence' : 'Show example sentence'}</span>
                              <ChevronDown className={`w-3 h-3 transition-transform ${expandedGrammar === vocab.id ? 'rotate-180' : ''}`} />
                            </button>
                            {expandedGrammar === vocab.id && vocab.grammarSentences.map((gs, idx) => (
                              <div key={idx} className="mt-1.5 p-2 rounded-lg bg-slate-900/90 border border-rose-900/40 space-y-1 text-xs">
                                <div className="flex items-center justify-between gap-2">
                                  <div className="font-jp font-bold text-white">{gs.japanese}</div>
                                  <button onClick={() => playPronunciation(gs.japanese)} className="p-1 rounded bg-slate-800 hover:bg-rose-600 text-slate-400 hover:text-white"><Volume2 className="w-3 h-3" /></button>
                                </div>
                                <div className="text-slate-300 text-[11px]">🇬🇧 {gs.english}</div>
                                <div className="text-amber-400 text-[11px]">🇳🇵 {gs.nepali}</div>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    );
                  })
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ── GRAMMAR GUIDE MODAL ── */}
      {showGrammarModal && grammarGuide && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/85 backdrop-blur-md animate-fade-in">
          <div className="w-[96vw] sm:w-full max-w-3xl bg-slate-900 border border-slate-800 rounded-3xl p-4 sm:p-6 shadow-2xl space-y-4 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <div className="flex items-center gap-2">
                <div className="p-2 rounded-xl bg-amber-500/20 text-amber-400 border border-amber-500/30"><BookCheck className="w-5 h-5" /></div>
                <div>
                  <div className="text-xs font-bold uppercase tracking-wider text-amber-400">JLPT {selectedLevel} • Lesson {selectedLesson} Grammar Guide</div>
                  <h3 className="text-base sm:text-lg font-black text-white">{grammarGuide.lessonTitle}</h3>
                </div>
              </div>
              <button onClick={() => setShowGrammarModal(false)} className="p-2 rounded-xl bg-slate-800 hover:bg-rose-600 text-slate-400 hover:text-white transition-all border border-slate-700"><X className="w-4 h-4" /></button>
            </div>
            <div className="space-y-4">
              {grammarGuide.grammarPoints.map((pt, pIdx) => (
                <div key={pIdx} className="bg-slate-950/80 border border-slate-800 rounded-2xl p-4 space-y-3">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800/80 pb-2">
                    <span className="text-xs font-black text-amber-400 bg-amber-500/10 px-2.5 py-1 rounded-lg border border-amber-500/20">Rule {pIdx + 1}: {pt.title}</span>
                    <span className="text-xs font-jp font-bold text-rose-300 bg-rose-500/10 px-2 py-0.5 rounded border border-rose-500/20">{pt.pattern}</span>
                  </div>
                  <p className="text-xs text-slate-300 leading-relaxed">🇬🇧 {pt.explanationEnglish}</p>
                  <p className="text-xs font-bold text-amber-300">🇳🇵 {pt.explanationNepali}</p>
                  <div className="space-y-2 pt-1">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Example Sentences:</span>
                    {pt.examples.map((ex, eIdx) => (
                      <div key={eIdx} className="p-2.5 rounded-xl bg-slate-900 border border-slate-800 space-y-1 text-xs">
                        <div className="flex items-center justify-between gap-2">
                          <span className="font-jp font-bold text-white text-sm">{ex.target}</span>
                          <button onClick={() => playPronunciation(ex.target)} className="p-1 rounded bg-slate-800 hover:bg-rose-600 text-slate-400 hover:text-white"><Volume2 className="w-3 h-3" /></button>
                        </div>
                        {ex.reading && <div className="text-slate-400 text-[11px] italic font-jp">{ex.reading}</div>}
                        <div className="text-slate-200">🇬🇧 {ex.english}</div>
                        <div className="text-amber-400 font-semibold">🇳🇵 {ex.nepali}</div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ── VOCAB SHORT NOTE MODAL ── */}
      {showShortNoteModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/85 backdrop-blur-md animate-fade-in">
          <div className="w-[96vw] sm:w-full max-w-4xl bg-slate-900 border border-slate-800 rounded-3xl p-4 sm:p-6 shadow-2xl space-y-4 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800 print:hidden">
              <div className="flex items-center gap-2">
                <div className="p-2 rounded-xl bg-blue-500/20 text-blue-400 border border-blue-500/30"><FileText className="w-5 h-5" /></div>
                <div>
                  <div className="text-xs font-bold uppercase tracking-wider text-blue-400">JLPT {selectedLevel} • Lesson {selectedLesson} Vocabulary Sheet</div>
                  <h3 className="text-base sm:text-lg font-black text-white">Vocabulary Quick Note (शब्दावली तालिका)</h3>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <button onClick={() => window.print()} className="px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white text-xs font-bold flex items-center gap-1.5 border border-slate-700 transition-all"><Printer className="w-3.5 h-3.5" /><span>Print Sheet</span></button>
                <button onClick={() => setShowShortNoteModal(false)} className="p-2 rounded-xl bg-slate-800 hover:bg-rose-600 text-slate-400 hover:text-white transition-all border border-slate-700"><X className="w-4 h-4" /></button>
              </div>
            </div>
            {/* Language View Switcher */}
            <div className="flex flex-wrap items-center justify-between gap-2 bg-slate-950 p-2.5 rounded-2xl border border-slate-800 text-xs print:hidden">
              <div className="flex items-center gap-1.5 text-slate-400 font-bold text-[11px] sm:text-xs">
                <span>View Language:</span>
                <span className="text-[10px] font-medium text-slate-500 hidden sm:inline">(Toggle or slide right to view translations)</span>
              </div>
              <div className="flex items-center gap-1 bg-slate-900 p-1 rounded-xl border border-slate-800">
                <button
                  onClick={() => setModalLangMode('en')}
                  className={`px-2.5 py-1 rounded-lg font-bold transition-all text-xs cursor-pointer ${modalLangMode === 'en' ? 'bg-blue-600 text-white shadow-sm' : 'text-slate-400 hover:text-white'}`}
                >
                  🇬🇧 English
                </button>
                <button
                  onClick={() => setModalLangMode('np')}
                  className={`px-2.5 py-1 rounded-lg font-bold transition-all text-xs cursor-pointer ${modalLangMode === 'np' ? 'bg-amber-600 text-white shadow-sm' : 'text-slate-400 hover:text-white'}`}
                >
                  🇳🇵 नेपाली
                </button>
                <button
                  onClick={() => setModalLangMode('both')}
                  className={`px-2.5 py-1 rounded-lg font-bold transition-all text-xs cursor-pointer ${modalLangMode === 'both' ? 'bg-emerald-600 text-white shadow-sm' : 'text-slate-400 hover:text-white'}`}
                >
                  🌐 Both
                </button>
              </div>
            </div>

            <div className="overflow-x-auto rounded-2xl border border-slate-800">
              <table className={`w-full text-left text-xs border-collapse ${modalLangMode === 'both' ? 'min-w-[540px]' : ''}`}>
                <thead>
                  <tr className="bg-slate-950 text-slate-400 border-b border-slate-800 font-bold uppercase text-[10px]">
                    <th className="py-2.5 px-2 sm:px-3.5 border-r border-slate-800 whitespace-nowrap text-center">No.</th>
                    <th className="py-2.5 px-2.5 sm:px-3.5 border-r border-slate-800 whitespace-nowrap">Kanji (अक्षर)</th>
                    <th className="py-2.5 px-2.5 sm:px-3.5 border-r border-slate-800 whitespace-nowrap">Reading (उच्चारण)</th>
                    {(modalLangMode === 'en' || modalLangMode === 'both') && (
                      <th className="py-2.5 px-2.5 sm:px-3.5 border-r border-slate-800 whitespace-nowrap">English (अंग्रेजी)</th>
                    )}
                    {(modalLangMode === 'np' || modalLangMode === 'both') && (
                      <th className="py-2.5 px-2.5 sm:px-3.5 whitespace-nowrap">Nepali (नेपाली)</th>
                    )}
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/80 bg-slate-900/60">
                  {lessonVocab.map((v, i) => (
                    <tr key={v.id} onClick={() => playPronunciation(v.reading)} className="hover:bg-slate-800/60 cursor-pointer transition-colors">
                      <td className="py-2 px-1.5 sm:py-2.5 sm:px-3.5 font-bold text-slate-500 border-r border-slate-800/40 text-center text-xs sm:text-sm">{i + 1}</td>
                      <td className="py-2 px-2 sm:py-2.5 sm:px-3.5 font-jp font-bold text-sm sm:text-lg text-white border-r border-slate-800/40 whitespace-nowrap">
                        {/[\u4e00-\u9faf]/.test(v.word) ? v.word : '—'}
                      </td>
                      <td className="py-2 px-2 sm:py-2.5 sm:px-3.5 font-jp text-xs sm:text-base text-rose-300 font-bold border-r border-slate-800/40 whitespace-nowrap">{v.reading}</td>
                      {(modalLangMode === 'en' || modalLangMode === 'both') && (
                        <td className="py-2 px-2 sm:py-2.5 sm:px-3.5 text-slate-200 font-medium border-r border-slate-800/40 text-xs sm:text-sm">{v.meaning}</td>
                      )}
                      {(modalLangMode === 'np' || modalLangMode === 'both') && (
                        <td className="py-2 px-2 sm:py-2.5 sm:px-3.5 text-amber-300 font-semibold text-xs sm:text-sm">{v.meaningNepali}</td>
                      )}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* ── KANJI INSPECTOR MODAL ── */}
      {inspectKanjiObj && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md">
          <div className="w-full max-w-md bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-2xl space-y-4 text-left">
            <div className="flex items-center justify-between pb-2 border-b border-slate-800">
              <div className="flex items-center gap-2"><Layers className="w-4 h-4 text-amber-400" /><span className="text-xs font-bold uppercase tracking-wider text-amber-400">Kanji Details</span></div>
              <button onClick={() => setInspectKanji(null)} className="p-1.5 rounded-xl bg-slate-800 text-slate-400 hover:text-white"><X className="w-4 h-4" /></button>
            </div>
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-2xl bg-slate-950 border border-amber-500/40 flex items-center justify-center text-4xl font-jp font-black text-amber-300 shadow-inner flex-shrink-0">{inspectKanjiObj.character}</div>
              <div>
                <div className="text-base font-extrabold text-white">{inspectKanjiObj.meanings.join(', ')}</div>
                <div className="text-xs font-bold text-amber-400">🇳🇵 {inspectKanjiObj.meaningsNepali?.join(', ')}</div>
                <div className="text-[11px] text-slate-400 mt-0.5">Strokes: {inspectKanjiObj.strokeCount}</div>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-2 bg-slate-950 p-2.5 rounded-xl border border-slate-800 text-xs">
              <div><span className="text-[10px] font-bold uppercase text-rose-400 block">Onyomi</span><span className="font-bold text-slate-200">{inspectKanjiObj.readingsOnyomi.join(', ')}</span></div>
              <div><span className="text-[10px] font-bold uppercase text-emerald-400 block">Kunyomi</span><span className="font-bold text-slate-200">{inspectKanjiObj.readingsKunyomi.join(', ')}</span></div>
            </div>
          </div>
        </div>
      )}
    
      {/* SCANNED TEXTBOOK VOCABULARY SHEET MODAL (N4 & N3 ONLY) */}
      {showScannedSheetModal && selectedLesson > 25 && (
        <div className="fixed inset-0 z-50 bg-slate-950/90 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 animate-fade-in">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-4 sm:p-6 max-w-4xl w-full max-h-[92vh] flex flex-col justify-between shadow-2xl space-y-4">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-2xl bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 text-xl font-bold">
                  📖
                </div>
                <div>
                  <h3 className="text-base sm:text-lg font-black text-white">
                    Minna no Nihongo II — Lesson {selectedLesson} Original Textbook Vocabulary Sheet
                  </h3>
                  <p className="text-xs text-slate-400">
                    High-resolution original textbook scan (`/N4-26-50-vocab/lesson{selectedLesson}.jpg`)
                  </p>
                </div>
              </div>
              <button
                onClick={() => setShowScannedSheetModal(false)}
                className="p-2 rounded-xl bg-slate-800 hover:bg-rose-900/40 text-slate-400 hover:text-white transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="overflow-y-auto max-h-[75vh] flex justify-center bg-slate-950 p-2 rounded-2xl border border-slate-800">
              <img
                src={`/N4-26-50-vocab/lesson${selectedLesson <= 50 ? selectedLesson : 26}.jpg`}
                alt={`Minna no Nihongo Lesson ${selectedLesson} Original Vocabulary`}
                className="max-w-full h-auto rounded-xl object-contain shadow-lg"
                onError={(e) => {
                  (e.target as HTMLElement).style.display = 'none';
                }}
              />
            </div>

            <div className="flex items-center justify-between pt-2 border-t border-slate-800 text-xs text-slate-400">
              <span>Lesson {selectedLesson}: {LESSON_TOPICS[selectedLesson] || 'Vocabulary'}</span>
              <button
                onClick={() => setShowScannedSheetModal(false)}
                className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs transition-colors cursor-pointer"
              >
                Close Textbook Sheet
              </button>
            </div>
          </div>
        </div>
      )}
</div>
  );
};
