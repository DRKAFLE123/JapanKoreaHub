'use client';

import React, { useState } from 'react';
import {
  X, Search, BookOpen, Briefcase, Clock, ShieldCheck,
  ChevronRight, CheckCircle2, Sparkles, Award, Globe, Layers,
  ExternalLink, FileText, Lock, Mail, MessageSquare, AlertTriangle,
  Flame, Calendar, Headphones
} from 'lucide-react';

import { GUIDE_CATALOG, GuideContent } from '@/lib/guides-data';

export interface InfoGuideModalProps {
  guideId: string | null;
  onClose: () => void;
  onNavigateView?: (view: 'LANDING' | 'JAPANESE' | 'KOREAN') => void;
  onOpenMockTest?: (track?: 'JAPANESE' | 'KOREAN') => void;
}

export const InfoGuideModal: React.FC<InfoGuideModalProps> = ({
  guideId,
  onClose,
  onNavigateView,
  onOpenMockTest,
}) => {
  const [selectedId, setSelectedId] = useState<string>(guideId || 'minna-75');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [activeCategory, setActiveCategory] = useState<'ALL' | 'LANGUAGE' | 'VISA' | 'SUPPORT' | 'LEGAL'>('ALL');

  React.useEffect(() => {
    if (guideId) {
      setSelectedId(guideId);
    }
  }, [guideId]);

  if (!guideId) return null;

  const currentGuide = GUIDE_CATALOG.find((g) => g.id === selectedId) || GUIDE_CATALOG[0];

  const filteredCatalog = GUIDE_CATALOG.filter((g) => {
    if (activeCategory !== 'ALL' && g.category !== activeCategory) return false;
    if (searchQuery.trim() !== '') {
      const q = searchQuery.toLowerCase();
      return (
        g.title.toLowerCase().includes(q) ||
        g.subtitle.toLowerCase().includes(q) ||
        g.badge.toLowerCase().includes(q)
      );
    }
    return true;
  });

  const handleCtaClick = () => {
    if (currentGuide.ctaAction === 'JAPANESE' && onNavigateView) {
      onNavigateView('JAPANESE');
      onClose();
    } else if (currentGuide.ctaAction === 'KOREAN' && onNavigateView) {
      onNavigateView('KOREAN');
      onClose();
    } else if (currentGuide.ctaAction === 'MOCK' && onOpenMockTest) {
      onOpenMockTest();
      onClose();
    } else {
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 z-[80] flex items-center justify-center p-2 sm:p-4 bg-slate-950/90 backdrop-blur-md animate-fade-in font-sans">
      <div className="w-full max-w-6xl h-[92vh] bg-slate-900 border border-slate-800 rounded-3xl shadow-2xl flex flex-col overflow-hidden">
        
        {/* Modal Top Navigation Bar */}
        <div className="flex items-center justify-between px-4 sm:px-6 py-3.5 border-b border-slate-800 bg-slate-950/80 gap-3">
          <div className="flex items-center gap-3 min-w-0">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-indigo-600 via-purple-600 to-pink-600 flex items-center justify-center text-white font-black text-xl shadow-glow shrink-0">
              語
            </div>
            <div className="min-w-0">
              <div className="flex items-center gap-2">
                <span className="text-xs sm:text-sm font-black text-white tracking-tight truncate">JakonHub Knowledge Base</span>
                <span className="hidden sm:inline-block px-2 py-0.5 rounded-full bg-indigo-500/20 text-indigo-300 text-[10px] font-bold border border-indigo-500/30">
                  Official Guides &amp; Specs
                </span>
              </div>
              <p className="text-[10px] text-slate-400 truncate">20 Dedicated Information Guides for Japanese &amp; Korean Learners</p>
            </div>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <button
              onClick={onClose}
              className="p-2 rounded-xl bg-slate-800 hover:bg-rose-600 text-slate-300 hover:text-white transition-all cursor-pointer"
              title="Close Guide"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Search & Category Filter Bar */}
        <div className="px-4 sm:px-6 py-3 border-b border-slate-800/80 bg-slate-900 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="relative w-full sm:w-72">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search 20 topics..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-9 pr-3 py-1.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500 transition-all"
            />
          </div>

          {/* Category Tabs */}
          <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar w-full sm:w-auto">
            {[
              { id: 'ALL', label: 'All (20)' },
              { id: 'LANGUAGE', label: '📚 Language' },
              { id: 'VISA', label: '💼 Visas' },
              { id: 'SUPPORT', label: '⏱ Tools' },
              { id: 'LEGAL', label: '🛡 Legal' },
            ].map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id as any)}
                className={`px-3 py-1.5 rounded-xl text-[11px] font-extrabold transition-all whitespace-nowrap cursor-pointer ${
                  activeCategory === cat.id
                    ? 'bg-indigo-600 text-white shadow-glow'
                    : 'bg-slate-950 text-slate-400 hover:text-white border border-slate-800'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* Modal Main Body (Sidebar + Content Pane) */}
        <div className="flex-1 flex overflow-hidden">
          
          {/* Left Sidebar List of Topics */}
          <div className="w-full sm:w-72 md:w-80 border-r border-slate-800 bg-slate-950/60 overflow-y-auto p-2 sm:p-3 space-y-1.5 shrink-0">
            {filteredCatalog.length === 0 ? (
              <div className="text-center py-8 text-xs text-slate-500">No matching guides found</div>
            ) : (
              filteredCatalog.map((guide) => {
                const isSelected = guide.id === selectedId;

                return (
                  <button
                    key={guide.id}
                    onClick={() => setSelectedId(guide.id)}
                    className={`w-full text-left p-3 rounded-2xl transition-all flex items-start gap-3 border group cursor-pointer ${
                      isSelected
                        ? 'bg-gradient-to-r from-indigo-900/60 to-slate-900 border-indigo-500/60 text-white shadow-md'
                        : 'bg-slate-900/50 hover:bg-slate-800/80 border-slate-800/80 text-slate-300 hover:text-white'
                    }`}
                  >
                    <span className="text-xl shrink-0 mt-0.5">{guide.emoji}</span>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between gap-1 mb-0.5">
                        <span className={`text-[9px] font-black uppercase tracking-wider px-1.5 py-0.5 rounded ${
                          guide.category === 'LANGUAGE' ? 'bg-rose-950 text-rose-300 border border-rose-500/20' :
                          guide.category === 'VISA'     ? 'bg-amber-950 text-amber-300 border border-amber-500/20' :
                          guide.category === 'SUPPORT'  ? 'bg-indigo-950 text-indigo-300 border border-indigo-500/20' :
                          'bg-cyan-950 text-cyan-300 border border-cyan-500/20'
                        }`}>
                          {guide.badge}
                        </span>
                      </div>
                      <h4 className="text-xs font-extrabold leading-snug truncate group-hover:text-indigo-300 transition-colors">
                        {guide.title}
                      </h4>
                    </div>
                  </button>
                );
              })
            )}
          </div>

          {/* Right Main Content Display Area */}
          <div className="flex-1 bg-slate-900 p-4 sm:p-8 overflow-y-auto space-y-6">
            {/* Guide Header Banner */}
            <div className="space-y-3 pb-5 border-b border-slate-800">
              <div className="flex items-center gap-2 flex-wrap">
                <span className="text-3xl">{currentGuide.emoji}</span>
                <span className="px-3 py-1 rounded-full bg-indigo-500/20 text-indigo-300 text-xs font-extrabold border border-indigo-500/30">
                  {currentGuide.badge}
                </span>
                <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
                  Category: {currentGuide.category}
                </span>
              </div>

              <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight leading-tight">
                {currentGuide.title}
              </h1>

              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-medium">
                {currentGuide.subtitle}
              </p>
            </div>

            {/* Guide Sections */}
            <div className="space-y-6">
              {currentGuide.sections.map((sec, idx) => (
                <div key={idx} className="space-y-3 bg-slate-950/60 border border-slate-800/80 rounded-2xl p-5 shadow-sm">
                  <h3 className="text-base font-black text-white flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>{sec.heading}</span>
                  </h3>

                  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed whitespace-pre-line">
                    {sec.text}
                  </p>

                  {sec.bullets && sec.bullets.length > 0 && (
                    <ul className="space-y-2 pt-2 border-t border-slate-800/80">
                      {sec.bullets.map((b, bi) => (
                        <li key={bi} className="text-xs text-slate-300 flex items-start gap-2">
                          <span className="w-1.5 h-1.5 rounded-full bg-indigo-400 shrink-0 mt-1.5" />
                          <span>{b}</span>
                        </li>
                      ))}
                    </ul>
                  )}

                  {sec.callout && (
                    <div className="mt-3 p-3 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs font-bold flex items-center gap-2">
                      <Sparkles className="w-4 h-4 shrink-0 text-amber-400" />
                      <span>{sec.callout}</span>
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Bottom Action Footer */}
            <div className="pt-6 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="text-xs text-slate-400 font-mono">
                Verified JakonHub Knowledge Item • Updated 2026
              </div>

              {currentGuide.ctaText && (
                <button
                  onClick={handleCtaClick}
                  className="w-full sm:w-auto px-6 py-3 rounded-2xl bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 hover:from-indigo-500 hover:to-pink-500 text-white font-extrabold text-xs shadow-glow transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  <span>{currentGuide.ctaText}</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              )}
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};
