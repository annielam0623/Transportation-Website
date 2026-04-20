// src/app/api/fleet/route.ts
import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url)
    const type = searchParams.get('type')
    const minCapacity = searchParams.get('minCapacity')
    const id = searchParams.get('id')

    if (id) {
      const vehicle = await prisma.vehicle.findUnique({ where: { id } })
      if (!vehicle) return NextResponse.json({ success: false, error: 'Not found' }, { status: 404 })
      return NextResponse.json({ success: true, data: vehicle })
    }

    const vehicles = await prisma.vehicle.findMany({
      where: {
        isActive: true,
        ...(type && type !== 'ALL' ? { type: type as any } : {}),
        ...(minCapacity ? { capacity: { gte: parseInt(minCapacity) } } : {}),
      },
      orderBy: { capacity: 'asc' },
    })

    return NextResponse.json({ success: true, data: vehicles })
  } catch (error) {
    return NextResponse.json({ success: false, error: 'Failed to fetch fleet' }, { status: 500 })
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const vehicle = await prisma.vehicle.create({ data: body })
    return NextResponse.json({ success: true, data: vehicle }, { status: 201 })
  } catch (error) {
    return NextResponse.json({ success: false, error: 'Failed to create vehicle' }, { status: 500 })
  }
}
