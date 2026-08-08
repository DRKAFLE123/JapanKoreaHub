import type { Metadata } from 'next';
import DashboardClient from './DashboardClient';

export const metadata: Metadata = {
  title: 'My Learning Dashboard — JapanKoreaHub',
  description: 'Track your Japanese & Korean study streak, review SRS flashcard queues, view mock test scores, and download QR certificates.',
};

export default function DashboardPage() {
  return <DashboardClient />;
}
