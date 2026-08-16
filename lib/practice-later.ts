/**
 * Utility for managing marked unknown words, practice progress, and user authentication state.
 */

export interface MarkedUnknownWord {
  id: string; // Unique identifier e.g., "ko-EPS-안녕" or "jp-N5-水"
  language: 'korean' | 'japanese';
  level: string;
  word: string;
  reading?: string;
  meaning: string;
  meaningNepali?: string;
  lesson?: number | string;
  addedAt: number;
}

export interface UserPracticeStats {
  cardsReviewedCount: number;
  lastPracticedAt: number;
  unknownCount: number;
  masteredCount: number;
}

export interface AuthUser {
  name: string;
  email: string;
}

/**
 * Get current logged in user from localStorage
 */
export function getAuthUser(): AuthUser | null {
  if (typeof window === 'undefined') return null;
  try {
    const saved = localStorage.getItem('jkh_user');
    if (!saved) return null;
    const parsed = JSON.parse(saved);
    if (parsed && parsed.email) {
      return parsed as AuthUser;
    }
  } catch (e) {
    console.error('Failed to parse jkh_user from localStorage', e);
  }
  return null;
}

/**
 * Get key for unknown words based on auth user
 */
function getStorageKey(userEmail?: string): string {
  if (userEmail) {
    return `lg_marked_unknown_words_${userEmail}`;
  }
  const user = getAuthUser();
  if (user?.email) {
    return `lg_marked_unknown_words_${user.email}`;
  }
  return 'lg_marked_unknown_words_guest';
}

/**
 * Fetch list of marked unknown words
 */
export function getMarkedUnknownWords(language?: 'korean' | 'japanese'): MarkedUnknownWord[] {
  if (typeof window === 'undefined') return [];
  try {
    const key = getStorageKey();
    const raw = localStorage.getItem(key);
    const list: MarkedUnknownWord[] = raw ? JSON.parse(raw) : [];
    if (language) {
      return list.filter((item) => item.language === language);
    }
    return list;
  } catch (e) {
    console.error('Error fetching marked unknown words', e);
    return [];
  }
}

/**
 * Check if a word is currently marked as unknown
 */
export function isWordMarked(id: string): boolean {
  const words = getMarkedUnknownWords();
  return words.some((item) => item.id === id);
}

/**
 * Toggle a word's marked unknown status
 */
export function toggleMarkedWord(item: Omit<MarkedUnknownWord, 'addedAt'>): boolean {
  if (typeof window === 'undefined') return false;
  try {
    const key = getStorageKey();
    const raw = localStorage.getItem(key);
    let list: MarkedUnknownWord[] = raw ? JSON.parse(raw) : [];

    const existingIndex = list.findIndex((w) => w.id === item.id);
    let isMarkedNow = false;

    if (existingIndex >= 0) {
      // Remove word
      list.splice(existingIndex, 1);
      isMarkedNow = false;
    } else {
      // Add word
      list.push({
        ...item,
        addedAt: Date.now(),
      });
      isMarkedNow = true;
    }

    localStorage.setItem(key, JSON.stringify(list));
    notifyStorageChange();
    return isMarkedNow;
  } catch (e) {
    console.error('Error toggling marked word', e);
    return false;
  }
}

/**
 * Clear all marked unknown words for a language
 */
export function clearMarkedUnknownWords(language?: 'korean' | 'japanese'): void {
  if (typeof window === 'undefined') return;
  try {
    const key = getStorageKey();
    if (!language) {
      localStorage.removeItem(key);
    } else {
      const raw = localStorage.getItem(key);
      let list: MarkedUnknownWord[] = raw ? JSON.parse(raw) : [];
      list = list.filter((w) => w.language !== language);
      localStorage.setItem(key, JSON.stringify(list));
    }
    notifyStorageChange();
  } catch (e) {
    console.error('Error clearing marked unknown words', e);
  }
}

/**
 * Migrate guest bookmarks to user profile upon sign in
 */
export function migrateGuestWordsToUser(userEmail: string): void {
  if (typeof window === 'undefined' || !userEmail) return;
  try {
    const guestRaw = localStorage.getItem('lg_marked_unknown_words_guest');
    if (!guestRaw) return;
    const guestList: MarkedUnknownWord[] = JSON.parse(guestRaw);
    if (!guestList || guestList.length === 0) return;

    const userKey = `lg_marked_unknown_words_${userEmail}`;
    const userRaw = localStorage.getItem(userKey);
    const userList: MarkedUnknownWord[] = userRaw ? JSON.parse(userRaw) : [];

    // Merge non-duplicate guest items
    const merged = [...userList];
    guestList.forEach((guestItem) => {
      if (!merged.some((u) => u.id === guestItem.id)) {
        merged.push(guestItem);
      }
    });

    localStorage.setItem(userKey, JSON.stringify(merged));
    localStorage.removeItem('lg_marked_unknown_words_guest');
    notifyStorageChange();
  } catch (e) {
    console.error('Error migrating guest words to user', e);
  }
}

/**
 * Record review progress count for signed in user
 */
export function recordCardReviewStat(): number {
  if (typeof window === 'undefined') return 0;
  try {
    const user = getAuthUser();
    const statsKey = user ? `lg_practice_stats_${user.email}` : 'lg_practice_stats_guest';
    const raw = localStorage.getItem(statsKey);
    const stats: UserPracticeStats = raw
      ? JSON.parse(raw)
      : { cardsReviewedCount: 0, lastPracticedAt: Date.now(), unknownCount: 0, masteredCount: 0 };

    stats.cardsReviewedCount += 1;
    stats.lastPracticedAt = Date.now();
    localStorage.setItem(statsKey, JSON.stringify(stats));
    return stats.cardsReviewedCount;
  } catch (e) {
    console.error('Error recording card review stat', e);
    return 0;
  }
}

/**
 * Get current card review stats
 */
export function getCardReviewStats(): UserPracticeStats {
  if (typeof window === 'undefined') {
    return { cardsReviewedCount: 0, lastPracticedAt: Date.now(), unknownCount: 0, masteredCount: 0 };
  }
  try {
    const user = getAuthUser();
    const statsKey = user ? `lg_practice_stats_${user.email}` : 'lg_practice_stats_guest';
    const raw = localStorage.getItem(statsKey);
    if (raw) return JSON.parse(raw);
  } catch (e) {
    console.error('Error fetching card review stats', e);
  }
  return { cardsReviewedCount: 0, lastPracticedAt: Date.now(), unknownCount: 0, masteredCount: 0 };
}

/**
 * Broadcast storage changes to other components
 */
function notifyStorageChange(): void {
  if (typeof window !== 'undefined') {
    window.dispatchEvent(new Event('lg_unknown_words_changed'));
  }
}
