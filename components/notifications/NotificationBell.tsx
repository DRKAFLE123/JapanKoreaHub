'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { Bell, Check, Sparkles, Megaphone, Briefcase, ChevronRight, BookOpen } from 'lucide-react';

export interface NotificationItem {
  id: string;
  title: string;
  category: 'NOTICE' | 'VACANCY' | 'BLOG';
  country?: 'JAPAN' | 'KOREA' | 'BOTH';
  timestamp: string;
  url: string;
  isRead: boolean;
}

const FEATURED_BLOG_NOTIFICATIONS: NotificationItem[] = [
  {
    id: 'notif-blog-j-ssw',
    title: '🇯🇵 Complete SSW 1 Visa Roadmap: Required Skills, Salary & Prometric CBT Steps',
    category: 'BLOG',
    country: 'JAPAN',
    timestamp: 'New Guide',
    url: '/japan/work',
    isRead: false,
  },
  {
    id: 'notif-blog-k-eps',
    title: '🇰🇷 EPS-TOPIK 2026 Master Guide: Exam Pattern, Cutoff Marks & Manufacturing Prep',
    category: 'BLOG',
    country: 'KOREA',
    timestamp: 'New Guide',
    url: '/korea/work',
    isRead: false,
  },
  {
    id: 'notif-blog-j-jlpt',
    title: '🇯🇵 How to Pass JLPT N5 & JFT-Basic in 90 Days: Self-Study Roadmap',
    category: 'BLOG',
    country: 'JAPAN',
    timestamp: 'Study Plan',
    url: '/japan/learn',
    isRead: false,
  },
  {
    id: 'notif-blog-k-e74',
    title: '🇰🇷 E-9 to E-7-4 Skilled Visa Pathway: How to Transition to Long-term Residency',
    category: 'BLOG',
    country: 'KOREA',
    timestamp: 'Visa Guide',
    url: '/korea/visa',
    isRead: false,
  },
  {
    id: 'notif-blog-j-costs',
    title: '🇯🇵 Cost of Living in Tokyo vs Osaka: Student & Worker Budget Breakdown',
    category: 'BLOG',
    country: 'JAPAN',
    timestamp: 'Living Guide',
    url: '/japan/life',
    isRead: false,
  },
  {
    id: 'notif-blog-k-costs',
    title: '🇰🇷 Living in Seoul: Goshiwon vs One-Room & Monthly Cost of Living',
    category: 'BLOG',
    country: 'KOREA',
    timestamp: 'Living Guide',
    url: '/korea/rooms',
    isRead: false,
  },
];

const INITIAL_NOTIFICATIONS: NotificationItem[] = [
  ...FEATURED_BLOG_NOTIFICATIONS,
  {
    id: 'n-jlpt-2026',
    title: 'Official Announcement: JLPT December 2026 Registration Opened',
    category: 'NOTICE',
    country: 'JAPAN',
    timestamp: 'Recent',
    url: '/notices',
    isRead: false,
  },
  {
    id: 'n-eps-2026',
    title: 'EPS-TOPIK 2026 Exam Schedule & Exam Center Notice',
    category: 'NOTICE',
    country: 'KOREA',
    timestamp: 'Recent',
    url: '/notices',
    isRead: false,
  },
];

const STORAGE_KEY_READ_IDS = 'jkh_read_notification_ids';
const STORAGE_KEY_ALL_READ_AT = 'jkh_notifications_all_read_at';

function getStoredReadIds(): Set<string> {
  if (typeof window === 'undefined') return new Set();
  try {
    const raw = localStorage.getItem(STORAGE_KEY_READ_IDS);
    return new Set(raw ? JSON.parse(raw) : []);
  } catch {
    return new Set();
  }
}

function getStoredAllReadAt(): number {
  if (typeof window === 'undefined') return 0;
  try {
    return Number(localStorage.getItem(STORAGE_KEY_ALL_READ_AT) || 0);
  } catch {
    return 0;
  }
}

function applyStoredReadStatus(items: NotificationItem[]): NotificationItem[] {
  const readIds = getStoredReadIds();
  const allReadAt = getStoredAllReadAt();
  return items.map((item) => {
    if (readIds.has(item.id)) return { ...item, isRead: true };
    if (allReadAt > 0) return { ...item, isRead: true };
    return item;
  });
}

