'use client'
import { useState } from 'react'

export default function CharterForm() {
  const [pax, setPax] = useState(1)
  const [lug, setLug] = useState(0)
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState('')
  const [form, setForm] = useState({
    pickupLocation: '', dropoffLocation: '', pickupDate: '', pickupTime: '',
    customerName: '', customerEmail: '', customerPhone: '', notes: '',
    type: 'CHARTER_AIRPORT',
  })

  const set = (k: string, v: string) => setForm(f => ({ ...f, [k]: v }))

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true); setError('')
    try {
      const res = await fetch('/api/bookings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...form, passengers: pax, luggage: lug }),
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error)
      setSuccess(true)
    } catch (err: any) {
      setError(err.message || 'Something went wrong')
    } finally {
      setLoading(false)
    }
  }

  if (success) return (
    <div className="text-center py-10">
      <div className="text-4xl mb-3">✅</div>
      <h3 className="text-[#0D1E38] font-semibold text-lg mb-1">Booking Request Received!</h3>
      <p className="text-[#5A6B82] text-sm">We will confirm your charter within 24 hours.</p>
    </div>
  )

  return (
    <form onSubmit={handleSubmit}>
      <p className="text-[#7A8A9A] text-xs mb-5">Instant quotation for charter bus bookings — airport transfers, group tours, corporate events.</p>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        <div>
          <label className="label-light">📍 Pick-up Location</label>
          <input required className="input-light" placeholder="Enter pick-up address" value={form.pickupLocation} onChange={e => set('pickupLocation', e.target.value)} />
        </div>
        <div>
          <label className="label-light">📍 Drop-off Location</label>
          <input required className="input-light" placeholder="Enter drop-off address" value={form.dropoffLocation} onChange={e => set('dropoffLocation', e.target.value)} />
        </div>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
        <div>
          <label className="label-light">📅 Date</label>
          <input required type="date" className="input-light" value={form.pickupDate} onChange={e => set('pickupDate', e.target.value)} />
        </div>
        <div>
          <label className="label-light">⏰ Time</label>
          <input type="time" className="input-light" value={form.pickupTime} onChange={e => set('pickupTime', e.target.value)} />
        </div>
        <div>
          <label className="label-light">🧳 Luggage</label>
          <div className="flex items-center border border-[#CBD5E0] rounded bg-white overflow-hidden h-[42px]">
            <button type="button" onClick={() => setLug(Math.max(0, lug-1))} className="w-9 text-[#0A428C] text-lg font-light hover:bg-gray-50">−</button>
            <span className="flex-1 text-center text-sm text-[#1A2A3A]">{lug}</span>
            <button type="button" onClick={() => setLug(lug+1)} className="w-9 text-[#0A428C] text-lg font-light hover:bg-gray-50">+</button>
          </div>
        </div>
        <div>
          <label className="label-light">👥 Passengers</label>
          <div className="flex items-center border border-[#CBD5E0] rounded bg-white overflow-hidden h-[42px]">
            <button type="button" onClick={() => setPax(Math.max(1, pax-1))} className="w-9 text-[#0A428C] text-lg font-light hover:bg-gray-50">−</button>
            <span className="flex-1 text-center text-sm text-[#1A2A3A]">{pax}</span>
            <button type="button" onClick={() => setPax(pax+1)} className="w-9 text-[#0A428C] text-lg font-light hover:bg-gray-50">+</button>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
        <div>
          <label className="label-light">Name</label>
          <input required className="input-light" placeholder="Full name" value={form.customerName} onChange={e => set('customerName', e.target.value)} />
        </div>
        <div>
          <label className="label-light">Email</label>
          <input required type="email" className="input-light" placeholder="your@email.com" value={form.customerEmail} onChange={e => set('customerEmail', e.target.value)} />
        </div>
        <div>
          <label className="label-light">Phone (optional)</label>
          <input className="input-light" placeholder="+1 (702) 000-0000" value={form.customerPhone} onChange={e => set('customerPhone', e.target.value)} />
        </div>
      </div>
      {error && <p className="text-red-500 text-sm mb-3">{error}</p>}
      <div className="flex justify-end mt-2">
        <button type="submit" disabled={loading}
          className="bg-[#0A428C] text-white px-8 py-3 text-sm tracking-widest uppercase font-semibold hover:bg-[#0D52AA] transition-colors rounded disabled:opacity-50 flex items-center gap-2">
          {loading ? 'Submitting...' : '🔍 Check Available Vehicles'}
        </button>
      </div>
    </form>
  )
}
