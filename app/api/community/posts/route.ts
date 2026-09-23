import { NextResponse } from 'next/server';
import { getCommunityPosts, createCommunityPost } from '@/lib/community-data';
import { getAuthUserFromRequest } from '@/lib/auth-security';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const type = searchParams.get('type') || undefined;
    const country = searchParams.get('country') || undefined;
    const city = searchParams.get('city') || undefined;
    const area = searchParams.get('area') || undefined;
    const minPriceStr = searchParams.get('minPrice');
    const maxPriceStr = searchParams.get('maxPrice');
    const maxDepositStr = searchParams.get('maxDeposit');
    const zeroDepositOnly = searchParams.get('zeroDepositOnly') === 'true';
    const duration = searchParams.get('duration') || undefined;
    const serviceChargeOnly = searchParams.get('serviceChargeOnly') === 'true';
    const search = searchParams.get('search') || undefined;
    const languageLevel = searchParams.get('languageLevel') || undefined;

    const minPrice = minPriceStr ? parseFloat(minPriceStr) : undefined;
    const maxPrice = maxPriceStr ? parseFloat(maxPriceStr) : undefined;
    const maxDeposit = maxDepositStr !== null && maxDepositStr !== undefined ? parseFloat(maxDepositStr) : undefined;

    const posts = getCommunityPosts({
      type,
      country,
      city,
      area,
      minPrice,
      maxPrice,
      maxDeposit,
      zeroDepositOnly,
      duration,
      serviceChargeOnly,
      search,
      languageLevel,
    });

    return NextResponse.json({ success: true, count: posts.length, posts });
  } catch (err: any) {
    return NextResponse.json({ error: err?.message || 'Failed to fetch community posts' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const authUser = getAuthUserFromRequest(request);
    if (!authUser) {
      return NextResponse.json(
        { error: 'Sign up / Login is compulsory before creating a job or room listing.' },
        { status: 401 }
      );
    }

    const body = await request.json();

    // Enforce authenticated author identity
    const authorId = authUser.email || authUser.id;
    const authorName = authUser.name || body.authorName || 'Verified Community Member';

    const {
      type,
      title,
      description,
      country,
      city,
      area,
      price,
      priceUnit,
      currency,
      serviceCharge,
      serviceChargeNote,
      duration,
      authorPhone,
      isPhoneVerified,
      contactPreference,
      tags,
      languageLevel,
      deposit,
      maintenanceFee,
    } = body;

    // Validation
    if (!type || !title || !description || !country || !city || price === undefined) {
      return NextResponse.json(
        { error: 'Please provide all required fields: category, title, description, country, city, and amount.' },
        { status: 400 }
      );
    }

    // Phone verification requirement check
    if (!isPhoneVerified) {
      return NextResponse.json(
        { error: 'Only phone verified users can publish room and job listings. Please verify your phone number first.' },
        { status: 403 }
      );
    }

    const newPost = createCommunityPost({
      type,
      title: title.trim(),
      description: description.trim(),
      country: country.toLowerCase() as 'japan' | 'korea',
      city: city.trim(),
      area: area?.trim() || city.trim(),
      price: Number(price),
      priceUnit: priceUnit || (type === 'ROOM' ? 'PER_MONTH' : 'PER_HOUR'),
      currency: currency || (country.toLowerCase() === 'korea' ? 'KRW' : 'JPY'),
      serviceCharge: Number(serviceCharge || 0),
      serviceChargeNote: serviceChargeNote?.trim() || (Number(serviceCharge || 0) === 0 ? 'Free Assistance' : undefined),
      duration: duration?.trim() || 'Flexible',
      authorId,
      authorName,
      authorPhone,
      isPhoneVerified: Boolean(isPhoneVerified),
      contactPreference: contactPreference || 'IN_APP',
      tags: Array.isArray(tags) ? tags : [],
      languageLevel: languageLevel || undefined,
      deposit: deposit ? Number(deposit) : undefined,
      maintenanceFee: maintenanceFee ? Number(maintenanceFee) : undefined,
    });

    return NextResponse.json({ success: true, post: newPost }, { status: 201 });
  } catch (err: any) {
    return NextResponse.json({ error: err?.message || 'Failed to publish listing' }, { status: 500 });
  }
}
