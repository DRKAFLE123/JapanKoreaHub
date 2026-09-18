import React from 'react';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { SSW_SECTORS_DATA } from '@/lib/ssw-sectors-data';
import SSWSectorDetailClient from './SSWSectorDetailClient';

interface Props {
  params: Promise<{ country: string; sector: string }> | { country: string; sector: string };
}

import { redirect } from 'next/navigation';

export async function generateStaticParams() {
  const sectors = Object.keys(SSW_SECTORS_DATA);
  const paramsList: { country: string; sector: string }[] = [];
  
  sectors.forEach((sec) => {
    paramsList.push({ country: 'japan', sector: sec });
    paramsList.push({ country: 'korea', sector: sec });
  });

  return paramsList;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const resolvedParams = await params;
  const sectorData = SSW_SECTORS_DATA[resolvedParams.sector];

  if (!sectorData) {
    return {
      title: 'SSW Sector Not Found | JapanKoreaHub',
    };
  }

  return {
    title: `${sectorData.name} SSW Skill Test Prep & Textbooks | JapanKoreaHub`,
    description: sectorData.summary,
    keywords: [
      sectorData.name,
      sectorData.kanji,
      'SSW Japan',
      'Prometric Skill Test',
      'Specified Skilled Worker',
      'OTIT Textbooks',
      'SSW Interview Practice',
      'Kaigo Mensetsu',
      'Construction Safety'
    ],
  };
}

export default async function SSWSectorPage({ params }: Props) {
  const resolvedParams = await params;
  const rawSector = resolvedParams.sector;

  // 301-redirect underscore URLs to hyphen (SEO canonical)
  if (rawSector.includes('_')) {
    const canonical = rawSector.replace(/_/g, '-');
    redirect(`/${resolvedParams.country}/work/${canonical}`);
  }

  const sectorData = SSW_SECTORS_DATA[rawSector];

  if (!sectorData && resolvedParams.country === 'japan') {
    notFound();
  }

  return (
    <SSWSectorDetailClient
      country={(resolvedParams.country as 'japan' | 'korea') || 'japan'}
      sectorKey={rawSector}
      sectorData={sectorData}
    />
  );
}
