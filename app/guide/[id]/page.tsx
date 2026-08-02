import React from 'react';
import { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { GUIDE_CATALOG, GuideContent } from '@/lib/guides-data';
import {
  ArrowLeft, CheckCircle2, Sparkles, BookOpen, Briefcase,
  Clock, ShieldCheck, ChevronRight, Globe
} from 'lucide-react';

interface Props {
  params: { id: string };
}

export async function generateStaticParams() {
  return GUIDE_CATALOG.map((g) => ({
    id: g.id,
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const guide = GUIDE_CATALOG.find((g) => g.id === params.id);
  if (!guide) {
    return {
      title: 'Guide Not Found | LanguageGuru',
      description: 'The requested language or visa guide could not be found.',
    };
  }

  return {
    title: `${guide.title} | LanguageGuru Guide`,
    description: guide.subtitle,
    keywords: [
      guide.badge,
      guide.category,
      'LanguageGuru Guides',
      'Minna no Nihongo',
      'EPS TOPIK 1-60',
      'JLPT N5-N1 Syllabus',
      'SSW Visa'
    ],
    openGraph: {
      title: guide.title,
      description: guide.subtitle,
      url: `https://languageguru.app/guide/${guide.id}`,
      siteName: 'LanguageGuru',
      type: 'article',
    },
    twitter: {
      card: 'summary_large_image',
      title: guide.title,
      description: guide.subtitle,
    },
  };
}

export default function GuidePage({ params }: Props) {
  const guide = GUIDE_CATALOG.find((g) => g.id === params.id);
  if (!guide) {
    notFound();
  }

  // FAQ / Educational Course Schema
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: guide.sections.map((sec) => ({
      '@type': 'Question',
      name: sec.heading,
      acceptedAnswer: {
        '@type': 'Answer',
        text: `${sec.text} ${sec.bullets ? sec.bullets.join('. ') : ''}`,
      },
    })),
  };

  return (
    <main className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans relative py-8 px-4 sm:px-8">
      {/* Inject FAQ Schema.org JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className="max-w-4xl mx-auto w-full space-y-6">
        
        <div className="flex items-center justify-between">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-xs font-extrabold text-indigo-400 hover:text-indigo-300 transition-colors bg-slate-900 border border-slate-800 rounded-xl px-3 py-2"
          >
            <ArrowLeft className="w-4 h-4" /> Back to Main Platform
          </Link>

          <span className="px-3 py-1 rounded-full bg-indigo-500/20 text-indigo-300 text-xs font-bold border border-indigo-500/30">
            {guide.badge}
          </span>
        </div>

        <article className="bg-slate-900/90 border border-slate-800 rounded-3xl p-6 sm:p-10 shadow-2xl space-y-8">
          
          <div className="space-y-3 border-b border-slate-800 pb-6">
            <div className="flex items-center gap-3">
              <span className="text-4xl">{guide.emoji}</span>
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
                  Official Knowledge Item • {guide.category}
                </span>
                <h1 className="text-2xl sm:text-4xl font-black text-white leading-tight mt-1">
                  {guide.title}
                </h1>
              </div>
            </div>
            <p className="text-xs sm:text-sm text-slate-300 font-medium leading-relaxed">
              {guide.subtitle}
            </p>
          </div>

          <div className="space-y-6">
            {guide.sections.map((sec, idx) => (
              <div key={idx} className="space-y-3 bg-slate-950/70 border border-slate-800 rounded-2xl p-5 shadow-sm">
                <h3 className="text-base font-black text-white flex items-center gap-2">
                  <CheckCircle2 className="w-4.5 h-4.5 text-emerald-400 shrink-0" />
                  <span>{sec.heading}</span>
                </h3>

                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed whitespace-pre-line">
                  {sec.text}
                </p>

                {sec.bullets && sec.bullets.length > 0 && (
                  <ul className="space-y-2 pt-2 border-t border-slate-800">
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

          <div className="pt-6 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="text-xs text-slate-400">
              Verified Knowledge Base • <strong className="text-slate-200">LanguageGuru</strong>
            </div>

            <Link
              href="/"
              className="w-full sm:w-auto px-6 py-3 rounded-2xl bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 hover:from-indigo-500 hover:to-pink-500 text-white font-extrabold text-xs shadow-glow flex items-center justify-center gap-2"
            >
              <span>Explore Language Platform</span>
              <ChevronRight className="w-4 h-4" />
            </Link>
          </div>

        </article>

      </div>
    </main>
  );
}
