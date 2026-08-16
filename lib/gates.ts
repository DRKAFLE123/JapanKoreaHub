/**
 * JapanKoreaHub Access Gate Configuration
 * Centralized feature flags for monetization and guest limits.
 */

export const GATES = {
  // Flip to true when ready to activate paywall (Phase 2 at 1,000+ users)
  subscription_enabled: false,

  // Guest limits
  free_flashcard_limit: 5,
  free_mock_test_limit: 1,
  
  // Modules accessible to guests without signup
  free_guest_modules: ['basics', 'hiragana', 'katakana', 'hangul'],
};

export interface GateCheckResult {
  allowed: boolean;
  gateType?: 'SIGNUP' | 'SUBSCRIPTION';
  reason?: string;
}

export function checkFlashcardAccess(user: { plan?: string } | null, cardsReviewedCount: number): GateCheckResult {
  if (user) {
    if (!GATES.subscription_enabled || user.plan === 'PRO') {
      return { allowed: true };
    }
    // Free registered member in Phase 2
    return { allowed: true };
  }

  // Guest user check
  if (cardsReviewedCount >= GATES.free_flashcard_limit) {
    return {
      allowed: false,
      gateType: 'SIGNUP',
      reason: `You've viewed ${GATES.free_flashcard_limit} free flashcards. Create a free account to continue learning.`,
    };
  }

  return { allowed: true };
}

export function checkMockExamAccess(user: { plan?: string } | null, examsTakenCount: number): GateCheckResult {
  if (!user) {
    if (examsTakenCount >= GATES.free_mock_test_limit) {
      return {
        allowed: false,
        gateType: 'SIGNUP',
        reason: 'Create a free account to unlock full mock exam engine and detailed scoring.',
      };
    }
    return { allowed: true };
  }

  if (GATES.subscription_enabled && user.plan !== 'PRO' && examsTakenCount >= 3) {
    return {
      allowed: false,
      gateType: 'SUBSCRIPTION',
      reason: 'Upgrade to Pro Member for unlimited exam attempts & certificate downloads.',
    };
  }

  return { allowed: true };
}

export function checkPracticeAccess(user: { name?: string; email?: string } | null): GateCheckResult {
  if (user) {
    return { allowed: true };
  }
  return {
    allowed: false,
    gateType: 'SIGNUP',
    reason: 'Please sign in or create a free account to practice flashcards and track your progress!',
  };
}

