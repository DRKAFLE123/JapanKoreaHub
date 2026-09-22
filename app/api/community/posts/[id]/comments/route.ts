import { NextResponse } from 'next/server';
import { getCommentsByPostId, addComment } from '@/lib/community-data';
import { getAuthUserFromRequest } from '@/lib/auth-security';

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const comments = getCommentsByPostId(id);
    return NextResponse.json({ success: true, comments });
  } catch (err: any) {
    return NextResponse.json({ error: err?.message || 'Failed to fetch comments' }, { status: 500 });
  }
}

export async function POST(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const authUser = getAuthUserFromRequest(request);
    if (!authUser) {
      return NextResponse.json(
        { error: 'Sign in is required to comment on listings.' },
        { status: 401 }
      );
    }

    const body = await request.json();
    const authorId = authUser.email || authUser.id;
    const authorName = authUser.name || 'Community Member';

    if (!body.content || !body.content.trim()) {
      return NextResponse.json({ error: 'Comment content cannot be empty.' }, { status: 400 });
    }

    const comment = addComment(id, authorId, authorName, body.content);
    return NextResponse.json({ success: true, comment }, { status: 201 });
  } catch (err: any) {
    return NextResponse.json({ error: err?.message || 'Failed to post comment' }, { status: 500 });
  }
}
