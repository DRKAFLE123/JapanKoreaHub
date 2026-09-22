import { NextResponse } from 'next/server';

// In-memory verification code registry
const phoneOtpStore = new Map<string, { code: string; expiresAt: number }>();

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { action, phone, code } = body;

    if (!phone || !phone.trim()) {
      return NextResponse.json({ error: 'Phone number is required.' }, { status: 400 });
    }

    const cleanPhone = phone.trim().replace(/\s+/g, '');
    const isDev = process.env.NODE_ENV !== 'production';

    // Action 1: Request OTP
    if (action === 'request_otp') {
      // Rate limit: max 5 requests per 10 mins per phone
      const existing = phoneOtpStore.get(cleanPhone);
      if (existing && Date.now() < existing.expiresAt && (existing as any).attempts >= 5) {
        return NextResponse.json({ error: 'Too many OTP requests. Please wait a few minutes.' }, { status: 429 });
      }

      // Generate secure 6-digit OTP
      const generatedCode = Math.floor(100000 + Math.random() * 900000).toString();
      phoneOtpStore.set(cleanPhone, {
        code: generatedCode,
        expiresAt: Date.now() + 10 * 60 * 1000, // 10 minutes expiry
        attempts: ((existing as any)?.attempts || 0) + 1,
      } as any);

      return NextResponse.json({
        success: true,
        message: `Verification code sent to ${cleanPhone}.`,
        // ONLY expose demoOtp in local development
        ...(isDev ? { demoOtp: generatedCode } : {}),
      });
    }

    // Action 2: Verify OTP
    if (action === 'verify_otp') {
      if (!code) {
        return NextResponse.json({ error: 'Verification code is required.' }, { status: 400 });
      }

      const record = phoneOtpStore.get(cleanPhone);
      const trimmedCode = code.trim();

      // Only allow test bypass codes in non-production development
      const isDevBypass = isDev && (trimmedCode === '777777' || trimmedCode === '123456');
      const isCodeValid = record && record.code === trimmedCode && Date.now() < record.expiresAt;

      if (!isCodeValid && !isDevBypass) {
        return NextResponse.json({ error: 'Invalid or expired verification code. Please try again.' }, { status: 400 });
      }

      // Cleanup
      phoneOtpStore.delete(cleanPhone);

      return NextResponse.json({
        success: true,
        verified: true,
        phone: cleanPhone,
        message: 'Phone number verified successfully! You are now authorized to post jobs & rooms.',
      });
    }

    return NextResponse.json({ error: 'Invalid action specified' }, { status: 400 });
  } catch (err: any) {
    return NextResponse.json({ error: err?.message || 'Phone verification failed' }, { status: 500 });
  }
}
