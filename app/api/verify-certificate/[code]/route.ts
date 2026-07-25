import { NextResponse } from 'next/server';

export async function GET(
  request: Request,
  { params }: { params: Promise<{ code: string }> }
) {
  const { code } = await params;

  if (!code) {
    return NextResponse.json({ error: 'Certificate code is required' }, { status: 400 });
  }

  // Mock verified certificate response
  return NextResponse.json({
    verified: true,
    certificateCode: code,
    studentName: 'Ramesh Sharma',
    courseTitle: 'EPS-TOPIK Korean Language Mastery (Level 2)',
    score: 95,
    issuedAt: '2026-07-20T00:00:00.000Z',
    verifiedBy: 'LanguageGuru Global Examination Board & HRD Korea Partner',
    qrVerificationUrl: `https://languageguru.app/verify-certificate/${code}`,
  });
}
