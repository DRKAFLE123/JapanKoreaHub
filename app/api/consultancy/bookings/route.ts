import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, phone, sessionType, preferredAt, message, country } = body;

    if (!name || !email || !sessionType || !message) {
      return NextResponse.json({ error: 'Please provide all required fields (Name, Email, Session Type, Message)' }, { status: 400 });
    }

    const booking = await prisma.consultancyBooking.create({
      data: {
        name,
        email,
        phone,
        sessionType,
        preferredAt: preferredAt ? new Date(preferredAt) : null,
        message,
        country: country || 'BOTH',
        status: 'PENDING',
      },
    });

    return NextResponse.json({ success: true, booking }, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message || 'Failed to submit booking' }, { status: 500 });
  }
}

export async function GET(request: Request) {
  try {
    const bookings = await prisma.consultancyBooking.findMany({
      orderBy: { createdAt: 'desc' },
    });
    return NextResponse.json({ bookings });
  } catch (error: any) {
    return NextResponse.json({ error: error.message || 'Failed to fetch bookings' }, { status: 500 });
  }
}
