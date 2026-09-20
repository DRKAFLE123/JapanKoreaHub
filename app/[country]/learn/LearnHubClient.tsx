'use client';
import React, { useState, useEffect, useCallback } from 'react';
import { useSearchParams } from 'next/navigation';
import { LevelHubDashboard, LevelType, LevelSubTab } from '@/components/LevelHubDashboard';
import { KoreanHubDashboard, KoreanLevelType, KoreanSubTab } from '@/components/KoreanHubDashboard';

type Country = 'japan' | 'korea';

interface LearnHubClientProps {
  country: Country;
  initialLevel?: string;
}

// ── SLUG & TAB MAPPINGS (JAPAN) ──────────────────────────────────
const JAPAN_LEVEL_SLUGS: Record<LevelType, string> = {
  BASICS: 'basics',
  N5: 'n5',
  N4: 'n4',
  N3: 'n3',
  N2: 'n2',
  N1: 'n1',
  JFT: 'jft',
  KANJI_1000: 'kanji-1000',
};

const JAPAN_SLUG_TO_LEVEL: Record<string, LevelType> = {
  basics: 'BASICS',
  n5: 'N5',
  n4: 'N4',
  n3: 'N3',
  n2: 'N2',
  n1: 'N1',
  jft: 'JFT',
  'jft-basic': 'JFT',
  'kanji-1000': 'KANJI_1000',
  kanji_1000: 'KANJI_1000',
};

const JAPAN_TAB_SLUGS: Record<LevelSubTab, string> = {
  VOCABULARY: 'vocabulary',
  FLASHCARDS: 'flashcards',
  LISTENING: 'listening',
  EXAM_GUIDE: 'guide',
  GRAMMAR: 'grammar',
  BASICS_VOCAB: 'kana',
  RADICALS: 'radicals',
  KANA_MATRIX: 'matrix',
  EXAMS: 'exams',
};

const JAPAN_SLUG_TO_TAB: Record<string, LevelSubTab> = {
  vocabulary: 'VOCABULARY',
  flashcards: 'FLASHCARDS',
  kanji: 'FLASHCARDS',
  listening: 'LISTENING',
  guide: 'EXAM_GUIDE',
  'exam-guide': 'EXAM_GUIDE',
  grammar: 'GRAMMAR',
  kana: 'BASICS_VOCAB',
  matrix: 'KANA_MATRIX',
  radicals: 'RADICALS',
  exams: 'EXAMS',
};

// ── SLUG & TAB MAPPINGS (KOREA) ──────────────────────────────────
const KOREAN_LEVEL_SLUGS: Record<KoreanLevelType, string> = {
  BASICS: 'basics',
  EPS: 'eps',
  EPS_MFG: 'eps-sectors',
  EPS_AGR: 'eps-agr',
  EPS_CON: 'eps-con',
  EPS_FISH: 'eps-fish',
  EPS_SAFETY: 'eps-safety',
  TOPIK1_L1: 'topik-1',
  TOPIK2: 'topik-2',
  TOPIK3: 'topik-3',
  TOPIK4: 'topik-4',
  TOPIK2_L5: 'topik-5',
  TOPIK2_L6: 'topik-6',
};

const KOREAN_SLUG_TO_LEVEL: Record<string, KoreanLevelType> = {
  basics: 'BASICS',
  eps: 'EPS',
  'eps-topik': 'EPS',
  'eps-sectors': 'EPS_MFG',
  'topik-1': 'TOPIK1_L1',
  topik1: 'TOPIK1_L1',
  'topik-2': 'TOPIK2',
  topik2: 'TOPIK2',
  'topik-3': 'TOPIK3',
  topik3: 'TOPIK3',
  'topik-4': 'TOPIK4',
  topik4: 'TOPIK4',
  'topik-5': 'TOPIK2_L5',
  topik5: 'TOPIK2_L5',
  'topik-6': 'TOPIK2_L6',
  topik6: 'TOPIK2_L6',
};

const KOREAN_TAB_SLUGS: Record<KoreanSubTab, string> = {
  VOCABULARY: 'vocabulary',
  GRAMMAR: 'grammar',
  FLASHCARDS: 'flashcards',
  LISTENING: 'listening',
  READING: 'reading',
  WRITING: 'writing',
  EPS_SECTORS: 'sectors',
  BASICS_MODULES: 'modules',
  BASICS_PROGRESS: 'progress',
  BASICS_TEST: 'placement-test',
  BASICS_ALPHABET: 'alphabet',
  GRAMMAR_100: 'grammar-100',
  COMMON_300: 'words-300',
  EXAMS: 'exams',
  EXAM_GUIDE: 'guide',
};

