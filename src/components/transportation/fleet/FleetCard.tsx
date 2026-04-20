'use client'
// src/components/fleet/FleetCard.tsx
import { useState } from 'react'
import { Users, Briefcase, Clock, ChevronDown, ChevronUp } from 'lucide-react'
import type { Vehicle } from '@/types'

// Gradient backgrounds per vehicle type (until real photos are added)
const TYPE_GRADIENTS: Record<string, string> = {
  SPRINTER:  'linear-gradient(160deg, #0A1628 0%, #0A3070 50%, #1A60B0 100%)',
  MINIBUS:   'linear-gradient(160deg, #071020 0%, #0A2A5A 50%, #0A428C 100%)',
  COACH:     'linear-gradient(160deg, #04080F 0%, #071A38 50%, #0A3070 100%)',
  EXECUTIVE: 'linear-gradient(160deg, #0D0D0D 0%, #1A1A2E 50%, #16213E 100%)',
  SEDAN:     'linear-gradient(160deg, #0A1628 0%, #0A428C 50%, #B8C4D4 100%)',
  SUV:       'linear-gradient(160deg, #071020 0%, #0A3070 50%, #0A428C 100%)',
}

const TYPE_LABELS: Record<string, string> = {
  SPRINTER:  'Sprinter Van',
  MINIBUS:   'Mini Bus',
  COACH:     'Coach Bus',
  EXECUTIVE: 'Executive',
  SEDAN:     'Sedan',
  SUV:       'SUV',
}

export default function FleetCard({ vehicle }: { vehicle: Vehicle }) {
  const [expanded, setExpanded] = useState(false)

  const priceRange = vehicle.pricePerDay
    ? `$${Math.round(vehicle.pricePerDay * 0.8).toLocaleString()}–$${vehicle.pricePerDay.toLocaleString()}`
    : null

  return (
    <div className="bg-[#0A1628] border border-white/6 overflow-hidden hover:border-brand-silver/20 transition-all group">

      {/* Image / gradient area */}
      <div
        className="h-48 relative flex items-end p-4"
        style={{ background: vehicle.imageUrl ? undefined : TYPE_GRADIENTS[vehicle.type] ?? TYPE_GRADIENTS.COACH }}
      >
        {vehicle.imageUrl && (
          <img src={vehicle.imageUrl} alt={vehicle.name} className="absolute inset-0 w-full h-full object-cover" />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-[#04080F] via-transparent to-transparent" />

        {/* Price badge top right */}
        {priceRange && (
          <div className="absolute top-3 right-3 bg-[#04080F]/80 text-white text-xs font-medium px-3 py-1 border border-white/10">
            {priceRange}
          </div>
        )}

        {/* Type badge bottom left */}
        <span className="relative z-10 border border-brand-silver/30 text-brand-silver text-[0.62rem] tracking-[0.1em] uppercase px-2 py-1">
          {TYPE_LABELS[vehicle.type] ?? vehicle.type}
        </span>
      </div>

      {/* Body */}
      <div className="p-5">
        <h3 className="font-serif text-lg font-bold mb-3">{vehicle.name}</h3>

        {/* Key specs */}
        <div className="flex gap-5 mb-4">
          <div className="flex items-center gap-1.5 text-white/55 text-xs">
            <Users size={13} className="text-brand-silver" />
            {vehicle.capacity} Passengers
          </div>
          <div className="flex items-center gap-1.5 text-white/55 text-xs">
            <Clock size={13} className="text-brand-silver" />
            Min. {vehicle.minHours}h
          </div>
          {vehicle.pricePerHour && (
            <div className="flex items-center gap-1.5 text-white/55 text-xs">
              <Briefcase size={13} className="text-brand-silver" />
              ${vehicle.pricePerHour}/hr
            </div>
          )}
        </div>

        {/* Perfect for */}
        {vehicle.perfectFor.length > 0 && (
          <div className="mb-4">
            <p className="text-[0.62rem] text-white/35 uppercase tracking-widest mb-2">Perfect for:</p>
            <ul className="space-y-1">
              {vehicle.perfectFor.slice(0, expanded ? undefined : 3).map(item => (
                <li key={item} className="flex items-center gap-2 text-xs text-white/55">
                  <span className="text-brand-silver text-[0.6rem]">◎</span>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Features (expandable) */}
        {vehicle.features.length > 0 && (
          <div className="mb-5">
            <button
              onClick={() => setExpanded(!expanded)}
              className="flex items-center gap-1 text-[0.65rem] text-brand-silver tracking-widest uppercase hover:text-white transition-colors"
            >
              {expanded ? <ChevronUp size={12} /> : <ChevronDown size={12} />}
              {expanded ? 'Hide' : 'View'} Features
            </button>
            {expanded && (
              <div className="mt-3 flex flex-wrap gap-1.5">
                {vehicle.features.map(f => (
                  <span key={f} className="border border-white/10 text-white/45 text-[0.6rem] px-2 py-0.5 tracking-wide">
                    {f}
                  </span>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Pricing row */}
        <div className="flex items-center justify-between pt-4 border-t border-white/7">
          <div>
            {vehicle.pricePerDay && (
              <div>
                <span className="text-[0.62rem] text-white/35 uppercase tracking-widest block">From</span>
                <span className="text-xl font-semibold">
                  ${vehicle.pricePerDay.toLocaleString()}
                  <span className="text-xs font-normal text-white/35">/day</span>
                </span>
              </div>
            )}
          </div>
          <a
            href={`/booking?vehicleId=${vehicle.id}`}
            className="bg-brand-blue text-white text-[0.68rem] tracking-widest uppercase font-semibold px-5 py-2.5 hover:bg-brand-blue-mid transition-colors"
          >
            Reserve
          </a>
        </div>
      </div>
    </div>
  )
}
