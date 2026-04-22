// src/app/charter/quote/page.tsx
import { Suspense } from 'react'
import { redirect } from 'next/navigation'
import Navbar from '@/components/layout/Navbar'
import FleetGrid from '@/components/transportation/fleet/FleetGrid'
import QuoteSummaryBar from '@/components/transportation/quote/QuoteSummaryBar'
import RecommendedVehicles from '@/components/transportation/quote/RecommendedVehicles'
import { getMockQuote } from '@/lib/transportation/charter/mockQuote'
import { prisma } from '@/lib/prisma'

type SearchParams = {
  serviceType?: string
  from?: string
  to?: string
  date?: string
  time?: string
  pax?: string
  luggage?: string
}

async function getFleetVehicles() {
  try {
    return await prisma.vehicle.findMany({
      where: { isActive: true },
      orderBy: { capacity: 'asc' },
    })
  } catch {
    return []
  }
}

export default async function CharterQuotePage({
  searchParams,
}: {
  searchParams: SearchParams
}) {
  const {
    serviceType = '',
    from = '',
    to = '',
    date = '',
    time = '',
    pax = '1',
    luggage = '0',
  } = searchParams

  // 参数缺失就跳回首页
  if (!serviceType || !from || !to || !date) {
    redirect('/#booking')
  }

  const passengerCount = parseInt(pax, 10) || 1
  const luggageCount = parseInt(luggage, 10) || 0

  const { options } = getMockQuote(passengerCount, luggageCount)
  const fleetVehicles = await getFleetVehicles()

  return (
    <main className="min-h-screen bg-[#020c18] text-white">
      <Navbar />

      {/* Summary bar */}
      <div className="pt-16">
        <QuoteSummaryBar
          serviceType={serviceType}
          from={from}
          to={to}
          date={date}
          time={time}
          pax={passengerCount}
          luggage={luggageCount}
        />
      </div>

      {/* Recommended vehicles */}
      <section className="max-w-7xl mx-auto px-6 md:px-20 py-14">
        <div className="mb-10">
          <p className="text-[0.62rem] tracking-[0.18em] uppercase text-brand-silver mb-2">
            Your Quote
          </p>
          <h1 className="font-serif text-4xl font-bold">
            Available <span className="text-brand-silver">Vehicles</span>
          </h1>
        </div>

        <Suspense fallback={<div className="text-white/35 text-sm">Loading...</div>}>
          <RecommendedVehicles options={options} />
        </Suspense>
      </section>

      {/* Divider */}
      <div className="border-t border-white/5 mx-6 md:mx-20" />

      {/* Full fleet */}
      <section className="max-w-7xl mx-auto px-6 md:px-20 py-14">
        <div className="mb-10">
          <p className="text-[0.62rem] tracking-[0.18em] uppercase text-brand-silver mb-2">
            Our Fleet
          </p>
          <h2 className="font-serif text-3xl font-bold">
            Browse All <span className="text-brand-silver">Vehicles</span>
          </h2>
          <p className="text-white/45 text-sm mt-2 max-w-lg">
            Every vehicle is commercially licensed, DOT-compliant, and maintained to the highest standard.
          </p>
        </div>

        {fleetVehicles.length > 0 ? (
          <FleetGrid vehicles={fleetVehicles as any} />
        ) : (
          <div className="grid md:grid-cols-3 gap-6">
            {['Sprinter Van', 'Executive Sprinter', 'Mini Bus', 'Mid-Size Coach', 'Full-Size Coach'].map(name => (
              <div key={name} className="bg-[#0A1628] border border-white/6 p-6 text-white/20 text-sm">
                {name}
              </div>
            ))}
          </div>
        )}
      </section>
    </main>
  )
}