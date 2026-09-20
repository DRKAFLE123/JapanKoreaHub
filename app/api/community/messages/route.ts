import { NextResponse } from 'next/server';
import { getMessagesForUser, getUnreadMessagesCountForUser, markMessagesAsReadForUser, sendDirectMessage } from '@/lib/community-data';
import { getAuthUserFromRequest } from '@/lib/auth-security';

export async function GET(request: Request) {
  try {
    const authUser = getAuthUserFromRequest(request);
    const { searchParams } = new URL(request.url);
    const userId = authUser?.id || searchParams.get('userId');

    if (!userId) {
      return NextResponse.json({ error: 'Sign in is required to access direct messages.' }, { status: 401 });
    }

    const messages = getMessagesForUser(userId);
    const unreadCount = getUnreadMessagesCountForUser(userId);
    return NextResponse.json({ success: true, messages, unreadCount });
  } catch (err: any) {
    return NextResponse.json({ error: err?.message || 'Failed to retrieve messages' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const authUser = getAuthUserFromRequest(request);
    const body = await request.json();

    const senderId = authUser?.id || body.senderId;
    const senderName = authUser?.name || body.senderName || 'Anonymous Member';

    // Must be signed in to send direct message
    if (!senderId) {
      return NextResponse.json({ error: 'Sign in is required to direct message the poster.' }, { status: 401 });
    }

    const { postId, postTitle, receiverId, receiverName, content } = body;

    if (!postId || !receiverId || !content || !content.trim()) {
      return NextResponse.json({ error: 'Missing required message parameters' }, { status: 400 });
    }

    const message = sendDirectMessage({
      postId,
      postTitle: postTitle || 'Listing Inquiry',
      senderId,
      senderName,
      receiverId,
      receiverName: receiverName || 'Poster',
      content: content.trim(),
    });

    return NextResponse.json({ success: true, message }, { status: 201 });
  } catch (err: any) {
    return NextResponse.json({ error: err?.message || 'Failed to send message' }, { status: 500 });
  }
}

export async function PATCH(request: Request) {
  try {
    const authUser = getAuthUserFromRequest(request);
    const body = await request.json();
    const userId = authUser?.id || body.userId;
    const { postId } = body;

    if (!userId) {
      return NextResponse.json({ error: 'User ID is required' }, { status: 400 });
    }

    markMessagesAsReadForUser(userId, postId);
    const unreadCount = getUnreadMessagesCountForUser(userId);
    return NextResponse.json({ success: true, unreadCount });
  } catch (err: any) {
    return NextResponse.json({ error: err?.message || 'Failed to update messages' }, { status: 500 });
  }
}
