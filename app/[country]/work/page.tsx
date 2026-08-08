import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import WorkHubClient from './WorkHubClient';

const WORK_META: Record<string, { title: string; desc: string }> = {
  japan: {
    title: 'Work in Japan (SSW & Working Visas) — JapanKoreaHub',
    desc: 'Specified Skilled Worker (SSW-1) sector vocabulary, skill evaluation test preparation, and job listings in Japan for Nepali workers.',
  },
  korea: {
    title: 'Work in Korea (EPS E-9 Visa) — JapanKoreaHub',
    desc: 'EPS-TOPIK E-9 worker sector vocabulary (Manufacturing, Agriculture, Construction, Fishing), job rosters, and employment process.',
  },
};

export function generateStaticParams() {
  return [{ country: 'japan' }, { country: 'korea' }];
}

export async function generateMetadata({ params }: { params: Promise<{ country: string }> }): Promise<Metadata> {
  const { country } = await params;
  const m = WORK_META[country];
  if (!m) return {};
  return {
    title: m.title,
    description: m.desc,
    alternates: { canonical: `https://japankoreahub.com/${country}/work` },
  };
}

export default async function WorkPage({ params }: { params: Promise<{ country: string }> }) {
  const { country } = await params;
  if (!WORK_META[country]) notFound();
  return <WorkHubClient country={country as 'japan' | 'korea'} />;
}
