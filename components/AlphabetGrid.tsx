'use client';

import React, { useState, useRef, useEffect } from 'react';
import {
  Volume2, Headphones, Search, Sparkles, BookOpen, Music,
  Play, Pause, SkipBack, SkipForward, Repeat, Layers, CheckCircle2,
  Mic2, Radio, ListMusic, Globe
} from 'lucide-react';
import { N5_AUDIO_TRACKS, N5_REVIEW_TRACKS, LessonAudioTracks } from '@/lib/n5-audio-tracks';

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
  // W-line & N
  { char: 'わ', romaji: 'wa', nepaliHint: 'वा', category: 'consonant' },
  { char: 'を', romaji: 'wo', nepaliHint: 'वो', category: 'consonant' },
  { char: 'ん', romaji: 'n', nepaliHint: 'न्', category: 'consonant' },
];

// ─── JAPANESE KATAKANA ───
const KATAKANA_DATA: Syllable[] = [
  { char: 'ア', romaji: 'a', nepaliHint: 'आ', category: 'vowel' },
  { char: 'イ', romaji: 'i', nepaliHint: 'इ', category: 'vowel' },
  { char: 'ウ', romaji: 'u', nepaliHint: 'उ', category: 'vowel' },
  { char: 'エ', romaji: 'e', nepaliHint: 'ए', category: 'vowel' },
  { char: 'オ', romaji: 'o', nepaliHint: 'ओ', category: 'vowel' },
  { char: 'カ', romaji: 'ka', nepaliHint: 'का', category: 'consonant' },
  { char: 'キ', romaji: 'ki', nepaliHint: 'कि', category: 'consonant' },
  { char: 'ク', romaji: 'ku', nepaliHint: 'कु', category: 'consonant' },
  { char: 'ケ', romaji: 'ke', nepaliHint: 'के', category: 'consonant' },
  { char: 'コ', romaji: 'ko', nepaliHint: 'को', category: 'consonant' },
  { char: 'サ', romaji: 'sa', nepaliHint: 'सा', category: 'consonant' },
  { char: 'シ', romaji: 'shi', nepaliHint: 'शि', category: 'consonant' },
  { char: 'ス', romaji: 'su', nepaliHint: 'सु', category: 'consonant' },
  { char: 'セ', romaji: 'se', nepaliHint: 'से', category: 'consonant' },
  { char: 'ソ', romaji: 'so', nepaliHint: 'सो', category: 'consonant' },
  { char: 'タ', romaji: 'ta', nepaliHint: 'ता', category: 'consonant' },
  { char: 'チ', romaji: 'chi', nepaliHint: 'चि', category: 'consonant' },
  { char: 'ツ', romaji: 'tsu', nepaliHint: 'त्सु', category: 'consonant' },
  { char: 'テ', romaji: 'te', nepaliHint: 'ते', category: 'consonant' },
  { char: 'ト', romaji: 'to', nepaliHint: 'तो', category: 'consonant' },
  { char: 'ナ', romaji: 'na', nepaliHint: 'ना', category: 'consonant' },
  { char: 'ニ', romaji: 'ni', nepaliHint: 'नि', category: 'consonant' },
  { char: 'ヌ', romaji: 'nu', nepaliHint: 'नु', category: 'consonant' },
  { char: 'ネ', romaji: 'ne', nepaliHint: 'ने', category: 'consonant' },
  { char: 'ノ', romaji: 'no', nepaliHint: 'नो', category: 'consonant' },
  { char: 'ハ', romaji: 'ha', nepaliHint: 'हा', category: 'consonant' },
  { char: 'ヒ', romaji: 'hi', nepaliHint: 'हि', category: 'consonant' },
  { char: 'フ', romaji: 'fu', nepaliHint: 'फु', category: 'consonant' },
  { char: 'ヘ', romaji: 'he', nepaliHint: 'हे', category: 'consonant' },
  { char: 'ホ', romaji: 'ho', nepaliHint: 'हो', category: 'consonant' },
  { char: 'マ', romaji: 'ma', nepaliHint: 'मा', category: 'consonant' },
  { char: 'ミ', romaji: 'mi', nepaliHint: 'मि', category: 'consonant' },
  { char: 'ム', romaji: 'mu', nepaliHint: 'मु', category: 'consonant' },
  { char: 'メ', romaji: 'me', nepaliHint: 'मे', category: 'consonant' },
  { char: 'モ', romaji: 'mo', nepaliHint: 'मो', category: 'consonant' },
  { char: 'ヤ', romaji: 'ya', nepaliHint: 'या', category: 'consonant' },
  { char: 'ユ', romaji: 'yu', nepaliHint: 'यु', category: 'consonant' },
  { char: 'ヨ', romaji: 'yo', nepaliHint: 'यो', category: 'consonant' },
  { char: 'ラ', romaji: 'ra', nepaliHint: 'रा', category: 'consonant' },
  { char: 'リ', romaji: 'ri', nepaliHint: 'रि', category: 'consonant' },
  { char: 'ル', romaji: 'ru', nepaliHint: 'रु', category: 'consonant' },
  { char: 'レ', romaji: 're', nepaliHint: 'रे', category: 'consonant' },
  { char: 'ロ', romaji: 'ro', nepaliHint: 'रो', category: 'consonant' },
  { char: 'ワ', romaji: 'wa', nepaliHint: 'वा', category: 'consonant' },
  { char: 'ヲ', romaji: 'wo', nepaliHint: 'वो', category: 'consonant' },
  { char: 'ン', romaji: 'n', nepaliHint: 'न्', category: 'consonant' },
];

