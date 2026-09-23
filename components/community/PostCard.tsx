'use client';
import React, { useState, useEffect, useRef } from 'react';
import {
  MapPin,
  Clock,
  ShieldCheck,
  Bookmark,
  MessageCircle,
  Eye,
  Sparkles,
  Phone,
  Briefcase,
  Home as HomeIcon,
  Tag,
  Share2,
  ThumbsUp,
  Send,
  Loader2,
  Check,
  User,
  CornerDownRight,
  ExternalLink,
  Heart
} from 'lucide-react';
import type { CommunityPost, PostComment } from '@/lib/community-data';
import ShareModal from './ShareModal';
import CommentsDrawer from './CommentsDrawer';

interface PostCardProps {
  post: CommunityPost;
  isBookmarked: boolean;
  onToggleBookmark: (post: CommunityPost) => void;
  onOpenMessage: (post: CommunityPost) => void;
  onOpenDetail: (post: CommunityPost) => void;
  user?: { name: string; email: string } | null;
  onRequireAuth?: () => void;
}

type ReactionType = 'LIKE' | 'LOVE' | 'HAHA' | 'WOW' | 'SAD' | 'ANGRY' | null;

const REACTIONS = [
  { type: 'LIKE' as const, label: 'Like', emoji: '👍', color: 'text-[#1877F2]' },
  { type: 'LOVE' as const, label: 'Love', emoji: '❤️', color: 'text-[#FA3E3E]' },
  { type: 'HAHA' as const, label: 'Haha', emoji: '😆', color: 'text-[#F7B125]' },
  { type: 'WOW' as const,  label: 'Wow',  emoji: '😮', color: 'text-[#F7B125]' },
  { type: 'SAD' as const,  label: 'Sad',  emoji: '😢', color: 'text-[#F7B125]' },
  { type: 'ANGRY' as const,label: 'Angry',emoji: '😡', color: 'text-[#E94726]' },
];

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

