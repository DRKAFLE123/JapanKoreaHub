import type { Metadata } from 'next';
import NoticesClient from './NoticesClient';

export const metadata: Metadata = {
  title: 'Official Notices & Updates — JapanKoreaHub',
  description: 'Latest official notices, visa policy updates, exam registration schedules, and vacancies for Japan & Korea.',
  alternates: { canonical: 'https://japankoreahub.com/notices' },
};

export default function NoticesPage() {
  return <NoticesClient />;
}
