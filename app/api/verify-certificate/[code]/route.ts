import { NextResponse } from 'next/server';
import { db } from '@/lib/db';

export async function GET(
  request: Request,
  { params }: { params: Promise<{ code: string }> }
) {
  try {
    const { code } = await params;

    if (!code) {
      return NextResponse.json({ error: 'Certificate code is required' }, { status: 400 });
    }

    const cleanCode = code.trim();

    // Query real certificate from Database
    const certificate = await db.certificate.findUnique({
      where: { certificateCode: cleanCode },
      include: {
        user: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
        course: {
          select: {
            id: true,
            title: true,
            language: true,
            level: true,
          },
        },
      },
    });

    if (!certificate) {
      return NextResponse.json(
        {
          verified: false,
          error: 'Certificate record not found in the official registry.',
          certificateCode: cleanCode,
        },
        { status: 404 }
      );
    }

    return NextResponse.json({
      verified: true,
      certificateCode: certificate.certificateCode,
      studentName: certificate.user?.name || certificate.user?.email || 'Verified Candidate',
      courseTitle: certificate.course?.title || 'Language Examination Course',
      language: certificate.course?.language || 'JAPANESE',
      level: certificate.course?.level || 'Standard',
      score: certificate.score,
      issuedAt: certificate.issuedAt.toISOString(),
      verifiedBy: 'JapanKoreaHub Global Examination Board & HRD Examination Partner',
      qrVerificationUrl: certificate.qrVerificationUrl || `https://japankoreahub.com/verify-certificate/${certificate.certificateCode}`,
    });
  } catch (error: any) {
    console.error('Error verifying certificate:', error);
    return NextResponse.json(
      { error: error.message || 'Internal Server Error' },
      { status: 500 }
    );
  }
}
