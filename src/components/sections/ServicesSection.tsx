// src/components/sections/ServicesSection.tsx
import Image from 'next/image'

const modes = [
  { icon: '🚗', title: 'Self-Drive', subtitle: 'Freedom & Flexibility', desc: 'Curated vehicles, one-way rental support, insurance guidance. Best for short scenic routes and experienced drivers.', tag: 'Short trips · Couples · Highway routes' },
  { icon: '👔', title: 'Professional Chauffeur', subtitle: 'Effortless Comfort', desc: 'Commercially licensed, DOT-compliant drivers. Door-to-door service, multi-day support. Not rideshare — a dedicated travel professional.', tag: 'Multi-day · Families · Executives · Events', highlight: true },
  { icon: '✨', title: 'Hybrid', subtitle: 'Most Popular', desc: 'Drive some legs, hire for others. AI finds the optimal split — reducing fatigue, cost, and stress while maximizing experience.', tag: 'Drive LA→Vegas · Fly back' },
]

const charterTypes = [
  { icon: '🚌', title: 'Private Charter', desc: 'Dedicated coach for any occasion — weddings, reunions, sports teams, church groups, any route.' },
  { icon: '✈️', title: 'Airport & Transfers', desc: 'Group pickups at airports, hotels, and venues. Coordinated with flight and event schedules.' },
  { icon: '🏢', title: 'Corporate & Events', desc: 'Conferences, conventions, team outings, school trips. DOT-compliant professional drivers.' },
]

