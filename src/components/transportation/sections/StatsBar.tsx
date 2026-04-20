const stats = [
  { num: '3', label: 'Travel Modes' },
  { num: '40+', label: 'Seat Coaches' },
  { num: 'B2C', label: '+ B2B Solutions' },
  { num: 'USA', label: 'Nationwide' },
]
export default function StatsBar() {
  return (
    <div className="bg-[#071020] border-b border-white/5 flex flex-wrap">
      {stats.map((s, i) => (
        <div key={s.label} className={`flex-1 min-w-[140px] text-center px-6 py-5 ${i < stats.length - 1 ? 'border-r border-white/5' : ''}`}>
          <div className="font-['Playfair_Display'] text-3xl text-[#B8C4D4]">{s.num}</div>
          <div className="text-[0.62rem] text-white/30 tracking-widest uppercase mt-1">{s.label}</div>
        </div>
      ))}
    </div>
  )
}
