import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import RoomsHubClient from '@/components/rooms/RoomsHubClient';

const ROOMS_META: Record<string, { title: string; desc: string }> = {
  japan: {
    title: 'Rooms & Housing in Japan (Apartments, Sharehouses & UR Housing) — JapanKoreaHub',
    desc: 'Search Gaijin-friendly apartments in Tokyo, Osaka & Nagoya. Sharehouses, zero-deposit rooms, roommate requests, and direct owner listings.',
  },
  korea: {
    title: 'Rooms & Housing in Korea (Goshiwon, One-Room & Studios) — JapanKoreaHub',
    desc: 'Find zero-deposit Goshiwons, budget One-room studios, and student rentals in Seoul, Busan & Incheon. Direct owner contacts and verified posters.',
  },
};

export function generateStaticParams() {
  return [{ country: 'japan' }, { country: 'korea' }];
}

export async function generateMetadata({ params }: { params: Promise<{ country: string }> }): Promise<Metadata> {
  const { country } = await params;
  const m = ROOMS_META[country];
  if (!m) return {};
  return {
    title: m.title,
    description: m.desc,
    alternates: { canonical: `https://japankoreahub.com/${country}/rooms` },
  };
}

export default async function CountryRoomsPage({ params }: { params: Promise<{ country: string }> }) {
  const { country } = await params;
  if (!ROOMS_META[country]) notFound();
  return <RoomsHubClient country={country as 'japan' | 'korea'} />;
}
