'use client';
import React, { useState } from 'react';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import LevelHeroBanner from '@/components/learn/LevelHeroBanner';
import SubTabNav, { InnerSubTab } from '@/components/learn/SubTabNav';
import { LevelHubDashboard, LevelType } from '@/components/LevelHubDashboard';
import { KoreanHubDashboard, KoreanLevelType } from '@/components/KoreanHubDashboard';

import { VocabularyExplorer } from '@/components/VocabularyExplorer';
import { KoreanVocabularyExplorer } from '@/components/KoreanVocabularyExplorer';
import { AlphabetGrid } from '@/components/AlphabetGrid';
import { KanjiCard } from '@/components/KanjiCard';
import { RadicalBreakdown } from '@/components/RadicalBreakdown';
import { JFTGrammarExplorer } from '@/components/JFTGrammarExplorer';
import { KoreanBasicsModuleSystem } from '@/components/korean/KoreanBasicsModuleSystem';
import { KoreanGrammarExplorer } from '@/components/KoreanGrammarExplorer';
import { Korean300CommonWordsExplorer } from '@/components/Korean300CommonWordsExplorer';
import { KoreanFlashcardCard } from '@/components/KoreanFlashcardCard';
import { EPSSectorHub } from '@/components/korean/EPSSectorHub';

interface Props {
  country: 'japan' | 'korea';
  slug: string;
}

const JAPAN_LEVEL_MAPPING: Record<string, { type: LevelType; title: string; sub: string; badge: string; emoji: string }> = {
  'n5': { type: 'N5', title: 'JLPT N5 Complete Curriculum', sub: 'Lessons 1–25 • Minna no Nihongo Shokyu I', badge: 'JLPT N5', emoji: '🎗' },
  'n4': { type: 'N4', title: 'JLPT N4 Complete Curriculum', sub: 'Lessons 26–50 • Minna no Nihongo Shokyu II', badge: 'JLPT N4', emoji: '🎖' },
  'n3': { type: 'N3', title: 'JLPT N3 Master Syllabus', sub: 'Lessons 51–75 • Intermediate Japanese', badge: 'JLPT N3', emoji: '🏆' },
  'n2': { type: 'N2', title: 'JLPT N2 Advanced Syllabus', sub: 'Business Japanese & Advanced Comprehension', badge: 'JLPT N2', emoji: '🚀' },
  'jft-basic': { type: 'JFT', title: 'JFT-Basic Prometric CBT Simulator', sub: 'Daily Life Scenarios & 250-Mark CBT Test', badge: 'JFT-Basic', emoji: '⚙️' },
  'kanji-1000': { type: 'KANJI_1000', title: '1,000 Kanji Cards & 214 Radicals', sub: 'SRS Memory Deck with Onyomi & Kunyomi', badge: 'Kanji 1000', emoji: '🃏' },
};

const KOREA_LEVEL_MAPPING: Record<string, { type: KoreanLevelType; title: string; sub: string; badge: string; emoji: string }> = {
  'eps-topik': { type: 'EPS', title: 'EPS-TOPIK 60-Lesson Official Course', sub: 'Lessons 1–60 HRD Korea Standard Textbook', badge: 'EPS-TOPIK', emoji: '👷' },
  'topik-1': { type: 'TOPIK1_L1', title: 'TOPIK I (Levels 1 & 2) Preparation', sub: 'Beginner Korean Reading & Listening', badge: 'TOPIK I', emoji: '🏅' },
  'topik-2': { type: 'TOPIK3', title: 'TOPIK II (Levels 3 & 4) Preparation', sub: 'Intermediate Korean Sentence Structures', badge: 'TOPIK II', emoji: '🏆' },
  'eps-sectors': { type: 'EPS_MFG', title: 'EPS Sector Specific Vocabulary', sub: 'Manufacturing, Agriculture, Construction, Fishery', badge: 'EPS Sectors', emoji: '🏭' },
};

export default function LearnSlugClient({ country, slug }: Props) {
  const [activeTab, setActiveTab] = useState<InnerSubTab>('VOCABULARY');

  const cName = country === 'japan' ? 'Japan' : 'Korea';
  const flag = country === 'japan' ? '🇯🇵' : '🇰🇷';

  const isJapanLevel = country === 'japan' && JAPAN_LEVEL_MAPPING[slug];
  const isKoreaLevel = country === 'korea' && KOREA_LEVEL_MAPPING[slug];

  // Render Level Experience
  if (isJapanLevel || isKoreaLevel) {
    const meta = country === 'japan' ? JAPAN_LEVEL_MAPPING[slug] : KOREA_LEVEL_MAPPING[slug];

    return (
      <div className="min-h-screen bg-slate-950 dark-compat pb-24">
        <div className="px-4 py-3 bg-slate-950 border-b border-slate-900 sticky top-0 z-40 flex items-center justify-between">
          <Link href={`/${country}/learn`} className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-400 hover:text-white transition-colors">
            <ArrowLeft className="w-4 h-4" />
            Back to {flag} {cName} Learning Hub
          </Link>
        </div>

        <main className="max-w-5xl mx-auto space-y-4 pt-4">
          <section className="px-4">
            <LevelHeroBanner
              title={meta.title}
              subtitle={meta.sub}
              badge={meta.badge}
              emoji={meta.emoji}
              country={country}
            />
          </section>

          <SubTabNav
            activeTab={activeTab}
            onTabChange={(t) => setActiveTab(t)}
            country={country}
          />

          <section className="px-4 relative">
            {country === 'japan' ? (
              <LevelHubDashboard
                level={JAPAN_LEVEL_MAPPING[slug].type}
                activeTab={activeTab as any}
                onTabChange={(t) => setActiveTab(t as any)}
              />
            ) : (
              <KoreanHubDashboard
                level={KOREA_LEVEL_MAPPING[slug].type}
                activeTab={activeTab as any}
                onTabChange={(t) => setActiveTab(t as any)}
              />
            )}
          </section>
        </main>
      </div>
    );
  }

  // Render Standalone Content Modules
  const renderModuleContent = () => {
    if (country === 'japan') {
      switch (slug) {
        case 'basics': return <AlphabetGrid activeLanguage="JAPANESE" />;
        case 'vocabulary': return <VocabularyExplorer />;
        case 'kanji': return <KanjiCard />;
        case 'radicals': return <RadicalBreakdown />;
        case 'grammar': return <JFTGrammarExplorer />;
        default: return <VocabularyExplorer />;
      }
    } else {
      switch (slug) {
        case 'basics': return <KoreanBasicsModuleSystem />;
        case 'vocabulary': return <KoreanVocabularyExplorer />;
        case 'grammar': return <KoreanGrammarExplorer />;
        case 'words': return <Korean300CommonWordsExplorer />;
        case 'flashcards': return <KoreanFlashcardCard />;
        case 'sectors': return <EPSSectorHub />;
        default: return <KoreanVocabularyExplorer />;
      }
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 dark-compat pb-20">
      <main className="pt-14 h-full">
        <div className="px-4 py-2 border-b border-slate-900 bg-slate-950 sticky top-14 z-30 flex items-center justify-between">
          <Link href={`/${country}/learn`} className="inline-flex items-center gap-1 text-sm text-slate-400 hover:text-white transition-colors">
            <ArrowLeft className="w-4 h-4" />
            Back to {flag} {cName} Learning Hub
          </Link>
        </div>

        <div className="relative">
          {renderModuleContent()}
        </div>
      </main>
    </div>
  );
}
