import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import LevelPageClient from './LevelPageClient';

const VALID_LEVELS: Record<string, string[]> = {
  japan: ['basics', 'n5', 'n4', 'n3', 'n2', 'n1', 'jft-basic', 'kanji-1000'],
  korea: ['basics', 'eps-topik', 'topik-1', 'topik-2', 'eps-sectors'],
};

export function generateStaticParams() {
  const params: { country: string; level: string }[] = [];
  ['japan', 'korea'].forEach(country => {
    VALID_LEVELS[country].forEach(level => {
      params.push({ country, level });
    });
  });
  return params;
}

export async function generateMetadata({ params }: { params: Promise<{ country: string; level: string }> }): Promise<Metadata> {
  const { country, level } = await params;
  const cName = country === 'japan' ? 'Japanese' : 'Korean';
  const levelTitle = level.toUpperCase().replace('-', ' ');
  return {
    title: `${levelTitle} ${cName} Curriculum — JapanKoreaHub`,
    description: `Complete ${levelTitle} ${cName} curriculum with vocabulary, grammar, SRS flashcards, audio listening, and mock test engine.`,
    alternates: { canonical: `https://japankoreahub.com/${country}/learn/${level}` },
  };
}

export default async function LevelPage({ params }: { params: Promise<{ country: string; level: string }> }) {
  const { country, level } = await params;
  if (!VALID_LEVELS[country]?.includes(level)) {
    notFound();
  }
  return <LevelPageClient country={country as 'japan' | 'korea'} level={level} />;
}
