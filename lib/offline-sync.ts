import Dexie, { Table } from 'dexie';

export interface OfflineReviewCard {
  id?: number;
  userId: string;
  itemType: string;
  itemId: string;
  rating: number;
  reviewedAt: string;
  synced: boolean;
}

export interface CachedLesson {
  id: string;
  title: string;
  courseCode: string;
  content: string;
  audioUrls: string[];
  updatedAt: string;
}

export interface OfflineExamAttempt {
  id?: number;
  userId: string;
  examId: string;
  score: number;
  answersJson: string;
  timeSpentSeconds: number;
  completedAt: string;
  synced: boolean;
}

export class LanguageGuruOfflineDB extends Dexie {
  offlineReviews!: Table<OfflineReviewCard>;
  cachedLessons!: Table<CachedLesson>;
  offlineExamAttempts!: Table<OfflineExamAttempt>;

  constructor() {
    super('LanguageGuruOfflineDB');
    this.version(1).stores({
      offlineReviews: '++id, userId, itemType, itemId, synced',
      cachedLessons: 'id, courseCode',
      offlineExamAttempts: '++id, userId, examId, synced',
    });
  }
}

export const offlineDB = new LanguageGuruOfflineDB();

/**
 * Adds an SRS review to local IndexedDB queue when offline.
 */
export async function queueOfflineReview(review: Omit<OfflineReviewCard, 'id' | 'synced'>) {
  try {
    await offlineDB.offlineReviews.add({
      ...review,
      synced: false,
    });
    console.log('[OfflineSync] SRS review queued locally in IndexedDB');
  } catch (err) {
    console.error('[OfflineSync] Failed to queue offline review:', err);
  }
}

/**
 * Returns count of unsynced items in local queue.
 */
export async function getUnsyncedCount(): Promise<number> {
  try {
    const unsyncedReviews = await offlineDB.offlineReviews.where('synced').equals(0).count();
    const unsyncedExams = await offlineDB.offlineExamAttempts.where('synced').equals(0).count();
    return unsyncedReviews + unsyncedExams;
  } catch (err) {
    return 0;
  }
}
