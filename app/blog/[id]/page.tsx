import React from 'react';
import { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { INITIAL_POSTS, BlogPost } from '@/lib/blog-data';
import {
  ArrowLeft, Calendar, MapPin, DollarSign, Briefcase, Award,
  Clock, Share2, Tag, CheckCircle2, Send, Sparkles, ShieldCheck
} from 'lucide-react';

interface Props {
  params: { id: string };
}

export async function generateStaticParams() {
  return INITIAL_POSTS.map((post) => ({
    id: post.id,
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const post = INITIAL_POSTS.find((p) => p.id === params.id);
  if (!post) {
    return {
      title: 'Article Not Found | LanguageGuru',
      description: 'The requested blog post or job vacancy announcement could not be found.',
    };
  }

  return {
    title: `${post.title} | LanguageGuru`,
    description: post.excerpt,
    keywords: [
      ...post.tags,
      post.country,
      post.category,
      'LanguageGuru Jobs',
      'Japan SSW Visa',
      'EPS TOPIK Korea',
      'Prometric Exam'
    ],
    openGraph: {
      title: post.title,
      description: post.excerpt,
      url: `https://languageguru.app/blog/${post.id}`,
      siteName: 'LanguageGuru',
      type: 'article',
      publishedTime: post.date,
      authors: [post.author],
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.excerpt,
    },
  };
}

export default function BlogPostPage({ params }: Props) {
  const post = INITIAL_POSTS.find((p) => p.id === params.id);
  if (!post) {
    notFound();
  }

  // JSON-LD Schema.org Structured Data
  const isJob = post.category === 'VACANCY';
  const jsonLd = isJob
    ? {
        '@context': 'https://schema.org',
        '@type': 'JobPosting',
        title: post.title,
        description: post.content,
        datePosted: '2026-07-28',
        validThrough: '2026-08-30',
        employmentType: 'FULL_TIME',
        hiringOrganization: {
          '@type': 'Organization',
          name: 'LanguageGuru Partner Employer',
          sameAs: 'https://languageguru.app',
        },
        jobLocation: {
          '@type': 'Place',
          address: {
            '@type': 'PostalAddress',
            addressLocality: post.location || 'Tokyo',
            addressCountry: post.country === 'JAPAN' ? 'JP' : 'KR',
          },
        },
        baseSalary: {
          '@type': 'MonetaryAmount',
          currency: post.country === 'JAPAN' ? 'JPY' : 'KRW',
          value: {
            '@type': 'QuantitativeValue',
            unitText: 'MONTH',
            value: post.salary || '215000',
          },
        },
      }
    : {
        '@context': 'https://schema.org',
        '@type': 'Article',
        headline: post.title,
        description: post.excerpt,
        author: {
          '@type': 'Person',
          name: post.author,
        },
        publisher: {
          '@type': 'Organization',
          name: 'LanguageGuru',
          url: 'https://languageguru.app',
        },
        datePublished: '2026-07-28',
      };

  return (
    <main className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans relative py-8 px-4 sm:px-8">
      {/* Inject JSON-LD Schema.org */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className="max-w-4xl mx-auto w-full space-y-6">
        
        {/* Navigation Top Bar */}
        <div className="flex items-center justify-between">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-xs font-extrabold text-indigo-400 hover:text-indigo-300 transition-colors bg-slate-900 border border-slate-800 rounded-xl px-3 py-2"
          >
            <ArrowLeft className="w-4 h-4" /> Back to LanguageGuru
          </Link>

          <div className="flex items-center gap-2">
            <span className="px-3 py-1 rounded-full bg-indigo-500/20 text-indigo-300 text-xs font-bold border border-indigo-500/30">
              {post.category}
            </span>
            <span className="px-3 py-1 rounded-full bg-slate-900 text-slate-300 text-xs font-bold border border-slate-800">
              {post.country}
            </span>
          </div>
        </div>

        {/* Article Container */}
        <article className="bg-slate-900/90 border border-slate-800 rounded-3xl p-6 sm:p-10 shadow-2xl space-y-8">
          
          <div className="space-y-4 border-b border-slate-800 pb-6">
            <h1 className="text-2xl sm:text-4xl font-black text-white leading-tight">
              {post.title}
            </h1>
            <div className="flex items-center gap-4 text-xs text-slate-400 font-medium">
              <span>By <strong className="text-slate-200">{post.author}</strong></span>
              <span>•</span>
              <span>{post.date}</span>
              <span>•</span>
              <span>{post.readTime}</span>
            </div>
          </div>

          {/* Vacancy Card Details Box if Available */}
          {post.salary && (
            <div className="bg-slate-950 border border-slate-800 rounded-2xl p-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1">
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Offered Salary</span>
                <div className="text-lg font-black text-emerald-400 flex items-center gap-1.5">
                  <DollarSign className="w-5 h-5" /> {post.salary}
                </div>
              </div>

              {post.quota && (
                <div className="space-y-1">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Available Vacancies</span>
                  <div className="text-lg font-black text-indigo-300 flex items-center gap-1.5">
                    <Briefcase className="w-5 h-5" /> {post.quota}
                  </div>
                </div>
              )}

              {post.location && (
                <div className="space-y-1">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Job Location</span>
                  <div className="text-xs font-bold text-slate-200 flex items-center gap-1.5">
                    <MapPin className="w-4 h-4 text-rose-400" /> {post.location}
                  </div>
                </div>
              )}

              {post.deadline && (
                <div className="space-y-1">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Application Deadline</span>
                  <div className="text-xs font-bold text-amber-300 flex items-center gap-1.5">
                    <Calendar className="w-4 h-4" /> {post.deadline}
                  </div>
                </div>
              )}

              {post.requirement && (
                <div className="col-span-full pt-3 border-t border-slate-800 space-y-1">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Minimum Exam Requirement</span>
                  <div className="text-xs font-bold text-rose-300 flex items-center gap-1.5">
                    <Award className="w-4 h-4" /> {post.requirement}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Article Main Body */}
          <div className="prose prose-invert max-w-none text-xs sm:text-sm text-slate-300 leading-relaxed whitespace-pre-line space-y-4">
            {post.content}
          </div>

          {/* Article Tags */}
          <div className="pt-6 border-t border-slate-800 flex items-center gap-2 flex-wrap">
            <Tag className="w-4 h-4 text-slate-500" />
            {post.tags.map((t) => (
              <span key={t} className="px-3 py-1 rounded-lg bg-slate-950 border border-slate-800 text-xs font-bold text-slate-400">
                #{t}
              </span>
            ))}
          </div>

          {/* Call to Action Footer Box */}
          <div className="pt-6 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="text-xs text-slate-400">
              Published on <strong className="text-slate-200">LanguageGuru</strong> Career Network
            </div>
            <Link
              href="/"
              className="w-full sm:w-auto px-6 py-3 rounded-2xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-extrabold shadow-glow flex items-center justify-center gap-2"
            >
              <Send className="w-4 h-4" /> Apply / Practice Exam on LanguageGuru
            </Link>
          </div>

        </article>

      </div>
    </main>
  );
}
