// src/components/transportation/quote/QuoteSummaryBar.tsx
'use client'

import { MapPin, Calendar, Clock, Users, Briefcase } from 'lucide-react'

type Props = {
  serviceType: string
  from: string
  to: string
  date: string
  time: string
  pax: number
  luggage: number
}

const SERVICE_LABELS: Record<string, string> = {
  airport_pickup: 'Airport Pick-up',
  airport_dropoff: 'Airport Drop-off',
  in_town_transfer: 'In-Town Transfer',
  lax_airport_transfer: 'LAX Transfer',
  grand_canyon_west_rim: 'Grand Canyon West Rim',
  grand_canyon_national_park: 'Grand Canyon National Park',
  bryce_canyon_zion: 'Bryce Canyon & Zion',
  antelope_canyon: 'Antelope Canyon',
  valley_of_fire: 'Valley of Fire',
  custom_out_of_town_transfer: 'Custom Transfer',
  luxury_suv_service: 'Luxury SUV',
  limousine_service: 'Limousine',
}

function formatDate(dateStr: string) {
  if (!dateStr) return '—'
  const d = new Date(dateStr + 'T00:00:00')
  return d.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric', year: 'numeric' })
}

function formatTime(timeStr: string) {
  if (!timeStr) return '—'
  const [h, m] = timeStr.split(':').map(Number)
  const ampm = h >= 12 ? 'PM' : 'AM'
  const hour = h % 12 || 12
  return `${hour}:${String(m).padStart(2, '0')} ${ampm}`
}

export default function QuoteSummaryBar({ serviceType, from, to, date, time, pax, luggage }: Props) {
  return (
    <div className="bg-[#04080F] border-b border-white/8">
      <div className="max-w-7xl mx-auto px-6 md:px-20 py-5">

        <p className="text-[0.62rem] tracking-[0.18em] uppercase text-brand-silver mb-3 font-medium">
          {SERVICE_LABELS[serviceType] ?? serviceType}
        </p>

        <div className="flex flex-wrap gap-x-8 gap-y-3">

          <div className="flex items-center gap-2">
            <MapPin size={13} className="text-brand-silver shrink-0" />
            <span className="text-white/90 text-sm">{from}</span>
            <span className="text-white/25 text-xs mx-1">→</span>
            <span className="text-white/90 text-sm">{to}</span>
          </div>

          <div className="flex items-center gap-2">
            <Calendar size={13} className="text-brand-silver shrink-0" />
            <span className="text-white/70 text-sm">{formatDate(date)}</span>
          </div>

          <div className="flex items-center gap-2">
            <Clock size={13} className="text-brand-silver shrink-0" />
            <span className="text-white/70 text-sm">{formatTime(time)}</span>
          </div>

          <div className="flex items-center gap-2">
            <Users size={13} className="text-brand-silver shrink-0" />
            <span className="text-white/70 text-sm">{pax} Passengers</span>
          </div>

          <div className="flex items-center gap-2">
            <Briefcase size={13} className="text-brand-silver shrink-0" />
            <span className="text-white/70 text-sm">{luggage} Bags</span>
          </div>

        </div>

        <div className="mt-4">
          <a href="/#booking" className="text-[0.62rem] tracking-[0.14em] uppercase text-white/35 hover:text-brand-silver transition-colors">
            ← Edit Search
          </a>
        </div>

      </div>
    </div>
  )
}