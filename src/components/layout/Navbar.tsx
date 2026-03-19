'use client'
// src/components/layout/Navbar.tsx
import Link from 'next/link'
import { useState } from 'react'
import { Menu, X } from 'lucide-react'

export default function Navbar() {
  const [open, setOpen] = useState(false)
  return (
    <>
      <nav className="h-[68px] px-12 flex items-center justify-between relative z-10 bg-transparent">
        <Link href="/" className="font-serif text-xl text-white whitespace-nowrap">
          Travel USA <span className="text-[#B8C4D4]">Express</span>
        </Link>
        <div className="hidden md:flex items-center gap-1">
          {[
            { label: 'Home', href: '/' },
            { label: 'Charter Bus', href: '/services#charter' },
            { label: 'Fly & Drive', href: '/services#flydrive' },
            { label: 'Fleet', href: '/fleet' },
            { label: 'Book Now', href: '/booking' },
            { label: 'Contact', href: '#contact' },
          ].map(l => (
            <Link key={l.href} href={l.href}
              className="text-white/50 hover:text-white text-[11px] tracking-[.1em] uppercase px-4 py-2 transition-colors">
              {l.label}
            </Link>
          ))}
        </div>
        <Link href="/booking"
          className="hidden md:block bg-[#0A428C] text-white text-[11px] tracking-[.12em] uppercase font-semibold px-5 py-[10px] hover:bg-[#0D52AA] transition-colors">
          Reserve Now
        </Link>
        <button className="md:hidden text-white" onClick={() => setOpen(!open)}>
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </nav>
      {open && (
        <div className="md:hidden bg-black/95 flex flex-col py-4 px-6 gap-1 z-40">
          {['Home','Charter Bus','Fly & Drive','Fleet','Book Now'].map(l => (
            <span key={l} className="text-white/70 text-sm py-3 border-b border-white/5">{l}</span>
          ))}
        </div>
      )}
    </>
  )
}
