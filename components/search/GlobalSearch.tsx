'use client';
import React, { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import {
  Search,
  X,
  Loader2,
  BookOpen,
  ClipboardList,
  Shield,
  FileText,
  Bell,
  Briefcase,
  Home,
  ArrowRight,
  ExternalLink
} from 'lucide-react';

import { searchPlatform, SearchItem } from '@/lib/search-index';
import { useCountry } from '@/lib/context/CountryContext';
import { useBodyScrollLock } from '@/lib/useBodyScrollLock';

interface GlobalSearchProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function GlobalSearch({ isOpen, onClose }: GlobalSearchProps) {
  const router = useRouter();
  const { activeCountry } = useCountry();
  const [query, setQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState<SearchItem[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);

  const countryTarget = activeCountry === 'korea' ? 'korea' : 'japan';

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
      }
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  useBodyScrollLock(isOpen);

  useEffect(() => {
    if (isOpen) {
      const timer = setTimeout(() => {
        try {
          inputRef.current?.focus({ preventScroll: true });
        } catch {}
      }, 50);
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  useEffect(() => {
    if (query.trim().length >= 2) {
      setLoading(true);
      const searchResults = searchPlatform(query);
      setResults(searchResults);
      setLoading(false);
    } else {
      setResults([]);
      setLoading(false);
    }
  }, [query]);

  if (!isOpen) return null;

  const handleNavigate = (path: string, e?: React.MouseEvent) => {
    if (e) {
      e.stopPropagation();
    }
    onClose();
    router.push(path);
  };

  const directSections = [
    {
      label: 'Jobs',
      href: `/${countryTarget}/jobs`,
      icon: Briefcase,
      color: 'bg-indigo-50 text-indigo-700 hover:bg-indigo-100 border-indigo-200/90 active:bg-indigo-200',
    },
    {
      label: 'Rooms',
      href: `/${countryTarget}/rooms`,
      icon: Home,
      color: 'bg-purple-50 text-purple-700 hover:bg-purple-100 border-purple-200/90 active:bg-purple-200',
    },
    {
      label: 'Learn',
      href: `/${countryTarget}/learn`,
      icon: BookOpen,
      color: 'bg-emerald-50 text-emerald-700 hover:bg-emerald-100 border-emerald-200/90 active:bg-emerald-200',
    },
    {
      label: 'Exams',
      href: `/${countryTarget}/exams`,
      icon: ClipboardList,
      color: 'bg-amber-50 text-amber-700 hover:bg-amber-100 border-amber-200/90 active:bg-amber-200',
    },
    {
      label: 'Visa',
      href: `/${countryTarget}/visa`,
      icon: Shield,
      color: 'bg-blue-50 text-blue-700 hover:bg-blue-100 border-blue-200/90 active:bg-blue-200',
    },
  ];

  return (
    <div className="fixed inset-0 z-[100] flex items-start justify-center pt-2 sm:pt-14 px-2 sm:px-3 pb-20 overflow-y-auto font-sans">
      {/* Dimmed Backdrop */}
      <div
        className="fixed inset-0 bg-slate-950/60 backdrop-blur-xs transition-opacity animate-fade-in"
        onClick={() => onClose()}
      />

      {/* Modal Dialog Card */}
      <div
        className="relative z-10 w-full max-w-2xl bg-white rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[85vh] border border-slate-200 animate-slide-up sm:animate-fade-in my-auto sm:my-0"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Search Input Bar */}
        <div className="flex items-center px-3.5 sm:px-4 py-3 sm:py-3.5 border-b border-slate-100 bg-white">
          <Search className="w-5 h-5 text-slate-400 shrink-0 pointer-events-none" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search lessons, jobs, rooms, visas..."
            className="flex-1 min-w-0 bg-transparent border-none px-3 py-1 text-sm sm:text-base text-slate-900 focus:ring-0 focus:outline-none placeholder-slate-400 font-medium"
          />
          {loading ? (
            <Loader2 className="w-5 h-5 text-slate-400 animate-spin shrink-0" />
          ) : query.length > 0 ? (
            <button
              type="button"
              onClick={() => setQuery('')}
              className="p-1 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors mr-1 cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          ) : null}
          <button
            type="button"
            onClick={() => onClose()}
            className="px-2.5 py-1 text-xs font-bold text-slate-500 hover:text-slate-800 bg-slate-100 hover:bg-slate-200 rounded-xl transition-colors cursor-pointer"
          >
            Esc
          </button>
        </div>

        {/* Quick Direct Section Navigation Pills (Instantly navigates to respective section) */}
        <div className="flex items-center gap-1.5 px-3 py-2 bg-slate-50/90 border-b border-slate-100 overflow-x-auto no-scrollbar">
          <span className="text-[10px] font-black uppercase tracking-wider text-slate-400 px-1 shrink-0">
            Go to:
          </span>
          {directSections.map(({ label, href, icon: Icon, color }) => (
            <button
              key={label}
              type="button"
              onClick={(e) => handleNavigate(href, e)}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold border transition-all shrink-0 cursor-pointer shadow-2xs ${color}`}
            >
              <Icon className="w-3.5 h-3.5" />
              <span>{label}</span>
              <ExternalLink className="w-2.5 h-2.5 opacity-60 ml-0.5" />
            </button>
          ))}
        </div>

        {/* Results & Quick Discovery Area */}
        <div className="flex-1 overflow-y-auto p-2.5 sm:p-3 space-y-1">
          {query.length > 0 && results.length === 0 && !loading && (
            <div className="py-12 text-center text-slate-500">
              <p className="text-sm font-semibold">No results found for &ldquo;{query}&rdquo;</p>
              <p className="text-xs text-slate-400 mt-1">Try searching for Jobs, Rooms, JLPT, or SSW Visas</p>
            </div>
          )}

          {/* If no query, show direct jump cards and popular searches */}
          {query.length === 0 && (
            <div className="py-3 px-1 space-y-4">
              {/* Main Quick Navigation Cards */}
              <div>
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-wider mb-2 px-1">
                  Featured Sections
                </p>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={(e) => handleNavigate(`/${countryTarget}/jobs`, e)}
                    className="flex items-center gap-2.5 p-3 rounded-2xl bg-indigo-50/70 hover:bg-indigo-100 border border-indigo-100 text-indigo-950 transition-colors group cursor-pointer text-left"
                  >
                    <div className="w-9 h-9 rounded-xl bg-indigo-600 text-white flex items-center justify-center shrink-0 shadow-xs group-hover:scale-105 transition-transform">
                      <Briefcase className="w-4 h-4" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="text-xs font-bold flex items-center justify-between">
                        <span>Jobs Portal</span>
                        <ArrowRight className="w-3 h-3 text-indigo-400 group-hover:translate-x-0.5 transition-transform" />
                      </div>
                      <div className="text-[10px] text-indigo-600/80 truncate">Browse vacancies</div>
                    </div>
                  </button>

                  <button
                    type="button"
                    onClick={(e) => handleNavigate(`/${countryTarget}/rooms`, e)}
                    className="flex items-center gap-2.5 p-3 rounded-2xl bg-purple-50/70 hover:bg-purple-100 border border-purple-100 text-purple-950 transition-colors group cursor-pointer text-left"
                  >
                    <div className="w-9 h-9 rounded-xl bg-purple-600 text-white flex items-center justify-center shrink-0 shadow-xs group-hover:scale-105 transition-transform">
                      <Home className="w-4 h-4" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="text-xs font-bold flex items-center justify-between">
                        <span>Rooms Portal</span>
                        <ArrowRight className="w-3 h-3 text-purple-400 group-hover:translate-x-0.5 transition-transform" />
                      </div>
                      <div className="text-[10px] text-purple-600/80 truncate">Apartments & Goshiwon</div>
                    </div>
                  </button>
                </div>
              </div>

              {/* Popular Searches */}
              <div>
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-wider mb-2 px-1">
                  Popular Searches
                </p>
                <div className="flex flex-wrap gap-1.5">
                  {[
                    { label: '💼 Jobs in Japan', q: 'Jobs' },
                    { label: '🏠 Rooms in Tokyo', q: 'Rooms' },
                    { label: '🇰🇷 Korea Jobs (Alba)', q: 'Korea Jobs' },
                    { label: '🏠 Korea Goshiwon', q: 'Korea Rooms' },
                    { label: '📖 JLPT N5', q: 'JLPT N5' },
                    { label: '📋 EPS-TOPIK', q: 'EPS-TOPIK' },
                    { label: '🛡️ SSW Visa', q: 'SSW Visa' },
                    { label: '🎌 Minna no Nihongo', q: 'Minna' }
                  ].map(({ label, q }) => (
                    <button
                      key={label}
                      type="button"
                      onClick={() => setQuery(q)}
                      className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 border border-slate-200/80 text-xs font-semibold text-slate-700 rounded-full transition-colors cursor-pointer"
                    >
                      {label}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Results List */}
          {results.length > 0 && (
            <div className="space-y-1">
              {results.map((res) => {
                let Icon = BookOpen;
                let badgeColor = 'bg-blue-100 text-blue-800';

                if (res.category === 'Jobs') {
                  Icon = Briefcase;
                  badgeColor = 'bg-indigo-100 text-indigo-800';
                } else if (res.category === 'Rooms') {
                  Icon = Home;
                  badgeColor = 'bg-purple-100 text-purple-800';
                } else if (res.category === 'Exam') {
                  Icon = ClipboardList;
                  badgeColor = 'bg-amber-100 text-amber-800';
                } else if (res.category === 'Visa') {
                  Icon = Shield;
                  badgeColor = 'bg-emerald-100 text-emerald-800';
                } else if (res.category === 'Notice') {
                  Icon = Bell;
                  badgeColor = 'bg-rose-100 text-rose-800';
                } else if (res.category === 'Consultancy') {
                  Icon = FileText;
                  badgeColor = 'bg-cyan-100 text-cyan-800';
                }

                return (
                  <button
                    key={res.id}
                    type="button"
                    onClick={(e) => handleNavigate(res.href, e)}
                    className="w-full flex items-center gap-3 px-3 py-2.5 rounded-2xl hover:bg-slate-100 active:bg-slate-200 transition-colors group border border-transparent hover:border-slate-200 text-left cursor-pointer"
                  >
                    <div className="w-10 h-10 rounded-xl bg-slate-100 flex items-center justify-center shrink-0 group-hover:bg-white group-hover:shadow-xs border border-slate-200/70 transition-all">
                      <Icon className="w-5 h-5 text-slate-700" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <p className="font-bold text-xs sm:text-sm text-slate-900 truncate group-hover:text-indigo-600 transition-colors">
                          {res.title}
                        </p>
                      </div>
                      <p className="text-[11px] text-slate-500 truncate mt-0.5">
                        {res.description}
                      </p>
                      <div className="flex items-center gap-2 mt-1">
                        <span className={`text-[9px] font-black px-1.5 py-0.5 rounded-md uppercase tracking-wider ${badgeColor}`}>
                          {res.category}
                        </span>
                        <span className="text-[10px] text-slate-400 font-medium">
                          {res.country === 'japan' ? '🇯🇵 Japan' : res.country === 'korea' ? '🇰🇷 Korea' : '🌏 Global'}
                        </span>
                      </div>
                    </div>
                    <ArrowRight className="w-4 h-4 text-slate-300 group-hover:text-slate-600 group-hover:translate-x-0.5 transition-all shrink-0" />
                  </button>
                );
              })}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="px-4 py-2.5 bg-slate-50 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-500">
          <span className="flex items-center gap-1.5">
            <kbd className="px-1.5 py-0.5 bg-white border border-slate-200 rounded font-sans text-[10px] font-bold shadow-2xs">Esc</kbd>
            <span>to close</span>
          </span>
          <span className="text-slate-400 font-medium">
            Tap any section or result to open immediately
          </span>
        </div>
      </div>
    </div>
  );
}
