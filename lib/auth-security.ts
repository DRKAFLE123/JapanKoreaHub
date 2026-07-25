import bcrypt from 'bcryptjs';

const SALT_ROUNDS = 12;

/**
 * Hashes a raw user password using bcrypt.
 */
export async function hashPassword(plainText: string): Promise<string> {
  return await bcrypt.hash(plainText, SALT_ROUNDS);
}

/**
 * Compares a plain text password against a stored bcrypt hash.
 */
export async function verifyPassword(plainText: string, hash: string): Promise<boolean> {
  return await bcrypt.compare(plainText, hash);
}

// In-memory rate limiting map for mock test submissions (Token Bucket / Window approach)
const rateLimitMap = new Map<string, { count: number; lastReset: number }>();

/**
 * Enforces rate limiting on key actions like mock exam submission.
 * Returns true if allowed, false if rate limit exceeded.
 */
export function checkRateLimit(identifier: string, limit = 5, windowMs = 60 * 1000): boolean {
  const now = Date.now();
  const entry = rateLimitMap.get(identifier);

  if (!entry || now - entry.lastReset > windowMs) {
    rateLimitMap.set(identifier, { count: 1, lastReset: now });
    return true;
  }

  if (entry.count >= limit) {
    return false;
  }

  entry.count += 1;
  return true;
}

/**
 * Anti-cheat validation: verifies that exam completion time is physically plausible.
 */
export function validateExamSubmission(
  totalQuestions: number,
  timeSpentSeconds: number,
  score: number
): { valid: boolean; reason?: string } {
  // Disallow completing 20 questions in less than 5 seconds (bot/replay attack)
  const minimumPlausibleSeconds = Math.max(3, Math.floor(totalQuestions * 0.5));
  
  if (timeSpentSeconds < minimumPlausibleSeconds && score > 50) {
    return {
      valid: false,
      reason: `Suspicious submission speed (${timeSpentSeconds}s for ${totalQuestions} questions). anti-cheat flag raised.`,
    };
  }

  return { valid: true };
}
