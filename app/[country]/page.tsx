import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import CountryHubClient from './CountryHubClient';

const COUNTRY_META: Record<string, { name: string; flag: string; tagline: string }> = {
  japan: { name: 'Japan', flag: '🇯🇵', tagline: 'Learn Japanese · JLPT · JFT-Basic · SSW Visa · Study & Work in Japan' },
  korea: { name: 'Korea', flag: '🇰🇷', tagline: 'Learn Korean · EPS-TOPIK · TOPIK · E-9 Visa · Study & Work in Korea' },
};

export function generateStaticParams() {
  return [{ country: 'japan' }, { country: 'korea' }];
}

export async function generateMetadata({ params }: { params: Promise<{ country: string }> }): Promise<Metadata> {
  const { country } = await params;
  const meta = COUNTRY_META[country];
  if (!meta) return {};
  return {
    title: `${meta.flag} ${meta.name} Hub — JapanKoreaHub`,
    description: meta.tagline,
    alternates: { canonical: `https://japankoreahub.com/${country}` },
    openGraph: { title: `${meta.name} Hub — JapanKoreaHub`, description: meta.tagline },
  };
}

export default async function CountryPage({ params }: { params: Promise<{ country: string }> }) {
  const { country } = await params;
  if (!COUNTRY_META[country]) notFound();
  return <CountryHubClient country={country as 'japan' | 'korea'} />;
}
