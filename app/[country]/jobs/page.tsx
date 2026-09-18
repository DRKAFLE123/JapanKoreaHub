import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import JobsHubClient from '@/components/jobs/JobsHubClient';

const JOBS_META: Record<string, { title: string; desc: string }> = {
  japan: {
    title: 'Jobs & Careers in Japan (Student Arubaito & SSW Visas) — JapanKoreaHub',
    desc: 'Browse 28h part-time student jobs in Tokyo & Osaka, convenience store shifts, restaurant staff, and full-time SSW visa opportunities with verified employers.',
  },
  korea: {
    title: 'Jobs & Careers in Korea (Part-Time Alba & EPS E-9 Jobs) — JapanKoreaHub',
    desc: 'Find student alba shifts in Seoul, convenience store cashier positions, factory and manufacturing shifts, and E-9 visa opportunities in South Korea.',
  },
};

export function generateStaticParams() {
  return [{ country: 'japan' }, { country: 'korea' }];
}

export async function generateMetadata({ params }: { params: Promise<{ country: string }> }): Promise<Metadata> {
  const { country } = await params;
  const m = JOBS_META[country];
  if (!m) return {};
  return {
    title: m.title,
    description: m.desc,
    alternates: { canonical: `https://japankoreahub.com/${country}/jobs` },
  };
}

export default async function CountryJobsPage({ params }: { params: Promise<{ country: string }> }) {
  const { country } = await params;
  if (!JOBS_META[country]) notFound();
  return <JobsHubClient country={country as 'japan' | 'korea'} />;
}
