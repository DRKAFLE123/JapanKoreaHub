'use client';

import { useState, useEffect, useCallback } from 'react';

export function useUnreadMessages(user?: { name: string; email: string } | null) {
  const [unreadCount, setUnreadCount] = useState<number>(0);

  const fetchUnreadCount = useCallback(async () => {
    const userId = user?.email;
    if (!userId) {
      setUnreadCount(0);
      return;
    }

    try {
      const res = await fetch(`/api/community/messages?userId=${encodeURIComponent(userId)}`);
      if (!res.ok) return;
      const data = await res.json();
      if (data && typeof data.unreadCount === 'number') {
        setUnreadCount(data.unreadCount);
        try {
          localStorage.setItem('jkh_unread_msg_count', data.unreadCount.toString());
        } catch {}
      }
    } catch {}
  }, [user?.email]);

  useEffect(() => {
    // Initial fetch
    fetchUnreadCount();

    // Polling every 12 seconds for incoming messages
    const timer = setInterval(fetchUnreadCount, 12000);

    // Event listener for instantaneous updates when messages are sent/read
    const handleSync = () => {
      fetchUnreadCount();
    };

    window.addEventListener('jkh_messages_sync', handleSync);
    window.addEventListener('storage', handleSync);

    return () => {
      clearInterval(timer);
      window.removeEventListener('jkh_messages_sync', handleSync);
      window.removeEventListener('storage', handleSync);
    };
  }, [fetchUnreadCount]);

  return { unreadCount, refresh: fetchUnreadCount };
}
