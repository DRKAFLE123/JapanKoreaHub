'use client';
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Bell, ArrowLeft, ExternalLink, Calendar, ShieldCheck, Filter, Plus, X } from 'lucide-react';
import MobileNavbar from '@/components/layout/MobileNavbar';
import BottomTabBar from '@/components/layout/BottomTabBar';

interface Notice {
  id: string;
  title: string;
  titleNe?: string;
  body: string;
  bodyNe?: string;
  category: 'VISA_UPDATE' | 'VACANCY' | 'EXAM_SCHEDULE' | 'PLATFORM';
  country: 'JAPAN' | 'KOREA' | 'BOTH';
  sourceType: 'OFFICIAL_GOVERNMENT' | 'EXAM_BODY' | 'EMBASSY' | 'PARTNER' | 'JAPANKOREAHUB';
  sourceLabel?: string;
  sourceUrl?: string;
  isPinned: boolean;
  expiresAt?: string;
  lastVerifiedAt?: string;
  publishedAt: string;
}

const CATEGORY_COLORS: Record<string, string> = {
  VISA_UPDATE: 'bg-amber-100 text-amber-800 border-amber-200',
  VACANCY: 'bg-emerald-100 text-emerald-800 border-emerald-200',
  EXAM_SCHEDULE: 'bg-blue-100 text-blue-800 border-blue-200',
  PLATFORM: 'bg-purple-100 text-purple-800 border-purple-200',
};

const SOURCE_TYPE_LABELS: Record<string, string> = {
  OFFICIAL_GOVERNMENT: '🏛️ Official Government',
  EXAM_BODY: '📝 Exam Board',
  EMBASSY: '🏢 Embassy Notice',
  PARTNER: '🤝 Partner Agency',
  JAPANKOREAHUB: '🌐 JapanKoreaHub',
};

