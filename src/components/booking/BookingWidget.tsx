'use client'
import { useState } from 'react'
import CharterForm from './CharterForm'
import SelfDriveForm from './SelfDriveForm'

export default function BookingWidget() {
  const [tab, setTab] = useState<'charter' | 'selfdrive'>('charter')
  return (
    <div id="booking" className="bg-[#F4F6F9] border-b border-[#DDE3EC]">
      <div className="max-w-5xl mx-auto px-6 md:px-10 py-12">
        <h2 className="font-['Playfair_Display'] text-3xl font-bold text-[#0D1E38] text-center mb-1">
          Start Booking or Quote
        </h2>
        <p className="text-center text-[#5A6B82] text-sm mb-8">
          Charter bus or Self-Drive  — get an instant quote in seconds
        </p>
        {/* Tabs */}
        <div className="flex border-b-2 border-[#DDE3EC] mb-8">
          <button onClick={() => setTab('charter')}
            className={`flex items-center gap-2 px-6 py-3 text-sm font-semibold transition-colors border-b-[3px] -mb-[2px] ${tab === 'charter' ? 'text-[#0A428C] border-[#0A428C]' : 'text-[#8A9AAC] border-transparent'}`}>
            🚌 Charter Bus
          </button>
          <button onClick={() => setTab('selfdrive')}
            className={`flex items-center gap-2 px-6 py-3 text-sm font-semibold transition-colors border-b-[3px] -mb-[2px] ${tab === 'selfdrive' ? 'text-[#0A428C] border-[#0A428C]' : 'text-[#8A9AAC] border-transparent'}`}>
             Self-Drive
          </button>
        </div>
        {tab === 'charter' ? <CharterForm /> : <SelfDriveForm />}
      </div>
    </div>
  )
}
