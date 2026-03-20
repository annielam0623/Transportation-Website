'use client'
import { useState } from 'react'

type Tab = 'charter' | 'flydrive'

export default function BookingSection() {
  const [tab, setTab] = useState<Tab>('charter')
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)

  const [pickup, setPickup] = useState('')
  const [dropoff, setDropoff] = useState('')
  const [date, setDate] = useState('')
  const [time, setTime] = useState('')
  const [luggage, setLuggage] = useState(0)
  const [pax, setPax] = useState(1)

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

  const inputCls = "w-full border-none border-b border-white/25 pb-2 pt-1 text-[13px] text-white bg-transparent outline-none font-sans placeholder:text-white/28 focus:border-b-[#9AA8B8]"
  const labelCls = "block text-[10px] text-white tracking-[.1em] uppercase mb-1.5 font-medium"
  const counterCls = "flex items-center border-b border-white/25 h-9"

  return (
    <section id="booking" style={{background:'#020c18'}} className="py-20 px-6 md:px-16 lg:px-24">

      {/* Section header */}
      <div className="max-w-[900px] mx-auto mb-10">
        <div className="flex items-center gap-3 text-[10px] tracking-[.18em] uppercase text-[#9AA8B8] mb-4">
          <span className="block w-7 h-px bg-[#9AA8B8]" />
          Book Now
        </div>
        <h2 className="font-serif text-[36px] font-bold text-white leading-tight">
          Start Booking or <span className="text-[#9AA8B8]">Get a Quote</span>
        </h2>
        <p className="text-white/45 text-[14px] font-light mt-2">
          Charter bus or Fly &amp; Drive — instant quote in seconds
        </p>
      </div>

      {/* Card */}
      <div className="max-w-[900px] mx-auto">
        {success ? (
          <div className="border border-white/15 p-8 text-center">
            <div className="text-3xl mb-3">✓</div>
            <h3 className="font-serif text-xl mb-2 text-white">Request Received!</h3>
            <p className="text-white/50 text-sm">We'll get back to you within 2 hours.</p>
            <button onClick={() => setSuccess(false)} className="mt-4 text-[#9AA8B8] text-sm underline">Submit another</button>
          </div>
        ) : (
          <div className="border border-white/15 overflow-hidden">

            {/* Tabs */}
            <div className="flex border-b border-white/10">
              {(['charter', 'flydrive'] as Tab[]).map(t => (
                <button key={t} onClick={() => setTab(t)}
                  className={`flex-1 py-4 text-[11px] tracking-[.1em] uppercase font-semibold transition-colors border-b-2 -mb-px
                    ${tab === t ? 'text-white border-[#9AA8B8] bg-white/4' : 'text-white/38 border-transparent'}`}>
                  {t === 'charter' ? 'Charter Bus' : 'Fly & Drive'}
                </button>
              ))}
            </div>

            {tab === 'charter' && (
              <form onSubmit={submitCharter} className="p-8">
                <p className="text-[11px] text-white/40 mb-6 leading-relaxed">
                  Instant quotation for charter bus bookings — airport transfers, group tours, events.
                </p>
                <div className="grid grid-cols-2 gap-6 mb-6">
                  <div><label className={labelCls}>Pick-up Location</label><input className={inputCls} placeholder="Enter pick-up address" onChange={e => setPickup(e.target.value)} /></div>
                  <div><label className={labelCls}>Drop-off Location</label><input className={inputCls} placeholder="Enter drop-off address" onChange={e => setDropoff(e.target.value)} /></div>
                </div>
                <div className="grid grid-cols-4 gap-4 mb-8">
                  <div><label className={labelCls}>Date</label><input type="date" className={inputCls} style={{colorScheme:'dark'}} onChange={e => setDate(e.target.value)} /></div>
                  <div><label className={labelCls}>Time</label><input type="time" className={inputCls} style={{colorScheme:'dark'}} onChange={e => setTime(e.target.value)} /></div>
                  <div>
                    <label className={labelCls}>Luggage</label>
                    <div className={counterCls}>
                      <button type="button" onClick={() => setLuggage(Math.max(0, luggage-1))} className="w-6 text-[#9AA8B8] text-base bg-transparent border-none">−</button>
                      <span className="flex-1 text-center text-[13px] text-white">{luggage}</span>
                      <button type="button" onClick={() => setLuggage(luggage+1)} className="w-6 text-[#9AA8B8] text-base bg-transparent border-none">+</button>
                    </div>
                  </div>
                  <div>
                    <label className={labelCls}>Pax</label>
                    <div className={counterCls}>
                      <button type="button" onClick={() => setPax(Math.max(1, pax-1))} className="w-6 text-[#9AA8B8] text-base bg-transparent border-none">−</button>
                      <span className="flex-1 text-center text-[13px] text-white">{pax}</span>
                      <button type="button" onClick={() => setPax(pax+1)} className="w-6 text-[#9AA8B8] text-base bg-transparent border-none">+</button>
                    </div>
                  </div>
                </div>
                <button type="submit" disabled={loading}
                  className="w-full bg-[#9AA8B8] text-[#020c18] text-[11px] tracking-[.12em] uppercase font-bold py-4 hover:bg-[#B8C4D4] transition-colors disabled:opacity-60">
                  {loading ? 'Checking...' : 'Check Available Vehicles'}
                </button>
              </form>
            )}

            {tab === 'flydrive' && (
              <form onSubmit={submitFlyDrive} className="p-8">
                <p className="text-[11px] text-white/40 mb-6 leading-relaxed">
                  AI-powered decision engine — tell us your trip, we recommend self-drive, chauffeur, or hybrid.
                </p>
                <div className="grid grid-cols-2 gap-6 mb-6">
                  <div><label className={labelCls}>Origin City / Airport</label><input className={inputCls} placeholder="e.g. Los Angeles, LAX" onChange={e => setOrigin(e.target.value)} /></div>
                  <div><label className={labelCls}>Destination</label><input className={inputCls} placeholder="e.g. Las Vegas" onChange={e => setDest(e.target.value)} /></div>
                </div>
                <div className="grid grid-cols-4 gap-4 mb-6">
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
                      <button type="button" onClick={() => setTravelers(Math.max(1, travelers-1))} className="w-6 text-[#9AA8B8] text-base bg-transparent border-none">−</button>
                      <span className="flex-1 text-center text-[13px] text-white">{travelers}</span>
                      <button type="button" onClick={() => setTravelers(travelers+1)} className="w-6 text-[#9AA8B8] text-base bg-transparent border-none">+</button>
                    </div>
                  </div>
                </div>
                <div className="mb-8">
                  <label className={labelCls}>Email</label>
                  <input type="email" className={inputCls} placeholder="your@email.com" onChange={e => setEmail(e.target.value)} />
                </div>
                <button type="submit" disabled={loading}
                  className="w-full bg-[#9AA8B8] text-[#020c18] text-[11px] tracking-[.12em] uppercase font-bold py-4 hover:bg-[#B8C4D4] transition-colors disabled:opacity-60">
                  {loading ? 'Processing...' : 'Get AI Recommendation'}
                </button>
              </form>
            )}
          </div>
        )}
      </div>
    </section>
  )
}
