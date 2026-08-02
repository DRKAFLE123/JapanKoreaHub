import { NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { getAuthUserFromRequest } from '@/lib/auth-security';

export async function GET(request: Request) {
  try {
    const authUser = getAuthUserFromRequest(request);
    if (!authUser) {
      return NextResponse.json(
        { authenticated: false },
        { status: 401 }
      );
    }

    const user = await db.user.findUnique({
      where: { id: authUser.id },
      select: {
        id: true,
        email: true,
        name: true,
        role: true,
        streakDays: true,
        longestStreak: true,
        points: true,
        createdAt: true,
      },
    });

    if (!user) {
      return NextResponse.json(
        { authenticated: false, error: 'User not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      authenticated: true,
      user,
    });
  } catch (error: any) {
    return NextResponse.json(
      { authenticated: false, error: error?.message || 'Server error' },
      { status: 500 }
    );
  }
}