function VerifiedShieldBadge({ className = "w-4 h-4 sm:w-[18px] sm:h-[18px]" }: { className?: string }) {
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

function FacebookLikeBadge({ className = "w-[18px] h-[18px]" }: { className?: string }) {
  return (
    <span className={`${className} rounded-full bg-[#1877F2] flex items-center justify-center ring-2 ring-white shadow-xs shrink-0 select-none`}>
      <svg className="w-[56%] h-[56%] fill-white" viewBox="0 0 16 16">
        <path d="M8.864.046C7.908-.193 7.02.53 6.956 1.466c-.072 1.051-.23 2.016-.428 2.59-.125.36-.479 1.013-1.04 1.639-.557.623-1.282 1.178-2.131 1.41C2.885 7.234 2.5 7.736 2.5 8.35v5.3c0 .8.65 1.45 1.45 1.45h7.195a2.45 2.45 0 0 0 2.378-1.854l1.244-4.975A2.45 2.45 0 0 0 12.389 5.5H10.15c.08-.432.137-.92.137-1.464 0-1.242-.239-2.316-.677-3.044C9.255.39 8.995.078 8.864.046zM1.5 7.5A1.5 1.5 0 0 0 0 9v5a1.5 1.5 0 0 0 1.5 1.5h1A1.5 1.5 0 0 0 4 14V9a1.5 1.5 0 0 0-1.5-1.5h-1z" />
      </svg>
    </span>
  );
}

function FacebookLoveBadge({ className = "w-[18px] h-[18px]" }: { className?: string }) {
  return (
    <span className={`${className} rounded-full bg-gradient-to-tr from-[#FA3E3E] to-[#F95353] flex items-center justify-center ring-2 ring-white shadow-xs shrink-0 select-none`}>
      <svg className="w-[56%] h-[56%] fill-white" viewBox="0 0 16 16">
        <path d="M8 14.25l-.974-.888C3.57 10.323 1.25 8.217 1.25 5.625 1.25 3.513 2.888 1.875 5 1.875c1.193 0 2.336.556 3 1.428.664-.872 1.807-1.428 3-1.428 2.112 0 3.75 1.638 3.75 3.75 0 2.592-2.32 4.698-5.776 7.746L8 14.25z" />
      </svg>
    </span>
  );
}

export default function PostCard({
  post,
  isBookmarked,
  onToggleBookmark,
  onOpenMessage,
  onOpenDetail,
  user,
  onRequireAuth,
}: PostCardProps) {
  const isJapan = post.country === 'japan';
  const isJob = post.type === 'JOB';

  // Facebook-Style Engagement State
  const [showComments, setShowComments] = useState(false);
  const [comments, setComments] = useState<PostComment[]>([]);
  const [likesCount, setLikesCount] = useState(post.likesCount || 0);
  const [sharesCount, setSharesCount] = useState(post.sharesCount || 0);
  const [userReaction, setUserReaction] = useState<ReactionType>(null);
  const [showReactionPicker, setShowReactionPicker] = useState(false);
  const [shareModalOpen, setShareModalOpen] = useState(false);
  const reactionTimerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    // Pre-fetch comment count
    const loadComments = async () => {
      try {
        const res = await fetch(`/api/community/posts/${post.id}/comments`);
        const data = await res.json();
        if (data.success && Array.isArray(data.comments)) {
          setComments(data.comments);
        }
      } catch {}
    };
    loadComments();
  }, [post.id]);

  const formatPrice = (val: number, currency: string, unit: string) => {
    const symbol = currency === 'KRW' ? '₩' : '¥';
    const formattedNum = new Intl.NumberFormat().format(val);
    const unitLabel =
      unit === 'PER_HOUR' ? '/ hour' :
      unit === 'PER_DAY' ? '/ day' : '/ month';
    return `${symbol}${formattedNum} ${unitLabel}`;
  };

  const handleToggleComments = () => {
    setShowComments(true);
  };

  const handleShowReactions = () => {
    if (reactionTimerRef.current) clearTimeout(reactionTimerRef.current);
    setShowReactionPicker(true);
  };

  const handleHideReactions = () => {
    reactionTimerRef.current = setTimeout(() => {
      setShowReactionPicker(false);
    }, 250);
  };

  const handleSelectReaction = async (reaction: ReactionType) => {
    setShowReactionPicker(false);
    const prevReaction = userReaction;
    setUserReaction(reaction);

    if (reaction && !prevReaction) {
      setLikesCount((prev) => prev + 1);
    } else if (!reaction && prevReaction) {
      setLikesCount((prev) => Math.max(0, prev - 1));
    }

    try {
      await fetch(`/api/community/posts/${post.id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: reaction ? 'LIKE' : 'UNLIKE' }),
      });
    } catch {}
  };

  const handleSharePost = () => {
    setShareModalOpen(true);
  };

  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-sm hover:shadow-md hover:border-slate-300 transition-all duration-200 overflow-hidden flex flex-col group">
      
      {/* Top Banner / Category Pill */}
      <div className="p-4 sm:p-5 flex-1 flex flex-col">
        <div className="flex items-start justify-between gap-2 mb-3">
          
          <div className="flex flex-wrap items-center gap-1.5">
            {/* Country Flag & Relative Posted Time */}
            <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-slate-100/90 text-slate-700 text-[11px] font-semibold border border-slate-200/60">
              <span className="text-xs">{isJapan ? '🇯🇵' : '🇰🇷'}</span>
              <span>{formatPostedTime(post.createdAt)}</span>
            </span>

            {/* Duration Tag */}
            {post.duration && (
              <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-slate-50 text-slate-600 border border-slate-200/80 text-[11px] font-medium">
                <Clock className="w-3 h-3 text-slate-400" />
                <span>{post.duration}</span>
              </span>
            )}
          </div>

          {/* Bookmark Button */}
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onToggleBookmark(post);
            }}
            className={`p-1.5 rounded-xl border transition-all cursor-pointer ${
              isBookmarked
                ? 'bg-amber-50 border-amber-300 text-amber-600 shadow-xs'
                : 'border-slate-200 text-slate-400 hover:text-slate-700 hover:bg-slate-50'
            }`}
            title={isBookmarked ? 'Remove bookmark' : 'Save / Bookmark'}
          >
            <Bookmark className={`w-4 h-4 ${isBookmarked ? 'fill-current' : ''}`} />
          </button>
        </div>

        {/* Title with Verified Shield in Front */}
        <h3
          onClick={() => onOpenDetail(post)}
          className="text-base sm:text-lg font-bold text-slate-900 leading-snug tracking-tight group-hover:text-indigo-600 transition-colors cursor-pointer mb-1.5 line-clamp-2 flex items-start gap-1.5"
        >
          {post.isPhoneVerified && (
            <span className="inline-flex shrink-0 mt-0.5" title="Verified Listing (SMS Verified Poster)">
              <VerifiedShieldBadge className="w-4 h-4 sm:w-[18px] sm:h-[18px]" />
            </span>
          )}
          <span>{post.title}</span>
        </h3>

        {/* Location Row */}
        <div className="flex items-center gap-1.5 text-xs text-slate-500 font-normal mb-2.5">
          <MapPin className="w-3.5 h-3.5 text-rose-500 shrink-0" />
          <span>{post.city} &middot; {post.area}</span>
        </div>

        {/* Financial Highlights Pill: Rent / Salary + Service Charge Badge */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 my-2 p-2.5 rounded-xl bg-slate-50 border border-slate-200/80">
          <div>
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500 block mb-0.5">
              {isJob ? 'Wage / Salary' : 'Monthly Rent'}
            </span>
            <span className="text-base font-extrabold text-slate-900 tracking-tight">
              {formatPrice(post.price, post.currency, post.priceUnit)}
            </span>
            {post.deposit !== undefined && post.deposit > 0 && (
              <span className="text-[11px] text-slate-500 font-medium block mt-0.5">
                Deposit: {post.currency === 'KRW' ? '₩' : '¥'}{new Intl.NumberFormat().format(post.deposit)}
              </span>
            )}
          </div>

          <div>
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500 block mb-0.5">
              Service Fee / Brokerage
            </span>
            {post.serviceCharge === 0 ? (
              <div className="inline-flex items-center gap-1 mt-0.5 px-2 py-0.5 rounded-md bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs font-bold">
                <Sparkles className="w-3 h-3 text-emerald-600" />
                <span>Free (¥0 / ₩0)</span>
              </div>
            ) : (
              <div className="inline-flex items-center gap-1 mt-0.5 px-2 py-0.5 rounded-md bg-amber-50 border border-amber-200 text-amber-800 text-xs font-bold">
                <span>Fee: {post.currency === 'KRW' ? '₩' : '¥'}{new Intl.NumberFormat().format(post.serviceCharge)}</span>
              </div>
            )}
            {post.serviceChargeNote && (
              <span className="text-[10px] text-slate-500 font-medium block truncate mt-0.5">
                {post.serviceChargeNote}
              </span>
            )}
          </div>
        </div>

        {/* Description Snippet */}
        <p className="text-xs text-slate-600 font-normal leading-relaxed line-clamp-2 my-2">
          {post.description}
        </p>

        {/* Language Level & Tags */}
        <div className="flex flex-wrap gap-1 mt-1.5 items-center">
          {post.languageLevel && (
            <span className="px-2 py-0.5 rounded-md bg-indigo-50 border border-indigo-200/90 text-indigo-700 text-[11px] font-bold">
              🗣️ {isJapan ? 'Japanese' : 'Korean'}: {post.languageLevel}
            </span>
          )}
          {post.tags && post.tags.length > 0 && (
            <>
              {post.tags.slice(0, 4).map((tag, idx) => (
                <span
                  key={idx}
                  className="px-2 py-0.5 rounded-md bg-slate-100/90 text-slate-600 text-[11px] font-medium hover:bg-slate-200/70 transition-colors"
                >
                  #{tag}
                </span>
              ))}
              {post.tags.length > 4 && (
                <span className="px-1.5 py-0.5 rounded-md text-[10px] text-slate-400 font-medium">
                  +{post.tags.length - 4} more
                </span>
              )}
            </>
          )}
        </div>
      </div>

      {/* 📘 CONSOLIDATED ACTION ROW WITH COUNTS */}
      <div className="px-2.5 py-2 bg-slate-50/70 border-t border-slate-100 grid grid-cols-4 gap-1 sm:gap-1.5 text-xs select-none items-center">
        {/* 1. LIKE / REACT BUTTON WITH LIVE COUNT */}
        <div
          className="relative min-w-0"
          onMouseEnter={handleShowReactions}
          onMouseLeave={handleHideReactions}
        >
          {/* Floating Reaction Bar (Facebook Style) */}
          {showReactionPicker && (
            <div
              className="absolute -top-12 left-0 z-30 bg-white rounded-full px-2 py-1 shadow-xl border border-slate-200 flex items-center gap-1 animate-in fade-in zoom-in-95 duration-150"
              onMouseEnter={handleShowReactions}
              onMouseLeave={handleHideReactions}
            >
              {REACTIONS.map((r) => (
                <button
                  key={r.type}
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleSelectReaction(r.type);
                  }}
                  className="w-8 h-8 rounded-full hover:scale-130 active:scale-110 transition-transform flex items-center justify-center text-lg cursor-pointer select-none"
                  title={r.label}
                >
                  {r.emoji}
                </button>
              ))}
            </div>
          )}

          <button
            type="button"
            onClick={() => handleSelectReaction(userReaction ? null : 'LIKE')}
            className={`w-full py-1.5 px-1 rounded-xl flex items-center justify-center gap-1 font-semibold transition-all cursor-pointer ${
              userReaction
                ? 'text-rose-600 bg-rose-50'
                : 'text-slate-600 hover:bg-slate-100/80 active:scale-95'
            }`}
            title="Like or React"
          >
            <Heart className={`w-3.5 h-3.5 shrink-0 ${userReaction ? 'fill-rose-500 text-rose-500' : 'text-slate-500'}`} />
            <span className="truncate text-[11px] sm:text-xs">
              {likesCount} <span className="hidden xs:inline">{likesCount === 1 ? 'Like' : 'Likes'}</span>
            </span>
          </button>
        </div>

        {/* 2. COMMENT BUTTON WITH LIVE COUNT */}
        <button
          type="button"
          onClick={handleToggleComments}
          className={`w-full py-1.5 px-1 rounded-xl flex items-center justify-center gap-1 font-medium transition-all cursor-pointer ${
            showComments
              ? 'text-indigo-600 bg-indigo-50/90 font-semibold'
              : 'text-slate-600 hover:bg-slate-100/80 active:scale-95'
          }`}
          title="Comments"
        >
          <MessageCircle className="w-3.5 h-3.5 text-slate-500 shrink-0" />
          <span className="truncate text-[11px] sm:text-xs">
            {comments.length} <span className="hidden xs:inline">{comments.length === 1 ? 'Comment' : 'Comments'}</span>
          </span>
        </button>

        {/* 3. SHARE BUTTON */}
        <button
          type="button"
          onClick={handleSharePost}
          className="w-full py-1.5 px-1 rounded-xl flex items-center justify-center gap-1 text-slate-600 hover:bg-slate-100/80 active:scale-95 font-medium transition-all cursor-pointer"
          title="Share Listing"
        >
          <Share2 className="w-3.5 h-3.5 text-slate-500 shrink-0" />
          <span className="truncate text-[11px] sm:text-xs">
            {sharesCount > 0 ? `${sharesCount} ` : ''}Share
          </span>
        </button>

        {/* 4. DIRECT MESSAGE / INBOX BUTTON */}
        <button
          type="button"
          onClick={() => onOpenMessage(post)}
          className={`w-full py-1.5 px-1.5 rounded-xl flex items-center justify-center gap-1 text-white text-[11px] sm:text-xs font-semibold shadow-xs transition-all cursor-pointer active:scale-95 ${
            isJob
              ? isJapan ? 'bg-red-600 hover:bg-red-700' : 'bg-blue-600 hover:bg-blue-700'
              : 'bg-purple-600 hover:bg-purple-700'
          }`}
          title="Message Poster"
        >
          <Send className="w-3 h-3 shrink-0" />
          <span className="truncate">Inbox</span>
        </button>
      </div>

      {/* Facebook Slide-Up Comments Drawer (Opens towards UP) */}
      {showComments && (
        <CommentsDrawer
          isOpen={showComments}
          onClose={() => setShowComments(false)}
          post={post}
          user={user}
          onRequireAuth={onRequireAuth}
          onCommentAdded={(newComment) => {
            setComments((prev) => [...prev, newComment]);
          }}
        />
      )}

      {/* Share Modal */}
      {shareModalOpen && (
        <ShareModal
          isOpen={shareModalOpen}
          onClose={() => setShareModalOpen(false)}
          post={post}
          onShareSuccess={() => {
            setSharesCount((prev) => prev + 1);
          }}
        />
      )}

    </div>
  );
}

