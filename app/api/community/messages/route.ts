import { NextResponse } from 'next/server';
import { getMessagesForUser, getUnreadMessagesCountForUser, markMessagesAsReadForUser, sendDirectMessage } from '@/lib/community-data';
import { getAuthUserFromRequest } from '@/lib/auth-security';

export async function GET(request: Request) {
  try {
    const authUser = getAuthUserFromRequest(request);
    if (!authUser) {
      return NextResponse.json(
        { error: 'Sign in is required to access your private messages.' },
        { status: 401 }
      );
    }

    const userId = authUser.email || authUser.id;
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
    if (!authUser) {
      return NextResponse.json(
        { error: 'Sign in is required to direct message the poster.' },
        { status: 401 }
      );
    }

    const body = await request.json();
    const senderId = authUser.email || authUser.id;
    const senderName = authUser.name || 'Community Member';

    const { postId, postTitle, receiverId, receiverName, content } = body;

    if (!postId || !receiverId || !content || !content.trim()) {
      return NextResponse.json({ error: 'Missing required message parameters' }, { status: 400 });
    }

    // Prevent messaging oneself
    if (receiverId === senderId) {
      return NextResponse.json({ error: 'You cannot message your own account.' }, { status: 400 });
    }

    // Limit maximum message length to prevent spam / payload injection
    const cleanContent = content.trim().substring(0, 1500);

    const message = sendDirectMessage({
      postId,
      postTitle: (postTitle || 'Listing Inquiry').substring(0, 150),
      senderId,
      senderName,
      receiverId,
      receiverName: (receiverName || 'Poster').substring(0, 100),
      content: cleanContent,
    });

    return NextResponse.json({ success: true, message }, { status: 201 });
  } catch (err: any) {
    return NextResponse.json({ error: err?.message || 'Failed to send message' }, { status: 500 });
  }
}

export async function PATCH(request: Request) {
  try {
    const authUser = getAuthUserFromRequest(request);
    if (!authUser) {
      return NextResponse.json({ error: 'Sign in required' }, { status: 401 });
    }

    const body = await request.json();
    const userId = authUser.email || authUser.id;
    const { postId, otherUserId } = body;

    markMessagesAsReadForUser(userId, postId, otherUserId);
    const unreadCount = getUnreadMessagesCountForUser(userId);
    return NextResponse.json({ success: true, unreadCount });
  } catch (err: any) {
    return NextResponse.json({ error: err?.message || 'Failed to update messages' }, { status: 500 });
  }
}
