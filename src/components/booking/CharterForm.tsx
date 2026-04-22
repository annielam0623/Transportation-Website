'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'

// ── Service types ──────────────────────────────────────────
const SERVICE_TYPES = [
  { value: 'airport_pickup',              label: 'Airport Pick-up' },
  { value: 'airport_dropoff',             label: 'Airport Drop-off' },
  { value: 'in_town_transfer',            label: 'In-Town Transfer' },
  { value: 'lax_airport_transfer',        label: 'LAX Airport Transfer' },
  { value: 'grand_canyon_west_rim',       label: 'Grand Canyon — West Rim' },
  { value: 'grand_canyon_national_park',  label: 'Grand Canyon — National Park' },
  { value: 'bryce_canyon_zion',           label: 'Bryce Canyon & Zion' },
  { value: 'antelope_canyon',             label: 'Antelope Canyon' },
  { value: 'valley_of_fire',              label: 'Valley of Fire' },
  { value: 'custom_out_of_town_transfer', label: 'Custom Transfer' },
]

// ── Cities ─────────────────────────────────────────────────
const CITIES = [
  { value: 'las_vegas',      label: 'Las Vegas' },
  { value: 'los_angeles',    label: 'Los Angeles' },
  { value: 'san_diego',      label: 'San Diego' },
  { value: 'san_francisco',  label: 'San Francisco' },
  { value: 'phoenix',        label: 'Phoenix' },
]

// ── Airports by city ───────────────────────────────────────
const AIRPORTS: Record<string, { value: string; label: string }[]> = {
  las_vegas: [
    { value: 'LAS', label: 'LAS — Harry Reid International' },
    { value: 'HND', label: 'HND — Henderson Executive' },
  ],
  los_angeles: [
    { value: 'LAX', label: 'LAX — Los Angeles International' },
    { value: 'BUR', label: 'BUR — Hollywood Burbank' },
    { value: 'LGB', label: 'LGB — Long Beach' },
    { value: 'SNA', label: 'SNA — John Wayne / Orange County' },
    { value: 'ONT', label: 'ONT — Ontario International' },
    { value: 'VNY', label: 'VNY — Van Nuys' },
  ],
  san_diego: [
    { value: 'SAN', label: 'SAN — San Diego International' },
    { value: 'CLD', label: 'CLD — McClellan-Palomar' },
  ],
  san_francisco: [
    { value: 'SFO', label: 'SFO — San Francisco International' },
    { value: 'OAK', label: 'OAK — Oakland International' },
    { value: 'SJC', label: 'SJC — San Jose International' },
  ],
  phoenix: [
    { value: 'PHX', label: 'PHX — Phoenix Sky Harbor' },
    { value: 'SDL', label: 'SDL — Scottsdale' },
    { value: 'FLG', label: 'FLG — Flagstaff Pulliam' },
    { value: 'PGA', label: 'PGA — Page Municipal' },
  ],
}

// ── Helpers ────────────────────────────────────────────────
function isAirportService(serviceType: string) {
  return serviceType === 'airport_pickup' || serviceType === 'airport_dropoff' || serviceType === 'lax_airport_transfer'
}

function getTodayStr() {
  return new Date().toISOString().split('T')[0]
}

function getTomorrowStr() {
  const d = new Date()
  d.setDate(d.getDate() + 1)
  return d.toISOString().split('T')[0]
}

