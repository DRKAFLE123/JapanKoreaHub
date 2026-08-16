import React from 'react';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { INITIAL_POSTS, findPostBySlugOrId, getPostSlug } from '@/lib/blog-data';
import { BlogArticleView } from '@/components/BlogArticleView';

interface Props {
  params: Promise<{ id: string }> | { id: string };
}

export async function generateStaticParams() {
  const paramsList: { id: string }[] = [];
  INITIAL_POSTS.forEach((post) => {
    paramsList.push({ id: post.id });
    if (post.slug && post.slug !== post.id) {
      paramsList.push({ id: post.slug });
    }
  });
  return paramsList;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const resolvedParams = await params;
  const post = findPostBySlugOrId(resolvedParams.id);
  if (!post) {
    return {
      title: 'Article Not Found | LanguageGuru',
      description: 'The requested blog article could not be found.',
    };
  }

  const postSlug = getPostSlug(post);
  const canonicalUrl = `https://languageguru.app/blog/${postSlug}`;

  return {
    title: `${post.title} | LanguageGuru`,
    description: post.excerpt,
    keywords: [
      ...post.tags,
      post.country,
      post.category,
      'E-7 Visa Korea',
      'LanguageGuru Blog',
      'Japan SSW Visa',
      'EPS TOPIK Korea',
      'Prometric Exam'
    ],
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title: post.title,
      description: post.excerpt,
      url: canonicalUrl,
      siteName: 'LanguageGuru',
      type: 'article',
      publishedTime: post.date,
      authors: [post.author],
      images: post.image ? [{ url: `https://languageguru.app${post.image}`, width: 1200, height: 630, alt: post.title }] : undefined,
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.excerpt,
      images: post.image ? [`https://languageguru.app${post.image}`] : undefined,
    },
  };
}

export default async function BlogPostPage({ params }: Props) {
  const resolvedParams = await params;
  const post = findPostBySlugOrId(resolvedParams.id);
  if (!post) {
    notFound();
  }

  const postSlug = getPostSlug(post);

  // Structured JSON-LD Data for SEO
  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Home',
        item: 'https://languageguru.app',
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'Blog',
        item: 'https://languageguru.app/blog',
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: post.title,
        item: `https://languageguru.app/blog/${postSlug}`,
      },
    ],
  };

  const articleJsonLd = {
    '@context': 'https://schema.org',
    '@type': post.category === 'VACANCY' ? 'JobPosting' : 'Article',
    headline: post.title,
    description: post.excerpt,
    author: {
      '@type': 'Person',
      name: post.author,
    },
    publisher: {
      '@type': 'Organization',
      name: 'LanguageGuru',
      url: 'https://languageguru.app',
      logo: {
        '@type': 'ImageObject',
        url: 'https://languageguru.app/logo.png',
      },
    },
    datePublished: '2026-08-16',
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `https://languageguru.app/blog/${postSlug}`,
    },
    image: post.image ? `https://languageguru.app${post.image}` : undefined,
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }}
      />
      <BlogArticleView post={post} />
    </>
  );
}
