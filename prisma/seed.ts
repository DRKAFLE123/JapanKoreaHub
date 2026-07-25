import { PrismaClient } from '@prisma/client';
import { getKanjiByLevel } from '../lib/kanji-dataset';
import { NIHONGO_VOCAB_DATA } from '../lib/nihongo-vocab';
import { KOREAN_VOCAB_DATA } from '../lib/korean-vocab';
import { randomUUID } from 'crypto';

const prisma = new PrismaClient();

const HIRAGANA_LIST = [
  { char: 'あ', romaji: 'a', nepaliHint: 'आ' }, { char: 'い', romaji: 'i', nepaliHint: 'इ' },
  { char: 'う', romaji: 'u', nepaliHint: 'उ' }, { char: 'え', romaji: 'e', nepaliHint: 'ए' },
  { char: 'お', romaji: 'o', nepaliHint: 'ओ' }, { char: 'か', romaji: 'ka', nepaliHint: 'का' },
  { char: 'き', romaji: 'ki', nepaliHint: 'कि' }, { char: 'く', romaji: 'ku', nepaliHint: 'कु' },
  { char: 'け', romaji: 'ke', nepaliHint: 'के' }, { char: 'こ', romaji: 'ko', nepaliHint: 'को' },
  { char: 'さ', romaji: 'sa', nepaliHint: 'सा' }, { char: 'し', romaji: 'shi', nepaliHint: 'शि' },
  { char: 'す', romaji: 'su', nepaliHint: 'सु' }, { char: 'せ', romaji: 'se', nepaliHint: 'セ' },
  { char: 'そ', romaji: 'so', nepaliHint: 'ソ' }, { char: 'た', romaji: 'ta', nepaliHint: 'タ' },
  { char: 'ち', romaji: 'chi', nepaliHint: 'チ' }, { char: 'つ', romaji: 'tsu', nepaliHint: 'ツ' },
  { char: 'て', romaji: 'te', nepaliHint: 'テ' }, { char: 'と', romaji: 'to', nepaliHint: 'ト' },
  { char: 'な', romaji: 'na', nepaliHint: 'ナ' }, { char: 'に', romaji: 'ni', nepaliHint: 'ニ' },
  { char: 'ぬ', romaji: 'nu', nepaliHint: 'ヌ' }, { char: 'ね', romaji: 'ne', nepaliHint: 'ネ' },
  { char: 'の', romaji: 'no', nepaliHint: 'ノ' }, { char: 'は', romaji: 'ha', nepaliHint: 'ハ' },
  { char: 'ひ', romaji: 'hi', nepaliHint: 'ヒ' }, { char: 'ふ', romaji: 'fu', nepaliHint: 'フ' },
  { char: 'へ', romaji: 'he', nepaliHint: 'ヘ' }, { char: 'ほ', romaji: 'ho', nepaliHint: 'ホ' },
  { char: 'ま', romaji: 'ma', nepaliHint: 'マ' }, { char: 'み', romaji: 'mi', nepaliHint: 'ミ' },
  { char: 'む', romaji: 'mu', nepaliHint: 'ム' }, { char: 'め', romaji: 'me', nepaliHint: 'メ' },
  { char: 'も', romaji: 'mo', nepaliHint: 'モ' }, { char: 'や', romaji: 'ya', nepaliHint: 'ヤ' },
  { char: 'ゆ', romaji: 'yu', nepaliHint: 'ユ' }, { char: 'よ', romaji: 'yo', nepaliHint: 'ヨ' },
  { char: 'ら', romaji: 'ra', nepaliHint: 'ラ' }, { char: 'り', romaji: 'ri', nepaliHint: 'リ' },
  { char: 'る', romaji: 'ru', nepaliHint: 'ル' }, { char: 'れ', romaji: 're', nepaliHint: 'レ' },
  { char: 'ろ', romaji: 'ro', nepaliHint: 'ロ' }, { char: 'わ', romaji: 'wa', nepaliHint: 'ワ' },
  { char: 'を', romaji: 'wo', nepaliHint: 'ヲ' }, { char: 'ん', romaji: 'n', nepaliHint: 'ン' },
];

