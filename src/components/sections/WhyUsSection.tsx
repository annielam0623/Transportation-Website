const items = [
  { icon: '🛡', title: 'Fully Insured', desc: 'Complete commercial coverage on every vehicle and passenger.' },
  { icon: '🌎', title: 'Nationwide Coverage', desc: 'Coast-to-coast service, from city transfers to multi-day itineraries.' },
  { icon: '🤖', title: 'AI-Powered Decisions', desc: 'Our engine evaluates time, cost, fatigue, and route complexity to recommend the optimal travel mode.' },
  { icon: '👤', title: 'Professional Drivers', desc: 'CDL-licensed, background-checked, DOT-compliant drivers.' },
  { icon: '💎', title: 'Transparent Pricing', desc: 'Clear cost breakdowns by day, segment, and complexity. No hidden fees.' },
  { icon: '🏢', title: 'B2B & B2C Ready', desc: 'Built for individual travelers and organizations — tour operators, agencies, corporates, schools.' },
]
export default function WhyUsSection() {
  return (
    <section className="bg-[#04080F] px-6 md:px-16 py-20">
      <div className="max-w-5xl mx-auto text-center mb-14">
        <div className="flex items-center justify-center gap-3 text-[#B8C4D4] text-[0.65rem] tracking-[0.18em] uppercase mb-3">
          <span className="block w-7 h-px bg-[#B8C4D4]" /> Why Travel USA Express <span className="block w-7 h-px bg-[#B8C4D4]" />
        </div>
        <h2 className="font-['Playfair_Display'] text-4xl font-bold">
          The <span className="text-[#B8C4D4]">Difference</span>
        </h2>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-white/5 max-w-5xl mx-auto">
        {items.map(item => (
          <div key={item.title} className="bg-[#0D1E38] p-8 hover:bg-[#112244] transition-colors">
            <div className="w-10 h-10 border border-[#B8C4D4]/20 flex items-center justify-center text-lg mb-4">{item.icon}</div>
            <div className="font-semibold text-sm mb-2">{item.title}</div>
            <p className="text-white/50 text-[0.82rem] font-light leading-relaxed">{item.desc}</p>
          </div>
        ))}
      </div>
    </section>
  )
}