export default function NotificationBell() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeFilter, setActiveFilter] = useState<'ALL' | 'NOTICE' | 'BLOG'>('ALL');
  const [notifications, setNotifications] = useState<NotificationItem[]>(INITIAL_NOTIFICATIONS);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const hoverTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Sync with stored read state on mount & listen for updates across headers
  useEffect(() => {
    setNotifications((prev) => applyStoredReadStatus(prev));

    const handleSync = () => {
      setNotifications((prev) => applyStoredReadStatus(prev));
    };

    window.addEventListener('jkh_notifications_sync', handleSync);
    window.addEventListener('storage', handleSync);
    return () => {
      window.removeEventListener('jkh_notifications_sync', handleSync);
      window.removeEventListener('storage', handleSync);
    };
  }, []);

  // Load notices from API if available and apply stored read status
  useEffect(() => {
    fetch('/api/notices?limit=6')
      .then((r) => (r.ok ? r.json() : null))
      .then((data) => {
        const list = data?.notices || (Array.isArray(data) ? data : []);
        if (Array.isArray(list) && list.length > 0) {
          const apiItems: NotificationItem[] = list.map((item: any, index: number) => ({
            id: item.id || `api-${index}`,
            title: item.title,
            category: (item.category === 'VACANCY' ? 'VACANCY' : 'NOTICE') as 'NOTICE' | 'VACANCY',
            country: item.country === 'KOREA' ? 'KOREA' : item.country === 'JAPAN' ? 'JAPAN' : 'BOTH',
            timestamp: item.publishedAt
              ? new Date(item.publishedAt).toLocaleDateString([], { month: 'short', day: 'numeric' })
              : 'Recent',
            url: item.sourceUrl || `/notices`,
            isRead: false,
          }));

          setNotifications(applyStoredReadStatus([...apiItems, ...FEATURED_BLOG_NOTIFICATIONS]));
        }
      })
      .catch(() => {});
  }, []);

  // Handle outside click
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const unreadCount = notifications.filter((n) => !n.isRead).length;

  const markAllAsRead = () => {
    try {
      const currentIds = notifications.map((n) => n.id);
      const existing = Array.from(getStoredReadIds());
      const updated = Array.from(new Set([...existing, ...currentIds]));
      localStorage.setItem(STORAGE_KEY_READ_IDS, JSON.stringify(updated));
      localStorage.setItem(STORAGE_KEY_ALL_READ_AT, Date.now().toString());
      window.dispatchEvent(new Event('jkh_notifications_sync'));
    } catch {}
    setNotifications((prev) => prev.map((n) => ({ ...n, isRead: true })));
  };

  const markItemAsRead = (id: string) => {
    try {
      const existing = Array.from(getStoredReadIds());
      if (!existing.includes(id)) {
        existing.push(id);
        localStorage.setItem(STORAGE_KEY_READ_IDS, JSON.stringify(existing));
      }
      window.dispatchEvent(new Event('jkh_notifications_sync'));
    } catch {}
    setNotifications((prev) => prev.map((n) => (n.id === id ? { ...n, isRead: true } : n)));
    setIsOpen(false);
  };

  const handleMouseEnter = () => {
    if (hoverTimeoutRef.current) clearTimeout(hoverTimeoutRef.current);
    setIsOpen(true);
  };

  const handleMouseLeave = () => {
    hoverTimeoutRef.current = setTimeout(() => {
      setIsOpen(false);
    }, 250);
  };

  const filteredNotifications = notifications.filter((item) => {
    if (activeFilter === 'ALL') return true;
    if (activeFilter === 'NOTICE') return item.category === 'NOTICE' || item.category === 'VACANCY';
    if (activeFilter === 'BLOG') return item.category === 'BLOG';
    return true;
  });

  return (
    <div
      className="relative"
      ref={dropdownRef}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* Bell Trigger Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="relative p-2 rounded-xl text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition-all cursor-pointer flex items-center justify-center"
        aria-label="Notifications & Updates"
      >
        <Bell className="w-5 h-5 text-slate-700 hover:text-indigo-600 transition-colors" />

        {/* Counter Badge */}
        {unreadCount > 0 && (
          <span className="absolute -top-1 -right-1 px-1.5 py-0.5 rounded-full bg-rose-600 text-white text-[10px] font-black border-2 border-white min-w-[18px] text-center shadow-xs animate-pulse">
            {unreadCount > 9 ? '9+' : unreadCount}
          </span>
        )}
      </button>

      {/* Unread Notifications Popover Dropdown */}
      {isOpen && (
        <div className="fixed top-14 left-2 right-2 max-w-sm mx-auto sm:absolute sm:top-full sm:right-0 sm:left-auto sm:w-96 sm:max-w-none bg-white border border-slate-200/90 rounded-3xl shadow-2xl z-50 overflow-hidden animate-in fade-in zoom-in-95 duration-150 font-sans">
          
          {/* Popover Header */}
          <div className="p-4 bg-slate-50/80 border-b border-slate-100 space-y-2.5">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="p-1.5 rounded-lg bg-indigo-100 text-indigo-700">
                  <Sparkles className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-xs font-black text-slate-900">Notices, Updates &amp; Blogs</h3>
                  <p className="text-[10px] text-slate-500 font-medium">Official bulletins &amp; guides</p>
                </div>
              </div>

              {unreadCount > 0 ? (
                <button
                  onClick={markAllAsRead}
                  className="flex items-center gap-1 text-[10px] font-bold text-indigo-600 hover:text-indigo-800 bg-indigo-50 hover:bg-indigo-100 px-2.5 py-1 rounded-full transition-all cursor-pointer"
                >
                  <Check className="w-3 h-3" /> Mark all read
                </button>
              ) : (
                <span className="text-[10px] font-bold text-slate-400">All caught up</span>
              )}
            </div>

            {/* Filter Tabs */}
            <div className="flex items-center gap-1 bg-slate-200/60 p-1 rounded-xl text-[11px] font-bold">
              <button
                type="button"
                onClick={() => setActiveFilter('ALL')}
                className={`flex-1 py-1 rounded-lg transition-all cursor-pointer text-center ${
                  activeFilter === 'ALL'
                    ? 'bg-white text-slate-900 shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                All ({notifications.length})
              </button>
              <button
                type="button"
                onClick={() => setActiveFilter('NOTICE')}
                className={`flex-1 py-1 rounded-lg transition-all cursor-pointer text-center ${
                  activeFilter === 'NOTICE'
                    ? 'bg-white text-slate-900 shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                📢 Notices
              </button>
              <button
                type="button"
                onClick={() => setActiveFilter('BLOG')}
                className={`flex-1 py-1 rounded-lg transition-all cursor-pointer text-center ${
                  activeFilter === 'BLOG'
                    ? 'bg-white text-slate-900 shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                📰 Guides
              </button>
            </div>
          </div>

          {/* Notifications List */}
          <div className="max-h-80 overflow-y-auto divide-y divide-slate-100">
            {filteredNotifications.length === 0 ? (
              <div className="p-6 text-center text-xs text-slate-500 font-medium">
                No items in this category.
              </div>
            ) : (
              filteredNotifications.map((item) => (
                <Link
                  key={item.id}
                  href={item.url}
                  onClick={() => markItemAsRead(item.id)}
                  className={`p-3.5 flex items-start gap-3 transition-colors hover:bg-slate-50 group block ${
                    !item.isRead ? 'bg-indigo-50/30' : 'bg-white'
                  }`}
                >
                  <div
                    className={`p-2 rounded-xl shrink-0 ${
                      item.category === 'BLOG'
                        ? 'bg-purple-50 text-purple-700 border border-purple-200'
                        : item.category === 'VACANCY'
                        ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                        : 'bg-indigo-50 text-indigo-700 border border-indigo-200'
                    }`}
                  >
                    {item.category === 'BLOG' ? (
                      <BookOpen className="w-4 h-4" />
                    ) : item.category === 'VACANCY' ? (
                      <Briefcase className="w-4 h-4" />
                    ) : (
                      <Megaphone className="w-4 h-4" />
                    )}
                  </div>

                  <div className="flex-1 space-y-1">
                    <div className="flex items-center justify-between gap-1">
                      <span
                        className={`text-[9px] font-black uppercase tracking-wider px-1.5 py-0.5 rounded-full ${
                          item.category === 'BLOG'
                            ? 'bg-purple-100 text-purple-800'
                            : item.category === 'VACANCY'
                            ? 'bg-emerald-100 text-emerald-800'
                            : 'bg-indigo-100 text-indigo-800'
                        }`}
                      >
                        {item.category === 'BLOG'
                          ? '📰 Guide & Blog'
                          : item.category === 'VACANCY'
                          ? '💼 Job Vacancy'
                          : '📢 Notice'}
                      </span>
                      <span className="text-[10px] text-slate-400 font-semibold">{item.timestamp}</span>
                    </div>

                    <p className="text-xs font-bold text-slate-900 leading-snug group-hover:text-indigo-600 transition-colors line-clamp-2">
                      {item.title}
                    </p>
                  </div>

                  {!item.isRead && (
                    <span className="w-2 h-2 rounded-full bg-rose-500 shrink-0 mt-1" />
                  )}
                </Link>
              ))
            )}
          </div>

          {/* Popover Footer */}
          <div className="p-3 bg-slate-50 border-t border-slate-100 text-center">
            <Link
              href="/notices"
              onClick={() => setIsOpen(false)}
              className="text-xs font-black text-indigo-600 hover:text-indigo-800 inline-flex items-center gap-1 transition-all"
            >
              <span>View All Official Bulletins</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </Link>
          </div>

        </div>
      )}
    </div>
  );
}