const KOREAN_SLUG_TO_TAB: Record<string, KoreanSubTab> = {
  vocabulary: 'VOCABULARY',
  grammar: 'GRAMMAR',
  flashcards: 'FLASHCARDS',
  listening: 'LISTENING',
  reading: 'READING',
  writing: 'WRITING',
  sectors: 'EPS_SECTORS',
  modules: 'BASICS_MODULES',
  progress: 'BASICS_PROGRESS',
  'placement-test': 'BASICS_TEST',
  alphabet: 'BASICS_ALPHABET',
  'grammar-100': 'GRAMMAR_100',
  'words-300': 'COMMON_300',
  guide: 'EXAM_GUIDE',
};

export default function LearnHubClient({ country, initialLevel }: LearnHubClientProps) {
  const searchParams = useSearchParams();
  const rawQueryTab = searchParams.get('tab')?.toLowerCase();
  const rawQueryLevel = searchParams.get('level')?.toLowerCase();

  // Helper to parse Japan level from initial prop, URL query, or default
  const resolveInitialJapanLevel = (): LevelType => {
    const candidate = (initialLevel || rawQueryLevel || '').toLowerCase();
    if (candidate && JAPAN_SLUG_TO_LEVEL[candidate]) {
      return JAPAN_SLUG_TO_LEVEL[candidate];
    }
    return 'N5';
  };

  // Helper to parse Korean level from initial prop, URL query, or default
  const resolveInitialKoreanLevel = (): KoreanLevelType => {
    const candidate = (initialLevel || rawQueryLevel || '').toLowerCase();
    if (candidate && KOREAN_SLUG_TO_LEVEL[candidate]) {
      return KOREAN_SLUG_TO_LEVEL[candidate];
    }
    return 'EPS';
  };

  const [japanLevel, setJapanLevel] = useState<LevelType>(resolveInitialJapanLevel);
  const [koreanLevel, setKoreanLevel] = useState<KoreanLevelType>(resolveInitialKoreanLevel);

  const [japanTab, setJapanTab] = useState<LevelSubTab>(() => {
    if (rawQueryTab && JAPAN_SLUG_TO_TAB[rawQueryTab]) {
      return JAPAN_SLUG_TO_TAB[rawQueryTab];
    }
    return 'VOCABULARY';
  });

  const [koreanTab, setKoreanTab] = useState<KoreanSubTab>(() => {
    if (rawQueryTab && KOREAN_SLUG_TO_TAB[rawQueryTab]) {
      return KOREAN_SLUG_TO_TAB[rawQueryTab];
    }
    return 'VOCABULARY';
  });

  // Keep state in sync if initialLevel prop changes
  useEffect(() => {
    if (initialLevel) {
      const s = initialLevel.toLowerCase();
      if (country === 'japan' && JAPAN_SLUG_TO_LEVEL[s]) {
        setJapanLevel(JAPAN_SLUG_TO_LEVEL[s]);
      } else if (country === 'korea' && KOREAN_SLUG_TO_LEVEL[s]) {
        setKoreanLevel(KOREAN_SLUG_TO_LEVEL[s]);
      }
    }
  }, [initialLevel, country]);

  // Synchronize with browser Back and Forward button navigation
  useEffect(() => {
    const handlePopState = () => {
      if (typeof window === 'undefined') return;
      const pathname = window.location.pathname;
      const segments = pathname.split('/').filter(Boolean);
      // e.g. ['japan', 'learn', 'n3']
      if (segments[1] === 'learn') {
        const slug = segments[2] || '';
        const search = new URLSearchParams(window.location.search);
        const tabParam = search.get('tab')?.toLowerCase() || '';

        if (country === 'japan') {
          if (slug && JAPAN_SLUG_TO_LEVEL[slug]) {
            setJapanLevel(JAPAN_SLUG_TO_LEVEL[slug]);
          }
          if (tabParam && JAPAN_SLUG_TO_TAB[tabParam]) {
            setJapanTab(JAPAN_SLUG_TO_TAB[tabParam]);
          } else {
            setJapanTab('VOCABULARY');
          }
        } else {
          if (slug && KOREAN_SLUG_TO_LEVEL[slug]) {
            setKoreanLevel(KOREAN_SLUG_TO_LEVEL[slug]);
          }
          if (tabParam && KOREAN_SLUG_TO_TAB[tabParam]) {
            setKoreanTab(KOREAN_SLUG_TO_TAB[tabParam]);
          } else {
            setKoreanTab('VOCABULARY');
          }
        }
      }
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, [country]);

  // Handle Japan Level switch with URL update
  const handleJapanLevelSelect = useCallback((lvl: LevelType) => {
    setJapanLevel(lvl);
    const defaultTab: LevelSubTab = lvl === 'BASICS' ? 'BASICS_VOCAB' : 'VOCABULARY';
    setJapanTab(defaultTab);

    const levelSlug = JAPAN_LEVEL_SLUGS[lvl] || 'n5';
    const targetUrl = `/${country}/learn/${levelSlug}`;
    if (typeof window !== 'undefined' && window.location.pathname !== targetUrl) {
      window.history.pushState({ level: lvl }, '', targetUrl);
    }
  }, [country]);

  // Handle Japan Sub-Tab switch with URL update
  const handleJapanTabSelect = useCallback((tab: LevelSubTab) => {
    setJapanTab(tab);
    const levelSlug = JAPAN_LEVEL_SLUGS[japanLevel] || 'n5';
    const tabSlug = JAPAN_TAB_SLUGS[tab];
    // Keep URL clean: omit query if default VOCABULARY or BASICS_VOCAB
    const isDefault = (japanLevel === 'BASICS' && tab === 'BASICS_VOCAB') || (japanLevel !== 'BASICS' && tab === 'VOCABULARY');
    const targetUrl = isDefault
      ? `/${country}/learn/${levelSlug}`
      : `/${country}/learn/${levelSlug}?tab=${tabSlug}`;

    if (typeof window !== 'undefined') {
      window.history.pushState({ level: japanLevel, tab }, '', targetUrl);
    }
  }, [country, japanLevel]);

  // Handle Korean Level switch with URL update
  const handleKoreanLevelSelect = useCallback((lvl: KoreanLevelType) => {
    setKoreanLevel(lvl);
    const defaultTab: KoreanSubTab = lvl === 'BASICS' ? 'BASICS_MODULES' : 'VOCABULARY';
    setKoreanTab(defaultTab);

    const levelSlug = KOREAN_LEVEL_SLUGS[lvl] || 'eps';
    const targetUrl = `/${country}/learn/${levelSlug}`;
    if (typeof window !== 'undefined' && window.location.pathname !== targetUrl) {
      window.history.pushState({ level: lvl }, '', targetUrl);
    }
  }, [country]);

  // Handle Korean Sub-Tab switch with URL update
  const handleKoreanTabSelect = useCallback((tab: KoreanSubTab) => {
    setKoreanTab(tab);
    const levelSlug = KOREAN_LEVEL_SLUGS[koreanLevel] || 'eps';
    const tabSlug = KOREAN_TAB_SLUGS[tab];
    const isDefault = (koreanLevel === 'BASICS' && tab === 'BASICS_MODULES') || (koreanLevel !== 'BASICS' && tab === 'VOCABULARY');
    const targetUrl = isDefault
      ? `/${country}/learn/${levelSlug}`
      : `/${country}/learn/${levelSlug}?tab=${tabSlug}`;

    if (typeof window !== 'undefined') {
      window.history.pushState({ level: koreanLevel, tab }, '', targetUrl);
    }
  }, [country, koreanLevel]);

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans pb-20 pt-0">
      {/* Main Dedicated Focus Mode Learning Canvas */}
      <main className="w-full px-1.5 sm:px-4 py-0.5 sm:py-1">
        {country === 'japan' ? (
          <LevelHubDashboard
            level={japanLevel}
            onSelectLevel={handleJapanLevelSelect}
            activeTab={japanTab}
            onTabChange={handleJapanTabSelect}
          />
        ) : (
          <KoreanHubDashboard
            level={koreanLevel}
            onSelectLevel={handleKoreanLevelSelect}
            activeTab={koreanTab}
            onTabChange={handleKoreanTabSelect}
          />
        )}
      </main>
    </div>
  );
}
