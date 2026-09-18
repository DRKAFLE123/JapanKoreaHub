import React from 'react';
import { Metadata } from 'next';
import { notFound, redirect } from 'next/navigation';
import BuildingCleaningMockExam from '@/components/building-cleaning/BuildingCleaningMockExam';

interface Props {
  params: Promise<{ country: string; sector: string }> | { country: string; sector: string };
  searchParams?: Promise<{ set?: string }> | { set?: string };
}

export async function generateStaticParams() {
  return [
    { country: 'japan', sector: 'building-cleaning' },
  ];
}

export async function generateMetadata({ params, searchParams }: Props): Promise<Metadata> {
  const resolvedParams = await params;
  const resolvedSearchParams = searchParams ? await searchParams : undefined;
  const setNumber = resolvedSearchParams?.set ? ` — Set ${resolvedSearchParams.set}` : ' — Set 1';

  return {
    title: `SSW-1 Building Cleaning Official 60-Minute CBT Mock Exam${setNumber} (30 Questions, Furigana) | LanguageGuru`,
    description: 'Take the full 60-minute Prometric CBT simulation mock test for Building Cleaning Specified Skilled Worker (SSW-1) evaluation test, with full Furigana on all Kanji, timer, and bilingual Nepali explanation.',
    keywords: [
      'Building Cleaning Mock Test',
      'ビルクリーニング分野特定技能１号評価試験',
      'SSW Building Cleaning Exam',
      'Prometric CBT Mock Test',
      'Building Cleaning Furigana Test',
      'SSW Japan Exam Practice',
    ],
  };
}

export default async function SectorExamPage({ params, searchParams }: Props) {
  const resolvedParams = await params;
  const resolvedSearchParams = searchParams ? await searchParams : undefined;

  if (resolvedParams.country !== 'japan') {
    notFound();
  }

  const sec = resolvedParams.sector.toLowerCase();

  // Redirect legacy underscore URL to hyphen canonical
  if (sec === 'building_cleaning') {
    const setQuery = resolvedSearchParams?.set ? `?set=${resolvedSearchParams.set}` : '';
    redirect(`/${resolvedParams.country}/work/building-cleaning/exam${setQuery}`);
  }

  const isBuildingCleaning = sec === 'building-cleaning';

  if (!isBuildingCleaning) {
    notFound();
  }

  const setNumber = Number(resolvedSearchParams?.set) || 1;

  return (
    <div className="h-screen w-full overflow-hidden bg-slate-50">
      <BuildingCleaningMockExam country={resolvedParams.country} setNumber={setNumber} />
    </div>
  );
}