const KATAKANA_LIST = [
  { char: 'ア', romaji: 'a', nepaliHint: 'आ' }, { char: 'イ', romaji: 'i', nepaliHint: 'इ' },
  { char: 'ウ', romaji: 'u', nepaliHint: 'उ' }, { char: 'エ', romaji: 'e', nepaliHint: 'エ' },
  { char: 'オ', romaji: 'o', nepaliHint: 'オ' }, { char: 'カ', romaji: 'ka', nepaliHint: 'カ' },
  { char: 'キ', romaji: 'ki', nepaliHint: 'キ' }, { char: 'ク', romaji: 'ku', nepaliHint: 'ク' },
  { char: 'ケ', romaji: 'ke', nepaliHint: 'ケ' }, { char: 'コ', romaji: 'ko', nepaliHint: 'コ' },
  { char: 'サ', romaji: 'sa', nepaliHint: 'サ' }, { char: 'シ', romaji: 'shi', nepaliHint: 'シ' },
  { char: 'ス', romaji: 'su', nepaliHint: 'ス' }, { char: 'セ', romaji: 'se', nepaliHint: 'セ' },
  { char: 'ソ', romaji: 'so', nepaliHint: 'ソ' }, { char: 'タ', romaji: 'ta', nepaliHint: 'タ' },
  { char: 'チ', romaji: 'chi', nepaliHint: 'チ' }, { char: 'ツ', romaji: 'tsu', nepaliHint: 'ツ' },
  { char: 'テ', romaji: 'te', nepaliHint: 'テ' }, { char: 'ト', romaji: 'to', nepaliHint: 'ト' },
  { char: 'ナ', romaji: 'na', nepaliHint: 'ナ' }, { char: 'ニ', romaji: 'ni', nepaliHint: 'ニ' },
  { char: 'ヌ', romaji: 'nu', nepaliHint: 'ヌ' }, { char: 'ネ', romaji: 'ne', nepaliHint: 'ネ' },
  { char: 'ノ', romaji: 'no', nepaliHint: 'ノ' }, { char: 'ハ', romaji: 'ha', nepaliHint: 'ハ' },
  { char: 'ヒ', romaji: 'hi', nepaliHint: 'ヒ' }, { char: 'フ', romaji: 'fu', nepaliHint: 'フ' },
  { char: 'ヘ', romaji: 'he', nepaliHint: 'ヘ' }, { char: 'ホ', romaji: 'ho', nepaliHint: 'ホ' },
  { char: 'マ', romaji: 'ma', nepaliHint: 'マ' }, { char: 'ミ', romaji: 'mi', nepaliHint: 'ミ' },
  { char: 'ム', romaji: 'mu', nepaliHint: 'ム' }, { char: 'メ', romaji: 'me', nepaliHint: 'メ' },
  { char: 'モ', romaji: 'mo', nepaliHint: 'モ' }, { char: 'ヤ', romaji: 'ya', nepaliHint: 'ヤ' },
  { char: 'ユ', romaji: 'yu', nepaliHint: 'ユ' }, { char: 'ヨ', romaji: 'yo', nepaliHint: 'ヨ' },
  { char: 'ラ', romaji: 'ra', nepaliHint: 'ラ' }, { char: 'リ', romaji: 'ri', nepaliHint: 'リ' },
  { char: 'ル', romaji: 'ru', nepaliHint: 'ル' }, { char: 'レ', romaji: 're', nepaliHint: 'レ' },
  { char: 'ロ', romaji: 'ro', nepaliHint: 'ロ' }, { char: 'ワ', romaji: 'wa', nepaliHint: 'ワ' },
  { char: 'ヲ', romaji: 'wo', nepaliHint: 'ヲ' }, { char: 'ン', romaji: 'n', nepaliHint: 'ン' },
];

