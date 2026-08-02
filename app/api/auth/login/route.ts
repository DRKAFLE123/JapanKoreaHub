import { NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { verifyPassword, signJwtToken } from '@/lib/auth-security';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { email, password } = body;

    if (!email || !password) {
      return NextResponse.json(
        { error: 'Email and password are required' },
        { status: 400 }
      );
    }

    const emailTrimmed = email.trim().toLowerCase();

    // Find user by email
    const user = await db.user.findUnique({
      where: { email: emailTrimmed },
    });

    if (!user) {
      return NextResponse.json(
        { error: 'Invalid email or password' },
        { status: 401 }
      );
    }

    // Verify bcrypt password
    const passwordValid = await verifyPassword(password, user.password);
    if (!passwordValid) {
      return NextResponse.json(
        { error: 'Invalid email or password' },
        { status: 401 }
      );
    }

    // Update streak and last active timestamp
    const updatedUser = await db.user.update({
      where: { id: user.id },
      data: {
        lastActiveAt: new Date(),
      },
    });

    // Sign JWT Token
    const token = signJwtToken({
      id: updatedUser.id,
      email: updatedUser.email,
      name: updatedUser.name,
      role: updatedUser.role,
    });

    const response = NextResponse.json({
      success: true,
      user: {
        id: updatedUser.id,
        email: updatedUser.email,
        name: updatedUser.name,
        role: updatedUser.role,
        streakDays: updatedUser.streakDays,
      },
      token,
    });

    // Set HTTP-only Cookie
    response.cookies.set({
      name: 'auth_token',
      value: token,
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
      maxAge: 7 * 24 * 60 * 60, // 7 days
    });

    return response;
  } catch (error: any) {
    console.error('Login error:', error);
    return NextResponse.json(
      { error: error?.message || 'Failed to authenticate user' },
      { status: 500 }
    );
  }
}
