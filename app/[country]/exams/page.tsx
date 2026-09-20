import { redirect, notFound } from 'next/navigation';
import type { Metadata } from 'next';

export function generateStaticParams() {
  return [{ country: 'japan' }, { country: 'korea' }];
}

export async function generateMetadata({ params }: { params: Promise<{ country: string }> }): Promise<Metadata> {
  const { country } = await params;
  return {
    title: `Mock Tests — JapanKoreaHub`,
    alternates: { canonical: `https://japankoreahub.com/${country}/mock-test` },
  };
}

export default async function ExamsPage({ params }: { params: Promise<{ country: string }> }) {
  const { country } = await params;
  if (country !== 'japan' && country !== 'korea') notFound();
  redirect(`/${country}/mock-test`);
}
