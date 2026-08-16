'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { Bell, Check, Sparkles, Megaphone, Briefcase, ChevronRight } from 'lucide-react';

export interface NotificationItem {
  id: string;
  title: string;
  category: 'NOTICE' | 'VACANCY';
  country?: 'JAPAN' | 'KOREA' | 'BOTH';
  timestamp: string;
  url: string;
  isRead: boolean;
}

const INITIAL_NOTIFICATIONS: NotificationItem[] = [
  {
    id: 'eps-e9-guide-2026',
    title: 'कोरिया जाने राजमार्ग! EPS (E-9) मार्फत नेपालबाट कोरिया पुग्ने पूर्ण गाइड (२०२६)',
    category: 'NOTICE',
    country: 'KOREA',
    timestamp: 'Just now',
    url: '/blog/korea-eps-e9-visa-full-guide-2026',
    isRead: false,
  },
  {
    id: 'ssw-guide-2026',
    title: 'जापान जाने सुनौलो अवसर! SSW भिसाबाट कसरी पुग्ने जापान — सम्पूर्ण जानकारी (२०२६)',
    category: 'NOTICE',
    country: 'JAPAN',
    timestamp: '5 min ago',
    url: '/blog/japan-ssw-visa-full-guide-2026',
    isRead: false,
  },
  {
    id: 'n1',
    title: 'Korea E-7 Visa Full Guide 2026: Salary, Documents & Nepal Eligibility',
    category: 'VACANCY',
    country: 'KOREA',
    timestamp: '15 min ago',
    url: '/blog/korea-e7-visa-full-guide-2026',
    isRead: false,
  },
  {
    id: 'n2',
    title: 'Official Announcement: NAT-Test & JLPT Registration Opened for 2026',
    category: 'NOTICE',
    country: 'JAPAN',
    timestamp: '1 hour ago',
    url: '/notices',
    isRead: false,
  },
  {
    id: 'n3',
    title: 'Japan SSW-1 Caregiver & Food Service Recruitment 2026',
    category: 'VACANCY',
    country: 'JAPAN',
    timestamp: '3 hours ago',
    url: '/blog',
    isRead: false,
  },
  {
    id: 'n4',
    title: 'EPS-TOPIK 2026 Exam Schedule & Exam Center Notice',
    category: 'NOTICE',
    country: 'KOREA',
    timestamp: '1 day ago',
    url: '/notices',
    isRead: true,
  },
];

export default function NotificationBell() {
  const [isOpen, setIsOpen] = useState(false);
  const [notifications, setNotifications] = useState<NotificationItem[]>(INITIAL_NOTIFICATIONS);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const hoverTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Load notices from API if available
  useEffect(() => {
    fetch('/api/notices')
      .then((r) => (r.ok ? r.json() : null))
      .then((data) => {
        if (Array.isArray(data) && data.length > 0) {
          const apiItems: NotificationItem[] = data.slice(0, 5).map((item: any, index: number) => ({
            id: item.id || `api-${index}`,
            title: item.title,
            category: item.category === 'VACANCY' ? 'VACANCY' : 'NOTICE',
            country: item.country === 'KOREA' ? 'KOREA' : item.country === 'JAPAN' ? 'JAPAN' : 'BOTH',
            timestamp: item.date || 'Recent',
            url: item.link || `/notices/${item.id}`,
            isRead: false,
          }));
          setNotifications(apiItems);
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
    setNotifications((prev) => prev.map((n) => ({ ...n, isRead: true })));
  };

  const markItemAsRead = (id: string) => {
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
        aria-label="Notifications"
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
        <div className="absolute top-full right-0 mt-2 w-80 sm:w-96 bg-white border border-slate-200 rounded-3xl shadow-2xl z-50 overflow-hidden animate-fade-in font-sans">
          
          {/* Popover Header */}
          <div className="p-4 bg-slate-50/80 border-b border-slate-100 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="p-1.5 rounded-lg bg-indigo-100 text-indigo-700">
                <Sparkles className="w-4 h-4" />
              </div>
              <div>
                <h3 className="text-xs font-black text-slate-900">Recent Notifications</h3>
                <p className="text-[10px] text-slate-500 font-medium">Official Notices &amp; Job Vacancies</p>
              </div>
            </div>

            {unreadCount > 0 ? (
              <button
                onClick={markAllAsRead}
                className="flex items-center gap-1 text-[10px] font-black text-indigo-600 hover:text-indigo-800 bg-indigo-50 hover:bg-indigo-100 px-2.5 py-1 rounded-full transition-all cursor-pointer"
              >
                <Check className="w-3 h-3" /> Mark all read
              </button>
            ) : (
              <span className="text-[10px] font-bold text-slate-400">All read</span>
            )}
          </div>

          {/* Notifications List */}
          <div className="max-h-80 overflow-y-auto divide-y divide-slate-100">
            {notifications.length === 0 ? (
              <div className="p-6 text-center text-xs text-slate-500 font-medium">
                No recent announcements.
              </div>
            ) : (
              notifications.map((item) => (
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
                      item.category === 'VACANCY'
                        ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                        : 'bg-indigo-50 text-indigo-700 border border-indigo-200'
                    }`}
                  >
                    {item.category === 'VACANCY' ? (
                      <Briefcase className="w-4 h-4" />
                    ) : (
                      <Megaphone className="w-4 h-4" />
                    )}
                  </div>

                  <div className="flex-1 space-y-1">
                    <div className="flex items-center justify-between gap-1">
                      <span
                        className={`text-[9px] font-black uppercase tracking-wider px-1.5 py-0.5 rounded-full ${
                          item.category === 'VACANCY'
                            ? 'bg-emerald-100 text-emerald-800'
                            : 'bg-indigo-100 text-indigo-800'
                        }`}
                      >
                        {item.category === 'VACANCY' ? '💼 Job Vacancy' : '📢 Notice'}
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
              <span>View All Official Notices &amp; Vacancies</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </Link>
          </div>

        </div>
      )}
    </div>
  );
}
