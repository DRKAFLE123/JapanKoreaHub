'use client';
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { ArrowLeft, ExternalLink, Calendar, ShieldCheck, AlertCircle, Share2 } from 'lucide-react';
import MobileNavbar from '@/components/layout/MobileNavbar';
import BottomTabBar from '@/components/layout/BottomTabBar';

interface Notice {
  id: string;
  title: string;
  titleNe?: string;
  body: string;
  bodyNe?: string;
  category: string;
  country: string;
  sourceType: string;
  sourceLabel?: string;
  sourceUrl?: string;
  isPinned: boolean;
  expiresAt?: string;
  lastVerifiedAt?: string;
  publishedAt: string;
}

export default function NoticeDetailClient({ id }: { id: string }) {
  const [notice, setNotice] = useState<Notice | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch(`/api/notices/${id}`)
      .then(res => {
        if (!res.ok) throw new Error('Notice not found');
        return res.json();
      })
      .then(data => setNotice(data.notice))
      .catch(err => setError(err.message))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-white pb-24">
        <MobileNavbar user={null} lang="en" onLangToggle={() => {}} onSearchOpen={() => {}} />
        <div className="pt-24 text-center text-sm text-gray-400">Loading notice...</div>
        <BottomTabBar />
      </div>
    );
  }

  if (error || !notice) {
    return (
      <div className="min-h-screen bg-white pb-24">
        <MobileNavbar user={null} lang="en" onLangToggle={() => {}} onSearchOpen={() => {}} />
        <main className="pt-16 px-4 max-w-2xl mx-auto text-center py-12">
          <AlertCircle className="w-10 h-10 text-amber-500 mx-auto mb-3" />
          <h1 className="text-xl font-bold text-gray-900">Notice Not Found</h1>
          <p className="text-sm text-gray-500 mt-1 mb-6">The requested notice may have expired or been removed.</p>
          <Link href="/notices" className="px-4 py-2 bg-gray-900 text-white font-medium text-sm rounded-xl">
            Return to Notices
          </Link>
        </main>
        <BottomTabBar />
      </div>
    );
  }

  const isExpired = notice.expiresAt && new Date(notice.expiresAt) < new Date();

  // Schema.org Article JSON-LD
  const articleJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: notice.title,
    datePublished: notice.publishedAt,
    dateModified: notice.lastVerifiedAt || notice.publishedAt,
    publisher: {
      '@type': 'Organization',
      name: 'JapanKoreaHub',
      url: 'https://japankoreahub.com',
    },
    articleBody: notice.body,
  };

  return (
    <div className="min-h-screen bg-white pb-24">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }}
      />
      <MobileNavbar user={null} lang="en" onLangToggle={() => {}} onSearchOpen={() => {}} />

      <main className="pt-14 max-w-3xl mx-auto">
        {/* Breadcrumb */}
        <div className="px-4 pt-4 pb-2">
          <Link href="/notices" className="inline-flex items-center gap-1 text-sm text-gray-500 hover:text-gray-700 transition-colors">
            <ArrowLeft className="w-3.5 h-3.5" />
            Back to Notices
          </Link>
        </div>

        {/* Article Body */}
        <article className="px-4 py-4 space-y-6">
          <header className="space-y-3 pb-4 border-b border-gray-100">
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-xs font-bold px-2.5 py-1 rounded bg-blue-100 text-blue-800">
                {notice.category.replace('_', ' ')}
              </span>
              <span className="text-xs font-semibold px-2.5 py-1 rounded bg-gray-100 text-gray-700">
                {notice.country === 'JAPAN' ? '🇯🇵 Japan' : notice.country === 'KOREA' ? '🇰🇷 Korea' : '🌏 Both Countries'}
              </span>
              {isExpired && (
                <span className="text-xs font-bold px-2.5 py-1 rounded bg-red-100 text-red-700">
                  CLOSED / EXPIRED
                </span>
              )}
            </div>

            <h1 className="text-2xl md:text-3xl font-extrabold text-gray-900 leading-tight">
              {notice.title}
            </h1>

            {notice.titleNe && (
              <p className="text-base text-gray-600 font-ne leading-relaxed">
                {notice.titleNe}
              </p>
            )}

            <div className="flex flex-wrap items-center justify-between gap-4 pt-2 text-xs text-gray-500">
              <div className="flex items-center gap-4">
                <span className="flex items-center gap-1">
                  <Calendar className="w-3.5 h-3.5" />
                  Published: {new Date(notice.publishedAt).toLocaleDateString()}
                </span>
                {notice.lastVerifiedAt && (
                  <span className="flex items-center gap-1 text-emerald-700 font-medium">
                    <ShieldCheck className="w-3.5 h-3.5" />
                    Verified: {new Date(notice.lastVerifiedAt).toLocaleDateString()}
                  </span>
                )}
              </div>
            </div>
          </header>

          {/* Body Content */}
          <div className="prose max-w-none text-gray-800 leading-relaxed space-y-4">
            <p className="whitespace-pre-line text-base">{notice.body}</p>

            {notice.bodyNe && (
              <div className="mt-6 p-4 bg-gray-50 border border-gray-100 rounded-xl font-ne">
                <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">नेपाली विवरण</p>
                <p className="whitespace-pre-line text-base text-gray-800">{notice.bodyNe}</p>
              </div>
            )}
          </div>

          {/* Source Link */}
          {notice.sourceUrl && (
            <div className="p-4 bg-blue-50 border border-blue-100 rounded-2xl flex items-center justify-between gap-4">
              <div>
                <p className="text-xs font-semibold text-blue-900 uppercase tracking-wider">Official Verification Source</p>
                <p className="text-sm text-blue-700 font-medium">{notice.sourceLabel || 'View Original Source'}</p>
              </div>
              <a
                href={notice.sourceUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs rounded-xl flex items-center gap-1.5 transition-colors flex-shrink-0"
              >
                Visit Link
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          )}
        </article>
      </main>

      <BottomTabBar />
    </div>
  );
}