const HANGUL_CONSONANTS = [
  { char: 'ㄱ', romaji: 'g/k', nepaliHint: 'ग/क' }, { char: 'ㄴ', romaji: 'n', nepaliHint: 'न' },
  { char: 'ㄷ', romaji: 'd/t', nepaliHint: 'द/त' }, { char: 'ㄹ', romaji: 'r/l', nepaliHint: 'र/ल' },
  { char: 'ㅁ', romaji: 'm', nepaliHint: 'म' }, { char: 'ㅂ', romaji: 'b/p', nepaliHint: 'ब/प' },
  { char: 'ㅅ', romaji: 's', nepaliHint: 'स' }, { char: 'ㅇ', romaji: 'ng/silent', nepaliHint: 'ङ' },
  { char: 'ㅈ', romaji: 'j', nepaliHint: 'ज' }, { char: 'ㅊ', romaji: 'ch', nepaliHint: 'छ' },
  { char: 'ㅋ', romaji: 'k', nepaliHint: 'ख' }, { char: 'ㅌ', romaji: 't', nepaliHint: 'थ' },
  { char: 'ㅍ', romaji: 'p', nepaliHint: 'फ' }, { char: 'ㅎ', romaji: 'h', nepaliHint: 'ह' },
];

const HANGUL_VOWELS = [
  { char: 'ㅏ', romaji: 'a', nepaliHint: 'आ' }, { char: 'ㅑ', romaji: 'ya', nepaliHint: 'या' },
  { char: 'ㅓ', romaji: 'eo', nepaliHint: 'अ' }, { char: 'ㅕ', romaji: 'yeo', nepaliHint: 'य' },
  { char: 'ㅗ', romaji: 'o', nepaliHint: 'ओ' }, { char: 'ㅛ', romaji: 'yo', nepaliHint: 'यो' },
  { char: 'ㅜ', romaji: 'u', nepaliHint: 'उ' }, { char: 'ㅠ', romaji: 'yu', nepaliHint: 'यु' },
  { char: 'ㅡ', romaji: 'eu', nepaliHint: 'उ (समथर)' }, { char: 'ㅣ', romaji: 'i', nepaliHint: 'इ' },
];

