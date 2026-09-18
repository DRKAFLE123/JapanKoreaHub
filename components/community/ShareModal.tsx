'use client';
import React, { useState } from 'react';
import {
  X,
  Copy,
  Check,
  Share2,
  Mail,
  Smartphone,
  ExternalLink,
  MessageCircle,
} from 'lucide-react';
import type { CommunityPost } from '@/lib/community-data';

interface ShareModalProps {
  isOpen: boolean;
  onClose: () => void;
  post: CommunityPost | null;
  onShareSuccess?: () => void;
}

export default function ShareModal({ isOpen, onClose, post, onShareSuccess }: ShareModalProps) {
  const [copied, setCopied] = useState(false);

  if (!isOpen || !post) return null;

  const baseUrl = typeof window !== 'undefined' ? window.location.origin : 'https://japankoreahub.com';
  const shareUrl = `${baseUrl}/${post.country}/${post.type === 'JOB' ? 'jobs' : 'rooms'}?postId=${post.id}`;
  
  const isJob = post.type === 'JOB';
  const currencySymbol = post.currency === 'KRW' ? '₩' : '¥';
  const priceFormatted = `${currencySymbol}${new Intl.NumberFormat().format(post.price)}`;
  const shareTitle = `${post.title} (${priceFormatted} in ${post.city})`;
  const shareMessage = `Check out this ${isJob ? 'job opening' : 'housing listing'} in ${post.country === 'japan' ? 'Japan' : 'Korea'}: ${post.title} (${priceFormatted} · ${post.area}, ${post.city}) on JapanKoreaHub`;

  const recordShare = () => {
    onShareSuccess?.();
    try {
      fetch(`/api/community/posts/${post.id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'SHARE' }),
      });
    } catch {}
  };

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(shareUrl);
      setCopied(true);
      recordShare();
      setTimeout(() => setCopied(false), 2500);
    } catch {
      setCopied(true);
      recordShare();
      setTimeout(() => setCopied(false), 2500);
    }
  };

  const handleNativeShare = async () => {
    if (typeof navigator !== 'undefined' && navigator.share) {
      try {
        await navigator.share({
          title: shareTitle,
          text: shareMessage,
          url: shareUrl,
        });
        recordShare();
      } catch (err) {
        // User cancelled or share failed
      }
    } else {
      handleCopyLink();
    }
  };

  const encodedUrl = encodeURIComponent(shareUrl);
  const encodedText = encodeURIComponent(shareMessage);
  const encodedTitle = encodeURIComponent(shareTitle);

  const socialChannels = [
    {
      name: 'WhatsApp',
      href: `https://api.whatsapp.com/send?text=${encodeURIComponent(`${shareMessage}\n\n${shareUrl}`)}`,
      color: 'bg-emerald-50 hover:bg-emerald-100 text-emerald-700 border-emerald-200',
      icon: (
        <svg className="w-5 h-5 fill-current text-emerald-600" viewBox="0 0 24 24">
          <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z" />
        </svg>
      ),
    },
    {
      name: 'Facebook',
      href: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
      color: 'bg-blue-50 hover:bg-blue-100 text-blue-700 border-blue-200',
      icon: (
        <svg className="w-5 h-5 fill-current text-blue-600" viewBox="0 0 24 24">
          <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
        </svg>
      ),
    },
    {
      name: 'Telegram',
      href: `https://t.me/share/url?url=${encodedUrl}&text=${encodedTitle}`,
      color: 'bg-sky-50 hover:bg-sky-100 text-sky-700 border-sky-200',
      icon: (
        <svg className="w-5 h-5 fill-current text-sky-500" viewBox="0 0 24 24">
          <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.894 8.221l-1.97 9.28c-.145.658-.537.818-1.084.508l-3-2.21-1.446 1.394c-.16.16-.295.295-.605.295l.213-3.053 5.56-5.023c.242-.213-.054-.333-.373-.121l-6.871 4.326-2.962-.924c-.643-.204-.657-.643.136-.953l11.57-4.461c.537-.198 1.006.128.832.942z" />
        </svg>
      ),
    },
    {
      name: 'Viber',
      href: `viber://forward?text=${encodeURIComponent(`${shareMessage}\n${shareUrl}`)}`,
      color: 'bg-purple-50 hover:bg-purple-100 text-purple-700 border-purple-200',
      icon: (
        <svg className="w-5 h-5 fill-current text-purple-600" viewBox="0 0 24 24">
          <path d="M19.123 0H4.877A4.877 4.877 0 000 4.877v14.246A4.877 4.877 0 004.877 24h14.246A4.877 4.877 0 0024 19.123V4.877A4.877 4.877 0 0019.123 0zm2.253 17.585c-.244 1.258-1.576 2.05-3.08 2.062-1.39.011-3.69-.323-6.666-1.898-3.023-1.6-4.992-3.882-6.22-6.527-.993-2.14-1.066-4.102-.916-5.267.165-1.282.882-2.176 1.942-2.483.992-.287 2.016.147 2.502.946.425.698 1.026 1.83 1.348 2.527.288.625.138 1.34-.33 1.838l-.756.804c.731 1.353 1.874 2.505 3.226 3.236l.805-.756c.498-.468 1.213-.618 1.838-.33.697.322 1.829.923 2.527 1.348.799.486 1.233 1.51 .946 2.502h-.166z" />
        </svg>
      ),
    },
    {
      name: 'Twitter / X',
      href: `https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}`,
      color: 'bg-slate-100 hover:bg-slate-200 text-slate-800 border-slate-200',
      icon: (
        <svg className="w-5 h-5 fill-current text-slate-900" viewBox="0 0 24 24">
          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
        </svg>
      ),
    },
    {
      name: 'SMS / Text',
      href: `sms:?&body=${encodeURIComponent(`${shareMessage} ${shareUrl}`)}`,
      color: 'bg-emerald-50 hover:bg-emerald-100 text-emerald-800 border-emerald-200',
      icon: <Smartphone className="w-5 h-5 text-emerald-600" />,
    },
    {
      name: 'Email',
      href: `mailto:?subject=${encodedTitle}&body=${encodeURIComponent(`${shareMessage}\n\n${shareUrl}`)}`,
      color: 'bg-amber-50 hover:bg-amber-100 text-amber-800 border-amber-200',
      icon: <Mail className="w-5 h-5 text-amber-600" />,
    },
  ];

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 z-[95] bg-slate-950/60 backdrop-blur-xs animate-fade-in"
        onClick={onClose}
      />

      {/* Modal Card */}
      <div className="fixed inset-0 z-[100] overflow-y-auto flex items-center justify-center p-4 pointer-events-none">
        <div className="w-full max-w-md bg-white border border-slate-200 rounded-3xl shadow-2xl overflow-hidden pointer-events-auto my-auto animate-fade-in font-sans">
          
          {/* Header */}
          <div className="p-5 border-b border-slate-100 flex items-start justify-between gap-3 bg-slate-50/60">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-2xl bg-indigo-50 border border-indigo-100 flex items-center justify-center text-indigo-600 shadow-2xs">
                <Share2 className="w-4 h-4" />
              </div>
              <div>
                <h3 className="text-base font-semibold text-slate-900 leading-snug">
                  Share Listing
                </h3>
                <p className="text-xs text-slate-500 font-normal">
                  Share via messaging apps, social media, or direct link
                </p>
              </div>
            </div>

            <button
              onClick={onClose}
              className="p-1.5 rounded-full text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Post Preview Snippet */}
          <div className="p-4 bg-slate-50/40 border-b border-slate-100">
            <div className="p-3 rounded-2xl bg-white border border-slate-200/80 shadow-2xs">
              <div className="flex items-center gap-1.5 mb-1">
                <span className="text-xs font-semibold px-2 py-0.5 rounded-md bg-indigo-50 text-indigo-700 border border-indigo-100">
                  {post.country === 'japan' ? '🇯🇵 Japan' : '🇰🇷 Korea'} &middot; {isJob ? 'Job' : 'Room'}
                </span>
                <span className="text-xs font-semibold text-slate-900">
                  {priceFormatted}
                </span>
              </div>
              <h4 className="text-xs font-medium text-slate-800 line-clamp-2 leading-relaxed">
                {post.title}
              </h4>
              <p className="text-[11px] text-slate-500 mt-1">
                📍 {post.city} &middot; {post.area}
              </p>
            </div>
          </div>

          {/* Body Content */}
          <div className="p-5 space-y-4">
            
            {/* 1. Copy Link Box */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                Listing Direct Link
              </label>
              <div className="flex items-center gap-2 p-1.5 rounded-2xl bg-slate-50 border border-slate-200">
                <input
                  type="text"
                  readOnly
                  value={shareUrl}
                  className="flex-1 bg-transparent px-2.5 text-xs text-slate-600 font-mono focus:outline-none select-all truncate"
                />
                <button
                  type="button"
                  onClick={handleCopyLink}
                  className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all flex items-center gap-1.5 cursor-pointer shrink-0 shadow-2xs ${
                    copied
                      ? 'bg-emerald-600 text-white'
                      : 'bg-indigo-600 hover:bg-indigo-700 text-white active:scale-95'
                  }`}
                >
                  {copied ? (
                    <>
                      <Check className="w-3.5 h-3.5" />
                      <span>Copied!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      <span>Copy Link</span>
                    </>
                  )}
                </button>
              </div>
            </div>

            {/* 2. Social Media & Messaging Channels */}
            <div>
              <span className="block text-xs font-semibold text-slate-700 mb-2">
                Share via Social &amp; Messaging
              </span>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                {socialChannels.map((ch) => (
                  <a
                    key={ch.name}
                    href={ch.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={recordShare}
                    className={`flex items-center gap-2 px-3 py-2 rounded-xl border text-xs font-medium transition-all shadow-2xs hover:scale-[1.02] active:scale-95 cursor-pointer ${ch.color}`}
                  >
                    {ch.icon}
                    <span className="truncate">{ch.name}</span>
                  </a>
                ))}
              </div>
            </div>

            {/* 3. Native Device Share (Phone / Tablet / Mac / Windows Web Share) */}
            <div className="pt-2">
              <button
                type="button"
                onClick={handleNativeShare}
                className="w-full py-2.5 rounded-2xl bg-slate-100 hover:bg-slate-200 text-slate-700 hover:text-slate-900 text-xs font-semibold border border-slate-200 transition-all flex items-center justify-center gap-2 cursor-pointer active:scale-98"
              >
                <Share2 className="w-4 h-4 text-indigo-600" />
                <span>More Share Options (System Sheet)</span>
              </button>
            </div>

          </div>

          {/* Footer */}
          <div className="px-5 py-3.5 bg-slate-50 border-t border-slate-100 flex items-center justify-end">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-1.5 rounded-xl text-xs font-medium text-slate-600 hover:bg-slate-200/70 transition-colors cursor-pointer"
            >
              Close
            </button>
          </div>

        </div>
      </div>
    </>
  );
}
