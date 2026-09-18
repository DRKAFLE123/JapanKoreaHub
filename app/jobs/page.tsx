import type { Metadata } from 'next';
import JobsHubClient from '@/components/jobs/JobsHubClient';

export const metadata: Metadata = {
  title: 'Jobs & Careers in Japan & Korea (Part-Time & Full-Time) — JapanKoreaHub',
  description: 'Search student part-time jobs, convenience store shifts, restaurant staff, SSW-1 visa careers, and factory employment in Japan and Korea.',
  alternates: { canonical: 'https://japankoreahub.com/jobs' },
};

export default function GlobalJobsPage() {
  return <JobsHubClient country="all" />;
}