async function main() {
  console.log('⚡ High-Speed Ultra Batch Database Seeding starting...');

  // Clean old records
  await prisma.grammarSentence.deleteMany();
  await prisma.vocabulary.deleteMany();
  await prisma.kanji.deleteMany();
  await prisma.alphabet.deleteMany();

  // 1. Alphabets Batch
  console.log('📦 1/5 Seeding Alphabets...');
  const alphabetData = [
    ...HIRAGANA_LIST.map(i => ({ id: randomUUID(), script: 'HIRAGANA', character: i.char, romaji: i.romaji, nepaliHint: i.nepaliHint, category: 'Basic' })),
    ...KATAKANA_LIST.map(i => ({ id: randomUUID(), script: 'KATAKANA', character: i.char, romaji: i.romaji, nepaliHint: i.nepaliHint, category: 'Basic' })),
    ...HANGUL_CONSONANTS.map(i => ({ id: randomUUID(), script: 'HANGUL_CONSONANT', character: i.char, romaji: i.romaji, nepaliHint: i.nepaliHint, category: 'Consonant' })),
    ...HANGUL_VOWELS.map(i => ({ id: randomUUID(), script: 'HANGUL_VOWEL', character: i.char, romaji: i.romaji, nepaliHint: i.nepaliHint, category: 'Vowel' })),
  ];
  await prisma.alphabet.createMany({ data: alphabetData });
  console.log(`  ✅ ${alphabetData.length} Alphabets inserted!`);

  // 2. Kanji Batch
  console.log('📦 2/5 Seeding Kanji...');
  const levels: ('N5' | 'N4' | 'N3' | 'N2')[] = ['N5', 'N4', 'N3', 'N2'];
  const allKanji = levels.flatMap(lvl => getKanjiByLevel(lvl));
  const kanjiBatch = allKanji.map(k => ({
    id: randomUUID(),
    character: k.character,
    strokeCount: k.strokeCount,
    readingsOnyomi: k.readingsOnyomi.join(','),
    readingsKunyomi: k.readingsKunyomi.join(','),
    meanings: k.meanings.join(','),
    meaningsNepali: k.meaningsNepali ? k.meaningsNepali.join(',') : null,
    radicals: k.radicals as any,
    strokeSvgData: (k.strokeSvgData as any) || null,
    level: k.level,
    lessonOrder: k.lessonOrder,
  }));
  await prisma.kanji.createMany({ data: kanjiBatch });
  console.log(`  ✅ ${kanjiBatch.length} Kanji inserted!`);

  // 3. Japanese Vocabulary & Grammar Batch
  console.log('📦 3/5 Seeding Japanese Vocabulary & Grammar...');
  const jpVocabBatch: any[] = [];
  const jpGrammarBatch: any[] = [];

  for (const v of NIHONGO_VOCAB_DATA) {
    const vocabId = randomUUID();
    jpVocabBatch.push({
      id: vocabId,
      word: v.word,
      reading: v.reading,
      meanings: v.meaning,
      meaningsNepali: v.meaningNepali,
      language: 'JAPANESE',
      level: v.lesson <= 25 ? 'N5' : 'N4',
      lesson: v.lesson,
      partOfSpeech: v.partOfSpeech || 'Noun',
    });

    if (v.grammarSentences && v.grammarSentences.length > 0) {
      for (const gs of v.grammarSentences) {
        jpGrammarBatch.push({
          id: randomUUID(),
          vocabularyId: vocabId,
          sentenceJP: gs.japanese,
          readingJP: gs.reading,
          english: gs.english,
          nepali: gs.nepali,
        });
      }
    }
  }

  await prisma.vocabulary.createMany({ data: jpVocabBatch });
  if (jpGrammarBatch.length > 0) {
    await prisma.grammarSentence.createMany({ data: jpGrammarBatch });
  }
  console.log(`  ✅ ${jpVocabBatch.length} JP Vocab & ${jpGrammarBatch.length} Grammar sentences inserted!`);

  // 4. Korean Vocabulary & Grammar Batch
  console.log('📦 4/5 Seeding Korean Vocabulary & Grammar...');
  const krVocabBatch: any[] = [];
  const krGrammarBatch: any[] = [];

  for (const kv of KOREAN_VOCAB_DATA) {
    const vocabId = randomUUID();
    krVocabBatch.push({
      id: vocabId,
      word: kv.word,
      reading: kv.romanization,
      meanings: kv.meaning,
      meaningsNepali: kv.meaningNepali,
      language: 'KOREAN',
      level: kv.level,
      lesson: kv.lesson,
      partOfSpeech: kv.partOfSpeech || 'Noun',
    });

    if (kv.grammarSentences && kv.grammarSentences.length > 0) {
      for (const kgs of kv.grammarSentences) {
        krGrammarBatch.push({
          id: randomUUID(),
          vocabularyId: vocabId,
          sentenceKR: kgs.korean,
          romanization: kgs.romanization,
          english: kgs.english,
          nepali: kgs.nepali,
        });
      }
    }
  }

  await prisma.vocabulary.createMany({ data: krVocabBatch });
  if (krGrammarBatch.length > 0) {
    await prisma.grammarSentence.createMany({ data: krGrammarBatch });
  }
  console.log(`  ✅ ${krVocabBatch.length} KR Vocab & ${krGrammarBatch.length} Grammar sentences inserted!`);

  // 5. Courses
  console.log('📦 5/5 Seeding Courses...');
  await prisma.course.upsert({
    where: { code: 'JLPT_N5' },
    update: {},
    create: {
      code: 'JLPT_N5',
      title: 'Minna no Nihongo JLPT N5 Master Class',
      language: 'JAPANESE',
      description: 'Comprehensive Japanese course covering Hiragana, Katakana, N5 Kanji, and Lessons 1 to 25.',
      level: 'N5',
    },
  });

  await prisma.course.upsert({
    where: { code: 'EPS_TOPIK_BASIC' },
    update: {},
    create: {
      code: 'EPS_TOPIK_BASIC',
      title: 'EPS-TOPIK & TOPIK Standard Preparation',
      language: 'KOREAN',
      description: 'Standard Korean Employment Permit System (EPS-TOPIK) and TOPIK 2, 3, 4 preparation curriculum.',
      level: 'EPS-1',
    },
  });

  console.log('🎉 ALL DATA SEEDED SUCCESSFULLY TO REMOTE MYSQL DB IN RECORD TIME!');
}

main()
  .catch((e) => {
    console.error('❌ Seeding error:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
