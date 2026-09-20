import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import ExamsHubClient from '../../exams/ExamsHubClient';
import ExamDetailClient from '../../exams/[exam]/ExamDetailClient';

const LEVEL_SLUGS: Record<string, string[]> = {
  japan: ['n5', 'n4', 'n3', 'n2', 'n1', 'jft', 'jft-basic', 'ssw', 'jlpt-n5', 'jlpt-n4', 'jlpt-n3', 'jlpt-n2'],
  korea: ['eps', 'eps-topik', 'topik-1', 'topik-2', 'kiip'],
};

export function generateStaticParams() {
  const params: { country: string; exam: string }[] = [];
  ['japan', 'korea'].forEach(country => {
    LEVEL_SLUGS[country].forEach(exam => {
      params.push({ country, exam });
    });
  });
  return params;
}

export async function generateMetadata({ params }: { params: Promise<{ country: string; exam: string }> }): Promise<Metadata> {
  const { country, exam } = await params;
  const examName = exam.toUpperCase().replace('-', ' ');
  const cName = country === 'japan' ? 'Japanese' : 'Korean';
  return {
    title: `${examName} Mock Tests — Practice ${cName} CBT | JapanKoreaHub`,
    description: `Official practice CBT mock tests for ${examName} with timer, listening replays, and instant answer breakdown in Nepali & English.`,
    alternates: { canonical: `https://japankoreahub.com/${country}/mock-test/${exam}` },
  };
}

export default async function MockTestDetailPage({ params }: { params: Promise<{ country: string; exam: string }> }) {
  const { country, exam } = await params;
  const valid = LEVEL_SLUGS[country] || [];
  if (!valid.includes(exam.toLowerCase())) {
    notFound();
  }

  // All level slugs render the full interactive Mock Test catalog with that level active
  return <ExamsHubClient country={country as 'japan' | 'korea'} initialLevel={exam.toLowerCase()} />;
}
