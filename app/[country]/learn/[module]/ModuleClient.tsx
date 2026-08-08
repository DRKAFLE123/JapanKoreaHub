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
import { KoreanBasicsModuleSystem } from '@/components/korean/KoreanBasicsModuleSystem';

interface Props {
  country: 'japan' | 'korea';
  module: string;
}

export default function ModuleClient({ country, module }: Props) {
  const cName = country === 'japan' ? 'Japan' : 'Korea';
  const flag = country === 'japan' ? '🇯🇵' : '🇰🇷';

  // Render the appropriate component based on the path
  const renderContent = () => {
    if (country === 'japan') {
      switch (module) {
        case 'basics': return <AlphabetGrid activeLanguage="JAPANESE" />;
        case 'vocabulary': return <VocabularyExplorer />;
        case 'kanji': return <KanjiCard />;
        default: return <div className="p-4 text-gray-500 text-center">Module in development</div>;
      }
    } else {
      switch (module) {
        case 'basics': return <KoreanBasicsModuleSystem />;
        case 'vocabulary': return <KoreanVocabularyExplorer />;
        default: return <div className="p-4 text-gray-500 text-center">Module in development</div>;
      }
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 dark-compat pb-20">
      <MobileNavbar user={null} lang="en" onLangToggle={() => {}} onSearchOpen={() => {}} />

      <main className="pt-14 h-full">
        <div className="px-4 py-2 border-b border-slate-900 bg-slate-950 sticky top-14 z-30">
          <Link href={`/${country}/learn`} className="inline-flex items-center gap-1 text-sm text-slate-400 hover:text-white transition-colors">
            <ArrowLeft className="w-4 h-4" />
            Back to {cName} Learning Hub
          </Link>
        </div>

        {/* Existing components (which use dark backgrounds) rendered here */}
        <div className="relative">
          {renderContent()}
        </div>
      </main>

      <BottomTabBar />
    </div>
  );
}
