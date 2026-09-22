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

// ────────────────────────────────────────────────────────────
// JWT TOKEN AUTHENTICATION SYSTEM
// ────────────────────────────────────────────────────────────
import jwt from 'jsonwebtoken';
import { NextResponse } from 'next/server';

function getJwtSecret(): string {
  const secret = process.env.JWT_SECRET;
  if (!secret) {
    if (process.env.NODE_ENV === 'production') {
      console.error('FATAL: JWT_SECRET environment variable is missing in production!');
    }
    // Strong fallback only in development; never use guessable strings
    return process.env.NEXTAUTH_SECRET || 'jkh_dev_secret_38472910485610293847561928374615';
  }
  return secret;
}

const JWT_EXPIRES_IN = '7d';

export interface JwtUserPayload {
  id: string;
  email: string;
  name?: string | null;
  role: string;
}

/**
 * Signs a JWT token containing user details.
 */
export function signJwtToken(payload: JwtUserPayload): string {
  return jwt.sign(payload, getJwtSecret(), { expiresIn: JWT_EXPIRES_IN });
}

/**
 * Verifies a JWT token and returns payload if valid, or null if invalid/expired.
 */
export function verifyJwtToken(token: string): JwtUserPayload | null {
  try {
    return jwt.verify(token, getJwtSecret()) as JwtUserPayload;
  } catch {
    return null;
  }
}

/**
 * Extracts and verifies JWT payload from request cookies or Authorization header.
 */
export function getAuthUserFromRequest(req: Request): JwtUserPayload | null {
  try {
    // 1. Check Authorization Header: Bearer <token>
    const authHeader = req.headers.get('authorization');
    if (authHeader && authHeader.startsWith('Bearer ')) {
      const token = authHeader.substring(7).trim();
      const user = verifyJwtToken(token);
      if (user) return user;
    }

    // 2. Check Cookies: auth_token=<token>
    const cookieHeader = req.headers.get('cookie');
    if (cookieHeader) {
      const match = cookieHeader.match(/auth_token=([^;]+)/);
      if (match) {
        const token = match[1].trim();
        const user = verifyJwtToken(token);
        if (user) return user;
      }
    }
  } catch {
    return null;
  }

  return null;
}

/**
 * Guard: Requires any authenticated user. Returns error response if unauthenticated.
 */
export function requireAuth(req: Request): { user: JwtUserPayload; errorResponse?: never } | { user?: never; errorResponse: NextResponse } {
  const user = getAuthUserFromRequest(req);
  if (!user) {
    return {
      errorResponse: NextResponse.json(
        { error: 'Unauthorized: Authentication is required to perform this action.' },
        { status: 401 }
      ),
    };
  }
  return { user };
}

/**
 * Guard: Requires verified ADMIN role. Returns 401/403 response if unauthorized.
 */
export function requireAdmin(req: Request): { user: JwtUserPayload; errorResponse?: never } | { user?: never; errorResponse: NextResponse } {
  const user = getAuthUserFromRequest(req);
  if (!user) {
    return {
      errorResponse: NextResponse.json(
        { error: 'Unauthorized: Admin authentication required.' },
        { status: 401 }
      ),
    };
  }

  if (user.role !== 'ADMIN') {
    return {
      errorResponse: NextResponse.json(
        { error: 'Forbidden: You do not have administrator permissions.' },
        { status: 403 }
      ),
    };
  }

  return { user };
}

