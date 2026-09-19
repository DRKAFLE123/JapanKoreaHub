'use client';
import React, { useState, useEffect } from 'react';
import { X, Send, MessageSquare, Phone, User, ShieldCheck, CheckCheck, Loader2 } from 'lucide-react';
import type { CommunityPost, DirectMessage } from '@/lib/community-data';
import PlatformMessageIcon from '@/components/icons/PlatformMessageIcon';

interface DirectMessageDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  activePost?: CommunityPost | null;
  user?: { name: string; email: string } | null;
  onRequireAuth: () => void;
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

  useEffect(() => {
    if (isOpen && user) {
      fetchMessages();
    }
  }, [isOpen, user, activePost]);

  const fetchMessages = async () => {
    setLoading(true);
    try {
      const res = await fetch(`/api/community/messages?userId=${encodeURIComponent(user?.email || '')}`);
      const data = await res.json();
      if (data.success && Array.isArray(data.messages)) {
        setMessages(data.messages);
      }
    } catch {}
    finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  // Filter messages for current post thread
  const threadMessages = activePost
    ? messages.filter(m => m.postId === activePost.id)
    : messages;

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputText.trim()) return;

    if (!user) {
      onRequireAuth();
      return;
    }

    if (!activePost) return;

    setSending(true);
    try {
      const payload = {
        postId: activePost.id,
        postTitle: activePost.title,
        senderId: user.email,
        senderName: user.name,
        receiverId: activePost.authorId,
        receiverName: activePost.authorName,
        content: inputText.trim(),
      };

      const res = await fetch('/api/community/messages', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      if (data.success) {
        setMessages(prev => [...prev, data.message]);
        setInputText('');
      }
    } catch {}
    finally {
      setSending(false);
    }
  };

  return (
    <>
      <div className="fixed inset-0 z-[95] bg-slate-950/60 backdrop-blur-xs animate-fade-in" onClick={onClose} />

      <div className="fixed top-0 right-0 bottom-0 z-[100] w-full max-w-md bg-white shadow-2xl animate-slide-left flex flex-col font-sans">
        
        {/* Drawer Header */}
        <div className="p-4 sm:p-5 border-b border-slate-200 bg-slate-900 text-white flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-white/10 flex items-center justify-center text-white">
              <PlatformMessageIcon className="w-5 h-5 text-white" forceColor="text-white" />
            </div>
            <div>
              <h3 className="text-sm font-black text-white">
                {activePost ? `Inquiry: ${activePost.authorName}` : 'Community Direct Messages'}
              </h3>
              <p className="text-[11px] text-slate-400 truncate max-w-[220px]">
                {activePost ? activePost.title : 'Direct chat with poster'}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-xl bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Post Quick Summary Bar */}
        {activePost && (
          <div className="p-3 bg-slate-50 border-b border-slate-200/80 flex items-center justify-between text-xs">
            <div className="min-w-0 flex-1 pr-2">
              <span className="font-bold text-slate-900 block truncate">{activePost.title}</span>
              <span className="text-slate-500 text-[11px]">
                {activePost.city} &middot; {activePost.currency === 'KRW' ? '₩' : '¥'}{new Intl.NumberFormat().format(activePost.price)}
              </span>
            </div>
            {activePost.isPhoneVerified && (
              <span className="flex items-center gap-1 px-2 py-0.5 rounded-md bg-emerald-100 text-emerald-800 text-[10px] font-black shrink-0">
                <ShieldCheck className="w-3 h-3" />
                Verified
              </span>
            )}
          </div>
        )}

        {/* Chat Thread Area */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-slate-50/50">
          {!user ? (
            <div className="h-full flex flex-col items-center justify-center text-center p-6 space-y-3">
              <div className="w-12 h-12 rounded-full bg-indigo-50 text-indigo-600 flex items-center justify-center">
                <User className="w-6 h-6" />
              </div>
              <h4 className="text-sm font-black text-slate-900">Sign in to Message</h4>
              <p className="text-xs text-slate-500 max-w-xs">
                To prevent spam and keep transactions safe, you must be signed in to direct message posters.
              </p>
              <button
                type="button"
                onClick={onRequireAuth}
                className="px-5 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-black uppercase tracking-wider cursor-pointer"
              >
                Sign In / Register
              </button>
            </div>
          ) : threadMessages.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center p-6 text-slate-400 space-y-2">
              <MessageSquare className="w-8 h-8 opacity-40" />
              <p className="text-xs font-bold">No messages yet</p>
              <p className="text-[11px]">Send an introductory question below. The poster will receive your message directly!</p>
            </div>
          ) : (
            threadMessages.map((msg) => {
              const isMine = msg.senderId === user.email;
              return (
                <div
                  key={msg.id}
                  className={`flex flex-col ${isMine ? 'items-end' : 'items-start'}`}
                >
                  <div
                    className={`max-w-[85%] p-3 rounded-2xl text-xs font-medium leading-relaxed ${
                      isMine
                        ? 'bg-indigo-600 text-white rounded-br-xs shadow-xs'
                        : 'bg-white border border-slate-200 text-slate-900 rounded-bl-xs shadow-xs'
                    }`}
                  >
                    <p>{msg.content}</p>
                  </div>
                  <span className="text-[10px] text-slate-400 mt-1 px-1">
                    {new Date(msg.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </span>
                </div>
              );
            })
          )}
        </div>

        {/* Input Box */}
        {user && (
          <form onSubmit={handleSend} className="p-3 bg-white border-t border-slate-200 flex gap-2">
            <input
              type="text"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder="Ask about viewing, rent, shift timing..."
              className="flex-1 px-4 py-2.5 rounded-xl border border-slate-200 text-xs font-medium text-slate-900 placeholder-slate-400 focus:outline-none focus:border-indigo-500"
            />
            <button
              type="submit"
              disabled={sending || !inputText.trim()}
              className="px-4 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-black text-xs transition-colors disabled:opacity-50 cursor-pointer flex items-center justify-center"
            >
              {sending ? <Loader2 className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
            </button>
          </form>
        )}

      </div>
    </>
  );
}
