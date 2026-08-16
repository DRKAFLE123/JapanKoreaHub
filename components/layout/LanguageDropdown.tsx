'use client';
import React, { useState, useRef, useEffect } from 'react';
import { Globe, ChevronDown, Check } from 'lucide-react';
import { useTranslation, LanguageMode } from '@/lib/i18n/LanguageContext';

export default function LanguageDropdown() {
  const { langMode, setLangMode } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const OPTIONS: { id: LanguageMode; label: string; sublabel: string }[] = [
    { id: 'en', label: 'Eng', sublabel: 'English meanings only' },
    { id: 'ne', label: 'Np', sublabel: 'नेपाली अर्थ मात्र' },
    { id: 'both', label: 'Both', sublabel: 'English + नेपाली (Dual)' },
  ];

  const currentOption = OPTIONS.find((opt) => opt.id === langMode) || OPTIONS[2];

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 rounded-full border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-xs font-bold text-slate-700 dark:text-slate-200 hover:border-red-400 hover:shadow-sm transition-all cursor-pointer select-none"
        title="Select Display Language Mode"
      >
        <Globe className="w-4 h-4 text-red-500 shrink-0" />
        <span>{currentOption.label}</span>
        <ChevronDown className={`w-3 h-3 text-slate-400 shrink-0 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {isOpen && (
        <div className="fixed top-14 right-2 w-52 max-w-[calc(100vw-16px)] sm:absolute sm:top-full sm:right-0 sm:mt-2 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-2xl py-2 z-50 animate-in fade-in zoom-in-95 duration-150">
          <div className="px-3.5 py-1.5 mb-1 border-b border-slate-100 dark:border-slate-800">
            <div className="text-[10px] font-extrabold uppercase tracking-wider text-slate-400 dark:text-slate-500">
              Language Mode
            </div>
          </div>
          {OPTIONS.map((opt) => {
            const isSelected = langMode === opt.id;
            return (
              <button
                key={opt.id}
                onClick={() => {
                  setLangMode(opt.id);
                  setIsOpen(false);
                }}
                className={`w-full flex items-center justify-between px-3.5 py-2 text-left text-xs transition-colors cursor-pointer ${
                  isSelected
                    ? 'bg-red-50 dark:bg-red-950/40 text-red-600 dark:text-red-400 font-bold'
                    : 'text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800/60'
                }`}
              >
                <div>
                  <div className="font-extrabold text-xs">{opt.label}</div>
                  <div className="text-[10px] text-slate-400 dark:text-slate-500 font-medium">{opt.sublabel}</div>
                </div>
                {isSelected && <Check className="w-4 h-4 text-red-600 dark:text-red-400 shrink-0" />}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
