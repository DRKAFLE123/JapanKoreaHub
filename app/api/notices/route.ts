import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const country = searchParams.get('country');
    const category = searchParams.get('category');
    const limitParam = searchParams.get('limit');
    const limit = limitParam ? parseInt(limitParam, 10) : undefined;

    const where: any = {};
    if (country && country !== 'BOTH') {
      where.country = { in: [country, 'BOTH'] };
    }
    if (category) {
      where.category = category;
    }

    const notices = await prisma.notice.findMany({
      where,
      orderBy: [
        { isPinned: 'desc' },
        { publishedAt: 'desc' },
      ],
      take: limit,
    });

    return NextResponse.json({ notices });
  } catch (error: any) {
    return NextResponse.json({ error: error.message || 'Failed to fetch notices' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { title, titleNe, body: noticeBody, bodyNe, category, country, sourceType, sourceLabel, sourceUrl, isPinned, expiresAt, lastVerifiedAt } = body;

    if (!title || !noticeBody || !category || !country || !sourceType) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    const notice = await prisma.notice.create({
      data: {
        title,
        titleNe,
        body: noticeBody,
        bodyNe,
        category,
        country,
        sourceType,
        sourceLabel,
        sourceUrl,
        isPinned: isPinned || false,
        expiresAt: expiresAt ? new Date(expiresAt) : null,
        lastVerifiedAt: lastVerifiedAt ? new Date(lastVerifiedAt) : new Date(),
      },
    });

    return NextResponse.json({ notice }, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message || 'Failed to create notice' }, { status: 500 });
  }
}
