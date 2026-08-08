import type { Metadata } from 'next';
import NoticeDetailClient from './NoticeDetailClient';

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
  const { id } = await params;
  return {
    title: `Notice #${id.slice(0, 8)} — JapanKoreaHub`,
    description: 'Official notice details, verified policy updates, and source references.',
  };
}

export default async function NoticeDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  return <NoticeDetailClient id={id} />;
}
