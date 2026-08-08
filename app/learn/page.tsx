import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight, BookOpen, Layers, Type, AlignLeft, CheckCircle2, ChevronRight, Sparkles, Clock, Flame } from 'lucide-react';
import CountryFilterChip from '@/components/ui/CountryFilterChip';

export const metadata: Metadata = {
  title: 'Learn Japanese & Korean — JapanKoreaHub',
  description: 'Learn Japanese for JLPT/JFT-Basic and Korean for EPS-TOPIK/TOPIK. Vocabulary, Kanji, Hangul, Grammar, and SRS Flashcards.',
  alternates: { canonical: 'https://japankoreahub.com/learn' },
};

const JAPAN_CHAPTERS = [
  { name: 'Kana Basics', badge: 'Alphabet', desc: 'Hiragana & Katakana stroke order & audio matrix', href: '/japan/learn/basics' },
  { name: 'JLPT N5', badge: 'Lessons 1–25', desc: 'Minna no Nihongo Shokyu I — 800+ Vocab & Grammar', href: '/japan/learn/n5' },
  { name: 'JLPT N4', badge: 'Lessons 26–50', desc: 'Minna no Nihongo Shokyu II — 1,500+ Vocab & Keigo', href: '/japan/learn/n4' },
  { name: 'JLPT N3', badge: 'Lessons 51–75', desc: 'Intermediate Japanese — 3,000+ Vocab & Reading', href: '/japan/learn/n3' },
  { name: 'JFT-Basic (SSW)', badge: '250-Mark CBT', desc: 'Prometric CBT simulator for SSW Working Visas', href: '/japan/learn/jft-basic' },
  { name: 'Kanji 1,000', badge: 'Kanji SRS', desc: '214 Radicals, Onyomi, Kunyomi & SRS Card Deck', href: '/japan/learn/kanji-1000' },
];

const KOREA_CHAPTERS = [
  { name: 'Hangul Basics', badge: 'Alphabet', desc: 'Consonants, Vowels, Batchim & Syllable blocks', href: '/korea/learn/basics' },
  { name: 'EPS-TOPIK', badge: 'Lessons 1–60', desc: 'Official HRD Korea 60-lesson textbook & CBT exam papers', href: '/korea/learn/eps-topik' },
  { name: 'TOPIK I', badge: 'Level 1 & 2', desc: 'Beginner Korean reading, listening & 300 common words', href: '/korea/learn/topik-1' },
  { name: 'TOPIK II', badge: 'Level 3 & 4', desc: 'Intermediate sentence structures & essay writing', href: '/korea/learn/topik-2' },
  { name: 'EPS Sectors', badge: 'E-9 Work', desc: 'Manufacturing, Agriculture, Construction & Fishing', href: '/korea/learn/eps-sectors' },
];

