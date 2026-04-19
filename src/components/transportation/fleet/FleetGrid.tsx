'use client'
// src/components/fleet/FleetGrid.tsx
import { useState } from 'react'
import FleetCard from './FleetCard'
import type { Vehicle } from '@/types'

const FILTERS = [
  { label: 'All Vehicles', value: 'ALL' },
  { label: 'Sprinter', value: 'SPRINTER' },
  { label: 'MiniBus', value: 'MINIBUS' },
  { label: 'Coach', value: 'COACH' },
  { label: 'Executive', value: 'EXECUTIVE' },
]

export default function FleetGrid({ vehicles }: { vehicles: Vehicle[] }) {
  const [activeFilter, setActiveFilter] = useState('ALL')
  const [sortBy, setSortBy] = useState<'capacity' | 'price'>('capacity')

  const filtered = vehicles
    .filter(v => activeFilter === 'ALL' || v.type === activeFilter)
    .sort((a, b) => {
      if (sortBy === 'price') return (a.pricePerDay ?? 0) - (b.pricePerDay ?? 0)
      return a.capacity - b.capacity
    })

  return (
    <div>
      {/* Filter bar */}
      <div className="flex flex-wrap items-center justify-between gap-4 mb-10">
        {/* Type filters */}
        <div className="flex flex-wrap gap-2">
          {FILTERS.map(f => (
            <button
              key={f.value}
              onClick={() => setActiveFilter(f.value)}
              className={`px-4 py-2 text-xs tracking-widest uppercase font-medium transition-colors border ${
                activeFilter === f.value
                  ? 'bg-brand-blue border-brand-blue text-white'
                  : 'border-white/15 text-white/50 hover:border-brand-silver hover:text-white'
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>

        {/* Sort */}
        <div className="flex items-center gap-3">
          <span className="text-white/35 text-xs uppercase tracking-widest">Sort:</span>
          <select
            value={sortBy}
            onChange={e => setSortBy(e.target.value as 'capacity' | 'price')}
            className="bg-[#0A1628] border border-white/15 text-white/70 text-xs px-3 py-2 outline-none"
          >
            <option value="capacity">Capacity</option>
            <option value="price">Price</option>
          </select>
        </div>
      </div>

      {/* Results count */}
      <p className="text-white/35 text-xs tracking-widest uppercase mb-6">
        {filtered.length} vehicle{filtered.length !== 1 ? 's' : ''} available
      </p>

      {/* Grid */}
      {filtered.length === 0 ? (
        <div className="text-center py-20 text-white/35">
          No vehicles found for this filter.
        </div>
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map(vehicle => (
            <FleetCard key={vehicle.id} vehicle={vehicle} />
          ))}
        </div>
      )}
    </div>
  )
}
