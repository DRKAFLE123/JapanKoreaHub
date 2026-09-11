import React from 'react';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import BuildingCleaningBookReader from '@/components/building-cleaning/BuildingCleaningBookReader';
import CaregivingBookReader from '@/components/caregiving/CaregivingBookReader';

interface Props {
  params: Promise<{ country: string; sector: string }> | { country: string; sector: string };
}

export async function generateStaticParams() {
  return [
    { country: 'japan', sector: 'building_cleaning' },
    { country: 'japan', sector: 'building-cleaning' },
    { country: 'japan', sector: 'nursing' },
    { country: 'japan', sector: 'caregiving' },
  ];
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const resolvedParams = await params;
  const isCaregiving = resolvedParams.sector === 'nursing' || resolvedParams.sector === 'caregiving';

  if (isCaregiving) {
    return {
      title: 'SSW Caregiving (介護) Official Book & High-Chance CBT Tests | LanguageGuru',
      description:
        'Official 12-chapter bilingual Japanese & Nepali study curriculum for Specified Skilled Worker (SSW) Caregiving Skills & Japanese Evaluation Exam (厚生労働省 MHLW Prometric CBT), with 10 clinical diagrams, section quizzes, and full mock exam.',
      keywords: [
        'SSW Caregiving',
        '介護技能評価試験',
        '介護日本語評価試験',
        'Kaigo Prometric Exam',
        'MHLW Caregiving Study Guide',
        'SSW Nursing Care Nepali',
        'Tokutei Ginou Kaigo'
      ],
    };
  }

  return {
    title: 'SSW-1 Building Cleaning Official Book & High-Chance CBT Tests | LanguageGuru',
    description:
      'Official 12-chapter bilingual Japanese & Nepali study guide for Specified Skilled Worker (SSW-1) Building Cleaning Evaluation Exam with section-by-section high-probability Prometric CBT tests and 41+ technical vocabulary.',
    keywords: [
      'Building Cleaning SSW',
      'ビルクリーニング分野特定技能１号評価試験',
      'JBMA Building Cleaning',
      'SSW Japan Skill Test',
      'Prometric Building Cleaning',
      'Building Cleaning Nepali Study Guide',
      'Tokutei Ginou Building Cleaning'
    ],
  };
}

export default async function SectorBookPage({ params }: Props) {
  const resolvedParams = await params;

  if (resolvedParams.country !== 'japan') {
    notFound();
  }

  if (resolvedParams.sector.includes('building')) {
    return <BuildingCleaningBookReader country={resolvedParams.country} />;
  }

  if (resolvedParams.sector === 'nursing' || resolvedParams.sector === 'caregiving') {
    return <CaregivingBookReader country={resolvedParams.country} />;
  }

  notFound();
}

