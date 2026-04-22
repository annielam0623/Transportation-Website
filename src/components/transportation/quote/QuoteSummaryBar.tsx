'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
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
  const router = useRouter()
  const [expanded, setExpanded] = useState(false)

  const [editFrom, setEditFrom] = useState(from)
  const [editTo, setEditTo] = useState(to)
  const [editDate, setEditDate] = useState(date)
  const [editTime, setEditTime] = useState(time)
  const [editPax, setEditPax] = useState(pax)
  const [editLuggage, setEditLuggage] = useState(luggage)

  function handleUpdate() {
    const params = new URLSearchParams({
      serviceType,
      from: editFrom,
      to: editTo,
      date: editDate,
      time: editTime,
      pax: String(editPax),
      luggage: String(editLuggage),
    })
    router.push(`/charter/quote?${params.toString()}`)
  }

  return (
    <div className="bg-[#04080F] border-b border-white/8">

      {/* Summary row */}
      <div className="px-[15%] py-14">
        <p className="text-xs tracking-[0.18em] uppercase text-brand-silver mb-4 font-medium">
          {SERVICE_LABELS[serviceType] ?? serviceType}
        </p>

        <div className="flex flex-wrap gap-x-10 gap-y-4 mb-5">

          <div className="flex items-center gap-3">
            <MapPin size={16} className="text-brand-silver shrink-0" />
            <span className="text-white text-base">{from}</span>
            <span className="text-white/30 text-sm mx-1">→</span>
            <span className="text-white text-base">{to}</span>
          </div>

          <div className="flex items-center gap-3">
            <Calendar size={16} className="text-brand-silver shrink-0" />
            <span className="text-white/80 text-base">{formatDate(date)}</span>
          </div>

          <div className="flex items-center gap-3">
            <Clock size={16} className="text-brand-silver shrink-0" />
            <span className="text-white/80 text-base">{formatTime(time)}</span>
          </div>

          <div className="flex items-center gap-3">
            <Users size={16} className="text-brand-silver shrink-0" />
            <span className="text-white/80 text-base">{pax} Passengers</span>
          </div>

          <div className="flex items-center gap-3">
            <Briefcase size={16} className="text-brand-silver shrink-0" />
            <span className="text-white/80 text-base">{luggage} Bags</span>
          </div>

        </div>

        <button
          onClick={() => setExpanded(!expanded)}
          className="flex items-center gap-2 text-sm tracking-[0.1em] uppercase text-brand-silver border border-brand-silver/30 px-4 py-2 hover:bg-brand-silver/8 hover:border-brand-silver/50 transition-colors"
        >
          {expanded ? '✕ Close' : '✎ Edit Search'}
        </button>
      </div>

      {/* Expanded edit form */}
      {expanded && (
        <div className="bg-[#061628] border-t border-brand-silver/15 px-[15%] py-14">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
            <div>
              <label className="block text-xs tracking-[0.14em] uppercase text-white/40 mb-2">Pick-up Location</label>
              <input
                type="text"
                value={editFrom}
                onChange={e => setEditFrom(e.target.value)}
                className="w-full bg-transparent border-b border-white/20 text-white text-base py-2 outline-none focus:border-brand-silver/50 transition-colors"
              />
            </div>
            <div>
              <label className="block text-xs tracking-[0.14em] uppercase text-white/40 mb-2">Drop-off Location</label>
              <input
                type="text"
                value={editTo}
                onChange={e => setEditTo(e.target.value)}
                className="w-full bg-transparent border-b border-white/20 text-white text-base py-2 outline-none focus:border-brand-silver/50 transition-colors"
              />
            </div>
            <div>
              <label className="block text-xs tracking-[0.14em] uppercase text-white/40 mb-2">Date</label>
              <input
                type="date"
                value={editDate}
                onChange={e => setEditDate(e.target.value)}
                className="w-full bg-transparent border-b border-white/20 text-white text-base py-2 outline-none focus:border-brand-silver/50 transition-colors"
              />
            </div>
            <div>
              <label className="block text-xs tracking-[0.14em] uppercase text-white/40 mb-2">Time</label>
              <input
                type="time"
                value={editTime}
                onChange={e => setEditTime(e.target.value)}
                className="w-full bg-transparent border-b border-white/20 text-white text-base py-2 outline-none focus:border-brand-silver/50 transition-colors"
              />
            </div>
          </div>

          <div className="flex gap-10 mb-8">
            <div>
              <label className="block text-xs tracking-[0.14em] uppercase text-white/40 mb-2">Passengers</label>
              <div className="flex items-center gap-4 border-b border-white/20 py-2">
                <button onClick={() => setEditPax(Math.max(1, editPax - 1))} className="text-white/40 hover:text-white transition-colors text-xl leading-none">−</button>
                <span className="text-white text-base w-8 text-center">{editPax}</span>
                <button onClick={() => setEditPax(editPax + 1)} className="text-white/40 hover:text-white transition-colors text-xl leading-none">+</button>
              </div>
            </div>
            <div>
              <label className="block text-xs tracking-[0.14em] uppercase text-white/40 mb-2">Luggage</label>
              <div className="flex items-center gap-4 border-b border-white/20 py-2">
                <button onClick={() => setEditLuggage(Math.max(0, editLuggage - 1))} className="text-white/40 hover:text-white transition-colors text-xl leading-none">−</button>
                <span className="text-white text-base w-8 text-center">{editLuggage}</span>
                <button onClick={() => setEditLuggage(editLuggage + 1)} className="text-white/40 hover:text-white transition-colors text-xl leading-none">+</button>
              </div>
            </div>
          </div>

          <div className="flex gap-3">
            <button
              onClick={() => setExpanded(false)}
              className="border border-white/15 text-white/50 text-sm tracking-[0.1em] uppercase px-6 py-2.5 hover:border-white/30 hover:text-white/70 transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={handleUpdate}
              className="bg-brand-silver text-[#04080F] text-sm tracking-[0.1em] uppercase font-semibold px-8 py-2.5 hover:bg-white transition-colors"
            >
              Update Search
            </button>
          </div>
        </div>
      )}
    </div>
  )
}