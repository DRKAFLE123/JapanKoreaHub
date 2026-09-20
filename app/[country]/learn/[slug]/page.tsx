import { Suspense } from 'react';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import LearnHubClient from '../LearnHubClient';

const VALID_SLUGS: Record<string, string[]> = {
  japan: [
    'basics', 'n5', 'n4', 'n3', 'n2', 'n1', 'jft', 'jft-basic', 'kanji-1000'
  ],
  korea: [
    'basics', 'eps', 'eps-topik', 'topik-1', 'topik-2', 'topik-3', 'topik-4', 'topik-5', 'topik-6', 'eps-sectors'
  ],
};

export function generateStaticParams() {
  const params: { country: string; slug: string }[] = [];
  ['japan', 'korea'].forEach(country => {
    VALID_SLUGS[country].forEach(slug => {
      params.push({ country, slug });
    });
  });
  return params;
}

export async function generateMetadata({ params }: { params: Promise<{ country: string; slug: string }> }): Promise<Metadata> {
  const { country, slug } = await params;
  const cName = country === 'japan' ? 'Japanese' : 'Korean';
  const titleFormatted = slug.toUpperCase().replace('-', ' ');
  return {
    title: `${titleFormatted} — Learn ${cName} | JapanKoreaHub`,
    description: `Complete ${titleFormatted} ${cName} curriculum with interactive vocabulary explorer, Minna no Nihongo / EPS textbook lessons, kanji flashcards, listening, and exam guides.`,
    alternates: { canonical: `https://japankoreahub.com/${country}/learn/${slug}` },
  };
}

export default async function LearnSlugPage({ params }: { params: Promise<{ country: string; slug: string }> }) {
  const { country, slug } = await params;
  if (!VALID_SLUGS[country]?.includes(slug.toLowerCase())) {
    notFound();
  }

  return (
    <Suspense fallback={
      <div className="min-h-screen bg-slate-50 flex items-center justify-center text-slate-400 text-sm font-medium">
        Loading curriculum...
      </div>
    }>
      <LearnHubClient country={country as 'japan' | 'korea'} initialLevel={slug.toLowerCase()} />
    </Suspense>
  );
}
