import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/db';

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const language = searchParams.get('language') || 'JAPANESE';
    const level = searchParams.get('level');
    const lesson = searchParams.get('lesson');

    const whereClause: any = { language };
    if (level) whereClause.level = level;
    if (lesson) whereClause.lesson = parseInt(lesson, 10);

    const vocab = await prisma.vocabulary.findMany({
      where: whereClause,
      include: {
        grammarSentences: true,
      },
      orderBy: { lesson: 'asc' },
    });

    return NextResponse.json({ success: true, count: vocab.length, data: vocab });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
