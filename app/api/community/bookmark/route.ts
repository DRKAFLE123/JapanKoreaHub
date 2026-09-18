import { NextResponse } from 'next/server';
import { togglePostBookmark, getUserBookmarkedPostIds } from '@/lib/community-data';
import { getAuthUserFromRequest } from '@/lib/auth-security';

export async function GET(request: Request) {
  try {
    const authUser = getAuthUserFromRequest(request);
    const { searchParams } = new URL(request.url);
    const userId = authUser?.id || searchParams.get('userId') || 'default-user';

    const bookmarks = getUserBookmarkedPostIds(userId);
    return NextResponse.json({ success: true, bookmarks });
  } catch (err: any) {
    return NextResponse.json({ error: err?.message || 'Failed to fetch bookmarks' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const authUser = getAuthUserFromRequest(request);
    const body = await request.json();
    const userId = authUser?.id || body.userId;

    if (!userId) {
      return NextResponse.json({ error: 'Sign in is required to bookmark listings.' }, { status: 401 });
    }

    const { postId } = body;
    if (!postId) {
      return NextResponse.json({ error: 'Post ID is required' }, { status: 400 });
    }

    const isBookmarked = togglePostBookmark(userId, postId);
    return NextResponse.json({
      success: true,
      isBookmarked,
      message: isBookmarked ? 'Listing saved to your bookmarks!' : 'Listing removed from bookmarks.',
    });
  } catch (err: any) {
    return NextResponse.json({ error: err?.message || 'Failed to update bookmark' }, { status: 500 });
  }
}
