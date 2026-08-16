'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  ArrowLeft, Calendar, MapPin, DollarSign, Briefcase, Award,
  Clock, Share2, Tag, CheckCircle2, Send, Sparkles, ShieldCheck,
  List, Link as LinkIcon, MessageSquare, Globe, ChevronRight, BookOpen, User
} from 'lucide-react';
import { BlogPost, INITIAL_POSTS, getPostSlug } from '@/lib/blog-data';

interface TOCItem {
  id: string;
  text: string;
  level: 2 | 3;
}

interface BlogArticleViewProps {
  post: BlogPost;
}

// Generate URL slug from heading string
function slugifyHeading(text: string, index: number): string {
  const clean = text
    .replace(/[^\w\s\u0900-\u097F-]/g, '')
    .trim()
    .toLowerCase()
    .replace(/\s+/g, '-');
  return clean ? `section-${clean}` : `section-heading-${index}`;
}

// Extract Table of Contents items from Markdown content
function extractTOC(content: string): { items: TOCItem[]; processedContent: string } {
  const lines = content.split('\n');
  const items: TOCItem[] = [];
  let headingIndex = 0;

  const processedLines = lines.map((line) => {
    const h2Match = line.match(/^##\s+(.+)$/);
    const h3Match = line.match(/^###\s+(.+)$/);

    if (h2Match) {
      headingIndex++;
      const rawText = h2Match[1].replace(/\*\*/g, '').trim();
      const id = slugifyHeading(rawText, headingIndex);
      items.push({ id, text: rawText, level: 2 });
      return `<h2 id="${id}" class="text-xl sm:text-2xl font-black text-slate-900 pt-6 pb-2 border-b border-slate-200 scroll-mt-24 flex items-center gap-2 group"><span class="text-indigo-600 font-mono text-sm opacity-60">#</span><span>${rawText}</span></h2>`;
    }

    if (h3Match) {
      headingIndex++;
      const rawText = h3Match[1].replace(/\*\*/g, '').trim();
      const id = slugifyHeading(rawText, headingIndex);
      items.push({ id, text: rawText, level: 3 });
      return `<h3 id="${id}" class="text-lg font-extrabold text-slate-800 pt-4 pb-1 scroll-mt-24 flex items-center gap-2"><span class="text-pink-600 font-mono text-xs opacity-60">##</span><span>${rawText}</span></h3>`;
    }

    return line;
  });

  return { items, processedContent: processedLines.join('\n') };
}

export const BlogArticleView: React.FC<BlogArticleViewProps> = ({ post }) => {
  const [activeId, setActiveId] = useState<string>('');
  const [scrollProgress, setScrollProgress] = useState<number>(0);
  const [copied, setCopied] = useState<boolean>(false);
  const [mobileTocOpen, setMobileTocOpen] = useState<boolean>(false);

  const { items: tocItems, processedContent } = extractTOC(post.content);

  // Filter related articles (same category or country)
  const relatedPosts = INITIAL_POSTS.filter(
    (p) => p.id !== post.id && (p.category === post.category || p.country === post.country)
  ).slice(0, 3);

  useEffect(() => {
    const handleScroll = () => {
      // Progress Bar Calculation
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (totalHeight > 0) {
        const currentProgress = (window.scrollY / totalHeight) * 100;
        setScrollProgress(Math.min(100, Math.max(0, currentProgress)));
      }

      // TOC Intersection / Active Heading Highlight
      const headingElements = tocItems
        .map((item) => document.getElementById(item.id))
        .filter(Boolean) as HTMLElement[];

      let currentActive = '';
      for (const el of headingElements) {
        const top = el.getBoundingClientRect().top;
        if (top <= 140) {
          currentActive = el.id;
        } else {
          break;
        }
      }
      if (currentActive) {
        setActiveId(currentActive);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, [tocItems]);

  // Social Share Handlers
  const pageUrl = typeof window !== 'undefined' ? window.location.href : `https://languageguru.app/blog/${getPostSlug(post)}`;

  const handleCopyLink = () => {
    if (typeof navigator !== 'undefined') {
      navigator.clipboard.writeText(pageUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  const shareNative = () => {
    if (typeof navigator !== 'undefined' && navigator.share) {
      navigator.share({
        title: post.title,
        text: post.excerpt,
        url: pageUrl,
      }).catch(() => {});
    } else {
      handleCopyLink();
    }
  };

  const shareFacebookUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(pageUrl)}`;
  const shareTwitterUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(post.title)}&url=${encodeURIComponent(pageUrl)}`;
  const shareWhatsappUrl = `https://api.whatsapp.com/send?text=${encodeURIComponent(`${post.title}\n\n${pageUrl}`)}`;
  const shareLinkedinUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(pageUrl)}`;

  // Custom Markdown Parser to HTML Elements
  const renderFormattedBody = () => {
    // Split by Markdown blocks
    const lines = processedContent.split('\n');
    const elements: React.ReactNode[] = [];
    let inTable = false;
    let tableRows: string[][] = [];
    let tableHeaders: string[] = [];

    lines.forEach((line, idx) => {
      const trimmed = line.trim();

      // Check Table Lines
      if (trimmed.startsWith('|') && trimmed.endsWith('|')) {
        const cells = trimmed.split('|').map((c) => c.trim()).filter((_, i, a) => i > 0 && i < a.length - 1);
        if (!inTable) {
          inTable = true;
          tableHeaders = cells;
        } else if (trimmed.includes('---')) {
          // Separator row - ignore
        } else {
          tableRows.push(cells);
        }
        return;
      } else if (inTable) {
        // Table finished, render table element
        elements.push(
          <div key={`table-${idx}`} className="my-6 overflow-x-auto rounded-2xl border border-slate-200 shadow-xs bg-white">
            <table className="w-full text-left text-xs sm:text-sm border-collapse">
              <thead>
                <tr className="bg-slate-100 border-b border-slate-200 text-slate-900 font-extrabold uppercase tracking-wider">
                  {tableHeaders.map((h, i) => (
                    <th key={i} className="px-4 py-3">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 text-slate-800 font-medium">
                {tableRows.map((row, rIdx) => (
                  <tr key={rIdx} className="hover:bg-slate-50 transition-colors">
                    {row.map((cell, cIdx) => (
                      <td key={cIdx} className="px-4 py-3">{cell}</td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        );
        inTable = false;
        tableHeaders = [];
        tableRows = [];
      }

      // Check Heading HTML injects
      if (trimmed.startsWith('<h2') || trimmed.startsWith('<h3')) {
        elements.push(
          <div key={idx} dangerouslySetInnerHTML={{ __html: trimmed }} />
        );
        return;
      }

      // Check Blockquote
      if (trimmed.startsWith('> ')) {
        const quoteText = trimmed.replace(/^>\s+/, '').replace(/\*\*/g, '');
        elements.push(
          <blockquote key={idx} className="my-4 p-4 rounded-2xl bg-amber-50 border-l-4 border-amber-500 text-amber-900 text-xs sm:text-sm font-medium space-y-1">
            <p>{quoteText}</p>
          </blockquote>
        );
        return;
      }

      // Check Horizontal Rule
      if (trimmed === '---') {
        elements.push(<hr key={idx} className="my-8 border-slate-200" />);
        return;
      }

      // Check Bullet Lists
      if (trimmed.startsWith('- ') || trimmed.startsWith('* ')) {
        const itemText = trimmed.substring(2);
        elements.push(
          <li key={idx} className="ml-4 list-disc text-slate-700 leading-relaxed text-xs sm:text-sm my-1">
            <span dangerouslySetInnerHTML={{
              __html: itemText.replace(/\*\*(.*?)\*\*/g, '<strong class="text-slate-900 font-black">$1</strong>')
            }} />
          </li>
        );
        return;
      }

      // Check Numbered Lists
      const numMatch = trimmed.match(/^(\d+)\.\s+(.+)$/);
      if (numMatch) {
        elements.push(
          <div key={idx} className="flex items-start gap-2.5 my-2 text-xs sm:text-sm text-slate-700">
            <span className="flex-shrink-0 w-6 h-6 rounded-full bg-indigo-100 text-indigo-800 border border-indigo-200 text-xs font-black flex items-center justify-center">
              {numMatch[1]}
            </span>
            <span className="pt-0.5" dangerouslySetInnerHTML={{
              __html: numMatch[2].replace(/\*\*(.*?)\*\*/g, '<strong class="text-slate-900 font-black">$1</strong>')
            }} />
          </div>
        );
        return;
      }

      // Normal Paragraph
      if (trimmed) {
        elements.push(
          <p key={idx} className="text-xs sm:text-sm text-slate-700 leading-relaxed my-3 font-medium" dangerouslySetInnerHTML={{
            __html: trimmed
              .replace(/\*\*(.*?)\*\*/g, '<strong class="text-slate-900 font-black">$1</strong>')
              .replace(/\[(.*?)\]\((.*?)\)/g, '<a href="$2" target="_blank" rel="noopener noreferrer" class="text-indigo-600 underline underline-offset-4 hover:text-indigo-700 font-bold">$1</a>')
          }} />
        );
      }
    });

    return elements;
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans relative">
      {/* Reading Scroll Progress Bar */}
      <div className="fixed top-0 left-0 right-0 h-1 bg-slate-200 z-50">
        <div
          className="h-full bg-gradient-to-r from-indigo-600 via-purple-600 to-emerald-500 transition-all duration-150"
          style={{ width: `${scrollProgress}%` }}
        />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        
        {/* Breadcrumb & Navigation Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-slate-200 pb-4">
          <nav className="flex items-center gap-2 text-xs font-bold text-slate-500 overflow-x-auto no-scrollbar">
            <Link href="/" className="hover:text-slate-900 transition-colors flex items-center gap-1">
              Home
            </Link>
            <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
            <Link href="/blog" className="hover:text-slate-900 transition-colors flex items-center gap-1">
              Blog
            </Link>
            <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
            <span className="text-indigo-700 px-2.5 py-0.5 rounded-full bg-indigo-50 border border-indigo-200 font-black">
              {post.category}
            </span>
          </nav>

          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-xs font-extrabold text-slate-700 hover:text-slate-900 transition-colors bg-white border border-slate-200 shadow-xs rounded-xl px-3.5 py-2 hover:bg-slate-100"
          >
            <ArrowLeft className="w-4 h-4 text-indigo-600" /> Back to Blog Index
          </Link>
        </div>

        {/* Main Article Container Layout: 2 Columns on Desktop (Article + Sticky TOC Sidebar) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Main Article Body (Col 8) */}
          <article className="lg:col-span-8 bg-white border border-slate-200 rounded-3xl p-6 sm:p-10 shadow-xs space-y-8 text-slate-800">
            
            {/* Title & Metadata Header */}
            <div className="space-y-4 border-b border-slate-200 pb-6">
              <div className="flex items-center gap-2 flex-wrap">
                <span className="px-3 py-1 rounded-full bg-indigo-50 text-indigo-700 text-xs font-extrabold border border-indigo-200">
                  {post.category}
                </span>
                <span className="px-3 py-1 rounded-full bg-slate-100 text-slate-700 text-xs font-bold border border-slate-200">
                  {post.country}
                </span>
                <span className="px-3 py-1 rounded-full bg-emerald-50 text-emerald-800 text-xs font-bold border border-emerald-200 flex items-center gap-1">
                  <Clock className="w-3 h-3 text-emerald-600" /> {post.readTime}
                </span>
              </div>

              <h1 className="text-2xl sm:text-4xl font-black text-slate-900 leading-snug tracking-tight">
                {post.title}
              </h1>

              <div className="flex items-center justify-between text-xs text-slate-500 font-medium pt-2">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-indigo-600 text-white flex items-center justify-center font-bold text-xs shadow-xs">
                    {post.author[0]}
                  </div>
                  <div>
                    <span className="text-slate-900 font-bold block">{post.author}</span>
                    <span className="text-slate-500 text-[11px]">{post.date}</span>
                  </div>
                </div>

                {/* Quick Share Trigger */}
                <button
                  onClick={shareNative}
                  className="p-2.5 rounded-xl bg-slate-100 hover:bg-indigo-600 text-slate-700 hover:text-white transition-all cursor-pointer flex items-center gap-1.5 text-xs font-bold border border-slate-200"
                >
                  <Share2 className="w-4 h-4 text-indigo-600" /> Share
                </button>
              </div>
            </div>

            {/* Featured Image */}
            {post.image && (
              <div className="relative w-full aspect-video sm:aspect-[21/9] rounded-2xl overflow-hidden border border-slate-200 shadow-sm bg-slate-100">
                <img
                  src={post.image}
                  alt={post.title}
                  className="w-full h-full object-cover"
                />
              </div>
            )}

            {/* Mobile Expandable Table of Contents Accordion */}
            {tocItems.length > 0 && (
              <div className="block lg:hidden bg-slate-50 border border-slate-200 rounded-2xl overflow-hidden">
                <button
                  onClick={() => setMobileTocOpen(!mobileTocOpen)}
                  className="w-full p-4 flex items-center justify-between font-extrabold text-xs text-indigo-700 uppercase tracking-wider cursor-pointer"
                >
                  <span className="flex items-center gap-2">
                    <List className="w-4 h-4 text-amber-600" /> Table of Contents ({tocItems.length} Sections)
                  </span>
                  <span className="text-slate-500 text-xs">{mobileTocOpen ? 'Hide ▲' : 'Show ▼'}</span>
                </button>
                {mobileTocOpen && (
                  <div className="p-4 pt-0 space-y-2 border-t border-slate-200 text-xs">
                    {tocItems.map((item) => (
                      <a
                        key={item.id}
                        href={`#${item.id}`}
                        onClick={() => setMobileTocOpen(false)}
                        className={`block transition-colors py-1 ${
                          item.level === 3 ? 'pl-4 text-slate-600 hover:text-slate-900' : 'font-bold text-slate-800 hover:text-indigo-600'
                        }`}
                      >
                        {item.text}
                      </a>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* Job Details Card (If Job Announcement) */}
            {post.salary && (
              <div className="bg-slate-50 border border-slate-200 rounded-2xl p-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Offered Salary</span>
                  <div className="text-lg font-black text-emerald-700 flex items-center gap-1.5">
                    <DollarSign className="w-5 h-5" /> {post.salary}
                  </div>
                </div>

                {post.quota && (
                  <div className="space-y-1">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Available Vacancies</span>
                    <div className="text-lg font-black text-indigo-700 flex items-center gap-1.5">
                      <Briefcase className="w-5 h-5" /> {post.quota}
                    </div>
                  </div>
                )}

                {post.location && (
                  <div className="space-y-1">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Job Location</span>
                    <div className="text-xs font-bold text-slate-800 flex items-center gap-1.5">
                      <MapPin className="w-4 h-4 text-rose-500" /> {post.location}
                    </div>
                  </div>
                )}

                {post.deadline && (
                  <div className="space-y-1">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Application Deadline</span>
                    <div className="text-xs font-bold text-amber-800 flex items-center gap-1.5">
                      <Calendar className="w-4 h-4" /> {post.deadline}
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Article Excerpt Banner */}
            <div className="p-4 rounded-2xl bg-indigo-50 border border-indigo-200 text-xs sm:text-sm text-indigo-900 font-medium leading-relaxed">
              💡 <strong>Summary:</strong> {post.excerpt}
            </div>

            {/* Article Main Body Content */}
            <div className="space-y-4">
              {renderFormattedBody()}
            </div>

            {/* Tags Strip */}
            <div className="pt-6 border-t border-slate-200 flex items-center gap-2 flex-wrap">
              <Tag className="w-4 h-4 text-slate-400" />
              {post.tags.map((t) => (
                <span key={t} className="px-3 py-1 rounded-lg bg-slate-100 border border-slate-200 text-xs font-bold text-slate-600">
                  #{t}
                </span>
              ))}
            </div>

            {/* Social Share Bar Component */}
            <div className="pt-6 border-t border-slate-200 space-y-4 bg-slate-50 p-6 rounded-2xl border">
              <div className="flex items-center justify-between">
                <span className="text-xs font-black uppercase tracking-wider text-slate-800 flex items-center gap-2">
                  <Share2 className="w-4 h-4 text-indigo-600" /> Share this Article
                </span>
                {copied && (
                  <span className="text-xs font-bold text-emerald-800 bg-emerald-100 px-3 py-1 rounded-full border border-emerald-300 animate-pulse">
                    ✓ Link copied to clipboard!
                  </span>
                )}
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-5 gap-2.5">
                <button
                  onClick={handleCopyLink}
                  className="px-3.5 py-2.5 rounded-xl bg-white border border-slate-200 hover:bg-slate-100 text-slate-800 text-xs font-bold flex items-center justify-center gap-2 transition-all cursor-pointer shadow-xs"
                >
                  <LinkIcon className="w-4 h-4 text-indigo-600" /> Copy Link
                </button>

                <a
                  href={shareWhatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3.5 py-2.5 rounded-xl bg-emerald-50 border border-emerald-200 hover:bg-emerald-100 text-emerald-800 text-xs font-bold flex items-center justify-center gap-2 transition-all"
                >
                  <MessageSquare className="w-4 h-4 text-emerald-600" /> WhatsApp
                </a>

                <a
                  href={shareFacebookUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3.5 py-2.5 rounded-xl bg-blue-50 border border-blue-200 hover:bg-blue-100 text-blue-800 text-xs font-bold flex items-center justify-center gap-2 transition-all"
                >
                  <svg className="w-4 h-4 fill-current text-blue-600" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg> Facebook
                </a>

                <a
                  href={shareTwitterUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3.5 py-2.5 rounded-xl bg-sky-50 border border-sky-200 hover:bg-sky-100 text-sky-800 text-xs font-bold flex items-center justify-center gap-2 transition-all"
                >
                  <svg className="w-4 h-4 fill-current text-sky-600" viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg> Twitter / X
                </a>

                <a
                  href={shareLinkedinUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3.5 py-2.5 rounded-xl bg-indigo-50 border border-indigo-200 hover:bg-indigo-100 text-indigo-800 text-xs font-bold flex items-center justify-center gap-2 transition-all col-span-2 sm:col-span-1"
                >
                  <Globe className="w-4 h-4 text-indigo-600" /> LinkedIn
                </a>
              </div>
            </div>

            {/* Bottom CTA Box */}
            <div className="pt-6 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4 bg-gradient-to-r from-indigo-600 via-indigo-700 to-purple-700 p-6 rounded-2xl border border-indigo-500/30 text-white">
              <div className="space-y-1 text-center sm:text-left">
                <span className="text-xs font-black text-white">Ready for EPS or JLPT Exam Preparation?</span>
                <p className="text-xs text-indigo-100 font-medium">Practice full interactive CBT mock exams with instant timing &amp; score report.</p>
              </div>
              <Link
                href="/exams"
                className="w-full sm:w-auto px-6 py-3 rounded-xl bg-white hover:bg-slate-100 text-indigo-700 text-xs font-black shadow-md flex items-center justify-center gap-2 shrink-0 transition-all"
              >
                <Send className="w-4 h-4" /> Start Practice Exam
              </Link>
            </div>

          </article>

          {/* Sticky Sidebar (Col 4 on Desktop) — Table of Contents & Related Posts */}
          <aside className="hidden lg:block lg:col-span-4 space-y-6 sticky top-24">
            
            {/* Desktop Table of Contents Box */}
            {tocItems.length > 0 && (
              <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-xs space-y-4">
                <div className="flex items-center gap-2 border-b border-slate-200 pb-3">
                  <List className="w-4 h-4 text-indigo-600" />
                  <h3 className="text-xs font-black uppercase tracking-wider text-slate-900">Table of Contents</h3>
                </div>

                <nav className="space-y-1 text-xs max-h-[50vh] overflow-y-auto pr-1 no-scrollbar">
                  {tocItems.map((item) => {
                    const isActive = activeId === item.id;
                    return (
                      <a
                        key={item.id}
                        href={`#${item.id}`}
                        className={`block transition-all py-1.5 px-3 rounded-xl leading-snug ${
                          item.level === 3 ? 'ml-3 text-[11px]' : 'font-bold'
                        } ${
                          isActive
                            ? 'bg-indigo-50 text-indigo-700 font-extrabold border-l-4 border-indigo-600 rounded-r-xl'
                            : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                        }`}
                      >
                        {item.text}
                      </a>
                    );
                  })}
                </nav>
              </div>
            )}

            {/* Related Posts Box */}
            {relatedPosts.length > 0 && (
              <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-xs space-y-4">
                <div className="flex items-center gap-2 border-b border-slate-200 pb-3">
                  <BookOpen className="w-4 h-4 text-indigo-600" />
                  <h3 className="text-xs font-black uppercase tracking-wider text-slate-900">Related Articles</h3>
                </div>

                <div className="space-y-3">
                  {relatedPosts.map((rel) => (
                    <Link
                      key={rel.id}
                      href={`/blog/${getPostSlug(rel)}`}
                      className="block p-3.5 rounded-2xl bg-slate-50 border border-slate-200 hover:border-indigo-400 transition-all space-y-1.5 group"
                    >
                      <span className="text-[10px] font-black uppercase px-2 py-0.5 rounded bg-indigo-50 text-indigo-700 border border-indigo-200">
                        {rel.category}
                      </span>
                      <h4 className="text-xs font-bold text-slate-800 group-hover:text-indigo-600 transition-colors line-clamp-2">
                        {rel.title}
                      </h4>
                      <span className="text-[10px] text-slate-500 block">{rel.date}</span>
                    </Link>
                  ))}
                </div>
              </div>
            )}

          </aside>

        </div>

      </div>
    </div>
  );
};
