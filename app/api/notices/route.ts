import { NextResponse } from 'next/server';
import { db } from '@/lib/db';

const INITIAL_NOTICES = [
  {
    title: 'EPS-TOPIK 2026 Manufacturing & Agriculture Registration Schedule Announced',
    titleNe: 'ईपीएस-टोपिक २०२६ उत्पादन तथा कृषि क्षेत्रको परीक्षा फारम खुल्ने तालिका सार्वजनिक',
    body: 'HRD Korea and EPS Center Nepal have announced the official registration timeline for 2026. Applicants must hold a valid passport and meet minimum age requirements (18–39). Biometric verification will take place at EPS Center Gwarko.',
    bodyNe: 'एचआरडी कोरिया र ईपीएस सेन्टर नेपालले २०२६ को आधिकारिक फारम दर्ता तालिका सार्वजनिक गरेका छन्। आवेदकहरूको उमेर १८ देखि ३९ वर्षको हुनुपर्नेछ र राहदानी अनिवार्य छ।',
    category: 'EXAM_SCHEDULE',
    country: 'KOREA',
    sourceType: 'EXAM_BODY',
    sourceLabel: 'HRD Korea & EPS Center Nepal',
    sourceUrl: 'https://eps.hrdkorea.or.kr',
    isPinned: true,
  },
  {
    title: 'JLPT December 2026 Examination Registration Notice for Kathmandu & Pokhara',
    titleNe: 'जापानी भाषा परीक्षा (JLPT) डिसेम्बर २०२६ को आवेदन फारम सम्बन्धी सूचना',
    body: 'The Japanese Language Teachers\' Association Nepal (JALTAN) announces online application dates for JLPT N5 through N1 levels. Testing centers will be located in Kathmandu valley and Pokhara.',
    bodyNe: 'जापान फाउन्डेसन र जाल्टान नेपालले जेएलपिटी एन५ देखि एन१ सम्मको अनलाइन आवेदन मिति खुला गरेको छ।',
    category: 'EXAM_SCHEDULE',
    country: 'JAPAN',
    sourceType: 'EXAM_BODY',
    sourceLabel: 'JALTAN & Japan Foundation',
    sourceUrl: 'https://jaltan.org.np',
    isPinned: true,
  },
  {
    title: 'Japan Specified Skilled Worker (SSW 1 - Kaigo Caregiving) Prometric CBT Seats Opened',
    titleNe: 'जापान एसएसडब्लु १ (केयरगिभर) प्रोमेट्रिक सीबीटी परीक्षाको नयाँ सिट खुल्यो',
    body: 'Prometric Japan has opened testing vouchers for Nursing Care (Kaigo) Evaluation Test and Nursing Care Japanese Language Evaluation Test. Candidates need N4/JFT-Basic pass certificate.',
    bodyNe: 'प्रोमेट्रिक जापानले केयरगिभर सीबीटी परीक्षाका लागि नयाँ सिट बुकिङ खुला गरेको छ। एन४ वा जेएफटी पास गरेका विद्यार्थीले आवेदन दिन सक्नेछन्।',
    category: 'VACANCY',
    country: 'JAPAN',
    sourceType: 'OFFICIAL_GOVERNMENT',
    sourceLabel: 'Immigration Services Agency of Japan (出入国在留管理庁)',
    sourceUrl: 'https://www.moj.go.jp/isa/',
    isPinned: false,
  },
  {
    title: 'South Korea E-7-4 Skilled Worker Visa Quota Expanded for Diligent E-9 Workers',
    titleNe: 'कोरियामा कार्यरत ई-९ कामदारहरूका लागि ई-७-४ भिसा कोटामा उल्लेखनीय वृद्धि',
    body: 'Ministry of Justice (South Korea) announces an expanded annual quota for the K-point E-7-4 visa. Workers with TOPIK Level 3 or KIIP Level 3 and 4+ years of continuous service are eligible to apply.',
    bodyNe: 'दक्षिण कोरियाको न्याय मन्त्रालयले इ-९ बाट दक्ष कामदार भिसा (E-7-4) रूपान्तरणको वार्षिक कोटा बढाएको छ। टोपिक ३ वा किप लेभल ३ उत्तीर्णले परिवारसहित बस्न पाउनेछन्।',
    category: 'VISA_UPDATE',
    country: 'KOREA',
    sourceType: 'OFFICIAL_GOVERNMENT',
    sourceLabel: 'Ministry of Justice (Republic of Korea)',
    sourceUrl: 'https://www.hikorea.go.kr',
    isPinned: false,
  },
  {
    title: 'Important Security & Scam Alert: Avoid Unofficial Sub-Agents for Visa Processing',
    titleNe: 'अनाधिकृत एजेन्ट तथा दलालबाट जोगिन विशेष सुरक्षा सूचना',
    body: 'All students and job aspirants are advised to strictly verify consultancy registration numbers before paying any fees. Japan and Korea work visas require official COE and government labor permits.',
    bodyNe: 'कुनै पनि गैरकानुनी व्यक्ति वा सब-एजेन्टलाई भिसा र रोजगारीको प्रलोभनमा अग्रिम रकम नबुझाउनुहोला। आधिकारिक सरकारी निकायबाट मात्र प्रक्रिया अगाडि बढाउनुहोस्।',
    category: 'PLATFORM',
    country: 'BOTH',
    sourceType: 'JAPANKOREAHUB',
    sourceLabel: 'JapanKoreaHub Security Desk',
    sourceUrl: 'https://japankoreahub.com/notices',
    isPinned: true,
  }
];

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const country = searchParams.get('country');
    const category = searchParams.get('category');
    const limitParam = searchParams.get('limit');
    const limit = limitParam ? parseInt(limitParam, 10) : undefined;

    // Check if database needs initial seeding
    const totalCount = await db.notice.count();
    if (totalCount === 0) {
      for (const item of INITIAL_NOTICES) {
        await db.notice.create({
          data: {
            title: item.title,
            titleNe: item.titleNe,
            body: item.body,
            bodyNe: item.bodyNe,
            category: item.category,
            country: item.country,
            sourceType: item.sourceType,
            sourceLabel: item.sourceLabel,
            sourceUrl: item.sourceUrl,
            isPinned: item.isPinned,
            publishedAt: new Date(),
          }
        });
      }
    }

    const where: any = {};
    if (country && country !== 'BOTH' && country !== 'ALL') {
      where.country = { in: [country.toUpperCase(), 'BOTH'] };
    }
    if (category && category !== 'ALL') {
      where.category = category;
    }

    const notices = await db.notice.findMany({
      where,
      orderBy: [
        { isPinned: 'desc' },
        { publishedAt: 'desc' },
      ],
      take: limit,
    });

    return NextResponse.json({ success: true, count: notices.length, notices });
  } catch (error: any) {
    console.error('Error fetching notices:', error);
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

    const notice = await db.notice.create({
      data: {
        title: title.trim(),
        titleNe: titleNe?.trim() || null,
        body: noticeBody.trim(),
        bodyNe: bodyNe?.trim() || null,
        category,
        country: country.toUpperCase(),
        sourceType,
        sourceLabel: sourceLabel?.trim() || null,
        sourceUrl: sourceUrl?.trim() || null,
        isPinned: Boolean(isPinned),
        expiresAt: expiresAt ? new Date(expiresAt) : null,
        lastVerifiedAt: lastVerifiedAt ? new Date(lastVerifiedAt) : new Date(),
        publishedAt: new Date(),
      },
    });

    return NextResponse.json({ success: true, notice }, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message || 'Failed to create notice' }, { status: 500 });
  }
}
