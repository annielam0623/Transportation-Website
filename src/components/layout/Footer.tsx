export default function Footer() {
  return (
    <footer className="bg-[#030710] border-t border-white/5 px-6 md:px-10 py-8 flex flex-col md:flex-row justify-between items-center gap-4">
      <div>
        <div className="font-['Playfair_Display'] text-lg">Travel USA <span className="text-[#B8C4D4]">Express</span></div>
        <div className="text-[0.62rem] text-white/30 tracking-widest mt-1 uppercase">Charter Bus · Fly &amp; Drive · USA</div>
      </div>
      <div className="flex flex-wrap justify-center gap-5">
        {['Charter Bus','Fly & Drive','About Us','Contact','My Booking'].map(l => (
          <a key={l} href="#" className="text-white/30 text-[0.68rem] tracking-widest uppercase hover:text-[#B8C4D4] transition-colors">{l}</a>
        ))}
      </div>
      <div className="text-white/25 text-[0.68rem]">© {new Date().getFullYear()} Travel USA Express</div>
    </footer>
  )
}
