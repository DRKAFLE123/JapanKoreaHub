import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import VisaHubClient from './VisaHubClient';

const VISA_TYPES: Record<string, { type: string; title: string; desc: string; icon: string }[]> = {
  japan: [
    { type: 'student', title: 'Student Visa', desc: 'Requirements, COE process, and school applications', icon: '🎓' },
    { type: 'ssw',     title: 'SSW Work Visa', desc: 'Specified Skilled Worker (i-1) requirements', icon: '💼' },
    { type: 'dependent', title: 'Dependent Visa', desc: 'Bring your family to Japan', icon: '👨‍👩‍👧‍👦' },
    { type: 'interview', title: 'Interview Prep', desc: 'Common questions and how to answer them', icon: '🗣️' },
  ],
  korea: [
    { type: 'e9',      title: 'E-9 Work Visa', desc: 'EPS route for non-professional employment', icon: '👷' },
    { type: 'student', title: 'Student Visa (D-2/D-4)', desc: 'University and language school requirements', icon: '🎓' },
    { type: 'e7',      title: 'E-7 Work Visa', desc: 'Professional and skilled employment', icon: '💼' },
    { type: 'interview', title: 'Interview Prep', desc: 'Embassy interview questions and tips', icon: '🗣️' },
  ],
};

export function generateStaticParams() {
  return [{ country: 'japan' }, { country: 'korea' }];
}

export async function generateMetadata({ params }: { params: Promise<{ country: string }> }): Promise<Metadata> {
  const { country } = await params;
  const titles: Record<string, string> = {
    japan: 'Japan Visa Guide — JapanKoreaHub',
    korea: 'Korea Visa Guide — JapanKoreaHub',
  };
  return {
    title: titles[country] ?? 'Visa Guide — JapanKoreaHub',
    alternates: { canonical: `https://japankoreahub.com/${country}/visa` },
  };
}

export default async function VisaPage({ params }: { params: Promise<{ country: string }> }) {
  const { country } = await params;
  if (!VISA_TYPES[country]) notFound();
  return <VisaHubClient country={country as 'japan' | 'korea'} visaTypes={VISA_TYPES[country]} />;
}