// ─── KOREAN HANGUL ───
const KOREAN_DATA: Syllable[] = [
  // Basic Consonants (자음)
  { char: 'ㄱ', romaji: 'g / k', nepaliHint: 'ग / क', category: 'consonant' },
  { char: 'ㄴ', romaji: 'n', nepaliHint: 'न', category: 'consonant' },
  { char: 'ㄷ', romaji: 'd / t', nepaliHint: 'द / त', category: 'consonant' },
  { char: 'ㄹ', romaji: 'r / l', nepaliHint: 'र / ल', category: 'consonant' },
  { char: 'ㅁ', romaji: 'm', nepaliHint: 'म', category: 'consonant' },
  { char: 'ㅂ', romaji: 'b / p', nepaliHint: 'ब / प', category: 'consonant' },
  { char: 'ㅅ', romaji: 's', nepaliHint: 'स', category: 'consonant' },
  { char: 'ㅇ', romaji: 'ng / silent', nepaliHint: 'अ / ङ', category: 'consonant' },
  { char: 'ㅈ', romaji: 'j / ch', nepaliHint: 'ज / च', category: 'consonant' },
  { char: 'ㅊ', romaji: 'ch', nepaliHint: 'छ', category: 'consonant' },
  { char: 'ㅋ', romaji: 'k', nepaliHint: 'ख', category: 'consonant' },
  { char: 'ㅌ', romaji: 't', nepaliHint: 'थ', category: 'consonant' },
  { char: 'ㅍ', romaji: 'p', nepaliHint: 'फ', category: 'consonant' },
  { char: 'ㅎ', romaji: 'h', nepaliHint: 'ह', category: 'consonant' },

  // Basic Vowels (모음)
  { char: 'ㅏ', romaji: 'a', nepaliHint: 'आ', category: 'vowel' },
  { char: 'ㅑ', romaji: 'ya', nepaliHint: 'या', category: 'vowel' },
  { char: 'ㅓ', romaji: 'eo', nepaliHint: 'अ', category: 'vowel' },
  { char: 'ㅕ', romaji: 'yeo', nepaliHint: 'य', category: 'vowel' },
  { char: 'ㅗ', romaji: 'o', nepaliHint: 'ओ', category: 'vowel' },
  { char: 'ㅛ', romaji: 'yo', nepaliHint: 'यो', category: 'vowel' },
  { char: 'ㅜ', romaji: 'u', nepaliHint: 'ऊ', category: 'vowel' },
  { char: 'ㅠ', romaji: 'yu', nepaliHint: 'यू', category: 'vowel' },
  { char: 'ㅡ', romaji: 'eu', nepaliHint: 'उ (ओठ नगोलाइकन)', category: 'vowel' },
  { char: 'ㅣ', romaji: 'i', nepaliHint: 'ई', category: 'vowel' },

  // Double Consonants (쌍자음)
  { char: 'ㄲ', romaji: 'kk', nepaliHint: 'क (कडा)', category: 'double' },
  { char: 'ㄸ', romaji: 'tt', nepaliHint: 'त (कडा)', category: 'double' },
  { char: 'ㅃ', romaji: 'pp', nepaliHint: 'प (कडा)', category: 'double' },
  { char: 'ㅆ', romaji: 'ss', nepaliHint: 'स (कडा)', category: 'double' },
  { char: 'ㅉ', romaji: 'jj', nepaliHint: 'च (कडा)', category: 'double' },

  // Compound Vowels (이중모음)
  { char: 'ㅐ', romaji: 'ae', nepaliHint: 'ए', category: 'compound' },
  { char: 'ㅒ', romaji: 'yae', nepaliHint: 'ये', category: 'compound' },
  { char: 'ㅔ', romaji: 'e', nepaliHint: 'ए', category: 'compound' },
  { char: 'ㅖ', romaji: 'ye', nepaliHint: 'ये', category: 'compound' },
  { char: 'ㅘ', romaji: 'wa', nepaliHint: 'वा', category: 'compound' },
  { char: 'ㅙ', romaji: 'wae', nepaliHint: 'वे', category: 'compound' },
  { char: 'ㅚ', romaji: 'oe', nepaliHint: 'वे', category: 'compound' },
  { char: 'ㅝ', romaji: 'wo', nepaliHint: 'व', category: 'compound' },
  { char: 'ㅞ', romaji: 'we', nepaliHint: 'वे', category: 'compound' },
  { char: 'ㅟ', romaji: 'wi', nepaliHint: 'वि', category: 'compound' },
  { char: 'ㅢ', romaji: 'ui', nepaliHint: 'उइ', category: 'compound' },
];

