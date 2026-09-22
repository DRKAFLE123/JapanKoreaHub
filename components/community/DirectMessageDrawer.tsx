'use client';
import React, { useState, useEffect, useMemo, useRef } from 'react';
import {
  X,
  Send,
  MessageSquare,
  User,
  ShieldCheck,
  CheckCheck,
  Check,
  Loader2,
  ArrowLeft,
  Search,
  Building,
  Briefcase,
  Sparkles,
  ExternalLink
} from 'lucide-react';
import type { CommunityPost, DirectMessage } from '@/lib/community-data';
import PlatformMessageIcon from '@/components/icons/PlatformMessageIcon';
import { useBodyScrollLock } from '@/lib/useBodyScrollLock';
import { useVirtualKeyboard } from '@/lib/useVirtualKeyboard';

interface DirectMessageDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  activePost?: CommunityPost | null;
  user?: { name: string; email: string } | null;
  onRequireAuth: () => void;
}

interface ThreadSummary {
  threadKey: string;
  postId: string;
  postTitle: string;
  otherUserId: string;
  otherUserName: string;
  lastMessage: DirectMessage;
  unreadCount: number;
  messages: DirectMessage[];
}

// Generate consistent avatar color based on user's name
function getAvatarBgColor(name: string): string {
  const colors = [
    'bg-indigo-600',
    'bg-emerald-600',
    'bg-rose-600',
    'bg-amber-600',
    'bg-purple-600',
    'bg-teal-600',
    'bg-blue-600',
  ];
  let hash = 0;
  for (let i = 0; i < name.length; i++) {
    hash = name.charCodeAt(i) + ((hash << 5) - hash);
  }
  return colors[Math.abs(hash) % colors.length];
}

// Format relative time (e.g., "Just now", "5m", "Yesterday")
function formatChatTime(dateStr: string): string {
  try {
    const d = new Date(dateStr);
    const now = new Date();
    const diffMs = now.getTime() - d.getTime();
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMs / 3600000);

    if (diffMins < 1) return 'Just now';
    if (diffMins < 60) return `${diffMins}m`;
    if (diffHours < 24 && d.getDate() === now.getDate()) {
      return d.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    }
    const yesterday = new Date(now);
    yesterday.setDate(now.getDate() - 1);
    if (d.getDate() === yesterday.getDate()) return 'Yesterday';
    return d.toLocaleDateString([], { month: 'short', day: 'numeric' });
  } catch {
    return '';
  }
}

