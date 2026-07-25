export type SrsRating = 1 | 2 | 3 | 4; // 1: Again, 2: Hard, 3: Good, 4: Easy

export interface SrsItemState {
  easeFactor: number;   // default 2.5
  intervalDays: number; // default 0
  repetitions: number;  // default 0
}

export interface SrsResult {
  easeFactor: number;
  intervalDays: number;
  repetitions: number;
  nextReviewAt: Date;
  intervalPreviewText: string;
}

/**
 * Calculates updated SM-2 Spaced Repetition parameters.
 */
export function calculateSM2(
  currentState: SrsItemState,
  rating: SrsRating,
  now: Date = new Date()
): SrsResult {
  let { easeFactor, intervalDays, repetitions } = currentState;

  // Map 1..4 rating to 0..5 SM-2 quality scale
  // 1 (Again) -> q=1
  // 2 (Hard) -> q=3
  // 3 (Good) -> q=4
  // 4 (Easy) -> q=5
  const qMap: Record<SrsRating, number> = {
    1: 1,
    2: 3,
    3: 4,
    4: 5,
  };
  const q = qMap[rating];

  // Calculate new Ease Factor
  // EF' = EF + (0.1 - (5 - q) * (0.08 + (5 - q) * 0.02))
  let newEaseFactor = easeFactor + (0.1 - (5 - q) * (0.08 + (5 - q) * 0.02));
  if (newEaseFactor < 1.3) {
    newEaseFactor = 1.3;
  }
  newEaseFactor = Math.round(newEaseFactor * 100) / 100;

  let newRepetitions = repetitions;
  let newIntervalDays = intervalDays;

  if (rating === 1) {
    // Failure (Again) - Reset repetition count
    newRepetitions = 0;
    newIntervalDays = 1;
  } else {
    // Success (Hard, Good, Easy)
    newRepetitions = repetitions + 1;

    if (newRepetitions === 1) {
      newIntervalDays = 1;
    } else if (newRepetitions === 2) {
      newIntervalDays = 6;
    } else {
      newIntervalDays = Math.round(intervalDays * newEaseFactor);
    }

    // Easy bonus
    if (rating === 4) {
      newIntervalDays = Math.round(newIntervalDays * 1.3);
    }
  }

  const nextReviewAt = new Date(now);
  nextReviewAt.setHours(nextReviewAt.getHours() + newIntervalDays * 24);

  // Friendly human-readable preview for UI buttons
  let intervalPreviewText = "";
  if (newIntervalDays === 0 || rating === 1) {
    intervalPreviewText = "< 10 min";
  } else if (newIntervalDays === 1) {
    intervalPreviewText = "1 day";
  } else {
    intervalPreviewText = `${newIntervalDays} days`;
  }

  return {
    easeFactor: newEaseFactor,
    intervalDays: newIntervalDays,
    repetitions: newRepetitions,
    nextReviewAt,
    intervalPreviewText,
  };
}
