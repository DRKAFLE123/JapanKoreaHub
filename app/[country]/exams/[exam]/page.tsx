import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import ExamDetailClient from './ExamDetailClient';

const VALID_EXAMS: Record<string, string[]> = {
  japan: ['jlpt-n5', 'jlpt-n4', 'jlpt-n3', 'jlpt-n2', 'jft-basic'],
  korea: ['eps-topik', 'topik-1', 'topik-2'],
};

export function generateStaticParams() {
  const params: { country: string; exam: string }[] = [];
  ['japan', 'korea'].forEach(country => {
    VALID_EXAMS[country].forEach(exam => {
      params.push({ country, exam });
    });
  });
  return params;
}

export async function generateMetadata({ params }: { params: Promise<{ country: string; exam: string }> }): Promise<Metadata> {
  const { country, exam } = await params;
  const examName = exam.toUpperCase().replace('-', ' ');
  return {
    title: `${examName} Exam Prep — JapanKoreaHub`,
    alternates: { canonical: `https://japankoreahub.com/${country}/exams/${exam}` },
  };
}

export default async function ExamDetailPage({ params }: { params: Promise<{ country: string; exam: string }> }) {
  const { country, exam } = await params;
  if (!VALID_EXAMS[country]?.includes(exam)) {
    notFound();
  }
  return <ExamDetailClient country={country as 'japan' | 'korea'} exam={exam} />;
}
