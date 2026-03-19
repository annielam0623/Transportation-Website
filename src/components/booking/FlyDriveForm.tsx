'use client'
import { useState } from 'react'

export default function FlyDriveForm() {
  const [travelers, setTravelers] = useState(1)
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState<{ quoteRef: string; aiRecommended: string | null; aiReasoning: string | null } | null>(null)
  const [error, setError] = useState('')
  const [form, setForm] = useState({
    origin: '', destination: '', departureDate: '', tripDays: '',
    travelMode: 'AI_RECOMMEND', customerName: '', customerEmail: '', customerPhone: '',
  })
  const set = (k: string, v: string) => setForm(f => ({ ...f, [k]: v }))

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true); setError('')
    try {
      const res = await fetch('/api/quotes', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...form, travelers }),
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error)
      setResult(data)
    } catch (err: any) {
      setError(err.message || 'Something went wrong')
    } finally {
      setLoading(false)
    }
  }

  const modeLabel: Record<string, string> = {
    SELF_DRIVE: '🚗 Self-Drive', CHAUFFEUR: '👔 Chauffeur', HYBRID: '✨ Hybrid'
  }

  if (result) return (
    <div className="text-center py-8">
      <div className="text-4xl mb-3">✅</div>
      <h3 className="text-[#0D1E38] font-semibold text-lg mb-1">Quote Request Received!</h3>
      <p className="text-[#5A6B82] text-sm mb-4">Reference: <span className="font-mono font-semibold">{result.quoteRef}</span></p>
      {result.aiRecommended && (
        <div className="bg-[#0A428C]/10 border border-[#0A428C]/20 rounded p-4 max-w-md mx-auto text-left">
          <div className="text-[#0A428C] font-semibold text-sm mb-1">AI Recommendation: {modeLabel[result.aiRecommended] || result.aiRecommended}</div>
          <p className="text-[#5A6B82] text-sm">{result.aiReasoning}</p>
        </div>
      )}
    </div>
  )

  return (
    <form onSubmit={handleSubmit}>
      <p className="text-[#7A8A9A] text-xs mb-5">AI-powered decision engine — tell us your trip, we recommend self-drive, chauffeur, or hybrid.</p>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        <div>
          <label className="label-light">📍 Origin City / Airport</label>
          <input required className="input-light" placeholder="e.g. Los Angeles, LAX" value={form.origin} onChange={e => set('origin', e.target.value)} />
        </div>
        <div>
          <label className="label-light">📍 Destination</label>
          <input required className="input-light" placeholder="e.g. Las Vegas, Grand Canyon" value={form.destination} onChange={e => set('destination', e.target.value)} />
        </div>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
        <div>
          <label className="label-light">📅 Departure Date</label>
          <input required type="date" className="input-light" value={form.departureDate} onChange={e => set('departureDate', e.target.value)} />
        </div>
        <div>
          <label className="label-light">🌄 Trip Days</label>
          <select className="input-light" value={form.tripDays} onChange={e => set('tripDays', e.target.value)}>
            <option value="">How long?</option>
            <option value="1">1 day</option>
            <option value="2">2–3 days</option>
            <option value="5">4–7 days</option>
            <option value="8">7+ days</option>
          </select>
        </div>
        <div>
          <label className="label-light">🚙 Travel Mode</label>
          <select className="input-light" value={form.travelMode} onChange={e => set('travelMode', e.target.value)}>
            <option value="AI_RECOMMEND">AI Recommend</option>
            <option value="SELF_DRIVE">Self-Drive</option>
            <option value="CHAUFFEUR">Chauffeur</option>
            <option value="HYBRID">Hybrid</option>
          </select>
        </div>
        <div>
          <label className="label-light">👥 Travelers</label>
          <div className="flex items-center border border-[#CBD5E0] rounded bg-white overflow-hidden h-[42px]">
            <button type="button" onClick={() => setTravelers(Math.max(1, travelers-1))} className="w-9 text-[#0A428C] text-lg font-light hover:bg-gray-50">−</button>
            <span className="flex-1 text-center text-sm text-[#1A2A3A]">{travelers}</span>
            <button type="button" onClick={() => setTravelers(travelers+1)} className="w-9 text-[#0A428C] text-lg font-light hover:bg-gray-50">+</button>
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
          {loading ? 'Processing...' : '🔍 Get AI Recommendation'}
        </button>
      </div>
    </form>
  )
}
