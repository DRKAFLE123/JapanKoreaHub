'use client';
import React, { useState, useEffect } from 'react';
import {
  X,
  MapPin,
  Clock,
  ShieldCheck,
  Bookmark,
  MessageSquare,
  Sparkles,
  Phone,
  Briefcase,
  Home as HomeIcon,
  Send,
  Loader2,
  User,
  Share2,
  Check
} from 'lucide-react';
import type { CommunityPost, PostComment } from '@/lib/community-data';
import ShareModal from './ShareModal';

interface PostDetailModalProps {
  post: CommunityPost | null;
  isOpen: boolean;
  onClose: () => void;
  isBookmarked: boolean;
  onToggleBookmark: (post: CommunityPost) => void;
  onOpenMessage: (post: CommunityPost) => void;
  user?: { name: string; email: string } | null;
  onRequireAuth: () => void;
}

function VerifiedShieldBadge({ className = "w-5 h-5 sm:w-6 sm:h-6" }: { className?: string }) {
  return (
    <svg
      className={`${className} shrink-0`}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M12 2L4 5.2V11.5C4 16.5 7.4 21.1 12 22.3C16.6 21.1 20 16.5 20 11.5V5.2L12 2Z"
        fill="#16A34A"
      />
      <path
        d="M8.5 12L11 14.5L16 9"
        stroke="white"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function formatPostedTime(dateString?: string): string {
  if (!dateString) return 'Posted recently';
  try {
    const date = new Date(dateString);
    const now = new Date();
    const diffSec = Math.floor((now.getTime() - date.getTime()) / 1000);
    if (diffSec < 60) return 'Posted just now';
    const diffMin = Math.floor(diffSec / 60);
    if (diffMin < 60) return `Posted ${diffMin} min ago`;
    const diffHour = Math.floor(diffMin / 60);
    if (diffHour < 24) return `Posted ${diffHour}h ago`;
    const diffDay = Math.floor(diffHour / 24);
    if (diffDay === 1) return 'Posted yesterday';
    if (diffDay < 7) return `Posted ${diffDay} days ago`;
    return `Posted ${date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}`;
  } catch {
    return 'Posted recently';
  }
}

export default function PostDetailModal({
  post,
  isOpen,
  onClose,
  isBookmarked,
  onToggleBookmark,
  onOpenMessage,
  user,
  onRequireAuth,
}: PostDetailModalProps) {
  const [comments, setComments] = useState<PostComment[]>([]);
  const [commentInput, setCommentInput] = useState('');
  const [submittingComment, setSubmittingComment] = useState(false);
  const [loadingComments, setLoadingComments] = useState(false);
  const [shareModalOpen, setShareModalOpen] = useState(false);

  useEffect(() => {
    if (post && isOpen) {
      fetchComments();
    }
  }, [post, isOpen]);

  const fetchComments = async () => {
    if (!post) return;
    setLoadingComments(true);
    try {
      const res = await fetch(`/api/community/posts/${post.id}/comments`);
      const data = await res.json();
      if (data.success && Array.isArray(data.comments)) {
        setComments(data.comments);
      }
    } catch {}
    finally {
      setLoadingComments(false);
    }
  };

  const handleAddComment = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!commentInput.trim()) return;

    if (!user) {
      onRequireAuth();
      return;
    }

    if (!post) return;

    setSubmittingComment(true);
    try {
      const res = await fetch(`/api/community/posts/${post.id}/comments`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          authorId: user.email,
          authorName: user.name,
          content: commentInput.trim(),
        }),
      });
      const data = await res.json();
      if (data.success) {
        setComments(prev => [...prev, data.comment]);
        setCommentInput('');
      }
    } catch {}
    finally {
      setSubmittingComment(false);
    }
  };

  if (!isOpen || !post) return null;

  const isJapan = post.country === 'japan';
  const isJob = post.type === 'JOB';

  const formatCurrency = (amount: number) => {
    return `${post.currency === 'KRW' ? '₩' : '¥'}${new Intl.NumberFormat().format(amount)}`;
  };

  return (
    <>
      <div className="fixed inset-0 z-[80] bg-slate-900/40 backdrop-blur-xs animate-fade-in" onClick={onClose} />

      <div className="fixed inset-0 z-[90] overflow-y-auto flex items-center justify-center p-3 sm:p-5 pointer-events-none">
        <div className="w-full max-w-3xl bg-white border border-slate-200/90 rounded-3xl shadow-2xl overflow-hidden pointer-events-auto my-auto animate-fade-in font-sans">
          
          {/* Light & Premium Header */}
          <div className="p-5 sm:p-6 bg-white border-b border-slate-100 relative">
            <button
              onClick={onClose}
              className="absolute top-5 right-5 p-2 rounded-full bg-slate-100/80 hover:bg-slate-200 text-slate-500 hover:text-slate-800 transition-colors cursor-pointer border border-slate-200/60"
              title="Close modal"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="flex flex-wrap items-center gap-1.5 mb-2.5 pr-10">
              {/* Country Badge */}
              <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-slate-100 text-slate-700 border border-slate-200/60">
                <span className="text-xs">{isJapan ? '🇯🇵' : '🇰🇷'}</span>
                <span>{isJapan ? 'Japan' : 'Korea'}</span>
              </span>

              {/* Language Level Pill */}
              {post.languageLevel && (
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full bg-indigo-50 text-indigo-700 text-xs font-semibold border border-indigo-200/70">
                  🗣️ {isJapan ? 'Japanese' : 'Korean'}: {post.languageLevel}
                </span>
              )}

              {/* Relative Time Tag */}
              <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-slate-100/90 text-slate-600 text-xs font-medium">
                <Clock className="w-3 h-3 text-slate-400" />
                <span>{formatPostedTime(post.createdAt)}</span>
              </span>
            </div>

            <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 leading-snug tracking-tight flex items-start gap-2">
              {post.isPhoneVerified && (
                <span className="inline-flex shrink-0 mt-0.5 sm:mt-1" title="Verified Listing (SMS Verified Poster)">
                  <VerifiedShieldBadge className="w-5 h-5 sm:w-6 sm:h-6" />
                </span>
              )}
              <span>{post.title}</span>
            </h2>

            <div className="flex items-center gap-2 text-xs text-slate-500 mt-2 font-medium">
              <MapPin className="w-3.5 h-3.5 text-rose-500 shrink-0" />
              <span>{post.city} &middot; {post.area}</span>
              <span className="text-slate-300">&bull;</span>
              <Clock className="w-3.5 h-3.5 text-slate-400" />
              <span>{post.duration}</span>
            </div>
          </div>

          <div className="p-5 sm:p-6 space-y-6 max-h-[75vh] overflow-y-auto">
            
            {/* Financial Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 p-4 rounded-2xl bg-slate-50 border border-slate-200/80">
              <div>
                <span className="text-[10px] font-black uppercase tracking-wider text-slate-400 block">
                  {isJob ? 'Rate / Salary' : 'Monthly Rent'}
                </span>
                <span className="text-base sm:text-lg font-black text-slate-900">
                  {formatCurrency(post.price)}
                </span>
                <span className="text-[10px] text-slate-500 block">
                  {post.priceUnit === 'PER_HOUR' ? 'Per Hour' : 'Per Month'}
                </span>
              </div>

              {post.deposit !== undefined && (
                <div>
                  <span className="text-[10px] font-black uppercase tracking-wider text-slate-400 block">
                    Deposit
                  </span>
                  <span className="text-base sm:text-lg font-black text-slate-900">
                    {formatCurrency(post.deposit)}
                  </span>
                  <span className="text-[10px] text-slate-500 block">
                    {post.deposit === 0 ? 'Zero Deposit' : 'Refundable'}
                  </span>
                </div>
              )}

              <div>
                <span className="text-[10px] font-black uppercase tracking-wider text-slate-400 block">
                  Service Charge
                </span>
                <span className="text-base sm:text-lg font-black text-emerald-600">
                  {post.serviceCharge === 0 ? 'Free (¥0)' : formatCurrency(post.serviceCharge)}
                </span>
                <span className="text-[10px] text-slate-500 block truncate">
                  {post.serviceChargeNote || 'No private broker cut'}
                </span>
              </div>

              <div>
                <span className="text-[10px] font-black uppercase tracking-wider text-slate-400 block">
                  Time Commitment
                </span>
                <span className="text-sm sm:text-base font-black text-slate-900 block truncate">
                  {post.duration}
                </span>
                <span className="text-[10px] text-slate-500 block">
                  {isJob ? 'Official Visa Limits' : 'Lease Period'}
                </span>
              </div>
            </div>

            {/* Poster Info Card & Contact Buttons */}
            <div className="p-4 rounded-2xl bg-indigo-50/60 border border-indigo-100 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                <div className="w-11 h-11 rounded-2xl bg-indigo-600 text-white font-black text-base flex items-center justify-center shadow-xs">
                  {post.authorName.charAt(0).toUpperCase()}
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-black text-slate-900">{post.authorName}</span>
                    {post.isPhoneVerified && (
                      <span
                        className="inline-flex items-center justify-center w-4 h-4 rounded-full bg-emerald-100 text-emerald-700 border border-emerald-300 shrink-0"
                        title="Phone Verified Account"
                      >
                        <Check className="w-2.5 h-2.5 stroke-[3]" />
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-slate-500">
                    Active member &middot; Posted {new Date(post.createdAt).toLocaleDateString()}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2 w-full sm:w-auto">
                <button
                  type="button"
                  onClick={() => setShareModalOpen(true)}
                  className="p-2.5 rounded-xl border border-slate-200 text-slate-600 hover:bg-white transition-all cursor-pointer flex items-center gap-1.5 text-xs font-semibold"
                  title="Share Listing"
                >
                  <Share2 className="w-4 h-4 text-slate-500" />
                  <span className="hidden sm:inline">Share</span>
                </button>

                <button
                  type="button"
                  onClick={() => onToggleBookmark(post)}
                  className={`p-2.5 rounded-xl border transition-all cursor-pointer ${
                    isBookmarked
                      ? 'bg-amber-100 border-amber-300 text-amber-700'
                      : 'border-slate-200 text-slate-600 hover:bg-white'
                  }`}
                  title={isBookmarked ? 'Bookmarked' : 'Save bookmark'}
                >
                  <Bookmark className={`w-4 h-4 ${isBookmarked ? 'fill-current' : ''}`} />
                </button>

                <button
                  type="button"
                  onClick={() => {
                    onClose();
                    onOpenMessage(post);
                  }}
                  className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold tracking-wide transition-colors shadow-xs cursor-pointer"
                >
                  <MessageSquare className="w-4 h-4" />
                  <span>Direct Message</span>
                </button>
              </div>
            </div>

            {/* Full Description */}
            <div>
              <h4 className="text-xs font-black uppercase tracking-wider text-slate-400 mb-2">
                Detailed Information &amp; Amenities
              </h4>
              <div className="p-4 sm:p-5 rounded-2xl bg-white border border-slate-200/90 text-xs sm:text-sm text-slate-800 font-normal leading-relaxed whitespace-pre-line font-sans">
                {post.description}
              </div>
            </div>

            {/* Tags */}
            {post.tags && post.tags.length > 0 && (
              <div>
                <h4 className="text-xs font-black uppercase tracking-wider text-slate-400 mb-2">
                  Tags &amp; Features
                </h4>
                <div className="flex flex-wrap gap-1.5">
                  {post.tags.map((t, idx) => (
                    <span
                      key={idx}
                      className="px-3 py-1 rounded-xl bg-slate-100 text-slate-700 text-xs font-bold"
                    >
                      #{t}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Public Comments Section */}
            <div className="pt-4 border-t border-slate-200">
              <div className="flex items-center justify-between mb-3">
                <h4 className="text-xs font-black uppercase tracking-wider text-slate-700 flex items-center gap-2">
                  <MessageSquare className="w-3.5 h-3.5 text-indigo-600" />
                  <span>Public Comments ({comments.length})</span>
                </h4>
                <span className="text-[11px] text-slate-400 font-medium">Anyone can view &bull; Sign-in to reply</span>
              </div>

              {/* Facebook-Style Add Comment Input */}
              <form onSubmit={handleAddComment} className="flex items-start gap-2.5 mb-4">
                <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-indigo-600 to-purple-600 text-white font-black text-xs flex items-center justify-center shrink-0 shadow-2xs">
                  {user?.name ? user.name.charAt(0).toUpperCase() : <User className="w-4 h-4" />}
                </div>

                <div className="flex-1 relative">
                  <input
                    type="text"
                    value={commentInput}
                    onChange={(e) => setCommentInput(e.target.value)}
                    onFocus={(e) => {
                      if (!user) {
                        onRequireAuth();
                      } else {
                        const target = e.currentTarget;
                        setTimeout(() => {
                          target.scrollIntoView({ behavior: 'smooth', block: 'center' });
                        }, 200);
                      }
                    }}
                    placeholder={user ? 'Write a comment... (Press Enter to post)' : 'Sign in to leave a public comment...'}
                    className="w-full bg-slate-100 hover:bg-slate-200/60 focus:bg-white border border-transparent focus:border-indigo-500 text-slate-900 placeholder:text-slate-400 text-xs rounded-2xl py-2 px-3.5 pr-10 outline-none transition-all shadow-2xs"
                  />
                  <button
                    type="submit"
                    disabled={submittingComment || !commentInput.trim()}
                    className={`absolute right-1.5 top-1/2 -translate-y-1/2 p-1.5 rounded-full transition-all cursor-pointer ${
                      commentInput.trim()
                        ? 'bg-indigo-600 hover:bg-indigo-500 text-white shadow-2xs'
                        : 'text-slate-300 cursor-not-allowed'
                    }`}
                  >
                    {submittingComment ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Send className="w-3.5 h-3.5" />}
                  </button>
                </div>
              </form>

              {/* Facebook Comment Bubbles List */}
              <div className="space-y-3">
                {comments.length === 0 ? (
                  <p className="text-xs text-slate-400 text-center py-4 bg-slate-50 rounded-2xl border border-slate-100">
                    💬 No public comments yet. Be the first to comment!
                  </p>
                ) : (
                  comments.map((c) => {
                    const isPostAuthor = c.authorId === post.authorId;
                    return (
                      <div key={c.id} className="flex items-start gap-2.5">
                        <div className="w-8 h-8 rounded-full bg-slate-200 text-slate-700 font-black text-xs flex items-center justify-center shrink-0 mt-0.5 border border-slate-300/60">
                          {c.authorName ? c.authorName.charAt(0).toUpperCase() : 'U'}
                        </div>

                        <div className="flex-1 min-w-0">
                          <div className="bg-slate-100 rounded-2xl rounded-tl-xs px-3.5 py-2 inline-block max-w-full shadow-2xs border border-slate-200/50">
                            <div className="flex items-center gap-1.5 mb-0.5">
                              <span className="font-bold text-xs text-slate-900 hover:underline cursor-pointer">
                                {c.authorName}
                              </span>
                              {isPostAuthor && (
                                <span className="px-1.5 py-0.2 rounded bg-indigo-100 text-indigo-800 text-[9px] font-black">
                                  Author
                                </span>
                              )}
                            </div>
                            <p className="text-xs text-slate-700 leading-relaxed break-words whitespace-pre-wrap font-sans">
                              {c.content}
                            </p>
                          </div>

                          <div className="flex items-center gap-3 text-[11px] text-slate-500 font-bold pl-2 pt-1">
                            <button
                              type="button"
                              onClick={() => {
                                setCommentInput(`@${c.authorName} `);
                              }}
                              className="hover:underline cursor-pointer"
                            >
                              Reply
                            </button>
                            <span>&bull;</span>
                            <span className="text-slate-400 font-normal">
                              {new Date(c.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                            </span>
                          </div>
                        </div>
                      </div>
                    );
                  })
                )}
              </div>
            </div>

          </div>

        </div>
      </div>

      {/* Share Modal */}
      {shareModalOpen && (
        <ShareModal
          isOpen={shareModalOpen}
          onClose={() => setShareModalOpen(false)}
          post={post}
        />
      )}
    </>
  );
}