interface FlatTrackItem {
  id: string;
  lessonNumber: number;
  lessonTitle: string;
  trackType: 'vocab' | 'dialogue' | 'drill' | 'review';
  typeLabel: string;
  japaneseLabel: string;
  url: string;
}

// Build serial list of all 75+ N5 audio tracks
const ALL_SERIAL_N5_TRACKS: FlatTrackItem[] = [];

N5_AUDIO_TRACKS.forEach((l) => {
  ALL_SERIAL_N5_TRACKS.push({
    id: `l${l.lesson}_vocab`,
    lessonNumber: l.lesson,
    lessonTitle: l.lessonTitle,
    trackType: 'vocab',
    typeLabel: 'Vocab (単語)',
    japaneseLabel: `Lesson ${l.lesson} • Vocab Audio`,
    url: l.vocab,
  });
  ALL_SERIAL_N5_TRACKS.push({
    id: `l${l.lesson}_dialogue`,
    lessonNumber: l.lesson,
    lessonTitle: l.lessonTitle,
    trackType: 'dialogue',
    typeLabel: 'Dialogue (会話)',
    japaneseLabel: `Lesson ${l.lesson} • Main Conversation`,
    url: l.dialogue,
  });
  ALL_SERIAL_N5_TRACKS.push({
    id: `l${l.lesson}_drill`,
    lessonNumber: l.lesson,
    lessonTitle: l.lessonTitle,
    trackType: 'drill',
    typeLabel: 'Practice (練習)',
    japaneseLabel: `Lesson ${l.lesson} • Drills & Exercises`,
    url: l.drill,
  });
});

N5_REVIEW_TRACKS.forEach((r, idx) => {
  ALL_SERIAL_N5_TRACKS.push({
    id: `review_${idx}`,
    lessonNumber: 99,
    lessonTitle: r.label,
    trackType: 'review',
    typeLabel: 'Review (まとめ)',
    japaneseLabel: r.label,
    url: r.track,
  });
});

interface AlphabetGridProps {
  activeLanguage: 'JAPANESE' | 'KOREAN';
}

