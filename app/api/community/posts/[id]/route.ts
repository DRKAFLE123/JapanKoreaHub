import { NextResponse } from 'next/server';
import {
  getCommunityPostById,
  incrementPostLike,
  decrementPostLike,
  incrementPostShare,
} from '@/lib/community-data';

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const post = getCommunityPostById(id);
    if (!post) {
      return NextResponse.json({ error: 'Post not found' }, { status: 404 });
    }
    return NextResponse.json({ success: true, post });
  } catch (err: any) {
    return NextResponse.json({ error: err?.message || 'Error fetching post' }, { status: 500 });
  }
}

export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await request.json();

    if (body.action === 'LIKE') {
      const likesCount = incrementPostLike(id);
      return NextResponse.json({ success: true, likesCount });
    } else if (body.action === 'UNLIKE') {
      const likesCount = decrementPostLike(id);
      return NextResponse.json({ success: true, likesCount });
    } else if (body.action === 'SHARE') {
      const sharesCount = incrementPostShare(id);
      return NextResponse.json({ success: true, sharesCount });
    }

    return NextResponse.json({ error: 'Invalid action' }, { status: 400 });
  } catch (err: any) {
    return NextResponse.json({ error: err?.message || 'Error updating post' }, { status: 500 });
  }
}

