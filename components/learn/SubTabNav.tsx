'use client';
import React from 'react';
import { BookOpen, AlignLeft, Layers, Headphones, Clock, Sparkles } from 'lucide-react';

export type InnerSubTab = 'VOCABULARY' | 'GRAMMAR' | 'FLASHCARDS' | 'LISTENING' | 'EXAMS' | 'EXAM_GUIDE';

interface SubTabNavProps {
  activeTab: InnerSubTab;
  onTabChange: (tab: InnerSubTab) => void;
  country: 'japan' | 'korea';
}

const TABS: { id: InnerSubTab; label: string; Icon: React.ElementType }[] = [
  { id: 'VOCABULARY',  label: 'Vocabulary',     Icon: BookOpen  },
  { id: 'GRAMMAR',     label: 'Grammar',        Icon: AlignLeft },
  { id: 'FLASHCARDS',  label: 'SRS Flashcards', Icon: Layers    },
  { id: 'LISTENING',   label: 'Listening',      Icon: Headphones},
  { id: 'EXAMS',       label: 'Mock Test',      Icon: Clock     },
  { id: 'EXAM_GUIDE',  label: 'Pass Tricks',    Icon: Sparkles  },
];

export default function SubTabNav({ activeTab, onTabChange, country }: SubTabNavProps) {
  const isJapan = country === 'japan';

  return (
    <div className="sticky top-14 z-30 bg-white/95 backdrop-blur-md border-b border-gray-100 px-4 py-2">
      <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar py-1">
        {TABS.map(({ id, label, Icon }) => {
          const active = activeTab === id;
          return (
            <button
              key={id}
              onClick={() => onTabChange(id)}
              className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all cursor-pointer ${
                active
                  ? isJapan
                    ? 'bg-red-600 text-white shadow-sm'
                    : 'bg-blue-600 text-white shadow-sm'
                  : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
              }`}
            >
              <Icon className="w-3.5 h-3.5" />
              <span>{label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
