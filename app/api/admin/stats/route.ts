import { NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { requireAdmin } from '@/lib/auth-security';

export async function GET(request: Request) {
  try {
    const adminAuth = requireAdmin(request);
    if (adminAuth.errorResponse) {
      return adminAuth.errorResponse;
    }

    const [
      totalUsers,
      totalStudents,
      totalAdmins,
      totalExams,
      totalNotices,
      totalBookings,
      totalCertificates,
      totalKanji,
    ] = await Promise.all([
      db.user.count().catch(() => 0),
      db.user.count({ where: { role: 'STUDENT' } }).catch(() => 0),
      db.user.count({ where: { role: 'ADMIN' } }).catch(() => 0),
      db.exam.count().catch(() => 0),
      db.notice.count().catch(() => 0),
      db.consultancyBooking.count().catch(() => 0),
      db.certificate.count().catch(() => 0),
      db.kanji.count().catch(() => 0),
    ]);

    return NextResponse.json({
      success: true,
      stats: {
        totalUsers,
        totalStudents,
        totalAdmins,
        totalExams,
        totalNotices,
        totalBookings,
        totalCertificates,
        totalVocab: 4250, // Curated vocabulary database
        totalKanji,
      },
    });
  } catch (error: any) {
    return NextResponse.json(
      { error: error?.message || 'Failed to fetch admin stats' },
      { status: 500 }
    );
  }
}