export const AlphabetGrid: React.FC<AlphabetGridProps> = ({ activeLanguage }) => {
  const [jpSubTab, setJpSubTab] = useState<'HIRAGANA' | 'KATAKANA' | 'CHAPTER_AUDIO'>('CHAPTER_AUDIO');
  const [krSubTab, setKrSubTab] = useState<'CONSONANTS' | 'VOWELS' | 'DOUBLE_CONSONANTS' | 'COMPOUND_VOWELS'>('CONSONANTS');
  const [searchQuery, setSearchQuery] = useState('');
  const [activeChar, setActiveChar] = useState<string | null>(null);

  // Serial Audio Player State
  const [currentTrackIndex, setCurrentTrackIndex] = useState<number>(0);
  const [isPlayingTrack, setIsPlayingTrack] = useState<boolean>(false);
  const [autoAdvance, setAutoAdvance] = useState<boolean>(true);
  const [trackFilter, setTrackFilter] = useState<'ALL' | 'VOCAB' | 'DIALOGUE' | 'DRILL' | 'REVIEW'>('ALL');
  const [lessonFilter, setLessonFilter] = useState<number | 'ALL'>('ALL');

  const [currentTime, setCurrentTime] = useState<number>(0);
  const [duration, setDuration] = useState<number>(0);

  const audioRef = useRef<HTMLAudioElement | null>(null);

  // Filter serial tracks
  const displayedTracks = ALL_SERIAL_N5_TRACKS.filter((t) => {
    if (trackFilter === 'VOCAB' && t.trackType !== 'vocab') return false;
    if (trackFilter === 'DIALOGUE' && t.trackType !== 'dialogue') return false;
    if (trackFilter === 'DRILL' && t.trackType !== 'drill') return false;
    if (trackFilter === 'REVIEW' && t.trackType !== 'review') return false;
    if (lessonFilter !== 'ALL' && t.lessonNumber !== lessonFilter && t.lessonNumber !== 99) return false;
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      return (
        t.lessonTitle.toLowerCase().includes(q) ||
        t.japaneseLabel.toLowerCase().includes(q) ||
        `lesson ${t.lessonNumber}`.includes(q)
      );
    }
    return true;
  });

  const activeTrackObj = displayedTracks[currentTrackIndex] || displayedTracks[0];

  const playTrackAtIndex = (index: number) => {
    if (index < 0 || index >= displayedTracks.length) return;
    setCurrentTrackIndex(index);
    const targetTrack = displayedTracks[index];

    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.src = targetTrack.url;
      audioRef.current.currentTime = 0;
      audioRef.current
        .play()
        .then(() => setIsPlayingTrack(true))
        .catch(() => {
          // Fallback speech synthesis if audio file missing
          if ('speechSynthesis' in window) {
            const utt = new SpeechSynthesisUtterance(targetTrack.japaneseLabel);
            utt.lang = 'ja-JP';
            window.speechSynthesis.speak(utt);
          }
          setIsPlayingTrack(false);
        });
    }
  };

  const togglePlayPause = () => {
    if (!audioRef.current || !activeTrackObj) return;
    if (isPlayingTrack) {
      audioRef.current.pause();
      setIsPlayingTrack(false);
    } else {
      if (!audioRef.current.src || audioRef.current.src === '' || !audioRef.current.src.endsWith(activeTrackObj.url)) {
        audioRef.current.src = activeTrackObj.url;
      }
      audioRef.current
        .play()
        .then(() => setIsPlayingTrack(true))
        .catch(() => setIsPlayingTrack(false));
    }
  };

  const handleTrackEnded = () => {
    setIsPlayingTrack(false);
    if (autoAdvance) {
      const nextIdx = (currentTrackIndex + 1) % displayedTracks.length;
      playTrackAtIndex(nextIdx);
    }
  };

  const playSound = (text: string) => {
    setActiveChar(text);
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = activeLanguage === 'JAPANESE' ? 'ja-JP' : 'ko-KR';
      utterance.rate = 0.9;
      window.speechSynthesis.speak(utterance);
    }
    setTimeout(() => setActiveChar(null), 800);
  };

  // Determine current dataset for Kana / Hangul
  let currentDataset: Syllable[] = [];
  if (activeLanguage === 'JAPANESE') {
    if (jpSubTab === 'HIRAGANA') currentDataset = HIRAGANA_DATA;
    if (jpSubTab === 'KATAKANA') currentDataset = KATAKANA_DATA;
  } else {
    if (krSubTab === 'CONSONANTS') currentDataset = KOREAN_DATA.filter((s) => s.category === 'consonant');
    if (krSubTab === 'VOWELS') currentDataset = KOREAN_DATA.filter((s) => s.category === 'vowel');
    if (krSubTab === 'DOUBLE_CONSONANTS') currentDataset = KOREAN_DATA.filter((s) => s.category === 'double');
    if (krSubTab === 'COMPOUND_VOWELS') currentDataset = KOREAN_DATA.filter((s) => s.category === 'compound');
  }

  const filteredData = currentDataset.filter(
    (item) =>
      item.char.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.romaji.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.nepaliHint.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const formatTime = (secs: number) => {
    if (isNaN(secs)) return '00:00';
    const m = Math.floor(secs / 60);
    const s = Math.floor(secs % 60);
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  return (
    <div className="w-full max-w-7xl mx-auto space-y-5 font-sans">
      <audio
        ref={audioRef}
        onTimeUpdate={() => {
          if (audioRef.current) {
            setCurrentTime(audioRef.current.currentTime);
            setDuration(audioRef.current.duration || 0);
          }
        }}
        onEnded={handleTrackEnded}
      />

      {/* Header Banner */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-3xl p-5 sm:p-6 shadow-2xl space-y-3">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-sky-600 via-indigo-600 to-purple-600 flex items-center justify-center text-white shadow-glow">
              <Headphones className="w-6 h-6" />
            </div>
            <div>
              <div className="text-xs font-bold uppercase tracking-wider text-sky-400">
                {activeLanguage === 'JAPANESE' ? 'Japanese Listening & Pronunciation Hub' : 'Korean Audio & Pronunciation Hub'}
              </div>
              <h2 className="text-lg sm:text-xl font-black text-white mt-0.5">
                {activeLanguage === 'JAPANESE'
                  ? 'Lessons 1–25 Serial Audio & Kana Audio Matrix'
                  : 'EPS-TOPIK Lessons 1–60 Audio & Hangul Matrix'}
              </h2>
            </div>
          </div>

          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-sky-500/10 border border-sky-500/30 text-sky-300 text-xs font-extrabold">
            <Sparkles className="w-4 h-4 text-amber-400" />
            <span>Continuous Playback • High Quality Audio</span>
          </div>
        </div>
      </div>

      {/* ── Sub-tab Switcher Bar ── */}
      <div className="flex items-center gap-1.5 p-1.5 bg-slate-900/80 border border-slate-800 rounded-2xl overflow-x-auto scrollbar-none">
        {activeLanguage === 'JAPANESE' ? (
          <>
            <button
              onClick={() => setJpSubTab('CHAPTER_AUDIO')}
              className={`px-4 py-2 rounded-xl text-xs font-extrabold transition-all flex items-center gap-2 whitespace-nowrap ${
                jpSubTab === 'CHAPTER_AUDIO'
                  ? 'bg-gradient-to-r from-sky-600 to-indigo-600 text-white shadow-glow'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <Radio className="w-4 h-4 text-amber-400 animate-pulse" />
              <span>🎵 All Chapter Audio Tracks (Lessons 1–25)</span>
            </button>
            <button
              onClick={() => setJpSubTab('HIRAGANA')}
              className={`px-4 py-2 rounded-xl text-xs font-extrabold transition-all flex items-center gap-2 whitespace-nowrap ${
                jpSubTab === 'HIRAGANA' ? 'bg-rose-600 text-white shadow-glow' : 'text-slate-400 hover:text-white'
              }`}
            >
              <span>Hiragana Grid (ひらがな)</span>
            </button>
            <button
              onClick={() => setJpSubTab('KATAKANA')}
              className={`px-4 py-2 rounded-xl text-xs font-extrabold transition-all flex items-center gap-2 whitespace-nowrap ${
                jpSubTab === 'KATAKANA' ? 'bg-rose-600 text-white shadow-glow' : 'text-slate-400 hover:text-white'
              }`}
            >
              <span>Katakana Grid (カタカナ)</span>
            </button>
          </>
        ) : (
          <>
            <button
              onClick={() => setKrSubTab('CONSONANTS')}
              className={`px-4 py-2 rounded-xl text-xs font-extrabold transition-all ${
                krSubTab === 'CONSONANTS' ? 'bg-emerald-600 text-white shadow-glow' : 'text-slate-400 hover:text-white'
              }`}
            >
              Consonants (14)
            </button>
            <button
              onClick={() => setKrSubTab('VOWELS')}
              className={`px-4 py-2 rounded-xl text-xs font-extrabold transition-all ${
                krSubTab === 'VOWELS' ? 'bg-emerald-600 text-white shadow-glow' : 'text-slate-400 hover:text-white'
              }`}
            >
              Vowels (10)
            </button>
            <button
              onClick={() => setKrSubTab('DOUBLE_CONSONANTS')}
              className={`px-4 py-2 rounded-xl text-xs font-extrabold transition-all ${
                krSubTab === 'DOUBLE_CONSONANTS' ? 'bg-indigo-600 text-white shadow-glow' : 'text-slate-400 hover:text-white'
              }`}
            >
              Double (5)
            </button>
            <button
              onClick={() => setKrSubTab('COMPOUND_VOWELS')}
              className={`px-4 py-2 rounded-xl text-xs font-extrabold transition-all ${
                krSubTab === 'COMPOUND_VOWELS' ? 'bg-indigo-600 text-white shadow-glow' : 'text-slate-400 hover:text-white'
              }`}
            >
              Compound Vowels (11)
            </button>
          </>
        )}
      </div>

      {/* ─────────────────────────────────────────────────────────────
         1. CHAPTER AUDIO TRACKS PLAYER (SERIAL CONTINUOUS PLAYER)
      ───────────────────────────────────────────────────────────── */}
      {activeLanguage === 'JAPANESE' && jpSubTab === 'CHAPTER_AUDIO' && (
        <div className="space-y-4 animate-fade-in">
          
          {/* Active Sticky Player Control Dock */}
          {activeTrackObj && (
            <div className="bg-gradient-to-r from-slate-900 via-slate-950 to-slate-900 border border-slate-800 rounded-3xl p-4 sm:p-5 shadow-2xl space-y-3">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-2xl bg-indigo-600/30 border border-indigo-500/40 flex items-center justify-center text-indigo-300 flex-shrink-0">
                    {isPlayingTrack ? (
                      <span className="flex gap-1 items-end h-5">
                        <span className="w-1 h-5 bg-indigo-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                        <span className="w-1 h-3 bg-rose-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                        <span className="w-1 h-5 bg-emerald-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                      </span>
                    ) : (
                      <Music className="w-6 h-6" />
                    )}
                  </div>

                  <div className="min-w-0">
                    <div className="text-[10px] font-extrabold uppercase tracking-wider text-amber-400">
                      Now Playing • Track #{currentTrackIndex + 1} of {displayedTracks.length}
                    </div>
                    <h3 className="text-base sm:text-lg font-black text-white truncate">
                      {activeTrackObj.japaneseLabel}
                    </h3>
                    <p className="text-xs text-slate-400 truncate">
                      {activeTrackObj.lessonNumber !== 99 ? `Lesson ${activeTrackObj.lessonNumber}: ${activeTrackObj.lessonTitle}` : 'Summary Review Section'}
                    </p>
                  </div>
                </div>

                {/* Player Playback Controls */}
                <div className="flex items-center gap-2 self-center">
                  <button
                    onClick={() => playTrackAtIndex(Math.max(0, currentTrackIndex - 1))}
                    disabled={currentTrackIndex === 0}
                    className="p-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 disabled:opacity-40 text-white transition-all border border-slate-700"
                    title="Previous Track"
                  >
                    <SkipBack className="w-4 h-4" />
                  </button>

                  <button
                    onClick={togglePlayPause}
                    className="px-6 py-2.5 rounded-2xl bg-gradient-to-r from-rose-600 to-indigo-600 hover:from-rose-500 hover:to-indigo-500 text-white font-black text-xs shadow-glow flex items-center gap-2 transition-all transform hover:scale-105"
                  >
                    {isPlayingTrack ? <Pause className="w-4 h-4 fill-white" /> : <Play className="w-4 h-4 fill-white" />}
                    <span>{isPlayingTrack ? 'PAUSE' : 'PLAY TRACK'}</span>
                  </button>

                  <button
                    onClick={() => playTrackAtIndex((currentTrackIndex + 1) % displayedTracks.length)}
                    className="p-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white transition-all border border-slate-700"
                    title="Next Track"
                  >
                    <SkipForward className="w-4 h-4" />
                  </button>

                  <button
                    onClick={() => setAutoAdvance(!autoAdvance)}
                    className={`p-2.5 rounded-xl border text-xs font-bold transition-all flex items-center gap-1 ${
                      autoAdvance
                        ? 'bg-emerald-600/20 border-emerald-500/40 text-emerald-400'
                        : 'bg-slate-800 border-slate-700 text-slate-500'
                    }`}
                    title="Autoplay next track continuously"
                  >
                    <Repeat className={`w-4 h-4 ${autoAdvance ? 'animate-spin' : ''}`} style={{ animationDuration: '6s' }} />
                    <span className="hidden sm:inline">Autoplay</span>
                  </button>
                </div>
              </div>

              {/* Progress Slider */}
              <div className="space-y-1 pt-1">
                <input
                  type="range"
                  min={0}
                  max={duration || 100}
                  value={currentTime}
                  onChange={(e) => {
                    const val = Number(e.target.value);
                    setCurrentTime(val);
                    if (audioRef.current) audioRef.current.currentTime = val;
                  }}
                  className="w-full h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-rose-500"
                />
                <div className="flex justify-between text-[10px] text-slate-400 font-medium">
                  <span>{formatTime(currentTime)}</span>
                  <span>{formatTime(duration)}</span>
                </div>
              </div>
            </div>
          )}

          {/* Filter Bar */}
          <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3 bg-slate-900/80 border border-slate-800 p-3 rounded-2xl">
            {/* Category Filter Pills */}
            <div className="flex items-center gap-1.5 overflow-x-auto scrollbar-none">
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 pr-1">Filter:</span>
              {[
                { id: 'ALL', label: 'All Audio (87)' },
                { id: 'VOCAB', label: '📚 Vocab (単語)' },
                { id: 'DIALOGUE', label: '会話 Dialogue' },
                { id: 'DRILL', label: '練習 Practice' },
                { id: 'REVIEW', label: '🏆 Review (まとめ)' },
              ].map((f) => (
                <button
                  key={f.id}
                  onClick={() => setTrackFilter(f.id as any)}
                  className={`px-3 py-1 rounded-xl text-xs font-bold whitespace-nowrap transition-all border ${
                    trackFilter === f.id
                      ? 'bg-rose-600 border-rose-400 text-white shadow-sm'
                      : 'bg-slate-950 border-slate-800 text-slate-400 hover:text-white'
                  }`}
                >
                  {f.label}
                </button>
              ))}
            </div>

            {/* Lesson Filter Dropdown + Search */}
            <div className="flex items-center gap-2">
              <select
                value={lessonFilter}
                onChange={(e) => setLessonFilter(e.target.value === 'ALL' ? 'ALL' : Number(e.target.value))}
                className="bg-slate-950 border border-slate-800 text-slate-200 text-xs font-bold rounded-xl px-3 py-1.5 focus:outline-none focus:border-rose-500"
              >
                <option value="ALL">All Lessons (1–25)</option>
                {Array.from({ length: 25 }, (_, i) => i + 1).map((num) => (
                  <option key={num} value={num}>
                    Lesson {num}
                  </option>
                ))}
              </select>

              <div className="relative flex-1 sm:w-48">
                <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-500" />
                <input
                  type="text"
                  placeholder="Search audio..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-8 pr-3 py-1.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-rose-500"
                />
              </div>
            </div>
          </div>

          {/* Serial Audio Track List Table */}
          <div className="bg-slate-900/90 border border-slate-800 rounded-3xl p-3 sm:p-4 shadow-2xl space-y-2">
            <div className="flex items-center justify-between px-2 pb-2 border-b border-slate-800 text-xs text-slate-400 font-bold">
              <span>{displayedTracks.length} Audio Tracks Available</span>
              <span>Click any track to listen continuously</span>
            </div>

            <div className="space-y-1.5 max-h-[500px] overflow-y-auto pr-1 scrollbar-thin scrollbar-thumb-slate-700">
              {displayedTracks.map((tr, idx) => {
                const isActive = activeTrackObj?.id === tr.id;
                const isPlayingThis = isActive && isPlayingTrack;

                return (
                  <div
                    key={tr.id}
                    onClick={() => playTrackAtIndex(idx)}
                    className={`flex items-center justify-between p-3 rounded-2xl border transition-all cursor-pointer group ${
                      isActive
                        ? 'bg-rose-600/15 border-rose-500/50 text-white shadow-md'
                        : 'bg-slate-950/60 border-slate-800/80 hover:border-slate-700 hover:bg-slate-800/60 text-slate-300'
                    }`}
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      {/* Track index / Play icon */}
                      <button
                        className={`w-9 h-9 rounded-xl flex items-center justify-center font-black text-xs transition-all flex-shrink-0 ${
                          isPlayingThis
                            ? 'bg-rose-600 text-white shadow-glow'
                            : isActive
                            ? 'bg-rose-500/20 text-rose-300 border border-rose-500/40'
                            : 'bg-slate-800 text-slate-400 group-hover:bg-rose-600 group-hover:text-white'
                        }`}
                      >
                        {isPlayingThis ? (
                          <Pause className="w-4 h-4 fill-white" />
                        ) : (
                          <Play className="w-4 h-4 ml-0.5 fill-current" />
                        )}
                      </button>

                      {/* Track title details */}
                      <div className="min-w-0">
                        <div className="flex items-center gap-2">
                          <span className={`text-xs font-black truncate ${isActive ? 'text-white' : 'text-slate-200 group-hover:text-white'}`}>
                            {tr.japaneseLabel}
                          </span>
                          <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${
                            tr.trackType === 'vocab' ? 'bg-violet-500/15 border-violet-500/30 text-violet-300' :
                            tr.trackType === 'dialogue' ? 'bg-emerald-500/15 border-emerald-500/30 text-emerald-300' :
                            tr.trackType === 'drill' ? 'bg-sky-500/15 border-sky-500/30 text-sky-300' :
                            'bg-amber-500/15 border-amber-500/30 text-amber-300'
                          }`}>
                            {tr.typeLabel}
                          </span>
                        </div>
                        {tr.lessonNumber !== 99 && (
                          <p className="text-[11px] text-slate-400 mt-0.5 truncate">
                            Lesson {tr.lessonNumber}: {tr.lessonTitle}
                          </p>
                        )}
                      </div>
                    </div>

                    {/* Playing indicator */}
                    {isPlayingThis && (
                      <div className="flex items-center gap-1.5 text-xs font-bold text-rose-400 pr-2">
                        <span className="w-2 h-2 rounded-full bg-rose-500 animate-ping" />
                        <span>Playing</span>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* ─────────────────────────────────────────────────────────────
         2. KANA / HANGUL ALPHABET GRID
      ───────────────────────────────────────────────────────────── */}
      {(activeLanguage !== 'JAPANESE' || jpSubTab !== 'CHAPTER_AUDIO') && (
        <div className="space-y-4 animate-fade-in">
          {/* Search Bar & Counter */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
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
            <div className="text-xs text-slate-400 font-medium text-right sm:text-left">
              Showing <span className="text-white font-bold">{filteredData.length}</span> items
            </div>
          </div>

          {/* Tap-to-Hear Cards Grid */}
          <div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 lg:grid-cols-10 gap-2 sm:gap-3">
            {filteredData.map((item, idx) => (
              <button
                key={idx}
                onClick={() => playSound(item.char)}
                className={`relative group p-2 sm:p-3 rounded-xl sm:rounded-2xl border transition-all duration-200 flex flex-col items-center justify-center cursor-pointer select-none min-h-[68px] ${
                  activeChar === item.char
                    ? 'scale-105 bg-indigo-600 border-indigo-400 text-white shadow-glow'
                    : 'bg-slate-950/60 hover:bg-slate-800/90 border-slate-800/80 hover:border-indigo-500/50 hover:shadow-lg'
                }`}
              >
                <Volume2 className="absolute top-1 right-1 w-3 h-3 sm:w-3.5 sm:h-3.5 text-indigo-400 opacity-0 group-hover:opacity-100 transition-opacity" />

                <div className={`text-xl sm:text-2xl font-black mb-0.5 sm:mb-1 ${activeLanguage === 'JAPANESE' ? 'font-jp text-rose-300' : 'font-kr text-emerald-300'}`}>
                  {item.char}
                </div>

                <div className="text-[10px] sm:text-[11px] font-bold text-slate-200 leading-tight">
                  {item.romaji}
                </div>

                <div className="text-[9px] sm:text-[10px] text-amber-400 font-medium mt-0.5 leading-tight">
                  {item.nepaliHint}
                </div>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
