import { NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { validateExamSubmission, checkRateLimit } from '@/lib/auth-security';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { userId: reqUserId, examId, score, totalQuestions, timeSpentSeconds, answers, studentName } = body;

    const clientIp = request.headers.get('x-forwarded-for') || reqUserId || 'anonymous';

    // Rate limiting: max 10 submissions per minute per user/IP
    if (!checkRateLimit(`mock_test_${clientIp}`, 10, 60 * 1000)) {
      return NextResponse.json(
        { error: 'Rate limit exceeded. Mock exam submissions rate limited.' },
        { status: 429 }
      );
    }

    // Anti-cheat validation
    const antiCheatCheck = validateExamSubmission(totalQuestions || 10, timeSpentSeconds || 300, score || 80);
    if (!antiCheatCheck.valid) {
      return NextResponse.json(
        { error: 'Submission rejected by anti-cheat guard.', reason: antiCheatCheck.reason },
        { status: 400 }
      );
    }

    const passed = (score || 0) >= 70;

    // Resolve or create user in DB
    let user = null;
    if (reqUserId) {
      user = await db.user.findUnique({ where: { id: reqUserId } });
    }
    if (!user) {
      // Find default or first student user
      user = await db.user.findFirst();
    }
    if (!user) {
      // Create guest examinee user
      user = await db.user.create({
        data: {
          email: `examinee_${Date.now()}@japankoreahub.com`,
          name: studentName || 'Diligent Student',
          password: 'GuestPasswordHash123!',
          role: 'STUDENT',
          points: 100,
        },
      });
    }

    // Resolve Course
    const isKorean = examId && (examId.toLowerCase().includes('eps') || examId.toLowerCase().includes('topik') || examId.toLowerCase().includes('kr'));
    const courseCode = isKorean ? 'EPS_TOPIK_BASIC' : 'JLPT_N5';

    let course = await db.course.findUnique({ where: { code: courseCode } });
    if (!course) {
      course = await db.course.create({
        data: {
          code: courseCode,
          title: isKorean ? 'EPS-TOPIK Korean Language Mastery' : 'Minna no Nihongo JLPT N5 Master Class',
          language: isKorean ? 'KOREAN' : 'JAPANESE',
          description: isKorean ? 'Official HRD Korea EPS-TOPIK curriculum' : 'Official JLPT N5 curriculum',
          level: isKorean ? 'EPS-1' : 'N5',
        }
      });
    }

    // Resolve Exam entity
    let exam = await db.exam.findFirst({
      where: {
        courseId: course.id,
        title: examId || (isKorean ? 'EPS-TOPIK Mock Exam Set 1' : 'JLPT N5 Mock Exam Set 1'),
      },
    });

    if (!exam) {
      exam = await db.exam.create({
        data: {
          courseId: course.id,
          title: examId || (isKorean ? 'EPS-TOPIK Mock Exam Set 1' : 'JLPT N5 Mock Exam Set 1'),
          timeLimitMinutes: 50,
          passPercentage: 70,
        },
      });
    }

    // Persist Exam Attempt to DB
    const attempt = await db.examAttempt.create({
      data: {
        userId: user.id,
        examId: exam.id,
        score: Math.round(score || 0),
        passed,
        timeSpentSeconds: timeSpentSeconds || 0,
        answers: typeof answers === 'string' ? answers : JSON.stringify(answers || {}),
        status: 'COMPLETED',
      },
    });

    let certificateCode = null;
    let qrVerificationUrl = null;

    if (passed) {
      const randomSuffix = Math.random().toString(36).substring(2, 7).toUpperCase();
      const year = new Date().getFullYear();
      const codePrefix = isKorean ? 'EPS' : 'N5';
      certificateCode = `LG-${year}-${codePrefix}-${randomSuffix}`;
      qrVerificationUrl = `https://japankoreahub.com/verify-certificate/${certificateCode}`;

      await db.certificate.create({
        data: {
          userId: user.id,
          courseId: course.id,
          certificateCode,
          score: Math.round(score || 0),
          qrVerificationUrl,
          issuedAt: new Date(),
        },
      });
    }

    return NextResponse.json({
      success: true,
      attempt: {
        id: attempt.id,
        userId: user.id,
        studentName: user.name || 'Examinee',
        courseTitle: course.title,
        examTitle: exam.title,
        score: attempt.score,
        passed,
        timeSpentSeconds,
        certificateCode,
        qrVerificationUrl,
        completedAt: attempt.completedAt.toISOString(),
      },
    });
  } catch (error: any) {
    console.error('Error submitting exam attempt:', error);
    return NextResponse.json({ error: error.message || 'Internal Server Error' }, { status: 500 });
  }
}
