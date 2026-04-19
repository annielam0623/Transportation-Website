import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

// GET /api/vehicles — list all active vehicles
export async function GET() {
  try {
    const vehicles = await prisma.vehicle.findMany({
      where: { isActive: true },
      orderBy: { capacity: 'asc' },
    })
    return NextResponse.json(vehicles)
  } catch (err) {
    console.error('[GET /api/vehicles]', err)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
