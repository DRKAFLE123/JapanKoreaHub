import { MetadataRoute } from 'next';
import { INITIAL_POSTS } from '@/lib/blog-data';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://japankoreahub.com';
  const now = new Date();

  // Shared Canonical Core Routes
  const sharedRoutes: MetadataRoute.Sitemap = [
    { url: `${baseUrl}/`, lastModified: now, changeFrequency: 'daily', priority: 1.0 },
    { url: `${baseUrl}/exams`, lastModified: now, changeFrequency: 'weekly', priority: 0.8 },
    { url: `${baseUrl}/visa`, lastModified: now, changeFrequency: 'weekly', priority: 0.8 },
    { url: `${baseUrl}/notices`, lastModified: now, changeFrequency: 'daily', priority: 0.9 },
    { url: `${baseUrl}/consultancy`, lastModified: now, changeFrequency: 'weekly', priority: 0.9 },
    { url: `${baseUrl}/blog`, lastModified: now, changeFrequency: 'daily', priority: 0.85 },
  ];

  // Japan Country-First Canonical Routes
  const japanRoutes: MetadataRoute.Sitemap = [
    { url: `${baseUrl}/japan`, lastModified: now, changeFrequency: 'daily', priority: 0.95 },
    { url: `${baseUrl}/japan/learn`, lastModified: now, changeFrequency: 'daily', priority: 0.9 },
    { url: `${baseUrl}/japan/learn/basics`, lastModified: now, changeFrequency: 'weekly', priority: 0.85 },
    { url: `${baseUrl}/japan/learn/vocabulary`, lastModified: now, changeFrequency: 'daily', priority: 0.9 },
    { url: `${baseUrl}/japan/learn/kanji`, lastModified: now, changeFrequency: 'weekly', priority: 0.85 },
    { url: `${baseUrl}/japan/learn/grammar`, lastModified: now, changeFrequency: 'weekly', priority: 0.85 },
    { url: `${baseUrl}/japan/learn/listening`, lastModified: now, changeFrequency: 'weekly', priority: 0.8 },
    { url: `${baseUrl}/japan/exams`, lastModified: now, changeFrequency: 'daily', priority: 0.9 },
    { url: `${baseUrl}/japan/exams/jlpt-n5`, lastModified: now, changeFrequency: 'weekly', priority: 0.9 },
    { url: `${baseUrl}/japan/exams/jlpt-n4`, lastModified: now, changeFrequency: 'weekly', priority: 0.85 },
    { url: `${baseUrl}/japan/exams/jlpt-n3`, lastModified: now, changeFrequency: 'weekly', priority: 0.85 },
    { url: `${baseUrl}/japan/exams/jft-basic`, lastModified: now, changeFrequency: 'weekly', priority: 0.9 },
    { url: `${baseUrl}/japan/visa`, lastModified: now, changeFrequency: 'weekly', priority: 0.9 },
    { url: `${baseUrl}/japan/visa/ssw`, lastModified: now, changeFrequency: 'weekly', priority: 0.9 },
    { url: `${baseUrl}/japan/visa/student`, lastModified: now, changeFrequency: 'weekly', priority: 0.85 },
    { url: `${baseUrl}/japan/work`, lastModified: now, changeFrequency: 'weekly', priority: 0.8 },
    { url: `${baseUrl}/japan/study`, lastModified: now, changeFrequency: 'weekly', priority: 0.8 },
    { url: `${baseUrl}/japan/life`, lastModified: now, changeFrequency: 'monthly', priority: 0.7 },
  ];

  // Korea Country-First Canonical Routes
  const koreaRoutes: MetadataRoute.Sitemap = [
    { url: `${baseUrl}/korea`, lastModified: now, changeFrequency: 'daily', priority: 0.95 },
    { url: `${baseUrl}/korea/learn`, lastModified: now, changeFrequency: 'daily', priority: 0.9 },
    { url: `${baseUrl}/korea/learn/basics`, lastModified: now, changeFrequency: 'weekly', priority: 0.85 },
    { url: `${baseUrl}/korea/learn/vocabulary`, lastModified: now, changeFrequency: 'daily', priority: 0.9 },
    { url: `${baseUrl}/korea/learn/grammar`, lastModified: now, changeFrequency: 'weekly', priority: 0.85 },
    { url: `${baseUrl}/korea/learn/listening`, lastModified: now, changeFrequency: 'weekly', priority: 0.8 },
    { url: `${baseUrl}/korea/exams`, lastModified: now, changeFrequency: 'daily', priority: 0.9 },
    { url: `${baseUrl}/korea/exams/eps-topik`, lastModified: now, changeFrequency: 'daily', priority: 0.95 },
    { url: `${baseUrl}/korea/exams/topik-1`, lastModified: now, changeFrequency: 'weekly', priority: 0.85 },
    { url: `${baseUrl}/korea/visa`, lastModified: now, changeFrequency: 'weekly', priority: 0.9 },
    { url: `${baseUrl}/korea/visa/e9`, lastModified: now, changeFrequency: 'weekly', priority: 0.9 },
    { url: `${baseUrl}/korea/visa/student`, lastModified: now, changeFrequency: 'weekly', priority: 0.85 },
    { url: `${baseUrl}/korea/work`, lastModified: now, changeFrequency: 'weekly', priority: 0.8 },
    { url: `${baseUrl}/korea/study`, lastModified: now, changeFrequency: 'weekly', priority: 0.8 },
    { url: `${baseUrl}/korea/life`, lastModified: now, changeFrequency: 'monthly', priority: 0.7 },
  ];

  // Blog posts
  const blogRoutes: MetadataRoute.Sitemap = INITIAL_POSTS.map((post) => ({
    url: `${baseUrl}/blog/${post.id}`,
    lastModified: now,
    changeFrequency: 'weekly',
    priority: 0.85,
  }));

  return [...sharedRoutes, ...japanRoutes, ...koreaRoutes, ...blogRoutes];
}
