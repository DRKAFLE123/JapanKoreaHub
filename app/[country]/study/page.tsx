import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import StudyHubClient from './StudyHubClient';

const STUDY_META: Record<string, { title: string; desc: string }> = {
  japan: {
    title: 'Study in Japan (Universities, Scholarships & Language Schools) — JapanKoreaHub',
    desc: 'MEXT scholarship guide, Japanese language school admissions, tuition costs, and student visa application steps for Nepali students.',
  },
  korea: {
    title: 'Study in Korea (GKS Scholarship & Universities) — JapanKoreaHub',
    desc: 'Global Korea Scholarship (GKS) guide, Korean D-2 university programs, D-4 language courses, tuition fees, and admission checklists.',
  },
};

export function generateStaticParams() {
  return [{ country: 'japan' }, { country: 'korea' }];
}

export async function generateMetadata({ params }: { params: Promise<{ country: string }> }): Promise<Metadata> {
  const { country } = await params;
  const m = STUDY_META[country];
  if (!m) return {};
  return {
    title: m.title,
    description: m.desc,
    alternates: { canonical: `https://japankoreahub.com/${country}/study` },
  };
}

export default async function StudyPage({ params }: { params: Promise<{ country: string }> }) {
  const { country } = await params;
  if (!STUDY_META[country]) notFound();
  return <StudyHubClient country={country as 'japan' | 'korea'} />;
}
