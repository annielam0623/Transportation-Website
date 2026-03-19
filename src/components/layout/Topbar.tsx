// src/components/layout/Topbar.tsx
export default function Topbar() {
  return (
    <div style={{background:'#000'}} className="px-12 py-[7px] flex justify-between items-center text-[11px] tracking-[.08em] text-white/35">
      <div className="flex gap-7">
        <span>(800) 555-0190</span>
        <span>hello@travelusaexpress.com</span>
      </div>
      <div className="text-[#B8C4D4] text-[10px] tracking-[.14em] uppercase">
        Charter Bus · Fly &amp; Drive · Southwest USA
      </div>
    </div>
  )
}
