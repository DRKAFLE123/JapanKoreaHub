'use client';
import React, { useState, useEffect, useRef } from 'react';
import {
  X,
  Send,
  Loader2,
  ThumbsUp,
  MessageCircle,
  CornerDownRight,
  ShieldCheck,
  Sparkles,
} from 'lucide-react';
import type { CommunityPost, PostComment } from '@/lib/community-data';

interface CommentsDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  post: CommunityPost;
  user?: { name: string; email: string } | null;
  onRequireAuth?: () => void;
  onCommentAdded?: (comment: PostComment) => void;
}

export default function CommentsDrawer({
  isOpen,
  onClose,
  post,
  user,
  onRequireAuth,
  onCommentAdded,
}: CommentsDrawerProps) {
  const [comments, setComments] = useState<PostComment[]>([]);
  const [loadingComments, setLoadingComments] = useState(false);
  const [commentInput, setCommentInput] = useState('');
  const [submittingComment, setSubmittingComment] = useState(false);
  const [replyingTo, setReplyingTo] = useState<string | null>(null);
  const [commentLikes, setCommentLikes] = useState<Record<string, number>>({});
  const [userLikedComments, setUserLikedComments] = useState<Record<string, boolean>>({});

  const commentInputRef = useRef<HTMLInputElement | null>(null);
  const commentsEndRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (isOpen && post.id) {
      fetchComments();
      setTimeout(() => {
        commentInputRef.current?.focus();
      }, 350);
    }
  }, [isOpen, post.id]);

  if (!isOpen) return null;

  const fetchComments = async () => {
    setLoadingComments(true);
    try {
      const res = await fetch(`/api/community/posts/${post.id}/comments`);
      const data = await res.json();
      if (data.success && Array.isArray(data.comments)) {
        setComments(data.comments);
      }
    } catch {
      // ignore
    } finally {
      setLoadingComments(false);
    }
  };

  const handleToggleCommentLike = (commentId: string) => {
    const currentlyLiked = !!userLikedComments[commentId];
    setUserLikedComments((prev) => ({ ...prev, [commentId]: !currentlyLiked }));
    setCommentLikes((prev) => ({
      ...prev,
      [commentId]: Math.max(0, (prev[commentId] || 0) + (currentlyLiked ? -1 : 1)),
    }));
  };

  const handleReplyTo = (authorName: string) => {
    setReplyingTo(authorName);
    setCommentInput(`@${authorName} `);
    commentInputRef.current?.focus();
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!commentInput.trim()) return;

    if (!user) {
      onRequireAuth?.();
      return;
    }

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
      if (data.success && data.comment) {
        setComments((prev) => [...prev, data.comment]);
        onCommentAdded?.(data.comment);
        setCommentInput('');
        setReplyingTo(null);
        setTimeout(() => {
          commentsEndRef.current?.scrollIntoView({ behavior: 'smooth' });
        }, 100);
      }
    } catch {
      // ignore
    } finally {
      setSubmittingComment(false);
    }
  };

  const isJob = post.type === 'JOB';
  const currencySymbol = post.currency === 'KRW' ? '₩' : '¥';
  const formattedPrice = `${currencySymbol}${new Intl.NumberFormat().format(post.price)}`;

  return (
    <>
      {/* Dim Backdrop with fade animation */}
      <div
        className="fixed inset-0 z-[90] bg-slate-950/60 backdrop-blur-xs transition-opacity duration-300 animate-fade-in"
        onClick={onClose}
      />

      {/* Slide-Up Bottom Drawer (Facebook Opening Style Towards UP) */}
      <div className="fixed inset-x-0 bottom-0 z-[100] flex justify-center pointer-events-none">
        <div
          className="w-full max-w-xl bg-white rounded-t-3xl shadow-2xl flex flex-col pointer-events-auto max-h-[85vh] sm:max-h-[80vh] animate-in slide-in-from-bottom duration-300 ease-out border-t border-slate-200 font-sans"
          style={{
            animationDuration: '300ms',
            animationTimingFunction: 'cubic-bezier(0.16, 1, 0.3, 1)',
          }}
        >
          {/* Top Drag Handle (Facebook style) */}
          <div className="w-full pt-3 pb-1 flex justify-center cursor-pointer" onClick={onClose}>
            <div className="w-12 h-1.5 bg-slate-300 rounded-full hover:bg-slate-400 transition-colors" />
          </div>

          {/* Drawer Header */}
          <div className="px-5 py-3 border-b border-slate-100 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-indigo-50 text-indigo-600 flex items-center justify-center">
                <MessageCircle className="w-4 h-4" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-slate-900 flex items-center gap-1.5">
                  <span>Comments</span>
                  <span className="px-2 py-0.5 rounded-full bg-slate-100 text-slate-600 text-xs font-semibold">
                    {comments.length}
                  </span>
                </h3>
              </div>
            </div>

            <button
              onClick={onClose}
              className="p-1.5 rounded-full text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Mini Post Context Banner */}
          <div className="px-5 py-2.5 bg-slate-50/80 border-b border-slate-100 flex items-center justify-between gap-3 text-xs">
            <div className="flex items-center gap-2 min-w-0">
              <span className="px-2 py-0.5 rounded-md bg-white border border-slate-200 font-semibold text-slate-700 shrink-0">
                {post.country === 'japan' ? '🇯🇵' : '🇰🇷'} {isJob ? 'Job' : 'Room'}
              </span>
              <span className="font-semibold text-slate-800 truncate">
                {post.title}
              </span>
            </div>
            <span className="font-bold text-slate-900 shrink-0">
              {formattedPrice}
            </span>
          </div>

          {/* Scrollable Comments List */}
          <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-4">
            {loadingComments ? (
              <div className="flex flex-col items-center justify-center py-12 text-slate-400 gap-2">
                <Loader2 className="w-6 h-6 animate-spin text-indigo-600" />
                <span className="text-xs font-medium">Loading comments...</span>
              </div>
            ) : comments.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-12 text-center px-4">
                <div className="w-12 h-12 rounded-full bg-indigo-50 text-indigo-500 flex items-center justify-center text-xl mb-3">
                  💬
                </div>
                <h4 className="text-sm font-semibold text-slate-800 mb-1">
                  No comments yet
                </h4>
                <p className="text-xs text-slate-500 max-w-xs">
                  Be the first to ask about room availability, lease rules, or interview schedule!
                </p>
              </div>
            ) : (
              comments.map((c) => {
                const isPostAuthor = c.authorId === post.authorId;
                const commentLikeCount = commentLikes[c.id] || 0;
                const isCommentLiked = !!userLikedComments[c.id];

                return (
                  <div key={c.id} className="flex items-start gap-2.5 group">
                    {/* User Circular Avatar */}
                    <div className="w-8 h-8 rounded-full bg-slate-200 text-slate-700 font-bold text-xs flex items-center justify-center shrink-0 mt-0.5 border border-slate-300/60">
                      {c.authorName ? c.authorName.charAt(0).toUpperCase() : 'U'}
                    </div>

                    {/* Facebook Comment Bubble */}
                    <div className="flex-1 min-w-0">
                      <div className="bg-slate-100 hover:bg-slate-200/60 transition-colors rounded-2xl rounded-tl-xs px-3.5 py-2 inline-block max-w-full relative shadow-2xs border border-slate-200/50">
                        <div className="flex items-center gap-1.5 mb-0.5">
                          <span className="font-semibold text-xs text-slate-900">
                            {c.authorName}
                          </span>
                          {isPostAuthor && (
                            <span className="px-1.5 py-0.2 rounded bg-indigo-100 text-indigo-800 text-[10px] font-bold">
                              Author
                            </span>
                          )}
                        </div>
                        <p className="text-xs text-slate-800 leading-relaxed break-words whitespace-pre-wrap">
                          {c.content}
                        </p>

                        {/* Floating Like Icon Badge on Bubble */}
                        {commentLikeCount > 0 && (
                          <div className="absolute -bottom-2 right-2 bg-white rounded-full px-1.5 py-0.5 border border-slate-200 text-[10px] text-blue-600 font-bold flex items-center gap-0.5 shadow-xs">
                            <span>👍</span>
                            <span>{commentLikeCount}</span>
                          </div>
                        )}
                      </div>

                      {/* Sub-Actions: Like · Reply · Time */}
                      <div className="flex items-center gap-3 text-[11px] text-slate-500 font-medium pl-2 pt-1">
                        <button
                          type="button"
                          onClick={() => handleToggleCommentLike(c.id)}
                          className={`hover:underline cursor-pointer ${
                            isCommentLiked ? 'text-blue-600 font-bold' : ''
                          }`}
                        >
                          Like
                        </button>
                        <span>&bull;</span>
                        <button
                          type="button"
                          onClick={() => handleReplyTo(c.authorName)}
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
            <div ref={commentsEndRef} />
          </div>

          {/* Sticky Facebook Bottom Input Bar */}
          <div className="p-3 sm:p-4 bg-white border-t border-slate-200/80">
            {replyingTo && (
              <div className="flex items-center justify-between text-xs text-indigo-600 bg-indigo-50 px-3 py-1 rounded-lg mb-2">
                <span className="flex items-center gap-1">
                  <CornerDownRight className="w-3.5 h-3.5" />
                  <span>Replying to <strong>@{replyingTo}</strong></span>
                </span>
                <button
                  type="button"
                  onClick={() => {
                    setReplyingTo(null);
                    setCommentInput('');
                  }}
                  className="text-slate-400 hover:text-slate-600 font-bold ml-2 cursor-pointer"
                >
                  ✕
                </button>
              </div>
            )}

            {user ? (
              <form onSubmit={handleSubmit} className="flex items-center gap-2.5">
                {/* Current User Circular Avatar */}
                <div className="w-8 h-8 rounded-full bg-indigo-600 text-white font-bold text-xs flex items-center justify-center shrink-0">
                  {user.name.charAt(0).toUpperCase()}
                </div>

                {/* Facebook Input Capsule */}
                <div className="flex-1 relative flex items-center">
                  <input
                    ref={commentInputRef}
                    type="text"
                    value={commentInput}
                    onChange={(e) => setCommentInput(e.target.value)}
                    placeholder={`Write a comment as ${user.name}...`}
                    className="w-full bg-slate-100 hover:bg-slate-150 focus:bg-white text-xs text-slate-900 placeholder-slate-400 rounded-full pl-4 pr-10 py-2.5 border border-slate-200 focus:border-indigo-500 focus:outline-none transition-all shadow-2xs"
                  />
                  <button
                    type="submit"
                    disabled={!commentInput.trim() || submittingComment}
                    className="absolute right-1.5 p-1.5 rounded-full bg-indigo-600 hover:bg-indigo-700 disabled:bg-transparent text-white disabled:text-slate-400 transition-all cursor-pointer disabled:cursor-not-allowed"
                    title="Send comment"
                  >
                    {submittingComment ? (
                      <Loader2 className="w-3.5 h-3.5 animate-spin" />
                    ) : (
                      <Send className="w-3.5 h-3.5" />
                    )}
                  </button>
                </div>
              </form>
            ) : (
              <div className="flex items-center justify-between p-2.5 rounded-2xl bg-indigo-50 border border-indigo-100 text-xs">
                <span className="text-slate-700 font-medium">
                  Sign in to ask questions or comment on this listing
                </span>
                <button
                  type="button"
                  onClick={() => {
                    onClose();
                    onRequireAuth?.();
                  }}
                  className="px-3 py-1.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-xs transition-colors cursor-pointer shrink-0 shadow-2xs"
                >
                  Sign In
                </button>
              </div>
            )}
          </div>

        </div>
      </div>
    </>
  );
}