// ── Component ──────────────────────────────────────────────
export default function CharterForm() {
  const router = useRouter()

  const [serviceType, setServiceType] = useState('airport_pickup')
  const [city, setCity] = useState('las_vegas')
  const [airport, setAirport] = useState('LAS')
  const [airportType, setAirportType] = useState<'domestic' | 'international'>('domestic')
  const [pickupLocation, setPickupLocation] = useState('')
  const [dropoffLocation, setDropoffLocation] = useState('')
  const [date, setDate] = useState('')
  const [time, setTime] = useState('')
  const [pax, setPax] = useState(1)
  const [lug, setLug] = useState(0)
  const [error, setError] = useState('')

  // When city changes, reset airport to first option
  function handleCityChange(val: string) {
    setCity(val)
    setAirport(AIRPORTS[val]?.[0]?.value ?? '')
  }

  // Determine from/to based on service type
  function getFromTo() {
    const airportLabel = AIRPORTS[city]?.find(a => a.value === airport)?.label ?? airport
    if (serviceType === 'airport_pickup') {
      return { from: airportLabel, to: dropoffLocation }
    }
    if (serviceType === 'airport_dropoff') {
      return { from: pickupLocation, to: airportLabel }
    }
    return { from: pickupLocation, to: dropoffLocation }
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError('')

    const { from, to } = getFromTo()

    if (!from || !to) {
      setError('Please fill in all location fields.')
      return
    }
    if (!date) {
      setError('Please select a date.')
      return
    }

    const params = new URLSearchParams({
      serviceType,
      from,
      to,
      date,
      time,
      pax: String(pax),
      luggage: String(lug),
      airportType,
    })

    router.push(`/charter/quote?${params.toString()}`)
  }

  const showAirport = isAirportService(serviceType)
  const airports = AIRPORTS[city] ?? []

  return (
    <div>
      <p className="text-[#7A8A9A] text-xs mb-5">
        Instant quotation for charter bus bookings — airport transfers, group tours, corporate events.
      </p>

      <form onSubmit={handleSubmit}>

        {/* Service Type */}
        <div className="mb-4">
          <label className="label-light">Service Type</label>
          <select
            className="input-light"
            value={serviceType}
            onChange={e => setServiceType(e.target.value)}
          >
            {SERVICE_TYPES.map(s => (
              <option key={s.value} value={s.value}>{s.label}</option>
            ))}
          </select>
        </div>

        {/* City + Airport (only for airport services) */}
        {showAirport && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <label className="label-light">City</label>
              <select
                className="input-light"
                value={city}
                onChange={e => handleCityChange(e.target.value)}
              >
                {CITIES.map(c => (
                  <option key={c.value} value={c.value}>{c.label}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="label-light">Airport</label>
              <select
                className="input-light"
                value={airport}
                onChange={e => setAirport(e.target.value)}
              >
                {airports.map(a => (
                  <option key={a.value} value={a.value}>{a.label}</option>
                ))}
              </select>
            </div>
          </div>
        )}

        {/* Airport type (domestic / international) */}
        {serviceType === 'airport_pickup' && (
          <div className="mb-4">
            <label className="label-light">Flight Type</label>
            <select
              className="input-light"
              value={airportType}
              onChange={e => setAirportType(e.target.value as 'domestic' | 'international')}
            >
              <option value="domestic">Domestic</option>
              <option value="international">International</option>
            </select>
          </div>
        )}

        {/* Locations */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          {/* Pick-up */}
          {serviceType !== 'airport_pickup' && (
            <div>
              <label className="label-light">Pick-up Location</label>
              <input
                required
                className="input-light"
                placeholder="Enter pick-up address"
                value={pickupLocation}
                onChange={e => setPickupLocation(e.target.value)}
              />
            </div>
          )}
          {/* Drop-off */}
          {serviceType !== 'airport_dropoff' && (
            <div>
              <label className="label-light">Drop-off Location</label>
              <input
                required
                className="input-light"
                placeholder="Enter drop-off address"
                value={dropoffLocation}
                onChange={e => setDropoffLocation(e.target.value)}
              />
            </div>
          )}
        </div>

        {/* Date / Time / Luggage / Pax */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
          <div>
            <label className="label-light">Date</label>
            <input
              required
              type="date"
              className="input-light"
              min={getTomorrowStr()}
              value={date}
              onChange={e => setDate(e.target.value)}
            />
          </div>
          <div>
            <label className="label-light">Time</label>
            <input
              type="time"
              className="input-light"
              value={time}
              onChange={e => setTime(e.target.value)}
            />
          </div>
          <div>
            <label className="label-light">Luggage</label>
            <div className="flex items-center border border-[#CBD5E0] rounded bg-white overflow-hidden h-[42px]">
              <button type="button" onClick={() => setLug(Math.max(0, lug - 1))}
                className="w-9 text-[#0A428C] text-lg font-light hover:bg-gray-50">−</button>
              <span className="flex-1 text-center text-sm text-[#1A2A3A]">{lug}</span>
              <button type="button" onClick={() => setLug(lug + 1)}
                className="w-9 text-[#0A428C] text-lg font-light hover:bg-gray-50">+</button>
            </div>
          </div>
          <div>
            <label className="label-light">Passengers</label>
            <div className="flex items-center border border-[#CBD5E0] rounded bg-white overflow-hidden h-[42px]">
              <button type="button" onClick={() => setPax(Math.max(1, pax - 1))}
                className="w-9 text-[#0A428C] text-lg font-light hover:bg-gray-50">−</button>
              <span className="flex-1 text-center text-sm text-[#1A2A3A]">{pax}</span>
              <button type="button" onClick={() => setPax(pax + 1)}
                className="w-9 text-[#0A428C] text-lg font-light hover:bg-gray-50">+</button>
            </div>
          </div>
        </div>

        {error && <p className="text-red-500 text-sm mb-3">{error}</p>}

        <div className="flex justify-end mt-2">
          <button
            type="submit"
            className="bg-[#0A428C] text-white px-8 py-3 text-sm tracking-widest uppercase font-semibold hover:bg-[#0D52AA] transition-colors rounded"
          >
            Check Available Vehicles
          </button>
        </div>

      </form>
    </div>
  )
}