import { NextResponse } from 'next/server';
import { calculateSM2, SrsRating } from '@/lib/srs-engine';
import { checkRateLimit } from '@/lib/auth-security';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { userId, itemType, itemId, rating, currentState } = body;

    // Rate limiting check per user
    const clientIp = request.headers.get('x-forwarded-for') || userId || 'anonymous';
    if (!checkRateLimit(`srs_${clientIp}`, 30, 60 * 1000)) {
      return NextResponse.json({ error: 'Rate limit exceeded. Please slow down reviews.' }, { status: 429 });
    }

    if (!userId || !itemType || !itemId || !rating) {
      return NextResponse.json({ error: 'Missing required parameters' }, { status: 400 });
    }

    const defaultState = currentState || { easeFactor: 2.5, intervalDays: 0, repetitions: 0 };
    const srsResult = calculateSM2(defaultState, rating as SrsRating);

    // Return updated SRS state (In production, this upserts to Prisma ReviewCard table)
    return NextResponse.json({
      success: true,
      reviewCard: {
        userId,
        itemType,
        itemId,
        easeFactor: srsResult.easeFactor,
        intervalDays: srsResult.intervalDays,
        repetitions: srsResult.repetitions,
        nextReviewAt: srsResult.nextReviewAt,
        intervalPreviewText: srsResult.intervalPreviewText,
      },
    });
  } catch (error) {
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
