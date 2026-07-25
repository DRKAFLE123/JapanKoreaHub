import { NextResponse } from 'next/server';
import { validateExamSubmission, checkRateLimit } from '@/lib/auth-security';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { userId, examId, score, totalQuestions, timeSpentSeconds, answers } = body;

    const clientIp = request.headers.get('x-forwarded-for') || userId || 'anonymous';

    // Rate limiting: max 5 submissions per minute per user/IP
    if (!checkRateLimit(`mock_test_${clientIp}`, 5, 60 * 1000)) {
      return NextResponse.json(
        { error: 'Rate limit exceeded. Mock exam submissions rate limited.' },
        { status: 429 }
      );
    }

    // Anti-cheat validation
    const antiCheatCheck = validateExamSubmission(totalQuestions || 20, timeSpentSeconds || 300, score || 80);
    if (!antiCheatCheck.valid) {
      return NextResponse.json(
        { error: 'Submission rejected by anti-cheat guard.', reason: antiCheatCheck.reason },
        { status: 400 }
      );
    }

    const passed = (score || 0) >= 70;
    const certificateCode = passed ? `LG-CERT-${Math.random().toString(36).substring(2, 9).toUpperCase()}` : null;

    return NextResponse.json({
      success: true,
      attempt: {
        userId,
        examId,
        score,
        passed,
        timeSpentSeconds,
        certificateCode,
        completedAt: new Date().toISOString(),
      },
    });
  } catch (error) {
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
