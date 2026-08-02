'use client';

import React, { useState, useEffect } from 'react';
import {
  Search, Filter, Plus, Calendar, MapPin, Briefcase, DollarSign,
  UserCheck, Award, Globe, ArrowRight, X, Sparkles, Share2, Bookmark,
  CheckCircle2, AlertCircle, Send, FileText, Tag, MessageSquare, Clock
} from 'lucide-react';

import { INITIAL_POSTS, BlogPost } from '@/lib/blog-data';

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

  useEffect(() => {
    const saved = localStorage.getItem('lg_blog_posts');
    if (saved) {
      try {
        setPosts(JSON.parse(saved));
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
      author: 'Community Publisher',
      date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
      readTime: '3 min read',
      excerpt: newExcerpt || newContent.slice(0, 140) + '...',
      content: newContent,
      location: newLocation,
      salary: newSalary,
      quota: newQuota,
      deadline: newDeadline,
      requirement: newRequirement,
      tags: [newCategory, newCountry, 'Community Post'],
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
    <div className="w-full max-w-7xl mx-auto space-y-8 font-sans pb-16">
      
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-10 shadow-2xl space-y-4 relative overflow-hidden">
        <div className="absolute -top-12 -right-12 w-64 h-64 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 relative z-10">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 text-xs font-bold">
              <Sparkles className="w-4 h-4 text-amber-400" />
              <span>Official Visa News &amp; Employer Vacancies</span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
              LanguageGuru Career &amp; Visa Blog
            </h1>
            <p className="text-xs sm:text-sm text-slate-300 max-w-2xl leading-relaxed">
              Stay updated with authentic employer recruitment vacancies, Japanese SSW / Student visa updates, HRD Korea E-9 roster calls, and Prometric exam seat releases.
            </p>
          </div>

          <button
            onClick={() => setShowCreateModal(true)}
            className="w-full sm:w-auto px-5 py-3 rounded-2xl bg-gradient-to-r from-rose-600 via-pink-600 to-indigo-600 hover:from-rose-500 hover:to-indigo-500 text-white text-xs font-extrabold shadow-glow flex items-center justify-center gap-2.5 transition-all cursor-pointer shrink-0"
          >
            <Plus className="w-4 h-4" />
            <span>Post Announcement / Vacancy</span>
          </button>
        </div>
      </div>

      {/* Filter & Search Toolbar */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-4 bg-slate-900/80 border border-slate-800 rounded-2xl p-4">
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
                  ? 'bg-indigo-600 text-white shadow-glow'
                  : 'bg-slate-950 text-slate-400 hover:text-white border border-slate-800'
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
            className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-9 pr-3 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500 transition-all"
          />
        </div>
      </div>

      {/* Posts Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredPosts.length === 0 ? (
          <div className="col-span-full text-center py-12 bg-slate-900/50 border border-slate-800 rounded-3xl text-slate-400 space-y-2">
            <AlertCircle className="w-8 h-8 text-amber-400 mx-auto" />
            <p className="text-sm font-bold text-white">No articles or vacancies found</p>
            <p className="text-xs text-slate-500">Try adjusting your category filter or search keywords</p>
          </div>
        ) : (
          filteredPosts.map((post) => (
            <div
              key={post.id}
              onClick={() => setSelectedPost(post)}
              className="bg-slate-900/90 border border-slate-800 hover:border-indigo-500/50 rounded-3xl p-6 shadow-xl space-y-4 flex flex-col justify-between transition-all hover:-translate-y-1 cursor-pointer group"
            >
              <div className="space-y-3">
                {/* Header Tag Badges */}
                <div className="flex items-center justify-between gap-2">
                  <span className={`text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded-md ${
                    post.category === 'VACANCY' ? 'bg-rose-950 text-rose-300 border border-rose-500/30' :
                    post.category === 'VISA'    ? 'bg-amber-950 text-amber-300 border border-amber-500/30' :
                    'bg-indigo-950 text-indigo-300 border border-indigo-500/30'
                  }`}>
                    {post.category}
                  </span>

                  <span className="text-[10px] font-bold text-slate-400 flex items-center gap-1">
                    <Clock className="w-3 h-3 text-slate-500" />
                    <span>{post.date}</span>
                  </span>
                </div>

                {/* Article Title */}
                <h3 className="text-base font-black text-white group-hover:text-indigo-300 transition-colors leading-snug line-clamp-2">
                  {post.title}
                </h3>

                {/* Vacancy Details Strip (If Vacancy) */}
                {post.salary && (
                  <div className="bg-slate-950/80 border border-slate-800 rounded-xl p-2.5 space-y-1 text-xs font-medium text-slate-300">
                    <div className="flex items-center justify-between text-emerald-400 font-bold">
                      <span className="flex items-center gap-1"><DollarSign className="w-3.5 h-3.5" /> {post.salary}</span>
                      {post.quota && <span className="px-2 py-0.5 rounded bg-emerald-950 text-[10px] text-emerald-300 border border-emerald-500/20">{post.quota}</span>}
                    </div>
                    {post.location && (
                      <div className="flex items-center gap-1.5 text-[11px] text-slate-400">
                        <MapPin className="w-3 h-3 text-rose-400 shrink-0" />
                        <span className="truncate">{post.location}</span>
                      </div>
                    )}
                  </div>
                )}

                {/* Excerpt */}
                <p className="text-xs text-slate-400 leading-relaxed line-clamp-3">
                  {post.excerpt}
                </p>
              </div>

              {/* Card Footer */}
              <div className="pt-3 border-t border-slate-800/80 flex items-center justify-between text-xs text-indigo-400 font-extrabold group-hover:text-indigo-300">
                <span>Read Full Announcement</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          ))
        )}
      </div>

      {/* FULL ARTICLE READER MODAL */}
      {selectedPost && (
        <div className="fixed inset-0 z-[90] flex items-center justify-center p-3 sm:p-6 bg-slate-950/90 backdrop-blur-md animate-fade-in font-sans">
          <div className="w-full max-w-4xl max-h-[90vh] bg-slate-900 border border-slate-800 rounded-3xl shadow-2xl flex flex-col overflow-hidden">
            
            {/* Modal Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-slate-800 bg-slate-950/80">
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-0.5 rounded-full bg-indigo-500/20 text-indigo-300 text-xs font-bold border border-indigo-500/30">
                  {selectedPost.category}
                </span>
                <span className="text-xs text-slate-400">• {selectedPost.readTime}</span>
              </div>
              <button
                onClick={() => setSelectedPost(null)}
                className="p-2 rounded-xl bg-slate-800 hover:bg-rose-600 text-slate-300 hover:text-white transition-all cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Content Pane */}
            <div className="p-6 sm:p-8 overflow-y-auto space-y-6">
              <div className="space-y-3">
                <h1 className="text-2xl sm:text-3xl font-black text-white leading-tight">
                  {selectedPost.title}
                </h1>
                <div className="flex items-center gap-4 text-xs text-slate-400 font-medium border-b border-slate-800 pb-4">
                  <span>By <strong className="text-slate-200">{selectedPost.author}</strong></span>
                  <span>•</span>
                  <span>{selectedPost.date}</span>
                </div>
              </div>

              {/* Vacancy Details Box if Salary Available */}
              {selectedPost.salary && (
                <div className="bg-slate-950/90 border border-slate-800 rounded-2xl p-5 grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Offered Salary</span>
                    <div className="text-base font-black text-emerald-400 flex items-center gap-1.5">
                      <DollarSign className="w-4 h-4" /> {selectedPost.salary}
                    </div>
                  </div>
                  {selectedPost.quota && (
                    <div className="space-y-1">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Available Openings</span>
                      <div className="text-base font-black text-indigo-300 flex items-center gap-1.5">
                        <Briefcase className="w-4 h-4" /> {selectedPost.quota}
                      </div>
                    </div>
                  )}
                  {selectedPost.location && (
                    <div className="space-y-1">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Job Location</span>
                      <div className="text-xs font-bold text-slate-200 flex items-center gap-1.5">
                        <MapPin className="w-4 h-4 text-rose-400" /> {selectedPost.location}
                      </div>
                    </div>
                  )}
                  {selectedPost.deadline && (
                    <div className="space-y-1">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Application Deadline</span>
                      <div className="text-xs font-bold text-amber-300 flex items-center gap-1.5">
                        <Calendar className="w-4 h-4" /> {selectedPost.deadline}
                      </div>
                    </div>
                  )}
                  {selectedPost.requirement && (
                    <div className="col-span-full pt-2 border-t border-slate-800 space-y-1">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Minimum Exam Requirement</span>
                      <div className="text-xs font-bold text-rose-300 flex items-center gap-1.5">
                        <Award className="w-4 h-4" /> {selectedPost.requirement}
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* Full Article Text */}
              <div className="prose prose-invert max-w-none text-xs sm:text-sm text-slate-300 leading-relaxed whitespace-pre-line space-y-4">
                {selectedPost.content}
              </div>

              {/* Tags */}
              <div className="pt-4 border-t border-slate-800 flex items-center gap-2 flex-wrap">
                <Tag className="w-4 h-4 text-slate-500" />
                {selectedPost.tags.map((t) => (
                  <span key={t} className="px-2.5 py-1 rounded-lg bg-slate-950 border border-slate-800 text-[11px] font-bold text-slate-400">
                    #{t}
                  </span>
                ))}
              </div>
            </div>

            {/* Modal Bottom Bar */}
            <div className="px-6 py-4 border-t border-slate-800 bg-slate-950/80 flex items-center justify-between gap-4">
              <button
                onClick={() => setSelectedPost(null)}
                className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-extrabold cursor-pointer"
              >
                Close Article
              </button>

              <button
                onClick={() => {
                  alert(`Application request for "${selectedPost.title}" registered! Our career counselors will contact you.`);
                  setSelectedPost(null);
                }}
                className="px-6 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-extrabold shadow-glow flex items-center gap-2 cursor-pointer"
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
        <div className="fixed inset-0 z-[95] flex items-center justify-center p-3 sm:p-6 bg-slate-950/90 backdrop-blur-md animate-fade-in font-sans">
          <div className="w-full max-w-2xl max-h-[90vh] bg-slate-900 border border-slate-800 rounded-3xl shadow-2xl flex flex-col overflow-hidden">
            
            <div className="flex items-center justify-between px-6 py-4 border-b border-slate-800 bg-slate-950/80">
              <h3 className="text-base font-black text-white flex items-center gap-2">
                <Plus className="w-5 h-5 text-indigo-400" /> Post New Announcement or Job Vacancy
              </h3>
              <button
                onClick={() => setShowCreateModal(false)}
                className="p-1.5 rounded-xl bg-slate-800 text-slate-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreatePost} className="p-6 overflow-y-auto space-y-4">
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-300">Announcement Title *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. 📢 SSW Nursing Care Recruitment 2026 (Tokyo)"
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white placeholder-slate-600 focus:outline-none focus:border-indigo-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-300">Category</label>
                  <select
                    value={newCategory}
                    onChange={(e) => setNewCategory(e.target.value as any)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-indigo-500"
                  >
                    <option value="VACANCY">📢 Job Vacancy</option>
                    <option value="VISA">💼 Visa Policy</option>
                    <option value="EXAM">🎓 Exam Schedule</option>
                    <option value="GUIDE">📘 General Guide</option>
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-300">Target Country</label>
                  <select
                    value={newCountry}
                    onChange={(e) => setNewCountry(e.target.value as any)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-indigo-500"
                  >
                    <option value="JAPAN">🇯🇵 Japan</option>
                    <option value="KOREA">🇰🇷 Korea</option>
                    <option value="GLOBAL">🌐 Global</option>
                  </select>
                </div>
              </div>

              {newCategory === 'VACANCY' && (
                <div className="grid grid-cols-2 gap-3 p-3 bg-slate-950/60 border border-slate-800 rounded-xl">
                  <div className="space-y-1">
                    <label className="text-[11px] font-bold text-slate-400">Offered Salary</label>
                    <input
                      type="text"
                      placeholder="e.g. 215,000 JPY / Month"
                      value={newSalary}
                      onChange={(e) => setNewSalary(e.target.value)}
                      className="w-full bg-slate-900 border border-slate-800 rounded-lg px-2.5 py-1.5 text-xs text-white"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[11px] font-bold text-slate-400">Vacancies Count</label>
                    <input
                      type="text"
                      placeholder="e.g. 45 Openings"
                      value={newQuota}
                      onChange={(e) => setNewQuota(e.target.value)}
                      className="w-full bg-slate-900 border border-slate-800 rounded-lg px-2.5 py-1.5 text-xs text-white"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[11px] font-bold text-slate-400">Job Location</label>
                    <input
                      type="text"
                      placeholder="e.g. Tokyo & Osaka, Japan"
                      value={newLocation}
                      onChange={(e) => setNewLocation(e.target.value)}
                      className="w-full bg-slate-900 border border-slate-800 rounded-lg px-2.5 py-1.5 text-xs text-white"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[11px] font-bold text-slate-400">Deadline</label>
                    <input
                      type="text"
                      placeholder="e.g. August 30, 2026"
                      value={newDeadline}
                      onChange={(e) => setNewDeadline(e.target.value)}
                      className="w-full bg-slate-900 border border-slate-800 rounded-lg px-2.5 py-1.5 text-xs text-white"
                    />
                  </div>
                  <div className="col-span-2 space-y-1">
                    <label className="text-[11px] font-bold text-slate-400">Minimum Exam Requirement</label>
                    <input
                      type="text"
                      placeholder="e.g. JLPT N4 / JFT-Basic + Prometric Nursing Skill Test Pass"
                      value={newRequirement}
                      onChange={(e) => setNewRequirement(e.target.value)}
                      className="w-full bg-slate-900 border border-slate-800 rounded-lg px-2.5 py-1.5 text-xs text-white"
                    />
                  </div>
                </div>
              )}

              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-300">Short Excerpt</label>
                <input
                  type="text"
                  placeholder="Brief 1-sentence summary of the post"
                  value={newExcerpt}
                  onChange={(e) => setNewExcerpt(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-300">Full Announcement Content *</label>
                <textarea
                  required
                  rows={6}
                  placeholder="Write the full post text, details, requirements, and application instructions..."
                  value={newContent}
                  onChange={(e) => setNewContent(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-xs text-white placeholder-slate-600 focus:outline-none focus:border-indigo-500"
                />
              </div>

              <div className="pt-3 border-t border-slate-800 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setShowCreateModal(false)}
                  className="px-4 py-2 rounded-xl bg-slate-800 text-slate-300 text-xs font-bold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-extrabold shadow-glow"
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
