import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import LifeHubClient from './LifeHubClient';

const LIFE_META: Record<string, { title: string; desc: string }> = {
  japan: {
    title: 'Life & Culture in Japan (Living Costs, Housing, Etiquette & Traditions) — JapanKoreaHub',
    desc: 'Cost of living breakdown in Japan, apartment renting (Reikin/Shikikin), Japanese etiquette (Ojigi, Genkan, Hou-Ren-So), health insurance (NHI), part-time rules (28 hrs/wk), and emergency contacts.',
  },
  korea: {
    title: 'Life & Culture in Korea (Living Costs, Housing, Etiquette & Traditions) — JapanKoreaHub',
    desc: 'Cost of living breakdown in Seoul & regional cities, housing deposits (Jeonse/Wolse), Korean culture & etiquette (Two-hand rule, Hoesik, Palli-Palli), health insurance, and workplace rights.',
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
