import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import VisaDetailClient from './VisaDetailClient';

const VALID_VISAS: Record<string, string[]> = {
  japan: ['student', 'ssw', 'dependent', 'interview'],
  korea: ['e9', 'student', 'e7', 'interview'],
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
  return {
    title: `${type.toUpperCase()} Visa Guide — JapanKoreaHub`,
    alternates: { canonical: `https://japankoreahub.com/${country}/visa/${type}` },
  };
}

export default async function VisaDetailPage({ params }: { params: Promise<{ country: string; type: string }> }) {
  const { country, type } = await params;
  if (!VALID_VISAS[country]?.includes(type)) {
    notFound();
  }
  return <VisaDetailClient country={country as 'japan' | 'korea'} type={type} />;
}
