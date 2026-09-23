'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { X, Bell, ExternalLink, ArrowRight, ShieldCheck, Calendar, Sparkles } from 'lucide-react';
import { useTranslation } from '@/lib/i18n/LanguageContext';

interface NoticeItem {
  id: string;
  title: string;
  titleNe?: string;
  body: string;
  bodyNe?: string;
  category: string;
  country: string;
  sourceType?: string;
  sourceLabel?: string;
  sourceUrl?: string;
  isPinned: boolean;
  publishedAt: string;
}

export default function LandingNoticeModal() {
  const [notice, setNotice] = useState<NoticeItem | null>(null);
  const [isOpen, setIsOpen] = useState(false);
  const { lang } = useTranslation();
  const isNe = lang === 'ne';

  useEffect(() => {
    // Fetch latest active/pinned notice
    let isMounted = true;

    async function checkLatestNotice() {
      try {
        const res = await fetch('/api/notices?limit=3');
        if (!res.ok) return;
        const data = await res.json();
        const list: NoticeItem[] = data.notices || (Array.isArray(data) ? data : []);

        if (list.length === 0) return;

        // Pick top pinned notice or newest
        const topNotice = list.find((n) => n.isPinned) || list[0];
        if (!topNotice) return;

        // Check if already dismissed in localStorage
        const dismissed = localStorage.getItem(`jkh_dismissed_notice_${topNotice.id}`);
        if (!dismissed && isMounted) {
          setNotice(topNotice);
          // Smooth slight delay for clean page load
          const timer = setTimeout(() => {
            if (isMounted) setIsOpen(true);
          }, 900);
          return () => clearTimeout(timer);
        }
      } catch {}
    }

    checkLatestNotice();

    return () => {
      isMounted = false;
    };
  }, []);

  const handleDismiss = () => {
    if (notice) {
      try {
        localStorage.setItem(`jkh_dismissed_notice_${notice.id}`, 'true');
      } catch {}
    }
    setIsOpen(false);
  };

  if (!isOpen || !notice) return null;

  const isJapan = notice.country === 'JAPAN';
  const isKorea = notice.country === 'KOREA';

  const displayTitle = isNe && notice.titleNe ? notice.titleNe : notice.title;
  const displayBody = isNe && notice.bodyNe ? notice.bodyNe : notice.body;

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 z-[100] bg-slate-950/50 backdrop-blur-xs transition-opacity duration-300 animate-in fade-in"
        onClick={handleDismiss}
      />

      {/* Dialog Container */}
      <div className="fixed inset-0 z-[110] overflow-y-auto flex items-center justify-center p-4 sm:p-6 pointer-events-none">
        <div
          role="dialog"
          aria-modal="true"
          className="w-full max-w-lg bg-white rounded-3xl border border-slate-200/90 shadow-2xl overflow-hidden pointer-events-auto my-auto animate-in zoom-in-95 duration-200 font-sans"
        >
          {/* Header Banner */}
          <div className="p-5 sm:p-6 border-b border-slate-100 relative bg-gradient-to-br from-rose-50/70 via-white to-indigo-50/40">
            {/* Close / Cut Button */}
            <button
              onClick={handleDismiss}
              className="absolute top-4 right-4 p-2 rounded-full bg-white/90 hover:bg-slate-100 text-slate-400 hover:text-slate-800 transition-colors cursor-pointer border border-slate-200/80 shadow-2xs"
              title="Close announcement"
              aria-label="Close"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="flex flex-wrap items-center gap-2 mb-3 pr-10">
              {/* Category Pill */}
              <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-rose-100/80 text-rose-800 text-[11px] font-black border border-rose-200/80">
                <span className="w-1.5 h-1.5 rounded-full bg-rose-600 animate-pulse" />
                <span>{isNe ? 'आधिकारिक सूचना' : 'OFFICIAL NOTICE'}</span>
              </span>

              {/* Country Pill */}
              <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-700 text-[11px] font-bold border border-slate-200/80">
                <span>{isJapan ? '🇯🇵 Japan' : isKorea ? '🇰🇷 Korea' : '🌐 General'}</span>
              </span>
            </div>

            {/* Title */}
            <h2 className="text-base sm:text-lg font-black text-slate-900 leading-snug tracking-tight">
              {displayTitle}
            </h2>

            {/* Source Tag */}
            {notice.sourceLabel && (
              <div className="flex items-center gap-1.5 mt-2.5 text-[11px] text-slate-500 font-medium">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                <span className="truncate">{notice.sourceLabel}</span>
              </div>
            )}
          </div>

          {/* Body Content */}
          <div className="p-5 sm:p-6 space-y-4">
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed whitespace-pre-line font-normal">
              {displayBody}
            </p>

            {/* Secondary Nepali / English Sub-snippet */}
            {!isNe && notice.titleNe && (
              <div className="p-3 rounded-2xl bg-slate-50 border border-slate-200/70 text-xs text-slate-600">
                <span className="font-bold text-slate-800 block mb-0.5">नेपाली सारांश:</span>
                <span>{notice.titleNe}</span>
              </div>
            )}

            {/* Action Buttons */}
            <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-2.5">
              <button
                type="button"
                onClick={handleDismiss}
                className="w-full sm:w-auto px-4 py-2.5 rounded-xl text-xs font-bold text-slate-500 hover:text-slate-800 hover:bg-slate-100 transition-colors cursor-pointer text-center"
              >
                {isNe ? 'फेरि नदेखाउनुहोस्' : "Don't show again"}
              </button>

              <div className="flex items-center gap-2 w-full sm:w-auto">
                <Link
                  href={notice.sourceUrl || '/notices'}
                  onClick={handleDismiss}
                  className="flex-1 sm:flex-none px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-extrabold shadow-sm transition-all flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <span>{isNe ? 'पूरा सूचना हेर्नुहोस्' : 'Read Full Notice'}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