export default function CombinedLearnPage() {
  return (
    <main className="pt-14 md:pt-4 max-w-4xl mx-auto pb-24 space-y-6">
      {/* Header */}
      <section className="px-4 pt-4">
        <div className="flex items-center gap-2 mb-4">
          <span className="text-xs font-semibold text-gray-400">Jump to country track:</span>
          <CountryFilterChip country="japan" href="/japan/learn" />
          <CountryFilterChip country="korea" href="/korea/learn" />
        </div>

        <h1 className="text-2xl md:text-3xl font-extrabold text-gray-900">
          Language Learning Platform
        </h1>
        <p className="text-sm text-gray-500 mt-1">
          Master Japanese & Korean from basic alphabets to advanced exam certification.
        </p>
      </section>

      {/* Country Learning Track Cards */}
      <section className="px-4 grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Japan Track */}
        <div className="card p-5 border-pink-200 bg-pink-50/30 flex flex-col justify-between space-y-4">
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-2xl">🇯🇵</span>
              <span className="text-xs font-bold px-2.5 py-0.5 rounded bg-pink-100 text-pink-700">Japanese Track</span>
            </div>
            <h2 className="text-lg font-bold text-gray-900">Learn Japanese (JLPT & JFT)</h2>
            <p className="text-xs text-gray-600 mt-1 leading-relaxed">
              Hiragana/Katakana, Minna no Nihongo Lessons 1–75, 1,000 Kanji Cards with SRS, and JFT Grammar.
            </p>

            <div className="space-y-1.5 mt-4 text-xs text-gray-700">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-pink-600 flex-shrink-0" />
                <span>Kana Basics & Stroke Order</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-pink-600 flex-shrink-0" />
                <span>Minna no Nihongo 1–75 Vocab Explorer</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-pink-600 flex-shrink-0" />
                <span>1,000 Kanji Cards with Onyomi & Kunyomi</span>
              </div>
            </div>
          </div>

          <Link
            href="/japan/learn"
            className="w-full py-3 bg-pink-600 hover:bg-pink-700 text-white font-semibold text-xs rounded-xl flex items-center justify-center gap-1.5 transition-colors"
          >
            Start Japanese Track
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {/* Korea Track */}
        <div className="card p-5 border-blue-200 bg-blue-50/30 flex flex-col justify-between space-y-4">
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-2xl">🇰🇷</span>
              <span className="text-xs font-bold px-2.5 py-0.5 rounded bg-blue-100 text-blue-700">Korean Track</span>
            </div>
            <h2 className="text-lg font-bold text-gray-900">Learn Korean (EPS & TOPIK)</h2>
            <p className="text-xs text-gray-600 mt-1 leading-relaxed">
              Hangul Matrix, EPS-TOPIK Lessons 1–60, 100 Core Grammar Rules, and EPS Sector Vocab.
            </p>

            <div className="space-y-1.5 mt-4 text-xs text-gray-700">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-blue-600 flex-shrink-0" />
                <span>Hangul Consonants, Vowels & Audio Matrix</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-blue-600 flex-shrink-0" />
                <span>EPS-TOPIK Lessons 1–60 Vocab Explorer</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-blue-600 flex-shrink-0" />
                <span>100 Core Grammar Patterns & Audio</span>
              </div>
            </div>
          </div>

          <Link
            href="/korea/learn"
            className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs rounded-xl flex items-center justify-center gap-1.5 transition-colors"
          >
            Start Korean Track
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>

      {/* ── Below the Fold Section 1: Japanese Serial Chapter Breakdown ── */}
      <section className="px-4 space-y-3">
        <div className="flex items-center justify-between">
          <p className="text-xs font-bold text-gray-900 uppercase tracking-wider flex items-center gap-1.5">
            🇯🇵 Japanese Curriculum Breakdown (N5 → N1 &amp; JFT)
          </p>
          <Link href="/japan/learn" className="text-xs text-pink-600 font-bold hover:underline">
            View All
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {JAPAN_CHAPTERS.map((ch, idx) => (
            <Link
              key={idx}
              href={ch.href}
              className="p-4 bg-white border border-gray-100 rounded-2xl shadow-sm hover:shadow-md hover:border-pink-200 transition-all flex items-center justify-between group"
            >
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="font-extrabold text-sm text-gray-900 group-hover:text-pink-600">{ch.name}</span>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-pink-100 text-pink-700">{ch.badge}</span>
                </div>
                <p className="text-xs text-gray-500 font-medium">{ch.desc}</p>
              </div>
              <ChevronRight className="w-4 h-4 text-gray-400 group-hover:text-pink-600 flex-shrink-0" />
            </Link>
          ))}
        </div>
      </section>

      {/* ── Below the Fold Section 2: Korean Serial Chapter Breakdown ── */}
      <section className="px-4 space-y-3">
        <div className="flex items-center justify-between">
          <p className="text-xs font-bold text-gray-900 uppercase tracking-wider flex items-center gap-1.5">
            🇰🇷 Korean Curriculum Breakdown (EPS-TOPIK &amp; TOPIK I/II)
          </p>
          <Link href="/korea/learn" className="text-xs text-blue-600 font-bold hover:underline">
            View All
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {KOREA_CHAPTERS.map((ch, idx) => (
            <Link
              key={idx}
              href={ch.href}
              className="p-4 bg-white border border-gray-100 rounded-2xl shadow-sm hover:shadow-md hover:border-blue-200 transition-all flex items-center justify-between group"
            >
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="font-extrabold text-sm text-gray-900 group-hover:text-blue-600">{ch.name}</span>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-blue-100 text-blue-700">{ch.badge}</span>
                </div>
                <p className="text-xs text-gray-500 font-medium">{ch.desc}</p>
              </div>
              <ChevronRight className="w-4 h-4 text-gray-400 group-hover:text-blue-600 flex-shrink-0" />
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
}
