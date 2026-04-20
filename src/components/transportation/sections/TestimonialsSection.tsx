const testimonials = [
  {
    text: 'We used Travel USA Express for our company offsite — 45 people, two days, multiple venues. The charter coordination was flawless from start to finish.',
    author: 'Sarah M.',
    role: 'Corporate Event Manager · Chicago',
  },
  {
    text: 'The Hybrid recommendation was spot on — we self-drove LA to Vegas, then had a chauffeur for the national parks leg. Zero fatigue, zero stress.',
    author: 'James T.',
    role: 'Frequent Traveler · New York',
  },
  {
    text: 'Our school booked a charter for a 3-day trip. The driver was professional, the bus was spotless, and scheduling was handled perfectly.',
    author: 'Linda C.',
    role: 'School Trip Coordinator · Los Angeles',
  },
]
export default function TestimonialsSection() {
  return (
    <section className="bg-[#020c18] px-6 md:px-16 py-20">
      <div className="max-w-5xl mx-auto text-center mb-14">
        <div className="flex items-center justify-center gap-3 text-[#B8C4D4] text-[0.65rem] tracking-[0.18em] uppercase mb-3">
          <span className="block w-7 h-px bg-[#B8C4D4]" /> Testimonials <span className="block w-7 h-px bg-[#B8C4D4]" />
        </div>
        <h2 className="font-['Playfair_Display'] text-4xl font-bold">
          What Our <span className="text-[#B8C4D4]">Guests Say</span>
        </h2>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5 max-w-5xl mx-auto">
        {testimonials.map(t => (
          <div key={t.author} className="bg-[#06111F] border border-white/5 p-7">
            <div className="text-[#B8C4D4] text-4xl font-serif opacity-30 leading-none mb-3 float-right">"</div>
            <div className="flex gap-0.5 mb-4">{[...Array(5)].map((_, i) => <span key={i} className="text-[#B8C4D4] text-sm">★</span>)}</div>
            <p className="text-white/55 text-sm font-light leading-relaxed italic mb-5">{t.text}</p>
            <div className="font-semibold text-sm">{t.author}</div>
            <div className="text-white/30 text-[0.65rem] tracking-widest uppercase mt-0.5">{t.role}</div>
          </div>
        ))}
      </div>
    </section>
  )
}
