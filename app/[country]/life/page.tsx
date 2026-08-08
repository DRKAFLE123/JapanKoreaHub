import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import LifeHubClient from './LifeHubClient';

const LIFE_META: Record<string, { title: string; desc: string }> = {
  japan: {
    title: 'Life in Japan (Cost of Living, Housing & Rights) — JapanKoreaHub',
    desc: 'Cost of living breakdown in Japan, apartment renting (Reikin/Shikikin), health insurance (NHI), part-time work limits (28 hrs/wk), and emergency contacts.',
  },
  korea: {
    title: 'Life in Korea (Cost of Living, Housing & Rights) — JapanKoreaHub',
    desc: 'Cost of living breakdown in Seoul & regional cities, housing deposit (Jeonse/Wolse), national health insurance (NHIS), and workplace rights.',
  },
};

export function generateStaticParams() {
  return [{ country: 'japan' }, { country: 'korea' }];
}

export async function generateMetadata({ params }: { params: Promise<{ country: string }> }): Promise<Metadata> {
  const { country } = await params;
  const m = LIFE_META[country];
  if (!m) return {};
  return {
    title: m.title,
    description: m.desc,
    alternates: { canonical: `https://japankoreahub.com/${country}/life` },
  };
}

export default async function LifePage({ params }: { params: Promise<{ country: string }> }) {
  const { country } = await params;
  if (!LIFE_META[country]) notFound();
  return <LifeHubClient country={country as 'japan' | 'korea'} />;
}
