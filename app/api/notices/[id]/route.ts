import { NextResponse, NextRequest } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const notice = await prisma.notice.findUnique({
      where: { id },
    });

    if (!notice) {
      return NextResponse.json({ error: 'Notice not found' }, { status: 404 });
    }

    return NextResponse.json({ notice });
  } catch (error: any) {
    return NextResponse.json({ error: error.message || 'Failed to fetch notice' }, { status: 500 });
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await request.json();

    const notice = await prisma.notice.update({
      where: { id },
      data: {
        ...body,
        expiresAt: body.expiresAt ? new Date(body.expiresAt) : undefined,
        lastVerifiedAt: body.lastVerifiedAt ? new Date(body.lastVerifiedAt) : undefined,
      },
    });

    return NextResponse.json({ notice });
  } catch (error: any) {
    return NextResponse.json({ error: error.message || 'Failed to update notice' }, { status: 500 });
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    await prisma.notice.delete({
      where: { id },
    });

    return NextResponse.json({ success: true });
  } catch (error: any) {
    return NextResponse.json({ error: error.message || 'Failed to delete notice' }, { status: 500 });
  }
}
