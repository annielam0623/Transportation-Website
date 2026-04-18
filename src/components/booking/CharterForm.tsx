'use client'
import { useState } from 'react'
import { getCharterQuote, type CharterQuoteResponse } from "@/lib/transportation/charter/client"
import CharterQuoteResult from "./charterQuoteResult"

export default function CharterForm() {
  const [pax, setPax] = useState(1)
  const [lug, setLug] = useState(0)

  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const [response, setResponse] = useState<CharterQuoteResponse | null>(null)

const [form, setForm] = useState({
  pickupLocation: '',
  dropoffLocation: '',
  pickupDate: '',
  pickupTime: '',
  airportTransferType: 'domestic',
  customerName: '',
  customerEmail: '',
  customerPhone: '',
  notes: '',
})

  const set = (k: string, v: string) => setForm(f => ({ ...f, [k]: v }))

 async function handleSubmit(e: React.FormEvent) {
  e.preventDefault()

  setLoading(true)
  setError("")

  try {
    const data = await getCharterQuote({
      serviceType: "charter_bus",
      pickupLocation: form.pickupLocation,
      dropoffLocation: form.dropoffLocation,
      tripDate: form.pickupDate,
      pickupTime: form.pickupTime,
      passengerCount: pax,
      luggageCount: lug,
      airportType: form.airportTransferType as "domestic" | "international",
    })

    if (!data.success) {
      throw new Error(data.error || "Quote failed")
    }

    setResponse(data)
  } catch (err: any) {
    setError(err.message || "Something went wrong")
  } finally {
    setLoading(false)
  }
}

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <p className="text-[#7A8A9A] text-xs mb-5">
          Instant quotation for charter bus bookings — airport transfers, group tours, corporate events.
        </p>
        <div>
  <label className="label-light">Airport Transfer Type</label>
  <select
    className="input-light"
    value={form.airportTransferType}
    onChange={e => set("airportTransferType", e.target.value)}
  >
    <option value="domestic">Domestic Arr / Outbound</option>
    <option value="international">International Arr</option>
  </select>
</div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div>
            <label className="label-light">📍 Pick-up Location</label>
            <input
              required
              className="input-light"
              placeholder="Enter pick-up address"
              value={form.pickupLocation}
              onChange={e => set('pickupLocation', e.target.value)}
            />
          </div>
          <div>
            <label className="label-light">📍 Drop-off Location</label>
            <input
              required
              className="input-light"
              placeholder="Enter drop-off address"
              value={form.dropoffLocation}
              onChange={e => set('dropoffLocation', e.target.value)}
            />
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
          <div>
            <label className="label-light">📅 Date</label>
            <input
              required
              type="date"
              className="input-light"
              value={form.pickupDate}
              onChange={e => set('pickupDate', e.target.value)}
            />
          </div>
          <div>
            <label className="label-light">⏰ Time</label>
            <input
              type="time"
              className="input-light"
              value={form.pickupTime}
              onChange={e => set('pickupTime', e.target.value)}
            />
          </div>
          <div>
            <label className="label-light">🧳 Luggage</label>
            <div className="flex items-center border border-[#CBD5E0] rounded bg-white overflow-hidden h-[42px]">
              <button
                type="button"
                onClick={() => setLug(Math.max(0, lug - 1))}
                className="w-9 text-[#0A428C] text-lg font-light hover:bg-gray-50"
              >
                −
              </button>
              <span className="flex-1 text-center text-sm text-[#1A2A3A]">{lug}</span>
              <button
                type="button"
                onClick={() => setLug(lug + 1)}
                className="w-9 text-[#0A428C] text-lg font-light hover:bg-gray-50"
              >
                +
              </button>
            </div>
          </div>
          <div>
            <label className="label-light">👥 Passengers</label>
            <div className="flex items-center border border-[#CBD5E0] rounded bg-white overflow-hidden h-[42px]">
              <button
                type="button"
                onClick={() => setPax(Math.max(1, pax - 1))}
                className="w-9 text-[#0A428C] text-lg font-light hover:bg-gray-50"
              >
                −
              </button>
              <span className="flex-1 text-center text-sm text-[#1A2A3A]">{pax}</span>
              <button
                type="button"
                onClick={() => setPax(pax + 1)}
                className="w-9 text-[#0A428C] text-lg font-light hover:bg-gray-50"
              >
                +
              </button>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
          <div>
            <label className="label-light">Name</label>
            <input
              required
              className="input-light"
              placeholder="Full name"
              value={form.customerName}
              onChange={e => set('customerName', e.target.value)}
            />
          </div>
          <div>
            <label className="label-light">Email</label>
            <input
              required
              type="email"
              className="input-light"
              placeholder="your@email.com"
              value={form.customerEmail}
              onChange={e => set('customerEmail', e.target.value)}
            />
          </div>
          <div>
            <label className="label-light">Phone (optional)</label>
            <input
              className="input-light"
              placeholder="+1 (702) 000-0000"
              value={form.customerPhone}
              onChange={e => set('customerPhone', e.target.value)}
            />
          </div>
        </div>

        {error && <p className="text-red-500 text-sm mb-3">{error}</p>}

        <div className="flex justify-end mt-2">
          <button
            type="submit"
            disabled={loading}
            className="bg-[#0A428C] text-white px-8 py-3 text-sm tracking-widest uppercase font-semibold hover:bg-[#0D52AA] transition-colors rounded disabled:opacity-50 flex items-center gap-2"
          >
            {loading ? 'Submitting...' : 'Get Instant Quote'}
          </button>
        </div>
      </form>

{response?.success && response.quote ? (
  <div className="mt-8">
    <CharterQuoteResult result={response.quote} />
  </div>
) : null}
  </div>)}