import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

// Simple AI logic: recommend travel mode based on trip days & travelers
function recommendTravelMode(tripDays: number, travelers: number): { mode: string; reasoning: string } {
  if (tripDays >= 4 || travelers >= 6) {
    return {
      mode: 'CHAUFFEUR',
      reasoning: `With ${tripDays} days and ${travelers} travelers, a professional chauffeur eliminates fatigue and logistical complexity.`,
    }
  }
  if (tripDays >= 2 || travelers >= 3) {
    return {
      mode: 'HYBRID',
      reasoning: `A hybrid approach works best — self-drive the scenic segments, use a chauffeur for airport transfers and long highway stretches.`,
    }
  }
  return {
    mode: 'SELF_DRIVE',
    reasoning: `Short trip with a small group — self-drive gives you maximum flexibility at the lowest cost.`,
  }
}

// POST /api/quotes — create a fly & drive quote
export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const {
      origin, destination, departureDate, tripDays,
      travelers, travelMode, customerName, customerEmail, customerPhone
    } = body

    if (!origin || !destination || !departureDate || !customerName || !customerEmail) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
    }

    const days = parseInt(tripDays) || 1
    let aiRecommended = null
    let aiReasoning = null

    if (travelMode === 'AI_RECOMMEND') {
      const rec = recommendTravelMode(days, Number(travelers))
      aiRecommended = rec.mode
      aiReasoning = rec.reasoning
    }

    const quote = await prisma.flyDriveQuote.create({
      data: {
        origin,
        destination,
        departureDate: new Date(departureDate),
        tripDays: days,
        travelers: Number(travelers),
        travelMode,
        aiRecommended,
        aiReasoning,
        customerName,
        customerEmail,
        customerPhone,
        status: 'PENDING',
      },
    })

    return NextResponse.json({
      success: true,
      quoteRef: quote.quoteRef,
      id: quote.id,
      aiRecommended,
      aiReasoning,
    }, { status: 201 })
  } catch (err) {
    console.error('[POST /api/quotes]', err)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

// GET /api/quotes — list all quotes (admin)
export async function GET() {
  try {
    const quotes = await prisma.flyDriveQuote.findMany({
      orderBy: { createdAt: 'desc' },
    })
    return NextResponse.json(quotes)
  } catch (err) {
    console.error('[GET /api/quotes]', err)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
