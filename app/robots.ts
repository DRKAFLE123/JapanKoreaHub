import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: ['/', '/japan/*', '/korea/*', '/exams', '/visa', '/notices/*', '/blog/*', '/consultancy'],
      disallow: ['/dashboard', '/profile', '/admin/*', '/api/*'],
    },
    sitemap: 'https://japankoreahub.com/sitemap.xml',
  };
}
