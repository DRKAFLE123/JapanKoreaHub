import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import ExamsHubClient from './ExamsHubClient';

const EXAMS: Record<string, { exam: string; title: string; badge: string; time: string; passRate: string }[]> = {
  japan: [
    { exam: 'jlpt-n5',  title: 'JLPT N5',    badge: 'Beginner',      time: '105 min', passRate: '~50%' },
    { exam: 'jlpt-n4',  title: 'JLPT N4',    badge: 'Elementary',    time: '105 min', passRate: '~45%' },
    { exam: 'jlpt-n3',  title: 'JLPT N3',    badge: 'Intermediate',  time: '140 min', passRate: '~35%' },
    { exam: 'jlpt-n2',  title: 'JLPT N2',    badge: 'Upper-Inter.',  time: '155 min', passRate: '~30%' },
    { exam: 'jft-basic', title: 'JFT-Basic', badge: 'SSW Required',  time: '60 min',  passRate: '~60%' },
  ],
  korea: [
    { exam: 'eps-topik', title: 'EPS-TOPIK',  badge: 'E-9 Required',         time: '70 min',  passRate: '~55%' },
    { exam: 'topik-1',   title: 'TOPIK I',    badge: 'Levels 1–2',           time: '100 min', passRate: '~60%' },
    { exam: 'topik-2',   title: 'TOPIK II',   badge: 'Levels 3–6',           time: '180 min', passRate: '~40%' },
  ],
};

export function generateStaticParams() {
  return [{ country: 'japan' }, { country: 'korea' }];
}

export async function generateMetadata({ params }: { params: Promise<{ country: string }> }): Promise<Metadata> {
  const { country } = await params;
  const titles: Record<string, string> = {
    japan: 'JLPT & JFT-Basic Mock Tests — JapanKoreaHub',
    korea: 'EPS-TOPIK & TOPIK Mock Tests — JapanKoreaHub',
  };
  return {
    title: titles[country] ?? 'Exams — JapanKoreaHub',
    alternates: { canonical: `https://japankoreahub.com/${country}/exams` },
  };
}

export default async function ExamsPage({ params }: { params: Promise<{ country: string }> }) {
  const { country } = await params;
  if (!EXAMS[country]) notFound();
  return <ExamsHubClient country={country as 'japan' | 'korea'} />;
}
