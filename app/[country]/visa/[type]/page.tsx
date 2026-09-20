import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { Suspense } from 'react';
import VisaDetailClient from './VisaDetailClient';
import VisaInterviewPreparationClient from '@/components/visa/VisaInterviewPreparationClient';
import StudentVisaMasterClient from '@/components/visa/StudentVisaMasterClient';
import WorkingVisaMasterClient from '@/components/visa/WorkingVisaMasterClient';

const VALID_VISAS: Record<string, string[]> = {
  japan: ['student', 'ssw', 'dependent', 'interview', 'work'],
  korea: ['e9', 'student', 'e7', 'interview', 'dependent', 'work'],
};

export function generateStaticParams() {
  const params: { country: string; type: string }[] = [];
  ['japan', 'korea'].forEach(country => {
    VALID_VISAS[country].forEach(type => {
      params.push({ country, type });
    });
  });
  return params;
}

export async function generateMetadata({ params }: { params: Promise<{ country: string; type: string }> }): Promise<Metadata> {
  const { country, type } = await params;
  const isInterview = type === 'interview';
  const isStudent = type === 'student';
  const isWork = ['work', 'ssw', 'e9', 'e7'].includes(type);

  let title = `${type.toUpperCase()} Visa Guide — JapanKoreaHub`;
  if (isInterview) {
    title = `${country === 'japan' ? 'Japan' : 'Korea'} Visa & Interview Preparation (Student, Work, Dependent) | LanguageGuru`;
  } else if (isStudent) {
    title = `Study Visa in ${country === 'japan' ? 'Japan' : 'Korea'} (Colleges, Scholarships & Process) — JapanKoreaHub`;
  } else if (isWork) {
    title = `Work Visa in ${country === 'japan' ? 'Japan' : 'Korea'} (SSW, E-9, Points & Rights) — JapanKoreaHub`;
  }

  return {
    title,
    alternates: { canonical: `https://japankoreahub.com/${country}/visa/${type}` },
  };
}

export default async function VisaDetailPage({ params }: { params: Promise<{ country: string; type: string }> }) {
  const { country, type } = await params;
  if (!VALID_VISAS[country]?.includes(type)) {
    notFound();
  }

  return (
    <Suspense fallback={<div className="min-h-screen bg-slate-50" />}>
      {type === 'interview' && (
        <VisaInterviewPreparationClient country={country as 'japan' | 'korea'} />
      )}
      {type === 'student' && (
        <StudentVisaMasterClient country={country as 'japan' | 'korea'} />
      )}
      {['work', 'ssw', 'e9', 'e7'].includes(type) && (
        <WorkingVisaMasterClient country={country as 'japan' | 'korea'} initialType={type} />
      )}
      {!['interview', 'student', 'work', 'ssw', 'e9', 'e7'].includes(type) && (
        <VisaDetailClient country={country as 'japan' | 'korea'} type={type} />
      )}
    </Suspense>
  );
}

