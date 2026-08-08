import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import ModuleClient from './ModuleClient';

const VALID_MODULES = ['basics', 'vocabulary', 'kanji', 'grammar', 'listening', 'speaking', 'words'];

export function generateStaticParams() {
  const params: { country: string; module: string }[] = [];
  ['japan', 'korea'].forEach(country => {
    VALID_MODULES.forEach(mod => {
      params.push({ country, module: mod });
    });
  });
  return params;
}

export async function generateMetadata({ params }: { params: Promise<{ country: string; module: string }> }): Promise<Metadata> {
  const { country, module } = await params;
  const cName = country === 'japan' ? 'Japanese' : 'Korean';
  return {
    title: `${module.charAt(0).toUpperCase() + module.slice(1)} — Learn ${cName} | JapanKoreaHub`,
    alternates: { canonical: `https://japankoreahub.com/${country}/learn/${module}` },
  };
}

export default async function ModulePage({ params }: { params: Promise<{ country: string; module: string }> }) {
  const { country, module } = await params;
  if (!['japan', 'korea'].includes(country) || !VALID_MODULES.includes(module)) {
    notFound();
  }
  return <ModuleClient country={country as 'japan' | 'korea'} module={module} />;
}
