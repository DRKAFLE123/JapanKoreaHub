import { MetadataRoute } from 'next';
import { GUIDE_CATALOG } from '@/lib/guides-data';
import { INITIAL_POSTS } from '@/lib/blog-data';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://japankoreaacademy.com';

  // Base pages
  const routes: MetadataRoute.Sitemap = [
    {
      url: `${baseUrl}/`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1.0,
    },
    {
      url: `${baseUrl}/blog`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.9,
    },
  ];

  // 20 Dedicated Guides sitemap links
  GUIDE_CATALOG.forEach((guide) => {
    routes.push({
      url: `${baseUrl}/guide/${guide.id}`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    });
  });

  // Blog posts & Job vacancies sitemap links
  INITIAL_POSTS.forEach((post) => {
    routes.push({
      url: `${baseUrl}/blog/${post.id}`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.85,
    });
  });

  return routes;
}
