import React from 'react';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import BuildingCleaningBookReader from '@/components/building-cleaning/BuildingCleaningBookReader';

interface Props {
  params: Promise<{ country: string; sector: string }> | { country: string; sector: string };
}

export async function generateStaticParams() {
  return [
    { country: 'japan', sector: 'building_cleaning' },
    { country: 'japan', sector: 'building-cleaning' },
  ];
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const resolvedParams = await params;

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

export default async function BuildingCleaningBookPage({ params }: Props) {
  const resolvedParams = await params;

  // Currently the book is specific to Japan building cleaning
  if (resolvedParams.country !== 'japan' || !resolvedParams.sector.includes('building')) {
    notFound();
  }

  return <BuildingCleaningBookReader country={resolvedParams.country} />;
}
