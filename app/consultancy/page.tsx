import type { Metadata } from 'next';
import ConsultancyClient from './ConsultancyClient';

export const metadata: Metadata = {
  title: 'Visa & Study Counseling — JapanKoreaHub',
  description: 'Book 1-on-1 visa interview prep, document review, and SOP counseling with verified counselors for Japan and Korea.',
  alternates: { canonical: 'https://japankoreahub.com/consultancy' },
};

export default function ConsultancyPage() {
  return <ConsultancyClient />;
}
