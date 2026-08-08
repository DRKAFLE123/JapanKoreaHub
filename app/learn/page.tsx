import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight, BookOpen, Layers, Type, AlignLeft, CheckCircle2 } from 'lucide-react';
import CountryFilterChip from '@/components/ui/CountryFilterChip';

export const metadata: Metadata = {
  title: 'Learn Japanese & Korean — JapanKoreaHub',
  description: 'Learn Japanese for JLPT/JFT-Basic and Korean for EPS-TOPIK/TOPIK. Vocabulary, Kanji, Hangul, Grammar, and SRS Flashcards.',
  alternates: { canonical: 'https://japankoreahub.com/learn' },
};

export default function CombinedLearnPage() {
  return (
    <main className="pt-14 md:pt-4 max-w-4xl mx-auto pb-24">
      {/* Header */}
      <section className="px-4 py-6">
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
      <section className="px-4 pb-8 grid grid-cols-1 md:grid-cols-2 gap-4">
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
    </main>
  );
}
