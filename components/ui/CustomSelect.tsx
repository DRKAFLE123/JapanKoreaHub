'use client';
import React, { useState, useRef, useEffect } from 'react';
import { ChevronDown, Check } from 'lucide-react';

export interface SelectOption<T = string | number> {
  value: T;
  label: string;
  badge?: string;
}

interface CustomSelectProps<T = string | number> {
  value: T;
  onChange: (val: T) => void;
  options: SelectOption<T>[];
  placeholder?: string;
  className?: string;
  buttonClassName?: string;
  accentColor?: 'purple' | 'indigo' | 'rose' | 'red' | 'emerald';
  disabled?: boolean;
}

export default function CustomSelect<T extends string | number>({
  value,
  onChange,
  options,
  placeholder = 'Select option...',
  className = '',
  buttonClassName = '',
  accentColor = 'purple',
  disabled = false,
}: CustomSelectProps<T>) {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent | TouchEvent) {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      document.addEventListener('touchstart', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('touchstart', handleClickOutside);
    };
  }, [isOpen]);

  // Handle ESC key to close
  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === 'Escape') {
        setIsOpen(false);
      }
    }
    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen]);

  const selectedOption = options.find((opt) => opt.value === value);

  const getAccentClasses = () => {
    switch (accentColor) {
      case 'indigo':
        return {
          focusRing: 'focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500',
          selectedBg: 'bg-indigo-50 text-indigo-700 font-bold',
          checkColor: 'text-indigo-600',
          hoverBg: 'hover:bg-indigo-50/70',
        };
      case 'rose':
      case 'red':
        return {
          focusRing: 'focus:border-red-500 focus:ring-1 focus:ring-red-500',
          selectedBg: 'bg-red-50 text-red-700 font-bold',
          checkColor: 'text-red-600',
          hoverBg: 'hover:bg-red-50/70',
        };
      case 'emerald':
        return {
          focusRing: 'focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500',
          selectedBg: 'bg-emerald-50 text-emerald-700 font-bold',
          checkColor: 'text-emerald-600',
          hoverBg: 'hover:bg-emerald-50/70',
        };
      case 'purple':
      default:
        return {
          focusRing: 'focus:border-purple-500 focus:ring-1 focus:ring-purple-500',
          selectedBg: 'bg-purple-50 text-purple-700 font-bold',
          checkColor: 'text-purple-600',
          hoverBg: 'hover:bg-purple-50/70',
        };
    }
  };

  const accents = getAccentClasses();

  return (
    <div className={`relative w-full ${className}`} ref={containerRef}>
      <button
        type="button"
        disabled={disabled}
        onClick={() => setIsOpen(!isOpen)}
        className={`w-full px-3 py-2 rounded-xl border border-slate-200 text-xs font-medium text-slate-900 bg-slate-50 hover:bg-slate-100/80 transition-all flex items-center justify-between gap-2 cursor-pointer text-left select-none ${accents.focusRing} ${
          isOpen ? 'border-slate-400 bg-white shadow-xs ring-1 ring-slate-200' : ''
        } ${disabled ? 'opacity-50 cursor-not-allowed' : ''} ${buttonClassName}`}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
      >
        <span className="truncate">
          {selectedOption ? selectedOption.label : placeholder}
        </span>
        <ChevronDown
          className={`w-3.5 h-3.5 text-slate-400 shrink-0 transition-transform duration-200 ${
            isOpen ? 'rotate-180 text-slate-700' : ''
          }`}
        />
      </button>

      {isOpen && (
        <div
          role="listbox"
          className="absolute left-0 right-0 top-full mt-1.5 z-50 bg-white rounded-xl border border-slate-200 shadow-xl overflow-hidden py-1 max-h-60 overflow-y-auto animate-in fade-in zoom-in-95 duration-100"
          style={{ minWidth: '100%' }}
        >
          {options.map((opt) => {
            const isSelected = opt.value === value;
            return (
              <button
                key={String(opt.value)}
                type="button"
                role="option"
                aria-selected={isSelected}
                onClick={() => {
                  onChange(opt.value);
                  setIsOpen(false);
                }}
                className={`w-full flex items-center justify-between px-3 py-2 text-xs transition-colors cursor-pointer text-left select-none ${
                  isSelected
                    ? accents.selectedBg
                    : `text-slate-700 ${accents.hoverBg} hover:text-slate-900`
                }`}
              >
                <div className="flex items-center gap-1.5 truncate pr-1">
                  <span className="truncate">{opt.label}</span>
                  {opt.badge && (
                    <span className="px-1.5 py-0.5 rounded text-[9px] font-bold bg-slate-100 text-slate-600 shrink-0">
                      {opt.badge}
                    </span>
                  )}
                </div>
                {isSelected && (
                  <Check className={`w-3.5 h-3.5 ${accents.checkColor} shrink-0 ml-1`} />
                )}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
