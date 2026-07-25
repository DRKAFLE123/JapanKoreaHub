import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/db';

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const script = searchParams.get('script'); // HIRAGANA | KATAKANA | HANGUL_CONSONANT | HANGUL_VOWEL

    const whereClause: any = {};
    if (script) whereClause.script = script;

    const alphabets = await prisma.alphabet.findMany({
      where: whereClause,
      orderBy: { id: 'asc' },
    });

    return NextResponse.json({ success: true, count: alphabets.length, data: alphabets });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
