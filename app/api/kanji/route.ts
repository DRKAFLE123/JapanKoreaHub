import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/db';

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const level = searchParams.get('level') || 'N5';
    const lesson = searchParams.get('lesson');

    const whereClause: any = { level };
    if (lesson) whereClause.lessonOrder = parseInt(lesson, 10);

    const kanjiList = await prisma.kanji.findMany({
      where: whereClause,
      orderBy: { lessonOrder: 'asc' },
    });

    return NextResponse.json(
      { success: true, count: kanjiList.length, data: kanjiList },
      {
        headers: {
          'Cache-Control': 'public, max-age=3600, s-maxage=86400, stale-while-revalidate=604800',
        },
      }
    );
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
