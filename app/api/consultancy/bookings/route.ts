import { NextResponse } from 'next/server';
import { db } from '@/lib/db';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, phone, sessionType, preferredAt, message, country } = body;

    if (!name || !email || !sessionType || !message) {
      return NextResponse.json({ error: 'Please provide all required fields (Name, Email, Session Type, Message)' }, { status: 400 });
    }

    const booking = await db.consultancyBooking.create({
      data: {
        name: name.trim(),
        email: email.trim().toLowerCase(),
        phone: phone?.trim() || null,
        sessionType: sessionType.trim(),
        preferredAt: preferredAt ? new Date(preferredAt) : null,
        message: message.trim(),
        country: country ? country.toUpperCase() : 'BOTH',
        status: 'PENDING',
      },
    });

    return NextResponse.json({
      success: true,
      bookingReference: `LG-BOOK-${booking.id.substring(0, 8).toUpperCase()}`,
      booking,
    }, { status: 201 });
  } catch (error: any) {
    console.error('Error submitting booking:', error);
    return NextResponse.json({ error: error.message || 'Failed to submit booking' }, { status: 500 });
  }
}

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const country = searchParams.get('country');
    const status = searchParams.get('status');

    const where: any = {};
    if (country && country !== 'ALL') where.country = country.toUpperCase();
    if (status && status !== 'ALL') where.status = status.toUpperCase();

    const bookings = await db.consultancyBooking.findMany({
      where,
      orderBy: { createdAt: 'desc' },
      take: 50,
    });
    return NextResponse.json({ success: true, count: bookings.length, bookings });
  } catch (error: any) {
    return NextResponse.json({ error: error.message || 'Failed to fetch bookings' }, { status: 500 });
  }
}
