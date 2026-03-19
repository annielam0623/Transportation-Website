import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

function recommendTravelMode(tripDays: number, travelers: number) {
  if (tripDays >= 4 || travelers >= 6) {
    return { mode: 'CHAUFFEUR', reason: `With ${tripDays} days and ${travelers} travelers, a professional chauffeur eliminates fatigue.` }
  }
  if (tripDays >= 2 || travelers >= 3) {
    return { mode: 'HYBRID', reason: `A hybrid approach works best — self-drive scenic segments, chauffeur for long stretches.` }
  }
  return { mode: 'SELF_DRIVE', reason: `Short trip with small group — self-drive gives maximum flexibility.` }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { originCity, destination, departureDate, tripDays, travelerCount, travelMode, email, firstName, lastName } = body

    if (!originCity || !destination || !email) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
    }

    const days = parseInt(tripDays) || 1
    const rec = travelMode === 'AI_RECOMMEND' ? recommendTravelMode(days, Number(travelerCount)) : null

    const quote = await prisma.flyDriveQuote.create({
      data: {
        originCity,
        destination,
        departureDate: new Date(departureDate),
        tripDays: days,
        travelerCount: Number(travelerCount) || 1,
        travelMode: travelMode as any,
        email,
        firstName,
        lastName,
        aiRecommendation: rec?.mode as any ?? null,
        aiReason: rec?.reason ?? null,
        status: 'COMPLETED',
      } as any,
    })

    return NextResponse.json({ success: true, quoteRef: quote.quoteRef, aiRecommendation: rec?.mode, aiReason: rec?.reason }, { status: 201 })
  } catch (err) {
    console.error('[POST /api/quotes]', err)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

export async function GET() {
  try {
    const quotes = await prisma.flyDriveQuote.findMany({ orderBy: { createdAt: 'desc' } })
    return NextResponse.json(quotes)
  } catch (err) {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}