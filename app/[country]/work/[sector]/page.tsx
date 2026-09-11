import React from 'react';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { SSW_SECTORS_DATA } from '@/lib/ssw-sectors-data';
import SSWSectorDetailClient from './SSWSectorDetailClient';

interface Props {
  params: Promise<{ country: string; sector: string }> | { country: string; sector: string };
}

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
      'Kaigo Listening',
      'Construction Safety'
    ],
  };
}

export default async function SSWSectorPage({ params }: Props) {
  const resolvedParams = await params;
  const sectorData = SSW_SECTORS_DATA[resolvedParams.sector];

  if (!sectorData && resolvedParams.country === 'japan') {
    notFound();
  }

  return (
    <SSWSectorDetailClient
      country={(resolvedParams.country as 'japan' | 'korea') || 'japan'}
      sectorKey={resolvedParams.sector}
      sectorData={sectorData}
    />
  );
}