export default function DirectMessageDrawer({
  isOpen,
  onClose,
  activePost,
  user,
  onRequireAuth,
}: DirectMessageDrawerProps) {
  const [messages, setMessages] = useState<DirectMessage[]>([]);
  const [inputText, setInputText] = useState('');
  const [loading, setLoading] = useState(false);
  const [sending, setSending] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterTab, setFilterTab] = useState<'ALL' | 'UNREAD' | 'ROOMS' | 'JOBS'>('ALL');

  // Currently selected chat thread (null = show conversation list / inbox)
  const [activeThreadKey, setActiveThreadKey] = useState<string | null>(null);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  useBodyScrollLock(isOpen);
  const { keyboardHeight, viewportHeight } = useVirtualKeyboard();

  // Group all messages into distinct threads
  const threads = useMemo<ThreadSummary[]>(() => {
    if (!user?.email || !Array.isArray(messages)) return [];

    const threadMap = new Map<string, ThreadSummary>();

    messages.forEach((msg) => {
      const isMine = msg.senderId === user.email;
      const otherUserId = isMine ? msg.receiverId : msg.senderId;
      const otherUserName = isMine ? msg.receiverName : msg.senderName;
      const threadKey = `${msg.postId}___${otherUserId}`;

      let thread = threadMap.get(threadKey);
      if (!thread) {
        thread = {
          threadKey,
          postId: msg.postId,
          postTitle: msg.postTitle || 'Listing Inquiry',
          otherUserId,
          otherUserName: otherUserName || 'Community Member',
          lastMessage: msg,
          unreadCount: 0,
          messages: [],
        };
        threadMap.set(threadKey, thread);
      }

      thread.messages.push(msg);

      // Keep latest message updated
      if (new Date(msg.createdAt).getTime() >= new Date(thread.lastMessage.createdAt).getTime()) {
        thread.lastMessage = msg;
      }

      // Count unread incoming messages
      if (msg.receiverId === user.email && !msg.isRead) {
        thread.unreadCount += 1;
      }
    });

    // Sort threads by most recent message first
    return Array.from(threadMap.values()).sort(
      (a, b) => new Date(b.lastMessage.createdAt).getTime() - new Date(a.lastMessage.createdAt).getTime()
    );
  }, [messages, user?.email]);

  // Initial setup when drawer opens or activePost changes
  useEffect(() => {
    if (!isOpen) {
      setActiveThreadKey(null);
      return;
    }

    if (user?.email) {
      fetchMessages();

      // If opened with an activePost where current user is NOT the author, auto-select this thread
      if (activePost && activePost.authorId !== user.email) {
        const directKey = `${activePost.id}___${activePost.authorId}`;
        setActiveThreadKey(directKey);
      }
    }
  }, [isOpen, user?.email, activePost?.id]);

  // Auto-scroll to bottom of chat when new message arrives or thread opens
  useEffect(() => {
    if (activeThreadKey) {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [activeThreadKey, messages]);

  // When virtual keyboard opens on mobile, keep chat scrolled to latest messages
  useEffect(() => {
    if (activeThreadKey && isOpen && keyboardHeight > 0) {
      const timer = setTimeout(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
      }, 100);
      return () => clearTimeout(timer);
    }
  }, [keyboardHeight, activeThreadKey, isOpen]);

  const fetchMessages = async () => {
    if (!user?.email) return;
    setLoading(true);
    try {
      const res = await fetch(`/api/community/messages?userId=${encodeURIComponent(user.email)}`);
      const data = await res.json();
      if (data.success && Array.isArray(data.messages)) {
        setMessages(data.messages);
      }
    } catch {}
    finally {
      setLoading(false);
    }
  };

  // Mark thread messages as read when a thread is selected
  const markThreadAsRead = async (postId: string, otherUserId: string) => {
    if (!user?.email) return;
    try {
      await fetch('/api/community/messages', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId: user.email, postId, otherUserId }),
      });
      // Locally mark messages read in state
      setMessages((prev) =>
        prev.map((m) => {
          if (m.receiverId === user.email && m.postId === postId && m.senderId === otherUserId) {
            return { ...m, isRead: true };
          }
          return m;
        })
      );
      window.dispatchEvent(new Event('jkh_messages_sync'));
    } catch {}
  };

  const handleSelectThread = (thread: ThreadSummary) => {
    setActiveThreadKey(thread.threadKey);
    if (thread.unreadCount > 0) {
      markThreadAsRead(thread.postId, thread.otherUserId);
    }
  };

  // Active chat thread object (or fallback if newly initiated from a post with 0 prior messages)
  const activeThread = useMemo<ThreadSummary | null>(() => {
    if (!activeThreadKey) return null;
    const existing = threads.find((t) => t.threadKey === activeThreadKey);
    if (existing) return existing;

    // Fallback: If initiated from activePost and no messages exist yet
    if (activePost && activePost.authorId !== user?.email) {
      return {
        threadKey: `${activePost.id}___${activePost.authorId}`,
        postId: activePost.id,
        postTitle: activePost.title,
        otherUserId: activePost.authorId,
        otherUserName: activePost.authorName,
        lastMessage: {} as DirectMessage,
        unreadCount: 0,
        messages: [],
      };
    }
    return null;
  }, [activeThreadKey, threads, activePost, user?.email]);

  const handleSend = async (e?: React.FormEvent, customText?: string) => {
    if (e) e.preventDefault();
    const textToSend = (customText || inputText).trim();
    if (!textToSend) return;

    if (!user) {
      onRequireAuth();
      return;
    }

    if (!activeThread) return;

    setSending(true);
    try {
      const payload = {
        postId: activeThread.postId,
        postTitle: activeThread.postTitle,
        senderId: user.email,
        senderName: user.name,
        receiverId: activeThread.otherUserId,
        receiverName: activeThread.otherUserName,
        content: textToSend,
      };

      const res = await fetch('/api/community/messages', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      if (data.success && data.message) {
        setMessages((prev) => [...prev, data.message]);
        setInputText('');
        window.dispatchEvent(new Event('jkh_messages_sync'));
      }
    } catch {}
    finally {
      setSending(false);
    }
  };

  // Filter threads for search and category pills
  const filteredThreads = useMemo(() => {
    return threads.filter((t) => {
      // Category filter
      if (filterTab === 'UNREAD' && t.unreadCount === 0) return false;
      if (filterTab === 'ROOMS' && !t.postTitle.toLowerCase().includes('room') && !t.postTitle.toLowerCase().includes('apartment') && !t.postTitle.toLowerCase().includes('share')) return false;
      if (filterTab === 'JOBS' && !t.postTitle.toLowerCase().includes('job') && !t.postTitle.toLowerCase().includes('staff') && !t.postTitle.toLowerCase().includes('shift') && !t.postTitle.toLowerCase().includes('worker')) return false;

      // Text search
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchName = t.otherUserName.toLowerCase().includes(q);
        const matchTitle = t.postTitle.toLowerCase().includes(q);
        const matchMsg = t.lastMessage?.content?.toLowerCase().includes(q);
        return matchName || matchTitle || matchMsg;
      }
      return true;
    });
  }, [threads, searchQuery, filterTab]);

  const totalUnreadAll = useMemo(() => {
    return threads.reduce((acc, t) => acc + t.unreadCount, 0);
  }, [threads]);

  // Quick suggestion chips
  const quickReplies = activePost?.type === 'ROOM'
    ? ['Is this room still available?', 'When can I visit for viewing?', 'Are utilities included in rent?']
    : ['Is this position still open?', 'What are the shift timings?', 'Can I share my CV / resume?'];

  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 z-[95] bg-slate-950/60 backdrop-blur-xs animate-fade-in touch-none"
        onClick={onClose}
        onTouchMove={(e) => e.preventDefault()}
      />

      {/* Drawer Container */}
      <div 
        className="fixed top-0 right-0 z-[100] w-full max-w-md bg-white shadow-2xl animate-slide-left flex flex-col font-sans transition-[bottom,height] duration-150 ease-out"
        style={{
          bottom: keyboardHeight > 0 ? `${keyboardHeight}px` : '0px',
          height: keyboardHeight > 0 ? `${viewportHeight}px` : '100%',
        }}
      >

        {/* ────────────────────────────────────────────────────────── */}
        {/* VIEW 1: ACTIVE CHAT SCREEN (WHATSAPP / MESSENGER THREAD)   */}
        {/* ────────────────────────────────────────────────────────── */}
        {activeThread ? (
          <div className="flex flex-col h-full bg-slate-50">
            {/* Chat Top Header */}
            <div className="px-3 sm:px-4 py-3 border-b border-slate-200 bg-slate-900 text-white flex items-center justify-between shadow-xs shrink-0">
              <div className="flex items-center gap-2.5 min-w-0">
                {/* Back to Inbox Button */}
                <button
                  type="button"
                  onClick={() => setActiveThreadKey(null)}
                  className="p-1.5 -ml-1 rounded-xl bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer flex items-center gap-1 text-xs font-bold shrink-0"
                  title="Back to all conversations"
                >
                  <ArrowLeft className="w-4 h-4" />
                  <span className="hidden sm:inline">Chats</span>
                </button>

                {/* Contact Avatar */}
                <div
                  className={`w-9 h-9 rounded-full ${getAvatarBgColor(
                    activeThread.otherUserName
                  )} text-white font-black text-sm flex items-center justify-center shrink-0 shadow-xs ring-2 ring-white/20`}
                >
                  {activeThread.otherUserName.charAt(0).toUpperCase()}
                </div>

                {/* Contact Name & Listing Title */}
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-1.5">
                    <h3 className="text-xs sm:text-sm font-black text-white truncate">
                      {activeThread.otherUserName}
                    </h3>
                    <span className="px-1.5 py-0.2 rounded text-[9px] font-bold bg-white/15 text-slate-200 shrink-0">
                      Direct
                    </span>
                  </div>
                  <p className="text-[10px] sm:text-[11px] text-slate-400 truncate max-w-[200px] sm:max-w-[240px]">
                    Re: {activeThread.postTitle}
                  </p>
                </div>
              </div>

              {/* Close Drawer Button */}
              <button
                type="button"
                onClick={onClose}
                className="p-2 rounded-xl bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer shrink-0"
                aria-label="Close messaging"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Listing Context Banner */}
            <div className="px-3 py-2 bg-indigo-50/70 border-b border-indigo-100 flex items-center justify-between text-xs shrink-0">
              <div className="min-w-0 flex-1 pr-2">
                <span className="font-bold text-indigo-950 block truncate text-[11px] sm:text-xs">
                  📌 {activeThread.postTitle}
                </span>
              </div>
              <span className="text-[10px] font-black text-indigo-600 uppercase bg-white px-2 py-0.5 rounded-full border border-indigo-200 shrink-0">
                Active Listing
              </span>
            </div>

            {/* Messages Scroll Area */}
            <div className="flex-1 overflow-y-auto p-3 sm:p-4 space-y-3">
              {activeThread.messages.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-center p-6 text-slate-400 space-y-2">
                  <div className="w-12 h-12 rounded-2xl bg-indigo-50 text-indigo-600 flex items-center justify-center shadow-xs">
                    <MessageSquare className="w-6 h-6" />
                  </div>
                  <p className="text-xs font-black text-slate-700">Start the conversation</p>
                  <p className="text-[11px] text-slate-500 max-w-xs">
                    Send a quick introductory inquiry about this listing. You'll receive replies right here!
                  </p>
                </div>
              ) : (
                activeThread.messages.map((msg, idx) => {
                  const isMine = msg.senderId === user?.email;
                  return (
                    <div
                      key={msg.id || idx}
                      className={`flex flex-col ${isMine ? 'items-end' : 'items-start'}`}
                    >
                      {/* Message Bubble */}
                      <div
                        className={`max-w-[85%] px-3.5 py-2.5 rounded-2xl text-xs font-medium leading-relaxed shadow-xs ${
                          isMine
                            ? 'bg-indigo-600 text-white rounded-br-xs'
                            : 'bg-white border border-slate-200/90 text-slate-900 rounded-bl-xs'
                        }`}
                      >
                        {!isMine && (
                          <span className="block text-[10px] font-black text-indigo-600 mb-0.5">
                            {msg.senderName}
                          </span>
                        )}
                        <p className="whitespace-pre-wrap break-words">{msg.content}</p>
                      </div>

                      {/* Timestamp & Read Receipt Checkmarks */}
                      <div className="flex items-center gap-1 mt-0.5 px-1">
                        <span className="text-[10px] text-slate-400">
                          {new Date(msg.createdAt).toLocaleTimeString([], {
                            hour: '2-digit',
                            minute: '2-digit',
                          })}
                        </span>
                        {isMine && (
                          msg.isRead ? (
                            <span title="Read"><CheckCheck className="w-3.5 h-3.5 text-indigo-600 stroke-[2.5]" /></span>
                          ) : (
                            <span title="Sent"><Check className="w-3 h-3 text-slate-400" /></span>
                          )
                        )}
                      </div>
                    </div>
                  );
                })
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Quick Suggestion Chips */}
            <div className="px-3 py-1.5 bg-slate-100/80 border-t border-slate-200/80 flex items-center gap-1.5 overflow-x-auto no-scrollbar shrink-0">
              <span className="text-[10px] font-bold text-slate-400 shrink-0">Quick:</span>
              {quickReplies.map((chip, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => handleSend(undefined, chip)}
                  className="px-2.5 py-1 rounded-full bg-white border border-slate-200 hover:border-indigo-300 hover:bg-indigo-50 text-[10px] font-bold text-slate-700 hover:text-indigo-700 shrink-0 transition-colors shadow-2xs cursor-pointer"
                >
                  {chip}
                </button>
              ))}
            </div>

            {/* Input Composer Bar */}
            <form
              onSubmit={(e) => handleSend(e)}
              className="p-2.5 sm:p-3 bg-white border-t border-slate-200 flex gap-2 shrink-0 items-center"
            >
              <input
                type="text"
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                onFocus={() => {
                  setTimeout(() => {
                    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
                  }, 150);
                }}
                placeholder="Type a message..."
                className="flex-1 px-3.5 py-2 sm:py-2.5 rounded-xl border border-slate-200 text-xs font-medium text-slate-900 placeholder-slate-400 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
              />
              <button
                type="submit"
                disabled={sending || !inputText.trim()}
                className="px-4 py-2 sm:py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-black text-xs transition-colors disabled:opacity-40 cursor-pointer flex items-center justify-center shadow-xs shrink-0"
              >
                {sending ? <Loader2 className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
              </button>
            </form>
          </div>
        ) : (
          /* ────────────────────────────────────────────────────────── */
          /* VIEW 2: INBOX / CONVERSATION LIST (WHATSAPP CHATS TAB)     */
          /* ────────────────────────────────────────────────────────── */
          <div className="flex flex-col h-full bg-white">
            {/* Inbox Header */}
            <div className="p-4 border-b border-slate-200 bg-slate-900 text-white flex items-center justify-between shrink-0">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-2xl bg-white/10 flex items-center justify-center text-white">
                  <PlatformMessageIcon className="w-5 h-5 text-white" forceColor="text-white" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="text-sm font-black text-white">Messages & Inquiries</h3>
                    {totalUnreadAll > 0 && (
                      <span className="px-2 py-0.5 rounded-full bg-rose-600 text-white text-[10px] font-black shadow-xs">
                        {totalUnreadAll} unread
                      </span>
                    )}
                  </div>
                  <p className="text-[11px] text-slate-400">
                    Direct 1-on-1 chats with posters and applicants
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={onClose}
                className="p-2 rounded-xl bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer"
                aria-label="Close"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Search Input */}
            <div className="p-2.5 bg-slate-50 border-b border-slate-200/80 shrink-0">
              <div className="relative">
                <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search persons or listings..."
                  className="w-full pl-9 pr-3 py-1.5 rounded-xl bg-white border border-slate-200 text-xs font-medium text-slate-800 placeholder-slate-400 focus:outline-none focus:border-indigo-500"
                />
              </div>

              {/* Filter Tabs */}
              <div className="flex items-center gap-1.5 mt-2">
                <button
                  type="button"
                  onClick={() => setFilterTab('ALL')}
                  className={`px-2.5 py-1 rounded-lg text-[11px] font-bold transition-colors cursor-pointer ${
                    filterTab === 'ALL'
                      ? 'bg-slate-900 text-white'
                      : 'bg-white text-slate-600 hover:bg-slate-200/60 border border-slate-200/60'
                  }`}
                >
                  All ({threads.length})
                </button>
                <button
                  type="button"
                  onClick={() => setFilterTab('UNREAD')}
                  className={`px-2.5 py-1 rounded-lg text-[11px] font-bold transition-colors cursor-pointer flex items-center gap-1 ${
                    filterTab === 'UNREAD'
                      ? 'bg-rose-600 text-white'
                      : 'bg-white text-slate-600 hover:bg-slate-200/60 border border-slate-200/60'
                  }`}
                >
                  <span>Unread</span>
                  {totalUnreadAll > 0 && (
                    <span className="w-4 h-4 rounded-full bg-rose-500 text-white text-[9px] font-black flex items-center justify-center">
                      {totalUnreadAll}
                    </span>
                  )}
                </button>
                <button
                  type="button"
                  onClick={() => setFilterTab('ROOMS')}
                  className={`px-2.5 py-1 rounded-lg text-[11px] font-bold transition-colors cursor-pointer flex items-center gap-1 ${
                    filterTab === 'ROOMS'
                      ? 'bg-purple-600 text-white'
                      : 'bg-white text-slate-600 hover:bg-slate-200/60 border border-slate-200/60'
                  }`}
                >
                  <Building className="w-3 h-3" />
                  <span>Rooms</span>
                </button>
                <button
                  type="button"
                  onClick={() => setFilterTab('JOBS')}
                  className={`px-2.5 py-1 rounded-lg text-[11px] font-bold transition-colors cursor-pointer flex items-center gap-1 ${
                    filterTab === 'JOBS'
                      ? 'bg-indigo-600 text-white'
                      : 'bg-white text-slate-600 hover:bg-slate-200/60 border border-slate-200/60'
                  }`}
                >
                  <Briefcase className="w-3 h-3" />
                  <span>Jobs</span>
                </button>
              </div>
            </div>

            {/* Conversation List Stream */}
            <div className="flex-1 overflow-y-auto divide-y divide-slate-100">
              {!user ? (
                <div className="h-full flex flex-col items-center justify-center text-center p-6 space-y-3">
                  <div className="w-12 h-12 rounded-2xl bg-indigo-50 text-indigo-600 flex items-center justify-center shadow-xs">
                    <User className="w-6 h-6" />
                  </div>
                  <h4 className="text-sm font-black text-slate-900">Sign in to Access Chats</h4>
                  <p className="text-xs text-slate-500 max-w-xs">
                    Sign in to message room owners and job posters directly in WhatsApp/Messenger format.
                  </p>
                  <button
                    type="button"
                    onClick={onRequireAuth}
                    className="px-5 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-black uppercase tracking-wider cursor-pointer shadow-xs"
                  >
                    Sign In / Register
                  </button>
                </div>
              ) : loading ? (
                <div className="h-48 flex items-center justify-center">
                  <Loader2 className="w-6 h-6 text-indigo-600 animate-spin" />
                </div>
              ) : filteredThreads.length === 0 ? (
                <div className="h-64 flex flex-col items-center justify-center text-center p-6 text-slate-400 space-y-2">
                  <MessageSquare className="w-8 h-8 opacity-40" />
                  <p className="text-xs font-bold text-slate-600">No conversations found</p>
                  <p className="text-[11px] text-slate-400 max-w-xs">
                    When you or someone else sends a direct inquiry on any Room or Job listing, the thread will appear here.
                  </p>
                </div>
              ) : (
                filteredThreads.map((thread) => {
                  const isLastMine = thread.lastMessage.senderId === user.email;
                  return (
                    <button
                      key={thread.threadKey}
                      type="button"
                      onClick={() => handleSelectThread(thread)}
                      className={`w-full p-3.5 flex items-start gap-3 text-left transition-colors hover:bg-slate-50 active:bg-slate-100 cursor-pointer ${
                        thread.unreadCount > 0 ? 'bg-indigo-50/40' : ''
                      }`}
                    >
                      {/* Contact Avatar with Online Dot */}
                      <div className="relative shrink-0 mt-0.5">
                        <div
                          className={`w-11 h-11 rounded-2xl ${getAvatarBgColor(
                            thread.otherUserName
                          )} text-white font-black text-sm flex items-center justify-center shadow-xs`}
                        >
                          {thread.otherUserName.charAt(0).toUpperCase()}
                        </div>
                        <span className="w-3 h-3 rounded-full bg-emerald-500 border-2 border-white absolute -bottom-0.5 -right-0.5" />
                      </div>

                      {/* Content Columns */}
                      <div className="min-w-0 flex-1">
                        <div className="flex items-center justify-between gap-1">
                          <h4
                            className={`text-xs font-bold truncate ${
                              thread.unreadCount > 0 ? 'text-slate-900 font-black' : 'text-slate-800'
                            }`}
                          >
                            {thread.otherUserName}
                          </h4>
                          <span className="text-[10px] text-slate-400 shrink-0 font-medium">
                            {formatChatTime(thread.lastMessage.createdAt)}
                          </span>
                        </div>

                        {/* Listing Reference Badge */}
                        <div className="mt-0.5 flex items-center gap-1 text-[10px] text-indigo-700 font-semibold truncate">
                          <span className="truncate max-w-[200px]">📌 {thread.postTitle}</span>
                        </div>

                        {/* Last message preview */}
                        <div className="mt-1 flex items-center justify-between gap-2">
                          <p
                            className={`text-xs truncate ${
                              thread.unreadCount > 0
                                ? 'text-slate-900 font-extrabold'
                                : 'text-slate-500'
                            }`}
                          >
                            {isLastMine ? (
                              <span className="text-slate-400 font-normal">You: </span>
                            ) : null}
                            {thread.lastMessage.content}
                          </p>

                          {/* Unread count badge */}
                          {thread.unreadCount > 0 && (
                            <span className="w-5 h-5 rounded-full bg-rose-600 text-white text-[10px] font-black flex items-center justify-center shrink-0 shadow-xs">
                              {thread.unreadCount}
                            </span>
                          )}
                        </div>
                      </div>
                    </button>
                  );
                })
              )}
            </div>
          </div>
        )}

      </div>
    </>
  );
}
