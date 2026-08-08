import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import LearnSlugClient from './LearnSlugClient';

const VALID_SLUGS: Record<string, string[]> = {
  japan: [
    'basics', 'vocabulary', 'kanji', 'grammar', 'listening', 'speaking', 'radicals',
    'n5', 'n4', 'n3', 'n2', 'n1', 'jft-basic', 'kanji-1000'
  ],
  korea: [
    'basics', 'vocabulary', 'grammar', 'listening', 'speaking', 'words', 'flashcards', 'sectors',
    'eps-topik', 'topik-1', 'topik-2', 'eps-sectors'
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
    description: `Learn ${titleFormatted} ${cName} with interactive lessons, vocabulary explorer, audio, and mock exams.`,
    alternates: { canonical: `https://japankoreahub.com/${country}/learn/${slug}` },
  };
}

export default async function LearnSlugPage({ params }: { params: Promise<{ country: string; slug: string }> }) {
  const { country, slug } = await params;
  if (!VALID_SLUGS[country]?.includes(slug)) {
    notFound();
  }
  return <LearnSlugClient country={country as 'japan' | 'korea'} slug={slug} />;
}
