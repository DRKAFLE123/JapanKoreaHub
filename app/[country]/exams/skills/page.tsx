import React from 'react';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import SkillsExamDirectoryClient from '@/components/exams/SkillsExamDirectoryClient';

interface Props {
  params: Promise<{ country: string }> | { country: string };
  searchParams?: Promise<{ sector?: string }> | { sector?: string };
}

export async function generateStaticParams() {
  return [{ country: 'japan' }, { country: 'korea' }];
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const resolvedParams = await params;
  const isJapan = resolvedParams.country === 'japan';

  return {
    title: isJapan
      ? 'SSW Skills Evaluation Mock Tests Directory (Building Cleaning, Kaigo, Food Service) | LanguageGuru'
      : 'Korea Skills & EPS Evaluation Mock Tests | LanguageGuru',
    description:
      'Official Prometric CBT mock tests for Japan Specified Skilled Worker (SSW-1 / 特定技能1号) sectors: Building Cleaning, Caregiving, Food Service, Agriculture, Construction, and more with full Furigana on Kanji.',
    keywords: [
      'SSW Skill Test',
      '特定技能評価試験',
      'Building Cleaning Mock Test',
      'Caregiver Kaigo Skill Test',
      'Food Service SSW Exam',
      'Prometric Skill Test CBT',
      'SSW Nepal Mock Test',
    ],
  };
}

export default async function SkillsExamsPage({ params, searchParams }: Props) {
  const resolvedParams = await params;
  const resolvedSearchParams = searchParams ? await searchParams : undefined;

  if (resolvedParams.country !== 'japan' && resolvedParams.country !== 'korea') {
    notFound();
  }

  return (
    <SkillsExamDirectoryClient
      country={resolvedParams.country}
      initialSector={resolvedSearchParams?.sector}
    />
  );
}
