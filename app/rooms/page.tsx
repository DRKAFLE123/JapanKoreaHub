import type { Metadata } from 'next';
import RoomsHubClient from '@/components/rooms/RoomsHubClient';

export const metadata: Metadata = {
  title: 'Rooms & Housing in Japan & Korea (Apartments, Goshiwons & Sharehouses) — JapanKoreaHub',
  description: 'Find Gaijin-friendly apartments, zero key-money rooms, student Goshiwons, and sharehouses in Tokyo, Seoul, Osaka and Busan.',
  alternates: { canonical: 'https://japankoreahub.com/rooms' },
};

export default function GlobalRoomsPage() {
  return <RoomsHubClient country="all" />;
}
