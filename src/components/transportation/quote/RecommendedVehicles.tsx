// src/components/transportation/quote/RecommendedVehicles.tsx
'use client'

import { Users, Briefcase, CheckCircle, XCircle } from 'lucide-react'
import type { MockVehicleOption } from '@/lib/transportation/charter/mockQuote'

const TYPE_GRADIENTS: Record<string, string> = {
  SPRINTER:          'linear-gradient(160deg, #0A1628 0%, #0A3070 50%, #1A60B0 100%)',
  EXECUTIVE_SPRINTER:'linear-gradient(160deg, #0D0D0D 0%, #1A1A2E 50%, #16213E 100%)',
  MINIBUS:           'linear-gradient(160deg, #071020 0%, #0A2A5A 50%, #0A428C 100%)',
  COACH:             'linear-gradient(160deg, #04080F 0%, #071A38 50%, #0A3070 100%)',
}

export default function RecommendedVehicles({ options }: { options: MockVehicleOption[] }) {
  if (!options.length) {
    return (
      <div className="text-center py-16 text-white/35 text-sm">
        No vehicles available for your group size. Please contact us for assistance.
      </div>
    )
  }

  return (
    <div>
      <p className="text-[0.62rem] tracking-[0.18em] uppercase text-white/35 mb-6">
        {options.length} vehicle{options.length !== 1 ? 's' : ''} matched
      </p>

      <div className="flex flex-col gap-4">
        {options.map((v) => (
          <div
            key={v.slug}
            className={`relative border overflow-hidden ${
              v.tag === 'recommended'
                ? 'border-brand-silver/40 bg-[#061628]'
                : 'border-white/8 bg-[#0A1628]'
            }`}
          >
            {/* Recommended bar */}
            {v.tag === 'recommended' && (
              <div className="bg-brand-silver/8 border-b border-brand-silver/15 px-6 py-2">
                <span className="text-[0.6rem] tracking-[0.14em] uppercase text-brand-silver font-semibold">
                  Recommended
                </span>
              </div>
            )}

            {/* Horizontal layout */}
            <div className="flex">
              {/* Image */}
              <div
                className="w-56 shrink-0 min-h-[180px]"
                style={{ background: TYPE_GRADIENTS[v.type] ?? TYPE_GRADIENTS.COACH }}
              >
                {v.imageUrl && (
                  <img
                    src={v.imageUrl}
                    alt={v.name}
                    className="w-full h-full object-cover"
                  />
                )}
              </div>

              {/* Body */}
              <div className="flex-1 px-8 py-6 flex flex-col">

                {/* Name + availability */}
                <div className="flex items-start justify-between mb-3">
                  <h3 className="font-serif text-xl font-bold">{v.name}</h3>
                  {v.available ? (
                    <div className="flex items-center gap-1.5 text-green-400 text-xs">
                      <CheckCircle size={13} />
                      <span>Available</span>
                    </div>
                  ) : (
                    <div className="flex items-center gap-1.5 text-white/30 text-xs">
                      <XCircle size={13} />
                      <span>Unavailable</span>
                    </div>
                  )}
                </div>

                {/* Specs */}
                <div className="flex gap-6 mb-4">
                  <div className="flex items-center gap-1.5 text-white/50 text-xs">
                    <Users size={12} className="text-brand-silver" />
                    Up to {v.capacity} passengers
                  </div>
                  <div className="flex items-center gap-1.5 text-white/50 text-xs">
                    <Briefcase size={12} className="text-brand-silver" />
                    {v.luggageCapacity} bags
                  </div>
                </div>

                {/* Features */}
                <div className="flex flex-wrap gap-1.5 mb-5">
                  {v.features.map(f => (
                    <span
                      key={f}
                      className="border border-white/10 text-white/38 text-[0.6rem] px-2 py-0.5 tracking-wide"
                    >
                      {f}
                    </span>
                  ))}
                </div>

                {/* Price + CTA */}
                <div className="flex items-center justify-between pt-4 border-t border-white/8 mt-auto">
                  <div>
                    <span className="text-[0.62rem] text-white/30 uppercase tracking-widest block">
                      {v.priceMode}
                    </span>
                    <span className="text-2xl font-semibold">
                      ${v.priceTotal.toLocaleString()}
                    </span>
                  </div>

                  {v.available ? (
                    
                      <a
                      href={`/fleet/${v.slug}`}
                      className={`text-[0.68rem] tracking-[0.14em] uppercase font-semibold px-6 py-2.5 transition-colors ${
                        v.tag === 'recommended'
                          ? 'bg-brand-silver text-[#04080F] hover:bg-white'
                          : 'border border-white/20 text-white/60 hover:border-brand-silver/40 hover:text-white/90'
                      }`}
                    >
                      Book This Vehicle
                    </a>
                  ) : (
                    <span className="text-[0.68rem] tracking-[0.14em] uppercase text-white/20 border border-white/10 px-6 py-2.5">
                      Not Available
                    </span>
                  )}
                </div>

              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}