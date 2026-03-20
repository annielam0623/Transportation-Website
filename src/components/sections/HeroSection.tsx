'use client'
import Navbar from '@/components/layout/Navbar'
import Topbar from '@/components/layout/Topbar'

export default function HeroSection() {
  return (
    <div style={{background:'#020c18'}}>
      <Topbar />
      <Navbar />

      <div style={{
        background: 'linear-gradient(to bottom, #020c18 0%, #04101E 8%, #071828 18%, #0D2548 38%, #1A3F6E 50%, #0D2548 62%, #071828 80%, #04101E 92%, #020c18 100%)',
        position: 'relative',
        overflow: 'hidden',
        minHeight: '90vh',
        display: 'flex',
        alignItems: 'center',
      }}>

        {/* Subtle glow */}
        <div style={{position:'absolute',top:'20%',left:0,right:0,height:'60%',background:'radial-gradient(ellipse at 30% 50%, rgba(30,80,180,.18) 0%, transparent 60%)',pointerEvents:'none'}} />

        {/* Sprinter fade from right */}
        <div style={{
          position:'absolute',right:0,top:0,bottom:0,width:'65%',
          WebkitMaskImage:'linear-gradient(to right, transparent 0%, rgba(0,0,0,0.15) 15%, rgba(0,0,0,0.55) 35%, rgba(0,0,0,0.85) 60%, #000 80%)',
          maskImage:'linear-gradient(to right, transparent 0%, rgba(0,0,0,0.15) 15%, rgba(0,0,0,0.55) 35%, rgba(0,0,0,0.85) 60%, #000 80%)',
          pointerEvents:'none',
        }}>
          <img
            src="/sprinter-zion.png"
            alt=""
            style={{width:'100%',height:'100%',objectFit:'cover',objectPosition:'center 40%',opacity:0.55,mixBlendMode:'luminosity'}}
          />
        </div>

        {/* Content */}
        <div className="relative z-10 w-full px-6 md:px-16 lg:px-24 py-20">
          <div className="max-w-[580px]">

            <div className="flex items-center gap-3 text-[10px] tracking-[.18em] uppercase text-[#9AA8B8] mb-8">
              <span className="block w-7 h-px bg-[#9AA8B8]" />
              Charter Bus &amp; Fly &amp; Drive
              <span className="block w-7 h-px bg-[#9AA8B8]" />
            </div>

            <h1 className="font-serif text-[clamp(42px,5.5vw,72px)] font-bold leading-[1.03] mb-6">
              Drive. Be Driven.<br />
              <span className="text-[#9AA8B8]">Or Both.</span>
            </h1>

            <p className="text-white/55 text-[15px] font-light leading-[1.8] mb-8 max-w-[420px]">
              Group charter buses for tours and transfers. AI-powered Fly &amp; Drive decisions — choose self-drive, professional chauffeur, or the smart hybrid of both.
            </p>

            <div className="flex gap-3 mb-8 flex-wrap">
              <a href="#booking" className="bg-[#9AA8B8] text-[#020c18] text-[11px] tracking-[.1em] uppercase font-bold px-8 py-3.5 hover:bg-[#B8C4D4] transition-colors">
                Book a Tour →
              </a>
              <a href="#services" className="border border-white/30 text-white text-[11px] tracking-[.1em] uppercase px-8 py-3.5 hover:border-white/55 transition-colors">
                View Schedule →
              </a>
            </div>

            <div className="flex gap-6 flex-wrap">
              {['Fully Insured', 'Daily Service', '5-Star Rated'].map(b => (
                <div key={b} className="flex items-center gap-2 text-[10px] tracking-[.1em] uppercase text-white/30">
                  <div className="w-[5px] h-[5px] rounded-full bg-[#9AA8B8] shrink-0" />
                  {b}
                </div>
              ))}
            </div>

          </div>
        </div>
      </div>
    </div>
  )
}
