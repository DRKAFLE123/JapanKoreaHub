import React from 'react';
import { Metadata } from 'next';
import { BlogHub } from '@/components/BlogHub';

export const metadata: Metadata = {
  title: 'Blog & Official Visa Vacancies | LanguageGuru',
  description: 'Official Korea E-7 visa guide, Japan SSW vacancies, EPS-TOPIK announcements, and Prometric exam news.',
};

export default function BlogPage() {
  return (
    <main className="min-h-screen bg-slate-50 text-slate-900 py-8 px-4 sm:px-8">
      <BlogHub />
    </main>
  );
}
