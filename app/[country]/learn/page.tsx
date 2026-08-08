import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import LearnHubClient from './LearnHubClient';

const META: Record<string, { title: string; desc: string }> = {
  japan: {
    title: 'Learn Japanese — JapanKoreaHub',
    desc: 'Learn Japanese for JLPT, JFT-Basic and SSW. Hiragana, Katakana, Vocabulary, Kanji, Grammar and Listening — explained in Nepali and English.',
  },
  korea: {
    title: 'Learn Korean — JapanKoreaHub',
    desc: 'Learn Korean for EPS-TOPIK and TOPIK. Hangul, Vocabulary, Grammar and Listening — explained in Nepali and English.',
  },
};

export function generateStaticParams() {
  return [{ country: 'japan' }, { country: 'korea' }];
}

export async function generateMetadata({ params }: { params: Promise<{ country: string }> }): Promise<Metadata> {
  const { country } = await params;
  const m = META[country];
  if (!m) return {};
  return {
    title: m.title,
    description: m.desc,
    alternates: { canonical: `https://japankoreahub.com/${country}/learn` },
  };
}

export default async function LearnPage({ params }: { params: Promise<{ country: string }> }) {
  const { country } = await params;
  if (!META[country]) notFound();
  return <LearnHubClient country={country as 'japan' | 'korea'} />;
}
