// src/app/fleet/[slug]/page.tsx
import { notFound } from 'next/navigation'
import Navbar from '@/components/layout/Navbar'
import { Users, Briefcase, CheckCircle } from 'lucide-react'

// Mock vehicle data — 之后替换成 Prisma 查询
const MOCK_FLEET: Record<string, {
  name: string
  type: string
  capacity: number
  luggageCapacity: number
  priceTotal?: number
  priceMode?: string
  description: string
  features: string[]
  amenities: string[]
  imageUrl: string | null
  gradient: string
}> = {
  'sprinter-van': {
    name: 'Sprinter Van',
    type: 'SPRINTER',
    capacity: 10,
    luggageCapacity: 8,
    description: 'Perfect for small groups and airport transfers. The Sprinter Van offers a comfortable, private ride with ample luggage space and modern amenities.',
    features: ['WiFi', 'A/C', 'Leather Seats', 'USB Outlets'],
    amenities: ['Air Conditioning', 'Leather Seating', 'WiFi', 'USB Charging Outlets', 'Tinted Windows', 'Professional Driver'],
    imageUrl: null,
    gradient: 'linear-gradient(160deg, #0A1628 0%, #0A3070 50%, #1A60B0 100%)',
  },
  'executive-sprinter': {
    name: 'Executive Sprinter',
    type: 'EXECUTIVE_SPRINTER',
    capacity: 16,
    luggageCapacity: 12,
    description: 'Elevated comfort for corporate groups and VIP transfers. The Executive Sprinter features premium leather interiors and mood lighting.',
    features: ['WiFi', 'A/C', 'Premium Leather', 'USB Outlets', 'Mood Lighting'],
    amenities: ['Air Conditioning', 'Premium Leather Seating', 'WiFi', 'USB Charging Outlets', 'Mood Lighting', 'Tinted Windows', 'Professional Driver'],
    imageUrl: null,
    gradient: 'linear-gradient(160deg, #0D0D0D 0%, #1A1A2E 50%, #16213E 100%)',
  },
  'mini-bus': {
    name: 'Mini Bus',
    type: 'MINIBUS',
    capacity: 22,
    luggageCapacity: 18,
    description: 'Ideal for medium-sized groups heading to national parks, events, or city tours. Spacious cabin with dedicated luggage bay.',
    features: ['WiFi', 'A/C', 'Reclining Seats', 'Luggage Bay'],
    amenities: ['Air Conditioning', 'Reclining Seats', 'WiFi', 'Overhead Storage', 'Luggage Bay', 'PA System', 'Professional Driver'],
    imageUrl: null,
    gradient: 'linear-gradient(160deg, #071020 0%, #0A2A5A 50%, #0A428C 100%)',
  },
  'mid-size-coach': {
    name: 'Mid-Size Coach',
    type: 'COACH',
    capacity: 40,
    luggageCapacity: 35,
    description: 'The go-to choice for large group travel. Full amenities including restroom, PA system, and generous luggage storage.',
    features: ['WiFi', 'A/C', 'Reclining Seats', 'Restroom', 'Luggage Bay', 'PA System'],
    amenities: ['Air Conditioning', 'Reclining Seats', 'WiFi', 'Restroom', 'Luggage Bay', 'PA System', 'TV Monitor', 'Professional Driver'],
    imageUrl: null,
    gradient: 'linear-gradient(160deg, #04080F 0%, #071A38 50%, #0A3070 100%)',
  },
  'full-size-coach': {
    name: 'Full-Size Coach',
    type: 'COACH',
    capacity: 56,
    luggageCapacity: 50,
    description: 'Maximum capacity for conventions, large tours, and corporate events. Full-size comfort with every amenity for long-distance travel.',
    features: ['WiFi', 'A/C', 'Reclining Seats', 'Restroom', 'Luggage Bay', 'PA System', 'TV'],
    amenities: ['Air Conditioning', 'Reclining Seats', 'WiFi', 'Restroom', 'Luggage Bay', 'PA System', 'TV Monitor', 'DVD Player', 'Professional Driver'],
    imageUrl: null,
    gradient: 'linear-gradient(160deg, #04080F 0%, #071A38 50%, #0A3070 100%)',
  },
}

export default function VehicleDetailPage({
  params,
}: {
  params: { slug: string }
}) {
  const vehicle = MOCK_FLEET[params.slug]
  if (!vehicle) notFound()

  return (
    <main className="min-h-screen bg-[#020c18] text-white">
      <Navbar />

      {/* Hero image */}
      <div
        className="h-[380px] relative pt-16"
        style={{ background: vehicle.gradient }}
      >
        {vehicle.imageUrl && (
          <img
            src={vehicle.imageUrl}
            alt={vehicle.name}
            className="absolute inset-0 w-full h-full object-cover"
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-[#020c18] via-[#020c18]/40 to-transparent" />

        {/* Vehicle name overlay */}
        <div className="absolute bottom-0 left-0 right-0 px-6 md:px-20 pb-10">
          <p className="text-[0.62rem] tracking-[0.18em] uppercase text-brand-silver mb-2">
            Our Fleet
          </p>
          <h1 className="font-serif text-5xl font-bold">{vehicle.name}</h1>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-6 md:px-20 py-14 grid md:grid-cols-3 gap-12">

        {/* Left: details */}
        <div className="md:col-span-2 space-y-10">

          {/* Specs */}
          <div className="flex gap-8">
            <div className="flex items-center gap-2 text-white/60 text-sm">
              <Users size={15} className="text-brand-silver" />
              Up to {vehicle.capacity} passengers
            </div>
            <div className="flex items-center gap-2 text-white/60 text-sm">
              <Briefcase size={15} className="text-brand-silver" />
              {vehicle.luggageCapacity} bags
            </div>
          </div>

          {/* Description */}
          <div>
            <p className="text-[0.62rem] tracking-[0.18em] uppercase text-white/35 mb-3">About This Vehicle</p>
            <p className="text-white/70 text-base leading-relaxed">{vehicle.description}</p>
          </div>

          {/* Amenities */}
          <div>
            <p className="text-[0.62rem] tracking-[0.18em] uppercase text-white/35 mb-4">Amenities</p>
            <ul className="grid grid-cols-2 gap-2">
              {vehicle.amenities.map(a => (
                <li key={a} className="flex items-center gap-2 text-white/60 text-sm">
                  <CheckCircle size={13} className="text-brand-silver shrink-0" />
                  {a}
                </li>
              ))}
            </ul>
          </div>

        </div>

        {/* Right: booking card */}
        <div className="md:col-span-1">
          <div className="bg-[#0A1628] border border-white/8 p-6 sticky top-24">
            <p className="text-[0.62rem] tracking-[0.18em] uppercase text-white/35 mb-4">
              Reserve This Vehicle
            </p>

            {vehicle.priceTotal && (
              <div className="mb-6">
                <span className="text-[0.62rem] text-white/35 uppercase tracking-widest block mb-1">
                  {vehicle.priceMode}
                </span>
                <span className="text-3xl font-semibold">
                  ${vehicle.priceTotal.toLocaleString()}
                </span>
              </div>
            )}

            
              <a href="/#booking"
              className="block w-full text-center bg-brand-silver text-[#04080F] text-[0.68rem] tracking-[0.14em] uppercase font-semibold px-5 py-3 hover:bg-white transition-colors mb-3"
            >
              Book Now
            </a>
             <p className="text-white/25 text-xs mt-4 text-center leading-relaxed">
              All vehicles include a licensed professional driver at no extra cost.
            </p>
          </div>
        </div>

      </div>
    </main>
  )
}