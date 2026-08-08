'use client';
import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { LevelHubDashboard, LevelType } from '@/components/LevelHubDashboard';
import { KoreanHubDashboard, KoreanLevelType } from '@/components/KoreanHubDashboard';
import MobileNavbar from '@/components/layout/MobileNavbar';

type Country = 'japan' | 'korea';

export default function LearnHubClient({ country }: { country: Country }) {
  const searchParams = useSearchParams();
  const rawLevelParam = searchParams.get('level')?.toUpperCase();

  // State for Japan level
  const [japanLevel, setJapanLevel] = useState<LevelType>(() => {
    if (rawLevelParam && ['BASICS', 'N5', 'N4', 'N3', 'N2', 'N1', 'JFT', 'KANJI_1000'].includes(rawLevelParam)) {
      return rawLevelParam as LevelType;
    }
    return 'N5';
  });

  // State for Korean level
  const [koreanLevel, setKoreanLevel] = useState<KoreanLevelType>(() => {
    if (rawLevelParam) {
      if (rawLevelParam === 'EPS-TOPIK' || rawLevelParam === 'EPS_TOPIK') return 'EPS';
      if (rawLevelParam === 'TOPIK1' || rawLevelParam === 'TOPIK_1') return 'TOPIK1_L1';
      if (rawLevelParam === 'TOPIK2' || rawLevelParam === 'TOPIK_2') return 'TOPIK3';
      if (['BASICS', 'EPS', 'EPS_MFG', 'TOPIK1_L1', 'TOPIK2', 'TOPIK3', 'TOPIK4', 'TOPIK2_L5', 'TOPIK2_L6'].includes(rawLevelParam)) {
        return rawLevelParam as KoreanLevelType;
      }
    }
    return 'EPS';
  });

  useEffect(() => {
    if (rawLevelParam) {
      if (country === 'japan') {
        if (['BASICS', 'N5', 'N4', 'N3', 'N2', 'N1', 'JFT', 'KANJI_1000'].includes(rawLevelParam)) {
          setJapanLevel(rawLevelParam as LevelType);
        }
      } else {
        if (['BASICS', 'EPS', 'TOPIK1_L1', 'TOPIK2', 'TOPIK3', 'TOPIK4', 'TOPIK2_L5', 'TOPIK2_L6'].includes(rawLevelParam)) {
          setKoreanLevel(rawLevelParam as KoreanLevelType);
        }
      }
    }
  }, [rawLevelParam, country]);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans pb-20 pt-14 md:pt-0">
      {/* Mobile Top Navbar */}
      <MobileNavbar user={null} lang="en" onLangToggle={() => {}} onSearchOpen={() => {}} />

      {/* Main Dedicated Focus Mode Learning Canvas */}
      <main className="w-full px-2 sm:px-4 py-2 sm:py-3">
        {country === 'japan' ? (
          <LevelHubDashboard
            level={japanLevel}
            onSelectLevel={(lvl) => setJapanLevel(lvl)}
          />
        ) : (
          <KoreanHubDashboard
            level={koreanLevel}
            onSelectLevel={(lvl) => setKoreanLevel(lvl)}
          />
        )}
      </main>
    </div>
  );
}
