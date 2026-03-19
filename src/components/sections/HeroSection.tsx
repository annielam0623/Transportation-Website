'use client'
// src/components/sections/HeroSection.tsx
import { useState } from 'react'
import Navbar from '@/components/layout/Navbar'
import Topbar from '@/components/layout/Topbar'

type Tab = 'charter' | 'flydrive'

export default function HeroSection() {
  const [tab, setTab] = useState<Tab>('charter')
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)

  // Charter state
  const [pickup, setPickup] = useState('')
  const [dropoff, setDropoff] = useState('')
  const [date, setDate] = useState('')
  const [time, setTime] = useState('')
  const [luggage, setLuggage] = useState(0)
  const [pax, setPax] = useState(1)

  // Fly & Drive state
  const [origin, setOrigin] = useState('')
  const [dest, setDest] = useState('')
  const [tripDate, setTripDate] = useState('')
  const [tripDays, setTripDays] = useState('')
  const [mode, setMode] = useState('AI_RECOMMEND')
  const [travelers, setTravelers] = useState(1)
  const [email, setEmail] = useState('')

  const submitCharter = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    try {
      await fetch('/api/bookings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ type: 'CHARTER', pickupAddress: pickup, dropoffAddress: dropoff, departureDate: date, departureTime: time, luggageCount: luggage, passengerCount: pax, email: '', firstName: '', lastName: '' }),
      })
      setSuccess(true)
    } finally { setLoading(false) }
  }

  const submitFlyDrive = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    try {
      await fetch('/api/quotes', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ originCity: origin, destination: dest, departureDate: tripDate, tripDays: parseInt(tripDays) || 1, travelMode: mode, travelerCount: travelers, email }),
      })
      setSuccess(true)
    } finally { setLoading(false) }
  }

  const inputCls = "w-full border-none border-b border-white/25 pb-2 pt-1 text-[13px] text-white bg-transparent outline-none font-sans placeholder:text-white/28 focus:border-b-[#B8C4D4]"
  const labelCls = "block text-[10px] text-white tracking-[.1em] uppercase mb-1.5 font-medium"
  const counterCls = "flex items-center border-b border-white/25 h-9"

  return (
    <div
      className="relative overflow-hidden"
      style={{ background: 'linear-gradient(160deg, #000000 0%, #000000 30%, #030810 50%, #060f20 65%, #091628 80%, #0A1E38 100%)' }}
    >
      {/* Topbar inside gradient wrap */}
      <Topbar />

      {/* Navbar inside gradient wrap — transparent */}
      <Navbar />

      {/* Subtle blue glow far right */}
      <div className="absolute right-0 top-0 bottom-0 w-1/2 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse at 85% 50%, rgba(10,66,140,.15) 0%, transparent 65%)' }} />

      {/* Hero content */}
      <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 items-center gap-12 px-6 md:px-12 pt-10 pb-20">

        {/* LEFT — headline */}
        <div>
          <div className="flex items-center gap-3 text-[10px] tracking-[.18em] uppercase text-[#B8C4D4] mb-6">
            <span className="block w-7 h-px bg-[#B8C4D4]" />
            Charter Bus &amp; Fly &amp; Drive
            <span className="block w-7 h-px bg-[#B8C4D4]" />
          </div>
          <h1 className="font-serif text-[60px] font-bold leading-[1.03] mb-5">
            Drive. Be Driven.<br />
            <span className="text-[#B8C4D4]">Or Both.</span>
          </h1>
          <p className="text-white/55 text-[15px] font-light leading-[1.8] mb-7 max-w-[420px]">
            Full-service charter buses and AI-powered Fly &amp; Drive — self-drive, chauffeur, or hybrid travel across the USA.
          </p>
          <div className="flex gap-3 mb-7 flex-wrap">
            <a href="#booking" className="bg-[#0A428C] text-white text-[11px] tracking-[.1em] uppercase font-semibold px-7 py-3 hover:bg-[#0D52AA] transition-colors">Get a Quote →</a>
            <a href="#services" className="border border-white/25 text-white text-[11px] tracking-[.1em] uppercase px-7 py-3 hover:border-white/50 transition-colors">Our Services →</a>
          </div>
          <div className="flex gap-6 flex-wrap">
            {['Fully Insured', 'DOT Compliant', '5-Star Rated'].map(b => (
              <div key={b} className="flex items-center gap-2 text-[10px] tracking-[.1em] uppercase text-white/30">
                <div className="w-[5px] h-[5px] rounded-full bg-[#B8C4D4] shrink-0" />{b}
              </div>
            ))}
          </div>
        </div>

        {/* RIGHT — booking card */}
        <div>
          {success ? (
            <div className="border border-white/18 p-8 text-center">
              <div className="text-3xl mb-3">✓</div>
              <h3 className="font-serif text-xl mb-2">Request Received!</h3>
              <p className="text-white/50 text-sm">We'll get back to you within 2 hours.</p>
              <button onClick={() => setSuccess(false)} className="mt-4 text-[#B8C4D4] text-sm underline">Submit another</button>
            </div>
          ) : (
            <div className="border border-white/10 overflow-hidden">
              {/* Card header */}
              <div className="px-6 py-5 border-b border-white/10">
                <div className="font-serif text-[20px] font-bold text-white mb-1">Start Booking or Quote</div>
                <div className="text-[11px] text-white/45 font-light">Charter bus or Fly &amp; Drive — instant quote in seconds</div>
              </div>

              {/* Tabs */}
              <div className="flex border-b border-white/10">
                {(['charter', 'flydrive'] as Tab[]).map(t => (
                  <button key={t} onClick={() => setTab(t)}
                    className={`flex-1 py-3 text-[11px] tracking-[.1em] uppercase font-semibold transition-colors border-b-2 -mb-px
                      ${tab === t ? 'text-white border-[#B8C4D4] bg-white/4' : 'text-white/38 border-transparent'}`}>
                    {t === 'charter' ? 'Charter Bus' : 'Fly & Drive'}
                  </button>
                ))}
              </div>

              {/* Charter form */}
              {tab === 'charter' && (
                <form onSubmit={submitCharter} className="p-6">
                  <p className="text-[11px] text-white/40 mb-5 leading-relaxed">Instant quotation for charter bus bookings — airport transfers, group tours, events.</p>
                  <div className="grid grid-cols-2 gap-4 mb-4">
                    <div><label className={labelCls}>Pick-up Location</label><input className={inputCls} placeholder="Enter pick-up address" onChange={e => setPickup(e.target.value)} /></div>
                    <div><label className={labelCls}>Drop-off Location</label><input className={inputCls} placeholder="Enter drop-off address" onChange={e => setDropoff(e.target.value)} /></div>
                  </div>
                  <div className="grid grid-cols-4 gap-3 mb-5">
                    <div><label className={labelCls}>Date</label><input type="date" className={inputCls} style={{colorScheme:'dark'}} onChange={e => setDate(e.target.value)} /></div>
                    <div><label className={labelCls}>Time</label><input type="time" className={inputCls} style={{colorScheme:'dark'}} onChange={e => setTime(e.target.value)} /></div>
                    <div>
                      <label className={labelCls}>Luggage</label>
                      <div className={counterCls}>
                        <button type="button" onClick={() => setLuggage(Math.max(0, luggage - 1))} className="w-6 text-[#B8C4D4] text-base bg-transparent border-none">−</button>
                        <span className="flex-1 text-center text-[13px]">{luggage}</span>
                        <button type="button" onClick={() => setLuggage(luggage + 1)} className="w-6 text-[#B8C4D4] text-base bg-transparent border-none">+</button>
                      </div>
                    </div>
                    <div>
                      <label className={labelCls}>Pax</label>
                      <div className={counterCls}>
                        <button type="button" onClick={() => setPax(Math.max(1, pax - 1))} className="w-6 text-[#B8C4D4] text-base bg-transparent border-none">−</button>
                        <span className="flex-1 text-center text-[13px]">{pax}</span>
                        <button type="button" onClick={() => setPax(pax + 1)} className="w-6 text-[#B8C4D4] text-base bg-transparent border-none">+</button>
                      </div>
                    </div>
                  </div>
                  <button type="submit" disabled={loading}
                    className="w-full bg-[#0A428C] text-white text-[11px] tracking-[.12em] uppercase font-semibold py-3 hover:bg-[#0D52AA] transition-colors disabled:opacity-60">
                    {loading ? 'Checking...' : 'Check Available Vehicles'}
                  </button>
                </form>
              )}

              {/* Fly & Drive form */}
              {tab === 'flydrive' && (
                <form onSubmit={submitFlyDrive} className="p-6">
                  <p className="text-[11px] text-white/40 mb-5 leading-relaxed">AI-powered decision engine — tell us your trip, we recommend self-drive, chauffeur, or hybrid.</p>
                  <div className="grid grid-cols-2 gap-4 mb-4">
                    <div><label className={labelCls}>Origin City / Airport</label><input className={inputCls} placeholder="e.g. Los Angeles, LAX" onChange={e => setOrigin(e.target.value)} /></div>
                    <div><label className={labelCls}>Destination</label><input className={inputCls} placeholder="e.g. Las Vegas" onChange={e => setDest(e.target.value)} /></div>
                  </div>
                  <div className="grid grid-cols-4 gap-3 mb-4">
                    <div><label className={labelCls}>Date</label><input type="date" className={inputCls} style={{colorScheme:'dark'}} onChange={e => setTripDate(e.target.value)} /></div>
                    <div>
                      <label className={labelCls}>Trip Days</label>
                      <select className={inputCls} onChange={e => setTripDays(e.target.value)} style={{colorScheme:'dark'}}>
                        <option value="" className="bg-black">How long?</option>
                        <option value="1" className="bg-black">1 day</option>
                        <option value="3" className="bg-black">2–3 days</option>
                        <option value="5" className="bg-black">4–7 days</option>
                        <option value="8" className="bg-black">7+ days</option>
                      </select>
                    </div>
                    <div>
                      <label className={labelCls}>Mode</label>
                      <select className={inputCls} value={mode} onChange={e => setMode(e.target.value)} style={{colorScheme:'dark'}}>
                        <option value="AI_RECOMMEND" className="bg-black">AI Recommend</option>
                        <option value="SELF_DRIVE" className="bg-black">Self-Drive</option>
                        <option value="CHAUFFEUR" className="bg-black">Chauffeur</option>
                        <option value="HYBRID" className="bg-black">Hybrid</option>
                      </select>
                    </div>
                    <div>
                      <label className={labelCls}>Travelers</label>
                      <div className={counterCls}>
                        <button type="button" onClick={() => setTravelers(Math.max(1, travelers - 1))} className="w-6 text-[#B8C4D4] text-base bg-transparent border-none">−</button>
                        <span className="flex-1 text-center text-[13px]">{travelers}</span>
                        <button type="button" onClick={() => setTravelers(travelers + 1)} className="w-6 text-[#B8C4D4] text-base bg-transparent border-none">+</button>
                      </div>
                    </div>
                  </div>
                  <div className="mb-5">
                    <label className={labelCls}>Email</label>
                    <input type="email" className={inputCls} placeholder="your@email.com" onChange={e => setEmail(e.target.value)} />
                  </div>
                  <button type="submit" disabled={loading}
                    className="w-full bg-[#0A428C] text-white text-[11px] tracking-[.12em] uppercase font-semibold py-3 hover:bg-[#0D52AA] transition-colors disabled:opacity-60">
                    {loading ? 'Processing...' : 'Get AI Recommendation'}
                  </button>
                </form>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
