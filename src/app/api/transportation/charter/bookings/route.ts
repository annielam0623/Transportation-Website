import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

// POST /api/bookings — create a charter booking
export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const {
      pickupLocation, dropoffLocation, pickupDate, pickupTime,
      passengers, luggage, type, customerName, customerEmail,
      customerPhone, notes
    } = body

    if (!pickupLocation || !dropoffLocation || !pickupDate || !customerName || !customerEmail) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
    }

    const booking = await prisma.booking.create({
      data: {
        type,
        customerName,
        customerEmail,
        customerPhone,
        pickupLocation,
        dropoffLocation,
        pickupDate: new Date(pickupDate),
        pickupTime,
        passengers: Number(passengers),
        luggage: Number(luggage) || 0,
        notes,
        status: 'PENDING',
      },
    })

    return NextResponse.json({ success: true, bookingRef: booking.bookingRef, id: booking.id }, { status: 201 })
  } catch (err) {
    console.error('[POST /api/bookings]', err)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

// GET /api/bookings — list all bookings (admin)
export async function GET() {
  try {
    const bookings = await prisma.booking.findMany({
      orderBy: { createdAt: 'desc' },
      include: { vehicle: true },
    })
    return NextResponse.json(bookings)
  } catch (err) {
    console.error('[GET /api/bookings]', err)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