export default function NoticesClient() {
  const [notices, setNotices] = useState<Notice[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCountry, setSelectedCountry] = useState<'ALL' | 'JAPAN' | 'KOREA'>('ALL');
  const [selectedCategory, setSelectedCategory] = useState<string>('ALL');

  // Admin Notice Creation State
  const [isAdmin, setIsAdmin] = useState(false);
  const [showNoticeModal, setShowNoticeModal] = useState(false);
  const [noticeTitle, setNoticeTitle] = useState('');
  const [noticeTitleNe, setNoticeTitleNe] = useState('');
  const [noticeBody, setNoticeBody] = useState('');
  const [noticeCategory, setNoticeCategory] = useState<'VISA_UPDATE' | 'VACANCY' | 'EXAM_SCHEDULE' | 'PLATFORM'>('VISA_UPDATE');
  const [noticeCountry, setNoticeCountry] = useState<'JAPAN' | 'KOREA' | 'BOTH'>('JAPAN');
  const [noticeSourceType, setNoticeSourceType] = useState<'OFFICIAL_GOVERNMENT' | 'EXAM_BODY' | 'EMBASSY' | 'PARTNER' | 'JAPANKOREAHUB'>('OFFICIAL_GOVERNMENT');
  const [noticeSourceUrl, setNoticeSourceUrl] = useState('');
  const [noticeIsPinned, setNoticeIsPinned] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    fetch('/api/auth/me')
      .then(res => res.json())
      .then(data => {
        if (data.authenticated && data.user?.role === 'ADMIN') {
          setIsAdmin(true);
        }
      })
      .catch(() => {});
  }, []);

  useEffect(() => {
    setLoading(true);
    let url = '/api/notices';
    const params = new URLSearchParams();
    if (selectedCountry !== 'ALL') params.append('country', selectedCountry);
    if (selectedCategory !== 'ALL') params.append('category', selectedCategory);
    if (params.toString()) url += `?${params.toString()}`;

    fetch(url)
      .then(res => res.json())
      .then(data => {
        if (data.notices) setNotices(data.notices);
      })
      .catch(err => console.error(err))
      .finally(() => setLoading(false));
  }, [selectedCountry, selectedCategory]);

  const isExpired = (expiresAt?: string) => {
    if (!expiresAt) return false;
    return new Date(expiresAt) < new Date();
  };

  const handleCreateNotice = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!noticeTitle.trim() || !noticeBody.trim()) return;

    setIsSubmitting(true);
    try {
      const res = await fetch('/api/notices', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title: noticeTitle,
          titleNe: noticeTitleNe,
          body: noticeBody,
          category: noticeCategory,
          country: noticeCountry,
          sourceType: noticeSourceType,
          sourceUrl: noticeSourceUrl,
          isPinned: noticeIsPinned,
        }),
      });
      const data = await res.json();
      if (data.notice) {
        setNotices([data.notice, ...notices]);
        setShowNoticeModal(false);
        setNoticeTitle(''); setNoticeTitleNe(''); setNoticeBody(''); setNoticeSourceUrl('');
      }
    } catch (err) {
      console.error(err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-white pb-24">
      <MobileNavbar user={null} lang="en" onLangToggle={() => {}} onSearchOpen={() => {}} />

      <main className="pt-14 max-w-4xl mx-auto">
        {/* Breadcrumb */}
        <div className="px-4 pt-4 pb-2">
          <Link href="/" className="inline-flex items-center gap-1 text-sm text-gray-500 hover:text-gray-700 transition-colors">
            <ArrowLeft className="w-3.5 h-3.5" />
            Home
          </Link>
        </div>

        {/* Header */}
        <section className="px-4 py-4 flex items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="w-9 h-9 rounded-xl bg-amber-100 flex items-center justify-center">
              <Bell className="w-5 h-5 text-amber-700" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Official Notices &amp; Announcements</h1>
              <p className="text-sm text-gray-500">Verified updates for Japan and Korea</p>
            </div>
          </div>

          {isAdmin && (
            <button
              onClick={() => setShowNoticeModal(true)}
              className="px-3.5 py-2 rounded-xl bg-amber-600 hover:bg-amber-500 text-white text-xs font-bold flex items-center gap-1.5 shadow-xs transition-colors shrink-0 cursor-pointer"
            >
              <Plus className="w-4 h-4" />
              <span>Post Official Notice</span>
            </button>
          )}
        </section>

        {/* Filter chips (Notice hub allows cross-country filtering) */}
        <section className="px-4 pb-4">
          <div className="flex flex-wrap items-center gap-2 pb-2">
            <div className="flex items-center gap-1 text-xs font-semibold text-gray-400 mr-1">
              <Filter className="w-3.5 h-3.5" /> Country:
            </div>
            {(['ALL', 'JAPAN', 'KOREA'] as const).map(c => (
              <button
                key={c}
                onClick={() => setSelectedCountry(c)}
                className={`px-3 py-1 rounded-full text-xs font-semibold transition-colors ${
                  selectedCountry === c
                    ? 'bg-gray-900 text-white'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                {c === 'ALL' ? '🌏 All Countries' : c === 'JAPAN' ? '🇯🇵 Japan' : '🇰🇷 Korea'}
              </button>
            ))}
          </div>

          <div className="flex flex-wrap items-center gap-2 pt-1 border-t border-gray-100">
            <div className="flex items-center gap-1 text-xs font-semibold text-gray-400 mr-1">
              Category:
            </div>
            {[
              { id: 'ALL', label: 'All' },
              { id: 'VISA_UPDATE', label: 'Visa Updates' },
              { id: 'EXAM_SCHEDULE', label: 'Exam Schedules' },
              { id: 'VACANCY', label: 'Vacancies' },
              { id: 'PLATFORM', label: 'Platform' },
            ].map(cat => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-2.5 py-1 rounded-lg text-xs font-medium transition-colors ${
                  selectedCategory === cat.id
                    ? 'bg-blue-100 text-blue-800 font-semibold'
                    : 'bg-gray-50 text-gray-600 hover:bg-gray-100'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </section>

        {/* Notice List */}
        <section className="px-4 pb-8 space-y-3">
          {loading ? (
            <div className="py-12 text-center text-sm text-gray-400">Loading verified notices...</div>
          ) : notices.length === 0 ? (
            <div className="py-12 text-center card p-6">
              <Bell className="w-8 h-8 text-gray-300 mx-auto mb-2" />
              <p className="font-semibold text-gray-700">No notices found</p>
              <p className="text-xs text-gray-400 mt-1">Try resetting filters to see all announcements</p>
            </div>
          ) : (
            notices.map(notice => {
              const expired = isExpired(notice.expiresAt);
              return (
                <div
                  key={notice.id}
                  className={`card p-4 transition-all ${
                    notice.isPinned ? 'border-amber-200 bg-amber-50/30' : ''
                  } ${expired ? 'opacity-70 bg-gray-50' : ''}`}
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex flex-wrap items-center gap-2 mb-1.5">
                      {notice.isPinned && (
                        <span className="text-[10px] font-extrabold tracking-wider px-2 py-0.5 rounded bg-amber-500 text-white uppercase">
                          PINNED
                        </span>
                      )}
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded border ${CATEGORY_COLORS[notice.category] || 'bg-gray-100 text-gray-700'}`}>
                        {notice.category.replace('_', ' ')}
                      </span>
                      <span className="text-xs">
                        {notice.country === 'JAPAN' ? '🇯🇵 Japan' : notice.country === 'KOREA' ? '🇰🇷 Korea' : '🌏 Both'}
                      </span>
                      {expired && (
                        <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-gray-200 text-gray-600">
                          CLOSED / EXPIRED
                        </span>
                      )}
                    </div>
                  </div>

                  <Link href={`/notices/${notice.id}`} className="group">
                    <h2 className="text-base font-bold text-gray-900 group-hover:text-blue-600 transition-colors">
                      {notice.title}
                    </h2>
                    {notice.titleNe && (
                      <p className="text-xs text-gray-500 font-ne mt-0.5">{notice.titleNe}</p>
                    )}
                  </Link>

                  <p className="text-sm text-gray-600 mt-2 line-clamp-2 leading-relaxed">
                    {notice.body}
                  </p>

                  <div className="flex flex-wrap items-center justify-between gap-2 mt-4 pt-3 border-t border-gray-100 text-xs text-gray-400">
                    <div className="flex items-center gap-3">
                      <span className="font-medium text-gray-600">
                        {SOURCE_TYPE_LABELS[notice.sourceType] || notice.sourceType}
                      </span>
                      {notice.lastVerifiedAt && (
                        <span className="flex items-center gap-1 text-gray-400">
                          <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
                          Verified: {new Date(notice.lastVerifiedAt).toLocaleDateString()}
                        </span>
                      )}
                    </div>

                    <Link
                      href={`/notices/${notice.id}`}
                      className="text-xs font-semibold text-blue-600 hover:underline flex items-center gap-1"
                    >
                      Read full notice →
                    </Link>
                  </div>
                </div>
              );
            })
          )}
        </section>
      </main>

      {/* CREATE NOTICE MODAL FOR ADMIN */}
      {showNoticeModal && (
        <div className="fixed inset-0 z-[95] flex items-center justify-center p-3 sm:p-6 bg-slate-900/60 backdrop-blur-xs animate-fade-in font-sans">
          <div className="w-full max-w-xl max-h-[90vh] bg-white border border-slate-200 rounded-3xl shadow-2xl flex flex-col overflow-hidden text-slate-900">
            
            <div className="flex items-center justify-between px-6 py-4 border-b border-slate-200 bg-amber-50/50">
              <h3 className="text-base font-black text-slate-900 flex items-center gap-2">
                <Bell className="w-5 h-5 text-amber-600" /> Post New Official Notice
              </h3>
              <button
                onClick={() => setShowNoticeModal(false)}
                className="p-1.5 rounded-xl bg-slate-200 text-slate-500 hover:text-slate-900"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreateNotice} className="p-6 overflow-y-auto space-y-4 text-xs">
              <div className="space-y-1">
                <label className="font-bold text-slate-700">Notice Title (English) *</label>
                <input
                  type="text" required
                  placeholder="e.g., HRD Korea E-9 Roster Allocation Notice 2026..."
                  value={noticeTitle} onChange={(e) => setNoticeTitle(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-slate-900 focus:outline-none focus:border-amber-500"
                />
              </div>

              <div className="space-y-1">
                <label className="font-bold text-slate-700">Notice Title (Nepali - Optional)</label>
                <input
                  type="text"
                  placeholder="e.g., एचआरडी कोरिया ई-९ रोस्टर सूची सूचना २०२६..."
                  value={noticeTitleNe} onChange={(e) => setNoticeTitleNe(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-slate-900 focus:outline-none focus:border-amber-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="font-bold text-slate-700">Category</label>
                  <select
                    value={noticeCategory} onChange={(e) => setNoticeCategory(e.target.value as any)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-slate-900"
                  >
                    <option value="VISA_UPDATE">Visa Update</option>
                    <option value="VACANCY">Job Vacancy</option>
                    <option value="EXAM_SCHEDULE">Exam Schedule</option>
                    <option value="PLATFORM">Platform Update</option>
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="font-bold text-slate-700">Country</label>
                  <select
                    value={noticeCountry} onChange={(e) => setNoticeCountry(e.target.value as any)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-slate-900"
                  >
                    <option value="JAPAN">🇯🇵 Japan</option>
                    <option value="KOREA">🇰🇷 Korea</option>
                    <option value="BOTH">🌏 Both</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="font-bold text-slate-700">Source Type</label>
                  <select
                    value={noticeSourceType} onChange={(e) => setNoticeSourceType(e.target.value as any)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-slate-900"
                  >
                    <option value="OFFICIAL_GOVERNMENT">🏛️ Official Government</option>
                    <option value="EXAM_BODY">📝 Exam Board</option>
                    <option value="EMBASSY">🏢 Embassy</option>
                    <option value="PARTNER">🤝 Partner Agency</option>
                    <option value="JAPANKOREAHUB">🌐 JapanKoreaHub</option>
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="font-bold text-slate-700">Official Source Link (Optional)</label>
                  <input
                    type="url"
                    placeholder="https://..."
                    value={noticeSourceUrl} onChange={(e) => setNoticeSourceUrl(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-slate-900"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="font-bold text-slate-700">Notice Body Content *</label>
                <textarea
                  rows={4} required
                  placeholder="Write the verified notice details, instructions, and official rules..."
                  value={noticeBody} onChange={(e) => setNoticeBody(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-slate-900 focus:outline-none focus:border-amber-500"
                />
              </div>

              <div className="flex items-center gap-2 pt-1">
                <input
                  type="checkbox" id="pinNotice"
                  checked={noticeIsPinned} onChange={(e) => setNoticeIsPinned(e.target.checked)}
                  className="rounded border-slate-300 text-amber-600 focus:ring-amber-500"
                />
                <label htmlFor="pinNotice" className="font-bold text-slate-700 cursor-pointer">
                  Pin this notice to top of list
                </label>
              </div>

              <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-200">
                <button
                  type="button" onClick={() => setShowNoticeModal(false)}
                  className="px-4 py-2 rounded-xl bg-slate-200 text-slate-700 font-bold"
                >
                  Cancel
                </button>
                <button
                  type="submit" disabled={isSubmitting}
                  className="px-5 py-2 rounded-xl bg-amber-600 hover:bg-amber-500 text-white font-extrabold shadow-sm disabled:opacity-50"
                >
                  {isSubmitting ? 'Publishing...' : 'Publish Official Notice'}
                </button>
              </div>
            </form>

          </div>
        </div>
      )}

      <BottomTabBar />
    </div>
  );
}
