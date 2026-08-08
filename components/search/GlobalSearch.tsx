'use client';
import React, { useState, useEffect, useRef } from 'react';
import { Search, X, Loader2, BookOpen, ClipboardList, Shield, FileText, Bell } from 'lucide-react';
import Link from 'next/link';

import { searchPlatform, SearchItem } from '@/lib/search-index';

interface GlobalSearchProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function GlobalSearch({ isOpen, onClose }: GlobalSearchProps) {
  const [query, setQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState<SearchItem[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);

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

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 100);
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [isOpen]);

  useEffect(() => {
    if (query.trim().length < 2) {
      setResults([]);
      setLoading(false);
      return;
    }

    setLoading(true);
    const searchResults = searchPlatform(query);
    setResults(searchResults);
    setLoading(false);
  }, [query]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-4 md:pt-20 px-4 pb-20 bg-slate-900/40 backdrop-blur-sm animate-fade-in">
      <div className="absolute inset-0" onClick={onClose} />
      
      <div className="relative w-full max-w-2xl bg-white rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[80vh] animate-slide-up md:animate-fade-in">
        {/* Search Input */}
        <div className="flex items-center px-4 py-3 border-b border-gray-100">
          <Search className="w-5 h-5 text-gray-400 flex-shrink-0" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search lessons, visas, notices..."
            className="flex-1 min-w-0 bg-transparent border-none px-3 py-2 text-base text-gray-900 focus:ring-0 focus:outline-none placeholder-gray-400"
          />
          {loading ? (
            <Loader2 className="w-5 h-5 text-gray-400 animate-spin flex-shrink-0" />
          ) : (
            <button onClick={onClose} className="p-1 rounded-md text-gray-400 hover:text-gray-600 hover:bg-gray-100 transition-colors">
              <X className="w-5 h-5" />
            </button>
          )}
        </div>

        {/* Results */}
        <div className="flex-1 overflow-y-auto p-2">
          {query.length > 0 && results.length === 0 && !loading && (
            <div className="py-12 text-center text-sm text-gray-500">
              No results found for "{query}"
            </div>
          )}

          {query.length === 0 && (
            <div className="py-8 px-4 text-center">
              <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-4">Popular Searches</p>
              <div className="flex flex-wrap justify-center gap-2">
                {['JLPT N5', 'EPS-TOPIK', 'SSW Visa', 'Student Visa', 'Korean Grammar'].map(term => (
                  <button
                    key={term}
                    onClick={() => setQuery(term)}
                    className="px-3 py-1.5 bg-gray-50 border border-gray-200 text-sm text-gray-700 rounded-full hover:bg-gray-100 transition-colors"
                  >
                    {term}
                  </button>
                ))}
              </div>
            </div>
          )}

          {results.length > 0 && (
            <div className="space-y-1">
              {results.map((res) => {
                let Icon = BookOpen;
                if (res.category === 'Exam') Icon = ClipboardList;
                if (res.category === 'Visa') Icon = Shield;
                if (res.category === 'Notice') Icon = Bell;
                if (res.category === 'Consultancy') Icon = FileText;

                return (
                  <Link
                    key={res.id}
                    href={res.href}
                    onClick={onClose}
                    className="flex items-center gap-3 px-3 py-3 rounded-xl hover:bg-gray-50 transition-colors group"
                  >
                    <div className="w-10 h-10 rounded-lg bg-gray-100 flex items-center justify-center flex-shrink-0 group-hover:bg-white group-hover:shadow-sm border border-transparent group-hover:border-gray-200 transition-all">
                      <Icon className="w-5 h-5 text-gray-500" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <p className="font-semibold text-sm text-gray-900 truncate">{res.title}</p>
                        {res.titleNe && (
                          <span className="text-xs text-gray-400 font-ne truncate">({res.titleNe})</span>
                        )}
                      </div>
                      <div className="flex items-center gap-2 mt-0.5">
                        <span className="text-[10px] font-semibold text-gray-500 uppercase tracking-wider">{res.category}</span>
                        <span className="w-1 h-1 rounded-full bg-gray-300" />
                        <span className="text-xs text-gray-500">
                          {res.country === 'japan' ? '🇯🇵 Japan' : res.country === 'korea' ? '🇰🇷 Korea' : '🌏 Global'}
                        </span>
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>
          )}
        </div>
        
        {/* Footer */}
        <div className="px-4 py-2 bg-gray-50 border-t border-gray-100 flex items-center justify-between text-xs text-gray-500">
          <span className="flex items-center gap-1"><kbd className="px-1.5 py-0.5 bg-white border border-gray-200 rounded font-sans shadow-sm">↑</kbd><kbd className="px-1.5 py-0.5 bg-white border border-gray-200 rounded font-sans shadow-sm">↓</kbd> to navigate</span>
          <span className="flex items-center gap-1"><kbd className="px-1.5 py-0.5 bg-white border border-gray-200 rounded font-sans shadow-sm">Enter</kbd> to select</span>
        </div>
      </div>
    </div>
  );
}
