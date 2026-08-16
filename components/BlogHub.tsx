'use client';

import React, { useState, useEffect } from 'react';
import {
  Search, Filter, Plus, Calendar, MapPin, Briefcase, DollarSign,
  UserCheck, Award, Globe, ArrowRight, X, Sparkles, Share2, Bookmark,
  CheckCircle2, AlertCircle, Send, FileText, Tag, MessageSquare, Clock
} from 'lucide-react';

import Link from 'next/link';
import { INITIAL_POSTS, BlogPost, getPostSlug } from '@/lib/blog-data';

export interface BlogHubProps {
  onNavigateView?: (view: 'LANDING' | 'JAPANESE' | 'KOREAN') => void;
  onOpenMockTest?: (track?: 'JAPANESE' | 'KOREAN') => void;
}

export const BlogHub: React.FC<BlogHubProps> = ({ onNavigateView, onOpenMockTest }) => {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null);
  const [activeCategory, setActiveCategory] = useState<'ALL' | 'VACANCY' | 'VISA' | 'EXAM' | 'JAPAN' | 'KOREA'>('ALL');
  const [searchQuery, setSearchQuery] = useState('');
  const [showCreateModal, setShowCreateModal] = useState(false);

  // New Post Form State
  const [newTitle, setNewTitle] = useState('');
  const [newCategory, setNewCategory] = useState<'VACANCY' | 'VISA' | 'EXAM' | 'GUIDE'>('VACANCY');
  const [newCountry, setNewCountry] = useState<'JAPAN' | 'KOREA' | 'GLOBAL'>('JAPAN');
  const [newLocation, setNewLocation] = useState('');
  const [newSalary, setNewSalary] = useState('');
  const [newQuota, setNewQuota] = useState('');
  const [newDeadline, setNewDeadline] = useState('');
  const [newRequirement, setNewRequirement] = useState('');
  const [newExcerpt, setNewExcerpt] = useState('');
  const [newContent, setNewContent] = useState('');

  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    fetch('/api/auth/me')
      .then(res => res.json())
      .then(data => {
        if (data.authenticated && data.user?.role === 'ADMIN') {
          setIsAdmin(true);
        }
      })
      .catch(() => {});
  }, []);

  useEffect(() => {
    const saved = localStorage.getItem('lg_blog_posts');
    if (saved) {
      try {
        const parsed: BlogPost[] = JSON.parse(saved);
        const initialIds = new Set(INITIAL_POSTS.map(p => p.id));
        const userCreated = parsed.filter(p => !initialIds.has(p.id));
        setPosts([...INITIAL_POSTS, ...userCreated]);
      } catch (_) {
        setPosts(INITIAL_POSTS);
      }
    } else {
      setPosts(INITIAL_POSTS);
    }
  }, []);

  const savePosts = (updated: BlogPost[]) => {
    setPosts(updated);
    localStorage.setItem('lg_blog_posts', JSON.stringify(updated));
  };

  const handleCreatePost = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim() || !newContent.trim()) return;

    const newPost: BlogPost = {
      id: `post-${Date.now()}`,
      title: newTitle,
      category: newCategory,
      country: newCountry,
      author: 'Administrator',
      date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
      readTime: '3 min read',
      excerpt: newExcerpt || newContent.slice(0, 140) + '...',
      content: newContent,
      location: newLocation,
      salary: newSalary,
      quota: newQuota,
      deadline: newDeadline,
      requirement: newRequirement,
      tags: [newCategory, newCountry, 'Official Post'],
      isFeatured: false,
    };

    const updated = [newPost, ...posts];
    savePosts(updated);
    setShowCreateModal(false);

    // Reset Form
    setNewTitle(''); setNewExcerpt(''); setNewContent('');
    setNewLocation(''); setNewSalary(''); setNewQuota('');
    setNewDeadline(''); setNewRequirement('');
  };

  const filteredPosts = posts.filter((p) => {
    if (activeCategory === 'VACANCY' && p.category !== 'VACANCY') return false;
    if (activeCategory === 'VISA' && p.category !== 'VISA') return false;
    if (activeCategory === 'EXAM' && p.category !== 'EXAM') return false;
    if (activeCategory === 'JAPAN' && p.country !== 'JAPAN') return false;
    if (activeCategory === 'KOREA' && p.country !== 'KOREA') return false;

    if (searchQuery.trim() !== '') {
      const q = searchQuery.toLowerCase();
      return (
        p.title.toLowerCase().includes(q) ||
        p.excerpt.toLowerCase().includes(q) ||
        p.tags.some((t) => t.toLowerCase().includes(q)) ||
        (p.location && p.location.toLowerCase().includes(q))
      );
    }
    return true;
  });

  return (
    <div className="w-full max-w-7xl mx-auto space-y-6 font-sans pb-16">
      
      {/* Header Section */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pt-2">
        <div className="space-y-1">
          <h1 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
            Blog &amp; Vacancies
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 font-medium">
            Authentic employer recruitment vacancies, Japanese SSW updates, HRD Korea E-9 notices &amp; Prometric seat releases
          </p>
        </div>

        {isAdmin && (
          <button
            onClick={() => setShowCreateModal(true)}
            className="w-full sm:w-auto px-4 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-black shadow-xs flex items-center justify-center gap-2 transition-all cursor-pointer shrink-0"
          >
            <Plus className="w-4 h-4" />
            <span>Post Announcement / Vacancy</span>
          </button>
        )}
      </div>

      {/* Filter & Search Toolbar */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-4 bg-white border border-slate-200 rounded-2xl p-4 shadow-sm">
        {/* Category Tabs */}
        <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar w-full md:w-auto">
          {[
            { id: 'ALL', label: 'All Posts' },
            { id: 'VACANCY', label: '📢 Job Vacancies' },
            { id: 'VISA', label: '💼 Visa Updates' },
            { id: 'EXAM', label: '🎓 Exam Schedules' },
            { id: 'JAPAN', label: '🇯🇵 Japan News' },
            { id: 'KOREA', label: '🇰🇷 Korea News' },
          ].map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id as any)}
              className={`px-3.5 py-2 rounded-xl text-xs font-extrabold transition-all whitespace-nowrap cursor-pointer ${
                activeCategory === cat.id
                  ? 'bg-indigo-600 text-white shadow-xs'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200 hover:text-slate-900 border border-slate-200/80'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Search Bar */}
        <div className="relative w-full md:w-72">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search news, vacancies..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-9 pr-3 py-2 text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:bg-white focus:border-indigo-500 transition-all font-medium"
          />
        </div>
      </div>

      {/* Posts Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredPosts.length === 0 ? (
          <div className="col-span-full text-center py-12 bg-white border border-slate-200 rounded-3xl text-slate-500 space-y-2 shadow-sm">
            <AlertCircle className="w-8 h-8 text-amber-500 mx-auto" />
            <p className="text-sm font-bold text-slate-900">No articles or vacancies found</p>
            <p className="text-xs text-slate-500">Try adjusting your category filter or search keywords</p>
          </div>
        ) : (
          filteredPosts.map((post) => (
            <Link
              key={post.id}
              href={`/blog/${getPostSlug(post)}`}
              className="bg-white border border-slate-200/90 hover:border-indigo-400 rounded-3xl p-5 shadow-xs hover:shadow-md space-y-4 flex flex-col justify-between transition-all hover:-translate-y-1 cursor-pointer group overflow-hidden"
            >
              <div className="space-y-3">
                {/* Optional Featured Image Preview */}
                {post.image && (
                  <div className="w-full aspect-[16/9] rounded-2xl overflow-hidden border border-slate-200 bg-slate-100">
                    <img src={post.image} alt={post.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                  </div>
                )}

                {/* Header Tag Badges */}
                <div className="flex items-center justify-between gap-2">
                  <span className={`text-[10px] font-black uppercase tracking-wider px-2.5 py-0.5 rounded-md ${
                    post.category === 'VACANCY' ? 'bg-rose-50 text-rose-700 border border-rose-200' :
                    post.category === 'VISA'    ? 'bg-amber-50 text-amber-800 border border-amber-200' :
                    'bg-indigo-50 text-indigo-700 border border-indigo-200'
                  }`}>
                    {post.category}
                  </span>

                  <span className="text-[10px] font-bold text-slate-500 flex items-center gap-1">
                    <Clock className="w-3 h-3 text-slate-400" />
                    <span>{post.date}</span>
                  </span>
                </div>

                {/* Article Title */}
                <h3 className="text-base font-black text-slate-900 group-hover:text-indigo-600 transition-colors leading-snug line-clamp-2">
                  {post.title}
                </h3>

                {/* Vacancy Details Strip (If Vacancy) */}
                {post.salary && (
                  <div className="bg-slate-50 border border-slate-200 rounded-xl p-2.5 space-y-1 text-xs font-medium text-slate-800">
                    <div className="flex items-center justify-between text-emerald-700 font-black">
                      <span className="flex items-center gap-1"><DollarSign className="w-3.5 h-3.5" /> {post.salary}</span>
                      {post.quota && <span className="px-2 py-0.5 rounded bg-emerald-100 text-[10px] text-emerald-800 border border-emerald-300 font-bold">{post.quota}</span>}
                    </div>
                    {post.location && (
                      <div className="flex items-center gap-1.5 text-[11px] text-slate-600 font-semibold">
                        <MapPin className="w-3 h-3 text-rose-500 shrink-0" />
                        <span className="truncate">{post.location}</span>
                      </div>
                    )}
                  </div>
                )}

                {/* Excerpt */}
                <p className="text-xs text-slate-600 leading-relaxed font-medium line-clamp-3">
                  {post.excerpt}
                </p>
              </div>

              {/* Card Footer */}
              <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-indigo-600 font-extrabold group-hover:text-indigo-700">
                <span>Read Full Announcement</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </div>
            </Link>
          ))
        )}
      </div>

      {/* FULL ARTICLE READER MODAL */}
      {selectedPost && (
        <div className="fixed inset-0 z-[90] flex items-center justify-center p-3 sm:p-6 bg-slate-900/60 backdrop-blur-xs animate-fade-in font-sans">
          <div className="w-full max-w-4xl max-h-[90vh] bg-white border border-slate-200 rounded-3xl shadow-2xl flex flex-col overflow-hidden text-slate-900">
            
            {/* Modal Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-slate-200 bg-slate-50">
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-0.5 rounded-full bg-indigo-50 text-indigo-700 text-xs font-bold border border-indigo-200">
                  {selectedPost.category}
                </span>
                <span className="text-xs text-slate-500">• {selectedPost.readTime}</span>
              </div>
              <button
                onClick={() => setSelectedPost(null)}
                className="p-2 rounded-xl bg-slate-100 hover:bg-rose-500 text-slate-500 hover:text-white transition-all cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Content Pane */}
            <div className="p-6 sm:p-8 overflow-y-auto space-y-6">
              <div className="space-y-3">
                <h1 className="text-2xl sm:text-3xl font-black text-slate-900 leading-tight">
                  {selectedPost.title}
                </h1>
                <div className="flex items-center gap-4 text-xs text-slate-500 font-medium border-b border-slate-200 pb-4">
                  <span>By <strong className="text-slate-800">{selectedPost.author}</strong></span>
                  <span>•</span>
                  <span>{selectedPost.date}</span>
                </div>
              </div>

              {/* Modal Featured Image */}
              {selectedPost.image && (
                <div className="w-full aspect-video sm:aspect-[21/9] rounded-2xl overflow-hidden border border-slate-200 shadow-md">
                  <img src={selectedPost.image} alt={selectedPost.title} className="w-full h-full object-cover" />
                </div>
              )}

              {/* Vacancy Details Box if Salary Available */}
              {selectedPost.salary && (
                <div className="bg-slate-50 border border-slate-200 rounded-2xl p-5 grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Offered Salary</span>
                    <div className="text-base font-black text-emerald-700 flex items-center gap-1.5">
                      <DollarSign className="w-4 h-4" /> {selectedPost.salary}
                    </div>
                  </div>
                  {selectedPost.quota && (
                    <div className="space-y-1">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Available Openings</span>
                      <div className="text-base font-black text-indigo-700 flex items-center gap-1.5">
                        <Briefcase className="w-4 h-4" /> {selectedPost.quota}
                      </div>
                    </div>
                  )}
                  {selectedPost.location && (
                    <div className="space-y-1">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Job Location</span>
                      <div className="text-xs font-bold text-slate-800 flex items-center gap-1.5">
                        <MapPin className="w-4 h-4 text-rose-500" /> {selectedPost.location}
                      </div>
                    </div>
                  )}
                  {selectedPost.deadline && (
                    <div className="space-y-1">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Application Deadline</span>
                      <div className="text-xs font-bold text-amber-800 flex items-center gap-1.5">
                        <Calendar className="w-4 h-4" /> {selectedPost.deadline}
                      </div>
                    </div>
                  )}
                  {selectedPost.requirement && (
                    <div className="col-span-full pt-2 border-t border-slate-200 space-y-1">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Minimum Exam Requirement</span>
                      <div className="text-xs font-bold text-rose-700 flex items-center gap-1.5">
                        <Award className="w-4 h-4" /> {selectedPost.requirement}
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* Full Article Text */}
              <div className="prose max-w-none text-xs sm:text-sm text-slate-700 leading-relaxed whitespace-pre-line space-y-4 font-medium">
                {selectedPost.content}
              </div>

              {/* Tags */}
              <div className="pt-4 border-t border-slate-200 flex items-center gap-2 flex-wrap">
                <Tag className="w-4 h-4 text-slate-400" />
                {selectedPost.tags.map((t) => (
                  <span key={t} className="px-2.5 py-1 rounded-lg bg-slate-100 border border-slate-200 text-[11px] font-bold text-slate-600">
                    #{t}
                  </span>
                ))}
              </div>
            </div>

            {/* Modal Bottom Bar */}
            <div className="px-6 py-4 border-t border-slate-200 bg-slate-50 flex items-center justify-between gap-4">
              <button
                onClick={() => setSelectedPost(null)}
                className="px-4 py-2 rounded-xl bg-slate-200 hover:bg-slate-300 text-slate-700 text-xs font-extrabold cursor-pointer"
              >
                Close Article
              </button>

              <button
                onClick={() => {
                  alert(`Application request for "${selectedPost.title}" registered! Our career counselors will contact you.`);
                  setSelectedPost(null);
                }}
                className="px-6 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-extrabold shadow-sm flex items-center gap-2 cursor-pointer"
              >
                <Send className="w-4 h-4" />
                <span>Submit Job Application / Inquiry</span>
              </button>
            </div>

          </div>
        </div>
      )}

      {/* CREATE NEW POST MODAL */}
      {showCreateModal && (
        <div className="fixed inset-0 z-[95] flex items-center justify-center p-3 sm:p-6 bg-slate-900/60 backdrop-blur-xs animate-fade-in font-sans">
          <div className="w-full max-w-2xl max-h-[90vh] bg-white border border-slate-200 rounded-3xl shadow-2xl flex flex-col overflow-hidden text-slate-900">
            
            <div className="flex items-center justify-between px-6 py-4 border-b border-slate-200 bg-slate-50">
              <h3 className="text-base font-black text-slate-900 flex items-center gap-2">
                <Plus className="w-5 h-5 text-indigo-600" /> Post New Announcement or Job Vacancy
              </h3>
              <button
                onClick={() => setShowCreateModal(false)}
                className="p-1.5 rounded-xl bg-slate-200 text-slate-500 hover:text-slate-900"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreatePost} className="p-6 overflow-y-auto space-y-4">
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700">Announcement Title *</label>
                <input
                  type="text" required
                  placeholder="e.g. 📢 SSW Nursing Care Recruitment 2026 (Tokyo)"
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:bg-white focus:border-indigo-500 font-medium"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-700">Category</label>
                  <select
                    value={newCategory}
                    onChange={(e) => setNewCategory(e.target.value as any)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-900 font-medium"
                  >
                    <option value="VACANCY">📢 Job Vacancy</option>
                    <option value="VISA">💼 Visa Policy</option>
                    <option value="EXAM">🎓 Exam Schedule</option>
                    <option value="GUIDE">📘 General Guide</option>
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-700">Target Country</label>
                  <select
                    value={newCountry}
                    onChange={(e) => setNewCountry(e.target.value as any)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-900 font-medium"
                  >
                    <option value="JAPAN">🇯🇵 Japan</option>
                    <option value="KOREA">🇰🇷 Korea</option>
                    <option value="GLOBAL">🌐 Global</option>
                  </select>
                </div>
              </div>

              {newCategory === 'VACANCY' && (
                <div className="grid grid-cols-2 gap-3 p-3 bg-slate-50 border border-slate-200 rounded-xl">
                  <div className="space-y-1">
                    <label className="text-[11px] font-bold text-slate-600">Offered Salary</label>
                    <input
                      type="text"
                      placeholder="e.g. 215,000 JPY / Month"
                      value={newSalary}
                      onChange={(e) => setNewSalary(e.target.value)}
                      className="w-full bg-white border border-slate-200 rounded-lg px-2.5 py-1.5 text-xs text-slate-900"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[11px] font-bold text-slate-600">Vacancies Count</label>
                    <input
                      type="text"
                      placeholder="e.g. 45 Openings"
                      value={newQuota}
                      onChange={(e) => setNewQuota(e.target.value)}
                      className="w-full bg-white border border-slate-200 rounded-lg px-2.5 py-1.5 text-xs text-slate-900"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[11px] font-bold text-slate-600">Job Location</label>
                    <input
                      type="text"
                      placeholder="e.g. Tokyo & Osaka, Japan"
                      value={newLocation}
                      onChange={(e) => setNewLocation(e.target.value)}
                      className="w-full bg-white border border-slate-200 rounded-lg px-2.5 py-1.5 text-xs text-slate-900"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[11px] font-bold text-slate-600">Deadline</label>
                    <input
                      type="text"
                      placeholder="e.g. August 30, 2026"
                      value={newDeadline}
                      onChange={(e) => setNewDeadline(e.target.value)}
                      className="w-full bg-white border border-slate-200 rounded-lg px-2.5 py-1.5 text-xs text-slate-900"
                    />
                  </div>
                </div>
              )}

              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700">Short Excerpt</label>
                <input
                  type="text"
                  placeholder="Brief 1-sentence summary of the post"
                  value={newExcerpt}
                  onChange={(e) => setNewExcerpt(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-900"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700">Full Announcement Content *</label>
                <textarea
                  required
                  rows={6}
                  placeholder="Write the full post text, details, requirements, and application instructions..."
                  value={newContent}
                  onChange={(e) => setNewContent(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:bg-white focus:border-indigo-500"
                />
              </div>

              <div className="pt-3 border-t border-slate-200 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setShowCreateModal(false)}
                  className="px-4 py-2 rounded-xl bg-slate-200 text-slate-700 text-xs font-bold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-extrabold shadow-sm"
                >
                  Publish Announcement
                </button>
              </div>
            </form>

          </div>
        </div>
      )}

    </div>
  );
};
