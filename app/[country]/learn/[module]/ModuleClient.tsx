'use client';
import React from 'react';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import MobileNavbar from '@/components/layout/MobileNavbar';
import BottomTabBar from '@/components/layout/BottomTabBar';

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
  module: string;
}

export default function ModuleClient({ country, module }: Props) {
  const cName = country === 'japan' ? 'Japan' : 'Korea';
  const flag = country === 'japan' ? '🇯🇵' : '🇰🇷';

  const renderContent = () => {
    if (country === 'japan') {
      switch (module) {
        case 'basics':
          return <AlphabetGrid activeLanguage="JAPANESE" />;
        case 'vocabulary':
          return <VocabularyExplorer />;
        case 'kanji':
          return <KanjiCard />;
        case 'radicals':
          return <RadicalBreakdown />;
        case 'grammar':
          return <JFTGrammarExplorer />;
        default:
          return <VocabularyExplorer />;
      }
    } else {
      switch (module) {
        case 'basics':
          return <KoreanBasicsModuleSystem />;
        case 'vocabulary':
          return <KoreanVocabularyExplorer />;
        case 'grammar':
          return <KoreanGrammarExplorer />;
        case 'words':
          return <Korean300CommonWordsExplorer />;
        case 'flashcards':
          return <KoreanFlashcardCard />;
        case 'sectors':
          return <EPSSectorHub />;
        default:
          return <KoreanVocabularyExplorer />;
      }
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 dark-compat pb-20">
      <MobileNavbar user={null} lang="en" onLangToggle={() => {}} onSearchOpen={() => {}} />

      <main className="pt-14 h-full">
        <div className="px-4 py-2 border-b border-slate-900 bg-slate-950 sticky top-14 z-30 flex items-center justify-between">
          <Link href={`/${country}/learn`} className="inline-flex items-center gap-1 text-sm text-slate-400 hover:text-white transition-colors">
            <ArrowLeft className="w-4 h-4" />
            Back to {flag} {cName} Learning Hub
          </Link>
        </div>

        {/* Content Engine Container */}
        <div className="relative">
          {renderContent()}
        </div>
      </main>

      <BottomTabBar />
    </div>
  );
}