export default function ServicesSection() {
  return (
    <section id="services" style={{background:'#020c18'}}>

      {/* Section header */}
      <div className="px-6 md:px-12 pt-16 pb-10">
        <div className="section-label">Our Services</div>
        <h2 className="font-serif text-4xl md:text-5xl font-bold mb-4">
          Two Business <span className="text-[#B8C4D4]">Divisions</span>
        </h2>
        <p className="text-white/45 text-sm font-light leading-relaxed max-w-lg">
          Group charter transportation for tours and events. Plus an AI-powered Fly &amp; Drive platform for individual and corporate travelers.
        </p>
      </div>

      {/* ROW 1 — Charter Bus: text LEFT, bus interior RIGHT */}
      <div className="grid grid-cols-1 md:grid-cols-2 border-t border-white/5">
        {/* Text left */}
        <div style={{background:'#020c18'}} className="px-6 md:px-12 py-16 flex flex-col justify-center">
          <h3 className="font-serif text-5xl md:text-6xl font-bold leading-[1.05] mb-4">
            Charter<br />Bus
          </h3>
          <p className="text-[#B8C4D4] text-[0.7rem] tracking-[0.14em] uppercase mb-5">
            Group Travel · Tours · Events
          </p>
          <p className="text-white/50 text-sm font-light leading-relaxed mb-6 max-w-md">
            Full-service group transportation for any occasion. Corporate transfers, airport shuttles,
            events, conventions, school trips, and private charters.
          </p>
          <div className="flex flex-wrap gap-2 mb-8">
            {['Private Charter', 'Airport Transfers', 'Corporate', 'Events', 'School Groups'].map(t => (
              <span key={t} className="border border-white/15 text-white/40 text-[0.6rem] tracking-widest uppercase px-2.5 py-1">{t}</span>
            ))}
          </div>
          <a href="#booking" className="btn-primary self-start">Inquire About Charter →</a>
        </div>
        {/* Image right — with same horizontal padding */}
        <div style={{background:'#020c18'}} className="px-6 md:px-12 py-16 flex items-center">
          <div className="relative w-full rounded-sm overflow-hidden" style={{aspectRatio:'16/10'}}>
            <Image src="/bus-interior.png" alt="Charter Bus Interior" fill className="object-cover" sizes="50vw" />
            <div className="absolute inset-0" style={{background:'linear-gradient(to right, rgba(0,0,0,.3) 0%, transparent 40%)'}} />
          </div>
        </div>
      </div>

      {/* ROW 2 — Fly & Drive: car LEFT, text RIGHT */}
      <div className="grid grid-cols-1 md:grid-cols-2 border-t border-white/5">
        {/* Image left — with same horizontal padding */}
        <div style={{background:'#020c18'}} className="px-6 md:px-12 py-16 flex items-center order-2 md:order-1">
          <div className="relative w-full rounded-sm overflow-hidden" style={{aspectRatio:'16/10'}}>
            <Image src="/car.png" alt="Cadillac Escalade" fill className="object-cover" sizes="50vw" />
            <div className="absolute inset-0" style={{background:'linear-gradient(to left, rgba(0,0,0,.3) 0%, transparent 40%)'}} />
          </div>
        </div>
        {/* Text right */}
        <div style={{background:'#020c18'}} className="px-6 md:px-12 py-16 flex flex-col justify-center border-l border-white/5 order-1 md:order-2">
          <h3 className="font-serif text-5xl md:text-6xl font-bold leading-[1.05] mb-4">
            Fly &amp;<br />Drive
          </h3>
          <p className="text-[#B8C4D4] text-[0.7rem] tracking-[0.14em] uppercase mb-5">
            Self-Drive · Chauffeur · Hybrid
          </p>
          <p className="text-white/50 text-sm font-light leading-relaxed mb-6 max-w-md">
            AI-powered decision engine. Choose when to self-drive, hire a chauffeur, or combine both —
            optimized for time, cost, safety, and experience across single and multi-day trips.
          </p>
          <div className="flex flex-wrap gap-2 mb-8">
            {['Self-Drive', 'Chauffeur', 'Hybrid', 'One-Way', 'Multi-Day', 'AI Powered'].map(t => (
              <span key={t} className="border border-white/15 text-white/40 text-[0.6rem] tracking-widest uppercase px-2.5 py-1">{t}</span>
            ))}
          </div>
          <a href="#booking" className="inline-flex border border-[#B8C4D4]/40 text-white text-[0.72rem] tracking-widest uppercase font-semibold px-7 py-3 hover:border-[#B8C4D4] hover:text-[#B8C4D4] transition-colors self-start">
            Explore Fly &amp; Drive →
          </a>
        </div>
      </div>

      {/* Three Modes */}
      <div className="border-t border-white/5">
        <div className="px-6 md:px-12 pt-12 pb-4">
          <div className="section-label">Fly &amp; Drive — Three Travel Modes</div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 border-t border-white/5">
          {modes.map(m => (
            <div key={m.title} style={{background: m.highlight ? '#080e1a' : '#000'}}
              className={`p-10 border-r border-white/5 last:border-r-0 hover:bg-[#0A1628] transition-colors ${m.highlight ? 'border-t-2 border-t-[#B8C4D4]/25' : ''}`}>
              <div className={`w-11 h-11 flex items-center justify-center text-xl mb-5 border ${m.highlight ? 'border-[#B8C4D4]/30' : 'border-white/10'}`}>{m.icon}</div>
              <div className="font-semibold text-base mb-0.5">{m.title}</div>
              <div className={`text-[0.65rem] tracking-widest uppercase mb-4 ${m.highlight ? 'text-[#B8C4D4]' : 'text-white/35'}`}>{m.subtitle}</div>
              <p className="text-white/45 text-sm font-light leading-relaxed mb-4">{m.desc}</p>
              <div className="text-[#B8C4D4]/60 text-[0.62rem] tracking-wide">→ {m.tag}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Charter sub-types */}
      <div className="border-t border-white/5">
        <div className="px-6 md:px-12 pt-12 pb-4">
          <div className="section-label">Charter Bus — What We Cover</div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 border-t border-white/5">
          {charterTypes.map(c => (
            <div key={c.title} style={{background:'#020c18'}} className="p-10 border-r border-white/5 last:border-r-0 hover:bg-[#080e1a] transition-colors">
              <div className="w-11 h-11 border border-white/10 flex items-center justify-center text-xl mb-5">{c.icon}</div>
              <div className="font-semibold text-base mb-3">{c.title}</div>
              <p className="text-white/45 text-sm font-light leading-relaxed">{c.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
